#!/usr/bin/env node
/* Validates Listening data: js/data/listening.js (p1–p4).
   Usage: node scripts/check-listening.js */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const file = path.join(__dirname, "..", "js/data/listening.js");
const ctx = {window:{}}; ctx.window.window = ctx.window; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(file, "utf8"), ctx, {filename:file});
const L = (ctx.window.DATA || {}).listening || {};

let errors = 0, warnings = 0;
const err = (id, m) => { errors++; console.error("ERROR  " + id + ": " + m); };
const warn = (id, m) => { warnings++; console.warn("WARN   " + id + ": " + m); };
const str = v => typeof v === "string" && v.trim().length > 0;
const ids = new Set();
const voices = L.voices || {};
const trapTypes = L.trapTypes || {};
const LETTERS = "ABCDEFGH";

function uniq(t, part){
  if(!str(t.id)) err(part, "task without id");
  else if(ids.has(t.id)) err(t.id, "duplicate id");
  else ids.add(t.id);
  if(!str(t.title)) err(t.id || part, "missing title");
}

/* recording = {context, speakers, lines} */
function checkRecording(rec, id){
  if(!str(rec.context)) err(id, "missing context");
  if(!rec.speakers || typeof rec.speakers !== "object") { err(id, "missing speakers"); return; }
  Object.keys(rec.speakers).forEach(sp => { if(!voices[rec.speakers[sp]]) err(id, "speaker " + sp + " uses unknown voice " + rec.speakers[sp]); });
  if(!Array.isArray(rec.lines) || !rec.lines.length) { err(id, "no lines"); return; }
  rec.lines.forEach((l, i) => {
    if(!str(l.t)) err(id, "line " + (i + 1) + " empty");
    if(!(l.sp in rec.speakers)) err(id, "line " + (i + 1) + " speaker '" + l.sp + "' not in speakers");
  });
}

/* common per-question fields; returns index of the line containing the evidence (or -1) */
function checkQ(q, qid, rec){
  if(!str(q.why)) err(qid, "missing why");
  if(!str(q.trap)) warn(qid, "missing trap");
  if(q.tt !== undefined && !trapTypes[q.tt]) err(qid, "unknown trap type " + q.tt);
  if(!str(q.evidence)) { err(qid, "missing evidence"); return -1; }
  const idx = (rec.lines || []).findIndex(l => String(l.t).includes(q.evidence));
  if(idx < 0) err(qid, "evidence not found in transcript: \"" + q.evidence + "\"");
  return idx;
}

function checkOpts(q, qid, n){
  if(!Array.isArray(q.opts) || q.opts.length !== n) err(qid, "needs " + n + " options");
  else {
    if(q.opts.some(o => !str(o))) err(qid, "empty option");
    if(new Set(q.opts).size !== n) err(qid, "duplicate options");
  }
  if(!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= n) err(qid, "correct out of range 0–" + (n - 1));
}

/* ---- Part 1 ---- */
(L.p1 || []).forEach(t => {
  uniq(t, "p1");
  if(!Array.isArray(t.extracts) || t.extracts.length !== 3) err(t.id, "needs 3 extracts");
  (t.extracts || []).forEach((ex, e) => {
    const eid = t.id + " ex" + (e + 1);
    checkRecording(ex, eid);
    if(!Array.isArray(ex.qs) || ex.qs.length !== 2) err(eid, "needs 2 questions");
    (ex.qs || []).forEach((q, i) => {
      const qid = eid + " q" + (i + 1);
      if(!str(q.q)) err(qid, "missing question");
      checkOpts(q, qid, 3);
      checkQ(q, qid, ex);
    });
  });
});

