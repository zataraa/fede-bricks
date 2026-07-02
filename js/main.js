// ===== Bootstrap: canvas, resize y game loop con delta time =====
import { resizeView } from './view.js';
import { Game } from './game.js';
import { audio } from './audio.js';

const canvas = document.getElementById('game');
resizeView(canvas);

const game = new Game(canvas);
window.__game = game; // accesible desde la consola para depurar

// El audio solo puede arrancar tras un gesto del usuario (iOS/Chrome)
document.addEventListener('pointerdown', () => audio.unlock(), { capture: true });
document.addEventListener('keydown', () => audio.unlock(), { capture: true });

// PWA: service worker para jugar offline / instalar en el móvil
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => { /* sin SW */ });
  });
}

function onResize() {
  resizeView(canvas);
  game.onResize();
}
window.addEventListener('resize', onResize);
window.addEventListener('orientationchange', () => setTimeout(onResize, 120));

// Game loop: requestAnimationFrame + delta time acotado
// (si la pestaña se congela, el dt máximo evita saltos de física).
let last = performance.now();
function frame(now) {
  const dt = Math.min((now - last) / 1000, 1 / 20);
  last = now;
  game.tick(dt);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
