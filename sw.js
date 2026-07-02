// ===== Service worker: red primero, caché como respaldo (offline) =====
// "Red primero" evita quedarse con código viejo: si hay conexión siempre
// llega la última versión; sin conexión se sirve la copia cacheada.
const CACHE = 'fedebricks-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './js/main.js',
  './js/game.js',
  './js/config.js',
  './js/levels.js',
  './js/view.js',
  './js/utils.js',
  './js/paddle.js',
  './js/ball.js',
  './js/bricks.js',
  './js/physics.js',
  './js/particles.js',
  './js/lasers.js',
  './js/powerups.js',
  './js/storage.js',
  './js/ui.js',
  './js/input.js',
  './js/audio.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
