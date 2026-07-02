// Validador de niveles: node tools/validate-levels.mjs
import { LEVELS } from '../js/levels.js';

const COLS = 11, MAX_ROWS = 14;
const VALID = new Set(['.', 'b', 'r', 'g', 'y', 'o', 'p', 'c', 'v', '2', '3', 'X']);

let errors = 0;
const summary = [];

LEVELS.forEach((map, i) => {
  const n = i + 1;
  const issues = [];
  if (map.length > MAX_ROWS) issues.push(`tiene ${map.length} filas (máx ${MAX_ROWS})`);

  const grid = [];
  map.forEach((row, r) => {
    if (row.length !== COLS) issues.push(`fila ${r + 1} mide ${row.length} chars: "${row}"`);
    for (const ch of row) if (!VALID.has(ch)) issues.push(`fila ${r + 1} char inválido '${ch}'`);
    grid.push(row.padEnd(COLS, '.').slice(0, COLS).split(''));
  });

  // Conteo
  let destructible = 0, hits = 0, metal = 0;
  for (const row of grid) for (const ch of row) {
    if (ch === 'X') metal++;
    else if (ch === '2') { destructible++; hits += 2; }
    else if (ch === '3') { destructible++; hits += 3; }
    else if (ch !== '.') { destructible++; hits += 1; }
  }
  if (destructible === 0) issues.push('sin bloques destructibles');

  // Alcanzabilidad: flood-fill desde abajo; los destructibles alcanzados
  // se vuelven transitables (iterativo hasta converger).
  const R = grid.length;
  const passable = grid.map((row) => row.map((ch) => ch === '.'));
  const reached = grid.map((row) => row.map(() => false));
  let changed = true;
  while (changed) {
    changed = false;
    // celdas de la última fila + vacíos conectados
    const stack = [];
    for (let c = 0; c < COLS; c++) {
      if (passable[R - 1][c] && !reached[R - 1][c]) { reached[R - 1][c] = true; stack.push([R - 1, c]); }
      // un destructible en la última fila siempre es alcanzable desde abajo
      if (!passable[R - 1][c] && grid[R - 1][c] !== 'X' && grid[R - 1][c] !== '#') {
        passable[R - 1][c] = true; reached[R - 1][c] = true; stack.push([R - 1, c]); changed = true;
      }
    }
    while (stack.length) {
      const [r, c] = stack.pop();
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= R || nc < 0 || nc >= COLS || reached[nr][nc]) continue;
        if (passable[nr][nc]) { reached[nr][nc] = true; stack.push([nr, nc]); }
        else if (grid[nr][nc] !== 'X') {
          // bloque destructible adyacente a zona alcanzada → se rompe y abre paso
          passable[nr][nc] = true; reached[nr][nc] = true; stack.push([nr, nc]); changed = true;
        }
      }
    }
  }
  let unreachable = 0;
  for (let r = 0; r < R; r++) for (let c = 0; c < COLS; c++) {
    if (grid[r][c] !== '.' && grid[r][c] !== 'X' && !reached[r][c]) unreachable++;
  }
  if (unreachable > 0) issues.push(`${unreachable} bloque(s) inalcanzables (sellados por X)`);

  if (issues.length) {
    errors++;
    console.log(`✗ Nivel ${n}:`);
    issues.forEach((m) => console.log(`    - ${m}`));
  }
  summary.push({ n, destructible, hits, metal, rows: map.length });
});

console.log(`\nNiveles: ${LEVELS.length} (esperados 100)`);
if (LEVELS.length !== 100) errors++;

// Curva de dificultad: golpes necesarios por decena
console.log('\nGolpes promedio por decena:');
for (let d = 0; d < 10; d++) {
  const slice = summary.slice(d * 10, d * 10 + 10);
  if (!slice.length) continue;
  const avgHits = (slice.reduce((a, s) => a + s.hits, 0) / slice.length).toFixed(0);
  const avgBlocks = (slice.reduce((a, s) => a + s.destructible, 0) / slice.length).toFixed(0);
  console.log(`  ${String(d * 10 + 1).padStart(3)}-${d * 10 + 10}: ${avgBlocks} bloques · ${avgHits} golpes`);
}

console.log(errors ? `\n✗ ${errors} nivel(es) con problemas` : '\n✓ Todos los niveles OK');
process.exit(errors ? 1 : 0);
