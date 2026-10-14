#!/usr/bin/env node
/* Validates B2 First Listening data: b2/js/data/listening.js (p1–p4).
   Part 1: 8 extracts × 1 question (A–C) · Part 2: 10 gaps · Part 3: 5 speakers, 8 options A–H · Part 4: 7 questions (A–C).
   Usage: node scripts/check-b2-listening.js [--stats] */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const file = path.join(__dirname, "..", "b2/js/data/listening.js");
const ctx = {window:{}}; ctx.window.window = ctx.window; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(file, "utf8"), ctx, {filename:file});
const L = (ctx.window.DATA || {}).listening || {};
const STATS = process.argv.includes("--stats");

let errors = 0, warnings = 0;
const err = (id, m) => { errors++; console.error("ERROR  " + id + ": " + m); };
const warn = (id, m) => { warnings++; console.warn("WARN   " + id + ": " + m); };
const str = v => typeof v === "string" && v.trim().length > 0;
const ids = new Set();
const voices = L.voices || {};
const trapTypes = L.trapTypes || {};
const LETTERS = "ABCDEFGH";
const wc = t => String(t).trim().split(/\s+/).filter(Boolean).length;
const recWords = rec => (rec.lines || []).reduce((s, l) => s + wc(l.t || ""), 0);
const stats = [];

if(!voices.EX) err("voices", "missing examiner voice EX");
Object.entries(voices).forEach(([k, v]) => { if(v.g !== "m" && v.g !== "f") err("voices", k + " needs g:'m'|'f'"); });
if(!Object.keys(trapTypes).length) err("trapTypes", "missing");

function uniq(t, part){
  if(!str(t.id)) err(part, "task without id");
  else if(ids.has(t.id)) err(t.id, "duplicate id");
  else ids.add(t.id);
  if(!str(t.title)) err(t.id || part, "missing title");
}

