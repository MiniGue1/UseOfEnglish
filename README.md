# C1 Advanced portál

Statický web pro přípravu na zkoušku **Cambridge C1 Advanced (CAE)**: Use of English, Reading, Listening, Writing, Speaking, slovní zásoba, přehled s denním plánem a slabými místy, studijní plán podle data zkoušky a mock testy s orientačním převodem na Cambridge English Scale.

- Žádný build, žádné npm, žádný framework: čisté HTML + CSS + JavaScript (ES2020) v `<script>` tagech.
- Rozhraní je česky, obsah zkoušky anglicky.
- Pokrok se ukládá jen v prohlížeči (`localStorage`, klíče `cae:*`). Zálohu stáhneš přes ⚙ → *Stáhnout zálohu*.
- Funguje offline (service worker `sw.js`) a jde nainstalovat jako aplikace (PWA, `manifest.json`).

## Struktura

```
index.html            kostra stránky, pořadí <script> tagů
manifest.json         PWA manifest (name, theme_color, start_url "./", scope "./")
sw.js                 service worker – offline cache (seznam PRECACHE + VERSION)
vercel.json           nastavení Vercelu (cleanUrls, hlavičky cache)
css/app.css           sdílené styly a barevné tokeny (světlý/tmavý režim)
js/core.js            jádro: router (#/modul/podstránka), Portal.store, logActivity, TTS, utility
js/data/<název>.js    čistá data: window.DATA.<název> = {...}
js/modules/<id>.js    moduly: Portal.register({...})
  home.js             Přehled: streak, dnešní plán, slabá místa, studijní plán, ⚙ menu, záloha, registrace SW
  mock.js             Mock test centrum, výsledky a historie, průvodce „O zkoušce“
  uoe.js reading.js listening.js writing.js speaking.js vocab.js
scripts/check-*.js    kontrolní skripty (node), např. node scripts/check-mock.js
docs/CONTRACT.md      závazná pravidla pro moduly a tvar dat
_legacy/              původní jednosouborová verze (na Vercel se nenasazuje)
```

Pořadí položek v navigaci = pořadí, v jakém se moduly zaregistrují (tj. pořadí `<script>` v `index.html`). `home.js` se načítá hned po `core.js`, `mock.js` jako poslední.

## Přidání modulu nebo dat

1. Vytvoř `js/data/<název>.js` (`window.DATA.<název> = {...}`) a/nebo `js/modules/<id>.js`:
   ```js
   Portal.register({
     id: "idioms", title: "Idiomy", short: "Idiomy", blurb: "Krátký popis na kartu",
     render(stage, {sub}) { /* vykresli do stage; sub = #/idioms/<sub> */ },
     progress() { return {done: 3, total: 40}; },          // volitelné – karta na přehledu
     mock: { paper: "…", minutes: 40, run(stage, finish) { /* … */ finish({correct, total}); } } // jen papers
   });
   ```
   Po každé dokončené sadě volej `Portal.logActivity(id, "part3", správně, celkem)` – z toho se počítá streak, úspěšnost a slabá místa. Část pojmenuj `partN`, pak funguje i odkaz z přehledu (`#/id/partN`).
2. Přidej `<script src="…">` do `index.html` (data před moduly).
3. Přidej stejné cesty do pole `PRECACHE` v `sw.js` a **zvyš `VERSION`** (viz níže).
4. Spusť `node scripts/check-mock.js` – mimo jiné ověří, že každý skript/styl z `index.html` je v `PRECACHE` a že soubory existují.
5. Pravidla (texty, kvalita, vlastní obsah) jsou v `docs/CONTRACT.md`.

## Mock testy a skóre

Mock centrum volá `Portal.modules[id].mock.run(stage, finish)` pro `uoe` + `reading` (Reading & Use of English, body se sčítají), `writing`, `listening`, `speaking`. Body se převedou na procenta → `Portal.util.cambridgeScale()` → `gradeFor()`. Celkové skóre je průměr pěti dovedností (Reading, Use of English, Writing, Listening, Speaking) jako na Statement of Results. Převod je **orientační**. Historie je v `cae:mock:history`.

## Nasazení na Vercel

1. Pushni repozitář na GitHub.
2. Na vercel.com → *Add New… → Project* → vyber repozitář.
3. **Framework Preset: Other**, **Build Command: prázdné** (žádný build), **Output Directory: `.`**, Install Command prázdné.
4. *Deploy*. Každý push do hlavní větve se nasadí automaticky.

`vercel.json` už obsahuje `cleanUrls` a hlavičky: JS/CSS/HTML se vždy revalidují (`max-age=0, must-revalidate`, platí i pro `sw.js`), obrázky se cachují dlouhodobě. `.vercelignore` vynechává `_legacy/` a `docs/`.

Lokálně stačí libovolný statický server, např. `python3 -m http.server 8000` a otevřít `http://localhost:8000/`. Service worker se registruje jen na `https://` nebo `localhost`.

## Aktualizace offline cache (service worker)

`sw.js` ukládá soubory do cache pojmenované podle `VERSION`:

- HTML/JS/CSS/JSON: *stale-while-revalidate* (okamžitě z cache, na pozadí se stáhne novější verze),
- obrázky a ostatní statické soubory: *cache-first*,
- Google Fonts: cache-first, výpadek se tiše ignoruje (CSS má systémová záložní písma).

**Po každém nasazení se změnami** zvyš verzi v `sw.js`:

```js
const VERSION = "cae-v2";   // bylo "cae-v1"
```

Při další návštěvě se nainstaluje nový worker, stáhne čerstvé soubory a staré cache smaže; uživatel uvidí hlášku „Nová verze portálu je připravena – obnov stránku“. Nové soubory nezapomeň přidat do `PRECACHE`.

## Data uživatele

⚙ v horní liště (nebo Přehled → *Data a záloha*):

- **Stáhnout zálohu** – všechny klíče `cae:*` do souboru `cae-zaloha-RRRR-MM-DD.json`.
- **Obnovit ze zálohy** – ověří soubor a nabídne *Sloučit* (aktivita a historie se spojí bez duplicit, nastavení zůstane z tohoto zařízení) nebo *Nahradit* (současná data se smažou).
- **Smazat vše** – po dvojím potvrzení (napsat `SMAZAT`).
- Vzhled: Auto / Světlý / Tmavý (`data-theme` na `<html>`, uloženo v `cae:theme`).
