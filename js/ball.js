// ===== Bola (con estela) =====
import { BALL_R } from './config.js';
import { view } from './view.js';

const TRAIL = 9;

export class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;            // dirección unitaria
    this.dy = -1;
    this.stuck = true;      // pegada al paddle (saque o imán)
    this.caught = false;    // pegada por el powerup C
    this.stuckOffset = 0;   // offset respecto al centro del paddle
    this.dead = false;
    // Estela: buffer circular preasignado (sin basura por frame)
    this.trailX = new Float32Array(TRAIL);
    this.trailY = new Float32Array(TRAIL);
    this.trailN = 0;
    this.trailHead = 0;
  }

  setAngle(a) {           // a=0 → recto hacia arriba
    this.dx = Math.sin(a);
    this.dy = -Math.cos(a);
  }

  pushTrail() {
    this.trailHead = (this.trailHead + 1) % TRAIL;
    this.trailX[this.trailHead] = this.x;
    this.trailY[this.trailHead] = this.y;
    if (this.trailN < TRAIL) this.trailN++;
  }

  clearTrail() { this.trailN = 0; }

  draw(ctx, sprite) {
    // Estela sutil
    for (let i = this.trailN - 1; i >= 1; i--) {
      const idx = (this.trailHead - i + TRAIL * 2) % TRAIL;
      const f = 1 - i / this.trailN;
      ctx.globalAlpha = f * 0.22;
      ctx.beginPath();
      ctx.arc(this.trailX[idx], this.trailY[idx], BALL_R * (0.4 + f * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = '#bfffe0';
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    const s = BALL_R * 2.6; // el sprite incluye el glow
    ctx.drawImage(sprite, this.x - s, this.y - s, s * 2, s * 2);
  }
}

/** Sprite de la bola con halo, pre-renderizado al tamaño real. */
export function makeBallSprite() {
  const s = view.scale * view.dpr;
  const R = BALL_R * 2.6 * s;
  const cv = document.createElement('canvas');
  cv.width = cv.height = Math.ceil(R * 2);
  const ctx = cv.getContext('2d');
  const cx = R;

  // Halo
  let g = ctx.createRadialGradient(cx, cx, BALL_R * s * 0.4, cx, cx, R);
  g.addColorStop(0, 'rgba(191,255,224,0.7)');
  g.addColorStop(0.5, 'rgba(127,240,192,0.22)');
  g.addColorStop(1, 'rgba(127,240,192,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, R * 2, R * 2);

  // Núcleo
  g = ctx.createRadialGradient(cx - BALL_R * s * 0.35, cx - BALL_R * s * 0.4, BALL_R * s * 0.15, cx, cx, BALL_R * s);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.6, '#e8fff3');
  g.addColorStop(1, '#9adfc0');
  ctx.beginPath();
  ctx.arc(cx, cx, BALL_R * s, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  return cv;
}
