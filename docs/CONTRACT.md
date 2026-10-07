# Portal contract (read before writing any module)

Static site on Vercel. **No build step, no npm, no frameworks, no bundler.** Plain ES2020 in `<script>` tags,
CSS in `css/app.css` (reuse existing classes: .sheet .btn .btn.primary .btn.ghost .opts .opt .chips .chip .fb .grid .stat .cards .card
.passage .timer .badge .field .row .meta .bar; tokens --paper --sheet --ink --muted --rule --soft --red --green --hl; dark mode is automatic).
All UI text in **Czech**; all exam content (texts, questions, prompts) in **English** at real C1 Advanced level.
Content must be ORIGINAL (never copy Cambridge papers or published coursebooks), but must match the real exam format, task wording and difficulty exactly.
Each file you own is self-contained. Never edit files you don't own. If you need a shared CSS rule, put it in a `<style>` injected from your own module JS, scoped with a unique class prefix.

## Files & ownership
- `js/data/<name>.js`  -> `window.DATA.<name> = {...}` (pure data, no logic)
- `js/modules/<name>.js` -> `Portal.register({...})` (UI + logic)
- Core (`js/core.js`, `index.html`, `css/app.css`) belongs to the lead. Don't touch.

## Portal API (window.Portal, from js/core.js)
- `Portal.register({id, title, short, blurb, render(stage, ctx), progress?(), mock?})`
  - `render(stage, {sub})`: fill `stage` (an empty div). `sub` = 3rd hash segment (`#/reading/part5`) for deep links; use `Portal.go(id, sub)` to navigate.
  - `progress()` -> `{done, total}` for the home card.
  - `mock` (paper modules only): `{paper:"Reading & Use of English", minutes:90, run(stage, finish)}` – runs a timed full-paper simulation inside `stage`;
    when finished call `finish({correct, total, details?})` (raw marks; mock module converts to Cambridge Scale). Writing/Speaking call `finish({selfScore:0-100})`.
- `Portal.store.get(ns, default)`, `.set(ns, value)`, `.del(ns)` – localStorage namespaced `cae:`. Use ns starting with your module id (`reading:progress`).
- `Portal.logActivity(moduleId, part, correct, total, extra?)` – call after each finished practice set (feeds dashboard + streak).
- `Portal.util`: `$ esc norm plural shuffle DAY todayStr countdown(el, seconds, onEnd) cambridgeScale(pct) gradeFor(scale)`.
- `Portal.tts.speak(text,{lang:"en-GB",rate,voiceIdx}) -> Promise`, `Portal.tts.stop()`, `Portal.tts.supported`.
- `Portal.toast(msg)`. Always `esc()` any data inserted via innerHTML.
- Navigation happens via hash; core stops TTS on every view change. Timers must self-stop when their element is detached (`countdown` already does).

## Quality bar
- Mobile first (360px), keyboard accessible, `aria-live` for feedback, no inline event handlers that leak, no `eval`.
- Every answer shows a short Czech explanation (`why`) — learning, not just scoring.
- Spaced repetition / "weak spots" where it makes sense; progress persisted via Portal.store.
- Must work offline once loaded (no external API calls other than the Google Fonts link already in index.html).
- Validate your data: write a tiny node script in `scripts/check-<name>.js` that loads your data file and asserts structure (unique ids, correct index in range, answers present). Run it. Also smoke-test your module in Chromium with Playwright (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; use executablePath '/opt/pw-browsers/chromium' if needed) – load `index.html` from a local static server, open `#/<yourid>`, click through a full set, assert there are no console errors.
- Commit only your own files, small commits, `git pull --rebase` before push is NOT needed — lead merges. Do not push; just commit on the current branch with `git add <your files>` only.
