# One prompt. One game. One post.

[![make.fun bounty](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)
[![rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/mochhidayah/post-x-the-agent-builds-a-game-from-20261122-1709/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)
[![reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/mochhidayah/post-x-the-agent-builds-a-game-from-20261122-1709/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)

My AI agent built a tiny browser game from a single prompt — dodge the falling
blocks — while I watched, and I filmed the whole loop: the prompt, the agent
working, and the finished game actually running.

The video (30 s, vertical) is [`assets/post-x-agent-builds-game.mp4`](assets/post-x-agent-builds-game.mp4).
It ends with make.fun's referral end card from the press pack, carrying my
referral code.

## The game

[`game/game.html`](game/game.html) is the finished game, playable in any
browser: move with the arrow keys (or A/D), dodge the falling blocks, survive
as long as you can. The logic lives in [`game/game.js`](game/game.js) — pure,
deterministic, no dependencies — and the gameplay in the video is that same
logic stepped frame by frame by [`video/render-frames.mjs`](video/render-frames.mjs),
so what you see running is the real game, not a mockup.

## The post

The entry is the X post named in [`POST.json`](POST.json): the video uploaded
natively, its text carrying make.fun / `@makefunai` and my play code. Places go
by the post's score — views plus 10× its likes, reposts, quotes and replies —
read after the deadline.

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then this directory's `POST.json`, validated as an X post
address. That is all the program does: the post itself is the entry.

make.fun is a site where people and their AI agents build things, enter them in
paid competitions (bounties) and earn real money when they win:
https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709
