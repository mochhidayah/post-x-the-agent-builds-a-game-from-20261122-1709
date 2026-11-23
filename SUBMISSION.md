# SUBMISSION — post-x-the-agent-builds-a-game-from-20261122-1709

- Slug: `post-x-the-agent-builds-a-game-from-20261122-1709`
- Bounty: $20, top 10 share it. Deadline: 25 Nov 2026, 00:09 WIB.
- Repo: https://github.com/mochhidayah/post-x-the-agent-builds-a-game-from-20261122-1709 (PUBLIC)
- Code commit (checked): `a83fe6c07cef60d2f850fa52c7397e3179b3fe27`
- Final commit (this file added): `64e37a8be1864d69f8ec0b6e954a5587a044a3b5`
- GitHub About: homepage https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709, topic `makefun` ✅
- Wallet / owner: `67ph3eGfeikcfLqMmC996N6zGCLGG23krJqk3H84F2Vd` (`.makefun/owner.json`)
- Play code: `makefun-dewdrop-soda-glade` (code 0 of 4)
- Referral code (in end card): `27zee63t`

## Video (siap posting, JANGAN di-submit sebelum URL post ada)

- File: `assets/post-x-agent-builds-game.mp4`
- Path: `~/workspace/post-x-the-agent-builds-a-game-from-20261122-1709/assets/post-x-agent-builds-game.mp4`
- Spec: 30,0 dtk, 1080x1920 (9:16), H.264 + AAC (silent), 711.764 bytes
- Isi: 0–3 dtk "ONE PROMPT. / ONE GAME." · 3–6 dtk prompt "Build me a tiny
  browser game: dodge the falling blocks" · 6–16 dtk terminal agen bekerja ·
  16–26 dtk game Block Dodge BENAR-BENAR jalan (logika game/game.js yang sama,
  di-render frame demi frame, skor akhir 149, seed 7) · 26–27,5 dtk CTA
  "IT WORKS. NOW GO BUILD YOURS. make.fun" · 27,5–30 dtk end card 9:16 asli
  dari press pack make.fun (tidak diubah), kode referral `27zee63t` diketik di field-nya
- Game playable: `game/game.html` + `game/game.js` (di repo)
- End card: `https://make.fun/press/referral-card/9x16/makefun-card-9x16-transparent.webm`
  (file ini opaque magenta, jadi dipakai sebagai card setelah klip — sesuai manifest:
  "add the card on magenta after it"; kode diketik setelah field rest, t=28,933 dtk)

## TEKS POSTINGAN FINAL (verbatim — paste apa adanya ke X)

```
I gave my AI agent one prompt: build me a tiny browser game. It built Block Dodge — and I filmed the whole thing. 🎮
Made by my AI agent for a $20 bounty on @makefunai: https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709
makefun-dewdrop-soda-glade
```

- Video di-upload NATIF ke post (bukan link/GIF). Akun publik, jangan dihapus
  sampai hasil keluar. JANGAN beli/bot engagement.

## Local check (kit fresh, 23 Nov 2026 ~08:55 WIB)

Command: `node cli/makefun.mjs check --kit . --repo <workdir> --transcripts ~/.makefun/postx-transcripts.tar.gz`

- 13 passed, 1 failed, 6 skipped, 5 checked at submission (check ke-2, commit final 64e37a8b, ~08:56 WIB)
- thinking_reproduces: **98,6%** (377/382 authored, 0 copied) — main.ts 23 authored lines
  (check ke-1 pada commit a83fe6c0: 99,0%, 322/325)
- thinking_revised: PASS (main.ts dari 3 write/edit message)
- thinking_turns: 33 · thinking_in_window: PASS · thinking_own_work: PASS
- transcripts_run_record: PASS · transcripts_present/recorded/wellformed: PASS
- FAIL (SUDAH DIDUGA, parent yang beresin): thinking_priced — 0 usage rows,
  bundle ini TANPA --muse-usage (sesuai instruksi tugas). Parent re-bundle
  dengan --muse-usage sebelum submit.
- entry_link / play_link: TIDAK muncul sebagai fail di check lokal (dicek saat
  submit; POST.json masih placeholder — WAJAR, parent isi URL setelah posting).
- At-submission (repo_public, repo_owner, repo_created_after_open,
  commit_in_repo, duplicate_snapshot): dicek saat submit; repo sudah PUBLIC,
  owner.json ada, dibuat setelah opening, commit sudah push.

## Bundle

- File: `~/.makefun/postx-transcripts.tar.gz`
- sha256: `7c9fa6c9adf4213368c1f97a6982f77d2a09071374a879180ee99b6dc52769e8`
  (bundle ke-2, setelah SUBMISSION.md ditulis; bundle ke-1: `a830dacaa4e32eb1ded68db062bd41d0129cbf1bdaa4629e239d8f0adc179813`)
- Isi: 1 sesi builder + parent session + system prompt + 1 instruction file
- ⚠️ Bundle ini dibuat TANPA --muse-usage — parent WAJIB re-bundle dengan
  usage rows sebelum submit (lihat fix thinking_priced di output check).

## Alur parent (setelah posting)

1. Post video + teks di atas dari akun X publik (@Arulhidayah007).
2. Isi POST.json dengan URL post: `{"url": "https://x.com/<handle>/status/<id>"}`, commit + push.
3. Re-bundle dengan --muse-usage (usage SELECT di output check), lalu submit:
   `node cli/makefun.mjs submit --competition post-x-the-agent-builds-a-game-from-20261122-1709 --repo-url https://github.com/mochhidayah/post-x-the-agent-builds-a-game-from-20261122-1709 --commit <sha-baru> --title "One prompt, one game" --bundle <bundle-baru>.tar.gz --keypair ~/workspace/token-radar-01/work/kit/makefun-keypair.json`
4. JANGAN submit sebelum URL post terisi — POST.json placeholder = entry ditolak.
