// ===== Guardado en localStorage =====
import { LEVELS } from './levels.js';

const KEY = 'neobricks.save.v1';

const defaults = () => ({ maxLevel: 1, stars: {}, highScore: 0 });

let data = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const d = JSON.parse(raw);
    return { ...defaults(), ...d };
  } catch {
    return defaults();
  }
}

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* sin storage */ }
}

export function getSave() { return data; }

export function hasProgress() {
  return data.maxLevel > 1 || data.highScore > 0 || Object.keys(data.stars).length > 0;
}

export function totalStars() {
  return Object.values(data.stars).reduce((a, b) => a + b, 0);
}

/** Registra nivel completado: conserva las mejores estrellas y desbloquea el siguiente. */
export function recordLevelComplete(level, stars) {
  data.stars[level] = Math.max(data.stars[level] || 0, stars);
  data.maxLevel = Math.min(LEVELS.length, Math.max(data.maxLevel, level + 1));
  persist();
}

/** Devuelve true si el score es nuevo récord. */
export function recordScore(score) {
  if (score > data.highScore) {
    data.highScore = score;
    persist();
    return true;
  }
  return false;
}

export function resetProgress() {
  data = defaults();
  persist();
}
