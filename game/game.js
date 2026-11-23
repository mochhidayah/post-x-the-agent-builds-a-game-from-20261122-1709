// BLOCK DODGE — a tiny browser game built from one prompt:
// "Build me a tiny browser game: dodge the falling blocks."
//
// Pure, deterministic logic with no DOM dependency, so the same code runs in
// the browser (game.html) and in the video renderer (video/render-frames.mjs).
// A seeded RNG makes every run reproducible: same seed, same blocks.

export const WORLD_W = 540;
export const WORLD_H = 960;
export const PLAYER_W = 64;
export const PLAYER_H = 64;
export const PLAYER_Y = WORLD_H - 140;
export const PLAYER_SPEED = 420; // px per second

// mulberry32: small seeded RNG, deterministic across runs.
export function makeRng(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createGame(seed = 20261123) {
  return {
    seed,
    rng: makeRng(seed),
    time: 0,
    playerX: WORLD_W / 2 - PLAYER_W / 2,
    blocks: [], // {x, y, size, speed, hue}
    spawnIn: 0.4,
    dodged: 0,
    score: 0,
    over: false,
  };
}

function spawnBlock(g) {
  const size = 46 + g.rng() * 42;
  const hue = g.rng() < 0.5 ? 'magenta' : 'cyan';
  g.blocks.push({
    x: g.rng() * (WORLD_W - size),
    y: -size,
    size,
    speed: 240 + g.time * 22 + g.rng() * 60,
    hue,
  });
}

// input: -1 (left), 0 (still), 1 (right). dt in seconds.
export function step(g, input, dt) {
  if (g.over) return g;
  g.time += dt;
  g.playerX += input * PLAYER_SPEED * dt;
  if (g.playerX < 8) g.playerX = 8;
  if (g.playerX > WORLD_W - PLAYER_W - 8) g.playerX = WORLD_W - PLAYER_W - 8;

  g.spawnIn -= dt;
  if (g.spawnIn <= 0) {
    spawnBlock(g);
    const gap = Math.max(0.34, 0.72 - g.time * 0.012);
    g.spawnIn = gap * (0.75 + g.rng() * 0.5);
  }

  const px0 = g.playerX;
  const px1 = g.playerX + PLAYER_W;
  const py0 = PLAYER_Y;
  const py1 = PLAYER_Y + PLAYER_H;
  for (const b of g.blocks) {
    b.y += b.speed * dt;
    if (b.y > WORLD_H + 40) {
      b.gone = true;
      g.dodged += 1;
    }
    // Shrink the hitbox a little so near-misses feel fair.
    const bx0 = b.x + 8;
    const bx1 = b.x + b.size - 8;
    const by0 = b.y + 8;
    const by1 = b.y + b.size - 8;
    if (bx0 < px1 && bx1 > px0 && by0 < py1 && by1 > py0) g.over = true;
  }
  g.blocks = g.blocks.filter((b) => !b.gone);
  g.score = Math.floor(g.time * 10) + g.dodged * 5;
  return g;
}

// Autopilot: steer toward the widest gap under the lowest incoming block.
// The video renderer drives the game with this, so the clip shows a clean run.
export function autopilot(g) {
  let threat = null;
  for (const b of g.blocks) {
    if (b.y + b.size < PLAYER_Y && (!threat || b.y > threat.y)) threat = b;
  }
  if (!threat) return 0;
  const centre = g.playerX + PLAYER_W / 2;
  const tCentre = threat.x + threat.size / 2;
  const gapLeft = threat.x - 8;
  const gapRight = WORLD_W - (threat.x + threat.size) - 8;
  const target = gapLeft > gapRight ? gapLeft / 2 : WORLD_W - gapRight / 2;
  const want = Math.abs(tCentre - centre) < threat.size ? target : centre;
  if (want < centre - 6) return -1;
  if (want > centre + 6) return 1;
  return 0;
}

// --- Browser wiring: only runs where a document exists. ---
if (typeof document !== 'undefined') {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  const msgEl = document.getElementById('msg');
  let game = createGame((Math.random() * 1e9) | 0);
  let keys = { left: false, right: false };
  let last = performance.now();

  function draw(g) {
    ctx.fillStyle = '#0d0714';
    ctx.fillRect(0, 0, WORLD_W, WORLD_H);
    ctx.fillStyle = '#f0f';
    ctx.fillRect(0, WORLD_H - 58, WORLD_W, 2);
    for (const b of g.blocks) {
      ctx.fillStyle = b.hue === 'magenta' ? '#ff2fb3' : '#22d3ee';
      ctx.fillRect(b.x, b.y, b.size, b.size);
    }
    ctx.fillStyle = '#a3e635';
    ctx.fillRect(g.playerX, PLAYER_Y, PLAYER_W, PLAYER_H);
    ctx.fillStyle = '#0d0714';
    ctx.font = 'bold 28px monospace';
    ctx.fillText('YOU', g.playerX + 8, PLAYER_Y + 40);
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const input = (keys.left ? -1 : 0) + (keys.right ? 1 : 0);
    step(game, input, dt);
    draw(game);
    scoreEl.textContent = String(game.score);
    if (game.over) {
      msgEl.textContent = `Game over — score ${game.score}. Press R to play again.`;
      return;
    }
    requestAnimationFrame(frame);
  }

  addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    if ((e.key === 'r' || e.key === 'R') && game.over) {
      game = createGame((Math.random() * 1e9) | 0);
      msgEl.textContent = '';
      last = performance.now();
      requestAnimationFrame(frame);
    }
  });
  addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
  });
  requestAnimationFrame(frame);
}
