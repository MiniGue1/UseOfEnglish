#!/usr/bin/env node
/* Validates the B2 First Use of English data: b2/js/data/uoe.js + b2/js/data/uoe-lessons.js.
   Run: node scripts/check-b2-uoe.js   (exit code 1 on any error) */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const ctx = {window: {}}; ctx.window.window = ctx.window; vm.createContext(ctx);
for (const f of ["b2/js/data/uoe.js", "b2/js/data/uoe-lessons.js"]) vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, {filename: f});
const U = ctx.window.DATA && ctx.window.DATA.uoe, L = ctx.window.DATA && ctx.window.DATA.uoeLessons;
const errors = [], warns = [];
const err = m => errors.push(m), warn = m => warns.push(m);
if (!U) { console.error("DATA.uoe missing"); process.exit(1); }
if (!L) { console.error("DATA.uoeLessons missing"); process.exit(1); }

/* B2 First rules */
const KT_MIN = 2, KT_MAX = 5;            /* Part 4: 2–5 words including the key word */
const NEED = {bank: 350, 1: 85, 2: 85, 3: 75, 4: 85, tasks: 12};
const TEXT_MIN = 150, TEXT_MAX = 200;    /* cloze texts, words (gap markers count as one word) */

/* same normalisation as js/core.js norm() + the module's toks() / keyOk() */
const norm = s => String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,;!?]+/g, " ").replace(/\s+/g, " ").trim();
const CONTR = [[/\bcan't\b/g,"can not"],[/\bcannot\b/g,"can not"],[/\bwon't\b/g,"will not"],[/\bshan't\b/g,"shall not"],[/n't\b/g," not"],[/'re\b/g," are"],[/'ve\b/g," have"],[/'m\b/g," am"],[/'ll\b/g," will"],[/'d\b/g," 'd"],[/'s\b/g," 's"]];
const toks = s => { let t = norm(s); CONTR.forEach(([r, v]) => { t = t.replace(r, v); }); return t.split(" ").filter(Boolean); };
const tokEq = (a, b) => a === b || (a === "'d" && (b === "had" || b === "would")) || (b === "'d" && (a === "had" || a === "would")) || (a === "'s" && (b === "is" || b === "has")) || (b === "'s" && (a === "is" || a === "has"));
const countSeq = (hay, needle) => { let n = 0; for (let i = 0; i + needle.length <= hay.length; i++) if (needle.every((x, j) => tokEq(hay[i + j], x))) n++; return n; };
const isStr = s => typeof s === "string" && s.trim().length > 0;
const CATS = U.cats || {};
const catOk = (w, c) => { if (!c || !CATS[c]) err(`${w}: unknown or missing cat "${c}"`); };
const whyOk = (w, s) => { if (!isStr(s) || s.length < 12) err(`${w}: missing/too short Czech why`); };

/* ---------- item checks (bank items, task items and lesson quiz items share them) ---------- */
function checkMC(w, opts, correct) {
  if (!Array.isArray(opts) || opts.length !== 4) { err(`${w}: needs exactly 4 options`); return; }
  if (opts.some(o => !isStr(o))) err(`${w}: empty option`);
  if (new Set(opts.map(norm)).size !== 4) err(`${w}: duplicate options`);
  if (!Number.isInteger(correct) || correct < 0 || correct > 3) err(`${w}: correct index ${correct} out of range 0–3`);
}
function checkOC(w, ans) {
  if (!Array.isArray(ans) || !ans.length) { err(`${w}: ans[] empty`); return; }
  for (const a of ans) {
    if (!isStr(a) || /\s/.test(a.trim())) err(`${w}: Part 2 answer "${a}" must be ONE word`);
    if (/'/.test(a)) err(`${w}: Part 2 answer "${a}" is a contraction (counts as two words)`);
  }
  if (new Set(ans.map(norm)).size !== ans.length) err(`${w}: duplicate answers`);
}
function checkWF(w, key, ans) {
  if (!isStr(key) || !/^[A-Z]+$/.test(key)) err(`${w}: stem "${key}" must be one word in CAPITALS`);
  if (!Array.isArray(ans) || !ans.length) { err(`${w}: ans[] empty`); return; }
  for (const a of ans) {
    if (!isStr(a) || /\s/.test(a.trim())) err(`${w}: Part 3 answer "${a}" must be one word`);
    else if (norm(a) === norm(key)) err(`${w}: answer equals the stem – no transformation`);
  }
}
function checkKT(w, it, needParts) {
  for (const k of ["a", "key", "text"]) if (!isStr(it[k])) err(`${w}: missing ${k}`);
  if (!isStr(it.key) || /\s/.test(it.key.trim()) || it.key !== it.key.toUpperCase()) err(`${w}: key must be one word in CAPITALS`);
  if ((String(it.text).match(/____/g) || []).length !== 1) err(`${w}: text must contain exactly one ____`);
  if (!Array.isArray(it.ans) || !it.ans.length) { err(`${w}: ans[] empty`); return; }
  const keyT = toks(it.key), seen = new Set();
  for (const a of it.ans) {
    if (!isStr(a)) { err(`${w}: empty answer`); continue; }
    /* the key must be there; it may legitimately appear twice in "as … as" answers (key AS) */
    const t = toks(a), n = countSeq(t, keyT);
    if (n < 1 || (n > 1 && it.key !== "AS")) err(`${w}: answer "${a}" must contain key ${it.key} once (found ${n})`);
    if (!norm(a).split(" ").includes(it.key.toLowerCase())) err(`${w}: answer "${a}" does not contain the key ${it.key} unchanged`);
    if (t.length < KT_MIN || t.length > KT_MAX) err(`${w}: answer "${a}" has ${t.length} words (B2 First: ${KT_MIN}–${KT_MAX}, contractions = 2)`);
    const k = t.join(" "); if (seen.has(k)) err(`${w}: duplicate answer "${a}"`); seen.add(k);
    if (toks(it.text.replace("____", a)).join(" ") === toks(it.a).join(" ")) err(`${w}: answer "${a}" just reproduces the first sentence`);
  }
  if (needParts || it.parts) {
    if (!Array.isArray(it.parts) || it.parts.length !== 2 || it.parts.some(x => !Array.isArray(x) || !x.length || x.some(s => !isStr(s)))) err(`${w}: parts must be [[…],[…]] with strings`);
    else for (const a of it.ans) it.parts.forEach((alts, i) => { if (!alts.some(s => countSeq(toks(a), toks(s)) > 0)) err(`${w}: answer "${a}" contains no part ${i + 1} alternative`); });
  }
}
function checkItem(w, it, opt) {
  opt = opt || {};
  if (!isStr(it.id)) err(`${w}: missing id`);
  const TYPE = {1: "mc", 2: "oc", 3: "wf", 4: "kt"};
  if (TYPE[it.part] !== it.type) err(`${w}: part ${it.part} / type ${it.type} mismatch`);
  catOk(w, it.cat); whyOk(w, it.why);
  if (it.type !== "kt" && (String(it.text).match(/____/g) || []).length !== 1) err(`${w}: text must contain exactly one ____`);
  if (it.type === "mc") checkMC(w, it.opts, it.correct);
  else if (it.type === "oc") checkOC(w, it.ans);
  else if (it.type === "wf") checkWF(w, it.key, it.ans);
  else if (it.type === "kt") checkKT(w, it, opt.needParts);
}

/* ---------- top level ---------- */
for (const k of ["cats", "parts", "bank", "tasks", "cheat", "wfTables", "kwtPatterns"]) if (!(k in U)) err(`DATA.uoe: missing ${k}`);
for (const p of [1, 2, 3, 4]) if (!isStr((U.parts || {})[p])) err(`parts[${p}] label missing`);

/* ---------- bank ---------- */
const B = U.bank || [], ids = new Set(), qs = new Set(), byPart = {1: 0, 2: 0, 3: 0, 4: 0}, mcIdx = [0, 0, 0, 0];
for (const it of B) {
  const w = "bank " + (it.id || "?");
  if (ids.has(it.id)) err(`${w}: duplicate id`); ids.add(it.id);
  byPart[it.part] = (byPart[it.part] || 0) + 1;
  checkItem(w, it);
  if (it.type === "mc" && it.correct >= 0 && it.correct <= 3) mcIdx[it.correct]++;
  const q = it.type === "kt" ? norm(it.a) + "|" + it.key : norm(it.text) + (it.type === "wf" ? "|" + it.key : "");
  if (qs.has(q)) err(`${w}: duplicate question`); qs.add(q);
}
if (B.length < NEED.bank) err(`bank has ${B.length} items (need >= ${NEED.bank})`);
for (const p of [1, 2, 3, 4]) if (byPart[p] < NEED[p]) err(`bank Part ${p} has ${byPart[p]} items (need >= ${NEED[p]})`);

/* ---------- tasks ---------- */
const T = U.tasks || {}, tids = new Set(), texts = new Set();
function checkCloze(p, t) {
  const w = t.id;
  const gaps = [...String(t.text).matchAll(/\[(\d+)\]/g)].map(m => +m[1]);
  if (gaps.join(",") !== "0,1,2,3,4,5,6,7,8") err(`${w}: gaps must be [0]…[8] once each, in order (found ${gaps.join(",")})`);
  if (!Array.isArray(t.items) || t.items.length !== 8) err(`${w}: needs 8 items (found ${t.items ? t.items.length : 0})`);
  const n = String(t.text).replace(/\[\d+\]/g, "x").trim().split(/\s+/).length;
  if (n < TEXT_MIN || n > TEXT_MAX) err(`${w}: text has ${n} words (B2 cloze: ${TEXT_MIN}–${TEXT_MAX})`);
  const key = norm(t.text).slice(0, 120); if (texts.has(key)) err(`${w}: duplicate text`); texts.add(key);
}
const taskCount = {};
for (const p of [1, 2, 3, 4]) {
  const list = T["p" + p];
  if (!Array.isArray(list)) { err(`tasks.p${p} missing`); continue; }
  taskCount[p] = list.length;
  if (list.length < NEED.tasks) err(`tasks.p${p} has ${list.length} tasks (need >= ${NEED.tasks})`);
  for (const t of list) {
    const w = t.id || "?";
    if (!isStr(t.id)) err(`task without id in p${p}`);
    if (tids.has(t.id) || ids.has(t.id)) err(`${w}: duplicate id`); tids.add(t.id);
    if (!isStr(t.title)) err(`${w}: missing title`);
    if (p !== 4) checkCloze(p, t);
    else if (!Array.isArray(t.items) || t.items.length !== 6) err(`${w}: Part 4 set needs exactly 6 items`);
    (t.items || []).forEach((it, i) => {
      const iw = `${w}#${i + 1}`;
      catOk(iw, it.cat); whyOk(iw, it.why);
      if (p === 1) { checkMC(iw, it.opts, it.correct); if (it.correct >= 0 && it.correct <= 3) mcIdx[it.correct]++; }
      else if (p === 2) checkOC(iw, it.ans);
      else if (p === 3) checkWF(iw, it.key, it.ans);
      else {
        checkKT(iw, it, true);
        const q = norm(it.a) + "|" + it.key; if (qs.has(q)) err(`${iw}: duplicate Part 4 question`); qs.add(q);
      }
    });
    if (p === 1) checkMC(`${w} example`, t.ex && t.ex.opts, t.ex && t.ex.correct);
    if (p === 2 && (!isStr(t.ex) || /\s/.test(t.ex))) err(`${w}: example must be one word`);
    if (p === 3) { if (!t.ex || !isStr(t.ex.ans)) err(`${w}: example needs key + ans`); else checkWF(`${w} example`, t.ex.key, [t.ex.ans]); }
  }
}
const mcTot = mcIdx.reduce((a, b) => a + b, 0);
mcIdx.forEach((n, i) => { if (mcTot && n / mcTot > 0.4) err(`Part 1: ${Math.round(100 * n / mcTot)} % of answers are ${"ABCD"[i]} (keep A–D balanced)`); });

/* ---------- cheat sheets ---------- */
if (!Array.isArray(U.cheat) || !U.cheat.length || U.cheat.some(c => !Array.isArray(c) || c.length !== 2 || !isStr(c[0]) || !isStr(c[1]))) err("cheat must be [[title, html], …]");
if (!Array.isArray(U.wfTables) || U.wfTables.some(t => !isStr(t[0]) || !Array.isArray(t[1]) || t[1].some(r => r.length !== 2 || !isStr(r[0]) || !isStr(r[1])))) err("wfTables must be [[title, [[a,b],…]], …]");
if (!Array.isArray(U.kwtPatterns) || U.kwtPatterns.length < 30 || U.kwtPatterns.some(r => !Array.isArray(r) || r.length !== 2 || !isStr(r[0]) || !isStr(r[1]))) err("kwtPatterns must be >= 30 [[from, to], …]");
if ((U.cheat || []).some(c => /three and six|3–6|3 až 6/.test(c[1]))) err("cheat sheet mentions the C1 word limit (3–6) – B2 First is 2–5");

/* ---------- lessons + quizzes ---------- */
const quizIds = new Set(); let quizN = 0;
function checkQuiz(where, quiz, part) {
  if (!Array.isArray(quiz) || quiz.length !== 6) { err(`${where}: needs exactly 6 quiz items`); return; }
  for (const it of quiz) {
    const w = `${where} ${it.id}`;
    if (!/^L-/.test(it.id || "")) err(`${w}: quiz id must start with L-`);
    if (quizIds.has(it.id) || ids.has(it.id)) err(`${w}: duplicate id`); quizIds.add(it.id);
    if (part && it.part !== part) err(`${w}: quiz item belongs to Part ${it.part}, lesson is Part ${part}`);
    checkItem(w, it, {needParts: true}); quizN++;
  }
}
if (!L.parts || !Array.isArray(L.topics) || !L.catRules || !L.catTopic) err("DATA.uoeLessons: needs parts, topics, catRules, catTopic");
for (const p of [1, 2, 3, 4]) {
  const l = (L.parts || {})[p], w = "lesson p" + p;
  if (!l) { err(`${w}: missing`); continue; }
  if (l.id !== "p" + p || l.part !== p) err(`${w}: id/part`);
  for (const k of ["title", "short", "marks", "time", "tests"]) if (!isStr(l[k])) err(`${w}: missing ${k}`);
  if (!Array.isArray(l.strategy) || l.strategy.length < 5) err(`${w}: strategy needs >= 5 steps`);
  if (!Array.isArray(l.traps) || l.traps.length !== 10 || l.traps.some(t => !isStr(t.t) || !isStr(t.d) || !isStr(t.ex))) err(`${w}: exactly 10 traps {t,d,ex}`);
  if (!Array.isArray(l.worked) || l.worked.length < 3) err(`${w}: >= 3 worked examples`);
  (l.worked || []).forEach((x, i) => {
    const ww = `${w} worked#${i + 1}`;
    if (!isStr(x.text) || x.text.split("____").length !== 2) err(`${ww}: text needs one ____`);
    if (!isStr(x.answer) || !Array.isArray(x.steps) || x.steps.length < 2) err(`${ww}: answer + >= 2 steps`);
    if (p === 1 && !(Array.isArray(x.opts) && x.opts.length === 4 && x.opts.includes(x.answer))) err(`${ww}: 4 opts incl. the answer`);
    if (p >= 3 && !isStr(x.key)) err(`${ww}: key missing`);
    if (p === 4) {
      if (!isStr(x.a)) err(`${ww}: first sentence a missing`);
      const n = toks(x.answer).length; if (n < KT_MIN || n > KT_MAX) err(`${ww}: answer has ${n} words`);
      if (isStr(x.key) && !norm(x.answer).split(" ").includes(x.key.toLowerCase())) err(`${ww}: answer lacks key`);
    }
  });
  if (p === 4 && /3–6|3 až 6/.test(l.short + l.tests)) err(`${w}: mentions 3–6 words (B2 First is 2–5)`);
  checkQuiz(w, l.quiz, p);
}
const topicIds = new Set();
for (const t of L.topics || []) {
  const w = "topic " + t.id;
  if (!isStr(t.id) || topicIds.has(t.id) || /^p[1-4]$/.test(t.id)) err(`${w}: missing/duplicate/reserved id`); topicIds.add(t.id);
  if (!isStr(t.title) || !isStr(t.intro)) err(`${w}: title/intro`);
  if (!Array.isArray(t.cats) || !t.cats.length || t.cats.some(c => !CATS[c])) err(`${w}: cats must be known categories`);
  if (!Array.isArray(t.table) || t.table.length < 6 || t.table.some(r => !Array.isArray(r) || r.length !== 3 || r.some(c => !isStr(c)))) err(`${w}: table needs >= 6 rows [form, use, example]`);
  if (!Array.isArray(t.tips)) err(`${w}: tips[]`);
  checkQuiz(w, t.quiz, 0);
}
if ((L.topics || []).length < 10) err(`only ${(L.topics || []).length} topic lessons (want >= 10 B2 grammar/vocabulary topics)`);
for (const c of Object.keys(CATS)) {
  const r = (L.catRules || {})[c];
  if (!r || !isStr(r.rule) || !Array.isArray(r.ex) || !r.ex.length) err(`catRules.${c} missing (rule + ex[])`);
  if (!(L.catTopic || {})[c]) err(`catTopic.${c} missing`);
}
for (const [c, t] of Object.entries(L.catTopic || {})) if (!CATS[c] || !topicIds.has(t)) err(`catTopic ${c} -> ${t}: unknown category or topic`);

/* ---------- report ---------- */
console.log(`bank: ${B.length} items (P1 ${byPart[1]}, P2 ${byPart[2]}, P3 ${byPart[3]}, P4 ${byPart[4]}) · tasks: ${[1, 2, 3, 4].map(p => taskCount[p] || 0).join("/")} · cats: ${Object.keys(CATS).length} · lessons: 4 parts + ${(L.topics || []).length} topics · quiz items: ${quizN} · patterns: ${(U.kwtPatterns || []).length}`);
console.log(`Part 1 answer positions A/B/C/D: ${mcIdx.join("/")}`);
warns.forEach(w => console.log("WARN  " + w));
errors.forEach(e => console.log("ERROR " + e));
console.log(errors.length ? `${errors.length} error(s)` : "OK – 0 errors");
process.exit(errors.length ? 1 : 0);
