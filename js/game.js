// ===== Orquestador del juego: estados, niveles, powerups y render =====
import {
  W, PLAY_TOP, BALL_R, PADDLE_W, START_LIVES, MAX_LIVES, MAX_BALLS,
  POWERUPS, POWERUP_CHANCE, POWERUP_MIN_GAP, POWERUP_MAX_ONSCREEN,
  LEVEL_BONUS, LIFE_BONUS, PORTAL_BONUS,
  ballSpeedForLevel, RAMP_RATE, RAMP_MAX, PADDLE_ENLARGE,
} from './config.js';
import { view, applyTransform } from './view.js';
import { clamp, rand, roundRect, TAU } from './utils.js';
import { Paddle } from './paddle.js';
import { Ball, makeBallSprite } from './ball.js';
import { parseLevel, buildBrickSprites, drawBricks } from './bricks.js';
import { stepBall, fixDirection } from './physics.js';
import { Particles } from './particles.js';
import { Lasers } from './lasers.js';
import { Capsules, pickPowerup } from './powerups.js';
import { LEVELS } from './levels.js';
import * as storage from './storage.js';
import { UI } from './ui.js';
import { Input } from './input.js';
import { audio } from './audio.js';

const STAGE_INTRO_TIME = 1.2;

// Modo desarrollo (?dev en la URL): desbloquea todos los niveles en el selector.
export const DEV_MODE = new URLSearchParams(location.search).has('dev');

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ui = new UI();
    this.input = new Input(canvas);

    this.state = 'title';
    this.level = 1;
    this.score = 0;
    this.lives = START_LIVES;

    this.paddle = new Paddle();
    this.balls = [];
    this.field = parseLevel([]);
    this.particles = new Particles();
    this.lasers = new Lasers();
    this.capsules = new Capsules();

    // Partículas ambientales (luciérnagas/polvo flotando, preasignadas)
    this.ambient = [];
    for (let i = 0; i < 26; i++) {
      this.ambient.push({
        x: rand(0, W), y: rand(0, 1160), r: rand(1, 2.6),
        sp: rand(5, 16), ph: rand(0, TAU), a: rand(0.08, 0.3),
      });
    }

    this.time = 0;            // reloj global (animaciones)
    this.levelTime = 0;       // tiempo dentro del nivel (aceleración)
    this.slowFactor = 1;      // powerup S
    this.activePower = null;  // 'E' | 'L' | 'C'
    this.powerTimer = 0;
    this.powerDur = 1;
    this.laserCd = 0;
    this.portal = null;       // powerup B
    this.shake = 0;
    this.stageTimer = 0;
    this.lastDrop = -99;
    this.levelStartScore = 0;
    this.livesLost = 0;

    this.input.onTap = () => this.onTap();
    this.input.onPauseKey = () => {
      if (this.state === 'playing') this.pause();
      else if (this.state === 'paused') this.resume();
    };

    this.ui.bind({
      onContinue: () => this.startRun(storage.getSave().maxLevel),
      onLevels: () => this.goLevels(),
      onLevelsBack: () => this.toMenu(),
      onNewGame: () => {
        if (storage.hasProgress()) this.ui.show('confirm');
        else this.startRun(1);
      },
      onConfirmNew: () => { storage.resetProgress(); this.startRun(1); },
      onCancelNew: () => this.ui.show('title'),
      onPause: () => this.pause(),
      onResume: () => this.resume(),
      onRestart: () => { this.score = this.levelStartScore; this.loadLevel(this.level); },
      onMenu: () => this.toMenu(),
      onNext: () => this.nextLevel(),
      onRetry: () => { this.score = this.levelStartScore; this.lives = START_LIVES; this.loadLevel(this.level); },
      onSound: () => this.ui.setSound(!audio.toggleMuted()),
    });
    this.ui.setSound(!audio.muted);

    // Pausa automática si la pestaña/app pasa a segundo plano
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pause();
    });

    this.onResize();
    this.toMenu();
  }

  // ---------- Ciclo de vida ----------
  onResize() {
    buildBrickSprites();
    this.ballSprite = makeBallSprite();
    this._bg = null; // se regenera en el próximo render
    // El HUD (HTML) se alinea con la franja PLAY_TOP del canvas
    this.ui.layoutHud(view.offX, W * view.scale, PLAY_TOP * view.scale, view.offY);
  }

  /** Selector de niveles (desde el título o tras completar un nivel). */
  goLevels() {
    this.state = 'title';
    this.ui.hud(false);
    this.ui.setPower(null);
    this.ui.hideStageIntro();
    this.ui.renderLevels(storage.getSave(), storage.totalStars(), (n) => this.startRun(n), DEV_MODE);
    this.ui.show('levels');
  }

  toMenu() {
    this.state = 'title';
    audio.stopMusic();
    this.ui.hud(false);
    this.ui.setPower(null);
    this.ui.hideStageIntro();
    this.ui.updateTitle(storage.getSave(), storage.totalStars(), storage.hasProgress());
    this.ui.show('title');
  }

  startRun(level) {
    this.score = 0;
    this.lives = START_LIVES;
    this.loadLevel(level);
  }

  loadLevel(n) {
    this.level = clamp(n, 1, LEVELS.length);
    this.field = parseLevel(LEVELS[this.level - 1]);
    this.levelStartScore = this.score;
    this.livesLost = 0;
    this.levelTime = 0;
    this.slowFactor = 1;
    this.shake = 0;
    this.portal = null;
    this.lastDrop = -99;
    this.clearPaddlePower();
    this.particles.clear();
    this.lasers.clear();
    this.capsules.clear();
    this.paddle.reset();
    this.spawnServeBall();

    this.state = 'stageintro';
    this.stageTimer = STAGE_INTRO_TIME;
    audio.startMusic();
    this.ui.show(null);
    this.ui.hud(true);
    this.ui.setStage(this.level);
    this.ui.setScore(this.score);
    this.ui.setLives(this.lives);
    this.ui.setStars(3);
    this.ui.stageIntro(this.level);
  }

  spawnServeBall() {
    const b = new Ball(this.paddle.x, this.paddle.y - BALL_R - 1);
    this.balls = [b];
  }

  nextLevel() {
    if (this.level >= LEVELS.length) { this.toMenu(); return; }
    this.loadLevel(this.level + 1);
  }

  pause() {
    if (this.state !== 'playing' && this.state !== 'stageintro') return;
    this._stateBeforePause = this.state;
    this.state = 'paused';
    audio.stopMusic();
    this.ui.show('pause');
  }

  resume() {
    this.state = this._stateBeforePause || 'playing';
    audio.startMusic();
    this.ui.show(null);
  }

  // ---------- Entrada ----------
  onTap() {
    if (this.state !== 'playing') return;
    let launched = false;
    for (const b of this.balls) {
      if (b.stuck) {
        // El ángulo de saque depende de dónde está la bola sobre el paddle
        const t = clamp(b.stuckOffset / (this.paddle.w / 2), -1, 1);
        b.setAngle(t * 0.85 + rand(-0.06, 0.06));
        b.stuck = false;
        b.caught = false;
        fixDirection(b);
        launched = true;
      }
    }
    if (launched) audio.launch();
    // Si no había nada que lanzar y tenemos láser → disparar
    if (!launched && this.activePower === 'L' && this.laserCd <= 0) {
      if (this.lasers.fire(this.paddle)) { this.laserCd = 0.18; audio.laser(); }
    }
  }

  // ---------- Update ----------
  currentBallSpeed() {
    const ramp = 1 + Math.min(RAMP_MAX, this.levelTime * RAMP_RATE);
    return ballSpeedForLevel(this.level) * ramp * this.slowFactor;
  }

  tick(dt) {
    this.time += dt;
    if (this.state === 'stageintro') {
      this.updatePaddleAndStuck(dt);
      this.stageTimer -= dt;
      if (this.stageTimer <= 0) {
        this.state = 'playing';
        this.ui.hideStageIntro();
      }
    } else if (this.state === 'playing') {
      this.update(dt);
    }
    this.render();
  }

  updatePaddleAndStuck(dt) {
    this.paddle.update(dt, this.input.targetX, this.input.axis);
    for (const b of this.balls) {
      if (b.stuck) {
        b.x = clamp(this.paddle.x + b.stuckOffset, BALL_R, W - BALL_R);
        b.y = this.paddle.y - BALL_R - 1;
        b.clearTrail();
      }
    }
  }

  update(dt) {
    this.levelTime += dt;
    // El powerup S vuelve a la normalidad gradualmente
    if (this.slowFactor < 1) this.slowFactor = Math.min(1, this.slowFactor + dt * 0.045);

    this.updatePaddleAndStuck(dt);

    // Bolas
    for (const b of this.balls) {
      if (!b.stuck && !b.dead) {
        stepBall(this, b, dt);
        b.pushTrail();
      }
    }
    if (this.balls.some((b) => b.dead)) {
      this.balls = this.balls.filter((b) => !b.dead);
      if (this.balls.length === 0) this.loseLife();
    }

    // Powerup temporal del paddle
    if (this.activePower) {
      this.powerTimer -= dt;
      this.ui.setPower(this.activePower, this.powerTimer / this.powerDur);
      if (this.powerTimer <= 0) this.clearPaddlePower();
    }
    if (this.laserCd > 0) this.laserCd -= dt;
    if (this.activePower === 'L') {
      // disparo automático periódico además del tap
      this._autoLaser = (this._autoLaser || 0) - dt;
      if (this._autoLaser <= 0) {
        if (this.lasers.fire(this.paddle)) audio.laser();
        this._autoLaser = 1.1;
      }
    }

    this.lasers.update(dt, this);
    this.capsules.update(dt, this);
    this.particles.update(dt);

    // Portal B: el paddle lo toca en el borde derecho → siguiente nivel
    if (this.portal) {
      this.portal.t += dt;
      if (this.paddle.right >= W - 12) {
        this.particles.burst(W - 10, this.paddle.y, '#ec4899', 22, 240);
        this.levelComplete(true);
        return;
      }
    }

    if (this.shake > 0) this.shake *= Math.exp(-7 * dt);

    // ¿Nivel completado?
    if (this.field.destructible <= 0 && (this.state === 'playing')) {
      this.levelComplete(false);
    }
  }

  // ---------- Eventos de juego ----------
  onPaddleHit() { audio.paddle(); }

  onWallHit() { audio.wall(); }

  onBrickHit(brick, x, y) {
    if (brick.maxHp === Infinity) {
      brick.flash = 0.5; // los metálicos solo destellan
      audio.metal();
      return;
    }
    brick.hp--;
    if (brick.hp > 0) {
      brick.flash = 1;
      this.particles.spark(x, y, '#ffffff', 3);
      audio.brickHit();
      return;
    }
    // Destruido
    brick.alive = false;
    this.field.grid[brick.row][brick.col] = null;
    this.field.destructible--;
    this.addScore(brick.points);
    audio.brickBreak(brick.points);
    this.particles.burst(brick.x + 18, brick.y + 10, brick.color, brick.maxHp > 1 ? 14 : 9);
    if (brick.maxHp > 1) this.addShake(2.2); // golpe seco al romper resistentes
    this.maybeDropPowerup(brick);
  }

  onBallLost() { /* la limpieza se hace en update() cuando no quedan bolas */ }

  loseLife() {
    this.lives--;
    this.livesLost++;
    this.addShake(7);
    this.clearPaddlePower();
    this.slowFactor = 1;
    this.ui.setLives(this.lives);
    // estrellas en vivo: 3 sin perder vidas, 2 con una, 1 mínimo
    this.ui.setStars(Math.max(1, 3 - this.livesLost));
    if (this.lives <= 0) {
      const isRecord = storage.recordScore(this.score);
      this.state = 'gameover';
      audio.stopMusic();
      audio.gameover();
      this.ui.showGameOver(this.score, isRecord);
    } else {
      audio.lose();
      this.spawnServeBall();
    }
  }

  addScore(pts) {
    this.score += pts;
    this.ui.setScore(this.score);
  }

  addShake(mag) { this.shake = Math.max(this.shake, mag); }

  levelComplete(viaPortal) {
    const bonus = LEVEL_BONUS + this.lives * LIFE_BONUS + (viaPortal ? PORTAL_BONUS : 0);
    this.addScore(bonus);
    // Estrellas: 3 sin perder vidas, 2 perdiendo una, 1 por completar
    const stars = this.livesLost === 0 ? 3 : this.livesLost === 1 ? 2 : 1;
    storage.recordLevelComplete(this.level, stars);
    storage.recordScore(this.score);
    this.state = 'levelcomplete';
    audio.stopMusic();
    audio.complete();
    this.ui.setPower(null);
    this.ui.showComplete({
      stars,
      levelScore: this.score - this.levelStartScore,
      bonus,
      isLast: this.level >= LEVELS.length,
    });
  }

  // ---------- Powerups ----------
  maybeDropPowerup(brick) {
    if (Math.random() > POWERUP_CHANCE) return;
    if (this.levelTime - this.lastDrop < POWERUP_MIN_GAP) return;
    if (this.capsules.onScreen >= POWERUP_MAX_ONSCREEN) return;
    this.lastDrop = this.levelTime;
    this.capsules.spawn(brick.x + 18, brick.y + 10, pickPowerup());
  }

  applyPowerup(type, x, y) {
    this.particles.burst(x, y, POWERUPS[type].color, 12, 140);
    if (type === 'P') audio.extraLife();
    else audio.powerup();
    switch (type) {
      case 'P': // vida extra (el más raro)
        this.lives = Math.min(MAX_LIVES, this.lives + 1);
        this.ui.setLives(this.lives);
        break;
      case 'D': { // multibola: divide una bola en 3
        const src = this.balls.find((b) => !b.stuck) || this.balls[0];
        if (!src) break;
        // si la fuente estaba pegada al paddle, se lanza primero
        if (src.stuck) { src.stuck = false; src.caught = false; src.setAngle(0); }
        const baseAngle = Math.atan2(src.dx, -src.dy);
        for (const da of [-0.55, 0.55]) {
          if (this.balls.length >= MAX_BALLS) break;
          const nb = new Ball(src.x, src.y);
          nb.stuck = false;
          nb.setAngle(baseAngle + da);
          fixDirection(nb);
          this.balls.push(nb);
        }
        break;
      }
      case 'S': // lenta (recupera gradualmente en update)
        this.slowFactor = 0.55;
        break;
      case 'B': // portal de escape en el lado derecho
        this.portal = { t: 0 };
        break;
      case 'E':
        this.setPaddlePower('E');
        break;
      case 'L':
        this.setPaddlePower('L');
        break;
      case 'C':
        this.setPaddlePower('C');
        break;
    }
  }

  /** Solo un powerup "de paddle" a la vez: el nuevo reemplaza al anterior. */
  setPaddlePower(type) {
    this.clearPaddlePower();
    this.activePower = type;
    this.powerDur = POWERUPS[type].dur;
    this.powerTimer = this.powerDur;
    if (type === 'E') this.paddle.targetW = PADDLE_W * PADDLE_ENLARGE;
    this.paddle.mode = type === 'L' ? 'L' : type === 'C' ? 'C' : 'normal';
    this.ui.setPower(type, 1);
  }

  clearPaddlePower() {
    if (this.activePower === 'C') {
      // si quedó una bola atrapada por el imán, se relanza sola
      for (const b of this.balls) {
        if (b.stuck && b.caught) {
          const t = clamp(b.stuckOffset / (this.paddle.w / 2), -1, 1);
          b.setAngle(t * 0.85);
          b.stuck = false;
          b.caught = false;
          fixDirection(b);
        }
      }
    }
    this.activePower = null;
    this.paddle.targetW = PADDLE_W;
    this.paddle.mode = 'normal';
    this.ui.setPower(null);
  }

  // ---------- Render ----------
  buildBackground() {
    const cv = document.createElement('canvas');
    cv.width = this.canvas.width;
    cv.height = this.canvas.height;
    const c = cv.getContext('2d');
    // Degradado oscuro tipo selva, con variación de tono
    const g = c.createLinearGradient(0, 0, 0, cv.height);
    g.addColorStop(0, '#1a4a2e');
    g.addColorStop(0.3, '#123524');
    g.addColorStop(0.62, '#0c2417');
    g.addColorStop(1, '#050f09');
    c.fillStyle = g;
    c.fillRect(0, 0, cv.width, cv.height);
    // Luz cálida lateral (profundidad)
    const warm = c.createRadialGradient(cv.width * 0.12, cv.height * 0.75, 0, cv.width * 0.12, cv.height * 0.75, cv.width * 0.9);
    warm.addColorStop(0, 'rgba(180, 190, 60, 0.10)');
    warm.addColorStop(1, 'rgba(180, 190, 60, 0)');
    c.fillStyle = warm;
    c.fillRect(0, 0, cv.width, cv.height);
    // "Bokeh" sutil
    for (let i = 0; i < 26; i++) {
      const x = Math.random() * cv.width, y = Math.random() * cv.height;
      const r = (14 + Math.random() * 60) * view.dpr;
      const rg = c.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, 'rgba(90, 215, 150, 0.06)');
      rg.addColorStop(1, 'rgba(90, 215, 150, 0)');
      c.fillStyle = rg;
      c.fillRect(x - r, y - r, r * 2, r * 2);
    }
    // Viñeta
    const vg = c.createRadialGradient(cv.width / 2, cv.height * 0.45, cv.width * 0.3, cv.width / 2, cv.height / 2, cv.width * 0.85);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,0.45)');
    c.fillStyle = vg;
    c.fillRect(0, 0, cv.width, cv.height);
    this._bg = cv;
  }

  render() {
    const ctx = this.ctx;
    if (!this._bg || this._bg.width !== this.canvas.width || this._bg.height !== this.canvas.height) {
      this.buildBackground();
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(this._bg, 0, 0);

    applyTransform(ctx);
    // Screen shake leve
    if (this.shake > 0.05) {
      ctx.translate(rand(-1, 1) * this.shake, rand(-1, 1) * this.shake);
    }

    // Decaer flashes de bloques (iterar acá evita otro loop en update)
    const dtFlash = 0.016;
    for (const b of this.field.bricks) if (b.flash > 0) b.flash -= dtFlash * 4;

    // Partículas ambientales flotando (suben lento con balanceo y parpadeo)
    const span = view.H + 60;
    ctx.fillStyle = '#d6f5c4';
    for (const f of this.ambient) {
      const y = span - (((f.y + this.time * f.sp) % span) + span) % span - 30;
      const x = f.x + Math.sin(this.time * 0.45 + f.ph) * 16;
      ctx.globalAlpha = f.a * (0.55 + 0.45 * Math.sin(this.time * 1.6 + f.ph * 2));
      ctx.beginPath();
      ctx.arc(x, y, f.r, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Paredes laterales sutiles
    ctx.strokeStyle = 'rgba(143, 230, 184, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(1, PLAY_TOP); ctx.lineTo(1, view.H);
    ctx.moveTo(W - 1, PLAY_TOP); ctx.lineTo(W - 1, view.H);
    ctx.moveTo(1, PLAY_TOP); ctx.lineTo(W - 1, PLAY_TOP);
    ctx.stroke();

    if (this.state === 'title') return;

    // Portal (powerup B)
    if (this.portal) {
      const pulse = 0.6 + 0.4 * Math.sin(this.portal.t * 5);
      const py = this.paddle.y;
      const grad = ctx.createLinearGradient(W - 14, 0, W, 0);
      grad.addColorStop(0, 'rgba(236, 72, 153, 0)');
      grad.addColorStop(1, `rgba(236, 72, 153, ${0.55 + pulse * 0.4})`);
      ctx.fillStyle = grad;
      roundRect(ctx, W - 14, py - 70, 14, 110, 6);
      ctx.fill();
      ctx.fillStyle = `rgba(255, 200, 235, ${0.5 + pulse * 0.5})`;
      roundRect(ctx, W - 6, py - 64, 5, 98, 3);
      ctx.fill();
      if (Math.random() < 0.25) this.particles.spark(W - 8, py + rand(-60, 40), '#f9a8d4', 1);
    }

    drawBricks(ctx, this.field);
    this.particles.draw(ctx);
    this.capsules.draw(ctx);
    this.lasers.draw(ctx);
    this.paddle.draw(ctx, this.time);
    for (const b of this.balls) b.draw(ctx, this.ballSprite);

    // Hint de saque
    if (this.state === 'playing' && this.balls.some((b) => b.stuck && !b.caught)) {
      ctx.globalAlpha = 0.55 + 0.35 * Math.sin(this.time * 4);
      ctx.fillStyle = '#cfeede';
      ctx.font = '700 15px -apple-system, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Toca para lanzar', W / 2, this.paddle.y + 52);
      ctx.globalAlpha = 1;
    }
  }
}
