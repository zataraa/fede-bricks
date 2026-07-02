// ===== Vista: tamaño lógico, escala y devicePixelRatio =====
import { W } from './config.js';
import { clamp } from './utils.js';

export const view = {
  W,            // ancho lógico (fijo)
  H: 900,       // alto lógico (según aspecto del viewport)
  scale: 1,     // px CSS por unidad lógica
  dpr: 1,
  offX: 0,      // letterbox horizontal (desktop)
  offY: 0,
  cssW: 0,
  cssH: 0,
};

export function resizeView(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const cssW = window.innerWidth;
  const cssH = window.innerHeight;

  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.style.width = cssW + 'px';
  canvas.style.height = cssH + 'px';

  // El alto lógico sigue el aspecto del dispositivo, con límites razonables.
  view.H = Math.round(clamp(W * (cssH / cssW), 720, 1160));
  view.scale = Math.min(cssW / W, cssH / view.H);
  view.offX = (cssW - W * view.scale) / 2;
  view.offY = (cssH - view.H * view.scale) / 2;
  view.dpr = dpr;
  view.cssW = cssW;
  view.cssH = cssH;
}

/** Aplica la transformación lógica→píxeles al contexto. */
export function applyTransform(ctx) {
  const s = view.scale * view.dpr;
  ctx.setTransform(s, 0, 0, s, view.offX * view.dpr, view.offY * view.dpr);
}

/** Convierte una coordenada X de pantalla (clientX) a unidades lógicas. */
export function toLogicalX(clientX) {
  return (clientX - view.offX) / view.scale;
}
