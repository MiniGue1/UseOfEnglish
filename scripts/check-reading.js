#!/usr/bin/env node
/* Validates Reading data: js/data/reading.js (p5, p6) and – if present – js/data/reading78.js (p7, p8).
   Usage: node scripts/check-reading.js [extra-data-file.js ...]   (extra files e.g. a p7/p8 fixture) */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const files = [path.join(root, "js/data/reading.js"), path.join(root, "js/data/reading78.js")]
  .concat(process.argv.slice(2).map(f => path.resolve(f)));
const ctx = {window:{}}; ctx.window.window = ctx.window; vm.createContext(ctx);
for(const f of files){ if(fs.existsSync(f)) vm.runInContext(fs.readFileSync(f, "utf8"), ctx, {filename:f}); }
const R = (ctx.window.DATA || {}).reading || {};

let errors = 0, warnings = 0;
const err = (id, m) => { errors++; console.error("ERROR  " + id + ": " + m); };
const warn = (id, m) => { warnings++; console.warn("WARN   " + id + ": " + m); };
const words = s => String(s).trim().split(/\s+/).filter(Boolean).length;
const ids = new Set();
const uniq = (t, part) => { if(!t.id) err(part, "task without id"); else if(ids.has(t.id)) err(t.id, "duplicate id"); else ids.add(t.id); };
const str = v => typeof v === "string" && v.trim().length > 0;

/* ---- Part 5 ---- */
(R.p5 || []).forEach(t => {
  uniq(t, "p5");
  if(!str(t.title)) err(t.id, "missing title");
  const w = words(t.text);
  if(w < 550 || w > 750) err(t.id, "text has " + w + " words (550–750)");
  if(!Array.isArray(t.questions) || t.questions.length !== 6) err(t.id, "needs 6 questions");
  let lastPos = -1;
  (t.questions || []).forEach((q, i) => {
    const qid = t.id + " q" + (i + 1);
    if(!str(q.q)) err(qid, "missing q");
    if(!Array.isArray(q.opts) || q.opts.length !== 4 || !q.opts.every(str)) err(qid, "needs 4 options");
    if(new Set(q.opts).size !== 4) err(qid, "duplicate options");
    if(!(Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3)) err(qid, "correct out of range");
    if(!str(q.why)) err(qid, "missing why");
    if(!str(q.evidence)) err(qid, "missing evidence");
    else {
      const pos = t.text.indexOf(q.evidence);
      if(pos < 0) err(qid, "evidence not found in text: " + q.evidence.slice(0, 60));
      else if(t.text.indexOf(q.evidence, pos + 1) >= 0) warn(qid, "evidence occurs more than once");
      if(pos >= 0 && pos < lastPos) warn(qid, "questions not in text order");
      if(pos >= 0) lastPos = pos;
    }
  });
  const dist = [0,0,0,0]; (t.questions || []).forEach(q => dist[q.correct]++);
  if(Math.max(...dist) > 3) warn(t.id, "answer key unbalanced " + dist.join("/"));
});

/* ---- Part 6 ---- */
(R.p6 || []).forEach(t => {
  uniq(t, "p6");
  if(!str(t.title)) err(t.id, "missing title");
  const labels = (t.texts || []).map(x => x.label);
  if(labels.join("") !== "ABCD") err(t.id, "texts must be labelled A–D, got " + labels.join(""));
  (t.texts || []).forEach(x => { const w = words(x.text); if(w < 90 || w > 170) err(t.id + " " + x.label, "text has " + w + " words (~100–150)"); });
  if(!Array.isArray(t.questions) || t.questions.length !== 4) err(t.id, "needs 4 questions");
  (t.questions || []).forEach((q, i) => {
    const qid = t.id + " q" + (i + 1);
    if(!str(q.q)) err(qid, "missing q");
    if(!labels.includes(q.answer)) err(qid, "answer not a text label: " + q.answer);
    if(!str(q.why)) err(qid, "missing why");
    if(!Array.isArray(q.evidence) || !q.evidence.length) err(qid, "missing evidence[]");
    else {
      if(!q.evidence.some(e => e.label === q.answer)) err(qid, "no evidence from the answer text " + q.answer);
      q.evidence.forEach(e => {
        const tx = (t.texts || []).find(x => x.label === e.label);
        if(!tx) err(qid, "evidence label " + e.label + " unknown");
        else if(!str(e.quote) || tx.text.indexOf(e.quote) < 0) err(qid, "quote not found in " + e.label + ": " + String(e.quote).slice(0, 60));
      });
    }
  });
});

/* ---- Part 7 (owned by reading78.js – validated when present) ---- */
(R.p7 || []).forEach(t => {
  uniq(t, "p7");
  const gaps = (String(t.text).match(/\[(\d+)\]/g) || []).map(g => +g.slice(1, -1));
  if(gaps.join(",") !== "1,2,3,4,5,6") err(t.id, "gaps must be [1]…[6] in order, got " + gaps.join(","));
  const labels = (t.paras || []).map(p => p.label);
  if(labels.length !== 7 || new Set(labels).size !== 7) err(t.id, "needs 7 distinct paragraphs");
  (t.paras || []).forEach(p => { if(!str(p.text)) err(t.id, "empty paragraph " + p.label); });
  const used = [];
  for(let g = 1; g <= 6; g++){
    const a = t.answers && t.answers[g];
    if(!labels.includes(a)) err(t.id, "answer for gap " + g + " invalid: " + a);
    used.push(a);
    if(!(t.why && str(t.why[g]))) warn(t.id, "missing why for gap " + g);
  }
  if(new Set(used).size !== 6) err(t.id, "answers reuse a paragraph");
});

/* ---- Part 8 ---- */
(R.p8 || []).forEach(t => {
  uniq(t, "p8");
  const labels = (t.sections || []).map(s => s.label);
  if(labels.length < 4 || labels.length > 5) err(t.id, "needs 4–5 sections");
  if(!Array.isArray(t.questions) || t.questions.length !== 10) err(t.id, "needs 10 questions");
  (t.questions || []).forEach((q, i) => {
    const qid = t.id + " q" + (i + 1);
    if(!labels.includes(q.answer)) err(qid, "answer not a section label: " + q.answer);
    if(!str(q.why)) warn(qid, "missing why");
    const sec = (t.sections || []).find(s => s.label === q.answer);
    if(!str(q.evidence)) err(qid, "missing evidence");
    else if(sec && sec.text.indexOf(q.evidence) < 0) err(qid, "evidence not in section " + q.answer + ": " + q.evidence.slice(0, 60));
  });
});

const n = k => (R[k] || []).length;
console.log(`p5: ${n("p5")} tasks, p6: ${n("p6")}, p7: ${n("p7")}, p8: ${n("p8")}  |  errors: ${errors}, warnings: ${warnings}`);
(R.p5 || []).forEach(t => console.log("  " + t.id.padEnd(22) + words(t.text) + " words"));
if(n("p5") < 8) err("p5", "needs >= 8 tasks");
if(n("p6") < 6) err("p6", "needs >= 6 tasks");
process.exit(errors ? 1 : 0);
