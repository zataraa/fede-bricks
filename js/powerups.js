// ===== Cápsulas de powerup que caen =====
import { POWERUPS, POWERUP_FALL_SPEED } from './config.js';
import { view } from './view.js';
import { roundRect, shade } from './utils.js';

const POOL = 6;
const CW = 36, CH = 21;

// Tabla de pesos acumulados para elección ponderada
const table = [];
{
  let acc = 0;
  for (const [type, def] of Object.entries(POWERUPS)) {
    acc += def.weight;
    table.push([acc, type]);
  }
}
export function pickPowerup() {
  const total = table[table.length - 1][0];
  const roll = Math.random() * total;
  for (const [acc, type] of table) if (roll < acc) return type;
  return 'D';
}

export class Capsules {
  constructor() {
    this.items = [];
    for (let i = 0; i < POOL; i++) this.items.push({ active: false, x: 0, y: 0, type: 'D', t: 0 });
  }

  get onScreen() {
    let n = 0;
    for (const c of this.items) if (c.active) n++;
    return n;
  }

  spawn(x, y, type) {
    for (const c of this.items) {
      if (c.active) continue;
      c.active = true; c.x = x; c.y = y; c.type = type; c.t = Math.random() * 10;
      return true;
    }
    return false;
  }

  update(dt, game) {
    const p = game.paddle;
    for (const c of this.items) {
      if (!c.active) continue;
      c.t += dt;
      c.y += POWERUP_FALL_SPEED * dt;
      if (c.y > view.H + CH) { c.active = false; continue; }
      // Recogida con el paddle
      if (
        c.y + CH / 2 >= p.y && c.y - CH / 2 <= p.y + p.h + 6 &&
        c.x + CW / 2 >= p.left && c.x - CW / 2 <= p.right
      ) {
        c.active = false;
        game.applyPowerup(c.type, c.x, c.y);
      }
    }
  }

  draw(ctx) {
    for (const c of this.items) {
      if (!c.active) continue;
      const def = POWERUPS[c.type];
      const rot = Math.sin(c.t * 3.2) * 0.16; // balanceo suave al caer
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(rot);

      // Cuerpo de la cápsula
      const grad = ctx.createLinearGradient(0, -CH / 2, 0, CH / 2);
      grad.addColorStop(0, shade(def.color, 0.4));
      grad.addColorStop(0.5, def.color);
      grad.addColorStop(1, shade(def.color, -0.35));
      roundRect(ctx, -CW / 2, -CH / 2, CW, CH, CH / 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Brillo
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = '#fff';
      roundRect(ctx, -CW / 2 + 4, -CH / 2 + 2.5, CW - 8, 5, 3);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Letra
      ctx.fillStyle = c.type === 'P' ? '#374151' : '#ffffff';
      ctx.font = '900 14px -apple-system, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.type, 0, 1.5);
      ctx.restore();
    }
  }

  clear() { for (const c of this.items) c.active = false; }
}
