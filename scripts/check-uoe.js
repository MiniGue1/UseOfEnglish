#!/usr/bin/env node
/* Validates js/data/uoe.js (Use of English, Parts 1–4). Run: node scripts/check-uoe.js */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const file = path.join(__dirname, "..", "js", "data", "uoe.js");
const ctx = {window: {}}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(file, "utf8"), ctx, {filename: file});
const U = ctx.window.DATA && ctx.window.DATA.uoe;
const errors = [], warns = [];
const err = m => errors.push(m), warn = m => warns.push(m);
if (!U) { console.error("DATA.uoe missing"); process.exit(1); }

/* same normalisation as js/core.js norm() + js/modules/uoe.js toks() */
const norm = s => String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,;!?]+/g, " ").replace(/\s+/g, " ").trim();
const CONTR = [[/\bcan't\b/g,"can not"],[/\bcannot\b/g,"can not"],[/\bwon't\b/g,"will not"],[/\bshan't\b/g,"shall not"],[/n't\b/g," not"],[/'re\b/g," are"],[/'ve\b/g," have"],[/'m\b/g," am"],[/'ll\b/g," will"],[/'d\b/g," 'd"],[/'s\b/g," 's"]];
const toks = s => { let t = norm(s); CONTR.forEach(([r, v]) => { t = t.replace(r, v); }); return t.split(" ").filter(Boolean); };
const countSeq = (hay, needle) => { let n = 0; for (let i = 0; i + needle.length <= hay.length; i++) if (needle.every((x, j) => hay[i + j] === x)) n++; return n; };
const isStr = s => typeof s === "string" && s.trim().length > 0;
const words = s => s.trim().split(/\s+/).length;

/* ---------- top-level shape ---------- */
for (const k of ["cats", "parts", "bank", "tasks", "cheat", "wfTables", "kwtPatterns"]) if (!(k in U)) err(`missing top-level field ${k}`);
const CATS = U.cats || {};
for (const p of [1, 2, 3, 4]) if (!isStr(U.parts[p])) err(`parts[${p}] missing`);
const catOk = (where, c) => { if (!c || !CATS[c]) err(`${where}: unknown or missing cat "${c}"`); };
const whyOk = (where, w) => { if (!isStr(w) || w.length < 12) err(`${where}: missing/too short why`); };

/* ---------- Part 4 answer checks (shared by bank + tasks) ---------- */
function checkKT(where, it) {
  for (const k of ["a", "key", "text"]) if (!isStr(it[k])) err(`${where}: missing ${k}`);
  if (it.key && /\s/.test(it.key.trim())) err(`${where}: key must be one word`);
  if (it.key !== String(it.key).toUpperCase()) err(`${where}: key should be in CAPITALS`);
  if ((String(it.text).match(/____/g) || []).length !== 1) err(`${where}: text must contain exactly one ____`);
  if (!Array.isArray(it.ans) || !it.ans.length) { err(`${where}: ans[] empty`); return; }
  const keyT = toks(it.key), seen = new Set();
  for (const a of it.ans) {
    if (!isStr(a)) { err(`${where}: empty answer`); continue; }
    const t = toks(a);
    const n = countSeq(t, keyT);
    if (n !== 1) err(`${where}: answer "${a}" must contain key ${it.key} exactly once (found ${n})`);
    /* the module marks 0 unless the key appears verbatim as a word (keyOk in js/modules/uoe.js) */
    if (!norm(a).split(" ").includes(it.key.toLowerCase())) err(`${where}: answer "${a}" does not contain the key ${it.key} verbatim`);
    if (t.length < 2 || t.length > 6) err(`${where}: answer "${a}" has ${t.length} words (must be 2–6)`);
    else if (t.length < 3) warn(`${where}: answer "${a}" has only ${t.length} words (exam minimum is 3)`);
    const k = t.join(" "); if (seen.has(k)) err(`${where}: duplicate answer "${a}"`); seen.add(k);
    const full = toks(it.text.replace("____", a)).join(" ");
    if (full === toks(it.a).join(" ")) err(`${where}: answer "${a}" just reproduces the first sentence`);
  }
}

/* ---------- bank ---------- */
const B = U.bank || [];
const ids = new Set(), qs = new Set(), byPart = {1: 0, 2: 0, 3: 0, 4: 0}, mcIdx = [0, 0, 0, 0];
const TYPE = {1: "mc", 2: "oc", 3: "wf", 4: "kt"};
for (const it of B) {
  const w = it.id || JSON.stringify(it).slice(0, 50);
  if (!isStr(it.id)) err(`${w}: missing id`);
  if (ids.has(it.id)) err(`${w}: duplicate id`); ids.add(it.id);
  if (TYPE[it.part] !== it.type) err(`${w}: part ${it.part} / type ${it.type} mismatch`);
  byPart[it.part] = (byPart[it.part] || 0) + 1;
  catOk(w, it.cat); whyOk(w, it.why);
  const q = it.type === "kt" ? norm(it.a) + "|" + it.key : norm(it.text) + (it.type === "wf" ? "|" + it.key : "");
  if (qs.has(q)) err(`${w}: duplicate question`); qs.add(q);
  if (it.type !== "kt" && (String(it.text).match(/____/g) || []).length !== 1) err(`${w}: text must contain exactly one ____`);
  if (it.type === "mc") {
    if (!Array.isArray(it.opts) || it.opts.length !== 4) err(`${w}: needs exactly 4 options`);
    else {
      if (new Set(it.opts.map(norm)).size !== 4) err(`${w}: duplicate options`);
      if (it.opts.some(o => !isStr(o))) err(`${w}: empty option`);
    }
    if (!Number.isInteger(it.correct) || it.correct < 0 || it.correct > 3) err(`${w}: correct out of range`);
    else mcIdx[it.correct]++;
  } else if (it.type === "oc") {
    if (!Array.isArray(it.ans) || !it.ans.length) err(`${w}: ans[] empty`);
    else for (const a of it.ans) {
      if (!isStr(a) || /\s/.test(a.trim())) err(`${w}: Part 2 answer "${a}" must be ONE word`);
      if (/n't$|'/.test(a)) err(`${w}: Part 2 answer "${a}" is a contraction (counts as two words)`);
    }
    if (it.ans && new Set(it.ans.map(norm)).size !== it.ans.length) err(`${w}: duplicate answers`);
  } else if (it.type === "wf") {
    if (!isStr(it.key) || it.key !== it.key.toUpperCase()) err(`${w}: key must be CAPITALS`);
    if (!Array.isArray(it.ans) || !it.ans.length) err(`${w}: ans[] empty`);
    else for (const a of it.ans) {
      if (!isStr(a) || /\s/.test(a.trim())) err(`${w}: Part 3 answer "${a}" must be one word`);
      if (norm(a) === norm(it.key)) err(`${w}: answer equals the stem – no transformation`);
    }
  } else if (it.type === "kt") checkKT(w, it);
}
if (B.length < 450) err(`bank has ${B.length} items (need >= 450)`);
const mcTot = mcIdx.reduce((a, b) => a + b, 0);
mcIdx.forEach((n, i) => { if (mcTot && n / mcTot > 0.4) warn(`bank Part 1: ${Math.round(100 * n / mcTot)} % of answers are ${"ABCD"[i]}`); });

/* ---------- tasks ---------- */
const T = U.tasks || {}, tids = new Set(), texts = new Set();
function checkCloze(part, t) {
  const w = t.id;
  const gaps = [...String(t.text).matchAll(/\[(\d+)\]/g)].map(m => +m[1]);
  if (gaps.join(",") !== "0,1,2,3,4,5,6,7,8") err(`${w}: gaps must be [0]…[8] once each, in order (found ${gaps.join(",")})`);
  if (!Array.isArray(t.items) || t.items.length !== 8) err(`${w}: needs 8 items (found ${t.items ? t.items.length : 0})`);
  const n = words(String(t.text).replace(/\[\d+\]/g, "x"));
  if (n < 140 || n > 240) warn(`${w}: text has ${n} words (aim for ~150–200)`);
  const key = norm(t.text).slice(0, 120); if (texts.has(key)) err(`${w}: duplicate text`); texts.add(key);
}
for (const p of [1, 2, 3, 4]) {
  const list = T["p" + p];
  if (!Array.isArray(list)) { err(`tasks.p${p} missing`); continue; }
  if (list.length < 14) err(`tasks.p${p} has ${list.length} tasks (need >= 14)`);
  for (const t of list) {
    const w = t.id || "?";
    if (!isStr(t.id)) err(`task without id in p${p}`);
    if (tids.has(t.id)) err(`${w}: duplicate task id`); tids.add(t.id);
    if (!isStr(t.title)) err(`${w}: missing title`);
    if (p !== 4) checkCloze(p, t);
    (t.items || []).forEach((it, i) => {
      const iw = `${w}#${i + 1}`;
      catOk(iw, it.cat); whyOk(iw, it.why);
      if (p === 1) {
        if (!Array.isArray(it.opts) || it.opts.length !== 4 || new Set(it.opts.map(norm)).size !== 4) err(`${iw}: needs 4 distinct options`);
        if (!Number.isInteger(it.correct) || it.correct < 0 || it.correct > 3) err(`${iw}: correct out of range`);
        else mcIdx[it.correct]++;
      } else if (p === 2) {
        if (!Array.isArray(it.ans) || !it.ans.length) err(`${iw}: ans[] empty`);
        else it.ans.forEach(a => { if (!isStr(a) || /\s/.test(a.trim()) || /'/.test(a)) err(`${iw}: Part 2 answer "${a}" must be one word, no contraction`); });
      } else if (p === 3) {
        if (!isStr(it.key) || it.key !== it.key.toUpperCase()) err(`${iw}: key must be CAPITALS`);
        if (!Array.isArray(it.ans) || !it.ans.length) err(`${iw}: ans[] empty`);
        else it.ans.forEach(a => { if (!isStr(a) || /\s/.test(a.trim())) err(`${iw}: answer "${a}" must be one word`); if (norm(a) === norm(it.key)) err(`${iw}: answer equals stem`); });
      } else {
        checkKT(iw, it);
        const q = norm(it.a) + "|" + it.key; if (qs.has(q)) err(`${iw}: duplicate Part 4 question`); qs.add(q);
        if (!Array.isArray(it.parts) || it.parts.length !== 2 || it.parts.some(x => !Array.isArray(x) || !x.length || x.some(s => !isStr(s)))) err(`${iw}: parts must be [[…],[…]] with strings`);
        else for (const a of it.ans || []) {
          const t2 = toks(a);
          it.parts.forEach((alts, k) => { if (!alts.some(s => countSeq(t2, toks(s)) > 0)) warn(`${iw}: answer "${a}" does not contain any part ${k + 1} alternative`); });
        }
      }
    });
    if (p === 1) { if (!t.ex || !Array.isArray(t.ex.opts) || t.ex.opts.length !== 4 || !(t.ex.correct >= 0 && t.ex.correct <= 3)) err(`${w}: bad example`); }
    if (p === 2 && (!isStr(t.ex) || /\s/.test(t.ex))) err(`${w}: example must be one word`);
    if (p === 3 && (!t.ex || !isStr(t.ex.key) || !isStr(t.ex.ans))) err(`${w}: example needs key + ans`);
    if (p === 4 && (!Array.isArray(t.items) || t.items.length !== 6)) err(`${w}: Part 4 task needs 6 items`);
  }
}

/* ---------- cheat sheets ---------- */
if (!Array.isArray(U.cheat) || U.cheat.some(c => !Array.isArray(c) || c.length !== 2 || !isStr(c[0]) || !isStr(c[1]))) err("cheat must be [[title, html], …]");
if (!Array.isArray(U.wfTables) || U.wfTables.some(t => !isStr(t[0]) || !Array.isArray(t[1]) || t[1].some(r => r.length !== 2 || !isStr(r[0]) || !isStr(r[1])))) err("wfTables must be [[title, [[a,b],…]], …]");
if (!Array.isArray(U.kwtPatterns) || U.kwtPatterns.some(r => !Array.isArray(r) || r.length !== 2 || !isStr(r[0]) || !isStr(r[1]))) err("kwtPatterns must be [[from, to], …]");
if ((U.kwtPatterns || []).length < 60) warn(`kwtPatterns has ${U.kwtPatterns.length} entries (target 60)`);

/* ---------- report ---------- */
const tc = [1, 2, 3, 4].map(p => (T["p" + p] || []).length);
console.log(`bank: ${B.length} items (P1 ${byPart[1]}, P2 ${byPart[2]}, P3 ${byPart[3]}, P4 ${byPart[4]}) · tasks: ${tc.join("/")} · cats: ${Object.keys(CATS).length} · patterns: ${(U.kwtPatterns || []).length}`);
console.log(`MC answer positions A/B/C/D: ${mcIdx.join("/")}`);
warns.forEach(w => console.log("WARN  " + w));
errors.forEach(e => console.log("ERROR " + e));
console.log(errors.length ? `${errors.length} error(s)` : "OK – 0 errors");
process.exit(errors.length ? 1 : 0);
