#!/usr/bin/env node
/* Validates B2 First Reading data: b2/js/data/reading.js (DATA.reading.p5 / p6 / p7).
   Part 5: multiple choice (6 q, 4 options, text 550–650 words), Part 6: gapped text with six removed SENTENCES
   (seven sentences A–G, exactly one unused, full article 550–650 words), Part 7: multiple matching (10 q, 4–5 sections,
   600–700 words). Every question needs a Czech `why`; Part 5/7 need `evidence` = exact substring of the text.
   Usage: node scripts/check-b2-reading.js */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const file = path.join(__dirname, "..", "b2/js/data/reading.js");
const ctx = {window:{}}; ctx.window.window = ctx.window; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(file, "utf8"), ctx, {filename:file});
const R = (ctx.window.DATA || {}).reading || {};

let errors = 0, warnings = 0;
const err = (id, m) => { errors++; console.error("ERROR  " + id + ": " + m); };
const warn = (id, m) => { warnings++; console.warn("WARN   " + id + ": " + m); };
const words = s => String(s).replace(/\[\d+\]/g, " ").trim().split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
const str = v => typeof v === "string" && v.trim().length > 0;
const czech = s => /[áčďéěíňóřšťúůýž]/i.test(String(s));
const ids = new Set();
const uniq = (t, part) => { if(!t.id) err(part, "task without id"); else if(ids.has(t.id)) err(t.id, "duplicate id"); else ids.add(t.id); };
const MIN_TASKS = 10;
const stats = {};

/* ---- Part 5 – multiple choice ---- */
const p5 = Array.isArray(R.p5) ? R.p5 : [];
if(p5.length < MIN_TASKS) err("p5", "needs at least " + MIN_TASKS + " tasks, has " + p5.length);
p5.forEach(t => {
  uniq(t, "p5");
  if(!/^p5-/.test(t.id || "")) warn(t.id, "id should start with p5-");
  if(!str(t.title)) err(t.id, "missing title");
  if(!str(t.topic)) err(t.id, "missing topic");
  if(!str(t.text)) { err(t.id, "missing text"); return; }
  const w = words(t.text); (stats.p5 = stats.p5 || []).push(w);
  if(w < 550 || w > 650) err(t.id, "text has " + w + " words (550–650)");
  if(!Array.isArray(t.questions) || t.questions.length !== 6) err(t.id, "needs 6 questions");
  let lastPos = -1;
  (t.questions || []).forEach((q, i) => {
    const qid = t.id + " q" + (31 + i);
    if(!str(q.q)) err(qid, "missing q");
    if(!Array.isArray(q.opts) || q.opts.length !== 4 || !q.opts.every(str)) err(qid, "needs 4 options");
    else if(new Set(q.opts.map(o => o.trim().toLowerCase())).size !== 4) err(qid, "duplicate options");
    if(!(Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3)) err(qid, "correct out of range");
    if(!str(q.why)) err(qid, "missing why"); else if(!czech(q.why)) err(qid, "why is not Czech");
    if(!str(q.evidence)) err(qid, "missing evidence");
    else {
      const pos = t.text.indexOf(q.evidence);
      if(pos < 0) err(qid, "evidence not found in text: " + q.evidence.slice(0, 70));
      else if(t.text.indexOf(q.evidence, pos + 1) >= 0) warn(qid, "evidence occurs more than once");
      if(pos >= 0 && pos < lastPos) warn(qid, "questions not in text order");
      if(pos >= 0) lastPos = pos;
    }
  });
  const dist = [0,0,0,0]; (t.questions || []).forEach(q => { if(dist[q.correct] != null) dist[q.correct]++; });
  if(Math.max(...dist) > 3) warn(t.id, "answer key unbalanced " + dist.join("/"));
});

