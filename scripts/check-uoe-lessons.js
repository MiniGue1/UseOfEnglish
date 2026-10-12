#!/usr/bin/env node
/* Structure checks for js/data/uoe-lessons.js (+ cross-check with js/data/uoe.js). Run: node scripts/check-uoe-lessons.js */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), assert = require("assert");
const root = path.join(__dirname, "..");
const ctx = {window:{}}; ctx.window.window = ctx.window; vm.createContext(ctx);
["js/data/uoe.js", "js/data/uoe-lessons.js"].forEach(f => vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, {filename:f}));
const U = ctx.window.DATA.uoe, L = ctx.window.DATA.uoeLessons;
let n = 0, warn = 0;
const ok = (c, m) => { assert(c, m); n++; };
const norm = s => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[.,;!?]+/g, " ").replace(/\s+/g, " ").trim();
const words = s => norm(s).replace(/n't\b/g, " not").replace(/'(re|ve|ll|m|d|s)\b/g, " x").split(" ").filter(Boolean).length;
const bankIds = new Set(U.bank.map(b => b.id));
const seen = new Set();

function checkItem(it, where){
  const w = where + " " + it.id;
  ok(/^L-/.test(it.id), w + ": id must start with L-");
  ok(!seen.has(it.id) && !bankIds.has(it.id), w + ": duplicate id"); seen.add(it.id);
  ok([1,2,3,4].includes(it.part), w + ": part");
  ok(typeof it.cat === "string" && U.cats[it.cat], w + ": unknown cat " + it.cat);
  ok(typeof it.why === "string" && it.why.length > 10, w + ": why");
  ok(it.text.split("____").length === 2, w + ": text needs exactly one ____");
  if(it.type === "mc"){
    ok(it.part === 1 && Array.isArray(it.opts) && it.opts.length === 4 && new Set(it.opts).size === 4, w + ": 4 distinct opts");
    ok(Number.isInteger(it.correct) && it.correct >= 0 && it.correct < 4, w + ": correct index");
  } else {
    ok(Array.isArray(it.ans) && it.ans.length && it.ans.every(a => typeof a === "string" && a.trim()), w + ": ans");
    if(it.type === "oc") ok(it.part === 2 && it.ans.every(a => !/\s/.test(a.trim()) && !/'/.test(a)), w + ": open cloze = one word, no contraction");
    if(it.type === "wf") ok(it.part === 3 && /^[A-Z]+$/.test(it.key) && it.ans.every(a => !/\s/.test(a)), w + ": wf key/answers");
    if(it.type === "kt"){
      ok(it.part === 4 && it.a && it.key, w + ": kt fields");
      const key = it.key.toLowerCase().replace(/[’‘]/g, "'");
      it.ans.forEach(a => {
        /* same rule as the module: a key with an apostrophe must appear verbatim, otherwise contractions are expanded first (oughtn't -> ought not) */
        const hay = key.includes("'") ? norm(a).split(" ") : norm(a).replace(/n't\b/g, " not").split(" ");
        ok(hay.includes(key), w + ": answer '" + a + "' lacks key " + it.key);
        const c = words(a); ok(c >= 3 && c <= 6, w + ": answer '" + a + "' has " + c + " words");
      });
      ok(Array.isArray(it.parts) && it.parts.length === 2 && it.parts.every(p => Array.isArray(p) && p.length), w + ": kt parts [[…],[…]]");
      ok(norm(it.a) !== norm(it.text.replace("____", it.ans[0])), w + ": transformation must differ");
    }
  }
  ok(["mc","oc","wf","kt"].includes(it.type), w + ": type");
}

ok(L && L.parts && Array.isArray(L.topics) && L.catRules && L.catTopic, "top-level keys");
[1,2,3,4].forEach(p => {
  const l = L.parts[p], w = "part " + p;
  ok(l && l.part === p && l.id === "p" + p, w + ": id/part");
  ["title","short","marks","time","tests"].forEach(k => ok(typeof l[k] === "string" && l[k].length > 3, w + ": " + k));
  ok(Array.isArray(l.strategy) && l.strategy.length >= 5, w + ": strategy >= 5 steps");
  ok(Array.isArray(l.traps) && l.traps.length === 10 && l.traps.every(t => t.t && t.d && t.ex), w + ": exactly 10 traps {t,d,ex}");
  ok(Array.isArray(l.worked) && l.worked.length >= 3 && l.worked.every(x => x.text && x.answer && x.steps.length >= 2), w + ": >= 3 worked examples");
  l.worked.forEach(x => { ok(x.text.split("____").length === 2, w + ": worked text gap"); if(p === 1) ok(x.opts.includes(x.answer), w + ": worked answer in opts"); if(p >= 3) ok(x.key, w + ": worked key"); if(p === 4) ok(x.a, w + ": worked a"); });
  ok(Array.isArray(l.quiz) && l.quiz.length === 6, w + ": 6 quiz items");
  l.quiz.forEach(it => { checkItem(it, w); ok(it.part === p, w + ": quiz item from another part " + it.id); });
});
const wantTopics = ["inv","cond","ded","pas","prep","col","wf"];
ok(wantTopics.every(id => L.topics.some(t => t.id === id)), "all 7 thematic lessons present");
ok(new Set(L.topics.map(t => t.id)).size === L.topics.length, "unique topic ids");
L.topics.forEach(t => {
  const w = "topic " + t.id;
  ok(t.title && t.intro && Array.isArray(t.cats) && t.cats.every(c => U.cats[c]), w + ": title/intro/cats");
  ok(Array.isArray(t.table) && t.table.length >= 6 && t.table.every(r => r.length === 3 && r.every(Boolean)), w + ": rule table rows [form, use, example]");
  ok(Array.isArray(t.tips), w + ": tips");
  ok(Array.isArray(t.quiz) && t.quiz.length === 6, w + ": 6 practice items");
  t.quiz.forEach(it => checkItem(it, w));
});
Object.entries(L.catTopic).forEach(([c, t]) => ok(U.cats[c] && L.topics.some(x => x.id === t), "catTopic " + c + " -> " + t));
Object.entries(L.catRules).forEach(([c, r]) => ok(r.rule && Array.isArray(r.ex) && r.ex.length >= 1, "catRules " + c));
Object.keys(U.cats).forEach(c => { if(!L.catRules[c]){ warn++; console.warn("warning: no catRules entry for category '" + c + "' (module falls back gracefully)"); } });

console.log("check-uoe-lessons: " + n + " checks OK" + (warn ? ", " + warn + " warnings" : "") + " (" + seen.size + " quiz items)");
