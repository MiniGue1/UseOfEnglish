#!/usr/bin/env node
/* Validates js/data/vocab.js. Run: node scripts/check-vocab.js */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const file = path.join(__dirname, "..", "js", "data", "vocab.js");
const ctx = {window: {}}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(file, "utf8"), ctx, {filename: file});
const V = ctx.window.DATA && ctx.window.DATA.vocab;
const errors = [], warns = [];
const err = (m) => errors.push(m), warn = (m) => warns.push(m);
if (!V) { console.error("DATA.vocab missing"); process.exit(1); }

const TYPES = new Set(V.types.map(t => t.id)), TOPICS = new Set(V.topics.map(t => t.id));
const ids = new Set(), pairs = new Set(), exs = new Set();
const byType = {}, byTopic = {};
const IRREG = {come:["came"], die:["dying"], use:["using"], do:["doing","did","done"], take:["took","taken","taking"], give:["gave","given"], go:["went","gone"], get:["got"], bring:["brought"], run:["ran"],
  fall:["fell","fallen"], hold:["held"], break:["broke","broken"], make:["made"], keep:["kept"], catch:["caught"], stand:["stood"],
  draw:["drew","drawn"], see:["saw","seen"], wear:["wore","worn"], lay:["laid"], sell:["sold"], pay:["paid"], buy:["bought"],
  strike:["struck"], grow:["grew","grown"], bear:["bore","borne"], lose:["lost"], steal:["stole","stolen"], shed:["shed"], sit:["sat"],
  have:["had","having"], be:["was","were","is","are","been"], meet:["met"], think:["thought"], win:["won"], hit:["hit"], spill:["spilled","spilt"],
  bury:["buried"], learn:["learnt","learned"], burn:["burning"], one:[], tighten:["tighten"], sail:["sailed"], ride:["rode"], rise:["rose","risen"]};
