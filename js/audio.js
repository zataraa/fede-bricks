// ===== Audio: SFX sintetizados + música ambiental (WebAudio, sin assets) =====
// Todo se genera con osciladores/ruido: no hay archivos que cargar y funciona
// offline. El contexto se crea perezosamente en el primer gesto del usuario
// (requisito de iOS/Chrome para poder reproducir sonido).
const MUTE_KEY = 'fedebricks.muted';

// Acordes del loop ambiental (Am · F · C · G, registro grave, muy suave)
const CHORDS = [
  [110.0, 164.8, 220.0, 261.6],
  [87.31, 130.8, 174.6, 220.0],
  [130.8, 196.0, 261.6, 329.6],
  [98.0, 146.8, 196.0, 246.9],
];
const CHORD_DUR = 4.2;

class AudioSys {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.muted = false;
    try { this.muted = localStorage.getItem(MUTE_KEY) === '1'; } catch { /* sin storage */ }
    this._musicOn = false;
    this._musicTimer = null;
    this._nextChord = 0;
    this._chordIdx = 0;
    this._lastWall = 0;
  }

  /** Crea/reanuda el contexto. Llamar desde un gesto del usuario. */
  unlock() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!this.ctx) {
      this.ctx = new AC();
      const comp = this.ctx.createDynamicsCompressor();
      comp.connect(this.ctx.destination);
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 1;
      this.master.connect(comp);
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0;
      this.musicGain.connect(this.master);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    // Si la música quedó pedida antes de tener contexto, arranca ahora
    if (this._musicOn && !this._musicTimer) this.startMusic();
  }

  /** Alterna mute y lo persiste. Devuelve el nuevo estado. */
  toggleMuted() {
    this.muted = !this.muted;
    try { localStorage.setItem(MUTE_KEY, this.muted ? '1' : '0'); } catch { /* sin storage */ }
    if (this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setTargetAtTime(this.muted ? 0 : 1, this.ctx.currentTime, 0.02);
    }
    return this.muted;
  }

  // ---------- Primitivas de síntesis ----------
  _blip(freq, dur, { type = 'square', vol = 0.15, to = 0, delay = 0 } = {}) {
    if (!this.ctx || this.muted) return;
    const t0 = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(Math.max(30, to), t0 + dur);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    o.connect(g).connect(this.master);
    o.start(t0);
    o.stop(t0 + dur + 0.03);
  }

  _noise(dur, { vol = 0.12, freq = 1800, q = 1, delay = 0 } = {}) {
    if (!this.ctx || this.muted) return;
    const t0 = this.ctx.currentTime + delay;
    const n = Math.ceil(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < n; i++) ch[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = freq;
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(f).connect(g).connect(this.master);
    src.start(t0);
  }

  // ---------- SFX del juego ----------
  paddle() {
    this._blip(160, 0.09, { type: 'triangle', vol: 0.3, to: 100 });
  }

  wall() {
    // Con multibola puede sonar muchísimo: se limita la cadencia
    if (this.ctx && this.ctx.currentTime - this._lastWall < 0.04) return;
    if (this.ctx) this._lastWall = this.ctx.currentTime;
    this._blip(480, 0.045, { type: 'square', vol: 0.07 });
  }

  /** Golpe a bloque resistente (aún no se rompe). */
  brickHit() {
    this._blip(320, 0.05, { type: 'square', vol: 0.12 });
  }

  /** Bloque destruido: tono según su valor (más puntos = más agudo). */
  brickBreak(points) {
    const f = 300 + points * 2.6; // 40..160 pts → ~400..716 Hz
    this._blip(f, 0.09, { type: 'square', vol: 0.14, to: f * 1.4 });
    this._noise(0.07, { vol: 0.09, freq: 2400 });
  }

  /** Destello del bloque metálico indestructible. */
  metal() {
    this._blip(1250, 0.05, { type: 'triangle', vol: 0.08, to: 900 });
  }

  launch() {
    this._blip(300, 0.09, { type: 'triangle', vol: 0.18, to: 620 });
  }

  laser() {
    this._blip(880, 0.12, { type: 'sawtooth', vol: 0.09, to: 190 });
  }

  powerup() {
    this._blip(620, 0.09, { type: 'triangle', vol: 0.18 });
    this._blip(930, 0.12, { type: 'triangle', vol: 0.18, delay: 0.08 });
  }

  extraLife() {
    [523, 659, 784, 1046].forEach((f, i) =>
      this._blip(f, 0.14, { type: 'triangle', vol: 0.18, delay: i * 0.09 }));
  }

  lose() {
    this._blip(320, 0.28, { type: 'sawtooth', vol: 0.16, to: 110 });
    this._blip(160, 0.3, { type: 'triangle', vol: 0.16, to: 70, delay: 0.12 });
  }

  complete() {
    [523, 659, 784, 1046, 1318].forEach((f, i) =>
      this._blip(f, 0.16, { type: 'triangle', vol: 0.2, delay: i * 0.1 }));
  }

  gameover() {
    [392, 330, 262, 196].forEach((f, i) =>
      this._blip(f, 0.3, { type: 'triangle', vol: 0.18, delay: i * 0.2 }));
  }

  // ---------- Música ambiental ----------
  startMusic() {
    this._musicOn = true;
    if (!this.ctx) return;
    this.musicGain.gain.setTargetAtTime(1, this.ctx.currentTime, 0.8);
    if (this._musicTimer) return;
    this._nextChord = this.ctx.currentTime + 0.1;
    this._musicTimer = setInterval(() => this._scheduleMusic(), 400);
    this._scheduleMusic();
  }

  stopMusic() {
    this._musicOn = false;
    if (this._musicTimer) { clearInterval(this._musicTimer); this._musicTimer = null; }
    if (this.ctx) this.musicGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
  }

  _scheduleMusic() {
    if (!this._musicOn || !this.ctx || this.muted) return;
    // Programa acordes con ~1s de anticipación (pad suave con ataque lento)
    while (this._nextChord < this.ctx.currentTime + 1) {
      const t0 = Math.max(this._nextChord, this.ctx.currentTime);
      for (const f of CHORDS[this._chordIdx]) {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = f;
        o.detune.value = (Math.random() - 0.5) * 7;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.linearRampToValueAtTime(0.032, t0 + 1.4);
        g.gain.setValueAtTime(0.032, t0 + CHORD_DUR - 1.2);
        g.gain.linearRampToValueAtTime(0.0001, t0 + CHORD_DUR + 0.3);
        o.connect(g).connect(this.musicGain);
        o.start(t0);
        o.stop(t0 + CHORD_DUR + 0.4);
      }
      this._nextChord += CHORD_DUR;
      this._chordIdx = (this._chordIdx + 1) % CHORDS.length;
    }
  }
}

export const audio = new AudioSys();