/* things that make TTS / sentence chunking misbehave: abbreviations with dots, decimals, digits with letters glued */
const TTS_BAD = /\b(Dr|Mr|Mrs|Ms|St|etc|approx|vs|e\.g|i\.e)\.|\d\.\d|\ba\.m\.|\bp\.m\./;
function checkRecording(rec, id){
  if(!rec.speakers || typeof rec.speakers !== "object") { err(id, "missing speakers"); return; }
  Object.keys(rec.speakers).forEach(sp => { if(!voices[rec.speakers[sp]]) err(id, "speaker " + sp + " uses unknown voice " + rec.speakers[sp]); });
  if(!Array.isArray(rec.lines) || !rec.lines.length) { err(id, "no lines"); return; }
  rec.lines.forEach((l, i) => {
    if(!str(l.t)) err(id, "line " + (i + 1) + " empty");
    if(!(l.sp in rec.speakers)) err(id, "line " + (i + 1) + " speaker '" + l.sp + "' not in speakers");
    if(TTS_BAD.test(l.t || "")) warn(id, "line " + (i + 1) + " has an abbreviation/decimal that breaks sentence chunking: " + (l.t.match(TTS_BAD) || [])[0]);
    if(/["“”]/.test(l.t || "")) warn(id, "line " + (i + 1) + " uses double quotes (use single ' ')");
  });
  const used = new Set(rec.lines.map(l => l.sp));
  Object.keys(rec.speakers).forEach(sp => { if(!used.has(sp)) warn(id, "speaker " + sp + " never speaks"); });
}

/* common per-question fields; returns index of the line containing the evidence (or -1) */
function checkQ(q, qid, rec, onlySpeaker){
  if(!str(q.why)) err(qid, "missing why");
  if(!str(q.trap)) err(qid, "missing trap");
  if(!str(q.tt) || !trapTypes[q.tt]) err(qid, "unknown trap type " + q.tt);
  if(!str(q.evidence)) { err(qid, "missing evidence"); return -1; }
  const lines = rec.lines || [];
  const hits = lines.map((l, i) => String(l.t).includes(q.evidence) ? i : -1).filter(i => i >= 0);
  if(!hits.length) { err(qid, "evidence not found in transcript: \"" + q.evidence + "\""); return -1; }
  if(onlySpeaker && !hits.some(i => lines[i].sp === onlySpeaker)) err(qid, "evidence is not in " + onlySpeaker + "'s lines");
  if(hits.length > 1) warn(qid, "evidence occurs in more than one line (only the first is highlighted)");
  if(wc(q.evidence) < 2) warn(qid, "evidence very short");
  return hits[0];
}
function checkOpts(opts, correct, qid, n){
  if(!Array.isArray(opts) || opts.length !== n) err(qid, "needs " + n + " options");
  else {
    if(opts.some(o => !str(o))) err(qid, "empty option");
    if(new Set(opts.map(o => o.toLowerCase().trim())).size !== n) err(qid, "duplicate options");
  }
  if(!Number.isInteger(correct) || correct < 0 || correct >= n) err(qid, "correct out of range 0–" + (n - 1));
}
function balance(id, keys, n){
  const c = Array(n).fill(0); keys.forEach(k => { if(Number.isInteger(k) && k >= 0 && k < n) c[k]++; });
  const max = Math.max(...c), min = Math.min(...c);
  if(keys.length >= 7 && (max > Math.ceil(keys.length / n) + 2 || min === 0)) warn(id, "answer key unbalanced " + c.map((x, i) => LETTERS[i] + x).join(" "));
}

/* ---- Part 1: 8 extracts, one question each ---- */
(L.p1 || []).forEach(t => {
  uniq(t, "p1");
  if(!Array.isArray(t.extracts) || t.extracts.length !== 8) err(t.id, "needs 8 extracts (has " + ((t.extracts || []).length) + ")");
  const ctxs = new Set();
  (t.extracts || []).forEach((ex, e) => {
    const eid = t.id + " q" + (e + 1);
    if(!str(ex.context) || !/^You hear /.test(ex.context)) err(eid, "context must start with 'You hear '");
    if(ctxs.has(ex.context)) err(eid, "duplicate context in set"); ctxs.add(ex.context);
    checkRecording(ex, eid);
    if(!str(ex.q)) err(eid, "missing question q");
    checkOpts(ex.opts, ex.correct, eid, 3);
    checkQ(ex, eid, ex);
    const w = recWords(ex);
    if(w < 60 || w > 125) warn(eid, "extract has " + w + " words (expected 60–125, ~30–40 s)");
    stats.push(["p1", eid, w]);
  });
  balance(t.id, (t.extracts || []).map(x => x.correct), 3);
});

/* ---- Part 2: monologue, 10 sentence-completion gaps ---- */
(L.p2 || []).forEach(t => {
  uniq(t, "p2");
  if(!str(t.context) || !/^You will hear /.test(t.context)) err(t.id, "context must start with 'You will hear '");
  checkRecording(t, t.id);
  if(Object.keys(t.speakers || {}).length !== 1) err(t.id, "Part 2 is a monologue (one speaker)");
  if(!Array.isArray(t.qs) || t.qs.length !== 10) err(t.id, "needs 10 questions (has " + ((t.qs || []).length) + ")");
  let last = -1, lastPos = -1;
  (t.qs || []).forEach((q, i) => {
    const qid = t.id + " q" + (i + 9);
    if(!str(q.s) || (q.s.match(/___/g) || []).length !== 1) err(qid, "sentence must contain exactly one ___ gap");
    if(!Array.isArray(q.ans) || !q.ans.length || q.ans.some(a => !str(a))) err(qid, "ans missing/empty");
    else {
      const ev = String(q.evidence || "").toLowerCase();
      if(!ev.includes(q.ans[0].toLowerCase())) err(qid, "first accepted answer '" + q.ans[0] + "' is not word-for-word in the evidence");
      const words = Math.max(...q.ans.map(a => a.trim().split(/\s+/).length));
      if(words > 3) err(qid, "answer longer than 3 words");
      if(new Set(q.ans.map(a => a.toLowerCase())).size !== q.ans.length) warn(qid, "duplicate accepted answers");
      /* the sentence on the page must not simply copy the recording around the gap */
      const [a, b] = String(q.s).split("___").map(x => x.trim().toLowerCase().replace(/[.,]/g, ""));
      const evl = ev.replace(/[.,]/g, "");
      if(a && a.split(/\s+/).length >= 5 && evl.includes(a + " " + q.ans[0].toLowerCase())) warn(qid, "sentence copies the recording word for word before the gap");
      if(b && b.split(/\s+/).length >= 4 && evl.includes(q.ans[0].toLowerCase() + " " + b)) warn(qid, "sentence copies the recording word for word after the gap");
    }
    const idx = checkQ(q, qid, t);
    if(idx >= 0){
      const pos = t.lines[idx].t.indexOf(q.evidence);
      if(idx < last || (idx === last && pos < lastPos)) err(qid, "answers out of transcript order");
      last = idx; lastPos = pos;
    }
  });
  const w = recWords(t);
  if(w < 400 || w > 650) warn(t.id, "monologue has " + w + " words (expected 400–650, ~3 min)");
  stats.push(["p2", t.id, w]);
});

/* ---- Part 3: five monologues, one task, 8 options A–H ---- */
(L.p3 || []).forEach(t => {
  uniq(t, "p3");
  if(!str(t.context) || !/^You will hear five short extracts in which people are talking about /.test(t.context)) err(t.id, "context must start with 'You will hear five short extracts in which people are talking about '");
  if(!str(t.ask) || !/^(what|why|how) each speaker /.test(t.ask)) err(t.id, "ask must be a clause like 'what each speaker says about …'");
  checkRecording(t, t.id);
  const sp = ["Speaker 1", "Speaker 2", "Speaker 3", "Speaker 4", "Speaker 5"];
  if(Object.keys(t.speakers || {}).join() !== sp.join()) err(t.id, "speakers must be Speaker 1–5");
  /* lines grouped by speaker, in order 1–5 (a speaker may have several lines) */
  const order = (t.lines || []).map(l => l.sp).filter((s, i, a) => i === 0 || a[i - 1] !== s);
  if(order.join() !== sp.join()) err(t.id, "lines must be grouped per speaker, in order 1–5");
  if(!Array.isArray(t.opts) || t.opts.length !== 8 || t.opts.some(o => !str(o))) err(t.id, "needs 8 options A–H");
  else if(new Set(t.opts).size !== 8) err(t.id, "duplicate options");
  if(!Array.isArray(t.qs) || t.qs.length !== 5) err(t.id, "needs 5 questions");
  const seen = {}, used = new Set();
  (t.qs || []).forEach((q, i) => {
    const qid = t.id + " q" + (18 + (q.n || i + 1)) + " (S" + q.n + ")";
    if(!Number.isInteger(q.n) || q.n < 1 || q.n > 5) { err(qid, "n must be 1–5"); return; }
    if(seen[q.n]) err(qid, "duplicate speaker");
    seen[q.n] = true;
    if(!Number.isInteger(q.correct) || q.correct < 0 || q.correct > 7) err(qid, "correct out of range 0–7");
    else if(used.has(q.correct)) err(qid, "letter " + LETTERS[q.correct] + " used twice");
    else used.add(q.correct);
    checkQ(q, qid, t, "Speaker " + q.n);
  });
  if(Object.keys(seen).length !== 5) err(t.id, "must cover speakers 1–5");
  sp.forEach(s => {
    const w = (t.lines || []).filter(l => l.sp === s).reduce((a, l) => a + wc(l.t), 0);
    if(w < 60 || w > 130) warn(t.id + " " + s, w + " words (expected 60–130, ~30 s)");
    stats.push(["p3", t.id + " " + s, w]);
  });
});

/* ---- Part 4: interview / conversation, 7 questions A–C ---- */
(L.p4 || []).forEach(t => {
  uniq(t, "p4");
  if(!str(t.context) || !/^You will hear /.test(t.context)) err(t.id, "context must start with 'You will hear '");
  checkRecording(t, t.id);
  if(Object.keys(t.speakers || {}).length < 2) err(t.id, "Part 4 needs at least two speakers");
  if(!Array.isArray(t.qs) || t.qs.length !== 7) err(t.id, "needs 7 questions (has " + ((t.qs || []).length) + ")");
  let last = -1, lastPos = -1;
  (t.qs || []).forEach((q, i) => {
    const qid = t.id + " q" + (i + 24);
    if(!str(q.q)) err(qid, "missing question");
    checkOpts(q.opts, q.correct, qid, 3);
    const idx = checkQ(q, qid, t);
    if(idx >= 0){
      const pos = t.lines[idx].t.indexOf(q.evidence);
      if(idx < last || (idx === last && pos < lastPos)) err(qid, "questions out of transcript order");
      last = idx; lastPos = pos;
    }
  });
  balance(t.id, (t.qs || []).map(q => q.correct), 3);
  const w = recWords(t);
  if(w < 480 || w > 800) warn(t.id, "interview has " + w + " words (expected 480–800, ~3–4 min)");
  stats.push(["p4", t.id, w]);
});

/* ---- counts ---- */
const want = {p1:8, p2:8, p3:8, p4:8};
Object.keys(want).forEach(p => {
  const n = (L[p] || []).length;
  if(n < want[p]) err(p, "has " + n + " tasks, expected at least " + want[p]);
});

if(STATS){
  ["p1","p2","p3","p4"].forEach(p => {
    const s = stats.filter(x => x[0] === p).map(x => x[2]); if(!s.length) return;
    console.log(p + ": words min " + Math.min(...s) + ", avg " + Math.round(s.reduce((a, b) => a + b, 0) / s.length) + ", max " + Math.max(...s));
  });
}
console.log("B2 Listening: p1 " + (L.p1 || []).length + ", p2 " + (L.p2 || []).length + ", p3 " + (L.p3 || []).length + ", p4 " + (L.p4 || []).length +
  " tasks; " + errors + " error(s), " + warnings + " warning(s).");
process.exit(errors ? 1 : 0);
