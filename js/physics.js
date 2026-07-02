// ===== Física de la bola =====
// - Sub-pasos para evitar túneles a alta velocidad.
// - Rebote en paddle según el punto de impacto (clave para apuntar).
// - Colisión con bloques distinguiendo lado horizontal/vertical/esquina.
// - Anti-loops: la dirección nunca queda casi horizontal ni casi vertical.
import {
  W, PLAY_TOP, BALL_R, MAX_BOUNCE_ANGLE, MIN_DIR_X, MIN_DIR_Y,
  COLS, MAX_ROWS, BRICK_W, BRICK_H, BRICK_GAP, BRICK_SIDE, BRICK_TOP,
} from './config.js';
import { view } from './view.js';
import { clamp } from './utils.js';

const CELL_W = BRICK_W + BRICK_GAP;
const CELL_H = BRICK_H + BRICK_GAP;
const MAX_STEP = 5.5; // unidades lógicas por sub-paso (< radio de la bola)

/** Normaliza la dirección y evita ángulos degenerados. */
export function fixDirection(ball) {
  let { dx, dy } = ball;
  const len = Math.hypot(dx, dy) || 1;
  dx /= len; dy /= len;
  // casi horizontal → empujar verticalmente
  if (Math.abs(dy) < MIN_DIR_Y) {
    dy = (dy === 0 ? (Math.random() < 0.5 ? -1 : 1) : Math.sign(dy)) * MIN_DIR_Y;
    dx = Math.sign(dx || 1) * Math.sqrt(1 - dy * dy);
  }
  // casi vertical → empujar horizontalmente
  if (Math.abs(dx) < MIN_DIR_X) {
    dx = (dx === 0 ? (Math.random() < 0.5 ? -1 : 1) : Math.sign(dx)) * MIN_DIR_X;
    dy = Math.sign(dy) * Math.sqrt(1 - dx * dx);
  }
  ball.dx = dx; ball.dy = dy;
}

/**
 * Avanza una bola durante dt. Llama callbacks del juego:
 *   game.onBrickHit(brick, x, y) · game.onPaddleHit(ball) · game.onBallLost(ball)
 */
export function stepBall(game, ball, dt) {
  let remaining = game.currentBallSpeed() * dt;
  while (remaining > 0 && !ball.dead && !ball.stuck) {
    const step = Math.min(MAX_STEP, remaining);
    remaining -= step;
    ball.x += ball.dx * step;
    ball.y += ball.dy * step;

    // --- Paredes laterales y techo ---
    if (ball.x < BALL_R) { ball.x = BALL_R; ball.dx = Math.abs(ball.dx); fixDirection(ball); game.onWallHit(); }
    else if (ball.x > W - BALL_R) { ball.x = W - BALL_R; ball.dx = -Math.abs(ball.dx); fixDirection(ball); game.onWallHit(); }
    if (ball.y < PLAY_TOP + BALL_R) { ball.y = PLAY_TOP + BALL_R; ball.dy = Math.abs(ball.dy); fixDirection(ball); game.onWallHit(); }

    // --- Paddle ---
    if (ball.dy > 0) collidePaddle(game, ball);

    // --- Bloques ---
    collideBricks(game, ball);

    // --- Se perdió por el borde inferior REAL de la pantalla ---
    if (ball.y > view.H + BALL_R * 3) {
      ball.dead = true;
      game.onBallLost(ball);
      return;
    }
  }
}

function collidePaddle(game, ball) {
  const p = game.paddle;
  const hw = p.w / 2;
  if (
    ball.y + BALL_R >= p.y && ball.y - BALL_R <= p.y + p.h &&
    ball.x >= p.left - BALL_R && ball.x <= p.right + BALL_R
  ) {
    // Imán: la bola se queda pegada
    if (game.activePower === 'C') {
      ball.stuck = true;
      ball.caught = true;
      ball.stuckOffset = clamp(ball.x - p.x, -hw + BALL_R, hw - BALL_R);
      ball.y = p.y - BALL_R - 1;
      game.onPaddleHit(ball);
      return;
    }
    // Rebote según punto de impacto: centro = vertical, bordes = ángulo abierto.
    const t = clamp((ball.x - p.x) / hw, -1, 1);
    ball.setAngle(t * MAX_BOUNCE_ANGLE);
    ball.y = p.y - BALL_R - 0.1;
    fixDirection(ball);
    game.onPaddleHit(ball);
  }
}

function collideBricks(game, ball) {
  const grid = game.field.grid;
  // Celdas candidatas alrededor de la bola (la grilla es regular → O(1))
  const c0 = clamp(Math.floor((ball.x - BALL_R - BRICK_SIDE) / CELL_W), 0, COLS - 1);
  const c1 = clamp(Math.floor((ball.x + BALL_R - BRICK_SIDE) / CELL_W), 0, COLS - 1);
  const r0 = clamp(Math.floor((ball.y - BALL_R - BRICK_TOP) / CELL_H), 0, MAX_ROWS - 1);
  const r1 = clamp(Math.floor((ball.y + BALL_R - BRICK_TOP) / CELL_H), 0, MAX_ROWS - 1);
  if (ball.y - BALL_R > BRICK_TOP + MAX_ROWS * CELL_H) return; // debajo de la grilla

  let best = null, bestD = Infinity, bestCx = 0, bestCy = 0;
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      const b = grid[r][c];
      if (!b || !b.alive) continue;
      const cx = clamp(ball.x, b.x, b.x + BRICK_W);
      const cy = clamp(ball.y, b.y, b.y + BRICK_H);
      const ddx = ball.x - cx, ddy = ball.y - cy;
      const d = ddx * ddx + ddy * ddy;
      if (d <= BALL_R * BALL_R && d < bestD) {
        best = b; bestD = d; bestCx = cx; bestCy = cy;
      }
    }
  }
  if (!best) return;

  // Resolver el rebote según el lado de impacto
  let dx = ball.x - bestCx, dy = ball.y - bestCy;
  if (dx === 0 && dy === 0) { dx = -ball.dx; dy = -ball.dy; } // centro dentro del bloque
  const adx = Math.abs(dx), ady = Math.abs(dy);

  if (adx > ady * 1.6) {
    // impacto lateral → rebote horizontal
    ball.dx = Math.sign(dx) * Math.abs(ball.dx);
    ball.x = bestCx + Math.sign(dx) * (BALL_R + 0.1);
  } else if (ady > adx * 1.6) {
    // impacto arriba/abajo → rebote vertical
    ball.dy = Math.sign(dy) * Math.abs(ball.dy);
    ball.y = bestCy + Math.sign(dy) * (BALL_R + 0.1);
  } else {
    // esquina → reflejar ambos ejes
    ball.dx = Math.sign(dx || ball.dx) * Math.abs(ball.dx);
    ball.dy = Math.sign(dy || ball.dy) * Math.abs(ball.dy);
    const len = Math.hypot(dx, dy) || 1;
    ball.x = bestCx + (dx / len) * (BALL_R + 0.1);
    ball.y = bestCy + (dy / len) * (BALL_R + 0.1);
  }
  fixDirection(ball);
  game.onBrickHit(best, ball.x, ball.y);
}
