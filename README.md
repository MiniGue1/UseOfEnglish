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
api/auth.js           Vercel funkce: přihlášení přes Google (session cookie)
api/sync.js           Vercel funkce: synchronizace postupu mezi zařízeními (Upstash Redis)
css/app.css           sdílené styly a barevné tokeny (světlý/tmavý režim)
js/core.js            jádro: router (#/modul/podstránka), Portal.store, logActivity, TTS, utility
js/data/<název>.js    čistá data: window.DATA.<název> = {...}
js/modules/<id>.js    moduly: Portal.register({...})
  home.js             Přehled: streak, dnešní plán, slabá místa, studijní plán, ⚙ menu, záloha, registrace SW
  mock.js             Mock test centrum, výsledky a historie, průvodce „O zkoušce“
  uoe.js reading.js listening.js writing.js speaking.js vocab.js
js/sync.js            tlačítko účtu vpravo nahoře + synchronizace (pravidla slučování v js/sync-merge.js)
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
3. **Framework Preset: Other**, **Build Command: prázdné** (žádný build), **Output Directory: `.`**, Install Command prázdné. Funkce ve složce `api/` Vercel najde sám (Node.js, bez npm závislostí).
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
const VERSION = "cae-v4";   // bylo "cae-v3"
```

Při další návštěvě se nainstaluje nový worker, stáhne čerstvé soubory a staré cache smaže; uživatel uvidí hlášku „Nová verze portálu je připravena – obnov stránku“. Nové soubory nezapomeň přidat do `PRECACHE`.

## Data uživatele

⚙ v horní liště (nebo Přehled → *Data a záloha*):

- **Stáhnout zálohu** – všechny klíče `cae:*` do souboru `cae-zaloha-RRRR-MM-DD.json`.
- **Obnovit ze zálohy** – ověří soubor a nabídne *Sloučit* (aktivita a historie se spojí bez duplicit, nastavení zůstane z tohoto zařízení) nebo *Nahradit* (současná data se smažou).
- **Smazat vše** – po dvojím potvrzení (napsat `SMAZAT`).
- Vzhled: Auto / Světlý / Tmavý (`data-theme` na `<html>`, uloženo v `cae:theme`).

## Synchronizace mezi zařízeními (Google přihlášení)

Kdo se přihlásí Google účtem (tlačítko ☁ vpravo nahoře), má stejný postup na mobilu i na PC. Pokrok se dál ukládá do prohlížeče, takže web funguje i offline; změny se odešlou pár sekund po uložení, při zavření nebo přepnutí aplikace a každé 2 minuty, a ze serveru přijde, co se mezitím změnilo jinde.

**Pravidla slučování** (`js/sync-merge.js`): u každé položky vyhrává novější verze; logy (`activity`, `*:history`) se slučují, takže se neztratí nic, co jsi dělal na kterém zařízení. Smazání (*Smazat vše*, reset plánu) se přenese taky. Vzhled (světlý/tmavý) zůstává pro každé zařízení zvlášť.

### Zapnutí (jednou)

1. **Google Client ID** – [console.cloud.google.com](https://console.cloud.google.com/) → *APIs & Services*:
   - *OAuth consent screen*: typ **External**, název aplikace, tvůj e-mail. V režimu *Testing* přidej v *Test users* všechny Google účty, které se budou přihlašovat (nebo aplikaci dej *Publish* – pro základní údaje e-mail/jméno Google ověření nevyžaduje).
   - *Credentials → Create credentials → OAuth client ID* → **Web application** → *Authorized JavaScript origins*: `https://useofenglish.vercel.app` (a případně vlastní doménu). Redirect URI není potřeba.
   - Zkopíruj **Client ID** (končí na `.apps.googleusercontent.com`).
2. **Databáze** – Vercel → projekt → *Storage* → *Create Database* → **Upstash for Redis** (free) → *Connect Project*. Vercel sám přidá proměnné `KV_REST_API_URL` a `KV_REST_API_TOKEN` (fungují i `UPSTASH_REDIS_REST_URL`/`_TOKEN`).
3. **Proměnná** – Vercel → *Settings → Environment Variables*: `GOOGLE_CLIENT_ID` = Client ID z kroku 1 (Production i Preview).
4. **Redeploy** (*Deployments → … → Redeploy*), aby funkce proměnné načetly.

Dokud něco chybí, tlačítko ☁ ukáže, co přesně (`GET /api/auth` vrací `missing`). Na čistě statickém hostingu bez `api/` se tlačítko vůbec nezobrazí.

### Jak to funguje

- `POST /api/auth` ověří Google ID token přes `oauth2.googleapis.com/tokeninfo` (podpis, platnost, `aud` = tvoje Client ID) a založí náhodnou session (Redis `s:<id>`, 180 dní, cookie `cae_sid` HttpOnly + Secure + SameSite=Lax). Client secret ani další klíče nejsou potřeba.
- `POST /api/sync` přijme změněné položky `{t, v}` (nebo `{t, d:1}` pro smazané), sloučí je s uloženou kopií (Redis `u:<google-sub>`) a vrátí, co se změnilo od posledního `lastSeq` daného zařízení. Velikost dat je omezená na ~900 kB.
- Každý zápis přes `Portal.store` si v `cae:__meta` pamatuje čas změny; moduly proto musí ukládat **jen přes `Portal.store`**, jinak se změna nesynchronizuje. Moduly, které si drží stav v paměti, ho mají zahodit při události `cae:remote` (viz `uoe.js`).
- Testy: `node scripts/check-sync.js` (pravidla slučování + obě funkce s falešným Redisem a Googlem).
