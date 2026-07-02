// ===== Sistema de bloques: parseo de niveles y render con sprites =====
import { COLS, MAX_ROWS, BRICKS, BRICK_W, BRICK_H, BRICK_GAP, BRICK_SIDE, BRICK_TOP } from './config.js';
import { view } from './view.js';
import { shade, roundRect } from './utils.js';

/**
 * Convierte un mapa (array de strings, 1 char por celda) en el campo de juego.
 * '.' = vacío · letras = colores · '2'/'3' = grises resistentes · 'X' = indestructible.
 */
export function parseLevel(map) {
  const grid = [];
  const bricks = [];
  let destructible = 0;

  for (let r = 0; r < MAX_ROWS; r++) {
    grid.push(new Array(COLS).fill(null));
    const row = map[r] || '';
    for (let c = 0; c < COLS; c++) {
      const ch = row[c] || '.';
      const def = BRICKS[ch];
      if (!def) continue;
      const brick = {
        type: ch,
        row: r,
        col: c,
        x: BRICK_SIDE + c * (BRICK_W + BRICK_GAP),
        y: BRICK_TOP + r * (BRICK_H + BRICK_GAP),
        hp: def.hp,
        maxHp: def.hp,
        points: def.points,
        color: def.color,
        flash: 0,
        alive: true,
      };
      grid[r][c] = brick;
      bricks.push(brick);
      if (def.hp !== Infinity) destructible++;
    }
  }
  return { grid, bricks, destructible };
}

// ---------- Sprites pre-renderizados (perf en móvil) ----------
let sprites = new Map();

// Margen extra inferior del sprite para la sombra proyectada (en unidades lógicas)
export const BRICK_SHADOW = 3;

function makeBrickSprite(color, opts = {}) {
  const s = view.scale * view.dpr;
  const w = Math.max(2, Math.round(BRICK_W * s));
  const h = Math.max(2, Math.round(BRICK_H * s));
  const pad = Math.round(BRICK_SHADOW * s);
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h + pad;
  const ctx = cv.getContext('2d');
  const r = 3.5 * s; // redondeo leve: los bloques van pegados, separa el contorno

  // Sombra proyectada hacia abajo (profundidad)
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = '#000000';
  roundRect(ctx, 1 * s, pad, w - 2 * s, h, r);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Cuerpo con gradiente vertical
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, shade(color, 0.35));
  grad.addColorStop(0.45, color);
  grad.addColorStop(1, shade(color, -0.42));
  roundRect(ctx, 0, 0, w, h, r);
  ctx.fillStyle = grad;
  ctx.fill();

  // Franjas diagonales metálicas para el indestructible
  if (opts.metal) {
    ctx.save();
    roundRect(ctx, 0, 0, w, h, r);
    ctx.clip();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-0.6);
    const stripe = ctx.createLinearGradient(0, -h, 0, h);
    stripe.addColorStop(0, 'rgba(235,240,245,0.35)');
    stripe.addColorStop(0.5, 'rgba(235,240,245,0.12)');
    stripe.addColorStop(1, 'rgba(235,240,245,0.30)');
    ctx.fillStyle = stripe;
    for (let i = -3; i <= 3; i++) {
      ctx.fillRect(i * 12 * s - 3 * s, -h * 1.5, 6 * s, h * 3);
    }
    ctx.restore();
  }

  // Sombra interior inferior (volumen)
  const inner = ctx.createLinearGradient(0, h * 0.6, 0, h);
  inner.addColorStop(0, 'rgba(0,0,0,0)');
  inner.addColorStop(1, 'rgba(0,0,0,0.32)');
  roundRect(ctx, 0, 0, w, h, r);
  ctx.fillStyle = inner;
  ctx.fill();

  // Brillo glossy superior bien marcado
  const gloss = ctx.createLinearGradient(0, 0, 0, h * 0.52);
  gloss.addColorStop(0, 'rgba(255,255,255,0.6)');
  gloss.addColorStop(1, 'rgba(255,255,255,0.03)');
  roundRect(ctx, 1.5 * s, 1.2 * s, w - 3 * s, h * 0.46, r * 0.8);
  ctx.fillStyle = gloss;
  ctx.fill();

  // Borde luminoso superior + contorno oscuro
  ctx.strokeStyle = opts.metal ? 'rgba(255,255,255,0.35)' : shade(color, 0.6).replace('rgb', 'rgba').replace(')', ',0.85)');
  ctx.lineWidth = Math.max(1, 1.1 * s);
  ctx.beginPath();
  ctx.moveTo(r, 0.7 * s);
  ctx.lineTo(w - r, 0.7 * s);
  ctx.stroke();
  roundRect(ctx, 0.5 * s, 0.5 * s, w - s, h - s, r);
  ctx.strokeStyle = 'rgba(0,0,0,0.4)';
  ctx.lineWidth = s;
  ctx.stroke();

  // Grietas progresivas (bloques grises golpeados)
  if (opts.cracks) {
    ctx.strokeStyle = 'rgba(15,18,24,0.75)';
    ctx.lineWidth = Math.max(1, s);
    ctx.lineCap = 'round';
    const paths = [
      // primera grieta
      [[0.5, 0.0], [0.42, 0.35], [0.58, 0.6], [0.48, 1.0]],
      // segunda tanda de grietas
      [[0.15, 0.2], [0.32, 0.5], [0.2, 0.85]],
      [[0.85, 0.1], [0.7, 0.45], [0.83, 0.8]],
    ];
    const n = opts.cracks === 1 ? 1 : 3;
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      paths[i].forEach(([fx, fy], j) => {
        const px = fx * w, py = fy * h;
        j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.stroke();
    }
  }
  return cv;
}

/** Reconstruye los sprites al tamaño actual (llamar al redimensionar). */
export function buildBrickSprites() {
  sprites = new Map();
  for (const [ch, def] of Object.entries(BRICKS)) {
    if (ch === 'X') {
      sprites.set('X', makeBrickSprite(def.color, { metal: true }));
    } else if (def.hp === 1) {
      sprites.set(ch, makeBrickSprite(def.color));
    } else {
      // un sprite por estado de daño: 0 = intacto, 1+ = agrietado
      for (let dmg = 0; dmg < def.hp; dmg++) {
        sprites.set(`${ch}:${dmg}`, makeBrickSprite(shade(def.color, -dmg * 0.12), { cracks: dmg }));
      }
    }
  }
}

export function drawBricks(ctx, field) {
  for (const b of field.bricks) {
    if (!b.alive) continue;
    let key = b.type;
    if (b.maxHp !== Infinity && b.maxHp > 1) key = `${b.type}:${b.maxHp - b.hp}`;
    const spr = sprites.get(key);
    if (spr) ctx.drawImage(spr, b.x, b.y, BRICK_W, BRICK_H + BRICK_SHADOW);
    // Flash blanco al ser golpeado
    if (b.flash > 0) {
      ctx.globalAlpha = b.flash * 0.7;
      ctx.fillStyle = '#ffffff';
      roundRect(ctx, b.x, b.y, BRICK_W, BRICK_H, 4);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
}