/* ---- Part 2 ---- */
(L.p2 || []).forEach(t => {
  uniq(t, "p2");
  checkRecording(t, t.id);
  if(!Array.isArray(t.qs) || t.qs.length !== 8) err(t.id, "needs 8 questions");
  let last = -1;
  (t.qs || []).forEach((q, i) => {
    const qid = t.id + " q" + (i + 1);
    if(!str(q.s) || (q.s.match(/___/g) || []).length !== 1) err(qid, "sentence must contain exactly one ___ gap");
    if(!Array.isArray(q.ans) || !q.ans.length || q.ans.some(a => !str(a))) err(qid, "ans missing/empty");
    else {
      const ev = String(q.evidence || "").toLowerCase();
      if(!q.ans.some(a => ev.includes(a.toLowerCase())))
        warn(qid, "no accepted answer appears in the evidence");
      const words = Math.max(...q.ans.map(a => a.trim().split(/\s+/).length));
      if(words > 3) warn(qid, "answer longer than 3 words");
    }
    const idx = checkQ(q, qid, t);
    if(idx >= 0 && idx < last) warn(qid, "answers out of transcript order");
    if(idx >= 0) last = idx;
  });
});

/* ---- Part 3 ---- */
(L.p3 || []).forEach(t => {
  uniq(t, "p3");
  checkRecording(t, t.id);
  if(!Array.isArray(t.qs) || t.qs.length !== 6) err(t.id, "needs 6 questions");
  let last = -1;
  (t.qs || []).forEach((q, i) => {
    const qid = t.id + " q" + (i + 1);
    if(!str(q.q)) err(qid, "missing question");
    checkOpts(q, qid, 4);
    const idx = checkQ(q, qid, t);
    if(idx >= 0 && idx < last) warn(qid, "questions out of transcript order");
    if(idx >= 0) last = idx;
  });
});

/* ---- Part 4 ---- */
(L.p4 || []).forEach(t => {
  uniq(t, "p4");
  checkRecording(t, t.id);
  const sp = ["Speaker 1", "Speaker 2", "Speaker 3", "Speaker 4", "Speaker 5"];
  if(Object.keys(t.speakers || {}).join() !== sp.join()) err(t.id, "speakers must be Speaker 1–5");
  if((t.lines || []).map(l => l.sp).join() !== sp.join()) err(t.id, "lines must be one per speaker, in order 1–5");
  [1, 2].forEach(k => {
    const task = t["task" + k];
    if(!task || !str(task.q)) err(t.id, "task" + k + " missing q");
    if(!task || !Array.isArray(task.opts) || task.opts.length !== 8 || task.opts.some(o => !str(o))) err(t.id, "task" + k + " needs 8 options A–H");
    else if(new Set(task.opts).size !== 8) err(t.id, "task" + k + " duplicate options");
  });
  if(!Array.isArray(t.qs) || t.qs.length !== 10) err(t.id, "needs 10 questions");
  const seen = {1:{}, 2:{}}, used = {1:new Set(), 2:new Set()};
  (t.qs || []).forEach((q, i) => {
    const qid = t.id + " q" + (i + 1) + " (task" + q.task + " S" + q.n + ")";
    if(q.task !== 1 && q.task !== 2) { err(qid, "task must be 1 or 2"); return; }
    if(!Number.isInteger(q.n) || q.n < 1 || q.n > 5) { err(qid, "n must be 1–5"); return; }
    if(seen[q.task][q.n]) err(qid, "duplicate speaker in task");
    seen[q.task][q.n] = true;
    if(!Number.isInteger(q.correct) || q.correct < 0 || q.correct > 7) err(qid, "correct out of range 0–7");
    else if(used[q.task].has(q.correct)) err(qid, "letter " + LETTERS[q.correct] + " used twice in task " + q.task);
    else used[q.task].add(q.correct);
    const idx = checkQ(q, qid, t);
    if(idx >= 0 && idx !== q.n - 1) err(qid, "evidence is not in Speaker " + q.n + "'s line");
  });
  [1, 2].forEach(k => { if(Object.keys(seen[k]).length !== 5) err(t.id, "task" + k + " must cover speakers 1–5"); });
});

/* ---- counts ---- */
const want = {p1:8, p2:8, p3:8, p4:8};
Object.keys(want).forEach(p => {
  const n = (L[p] || []).length;
  if(n < want[p]) err(p, "has " + n + " tasks, expected at least " + want[p]);
});

console.log("Listening: p1 " + (L.p1 || []).length + ", p2 " + (L.p2 || []).length + ", p3 " + (L.p3 || []).length + ", p4 " + (L.p4 || []).length +
  " tasks; " + errors + " error(s), " + warnings + " warning(s).");
process.exit(errors ? 1 : 0);
