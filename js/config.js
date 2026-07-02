// ===== Configuración global del juego =====
// Todo el juego trabaja en coordenadas "lógicas": el ancho SIEMPRE es 480
// y el alto depende del aspecto del dispositivo (ver view.js).

export const W = 480;                 // ancho lógico fijo
export const PLAY_TOP = 90;           // techo del área de juego (el HUD ocupa esta franja)

// --- Grilla de bloques ---
export const COLS = 11;
export const MAX_ROWS = 14;
export const BRICK_GAP = 0;          // pegados estilo clásico: separa el contorno del sprite
export const BRICK_SIDE = 10;         // margen lateral de la grilla
export const BRICK_TOP = 98;          // los bloques empiezan justo bajo el HUD
export const BRICK_H = 24;
export const BRICK_W = (W - BRICK_SIDE * 2 - BRICK_GAP * (COLS - 1)) / COLS;

// --- Paddle ---
export const PADDLE_W = 88;
export const PADDLE_H = 14;
export const PADDLE_Y_RATIO = 0.81;   // elevado: deja zona libre para el dedo
export const PADDLE_ENLARGE = 1.5;    // factor del powerup E

// --- Bola ---
export const BALL_R = 7;
export const MAX_BOUNCE_ANGLE = 1.05; // ~60°: rebote máximo en el borde del paddle
export const MIN_DIR_Y = 0.20;        // anti-loops: nunca casi horizontal
export const MIN_DIR_X = 0.06;        // anti-loops: nunca casi vertical
export const MAX_BALLS = 6;

// Velocidad base por nivel (unidades lógicas / segundo) con tope jugable.
export function ballSpeedForLevel(n) {
  return Math.min(449 + (n - 1) * 3.29, 777);
}
// Aceleración suave dentro del nivel: hasta +14% tras ~2 minutos.
export const RAMP_RATE = 0.0012;
export const RAMP_MAX = 0.14;

// --- Tipos de bloque ---
// hp Infinity = indestructible (no cuenta para completar el nivel).
export const BRICKS = {
  c: { hp: 1, points: 40,  color: '#22d3ee' },
  b: { hp: 1, points: 50,  color: '#3b82f6' },
  g: { hp: 1, points: 60,  color: '#22c55e' },
  y: { hp: 1, points: 70,  color: '#facc15' },
  o: { hp: 1, points: 80,  color: '#fb923c' },
  r: { hp: 1, points: 90,  color: '#ef4444' },
  p: { hp: 1, points: 100, color: '#ec4899' },
  v: { hp: 1, points: 110, color: '#a78bfa' },
  '2': { hp: 2, points: 120, color: '#a8b0bc' },
  '3': { hp: 3, points: 160, color: '#7c8595' },
  X: { hp: Infinity, points: 0, color: '#2b3442' },
};

// --- Powerups ---
export const POWERUP_CHANCE = 0.09;      // prob. de drop al romper un bloque
export const POWERUP_MIN_GAP = 2.0;      // seg. mínimos entre cápsulas
export const POWERUP_MAX_ONSCREEN = 2;
export const POWERUP_FALL_SPEED = 105;
export const POWERUPS = {
  D: { weight: 24, color: '#22d3ee', dur: 0,  name: 'Multibola' },
  E: { weight: 20, color: '#3b82f6', dur: 12, name: 'Paddle grande' },
  S: { weight: 18, color: '#fb923c', dur: 0,  name: 'Lento' },
  L: { weight: 13, color: '#ef4444', dur: 10, name: 'Láser' },
  C: { weight: 12, color: '#22c55e', dur: 12, name: 'Imán' },
  B: { weight: 7,  color: '#ec4899', dur: 0,  name: 'Portal' },
  P: { weight: 5,  color: '#e5e7eb', dur: 0,  name: 'Vida extra' },
};

// --- Puntuación ---
export const LEVEL_BONUS = 500;
export const LIFE_BONUS = 150;        // por vida restante al completar
export const PORTAL_BONUS = 1000;     // por escapar con el portal B
export const START_LIVES = 3;
export const MAX_LIVES = 6;
