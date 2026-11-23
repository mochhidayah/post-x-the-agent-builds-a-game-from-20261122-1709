// post-x-the-agent-builds-a-game-from-20261122-1709 — entrypoint (Node 22, stdlib only).
// Job: copy POST.json from the repo root to the grader's output dir, byte for
// byte, after checking it is a JSON object carrying a url string. The house's
// gate judges whether that url names a real X post; the program itself must
// not refuse the placeholder before the post exists, or the local run in the
// kit's own instructions would fail. No network, no clock, no files outside
// the repo; the two runs write identical bytes.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_FILE = 'POST.json';

function fail(message: string): never {
  console.error(`post-x entry: ${message}`);
  process.exit(1);
}

const raw = (() => {
  try {
    return readFileSync(join(BOT_DIR, POST_FILE), 'utf8');
  } catch (err) {
    fail(`cannot read ${POST_FILE} from ${BOT_DIR}: ${(err as Error).message}`);
  }
})();

let parsed: unknown;
try {
  parsed = JSON.parse(raw as string);
} catch {
  fail(`${POST_FILE} is not valid JSON`);
}

if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  fail(`${POST_FILE} must be a JSON object`);
}
if (typeof (parsed as Record<string, unknown>).url !== 'string') {
  fail(`${POST_FILE} must carry a url string`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(join(BOT_DIR, POST_FILE), join(OUTPUT_DIR, POST_FILE));
