// ===== UI: HUD banner y pantallas (DOM, fuera del canvas) =====
import { fmt } from './utils.js';
import { POWERUPS } from './config.js';
import { LEVELS } from './levels.js';

const $ = (id) => document.getElementById(id);

export class UI {
  constructor() {
    this.hudEl = $('hud');
    this.stageEl = $('hud-stage');
    this.scoreEl = $('hud-score');
    this.livesEl = $('hud-lives');
    this.starEls = document.querySelectorAll('#hud-stars span');
    this.powerEl = $('hud-power');
    this.powerLetter = $('power-letter');
    this.powerFill = $('power-fill');
    this.screens = {
      title: $('screen-title'),
      levels: $('screen-levels'),
      confirm: $('screen-confirm'),
      pause: $('screen-pause'),
      complete: $('screen-complete'),
      gameover: $('screen-gameover'),
    };
    this.stageOverlay = $('screen-stage');
    this.stageText = $('stage-text');
    this._lastScore = -1;
    this._lastLives = -1;
    this._lastStars = -1;
    this._starTimers = [];
  }

  bind(h) {
    $('btn-continue').onclick = h.onContinue;
    $('btn-levels').onclick = h.onLevels;
    $('btn-levels-back').onclick = h.onLevelsBack;
    $('btn-new').onclick = h.onNewGame;
    $('btn-confirm-yes').onclick = h.onConfirmNew;
    $('btn-confirm-no').onclick = h.onCancelNew;
    $('btn-pause').onclick = h.onPause;
    $('btn-resume').onclick = h.onResume;
    $('btn-restart').onclick = h.onRestart;
    $('btn-pause-menu').onclick = h.onMenu;
    $('btn-next').onclick = h.onNext;
    $('btn-complete-levels').onclick = h.onLevels;
    $('btn-complete-menu').onclick = h.onMenu;
    $('btn-retry').onclick = h.onRetry;
    $('btn-gameover-menu').onclick = h.onMenu;
    $('btn-sound').onclick = h.onSound;
    $('btn-sound-pause').onclick = h.onSound;
  }

  /** Actualiza las etiquetas de los botones de sonido. */
  setSound(on) {
    const label = on ? '🔊 Sonido · Sí' : '🔇 Sonido · No';
    $('btn-sound').textContent = label;
    $('btn-sound-pause').textContent = label;
  }

  /** Muestra una pantalla (o ninguna con null). */
  show(name) {
    for (const [k, el] of Object.entries(this.screens)) {
      el.classList.toggle('hidden', k !== name);
    }
  }

  hud(visible) { this.hudEl.classList.toggle('hidden', !visible); }

  /** Posiciona el HUD para que coincida con la franja PLAY_TOP del canvas. */
  layoutHud(leftPx, widthPx, heightPx, topPx) {
    this.hudEl.style.left = `${leftPx}px`;
    this.hudEl.style.width = `${widthPx}px`;
    this.hudEl.style.top = `${topPx}px`;
    this.hudEl.style.height = `${heightPx}px`;
    this.powerEl.style.top = `${topPx + heightPx + 8}px`;
    this.powerEl.style.right = `${leftPx + 10}px`;
  }

  setStage(n) { this.stageEl.textContent = `Stage ${n}`; }

  setScore(score) {
    if (score === this._lastScore) return;
    this._lastScore = score;
    this.scoreEl.textContent = fmt(score);
  }

  setLives(lives) {
    if (lives === this._lastLives) return;
    this._lastLives = lives;
    this.livesEl.innerHTML = '';
    for (let i = 0; i < lives; i++) {
      const d = document.createElement('div');
      d.className = 'life';
      this.livesEl.appendChild(d);
    }
  }

  /** Estrellas del nivel en tiempo real (proyección según vidas perdidas). */
  setStars(n) {
    if (n === this._lastStars) return;
    this._lastStars = n;
    this.starEls.forEach((el, i) => el.classList.toggle('on', i < n));
  }

  /** Indicador de powerup temporal activo. */
  setPower(type, frac) {
    if (!type) { this.powerEl.classList.add('hidden'); return; }
    this.powerEl.classList.remove('hidden');
    this.powerLetter.textContent = type;
    this.powerLetter.style.background = POWERUPS[type].color;
    this.powerFill.style.width = `${Math.max(0, frac * 100).toFixed(1)}%`;
  }

  /** Overlay "STAGE N" con animación CSS. */
  stageIntro(n) {
    this.stageText.textContent = `STAGE ${n}`;
    this.stageOverlay.classList.remove('hidden');
    this.stageText.style.animation = 'none';
    void this.stageText.offsetWidth; // reinicia la animación CSS
    this.stageText.style.animation = '';
  }

  hideStageIntro() { this.stageOverlay.classList.add('hidden'); }

  /** Grilla del selector: 100 celdas, candado en los no desbloqueados.
   *  Con devUnlockAll (URL ?dev) se puede saltar a cualquier nivel. */
  renderLevels(save, totalStars, onPick, devUnlockAll = false) {
    $('levels-stars').textContent = totalStars;
    $('levels-stars-max').textContent = LEVELS.length * 3;
    $('levels-done').textContent = Object.keys(save.stars).length;
    $('levels-total').textContent = LEVELS.length;
    const grid = $('levels-grid');
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let n = 1; n <= LEVELS.length; n++) {
      const cell = document.createElement('button');
      cell.className = 'level-cell';
      if (devUnlockAll || n <= save.maxLevel) {
        const stars = save.stars[n] || 0;
        const starsHtml = Array.from({ length: 3 }, (_, i) =>
          `<span class="${i < stars ? '' : 'off'}">★</span>`).join('');
        cell.innerHTML = `<span class="num">${n}</span><span class="mini-stars">${starsHtml}</span>`;
        cell.onclick = () => onPick(n);
      } else {
        cell.classList.add('locked');
        cell.disabled = true;
        cell.innerHTML = `<span class="lock">🔒</span>`;
      }
      frag.appendChild(cell);
    }
    grid.appendChild(frag);
  }

  showComplete({ stars, levelScore, bonus, isLast }) {
    $('complete-title').textContent = isLast ? '¡JUEGO COMPLETADO!' : '¡Nivel completado!';
    $('complete-score').textContent = fmt(levelScore);
    $('complete-bonus').textContent = `+${fmt(bonus)}`;
    $('btn-next').classList.toggle('hidden', isLast);
    const els = document.querySelectorAll('#complete-stars .star');
    this._starTimers.forEach(clearTimeout);
    this._starTimers = [];
    els.forEach((el) => el.classList.remove('earned'));
    // las estrellas "se ganan" una a una
    for (let i = 0; i < stars; i++) {
      this._starTimers.push(setTimeout(() => els[i].classList.add('earned'), 450 + i * 380));
    }
    this.show('complete');
  }

  showGameOver(score, isRecord) {
    $('gameover-score').textContent = fmt(score);
    $('gameover-record').classList.toggle('hidden', !isRecord);
    this.show('gameover');
  }

  updateTitle(save, totalStars, hasProgress) {
    $('title-stars').textContent = totalStars;
    $('title-stars-max').textContent = LEVELS.length * 3;
    $('tagline-count').textContent = LEVELS.length;
    $('title-hiscore').textContent = fmt(save.highScore);
    const btn = $('btn-continue');
    btn.textContent = hasProgress && save.maxLevel > 1 ? `Continuar · Nivel ${save.maxLevel}` : 'Jugar';
  }
}
