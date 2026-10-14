/* DATA.uoeLessons – B2 First: výukové lekce k Use of English (Reading & Use of English Part 1–4).
   Pure data, original content. Výklad česky, příklady anglicky (B2).
   parts[1..4]: {id, part, title, short, marks, time, tests, strategy[], traps[{t,d,ex}] x10, worked[{…, steps[], answer}], quiz[6 items]}
   topics[]:    {id, title, cats[], intro, table[[tvar, význam/použití, příklad]], tips[], quiz[6 items]}
   catRules:    {<cat>: {rule, ex[]}}  – krátké pravidlo + vzorové věty pro zpětnou vazbu u chyb
   catTopic:    {<cat>: <topic id>}   – která lekce k dané kategorii patří
   Quiz items have the same shape as DATA.uoe.bank items (mc / oc / wf / kt), ids start with "L-".
   Validate with: node scripts/check-b2-uoe.js */
window.DATA = window.DATA || {};
window.DATA.uoeLessons = (function(){
"use strict";
const mc=(id,cat,text,opts,correct,why)=>({id,part:1,type:"mc",cat,text,opts,correct,why});
const oc=(id,cat,text,ans,why)=>({id,part:2,type:"oc",cat,text,ans,why});
const wf=(id,cat,text,key,ans,why)=>({id,part:3,type:"wf",cat,text,key,ans,why});
const kt=(id,cat,a,key,text,ans,parts,why)=>({id,part:4,type:"kt",cat,a,key,text,ans,parts,why});

/* ================================================================ PART LESSONS */
const parts = {
1:{
  id:"p1", part:1, title:"Part 1 · Multiple-choice cloze",
  short:"Text s 8 mezerami, ke každé 4 slova – vybíráš to, které tvoří správnou kolokaci, frázové sloveso nebo vazbu.",
  marks:"8 otázek × 1 bod = 8 bodů (počítají se do Readingu)", time:"cca 8 minut",
  tests:"Part 1 testuje slovní zásobu v kontextu: kolokace (make a mistake, heavy traffic), frázová slovesa (put off, run out of), ustálená spojení (by mistake, in the end), předložkové vazby (keen on, succeed in) a rozdíly mezi podobnými slovy (lend × borrow, remind × remember). Všechny čtyři možnosti bývají stejný slovní druh s podobným významem – rozhoduje, které slovo se s okolím skutečně pojí. Pozor: body z Part 1 Cambridge počítá do skóre Reading, ne do Use of English.",
  strategy:[
    "Přečti nejdřív celý text (asi 30 sekund), ať víš, o čem je.",
    "U každé mezery si přečti celou větu – hlavně slova ZA mezerou: předložku, částici, „to“ nebo podstatné jméno, se kterým se slovo pojí.",
    "Zkus mezeru doplnit sám, než se podíváš na možnosti. Když tvé slovo mezi možnostmi je, je to dobrý signál.",
    "Vyřaď možnosti, které nesedí gramaticky (špatná předložka, chybí „to“, sloveso nemůže mít předmět).",
    "Ze zbylých vyber tu, která tvoří ustálenou frázi. Ptej se: „Řekl by to tak rodilý mluvčí?“",
    "Nakonec si přečti celý text s doplněnými slovy a nenechávej žádnou mezeru prázdnou – za chybu se body neodečítají."
  ],
  traps:[
    {t:"Make × do × take × have", d:"Obecná slovesa se pojí s pevnými podstatnými jmény a logicky se to odvodit nedá – musíš je znát.", ex:"make a mistake, do homework, take a photo, have a shower"},
    {t:"Frázové sloveso se špatnou částicí", d:"Všechny možnosti bývají slovesa, která s danou částicí existují, ale jen jedno má správný význam.", ex:"The match was put off (odložen) × called off (zrušen)."},
    {t:"Předložka za mezerou", d:"Synonyma se často liší jen předložkou. Podívej se, co stojí za mezerou.", ex:"keen ON, interested IN, fond OF, proud OF"},
    {t:"Vazba po slovesu", d:"Některá slovesa chtějí to, jiná -ing, jiná infinitiv bez to.", ex:"let me go × allow me to go × suggest going"},
    {t:"Lend × borrow, remind × remember", d:"Dvojice slov s opačnou perspektivou. Kdo komu půjčuje? Kdo komu připomíná?", ex:"Can you lend me your pen? × Can I borrow your pen?"},
    {t:"Say × tell × speak × talk", d:"tell + osoba / the truth / a story; say + něco (to sb); speak + jazyk; talk + about.", ex:"He told me the truth. She said nothing to me."},
    {t:"Falešní přátelé", d:"Česká podobnost klame: actually = vlastně (ne aktuálně), eventually = nakonec, sympathetic = soucitný.", ex:"Actually, I've never been there."},
    {t:"Spojka × předložka", d:"although / even though + věta, despite / in spite of + podstatné jméno nebo -ing.", ex:"Despite the rain… × Although it was raining…"},
    {t:"Ustálené fráze s předložkou", d:"Jedno slovo je pevné a nedá se nahradit synonymem.", ex:"by mistake, on purpose, in the end, at first, on foot"},
    {t:"Přídavné jméno + podstatné jméno", d:"Kolokace typu heavy traffic nebo strong coffee se nepřekládají doslova.", ex:"heavy rain, strong wind, high price, well worth"}
  ],
  worked:[
    {text:"Could you ____ me a favour and carry this bag?", opts:["make","do","give","take"], answer:"do", steps:[
      "Za mezerou je „me a favour“ – to je signál pevné kolokace.",
      "Kolokace zní do sb a favour = udělat někomu laskavost. Make a favour je typická chyba z češtiny („udělat“).",
      "Give a take se s favour v tomto významu nepojí. Odpověď: do."]},
    {text:"The match had to be ____ off, and it will not be played at all this season.", opts:["put","set","called","taken"], answer:"called", steps:[
      "Za mezerou je částice off – hledáme frázové sloveso.",
      "put off = odložit, call off = zrušit. Konec věty (will not be played at all) ukazuje, že zápas se nebude hrát vůbec.",
      "set off = vyrazit, take off = vzlétnout – nedávají smysl. Odpověď: called."]},
    {text:"I'm not very ____ on spicy food.", opts:["fond","keen","interested","pleased"], answer:"keen", steps:[
      "Za mezerou je předložka on. Všechny možnosti mají podobný význam, rozhodne tedy předložka.",
      "fond OF, interested IN, pleased WITH – nesedí.",
      "keen ON = mít v oblibě. Odpověď: keen."]}
  ],
  quiz:[
    mc("L-p1-1","col","We had to ____ a lot of changes to our plan.",["do","make","take","have"],1,"make changes = udělat změny. do / take / have changes se neříká."),
    mc("L-p1-2","pv","My grandfather ____ up smoking ten years ago.",["took","put","set","gave"],3,"give up = přestat (s něčím). take up = začít, put up = postavit, set up = založit."),
    mc("L-p1-3","mean","She ____ me to bring my passport.",["reminded","remembered","recalled","memorised"],0,"remind sb to do = připomenout někomu. remember a recall = vzpomenout si sám, memorise = naučit se nazpaměť."),
    mc("L-p1-4","prep","I'm very ____ of my sister – she's just finished university.",["pleased","happy","proud","glad"],2,"proud of = hrdý na. pleased WITH, happy FOR, glad ABOUT."),
    mc("L-p1-5","fix","He broke the vase on ____ because he was angry.",["reason","aim","purpose","intention"],2,"on purpose = schválně. reason, aim a intention do této fráze nepatří."),
    mc("L-p1-6","link","____ feeling tired, I went for a run.",["Despite","Although","However","Even though"],0,"Despite + -ing = navzdory. Although a even though potřebují celou větu (although I felt tired), However je příslovce.")
  ]
},
2:{
  id:"p2", part:2, title:"Part 2 · Open cloze",
  short:"Text s 8 mezerami bez nabídky – doplňuješ jedno slovo, většinou gramatické (předložku, zájmeno, spojku, pomocné sloveso).",
  marks:"8 otázek × 1 bod = 8 bodů", time:"cca 8 minut",
  tests:"Part 2 testuje gramatiku a „malá“ slova: předložky, členy, zájmena (vztažná, zvratná, neurčitá), spojky, pomocná slovesa, srovnání (than, as, the more), kvantifikátory (much, many, few, enough) a části frázových sloves a ustálených frází (look forward to, in spite of, as long as). Doplňuje se právě jedno slovo a musí být správně napsané; stažené tvary (don't, it's) se počítají jako dvě slova, takže do mezery nepatří.",
  strategy:[
    "Přečti celý text, ať chápeš logiku – kontrast, příčinu, následek.",
    "U každé mezery urči, jaký slovní druh chybí: předložka? spojka? pomocné sloveso? zájmeno? člen?",
    "Podívej se na slova PŘED i ZA mezerou. Hledej neúplné fráze (as … as, so … that, such … that, look forward …).",
    "Zkontroluj, jestli věta nemá chybějící podmět (it / there) nebo pomocné sloveso (did, have, had).",
    "Napiš jen JEDNO slovo, bez stažených tvarů.",
    "Na konci přečti celé věty s doplněnými slovy a zkontroluj pravopis."
  ],
  traps:[
    {t:"Vztažné zájmeno", d:"who (osoba), which (věc), whose (čí), where (kde). Po čárce nikdy that.", ex:"My brother, WHO lives in Leeds, is a nurse."},
    {t:"Chybějící pomocné sloveso", d:"V otázkách, záporu a krátkých reakcích chybí do / does / did nebo have / had.", ex:"I don't like it, and neither DOES my sister."},
    {t:"it × there", d:"it zastupuje infinitiv nebo čas (It takes…, It is important to…), there představuje něco nového (There is…).", ex:"IT takes ten minutes. THERE is a café nearby."},
    {t:"Předložka po slovesu nebo přídavném jménu", d:"Pevné vazby se nedají odvodit z češtiny.", ex:"depend ON, good AT, afraid OF, interested IN"},
    {t:"Srovnání", d:"than po druhém stupni, as … as pro rovnost, the more…, the better…", ex:"older THAN me, as tall AS, the MORE you practise"},
    {t:"so × such, too × enough", d:"so + přídavné jméno, such (a) + podstatné jméno; enough stojí za přídavným jménem.", ex:"SUCH a nice day, SO nice, old ENOUGH, TOO old"},
    {t:"Víceslovné spojky", d:"V mezeře často chybí jedno slovo z delší spojky.", ex:"in CASE, as LONG as, EVEN though, in spite OF, as SOON as"},
    {t:"Kvantifikátory", d:"much + nepočitatelné, many + počitatelné, few / little = málo, a few / a little = pár.", ex:"too MUCH homework, very FEW people"},
    {t:"Stažené tvary", d:"can't, it's, don't = dvě slova, do mezery nepatří. Místo can't napiš cannot.", ex:"That CANNOT be true."},
    {t:"Frázová slovesa a fráze", d:"Chybí částice nebo slovo z ustálené fráze.", ex:"look forward TO, run out OF, find OUT, at FIRST, after ALL"}
  ],
  worked:[
    {text:"I'm looking forward ____ seeing you next week.", answer:"to", steps:[
      "Před mezerou je „looking forward“ – frázové sloveso look forward to = těšit se na.",
      "„to“ je tu předložka, proto po ní následuje -ing (seeing), ne infinitiv.",
      "Odpověď: to."]},
    {text:"The man ____ car was stolen called the police.", answer:"whose", steps:[
      "Mezi „The man“ a „car“ chybí slovo, které spojí dvě věty: the man + his car was stolen.",
      "Přivlastnění ve vztažné větě vyjadřuje whose (jehož).",
      "Odpověď: whose."]},
    {text:"It was ____ a beautiful day that we went to the beach.", answer:"such", steps:[
      "Za mezerou je „a beautiful day … that“ – vazba tak…, že.",
      "Před „a + přídavné jméno + podstatné jméno“ stojí such, so by stálo jen před přídavným jménem (so beautiful).",
      "Odpověď: such."]}
  ],
  quiz:[
    oc("L-p2-1","rel","This is the house ____ I was born.",["where"],"where = kde – vztahuje se k místu (the house)."),
    oc("L-p2-2","cond","We'll go to the beach ____ it rains.",["unless"],"unless = pokud ne (pojedeme, pokud nebude pršet)."),
    oc("L-p2-3","tense","I've been waiting here ____ two o'clock.",["since"],"since + bod v čase (two o'clock)."),
    oc("L-p2-4","sotoo","She isn't old ____ to drive.",["enough"],"old enough to = dost stará na to, aby."),
    oc("L-p2-5","det","There isn't ____ milk left in the fridge.",["much","any"],"milk je nepočitatelné → much / any v záporu."),
    oc("L-p2-6","aux","How long does ____ take to get to the airport?",["it"],"How long does it take…? = Jak dlouho trvá…?")
  ]
},
3:{
  id:"p3", part:3, title:"Part 3 · Word formation",
  short:"Text s 8 mezerami; ze slova velkými písmeny vytvoříš správný slovní druh pomocí předpon a přípon.",
  marks:"8 otázek × 1 bod = 8 bodů", time:"cca 8 minut",
  tests:"Part 3 testuje tvoření slov: z jednoho základu (např. CARE) vytváříš podstatné jméno, přídavné jméno, sloveso nebo příslovce (careful, careless, carefully). Na B2 jde hlavně o běžné přípony (-tion, -ment, -ness, -ity, -ful, -less, -able, -ive, -ous, -ly, -en, -ise) a záporné předpony (un-, in-, im-, ir-, il-, dis-, mis-). Často jsou potřeba dvě změny najednou (un + believ + able + ly) a pravopis musí být přesný – jedno chybné písmeno = 0 bodů.",
  strategy:[
    "Přečti celý text a pochop, o čem je – smysl věty rozhoduje o záporu.",
    "U každé mezery urči slovní druh: člen + … + of → podstatné jméno; před podstatným jménem → přídavné jméno; u slovesa → příslovce.",
    "Zkontroluj, jestli nepotřebuješ množné číslo (many, several, some, sloveso are).",
    "Zvaž zápor: but, however, problem, sadly často naznačují un- / dis- / im-.",
    "Napiš slovo a zkontroluj pravopis (y → i, vypadlé -e, zdvojení souhlásky).",
    "Nikdy nenechávej mezeru prázdnou – i odhad může být správně."
  ],
  traps:[
    {t:"Špatný slovní druh", d:"Rozhoduje okolí mezery: the … of = podstatné jméno, a … person = přídavné jméno, speak … = příslovce.", ex:"the arrival of, a careful driver, drive carefully"},
    {t:"Chybějící zápor", d:"Smysl věty (However, but, problem) často vyžaduje zápornou předponu nebo -less.", ex:"The test was UNFAIR – some students had seen the questions."},
    {t:"Množné číslo", d:"many / several / some + počitatelné podstatné jméno → -s.", ex:"Many SCIENTISTS believe…"},
    {t:"-ed × -ing", d:"-ed popisuje pocit člověka, -ing vlastnost věci nebo situace.", ex:"I was bored because the film was boring."},
    {t:"Osoba × věc", d:"Pozor, jestli věta mluví o člověku, nebo o činnosti.", ex:"The winner of the competition got a prize."},
    {t:"y → i", d:"Před příponou se y po souhlásce mění na i.", ex:"happy → happiness, easy → easily, rely → reliable"},
    {t:"Koncové -e", d:"-e vypadá před příponou začínající samohláskou, před souhláskou zůstává.", ex:"create → creative, ale excite → excitement"},
    {t:"Zdvojení souhlásky", d:"Krátká přízvučná slabika: zdvojení před příponou se samohláskou.", ex:"win → winner, plan → planning, forget → unforgettable"},
    {t:"Nepravidelné tvary", d:"Některá slova mění kmen – nauč se je jako celek.", ex:"high → height, strong → strength, speak → speech, solve → solution"},
    {t:"Správná záporná předpona", d:"un- není univerzální: im- před p / m, il- před l, ir- před r, jinak in- nebo dis-.", ex:"impossible, illegal, irresponsible, dishonest"}
  ],
  worked:[
    {text:"There was a lot of ____ in the city centre before the final.", key:"EXCITE", answer:"excitement", steps:[
      "Před mezerou je „a lot of“ → potřebujeme podstatné jméno.",
      "excite + -ment = excitement (vzrušení). Koncové -e zůstává, protože -ment začíná souhláskou.",
      "Množné číslo není potřeba – excitement je nepočitatelné."]},
    {text:"It's ____ to cycle on the motorway.", key:"LEGAL", answer:"illegal", steps:[
      "It's + přídavné jméno → legal je už přídavné jméno.",
      "Smysl: na dálnici se na kole jezdit nesmí → potřebujeme zápor.",
      "Před l se používá předpona il-: illegal (dvě l)."]},
    {text:"The weather was ____ bad, so the match was cancelled.", key:"BELIEVE", answer:"unbelievably", steps:[
      "Před přídavným jménem bad stojí příslovce, které ho zesiluje.",
      "believe → believable → unbelievable (neuvěřitelný) → unbelievably.",
      "Tři změny najednou: un- + believ(e) + -able → -ably."]}
  ],
  quiz:[
    wf("L-p3-1","wfn","We were amazed by the ____ of the tower.","HIGH",["height"],"the … of → podstatné jméno: high → height (nepravidelná změna)."),
    wf("L-p3-2","wfneg","She was ____ with her exam results and decided to take them again.","APPOINT",["disappointed"],"Pocit člověka, smysl záporný: dis- + appoint + -ed."),
    wf("L-p3-3","wfneg","I'm sorry, I didn't mean to be ____.","POLITE",["impolite"],"Zápor před p: im- + polite (nezdvořilý)."),
    wf("L-p3-4","wfv","Please drive ____ – the roads are icy.","CARE",["carefully"],"Příslovce ke slovesu drive: care → careful → carefully."),
    wf("L-p3-5","wfv","The new timetable will ____ the school day by half an hour.","SHORT",["shorten"],"Po will → sloveso: short + -en = shorten (zkrátit)."),
    wf("L-p3-6","wfn","There are lots of ____ for young people in our town.","ACT",["activities"],"lots of + počitatelné podstatné jméno v množném čísle: act → activity → activities (y → ies).")
  ]
},
4:{
  id:"p4", part:4, title:"Part 4 · Key word transformation",
  short:"6 vět: druhou větu doplníš 2–5 slovy včetně zadaného klíčového slova tak, aby měla stejný význam jako první.",
  marks:"6 otázek × 2 body = 12 bodů", time:"cca 11 minut",
  tests:"Part 4 kombinuje gramatiku a slovní zásobu: trpný rod a have sth done, podmínky a wish, nepřímou řeč, modální slovesa, časy (for / since, never … before), srovnávání, so / such / too / enough, used to, frázová slovesa a vazby se -ing. Každá odpověď má dvě části, za každou je 1 bod. Klíčové slovo se nesmí změnit a odpověď musí mít 2 až 5 slov (stažené tvary se počítají jako dvě slova).",
  strategy:[
    "Porovnej první a druhou větu: co se změnilo na začátku a na konci druhé věty? To ti řekne, jakou strukturu potřebuješ.",
    "Podívej se na klíčové slovo: s jakou strukturou se pojí? (WISH → wish + minulý čas, USED → used to / be used to, SUCH → such a + adj + noun).",
    "Najdi v první větě dvě informace, které musíš přenést – obvykle to jsou dvě bodované části.",
    "Napiš odpověď a spočítej slova (2–5, stažené tvary = 2 slova). Klíčové slovo musí zůstat přesně ve stejném tvaru.",
    "Zkontroluj čas a osobu – musí sedět s tím, co je ve větě před mezerou a za ní.",
    "Nikdy nenechávej prázdné: i jedna správná část = 1 bod."
  ],
  traps:[
    {t:"Změna klíčového slova", d:"Klíčové slovo musí zůstat beze změny: USED nesmíš změnit na use, BEEN na be.", ex:"Klíč USED: I'm not USED to getting up early."},
    {t:"Víc než 5 slov", d:"Stažené tvary se počítají jako dvě slova: didn't = did not. Delší odpověď = 0 bodů.", ex:"had not been told = 4 slova"},
    {t:"Čas se neposune", d:"wish, nepřímá řeč a podmínky vyžadují posun času o krok do minulosti.", ex:"I regret going. → I wish I HADN'T gone."},
    {t:"Zapomenutá informace", d:"Každá informace z první věty musí zaznít i ve druhé – například never, again, before.", ex:"It's the first time I've flown. → I have NEVER flown before."},
    {t:"Trpný rod ve špatném čase", d:"Čas první věty musí zůstat: are building → is being built, have cleaned → have been cleaned.", ex:"A new hospital IS BEING built."},
    {t:"Slovosled v nepřímé otázce", d:"V nepřímé otázce není do / did a podmět stojí před slovesem.", ex:"She asked me where I lived. (ne where did I live)"},
    {t:"-ing × infinitiv po klíčovém slově", d:"suggest + -ing, deny + -ing, refuse to, offer to, manage to.", ex:"Anna suggested going to the cinema."},
    {t:"so × such, too × enough", d:"such a + adj + noun, so + adj; enough za přídavným jménem.", ex:"It was such a good book. I'm not old enough."},
    {t:"used to × be used to", d:"used to + infinitiv = dřív, be / get used to + -ing = být zvyklý / zvyknout si.", ex:"I used to swim. × I'm used to swimming."},
    {t:"Předložka navíc nebo chybějící", d:"look forward TO, in charge OF, apologise FOR, ale despite bez of.", ex:"I'm looking forward to seeing you."}
  ],
  worked:[
    {a:"Someone stole my phone at the concert.", key:"WAS", text:"My phone ____ at the concert.", answer:"was stolen", steps:[
      "Druhá věta začíná „My phone“ – telefon nic nedělal, něco se mu stalo → trpný rod.",
      "Čas první věty je minulý prostý (stole) → was + 3. tvar.",
      "Část 1: was · část 2: stolen. Celkem 2 slova."]},
    {a:"'Why don't we go to the beach?' said Kate.", key:"SUGGESTED", text:"Kate ____ to the beach.", answer:"suggested going", steps:[
      "Why don't we…? je návrh → uvozovací sloveso suggest.",
      "Po suggest následuje -ing (suggested going), nebo věta s that (suggested that we go).",
      "Nikdy ne „suggested us to go“. Část 1: suggested · část 2: going."]},
    {a:"I didn't bring my coat, and now I'm cold.", key:"WISH", text:"I ____ my coat.", answer:"wish I had brought", steps:[
      "Lituji něčeho v minulosti → wish + had + 3. tvar.",
      "Kladná věta s wish vyjadřuje opak skutečnosti: nepřinesl jsem → I wish I had brought.",
      "Část 1: wish I had · část 2: brought. Celkem 4 slova."]}
  ],
  quiz:[
    kt("L-p4-1","pas","They have opened a new cinema in town.","BEEN","A new cinema ____ in town.",["has been opened"],[["has been"],["opened"]],"Předpřítomný trpný rod: has been + 3. tvar."),
    kt("L-p4-2","rep","'I'll carry your bag,' Tom said to me.","OFFERED","Tom ____ my bag.",["offered to carry"],[["offered"],["to carry"]],"I'll do it (nabídka) = offer to + infinitiv."),
    kt("L-p4-3","cond","I don't have time, so I can't help you.","HAD","If I ____ help you.",["had time I would","had time I could"],[["had time"],["I would","I could"]],"Druhý kondicionál: If I had…, I would / could…"),
    kt("L-p4-4","sotoo","This coffee is too hot to drink.","ENOUGH","This coffee isn't ____ drink.",["cool enough to","cold enough to"],[["cool enough","cold enough"],["to"]],"too hot = not cool enough (enough za přídavným jménem)."),
    kt("L-p4-5","used","I often played tennis when I was younger.","USED","I ____ tennis when I was younger.",["used to play"],[["used to"],["play"]],"Zvyk v minulosti: used to + infinitiv."),
    kt("L-p4-6","tense","I moved to Prague five years ago.","LIVED","I ____ five years.",["have lived in Prague for","have lived here for"],[["have lived"],["in Prague for","here for"]],"Děj začal v minulosti a trvá: have + 3. tvar + for.")
  ]
}
};


/* ================================================================ THEMATIC LESSONS (B2 grammar + vocabulary) */
const topics = [
{id:"tense", title:"Slovesné časy", cats:["tense","aux"],
  intro:"V Part 2 a 4 se na B2 nejčastěji testuje předpřítomný čas (for / since, never … before, yet, just), minulý průběhový a předminulý čas a budoucí tvary. V Part 2 navíc často chybí pomocné sloveso (do, did, have, had) nebo it / there.",
  table:[
    ["present perfect + for / since","trvání až do teď","I've lived here for six years / since 2019."],
    ["present perfect continuous","děj trvá a stále probíhá","She's been waiting for an hour."],
    ["past simple × present perfect","ukončená minulost × zkušenost, výsledek","I went there in 2020. × I've been there twice."],
    ["past continuous + when","probíhající děj přerušený jiným","I was cooking when he called."],
    ["past perfect","děj před jiným minulým dějem","The film had started when we arrived."],
    ["It's the first time I've…","= I have never … before","It's the first time I've flown. = I've never flown before."],
    ["will × going to × present continuous","rozhodnutí × plán × domluva","I'll help you. I'm going to study. I'm meeting Tom at six."],
    ["so / neither + pomocné sloveso + podmět","také / také ne","I like it, and so does Ann. I don't, and neither does Ann."]
  ],
  tips:["since + bod v čase, for + délka doby.","Po when / as soon as / until o budoucnosti je přítomný čas: I'll call you when I arrive.","Do Part 2 nikdy nepiš stažený tvar – do mezery patří had, have, did…"],
  quiz:[
    oc("L-tense-1","tense","She has lived in London ____ she was a child.",["since"],"since + vedlejší věta s minulým časem = od té doby, co."),
    oc("L-tense-2","tense","____ you ever tried Thai food?",["have"],"Zkušenost za život: Have you ever…? (předpřítomný čas)."),
    oc("L-tense-3","tense","By the time I got to the station, the train ____ left.",["had"],"Předminulý čas: had + 3. tvar (vlak odjel dřív, než jsem přišel)."),
    mc("L-tense-4","tense","I ____ TV when the lights went out.",["watched","have watched","had watched","was watching"],3,"Probíhající děj přerušený krátkým dějem → minulý průběhový čas: was watching."),
    kt("L-tense-5","tense","I started working here in 2020.","HAVE","I ____ here since 2020.",["have worked","have been working"],[["have"],["worked","been working"]],"Děj začal v minulosti a trvá: have (been) + 3. tvar / -ing + since."),
    kt("L-tense-6","tense","I have never eaten sushi before.","FIRST","It's the ____ eaten sushi.",["first time I have"],[["first time"],["I have"]],"never … before = It's the first time I have…")
  ]},
{id:"cond", title:"Podmínky a wish", cats:["cond"],
  intro:"B2 First testuje všechny čtyři typy podmínek, náhrady za if (unless, as long as, in case) a přání nebo lítost pomocí wish / if only.",
  table:[
    ["0: if + přítomný, přítomný","obecná pravda","If you heat water, it boils."],
    ["1: if + přítomný, will","reálná budoucnost","If it rains, we'll stay at home."],
    ["2: if + minulý, would","nereálná přítomnost","If I had more money, I would travel."],
    ["3: if + had + 3. tvar, would have + 3. tvar","nereálná minulost","If I had studied, I would have passed."],
    ["unless / as long as / in case","pokud ne / pokud / pro případ","Take a coat in case it gets cold."],
    ["wish / if only + minulý čas","přání o přítomnosti","I wish I lived by the sea."],
    ["wish / if only + had + 3. tvar","lítost nad minulostí","I wish I hadn't said that."],
    ["wish + would / could","stížnost / schopnost","I wish you would listen. I wish I could sing."]
  ],
  tips:["Ve vedlejší větě s if nikdy nestojí will ani would.","If I were you = rada (na tvém místě).","unless = if … not, takže za unless je kladné sloveso."],
  quiz:[
    oc("L-cond-1","cond","If I ____ more time, I would learn to play the guitar.",["had"],"Druhý kondicionál: if + minulý čas, would + infinitiv."),
    oc("L-cond-2","cond","____ only I had listened to you!",["if"],"If only + had + 3. tvar = kdybych byl býval… (lítost)."),
    mc("L-cond-3","link","Take your phone ____ you get lost.",["unless","in case","so that","as long as"],1,"in case = pro případ, že. unless = pokud ne, so that = aby, as long as = pokud."),
    kt("L-cond-4","cond","I can't swim, which is a pity.","WISH","I ____ swim.",["wish I could"],[["wish"],["I could"]],"Přání o schopnosti: wish + could."),
    kt("L-cond-5","cond","You can borrow my bike if you bring it back by six.","LONG","You can borrow my bike ____ bring it back by six.",["as long as you"],[["as long"],["as you"]],"if (podmínka) = as long as."),
    kt("L-cond-6","cond","I didn't take an umbrella, so I got wet.","HAD","If I ____ an umbrella, I wouldn't have got wet.",["had taken","had brought"],[["had"],["taken","brought"]],"Třetí kondicionál: if + had + 3. tvar.")
  ]},
{id:"pas", title:"Trpný rod a have sth done", cats:["pas"],
  intro:"Trpný rod (be + 3. tvar) se v Part 4 objevuje téměř v každém testu. Musíš ho umět ve všech časech a znát i vazbu have / get sth done (nechat si něco udělat).",
  table:[
    ["přítomný prostý","is / are + 3. tvar","English is spoken here."],
    ["přítomný průběhový","is / are being + 3. tvar","The road is being repaired."],
    ["minulý prostý","was / were + 3. tvar","The castle was built in 1350."],
    ["předpřítomný","has / have been + 3. tvar","My bike has been stolen."],
    ["budoucí a modální","will be / can be / must be + 3. tvar","The results will be announced tomorrow."],
    ["have / get sth done","nechat si něco udělat","I had my hair cut yesterday."],
    ["It is said that… / X is said to…","říká se, že…","The house is said to be haunted."],
    ["be allowed to / be made to","trpný rod od let / make","I wasn't allowed to go out."]
  ],
  tips:["Původce děje uvádí by.","Frázová slovesa si v trpném rodě nechávají částici: was called off, was looked after.","let v trpném rodě nejde – použij be allowed to."],
  quiz:[
    oc("L-pas-1","pas","The new library was opened ____ the mayor.",["by"],"V trpném rodě uvádí by toho, kdo děj vykonal."),
    oc("L-pas-2","pas","My car is ____ repaired, so I'm walking today.",["being"],"Průběhový trpný rod: is being + 3. tvar."),
    mc("L-pas-3","pas","I'm going to have my eyes ____ next week.",["test","testing","to test","tested"],3,"have sth done: have + předmět + 3. tvar (tested)."),
    kt("L-pas-4","pas","Someone has broken the window.","BEEN","The window ____.",["has been broken"],[["has been"],["broken"]],"Předpřítomný trpný rod: has been + 3. tvar."),
    kt("L-pas-5","pas","A plumber is going to fix our shower tomorrow.","HAVE","We are going to ____ tomorrow.",["have our shower fixed","have our shower repaired"],[["have our shower"],["fixed","repaired"]],"have sth done = nechat si udělat."),
    kt("L-pas-6","pas","They didn't let us use our phones.","ALLOWED","We ____ our phones.",["were not allowed to use"],[["were not allowed"],["to use"]],"let sb do → be allowed to do (trpný rod).")
  ]},
{id:"rep", title:"Nepřímá řeč", cats:["rep"],
  intro:"V nepřímé řeči se posouvá čas a mění se zájmena i výrazy času a místa. Na B2 se hodně testují uvozovací slovesa s vazbou (suggest, offer, refuse, deny, remind, advise, apologise).",
  table:[
    ["am / is → was, will → would","posun času","'I'm tired.' → She said she was tired."],
    ["did / have done → had done","předminulý čas","'I lost it.' → He said he had lost it."],
    ["can → could, must → had to","modální slovesa","'I can swim.' → She said she could swim."],
    ["if / whether + slovosled oznamovací věty","otázka ano / ne","'Are you OK?' → He asked if I was OK."],
    ["tázací slovo bez do / did","otázka s tázacím slovem","'Where do you live?' → She asked where I lived."],
    ["tell sb (not) to","příkaz / zákaz","'Don't run!' → He told us not to run."],
    ["offer / promise / refuse / agree to","uvozovací sloveso + to","He refused to help me."],
    ["suggest / deny + -ing, apologise for + -ing","uvozovací sloveso + -ing","She suggested going out."]
  ],
  tips:["say sth (to sb) × tell sb sth.","tomorrow → the next day, yesterday → the day before, here → there.","„suggested us to go“ je chyba – správně suggested going / suggested that we go."],
  quiz:[
    oc("L-rep-1","rep","He asked me ____ I wanted to go to the cinema.",["if","whether"],"Nepřímá otázka ano / ne → if / whether."),
    oc("L-rep-2","rep","She ____ me that she was leaving.",["told"],"tell sb that = říct někomu, že (say by potřebovalo to me)."),
    mc("L-rep-3","rep","My friend ____ going to the beach.",["offered","suggested","told","asked"],1,"suggest + -ing = navrhnout. offer / ask + to, tell potřebuje osobu."),
    kt("L-rep-4","rep","'I'm sorry I broke your phone,' said Tim.","APOLOGISED","Tim ____ my phone.",["apologised for breaking"],[["apologised for"],["breaking"]],"apologise for + -ing = omluvit se za."),
    kt("L-rep-5","rep","'Don't forget to call your grandmother,' Mum said to me.","REMINDED","Mum ____ my grandmother.",["reminded me to call","reminded me to phone"],[["reminded me"],["to call","to phone"]],"remind sb to do = připomenout někomu."),
    kt("L-rep-6","rep","'What time does the film start?' I asked.","STARTED","I asked what time ____.",["the film started"],[["the film"],["started"]],"Nepřímá otázka: bez does, oznamovací slovosled, posun času (start → started).")
  ]},
{id:"modal", title:"Modální slovesa", cats:["modal"],
  intro:"Modální slovesa vyjadřují povinnost, zákaz, možnost a jistotu. V Part 4 se často testují tvary s have + 3. tvar (must have, can't have, should have).",
  table:[
    ["must / have to","muset","You must wear a seat belt. I have to work tomorrow."],
    ["mustn't","nesmět (zákaz)","You mustn't park here."],
    ["don't have to / don't need to / needn't","nemuset","You don't have to come."],
    ["can / could / be able to","umět, moct","I couldn't sleep. I'll be able to come."],
    ["must / can't","určitě / určitě ne (dedukce)","She must be tired. It can't be true."],
    ["may / might / could","možná","He might be at home."],
    ["must / can't / might have + 3. tvar","dedukce o minulosti","They must have left. He can't have seen us."],
    ["should(n't) have + 3. tvar","výčitka","You should have told me."]
  ],
  tips:["mustn't = nesmíš, don't have to = nemusíš – velký rozdíl.","Po modálním slovesu je infinitiv bez to (kromě have to, ought to, be able to).","needn't have done = udělal jsi to zbytečně."],
  quiz:[
    oc("L-modal-1","modal","You ____ to show your passport at the airport.",["have"],"have to = muset (pravidlo)."),
    oc("L-modal-2","modal","It ____ be Tom at the door – he's in Spain this week.",["cannot"],"cannot = určitě ne (logický závěr). Stažený tvar can't by byla dvě slova."),
    mc("L-modal-3","modal","You ____ bring any food – there's plenty here.",["don't have to","mustn't","can't","shouldn't"],0,"don't have to = nemusíš. mustn't = nesmíš (zákaz) – smysl nesedí."),
    kt("L-modal-4","modal","I'm sure Anna was at the party.","MUST","Anna ____ at the party.",["must have been"],[["must have"],["been"]],"Jistota o minulosti: must have + 3. tvar."),
    kt("L-modal-5","modal","It was a mistake to buy such cheap shoes.","SHOULD","I ____ such cheap shoes.",["should not have bought"],[["should not have"],["bought"]],"Výčitka: shouldn't have + 3. tvar."),
    kt("L-modal-6","modal","Maybe Peter is ill.","MIGHT","Peter ____ ill.",["might be"],[["might"],["be"]],"maybe = might (možná).")
  ]},
{id:"ger", title:"Gerundium, infinitiv a used to", cats:["ger","used"],
  intro:"Po některých slovesech následuje -ing, po jiných infinitiv s to nebo bez to. Na B2 se často testuje také used to × be used to × get used to.",
  table:[
    ["enjoy / avoid / mind / finish + -ing","po těchto slovesech -ing","I enjoy swimming."],
    ["want / decide / hope / manage + to","po těchto slovesech infinitiv","She managed to pass."],
    ["let / make + osoba + infinitiv bez to","nechat / přimět","They let me stay up late."],
    ["předložka + -ing","po předložce vždy -ing","I'm good at drawing. Thanks for helping."],
    ["stop / remember / try + to × -ing","změna významu","He stopped to buy water. × He stopped smoking."],
    ["used to + infinitiv","zvyk v minulosti","I used to live in Brno."],
    ["be / get used to + -ing","být zvyklý / zvykat si","I'm used to getting up early."],
    ["it's worth / no point in / spend time + -ing","ustálené vazby s -ing","It's worth visiting the castle."]
  ],
  tips:["look forward to + -ing: to je tu předložka.","didn't use to (bez -d) v záporu a otázce.","would rather + infinitiv bez to."],
  quiz:[
    oc("L-ger-1","used","I'm not used ____ driving on the left.",["to"],"be used to + -ing = být zvyklý na."),
    mc("L-ger-2","ger","Would you mind ____ the window?",["to open","open","opening","opened"],2,"mind + -ing: Would you mind opening…?"),
    mc("L-ger-3","ger","My parents let me ____ to the party.",["to go","go","going","went"],1,"let sb do = infinitiv bez to."),
    kt("L-ger-4","ger","It's a good idea to visit the museum.","WORTH","The museum ____.",["is worth visiting","is worth a visit"],[["is worth"],["visiting","a visit"]],"be worth + -ing / + podstatné jméno = stojí za to."),
    kt("L-ger-5","used","When I was a child, I lived in a village.","USED","I ____ in a village when I was a child.",["used to live"],[["used to"],["live"]],"used to + infinitiv = dřív (už ne)."),
    kt("L-ger-6","used","I find it hard to wake up early.","USED","I'm not ____ up early.",["used to waking","used to getting"],[["used to"],["waking","getting"]],"be used to + -ing = být zvyklý na.")
  ]},
{id:"rel", title:"Vztažné věty", cats:["rel"],
  intro:"Vztažná zájmena spojují dvě věty. V Part 2 patří k nejčastěji doplňovaným slovům, v Part 4 se objevují méně.",
  table:[
    ["who","osoba","The girl who sits next to me is Czech."],
    ["which","věc, zvíře; i celá předchozí věta","He was late, which annoyed me."],
    ["that","osoba nebo věc – jen bez čárky","The book that I'm reading is great."],
    ["whose","čí, jehož / jejíž","That's the man whose dog bit me."],
    ["where","kde (místo)","This is the café where we met."],
    ["when","kdy (čas)","I remember the day when I got my first bike."],
    ["what","to, co (bez podstatného jména před)","What I need is a holiday."],
    ["why","proč (the reason why)","That's the reason why I left."]
  ],
  tips:["Po čárce (vsuvka) nikdy that.","V mluvené řeči lze zájmeno v předmětu vynechat – v Part 2 ho ale napiš.","Po everything / all / nothing se používá that."],
  quiz:[
    oc("L-rel-1","rel","The man ____ lives upstairs is a pilot.",["who","that"],"Vztažné zájmeno pro osobu: who / that."),
    oc("L-rel-2","rel","My aunt, ____ house is near the sea, invited us for the summer.",["whose"],"whose = jejíž (dům patří tetě)."),
    oc("L-rel-3","rel","Prague is the city ____ I was born.",["where"],"where = kde (místo)."),
    oc("L-rel-4","rel","My phone, ____ I bought last year, has stopped working.",["which"],"Vsuvka po čárce o věci → which."),
    mc("L-rel-5","rel","____ I like most about my job is the people.",["Which","That","It","What"],3,"What = to, co (bez předchozího podstatného jména)."),
    kt("L-rel-6","rel","Tom is my best friend. His father is a doctor.","WHOSE","My best friend is Tom, ____ a doctor.",["whose father is"],[["whose father"],["is"]],"Přivlastnění ve vztažné větě: whose + podstatné jméno.")
  ]},
{id:"comp", title:"Srovnávání, so / such, too / enough", cats:["comp","sotoo"],
  intro:"Srovnání a vazby so / such / too / enough jsou typické pro Part 2 i Part 4. Pozor na slovosled a na člen.",
  table:[
    ["krátká přídavná jména","-er / the -est","tall – taller – the tallest"],
    ["dlouhá přídavná jména","more / the most","expensive – more expensive – the most expensive"],
    ["nepravidelná","good – better – best, bad – worse – worst","This is the worst film I've seen."],
    ["not as … as","méně … než","Tom isn't as tall as Ben."],
    ["the + 2. st., the + 2. st.","čím…, tím…","The sooner, the better."],
    ["so + adj / such (a) + adj + noun","tak / takový","It was so cold. It was such a cold day."],
    ["too + adj + to","příliš na to, aby","It's too hot to sleep."],
    ["adj + enough + to / enough + noun","dost","He isn't old enough. We don't have enough time."]
  ],
  tips:["much / far / a lot + 2. stupeň: much better.","such a + počitatelné, such + nepočitatelné (such bad weather).","enough stojí ZA přídavným jménem, ale PŘED podstatným jménem."],
  quiz:[
    oc("L-comp-1","comp","My sister is three years younger ____ me.",["than"],"Druhý stupeň + than."),
    oc("L-comp-2","sotoo","It was ____ a good film that I watched it twice.",["such"],"such a + adj + noun + that."),
    oc("L-comp-3","comp","The ____ you sleep, the more tired you feel.",["less"],"the less…, the more… = čím méně…, tím více…"),
    mc("L-comp-4","sotoo","He isn't ____ to reach the top shelf.",["tall enough","enough tall","too tall","so tall"],0,"enough stojí za přídavným jménem: tall enough to."),
    kt("L-comp-5","comp","This is the most delicious cake I've ever eaten.","NEVER","I've ____ delicious cake.",["never eaten such a","never eaten a more","never tasted such a"],[["never eaten","never tasted"],["such a","a more"]],"the most … ever = never … such a / a more."),
    kt("L-comp-6","sotoo","The bag was so heavy that I couldn't carry it.","TOO","The bag was ____ carry.",["too heavy for me to","too heavy to"],[["too heavy"],["for me to","to"]],"so … that I couldn't = too … (for me) to.")
  ]},
{id:"link", title:"Spojky a linkery", cats:["link"],
  intro:"Spojky vyjadřují kontrast, důvod, účel a podmínku. Rozhoduje, zda za nimi následuje celá věta, nebo jen podstatné jméno či -ing.",
  table:[
    ["although / even though + věta","přestože","Although it was late, we went out."],
    ["despite / in spite of + noun / -ing","navzdory","Despite the rain, we went out."],
    ["however","avšak (nová věta, čárka)","It was late. However, we went out."],
    ["because + věta / because of + noun","protože / kvůli","We stayed in because of the storm."],
    ["so that / to / in order to","aby (účel)","I left early so that I could catch the bus."],
    ["in case","pro případ, že","Take a map in case you get lost."],
    ["unless / as long as","pokud ne / pokud","I'll come as long as I finish work."],
    ["while / whereas","zatímco","I love tea, while my sister prefers coffee."]
  ],
  tips:["in spite OF, ale despite bez of.","even though = although, jen důraznější.","after all = koneckonců, at last = konečně, in the end = nakonec."],
  quiz:[
    oc("L-link-1","link","____ the traffic, we arrived on time.",["despite"],"Despite + podstatné jméno = navzdory."),
    oc("L-link-2","link","I'll lend you the money as ____ as you pay me back.",["long"],"as long as = pokud, za podmínky že."),
    mc("L-link-3","link","____ it was raining, we played football.",["Despite","However","Although","In spite of"],2,"Although + věta. Despite / In spite of potřebují podstatné jméno, However je příslovce."),
    mc("L-link-4","link","I'm taking a book ____ the journey is boring.",["unless","so that","in case","although"],2,"in case = pro případ, že."),
    kt("L-link-5","link","Although he was tired, he finished the race.","SPITE","In ____ tired, he finished the race.",["spite of being","spite of feeling"],[["spite of"],["being","feeling"]],"Although + věta = In spite of + -ing."),
    kt("L-link-6","link","I left early because I wanted to avoid the traffic.","SO","I left early ____ avoid the traffic.",["so as to","so that I could"],[["so"],["as to","that I could"]],"Účel: so as to + infinitiv / so that I could.")
  ]},
{id:"det", title:"Členy, zájmena a kvantifikátory", cats:["det"],
  intro:"Členy a kvantifikátory jsou v Part 2 velmi časté. Rozhoduje, zda je podstatné jméno počitatelné a zda mluvíme o něčem konkrétním.",
  table:[
    ["a / an","jedna věc poprvé, povolání","She's an engineer."],
    ["the","konkrétní, už známé, jedinečné; hudební nástroje","Play the guitar. The sun is hot."],
    ["bez členu","obecně, množné číslo / nepočitatelné","Dogs are friendly. Money isn't everything."],
    ["much / many","mnoho (nepočitatelné / počitatelné)","How much money? How many people?"],
    ["few / a few, little / a little","málo / pár","Few people came. I have a little time."],
    ["some / any","kladná věta a nabídka / zápor a otázka","Would you like some tea? I haven't got any."],
    ["both / either / neither","oba / kterýkoli ze dvou / žádný ze dvou","Neither of them came."],
    ["each / every / all","každý / všichni","Every student has a book."]
  ],
  tips:["information, advice, news, homework, furniture jsou nepočitatelné.","neither of + sloveso v jednotném čísle (Neither of them is…).","myself / yourself / ourselves = zvratná zájmena (enjoy yourself)."],
  quiz:[
    oc("L-det-1","det","I'd like ____ information about the course, please.",["some"],"some v prosbě / nabídce; information je nepočitatelné (bez a)."),
    oc("L-det-2","det","There were very ____ people on the beach.",["few"],"very few + počitatelné v množném čísle."),
    oc("L-det-3","det","She plays ____ piano really well.",["the"],"Hudební nástroje: play the piano."),
    mc("L-det-4","det","I've got two sisters, but ____ of them lives at home.",["neither","none","both","either"],0,"neither of = žádná ze dvou; sloveso lives v jednotném čísle."),
    mc("L-det-5","det","Can you give me some ____ about where to stay?",["advices","an advice","many advice","advice"],3,"advice je nepočitatelné: some advice (ne advices, an advice)."),
    kt("L-det-6","det","I've only got a little money left.","MUCH","I haven't got ____ left.",["much money","very much money"],[["much"],["money"]],"only a little = not much.")
  ]},
{id:"pv", title:"Frázová slovesa", cats:["pv"],
  intro:"Frázové sloveso = sloveso + částice s novým významem. V Part 1 vybíráš sloveso k částici, v Part 2 doplňuješ částici, v Part 4 nahrazuješ jedno slovo frázovým slovesem (cancel → call off).",
  table:[
    ["put off / call off","odložit / zrušit","The match was put off until Sunday."],
    ["give up / take up","přestat / začít","She took up yoga and gave up smoking."],
    ["look after / look for / look up","starat se / hledat / vyhledat","Can you look after my dog?"],
    ["run out of","dojít (zásoby)","We've run out of bread."],
    ["get on with / get over","vycházet s / překonat","I get on well with my boss."],
    ["find out / turn out","zjistit / ukázat se","It turned out to be easy."],
    ["come up with / come across","přijít s / narazit na","She came up with a great idea."],
    ["put up with / look forward to","snášet / těšit se na","I can't put up with the noise."]
  ],
  tips:["Uč se frázová slovesa ve větě, ne samostatně.","U některých může předmět stát mezi slovesem a částicí: put the meeting off.","Po look forward to následuje -ing."],
  quiz:[
    oc("L-pv-1","pv","We'll have to put ____ the trip until next week.",["off"],"put off = odložit."),
    oc("L-pv-2","pv","I can't find my keys – can you help me look ____ them?",["for"],"look for = hledat."),
    mc("L-pv-3","pv","The concert was ____ off because of the storm, and our money was returned.",["put","called","set","given"],1,"call off = zrušit (peníze vráceny). put off = odložit, set off = vyrazit, give off = vydávat (pach)."),
    mc("L-pv-4","pv","I ____ across an old letter in the attic.",["went","got","took","came"],3,"come across = narazit na. go / get / take across mají jiný význam."),
    kt("L-pv-5","pv","I'm excited about the holidays.","FORWARD","I'm looking ____ the holidays.",["forward to"],[["forward"],["to"]],"be excited about = look forward to."),
    kt("L-pv-6","pv","We have no more milk.","OUT","We have ____ milk.",["run out of"],[["run out"],["of"]],"no more = run out of.")
  ]},
{id:"col", title:"Kolokace a ustálená spojení", cats:["col","fix","mean"],
  intro:"Kolokace jsou slova, která spolu přirozeně „chodí“ (make a mistake, heavy rain). V Part 1 se testují nejvíc. Pomůže učit se celé fráze a znát rozdíly mezi podobnými slovy.",
  table:[
    ["make","výsledek, výrobek, rozhodnutí","make a mistake / a decision / progress / friends"],
    ["do","činnost, práce, povinnost","do homework / your best / sb a favour"],
    ["take","převzít, vzít si","take a photo / a break / part in / care of"],
    ["have","zažít, jíst, mít","have fun / a shower / a good time"],
    ["přídavné jméno + podstatné jméno","pevné dvojice","heavy rain, strong coffee, high price"],
    ["fráze s předložkou","ustálené spojení","by mistake, on purpose, in the end, at first"],
    ["podobná slova","jiný význam","lend × borrow, remind × remember, rise × raise"],
    ["sloveso + vazba","pevná předložka","apologise for, depend on, succeed in"]
  ],
  tips:["„make a photo“ je chyba – správně take a photo.","in the end = nakonec × at the end of = na konci něčeho.","Zapisuj si celé fráze i s příkladem."],
  quiz:[
    mc("L-col-1","col","I'm sorry, I ____ a mistake.",["did","made","had","took"],1,"make a mistake = udělat chybu."),
    mc("L-col-2","mean","Could you ____ me your dictionary?",["lend","borrow","rent","owe"],0,"lend sb sth = půjčit někomu. borrow = půjčit si od někoho."),
    mc("L-col-3","col","There was ____ rain all night.",["strong","big","heavy","hard"],2,"heavy rain = silný déšť."),
    mc("L-col-4","col","Let's ____ a photo of the view.",["make","take","do","catch"],1,"take a photo = vyfotit."),
    oc("L-col-5","fix","I'm sorry, I sent you the email ____ mistake.",["by"],"by mistake = omylem."),
    oc("L-col-6","fix","At ____ I didn't like the city, but now I love it.",["first"],"At first = zpočátku.")
  ]},
{id:"prep", title:"Předložkové vazby", cats:["prep"],
  intro:"Mnoho sloves, přídavných a podstatných jmen má pevnou předložku. Česká předložka často nepomůže – uč se celé vazby.",
  table:[
    ["přídavné jméno + of","afraid, proud, fond, aware, tired, full","I'm proud of you."],
    ["přídavné jméno + at / in","good at, bad at, interested in","She's good at maths."],
    ["přídavné jméno + about / with","worried, excited about; pleased, angry with","I'm worried about the exam."],
    ["sloveso + on","depend, rely, insist, concentrate","It depends on the weather."],
    ["sloveso + for","apologise, wait, pay, look","I apologised for being late."],
    ["sloveso + of / from","accuse sb of, consist of, prevent sb from","He accused me of lying."],
    ["sloveso + to","belong, listen, look forward, be married","This bag belongs to Jo."],
    ["předložka + -ing","po předložce vždy -ing","Thanks for helping. Before leaving…"]
  ],
  tips:["married TO (ne with), different FROM, arrive AT / IN.","Po předložce nikdy infinitiv: interested in learning.","look forward TO + -ing."],
  quiz:[
    oc("L-prep-1","prep","I'm really interested ____ learning Japanese.",["in"],"interested in + -ing."),
    oc("L-prep-2","prep","My brother is afraid ____ dogs.",["of"],"afraid of = bát se."),
    oc("L-prep-3","prep","Everything depends ____ the weather.",["on"],"depend on = záviset na."),
    mc("L-prep-4","prep","She's very ____ at languages.",["keen","interested","fond","good"],3,"good AT. keen ON, interested IN, fond OF."),
    mc("L-prep-5","prep","Who does this phone ____ to?",["belong","own","have","possess"],0,"belong to = patřit. own / have / possess = vlastnit (bez to)."),
    kt("L-prep-6","prep","I'm sorry for breaking your glasses.","APOLOGISE","I ____ your glasses.",["apologise for breaking"],[["apologise for"],["breaking"]],"be sorry for = apologise for + -ing.")
  ]},
{id:"wf", title:"Pravidla tvoření slov", cats:["wfn","wfa","wfv","wfneg"],
  intro:"V Part 3 nejčastěji vytváříš podstatné jméno, přídavné jméno nebo příslovce z daného základu. Nejdřív urči slovní druh, pak zvaž zápor a množné číslo a nakonec pečlivě napiš pravopis.",
  table:[
    ["podstatné jméno – děj","-tion / -sion / -ment / -al","decide → decision, arrive → arrival"],
    ["podstatné jméno – vlastnost","-ness / -ity / -ance / -ence","kind → kindness, patient → patience"],
    ["podstatné jméno – osoba","-er / -or / -ist / -ant","win → winner, science → scientist"],
    ["přídavné jméno","-ful / -less / -able / -ive / -ous / -al","care → careful, danger → dangerous"],
    ["příslovce","-ly (y → i, -le → -ly)","easy → easily, incredible → incredibly"],
    ["sloveso","-en / -ise / en-","short → shorten, courage → encourage"],
    ["záporné předpony","un- / in- / im- / il- / ir- / dis- / mis-","unfair, impossible, illegal, dishonest"],
    ["-ed × -ing","pocit × vlastnost","I was bored. The film was boring."]
  ],
  tips:["člen + … + of = podstatné jméno.","Před podstatným jménem stojí přídavné jméno, u slovesa příslovce.","Kontrast (but, however) často znamená, že potřebuješ zápor."],
  quiz:[
    wf("L-wf-1","wfn","The ____ of the train was delayed by an hour.","ARRIVE",["arrival"],"the … of → podstatné jméno: arrive → arrival; -e odpadá."),
    wf("L-wf-2","wfneg","It's ____ to swim here – the water is too deep.","SAFE",["unsafe"],"Smysl (too deep) žádá zápor: un- + safe."),
    wf("L-wf-3","wfv","She sings ____.","BEAUTY",["beautifully"],"Příslovce ke slovesu sings: beauty → beautiful → beautifully."),
    wf("L-wf-4","wfa","She's a very ____ student – she wants to be a doctor.","AMBITION",["ambitious"],"a very … student → přídavné jméno: ambition → ambitious (ctižádostivý)."),
    wf("L-wf-5","wfn","All the ____ in the race were given a free T-shirt.","PARTICIPATE",["participants"],"All the … → osoby v množném čísle: participate → participants."),
    wf("L-wf-6","wfv","We need to ____ the kitchen – it's far too small.","LARGE",["enlarge"],"Po need to → sloveso: en- + large = enlarge (zvětšit).")
  ]}
];

/* ================================================================ CATEGORY RULES (feedback) */
const catRules = {
  pv:{rule:"Frázové sloveso = sloveso + částice s novým významem (put off, give up, run out of). V Part 1 bývají všechny možnosti slovesa – rozhoduje, které s danou částicí dává smysl.", ex:["We had to call off the picnic because of the rain.","I've run out of ideas for her birthday present."]},
  col:{rule:"Kolokace = slova, která spolu přirozeně chodí (make a mistake, do homework, take a photo, heavy rain). Učí se jako celek, z češtiny se neodvodí.", ex:["Could you do me a favour?","She made a lot of progress this year."]},
  fix:{rule:"Ustálená spojení mají pevný tvar, slova v nich nelze nahradit synonymem (by mistake, on purpose, in the end, at first, on foot).", ex:["I took your pen by mistake.","In the end, we decided to stay at home."]},
  prep:{rule:"Závislé předložky se učí s celým slovem: depend on, good at, interested in, afraid of, apologise for, accuse sb of. Po předložce následuje -ing.", ex:["She's really good at solving problems.","He apologised for being late."]},
  mean:{rule:"Podobná slova mají jiný význam nebo jinou vazbu: lend × borrow, remind × remember, rise × raise, say × tell, journey × travel.", ex:["Can you lend me your bike?","Remind me to call Grandma tonight."]},
  link:{rule:"although / even though + věta; despite / in spite of + podstatné jméno nebo -ing; however na začátku nové věty; in case = pro případ; unless = pokud ne.", ex:["Despite the rain, the match went ahead.","Take a jacket in case it gets cold."]},
  det:{rule:"Členy a kvantifikátory: a / an / the, much (nepočitatelné) × many (počitatelné), few / little = málo, a few / a little = pár, neither of = žádný ze dvou.", ex:["There were very few people at the party.","Neither of my brothers likes football."]},
  rel:{rule:"who (osoba), which (věc), whose (čí), where (kde), when (kdy), what (to, co). Po čárce nikdy that.", ex:["The woman who lives next door is a nurse.","My phone, which I bought last year, is broken."]},
  aux:{rule:"Pomocná slovesa (do, did, have, had) a it / there často chybí v Part 2: It takes…, There is…, so does she, neither do I.", ex:["It takes an hour to get there.","I don't eat meat, and neither does my sister."]},
  tense:{rule:"Předpřítomný čas + for (doba) / since (bod); minulý průběhový + when; předminulý (had + 3. tvar) pro děj před jiným minulým dějem.", ex:["I've known her since primary school.","When I arrived, the film had already started."]},
  modal:{rule:"must = musím / určitě, mustn't = nesmím, don't have to = nemusím, can't = určitě ne, might = možná; o minulosti modální sloveso + have + 3. tvar.", ex:["You don't have to come if you're busy.","She must have forgotten about the meeting."]},
  pas:{rule:"Trpný rod: be + 3. tvar ve správném čase (is being built, has been stolen, will be met). have / get sth done = nechat si udělat.", ex:["The new bridge is being built.","I had my bike repaired last week."]},
  cond:{rule:"if + minulý čas → would (nereálná přítomnost); if + had + 3. tvar → would have + 3. tvar (minulost). wish + minulý čas / had + 3. tvar. unless = if … not.", ex:["If I had more time, I would learn Spanish.","I wish I hadn't eaten so much."]},
  rep:{rule:"Nepřímá řeč: posun času (will → would, did → had done), otázky bez do / did s oznamovacím slovosledem, uvozovací slovesa s vazbou (suggest -ing, refuse to, accuse sb of).", ex:["She asked me where I lived.","He refused to lend me his car."]},
  ger:{rule:"-ing po enjoy, avoid, mind, suggest, předložkách; to + infinitiv po want, decide, manage, refuse; bez to po let, make, would rather.", ex:["I don't mind waiting.","My parents let me stay up late."]},
  used:{rule:"used to + infinitiv = dřív (už ne); be used to + -ing = být zvyklý; get used to + -ing = zvyknout si. V záporu didn't use to.", ex:["I used to live in Ostrava.","I'm still getting used to driving on the left."]},
  comp:{rule:"Druhý stupeň + than, not as … as, the most / the -est, the + 2. st., the + 2. st. Zesílení: much / far + 2. stupeň.", ex:["This test was much easier than the last one.","The more you read, the more you learn."]},
  sotoo:{rule:"so + přídavné jméno, such (a) + přídavné jméno + podstatné jméno; too + adj + to; adj + enough + to.", ex:["It was such a hot day that we stayed inside.","He isn't old enough to drive."]},
  wfn:{rule:"Podstatné jméno stojí po členu, přivlastňovacím zájmenu nebo před of: -tion, -ment, -ness, -ity, -ance / -ence, osoby -er / -ist / -ant. Zkontroluj množné číslo.", ex:["The arrival of the train was delayed.","Many scientists agree with this theory."]},
  wfa:{rule:"Přídavné jméno stojí před podstatným jménem nebo po be / feel / seem: -ful, -less, -able, -ive, -ous, -al, -ic; -ed (pocit) × -ing (vlastnost).", ex:["The staff were very helpful.","I was bored because the lesson was boring."]},
  wfv:{rule:"Příslovce (-ly) popisuje sloveso nebo přídavné jméno; slovesa se tvoří příponou -en / -ise / -ify nebo předponou en-.", ex:["She speaks English fluently.","They plan to widen the road."]},
  wfneg:{rule:"Záporné předpony: un- (nejčastější), im- před p / m, il- před l, ir- před r, in-, dis-, mis-; nebo přípona -less. Kontext rozhoduje, zda zápor potřebuješ.", ex:["It's illegal to park here.","The ending of the book was completely unexpected."]}
};

/* which topic lesson covers which category (for "recommended next step" + "Lekce k tématu") */
const catTopic = {tense:"tense", aux:"tense", cond:"cond", pas:"pas", rep:"rep", modal:"modal", ger:"ger", used:"ger", rel:"rel", comp:"comp", sotoo:"comp", link:"link", det:"det", pv:"pv", col:"col", fix:"col", mean:"col", prep:"prep", wfn:"wf", wfa:"wf", wfv:"wf", wfneg:"wf"};

return {parts, topics, catRules, catTopic};
})();
