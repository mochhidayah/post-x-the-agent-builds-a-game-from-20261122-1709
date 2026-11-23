// Renders the BLOCK DODGE gameplay for the video: steps the real game logic
// from game/game.js with the autopilot, draws each frame to a raw RGB24
// stream on stdout (1080x1920 @ 30 fps), piped straight into ffmpeg.
// Usage: node video/render-frames.mjs | ffmpeg -f rawvideo -pix_fmt rgb24 \
//   -s 1080x1920 -r 30 -i - -c:v libx264 -pix_fmt yuv420p gameplay.mp4
// Nothing is written to stdout except raw frames; diagnostics go to stderr.

import { createGame, step, autopilot, WORLD_W, WORLD_H, PLAYER_W, PLAYER_H, PLAYER_Y } from '../game/game.js';
import { writeSync } from 'node:fs';

const W = 1080;
const H = 1920;
const S = 2; // world (540x960) scales x2 to video
const FPS = 30;
const SECONDS = 10;
const FRAMES = FPS * SECONDS;

// 5x7 bitmap glyphs for the HUD (SCORE, LIVE, digits).
const GLYPHS = {
  '0': ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00110', '01000', '10000', '11111'],
  '3': ['11111', '00010', '00100', '00010', '00001', '10001', '01110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  '6': ['00110', '01000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  I: ['01110', '00100', '00100', '00100', '00100', '00100', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
};

const BG = [13, 7, 20];
const MAGENTA = [255, 47, 179];
const CYAN = [34, 211, 238];
const LIME = [163, 230, 53];
const WHITE = [245, 243, 255];
const RED = [244, 63, 94];

const frame = Buffer.alloc(W * H * 3);

function fillRect(x, y, w, h, c) {
  const x0 = Math.max(0, Math.floor(x));
  const y0 = Math.max(0, Math.floor(y));
  const x1 = Math.min(W, Math.ceil(x + w));
  const y1 = Math.min(H, Math.ceil(y + h));
  for (let yy = y0; yy < y1; yy++) {
    let off = (yy * W + x0) * 3;
    for (let xx = x0; xx < x1; xx++) {
      frame[off] = c[0];
      frame[off + 1] = c[1];
      frame[off + 2] = c[2];
      off += 3;
    }
  }
}

function drawText(text, x, y, scale, color) {
  let cx = x;
  for (const ch of text) {
    const g = GLYPHS[ch];
    if (g) {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 5; c++) {
          if (g[r][c] === '1') fillRect(cx + c * scale, y + r * scale, scale, scale, color);
        }
      }
    }
    cx += 6 * scale;
  }
}

// Find a seed whose autopilot survives the full 10 s, so the clip shows a
// clean run with the score climbing the whole way.
function findSeed() {
  for (const seed of [20261123, 7, 42, 99, 1234, 555, 31337, 2026]) {
    const g = createGame(seed);
    for (let i = 0; i < FRAMES; i++) step(g, autopilot(g), 1 / FPS);
    if (!g.over) return seed;
  }
  return 20261123;
}

const seed = findSeed();
const game = createGame(seed);
let finalScore = 0;

for (let f = 0; f < FRAMES; f++) {
  step(game, autopilot(game), 1 / FPS);
  finalScore = game.score;

  // Background + floor line.
  fillRect(0, 0, W, H, BG);
  fillRect(0, (WORLD_H - 58) * S, W, 4, MAGENTA);

  // Blocks.
  for (const b of game.blocks) {
    fillRect(b.x * S, b.y * S, b.size * S, b.size * S, b.hue === 'magenta' ? MAGENTA : CYAN);
  }

  // Player: lime square with a darker core.
  fillRect(game.playerX * S, PLAYER_Y * S, PLAYER_W * S, PLAYER_H * S, LIME);
  fillRect((game.playerX + 14) * S, (PLAYER_Y + 14) * S, (PLAYER_W - 28) * S, (PLAYER_H - 28) * S, [60, 90, 20]);

  // HUD: SCORE + digits top-left, blinking LIVE dot top-right.
  drawText('SCORE', 48, 56, 10, WHITE);
  drawText(String(game.score).padStart(4, '0'), 48, 150, 14, LIME);
  if (f % 30 < 18) fillRect(736, 66, 36, 36, RED);
  drawText('LIVE', 792, 56, 10, WHITE);

  // Synchronous write: the frame buffer is reused, so an async write would
  // let the next frame overwrite bytes still queued for the pipe.
  writeSync(1, frame);
}

console.error(`rendered ${FRAMES} frames, seed=${seed}, final score=${finalScore}, over=${game.over}`);
