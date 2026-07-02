// ===== Entrada: táctil (principal), mouse y teclado (secundario) =====
// El jugador arrastra el dedo en cualquier parte del canvas y el paddle
// sigue la X del dedo 1:1. Un tap (toque corto sin arrastre) lanza la
// bola / dispara el láser.
import { toLogicalX } from './view.js';

const TAP_MAX_MS = 280;
const TAP_MAX_MOVE = 14; // px CSS

export class Input {
  constructor(canvas) {
    this.targetX = null;     // X lógica deseada del paddle (null = sin toque)
    this.axis = 0;           // -1/0/1 teclado
    this.onTap = null;       // callback
    this.onPauseKey = null;  // callback

    this._pid = null;        // pointer activo
    this._downX = 0;
    this._downY = 0;
    this._downT = 0;
    this._moved = false;
    this._left = false;
    this._right = false;

    canvas.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (this._pid !== null) return; // solo el primer dedo controla
      this._pid = e.pointerId;
      this._downX = e.clientX;
      this._downY = e.clientY;
      this._downT = performance.now();
      this._moved = false;
      this.targetX = toLogicalX(e.clientX);
      try { canvas.setPointerCapture(e.pointerId); } catch { /* opcional */ }
    });

    canvas.addEventListener('pointermove', (e) => {
      // En desktop el mouse mueve el paddle incluso sin click.
      if (this._pid === null && e.pointerType === 'mouse') {
        this.targetX = toLogicalX(e.clientX);
        return;
      }
      if (e.pointerId !== this._pid) return;
      if (Math.abs(e.clientX - this._downX) + Math.abs(e.clientY - this._downY) > TAP_MAX_MOVE) {
        this._moved = true;
      }
      this.targetX = toLogicalX(e.clientX);
    });

    const end = (e) => {
      if (e.pointerId !== this._pid) return;
      this._pid = null;
      const quick = performance.now() - this._downT < TAP_MAX_MS;
      if (quick && !this._moved) this.onTap?.();
      if (e.pointerType !== 'mouse') this.targetX = null; // el dedo se levantó
    };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', (e) => { if (e.pointerId === this._pid) this._pid = null; });

    // Bloquear gestos del navegador (zoom, scroll, pull-to-refresh).
    canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    // Teclado (desktop)
    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowLeft') { this._left = true; this.targetX = null; }
      else if (e.code === 'ArrowRight') { this._right = true; this.targetX = null; }
      else if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); this.onTap?.(); }
      else if (e.code === 'Escape' || e.code === 'KeyP') { this.onPauseKey?.(); }
      this.axis = (this._right ? 1 : 0) - (this._left ? 1 : 0);
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowLeft') this._left = false;
      else if (e.code === 'ArrowRight') this._right = false;
      this.axis = (this._right ? 1 : 0) - (this._left ? 1 : 0);
    });
  }
}
