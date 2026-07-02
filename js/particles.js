// ===== Partículas con pool fijo (sin asignaciones por frame) =====
import { rand } from './utils.js';

const POOL = 260;

export class Particles {
  constructor() {
    this.items = [];
    for (let i = 0; i < POOL; i++) {
      this.items.push({ active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 1, size: 3, color: '#fff', grav: 320 });
    }
    this._next = 0;
  }

  _get() {
    // búsqueda circular del próximo slot libre (o roba el más viejo)
    for (let i = 0; i < POOL; i++) {
      const p = this.items[(this._next + i) % POOL];
      if (!p.active) { this._next = (this._next + i + 1) % POOL; return p; }
    }
    return this.items[this._next++ % POOL];
  }

  /** Fragmentos al romper un bloque. */
  burst(x, y, color, n = 10, speed = 170) {
    for (let i = 0; i < n; i++) {
      const p = this._get();
      const a = rand(0, Math.PI * 2);
      const v = rand(speed * 0.3, speed);
      p.active = true;
      p.x = x + rand(-8, 8); p.y = y + rand(-5, 5);
      p.vx = Math.cos(a) * v; p.vy = Math.sin(a) * v - 60;
      p.maxLife = p.life = rand(0.35, 0.7);
      p.size = rand(2.5, 5.5);
      p.color = color;
      p.grav = 420;
    }
  }

  /** Chispas (láser contra metal, portal, etc.). */
  spark(x, y, color = '#fff7c0', n = 5) {
    for (let i = 0; i < n; i++) {
      const p = this._get();
      const a = rand(-Math.PI, 0); // hacia arriba
      const v = rand(60, 200);
      p.active = true;
      p.x = x; p.y = y;
      p.vx = Math.cos(a) * v; p.vy = Math.sin(a) * v;
      p.maxLife = p.life = rand(0.15, 0.35);
      p.size = rand(1.5, 3);
      p.color = color;
      p.grav = 500;
    }
  }

  update(dt) {
    for (const p of this.items) {
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) { p.active = false; continue; }
      p.vy += p.grav * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  }

  draw(ctx) {
    for (const p of this.items) {
      if (!p.active) continue;
      const f = p.life / p.maxLife;
      ctx.globalAlpha = f;
      ctx.fillStyle = p.color;
      const s = p.size * (0.5 + f * 0.5);
      ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
    }
    ctx.globalAlpha = 1;
  }

  clear() { for (const p of this.items) p.active = false; }
}
