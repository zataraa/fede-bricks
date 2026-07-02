// ===== Láseres del paddle (powerup L), con pool fijo =====
import { COLS, MAX_ROWS, BRICK_W, BRICK_H, BRICK_GAP, BRICK_SIDE, BRICK_TOP, PLAY_TOP } from './config.js';
import { clamp, roundRect } from './utils.js';

const POOL = 16;
const SPEED = 760;
const LW = 4, LH = 16;
const CELL_W = BRICK_W + BRICK_GAP;
const CELL_H = BRICK_H + BRICK_GAP;

export class Lasers {
  constructor() {
    this.items = [];
    for (let i = 0; i < POOL; i++) this.items.push({ active: false, x: 0, y: 0 });
  }

  /** Dispara dos rayos desde los cañones del paddle. */
  fire(paddle) {
    let fired = 0;
    for (const l of this.items) {
      if (l.active) continue;
      l.active = true;
      l.x = fired === 0 ? paddle.left + 9 : paddle.right - 9;
      l.y = paddle.y - 10;
      if (++fired === 2) break;
    }
    return fired > 0;
  }

  update(dt, game) {
    const grid = game.field.grid;
    for (const l of this.items) {
      if (!l.active) continue;
      l.y -= SPEED * dt;
      if (l.y < PLAY_TOP - LH) { l.active = false; continue; }
      // Colisión contra la grilla (celda directa, O(1))
      const c = Math.floor((l.x - BRICK_SIDE) / CELL_W);
      const r = Math.floor((l.y - BRICK_TOP) / CELL_H);
      if (c < 0 || c >= COLS || r < 0 || r >= MAX_ROWS) continue;
      const b = grid[r][c];
      if (b && b.alive && l.x >= b.x && l.x <= b.x + BRICK_W && l.y <= b.y + BRICK_H) {
        l.active = false;
        if (b.maxHp === Infinity) game.particles.spark(l.x, b.y + BRICK_H, '#cfe0ff', 4);
        game.onBrickHit(b, l.x, b.y + BRICK_H);
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#ff6b6b';
    for (const l of this.items) {
      if (!l.active) continue;
      ctx.globalAlpha = 0.45;
      roundRect(ctx, l.x - LW, l.y, LW * 2, LH, 3);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillRect(l.x - LW / 2, l.y, LW, LH);
    }
  }

  clear() { for (const l of this.items) l.active = false; }
}
