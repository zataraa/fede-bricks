// ===== Paddle =====
import { W, PADDLE_W, PADDLE_H, PADDLE_Y_RATIO } from './config.js';
import { view } from './view.js';
import { clamp, roundRect } from './utils.js';

// Estética Vaus clásica: cuerpo cromado plateado con tapas rojas.

export class Paddle {
  constructor() { this.reset(); }

  reset() {
    this.x = W / 2;          // centro
    this.w = PADDLE_W;
    this.targetW = PADDLE_W;
    this.h = PADDLE_H;
    this.mode = 'normal';    // 'normal' | 'L' (láser) | 'C' (imán)
  }

  get y() { return Math.round(view.H * PADDLE_Y_RATIO); }
  get left() { return this.x - this.w / 2; }
  get right() { return this.x + this.w / 2; }

  update(dt, targetX, axis) {
    // Seguimiento 1:1 del dedo con un suavizado muy corto.
    if (targetX != null) {
      this.x += (targetX - this.x) * Math.min(1, dt * 30);
    } else if (axis) {
      this.x += axis * 620 * dt;
    }
    // Animación suave del cambio de ancho (powerup E)
    this.w += (this.targetW - this.w) * Math.min(1, dt * 10);
    this.x = clamp(this.x, this.w / 2 + 2, W - this.w / 2 - 2);
  }

  draw(ctx, t) {
    const x = this.left, y = this.y, w = this.w, h = this.h;
    const r = h / 2;

    // Sombra proyectada (volumen)
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = '#000000';
    roundRect(ctx, x + 2, y + 4.5, w - 4, h, r);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Cuerpo cromado (bandas metálicas verticales)
    const chrome = ctx.createLinearGradient(0, y, 0, y + h);
    chrome.addColorStop(0, '#ffffff');
    chrome.addColorStop(0.28, '#e8edf2');
    chrome.addColorStop(0.5, '#a9b4c0');
    chrome.addColorStop(0.74, '#5d6975');
    chrome.addColorStop(0.9, '#7c8894');
    chrome.addColorStop(1, '#c3ccd5');
    roundRect(ctx, x, y, w, h, r);
    ctx.fillStyle = chrome;
    ctx.fill();

    // Tapas rojas en los extremos
    const cap = Math.max(13, w * 0.15);
    const red = ctx.createLinearGradient(0, y, 0, y + h);
    red.addColorStop(0, '#ff9d8a');
    red.addColorStop(0.4, '#e23d2c');
    red.addColorStop(1, '#7e110d');
    ctx.fillStyle = red;
    roundRect(ctx, x, y, cap, h, r);
    ctx.fill();
    roundRect(ctx, x + w - cap, y, cap, h, r);
    ctx.fill();

    // Separadores oscuros entre tapa y cuerpo
    ctx.fillStyle = 'rgba(20, 24, 30, 0.55)';
    ctx.fillRect(x + cap - 1, y + 1, 2, h - 2);
    ctx.fillRect(x + w - cap - 1, y + 1, 2, h - 2);

    // Brillo especular superior (recorre todo el paddle)
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, x + 3.5, y + 1.6, w - 7, h * 0.3, h * 0.18);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Cañones láser
    if (this.mode === 'L') {
      const cg = ctx.createLinearGradient(0, y - 7, 0, y);
      cg.addColorStop(0, '#ff8d7a');
      cg.addColorStop(1, '#8f1410');
      ctx.fillStyle = cg;
      for (const px of [x + cap / 2 - 3, x + w - cap / 2 - 3]) {
        roundRect(ctx, px, y - 7, 6, 9, 2);
        ctx.fill();
      }
    }
    // Línea magnética del imán
    if (this.mode === 'C') {
      ctx.globalAlpha = 0.55 + 0.35 * Math.sin(t * 7);
      ctx.fillStyle = '#7dffc0';
      roundRect(ctx, x + cap, y - 3.5, w - cap * 2, 3, 1.5);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
}