const SKIP = new Set(["sb","sth","one's","oneself","someone","something","a","an","the","to","of","be","n","v","adj","adv","is","it's","that"]);
const forms = w => [w, ...(IRREG[w] || [])];
const stemOk = (word, text) => forms(word).some(f => {
  const p = f.length <= 4 ? f : f.slice(0, Math.max(4, f.length - 3));
  return new RegExp("\\b" + p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(text);
});

for (const c of V.cards) {
  const where = c.id || JSON.stringify(c).slice(0, 60);
  for (const k of ["id", "type", "en", "cs", "ex", "gap", "topic"]) if (!c[k] || typeof c[k] !== "string") err(`${where}: missing ${k}`);
  if (ids.has(c.id)) err(`${where}: duplicate id`); ids.add(c.id);
  if (!TYPES.has(c.type)) err(`${where}: unknown type ${c.type}`);
  if (!TOPICS.has(c.topic)) err(`${where}: unknown topic ${c.topic}`);
  const key = c.type + "|" + c.en.toLowerCase(); if (pairs.has(key)) err(`${where}: duplicate entry ${key}`); pairs.add(key);
  if (exs.has(c.ex)) err(`${where}: duplicate example sentence`); exs.add(c.ex);
  const bolds = [...c.ex.matchAll(/\*\*(.+?)\*\*/g)].map(m => m[1]);
  if (bolds.length !== 1) err(`${where}: example must contain exactly one **bold** target (found ${bolds.length})`);
  if (!c.gap.includes("____")) err(`${where}: gap lacks ____`);
  if ((c.gap.match(/____/g) || []).length !== 1) err(`${where}: gap must contain exactly one ____`);
  if (bolds.length === 1 && c.ex.replace(/\*\*(.+?)\*\*/, "____") !== c.gap) err(`${where}: gap is not the example with the target replaced`);
  if (/\*\*/.test(c.gap)) err(`${where}: gap still contains bold markers`);
  // the example must actually use the item: every content word of `en` (or its irregular form) appears in the example
  const plain = c.ex.replace(/\*\*/g, "");
  const words = c.en.replace(/\(.*?\)/g, " ").toLowerCase().split(/[^a-z'-]+/).filter(w => w && !SKIP.has(w));
  for (const w of words) {
    const parts = w.split("-").filter(Boolean);
    if (!parts.every(p => SKIP.has(p) || stemOk(p, plain))) err(`${where}: example does not contain "${w}" from "${c.en}"`);
  }
  // the bold target must be tied to the item (shares a word stem with en, or for dependent prepositions IS the preposition)
  if (bolds.length === 1) {
    const b = bolds[0].toLowerCase();
    const enl = c.en.toLowerCase();
    const tied = b.split(/[\s-]+/).some(t => t.length > 1 && words.some(w => w.split("-").some(p => forms(p).some(f => f.slice(0, 3) === t.slice(0, 3)))) ) || enl.includes(b);
    if (!tied) err(`${where}: bold target "${bolds[0]}" not related to "${c.en}"`);
    if (c.type === "dependent preposition" && !new RegExp("\\b" + b + "\\b").test(enl)) err(`${where}: preposition "${b}" not in "${c.en}"`);
  }
  if (c.dis) {
    if (!Array.isArray(c.dis) || c.dis.length < 3) err(`${where}: dis must have >= 3 distractors`);
    const ans = (bolds[0] || "").toLowerCase();
    if (c.dis.some(d => d.toLowerCase() === ans)) err(`${where}: distractor equals answer`);
    if (new Set(c.dis.map(d => d.toLowerCase())).size !== c.dis.length) err(`${where}: duplicate distractors`);
  } else if (["collocation", "confusable", "word formation"].includes(c.type)) err(`${where}: ${c.type} needs dis (exam-style distractors)`);
  if (c.type === "word formation") {
    if (!c.stem || c.stem !== c.stem.toUpperCase()) err(`${where}: word formation needs UPPERCASE stem`);
    else if ((bolds[0] || "").toLowerCase() === c.stem.toLowerCase()) err(`${where}: answer equals stem (no transformation)`);
  }
  if (c.tip !== undefined && (typeof c.tip !== "string" || !c.tip.trim())) err(`${where}: empty tip`);
  byType[c.type] = (byType[c.type] || 0) + 1; byTopic[c.topic] = (byTopic[c.topic] || 0) + 1;
}

const stems = new Set(); let famItems = 0;
for (const f of V.wordFamilies) {
  const w = f.stem || "?";
  if (!f.stem || f.stem !== f.stem.toUpperCase()) err(`family ${w}: stem must be UPPERCASE`);
  if (stems.has(f.stem)) err(`family ${w}: duplicate stem`); stems.add(f.stem);
  if (!f.cs) err(`family ${w}: missing cs`);
  for (const k of ["noun", "adj", "adv", "verb", "neg"]) if (!Array.isArray(f[k])) err(`family ${w}: ${k} must be array`);
  const all = new Set([...f.noun, ...f.adj, ...f.adv, ...f.verb, ...f.neg].map(s => s.toLowerCase()));
  if (all.size < 2) err(`family ${w}: needs at least 2 forms`);
  if (!f.items || !f.items.length) err(`family ${w}: needs at least one sentence`);
  for (const it of f.items || []) {
    famItems++;
    if ((it.s.match(/____/g) || []).length !== 1) err(`family ${w}: sentence needs exactly one ____: ${it.s}`);
    if (!it.a) err(`family ${w}: missing answer`);
    const a = (it.a || "").toLowerCase();
    if (a === f.stem.toLowerCase()) err(`family ${w}: answer equals stem: ${it.s}`);
    // answer must be a listed form (allow inflection: plural -s / -es / -ies, -ed)
    const base = [a, a.replace(/ies$/, "y"), a.replace(/es$/, ""), a.replace(/s$/, ""), a.replace(/d$/, ""), a.replace(/ed$/, "")];
    if (!base.some(b => all.has(b))) err(`family ${w}: answer "${it.a}" not listed among forms`);
  }
}

const need = (cond, m) => { if (!cond) err(m); };
need(V.cards.length >= 600, `cards: ${V.cards.length} < 600`);
need(V.wordFamilies.length >= 80, `wordFamilies: ${V.wordFamilies.length} < 80`);
for (const t of TYPES) need((byType[t] || 0) >= 30, `type ${t} has only ${byType[t] || 0} cards`);
for (const t of TOPICS) need((byTopic[t] || 0) >= 25, `topic ${t} has only ${byTopic[t] || 0} cards`);

console.log(`cards: ${V.cards.length}, word families: ${V.wordFamilies.length} (${famItems} sentences)`);
console.log("per type:", JSON.stringify(byType));
console.log("per topic:", JSON.stringify(byTopic));
warns.forEach(w => console.warn("WARN", w));
if (errors.length) { errors.forEach(e => console.error("ERROR", e)); console.error(`${errors.length} error(s)`); process.exit(1); }
console.log("OK – vocab data valid");
