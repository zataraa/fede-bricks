# NEOBRICKS · Brick Breaker

Juego tipo Arkanoid mobile-first: HTML5 Canvas + JavaScript vanilla (ES6+), sin dependencias.
100 niveles, 7 powerups, estrellas por nivel y guardado automático en `localStorage`.

## Probar en local

```bash
cd arkanoid
python3 -m http.server 8417
```

- **En la PC:** abrir `http://localhost:8417` (mouse para mover, click/espacio para lanzar, ←/→ teclado, P o Esc para pausa).
- **En el celular** (misma red WiFi): obtener la IP de la PC con `ipconfig getifaddr en0` y abrir `http://<IP-DE-LA-PC>:8417` en el navegador del teléfono.

> Se necesita un servidor (no abrir `index.html` con doble click) porque el juego usa módulos ES.

## Controles (móvil)

- Arrastrá el dedo en cualquier parte de la zona inferior: el paddle sigue la X del dedo.
- Tap corto: lanzar la bola / disparar el láser.
- El paddle está elevado (~81% de la altura) para que el dedo no lo tape.

## Estructura

```
index.html          pantallas (DOM) + canvas
css/style.css       HUD, pantallas, animaciones de estrellas
js/
  main.js           bootstrap + game loop (rAF con delta time)
  config.js         constantes: bloques, powerups, velocidades, puntos
  view.js           tamaño lógico (ancho fijo 480) + devicePixelRatio
  game.js           orquestador: estados, niveles, powerups, render
  physics.js        rebotes (paddle por punto de impacto, anti-loops, sub-pasos)
  levels.js         los 100 niveles como datos (1 char por celda)
  bricks.js         parseo + sprites pre-renderizados (grietas, glossy)
  paddle.js / ball.js / input.js / ui.js / storage.js
  particles.js / lasers.js / powerups.js   (pools fijos, sin GC por frame)
tools/validate-levels.mjs   valida los 100 niveles (node tools/validate-levels.mjs)
```

## Formato de nivel

Array de strings, 11 columnas × hasta 14 filas:
`.` vacío · `b r g y o p c v` colores (1 golpe) · `2`/`3` gris resistente · `X` indestructible.

El validador comprueba además que ningún bloque quede sellado por indestructibles
(flood-fill desde abajo donde los destructibles se vuelven transitables).
