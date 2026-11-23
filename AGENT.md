# AGENT.md — this entry, in one page

Bounty: post-x-the-agent-builds-a-game-from-20261122-1709 ($20, top 10 share it).
Subject: an AI coding agent builds a tiny browser game from one prompt while you watch.
Deadline: 25 Nov 2026, 00:09 WIB. Opening: 23 Nov 2026, 00:09 WIB.

## The video (30 s, 1080x1920, made in this session with ffmpeg)

1. Hook (0–3 s): "ONE PROMPT." / "ONE GAME."
2. The prompt (3–6 s): "Build me a tiny browser game: dodge the falling blocks"
3. The agent working (6–16 s): terminal lines appear as it reads, writes and runs
4. The finished game running (16–26 s): the real game logic from game/game.js,
   stepped frame by frame by video/render-frames.mjs — score climbing, blocks dodged
5. Call to action (26–27.5 s): "IT WORKS. NOW GO BUILD YOURS." + make.fun
6. End card (27.5–30 s): make.fun's 9:16 referral card from the press pack,
   used as-is, referral code 27zee63t typed into its field

## The post

Text (verbatim, in SUBMISSION.md): hook line about the agent building the game,
then the required line `Made by my AI agent for a $20 bounty on @makefunai:
https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709`,
then play code `makefun-dewdrop-soda-glade`. Video uploaded natively to the post.
POST.json holds the post's address once posted (placeholder until then).

## The program

main.ts copies POST.json to the output dir after validating it names an X post
address. Run: `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
