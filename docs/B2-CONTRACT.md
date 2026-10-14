# B2 First portal – contract (read docs/CONTRACT.md first, everything there applies)

The B2 First (FCE) portal is a separate page at **/b2** (`b2/index.html`) that shares the core with the C1 portal
but has **its own content, modules and progress**. Nothing may mix with C1.

## How separation works (already done by the lead – do not change)
- `b2/index.html` sets `window.CAE_LEVEL = "b2"` before `/js/core.js`. `Portal.level === "b2"`, `Portal.prefix === "b2:"`:
  `Portal.store` keys live under `b2:` in localStorage, and `js/sync.js` syncs them to a separate server copy.
  **Always use `Portal.store`** (never `localStorage` with `cae:` – if you must touch localStorage directly, use `Portal.prefix`).
- `Portal.util.scaleFor(skill, raw, max)` / `gradeFor(scale)` already use the official **B2 First** conversion
  (skills: `reading` = Parts 1 + 5–7 max 42, `uoe` = Parts 2–4 max 28, `writing` max 40, `listening` max 30, `speaking` max 60;
  scale 122–190; grades A 180–190 (C1), B 173–179, C 160–172 (B2), B1 140–159). `Portal.scale` has floor/top/grades.
- All URLs in B2 code must be **absolute** (`/api/...`, `/b2/...`): the page is served at `/b2` without a trailing slash.
- Shared files you must NOT edit: `js/core.js`, `css/app.css`, `js/sync*.js`, `api/*`, `sw.js`, `index.html`, `b2/index.html`,
  anything under `js/` (C1). You may READ C1 modules/data and copy/adapt their code into your own B2 files.
- Module ids inside B2 are the same as C1 (`home`, `uoe`, `reading`, `listening`, `writing`, `speaking`, `vocab`, `mock`) –
  they are on a different page, so they do not clash. Nav order = script order in `b2/index.html` (home first, mock last).

## Files (one owner each – edit only yours)
| Area | Files |
|---|---|
| Use of English Part 1–4 + lessons | `b2/js/data/uoe.js`, `b2/js/data/uoe-lessons.js`, `b2/js/modules/uoe.js`, `scripts/check-b2-uoe.js` |
| Reading Part 5–7 | `b2/js/data/reading.js`, `b2/js/modules/reading.js`, `scripts/check-b2-reading.js` |
| Listening Part 1–4 | `b2/js/data/listening.js`, `b2/js/modules/listening.js`, `scripts/check-b2-listening.js` |
| Writing (+ AI check) | `b2/js/data/writing.js`, `b2/js/modules/writing.js`, `scripts/check-b2-writing.js` |
| Speaking | `b2/js/data/speaking.js`, `b2/js/modules/speaking.js`, `scripts/check-b2-speaking.js` |
| Vocabulary | `b2/js/data/vocab.js`, `b2/js/modules/vocab.js`, `scripts/check-b2-vocab.js` |
| Dashboard + mock + guide | `b2/js/modules/home.js`, `b2/js/modules/mock.js`, `scripts/check-b2-mock.js` |

## B2 First format (official – match it exactly)
**Reading and Use of English – 1 h 15 min, 7 parts, 52 questions**
| Part | Task | Questions | Marks |
|---|---|---|---|
| 1 | Multiple-choice cloze (text, 4 options A–D: collocations, phrasal verbs, fixed phrases, meaning) | 8 | 1 each |
| 2 | Open cloze (text, one word per gap: grammar words) | 8 | 1 each |
| 3 | Word formation (text, stem word in CAPITALS) | 8 | 1 each |
| 4 | Key word transformation (2–5 words incl. the unchanged key word) | 6 | up to 2 each |
| 5 | Multiple choice (long text, 4 options) | 6 | 2 each |
| 6 | Gapped text – **six SENTENCES** removed from an article, choose from **seven sentences A–G** (one extra) | 6 | 2 each |
| 7 | Multiple matching (one text in sections or several short texts, 10 statements) | 10 | 1 each |
Reading score = Parts 1, 5, 6, 7 (max 42); Use of English = Parts 2, 3, 4 (max 28).

**Writing – 1 h 20 min, 2 parts, each 140–190 words**
- Part 1 (compulsory): **essay** – question + two notes given + the candidate's **own idea** (must cover all three).
- Part 2 (choose one of three): **article, email/letter, report, review**.
- Assessment: Content, Communicative Achievement, Organisation, Language (0–5 each, B2 First descriptors) → 2 × 20 = 40.

**Listening – about 40 min, 4 parts, 30 questions, each recording heard twice**
| Part | Task | Questions |
|---|---|---|
| 1 | Eight unrelated short extracts (monologue or dialogue), **one** multiple-choice question each, 3 options A–C | 8 |
| 2 | Sentence completion, one monologue (~3 min), 1–3 words from the recording | 10 |
| 3 | Multiple matching: five short monologues on one theme, choose from **eight** options A–H (3 unused) | 5 |
| 4 | Interview or conversation, multiple choice with 3 options A–C | 7 |

**Speaking – 14 min, pairs, 4 parts**: Part 1 interview (2 min); Part 2 long turn – compare **two** photos and answer the question
above them (1 min each, partner 30 s); Part 3 collaborative task – question + 5 prompts (2 min) then decide (1 min);
Part 4 discussion linked to Part 3 (4 min). Criteria: Grammar and Vocabulary, Discourse Management, Pronunciation,
Interactive Communication (+ Global Achievement by the interlocutor). Self-assessment maps to marks out of 60.

## Level of the content
- Everything must be **B2 level**, not C1: B1–B2 vocabulary (the CEFR-J/Octanove lists in the C1 audit put ~98 % of words at ≤B2),
  natural English, typical B2 grammar (tenses, conditionals 0–3 and mixed basics, passives, reported speech, relative clauses,
  modals, gerund/infinitive, comparatives, linkers, phrasal verbs, common collocations, word formation with common affixes).
- Do not make it "C1 light": texts shorter than C1 (Part 5 ~550–650 words, Part 6 ~550–650, Part 7 ~600–700, cloze texts ~150–200),
  topics familiar to teenagers/young adults (school, work, travel, sport, technology, environment, free time, family, health).
- Model writing answers sound like a strong B2 candidate (band 5 at B2), never like a C2 showpiece.
- All UI text Czech, all exam content English, every answer has a short Czech explanation. Content must be ORIGINAL.

## Quality bar (as for C1)
Validator script `scripts/check-b2-<area>.js` (structure, unique ids, answer ranges, evidence substrings, counts) – run it.
Smoke-test in Chromium via Playwright: serve the repo root with a static server that maps `/b2` → `b2/index.html`
(e.g. a tiny node server), open `/b2#/<id>`, click through, no console errors. Commit only your files.