/* ---- Part 6 – gapped text (sentences) ---- */
const p6 = Array.isArray(R.p6) ? R.p6 : [];
if(p6.length < MIN_TASKS) err("p6", "needs at least " + MIN_TASKS + " tasks, has " + p6.length);
p6.forEach(t => {
  uniq(t, "p6");
  if(!/^p6-/.test(t.id || "")) warn(t.id, "id should start with p6-");
  if(!str(t.title)) err(t.id, "missing title");
  if(!str(t.topic)) err(t.id, "missing topic");
  if(!str(t.text)) { err(t.id, "missing text"); return; }
  const gaps = (t.text.match(/\[(\d+)\]/g) || []).map(g => +g.slice(1, -1));
  if(gaps.join(",") !== "1,2,3,4,5,6") err(t.id, "gaps must be [1]…[6] in order, got " + gaps.join(","));
  const sents = Array.isArray(t.sents) ? t.sents : [];
  const labels = sents.map(s => s.label);
  if(labels.join("") !== "ABCDEFG") err(t.id, "needs 7 sentences labelled A–G, got " + labels.join(""));
  sents.forEach(s => {
    if(!str(s.text)) err(t.id + " " + s.label, "empty sentence");
    else {
      const w = words(s.text);
      if(w < 6 || w > 40) warn(t.id + " " + s.label, "sentence has " + w + " words");
      if(t.text.indexOf(s.text.trim()) >= 0) err(t.id + " " + s.label, "sentence still present in the text");
    }
  });
  const ans = t.answers || {}, used = [];
  gaps.forEach(g => {
    const a = ans[g];
    if(!labels.includes(a)) err(t.id + " gap " + g, "answer not a sentence label: " + a);
    else used.push(a);
    const why = (t.why || {})[g];
    if(!str(why)) err(t.id + " gap " + g, "missing why");
    else { if(!czech(why)) err(t.id + " gap " + g, "why is not Czech"); if(a && why.indexOf(a) < 0) warn(t.id + " gap " + g, "why does not name the answer " + a); }
  });
  if(new Set(used).size !== used.length) err(t.id, "answers are not unique: " + used.join(""));
  const unused = labels.filter(l => !used.includes(l));
  if(unused.length !== 1) err(t.id, "exactly one sentence must be unused, got " + (unused.join("") || "none"));
  if(!str(t.extraWhy)) err(t.id, "missing extraWhy (why the extra sentence fits nowhere)");
  else { if(!czech(t.extraWhy)) err(t.id, "extraWhy is not Czech"); if(unused.length === 1 && t.extraWhy.indexOf(unused[0]) < 0) warn(t.id, "extraWhy does not name the extra sentence " + unused[0]); }
  const seq = used.join("");
  if(seq === "ABCDEF" || seq === "BCDEFG") warn(t.id, "answer key is in alphabetical order");
  /* full article = base text with the right sentences in the gaps */
  const full = t.text.replace(/\[(\d+)\]/g, (m, g) => { const s = sents.find(x => x.label === ans[g]); return s ? s.text : ""; });
  const w = words(full); (stats.p6 = stats.p6 || []).push(w);
  if(w < 550 || w > 650) err(t.id, "full article has " + w + " words (550–650)");
  /* gaps should be separated by real text */
  t.text.split(/\[\d+\]/).slice(1, -1).forEach((between, i) => { if(words(between) < 12) warn(t.id, "only " + words(between) + " words between gaps " + (i + 1) + " and " + (i + 2)); });
});

/* ---- Part 7 – multiple matching ---- */
const p7 = Array.isArray(R.p7) ? R.p7 : [];
if(p7.length < MIN_TASKS) err("p7", "needs at least " + MIN_TASKS + " tasks, has " + p7.length);
p7.forEach(t => {
  uniq(t, "p7");
  if(!/^p7-/.test(t.id || "")) warn(t.id, "id should start with p7-");
  if(!str(t.title)) err(t.id, "missing title");
  if(!str(t.topic)) err(t.id, "missing topic");
  const secs = Array.isArray(t.sections) ? t.sections : [];
  const labels = secs.map(s => s.label);
  if(!(labels.join("") === "ABCD" || labels.join("") === "ABCDE")) err(t.id, "sections must be A–D or A–E, got " + labels.join(""));
  secs.forEach(s => { if(!str(s.text)) err(t.id + " " + s.label, "empty section"); });
  const w = secs.reduce((n, s) => n + words(s.text || ""), 0); (stats.p7 = stats.p7 || []).push(w);
  if(w < 600 || w > 700) err(t.id, "sections have " + w + " words together (600–700)");
  if(t.pick && !["people", "sections", "texts", "writers"].includes(t.pick)) warn(t.id, "unusual pick: " + t.pick);
  if(!Array.isArray(t.questions) || t.questions.length !== 10) err(t.id, "needs 10 questions");
  const count = {};
  (t.questions || []).forEach((q, i) => {
    const qid = t.id + " q" + (43 + i);
    if(!str(q.q)) err(qid, "missing q");
    if(!labels.includes(q.answer)) { err(qid, "answer not a section label: " + q.answer); return; }
    count[q.answer] = (count[q.answer] || 0) + 1;
    if(!str(q.why)) err(qid, "missing why"); else if(!czech(q.why)) err(qid, "why is not Czech");
    if(!str(q.evidence)) err(qid, "missing evidence");
    else {
      const sec = secs.find(s => s.label === q.answer);
      if(!sec || sec.text.indexOf(q.evidence) < 0) err(qid, "evidence not found in section " + q.answer + ": " + q.evidence.slice(0, 70));
      secs.filter(s => s.label !== q.answer).forEach(s => { if(s.text.indexOf(q.evidence) >= 0) warn(qid, "evidence also occurs in section " + s.label); });
    }
  });
  labels.forEach(l => { if(!count[l]) err(t.id, "section " + l + " is never an answer"); else if(count[l] > 4) warn(t.id, "section " + l + " is the answer " + count[l] + "×"); });
});

const range = a => a && a.length ? Math.min(...a) + "–" + Math.max(...a) : "–";
console.log(`B2 reading: p5 ${p5.length} tasks (${range(stats.p5)} words), p6 ${p6.length} tasks (${range(stats.p6)} words), p7 ${p7.length} tasks (${range(stats.p7)} words)`);
console.log(errors ? `FAILED – ${errors} error(s), ${warnings} warning(s)` : `OK – ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
