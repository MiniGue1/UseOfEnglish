/* DATA.uoeLessons – výukové lekce k Use of English (Reading & Use of English Part 1–4).
   Pure data, original content. Výklad česky, příklady anglicky (C1).
   parts[1..4]: {id, part, title, short, marks, time, tests, strategy[], traps[{t,d,ex}] x10, worked[{…, steps[], answer}], quiz[6 items]}
   topics[]:    {id, title, cats[], intro, table[[tvar, význam/použití, příklad]], tips[], quiz[6 items]}
   catRules:    {<cat>: {rule, ex[]}}  – krátké pravidlo + vzorové věty pro zpětnou vazbu u chyb
   Quiz items have the same shape as DATA.uoe.bank items (mc / oc / wf / kt), ids start with "L-". */
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
  short:"Text s 8 mezerami, ke každé 4 slova – vybíráš to, které tvoří správnou kolokaci, frázi nebo vazbu.",
  marks:"8 otázek × 1 bod = 8 bodů", time:"cca 10 minut",
  tests:"Part 1 testuje hlavně slovní zásobu v kontextu: kolokace (strike a balance), frázová slovesa (come up with), ustálená spojení (on the verge of), jemné rozdíly mezi synonymy (claim × declare) a gramatiku, která na slovo navazuje (předložka, -ing nebo infinitiv, předmět). Všechny čtyři možnosti mají obvykle podobný význam – rozhoduje, které slovo se s okolními slovy skutečně pojí.",
  strategy:[
    "Přečti nejdřív celý text (30–40 s), ať víš, o čem je a jaký má tón.",
    "U každé mezery si přečti celou větu, ne jen slovo před mezerou. Hledej slova ZA mezerou – předložku, „to“, předmět nebo podstatné jméno, se kterým se slovo pojí.",
    "Zkus si mezeru doplnit sám, než se podíváš na možnosti. Pokud tvé slovo mezi možnostmi je, je to silný signál.",
    "Vyřaď možnosti, které nesedí gramaticky (špatná vazba, špatný slovní druh, chybí předložka).",
    "Ze zbylých vyber tu, která tvoří ustálenou kolokaci. Ptej se: „Řekl by to tak rodilý mluvčí?“",
    "Na konci si přečti celý text s doplněnými slovy. Kontroluj hlavně zbylé dvojice synonym."
  ],
  traps:[
    {t:"Synonyma s jinou vazbou", d:"Slova se stejným významem mají často jinou předložku nebo konstrukci. Rozhoduje slovo za mezerou.", ex:"She insisted ON going. × She demanded TO go. × She urged us TO go."},
    {t:"Make × do × take × have", d:"Obecná slovesa se pojí s pevnými podstatnými jmény a nedají se odvodit logicky – musíš je znát.", ex:"make an effort, do research, take a decision (BrE), have a go"},
    {t:"Frázové sloveso s jinou částicí", d:"Všechny čtyři možnosti bývají slovesa, ale jen jedno tvoří s danou částicí ten správný význam.", ex:"The talks broke down. (ne fell / went / came down)"},
    {t:"Příslovce intenzity", d:"Intenzifikátory se pojí s konkrétními přídavnými jmény: bitterly disappointed, highly unlikely, deeply concerned, utterly exhausted.", ex:"We were bitterly disappointed with the result."},
    {t:"Say × tell × speak × talk", d:"Tell + osoba / a story / the truth / a lie; say + something; speak + jazyk; talk + about.", ex:"He told us the truth. She said nothing."},
    {t:"Spojka × předložka", d:"Although / even though + věta; despite / in spite of + podstatné jméno nebo -ing.", ex:"Despite the rain, … × Although it was raining, …"},
    {t:"Falešní přátelé z češtiny", d:"Česká logika často vede ke špatnému slovu: eventually = nakonec (ne eventuálně), actually = vlastně (ne aktuálně).", ex:"Eventually, they reached an agreement."},
    {t:"Lexikální „sety“ podobných slov", d:"risk / danger / threat / hazard; job / work / career / occupation – každé se pojí s jinými slovy.", ex:"pose a threat, run a risk, a health hazard"},
    {t:"Gramatika po slově", d:"Některá slovesa chtějí -ing, jiná infinitiv nebo předmět: avoid doing, refuse to do, prevent sb from doing.", ex:"They prevented us from entering. (ne stopped us to enter)"},
    {t:"Ustálená spojení s předložkou", d:"Fráze typu on the verge of, in the wake of, at the expense of, by virtue of – jedno slovo je pevné a nedá se nahradit synonymem.", ex:"The species is on the verge of extinction."}
  ],
  worked:[
    {text:"Rail operators have been quick to ____ advantage of this shift in attitudes.", opts:["take","make","get","have"], answer:"take", steps:[
      "Za mezerou je „advantage of“ – to je signál pevné kolokace.",
      "Kolokace je take advantage of sth = využít něčeho. „Make advantage“ ani „get advantage of“ v angličtině neexistuje.",
      "Kontrola významu: provozovatelé rychle využili změny postojů – dává smysl."]},
    {text:"Despite his injury, he ____ on playing until the final whistle.", opts:["insisted","persisted","kept","continued"], answer:"insisted", steps:[
      "Za mezerou je předložka „on“ + -ing. Rozhoduje, které sloveso se s „on“ pojí.",
      "insist on doing = trvat na tom, že… ✓. Persist se pojí s „in“ (persist in doing).",
      "Kept a continued by šly BEZ „on“ (kept playing, continued playing) – s „on“ už vazba nesedí.",
      "Odpověď: insisted. Ponaučení: synonyma se často liší jen předložkou."]},
    {text:"The report ____ attention to the growing gap between urban and rural schools.", opts:["draws","pulls","brings","takes"], answer:"draws", steps:[
      "Podstatné jméno attention + předložka to.",
      "Ustálená kolokace: draw attention to sth = upozornit na něco. Bring to attention existuje jen ve tvaru bring sth to sb's attention – tady slovosled nesedí.",
      "Pulls / takes attention se neříká. Odpověď: draws."]}
  ],
  quiz:[
    mc("L-p1-1","col","The new policy has come in for a great deal of ____ from teachers' unions.",["criticism","blame","disapproval","complaint"],0,"come in for criticism = sklidit kritiku. Blame se „nesklízí“ (take the blame), complaint je počitatelné."),
    mc("L-p1-2","fix","It never ____ my mind that she might be lying.",["crossed","passed","struck","occurred"],0,"cross sb's mind = napadnout. Struck me / occurred to me se pojí s osobou, ne s „my mind“."),
    mc("L-p1-3","col","The minister refused to ____ responsibility for the failure.",["accept","admit","confess","own"],0,"accept / take / bear responsibility. Admit a confess se pojí s chybou nebo vinou (admit a mistake)."),
    mc("L-p1-4","pv","We'll have to ____ do with what we've got until the delivery arrives.",["make","get","put","take"],0,"make do with sth = vystačit si s něčím. Ostatní slovesa s „do with“ tento význam nemají."),
    mc("L-p1-5","col","Fans were ____ disappointed when the concert was cancelled at the last minute.",["bitterly","heavily","strongly","sharply"],0,"bitterly disappointed je pevná kolokace (hořce zklamaní). Heavily a strongly se s disappointed nepojí."),
    mc("L-p1-6","link","____ the fact that most staff opposed it, the decision was approved.",["Despite","Although","However","Even"],0,"despite + podstatné jméno (the fact that…). Although by potřebovalo celou větu bez „the fact“.")
  ]
},
2:{
  id:"p2", part:2, title:"Part 2 · Open cloze",
  short:"Text s 8 mezerami bez nabídky – doplňuješ jedno slovo, většinou gramatické (předložka, spojka, zájmeno, pomocné sloveso).",
  marks:"8 otázek × 1 bod = 8 bodů", time:"cca 10 minut",
  tests:"Part 2 testuje gramatiku a „malá“ slova: předložky, členy, zájmena (vztažná i neurčitá), spojky, pomocná slovesa, srovnání, kvantifikátory a části ustálených frází (as far as, in spite of, by no means). Velmi častá je inverze, vytýkací věty (It was not until…) a vazby typu no matter how. Doplňuje se právě jedno slovo a musí být správně napsané.",
  strategy:[
    "Přečti celý text, ať chápeš logiku – hlavně kontrast, příčinu a následek.",
    "U každé mezery urči, jaký slovní druh chybí: předložka? spojka? pomocné sloveso? zájmeno? člen?",
    "Podívej se na slova PŘED i ZA mezerou. Hledej neúplné fráze (as … as, not only … but, so … that, such … that).",
    "Zkontroluj slovosled: pokud za mezerou následuje pomocné sloveso před podmětem, je to inverze – před ní bude záporný výraz (Never, Rarely, Not until, Only when).",
    "Napiš jen JEDNO slovo. Stažené tvary (don't, it's) se počítají jako dvě slova a nejsou přípustné.",
    "Na konci přečti celé věty s doplněnými slovy a zkontroluj pravopis."
  ],
  traps:[
    {t:"Inverze po záporném výrazu", d:"Never / Rarely / Not only / Hardly na začátku věty → pomocné sloveso před podmět. V mezeře často chybí právě pomocné sloveso (does, had, have).", ex:"Not only DOES it save time, but it also cuts costs."},
    {t:"No sooner … than × hardly … when", d:"Dvojice se nedají kombinovat: no sooner vždy s than, hardly / scarcely s when (nebo before).", ex:"No sooner had we arrived THAN it began to rain."},
    {t:"Vztažná zájmena", d:"whose = jehož; which za čárkou (ne that); whom po předložce; where = ve kterém.", ex:"The author, WHOSE latest novel won a prize, …"},
    {t:"Tvrzení × kontrast", d:"Pozor na spojky protikladu: although, whereas, while, even though, however. Rozhoduje, zda je za mezerou věta, nebo podstatné jméno.", ex:"Much AS I admire her, I disagree."},
    {t:"Pevné fráze s předložkou", d:"Části frází nelze odvodit: in terms of, on behalf of, by means of, with regard to, at the expense of.", ex:"She spoke ON behalf of the whole team."},
    {t:"Vytýkací věty", d:"It was not UNTIL … that, What I need IS …, All I want IS …", ex:"It was not UNTIL midnight that they arrived."},
    {t:"Srovnání", d:"the + 2. stupeň … the + 2. stupeň; by far + 3. stupeň; as … as; much / far + 2. stupeň.", ex:"The sooner we leave, THE better."},
    {t:"Kvantifikátory", d:"few × a few, little × a little, each × every, either × neither, none of.", ex:"NEITHER of the candidates was suitable."},
    {t:"Neurčitá zájmena a „ever“", d:"whatever, however, whoever, wherever – „ať už“. No matter how / what.", ex:"However hard he tried, he couldn't open it."},
    {t:"Stažené tvary a víc slov", d:"Do mezery patří přesně jedno slovo. Can't, it's, won't jsou dvě slova a odpověď je chybná.", ex:"Správně: cannot / not – nikdy can't."}
  ],
  worked:[
    {text:"Rarely ____ such a talented young player emerged from a small club.", answer:"has", steps:[
      "Rarely na začátku věty = záporný výraz → očekávám inverzi.",
      "Za mezerou je podmět (such a talented young player) a 3. tvar emerged → chybí pomocné sloveso předpřítomného času.",
      "Podmět je jednotné číslo → has. Odpověď: has."]},
    {text:"It was not ____ she moved abroad that she realised how much she missed her family.", answer:"until", steps:[
      "Struktura It was not … that = vytýkací věta.",
      "Význam: teprve když se odstěhovala → It was not until …",
      "Odpověď: until (till je také přijatelné)."]},
    {text:"The more you practise, ____ more confident you will become.", answer:"the", steps:[
      "Začátek věty The more … signalizuje párovou konstrukci the + 2. stupeň, the + 2. stupeň.",
      "Druhá polovina proto musí začínat the: the more confident.",
      "Odpověď: the."]}
  ],
  quiz:[
    oc("L-p2-1","link","Much ____ I admire her work, I can't agree with her on this point.",["as"],"Much as = i když, přestože (velmi). Typická fráze pro Part 2."),
    oc("L-p2-2","cleft","It was not ____ the late 1990s that the internet became widely used.",["until","till"],"It was not until … that = teprve v … Vytýkací věta."),
    oc("L-p2-3","gram","The museum, ____ collection includes over two million objects, is free to visit.",["whose"],"whose = jehož / jejíž; sbírka patří muzeu."),
    oc("L-p2-4","comp","She is by ____ the most talented player in the team.",["far"],"by far + 3. stupeň = zdaleka nej…"),
    oc("L-p2-5","inv","No sooner ____ the meeting begun than the fire alarm went off.",["had"],"No sooner + had + podmět + 3. tvar … than."),
    oc("L-p2-6","prep","There is no point ____ complaining now – the decision has been made.",["in"],"There is no point in + -ing = nemá smysl.")
  ]
},
3:{
  id:"p3", part:3, title:"Part 3 · Word formation",
  short:"Text s 8 mezerami a slovem velkými písmeny – tvoříš z něj správný slovní druh pomocí předpon a přípon.",
  marks:"8 otázek × 1 bod = 8 bodů", time:"cca 10 minut",
  tests:"Part 3 testuje tvoření slov: změnu slovního druhu (decide → decision), zápornou předponu (un-, in-, im-, ir-, il-, dis-, mis-), množné číslo, příslovce (-ly), slovesa (-en, -ise, en-) a často dvě změny najednou (respond → irresponsibility). Pravopis musí být přesný – jedno písmeno navíc znamená ztrátu bodu.",
  strategy:[
    "Přečti celý text, ať chápeš význam – hlavně kvůli záporu (je to pozitivní, nebo negativní?).",
    "Urči slovní druh, který chybí: po členu / přídavném jménu → podstatné jméno; před podstatným jménem → přídavné jméno; u slovesa → příslovce.",
    "Rozhodni, zda je potřeba zápor (kontext: but, however, unfortunately, surprisingly).",
    "U podstatného jména zkontroluj číslo: je před ním a / one / many / several? Je sloveso za ním v jednotném čísle?",
    "Vytvoř slovo a zkontroluj pravopis: zdvojení souhlásky, vypadnutí -e, změna y → i.",
    "Pozor na dvě změny najednou (předpona + přípona) – v každém testu bývají 1–2."
  ],
  traps:[
    {t:"Chybí zápor", d:"Kontext je negativní, ale doplníš pozitivní tvar. Hledej signály: but, despite, surprisingly, criticised.", ex:"The results were disappointing and largely UNPREDICTABLE."},
    {t:"Špatná záporná předpona", d:"im- před b/m/p, il- před l, ir- před r, jinak un- / in- / dis- – a často to musíš prostě znát.", ex:"impatient, illegal, irrelevant, inefficient, dishonest"},
    {t:"Množné číslo", d:"Podstatné jméno často potřebuje -s: několik, mnoho, různé, sloveso v množném čísle.", ex:"There were several DISAGREEMENTS among the members."},
    {t:"Osoba × věc", d:"-er / -or / -ist / -ant pro osobu, -tion / -ment / -ance pro děj nebo věc. Rozhoduje kontext.", ex:"competitor × competition; applicant × application"},
    {t:"Přídavné jméno -ed × -ing", d:"-ed = jak se člověk cítí, -ing = jaká je věc.", ex:"The lecture was BORING, so we felt BORED."},
    {t:"Pravopis: vypadnutí -e a zdvojení", d:"believe → believable, argue → argument (bez e!), begin → beginning, true → truly.", ex:"argument, truly, beginning, noticeable (e zůstává)"},
    {t:"Nepravidelné změny kmene", d:"Některá slova mění kmen: succeed → success, deep → depth, long → length, choose → choice, high → height.", ex:"The DEPTH of the lake surprised everyone."},
    {t:"Dvě změny najednou", d:"Předpona i přípona, nebo dvě přípony: comfort → uncomfortably, rely → unreliability.", ex:"She smiled UNCOMFORTABLY."},
    {t:"Slovesa z přídavných jmen", d:"-en (widen, strengthen), en- (enable, enlarge), -ise / -ify (modernise, simplify).", ex:"They plan to STRENGTHEN the bridge."},
    {t:"Příslovce s -ally", d:"Přídavná jména na -ic tvoří příslovce s -ally: dramatic → dramatically, basic → basically (výjimka publicly).", ex:"Prices rose DRAMATICALLY."}
  ],
  worked:[
    {text:"Despite years of research, the cause of the disease remains largely ____.", key:"KNOW", answer:"unknown", steps:[
      "Za „remains largely“ chybí přídavné jméno (remain + přídavné jméno).",
      "„Despite years of research“ → výsledek je negativní: příčina zůstává NEZNÁMÁ.",
      "know → known (přídavné jméno) → un + known. Odpověď: unknown."]},
    {text:"There were a number of ____ between the two accounts of the accident.", key:"CONSISTENT", answer:"inconsistencies", steps:[
      "„a number of“ → potřebujeme podstatné jméno v množném čísle.",
      "Smysl: dvě verze nehody se neshodovaly → záporná předpona in-.",
      "consistent → consistency → inconsistency → množné číslo, y → ies: inconsistencies. Dvě změny + plurál."]},
    {text:"The new software should greatly ____ the booking process.", key:"SIMPLE", answer:"simplify", steps:[
      "Po „should greatly“ chybí sloveso v základním tvaru.",
      "simple → sloveso s příponou -ify, koncové -e vypadá: simplify.",
      "Pozor: simplicity je podstatné jméno, simply příslovce. Odpověď: simplify."]}
  ],
  quiz:[
    wf("L-p3-1","wfn","The report highlights the growing ____ between rich and poor regions.","EQUAL",["inequality","inequalities"],"the growing … between → podstatné jméno; kontext je negativní → in + equal + -ity."),
    wf("L-p3-2","wfa","Her ____ to detail is what makes her such a good editor.","ATTEND",["attention"],"attention to detail = pečlivost. attend → attention (ne attendance = docházka)."),
    wf("L-p3-3","wfa","The ____ of the old factory took nearly two years.","DEMOLISH",["demolition"],"the … of → podstatné jméno. demolish → demolition (-ish vypadá, + -ition)."),
    wf("L-p3-4","wfn","Many young people struggle to achieve financial ____ from their parents.","DEPEND",["independence"],"financial independence = finanční nezávislost: in + depend + -ence."),
    wf("L-p3-5","wfn","The instructions were so ____ that nobody knew what to do.","LEAD",["misleading"],"mis- = špatně; misleading = zavádějící. Přídavné jméno na -ing popisuje věc."),
    wf("L-p3-6","wfc","Prices have risen ____ over the past decade.","DRAMA",["dramatically"],"drama → dramatic → dramatically (příslovce od -ic = -ally).")
  ]
},
4:{
  id:"p4", part:4, title:"Part 4 · Key word transformation",
  short:"6 vět: druhou větu doplníš 3–6 slovy včetně zadaného klíčového slova tak, aby měla stejný význam jako první.",
  marks:"6 otázek × 2 body = 12 bodů", time:"cca 15 minut",
  tests:"Part 4 kombinuje gramatiku a slovní zásobu: pasivum a have sth done, inverzi, podmínky a wish, modální slovesa v minulosti, nepřímou řeč, srovnání, frázová slovesa a idiomy. Každá odpověď se hodnotí po dvou částech – za každou správnou část 1 bod. Klíčové slovo se nesmí změnit a odpověď musí mít 3 až 6 slov (stažené tvary se počítají jako dvě slova).",
  strategy:[
    "Porovnej první a druhou větu: co se změnilo na začátku a na konci druhé věty? To ti řekne, jakou strukturu potřebuješ.",
    "Podívej se na klíčové slovo: s jakou strukturou se pojí? (WISH → wish + minulý čas; SAID → is said to; SOONER → no sooner … than).",
    "Najdi v první větě dvě „informace“, které musíš přenést – obvykle to jsou dvě bodované části.",
    "Napiš odpověď a spočítej slova (3–6, stažené tvary = 2 slova). Klíčové slovo musí zůstat přesně ve stejném tvaru.",
    "Zkontroluj čas a osobu – musí sedět s tím, co je v druhé větě před a za mezerou.",
    "Nikdy nenechávej prázdné: i jedna správná část = 1 bod."
  ],
  traps:[
    {t:"Změna klíčového slova", d:"Klíčové slovo musí zůstat beze změny: SUCCEED nesmíš změnit na succeeded, CAN'T na cannot.", ex:"Klíč ABLE: „unable“ ani „ability“ nesmíš použít – správně např. „was not able to“."},
    {t:"Víc než 6 slov", d:"Stažené tvary se počítají jako dvě slova: didn't = did not. Delší odpověď = 0 bodů.", ex:"hadn't been for = 4 slova"},
    {t:"Čas se neposune", d:"Nepřímá řeč, wish a podmínky vyžadují posun času o krok do minulosti.", ex:"I regret going. → I wish I HADN'T gone."},
    {t:"Opomenutá část informace", d:"Každá informace z první věty musí zaznít i ve druhé – například „never“, „again“ nebo „the first time“.", ex:"It's the first time I've flown. → I have NEVER flown before."},
    {t:"Osobní pasivum", d:"It is said that he is… → He is said TO BE…; minulost: is said TO HAVE BEEN.", ex:"She is thought to have left the country."},
    {t:"Inverze bez pomocného slovesa", d:"Po Not until / Only when / Little / Never na začátku musí být pomocné sloveso před podmětem.", ex:"Little DID he know that…"},
    {t:"Modální sloveso v minulosti", d:"must / can't / might / should + HAVE + 3. tvar. Needn't have done × didn't need to do.", ex:"You needn't have bought it."},
    {t:"Have sth done", d:"Někdo něco udělal pro mě → have / get + předmět + 3. tvar. Slovosled je pevný.", ex:"I had my car serviced."},
    {t:"Ustálené fráze a idiomy", d:"Klíčové slovo často „otevírá“ idiom: MEANS → by no means, LOSS → at a loss, POINT → there's no point in.", ex:"I was at a loss for words."},
    {t:"Gramatika za klíčovým slovem", d:"Po některých slovech následuje -ing nebo předložka: object TO doing, accuse sb OF, prevent sb FROM.", ex:"He denied having taken the money."}
  ],
  worked:[
    {a:"People believe that the fire was started deliberately.", key:"BELIEVED", text:"The fire ____ started deliberately.", answer:"is believed to have been", steps:[
      "Druhá věta začíná „The fire“ → osobní pasivum: The fire is believed to…",
      "Požár vznikl v minulosti, víra je teď → perfektní infinitiv: to have + 3. tvar.",
      "Je to navíc trpný rod (oheň byl založen) → to have BEEN started.",
      "Část 1: is believed · část 2: to have been. Celkem 5 slov."]},
    {a:"I only understood the problem when the teacher explained it again.", key:"UNTIL", text:"Not ____ it again did I understand the problem.", answer:"until the teacher explained", steps:[
      "Druhá věta začíná „Not“ a za mezerou je „did I understand“ → struktura Not until + věta, pak inverze v hlavní větě.",
      "Inverze (did I understand) už v zadání je, takže do mezery patří jen vedlejší věta: until + podmět + sloveso.",
      "Sloveso ve vedlejší větě je v minulém čase a BEZ inverze: the teacher explained.",
      "Část 1: until the teacher · část 2: explained. Celkem 4 slova."]},
    {a:"It wasn't necessary for us to book a table because the restaurant was empty.", key:"NEED", text:"We ____ a table because the restaurant was empty.", answer:"need not have booked", steps:[
      "Nebylo nutné, ale udělali jsme to? Z věty to není jasné – obě verze jsou přijatelné, záleží na kontextu.",
      "needn't have booked = zarezervovali jsme, ale zbytečně. didn't need to book = nemuseli jsme (a asi jsme nerezervovali).",
      "Část 1: need not have / did not need to · část 2: booked / book. Klíčové slovo NEED zůstává beze změny."]}
  ],
  quiz:[
    kt("L-p4-1","pas","People say that the castle is haunted.","SAID","The castle ____ haunted.",["is said to be"],[["is said"],["to be"]],"Osobní pasivum: The castle is said to be… Část 1: is said, část 2: to be."),
    kt("L-p4-2","ded","I'm sure she forgot about the meeting.","MUST","She ____ about the meeting.",["must have forgotten"],[["must have"],["forgotten"]],"must have + 3. tvar = jistě se to stalo. Pozor na tvar forgotten."),
    kt("L-p4-3","ded","It was wrong of you to shout at him.","OUGHT","You ____ at him.",["ought not to have shouted","oughtn't to have shouted"],[["ought not to"],["have shouted"]],"ought not to have + 3. tvar = neměl jsi (a přesto jsi to udělal)."),
    kt("L-p4-4","cond","The only reason we won was our goalkeeper's brilliant performance.","FOR","____ our goalkeeper's brilliant performance, we would not have won.",["had it not been for","if it had not been for","if it hadn't been for"],[["had it not been","if it had not been","if it hadn't been"],["for"]],"Had it not been for = If it hadn't been for = kdyby nebylo. Inverze nahrazuje if."),
    kt("L-p4-5","gram","She started learning Japanese three years ago.","BEEN","She ____ three years.",["has been learning Japanese for","has been studying Japanese for"],[["has been learning","has been studying"],["Japanese for"]],"Předpřítomný průběhový čas + for (doba trvání)."),
    kt("L-p4-6","cond","I'd prefer you not to tell anyone about this.","RATHER","I'd ____ anyone about this.",["rather you did not tell","rather you didn't tell"],[["rather you"],["did not tell"]],"would rather + osoba + minulý čas = byl bych radši, kdybys…")
  ]
}
};

/* ================================================================ THEMATIC LESSONS */
const topics = [
{id:"inv", title:"Inverze", cats:["inv"],
  intro:"Inverze = pomocné sloveso před podmětem po záporném nebo omezujícím výrazu na začátku věty. Je to formální styl a v Part 2 a 4 se objevuje téměř v každém testu.",
  table:[
    ["Never / Rarely / Seldom + aux + S","nikdy / zřídka","Rarely have I seen such chaos."],
    ["Not only + aux + S …, but (also)","nejen … ale i","Not only did she win, but she also broke the record."],
    ["No sooner + had + S + 3. tvar … than","sotva … (už)","No sooner had we sat down than the lights went out."],
    ["Hardly / Scarcely + had … when","sotva … když","Hardly had I arrived when the phone rang."],
    ["Not until / Only when / Only after + věta + aux + S","teprve když","Only when I read the letter did I understand."],
    ["Little + aux + S","vůbec ne (netušil)","Little did they know what was coming."],
    ["Under no circumstances / On no account + aux + S","v žádném případě","On no account should you open it."],
    ["So + adj + be + S … that / Such + be + S … that","tak … že","So strong was the wind that trees fell."],
    ["Had / Should / Were + S (bez if)","podmínka bez if","Had I known, I would have helped."]
  ],
  tips:["Inverze je jen v HLAVNÍ větě: Not until I got home (bez inverze) did I realise (inverze).","V přítomném a minulém prostém čase potřebuješ do / does / did.","Only + podmět na začátku (Only John knew) inverzi NEMÁ."],
  quiz:[
    oc("L-inv-1","inv","Under no ____ should you open this door without permission.",["circumstances"],"Under no circumstances = v žádném případě; následuje inverze should you."),
    oc("L-inv-2","inv","Only when the results came in ____ we realise how serious the situation was.",["did"],"Only when + věta → inverze v hlavní větě: did we realise."),
    oc("L-inv-3","inv","____ was the noise that we couldn't hear ourselves think.",["such"],"Such + be + podstatné jméno … that = tak velký, že… (So by vyžadovalo přídavné jméno: So loud was the noise.)"),
    kt("L-inv-4","inv","I had never seen such a beautiful sunset.","HAD","Never before ____ such a beautiful sunset.",["had I seen"],[["had I"],["seen"]],"Never before + had + I + 3. tvar."),
    kt("L-inv-5","inv","She not only sings, but she also writes her own songs.","DOES","Not only ____ she also writes her own songs.",["does she sing but"],[["does she sing"],["but"]],"Not only does she sing, but… – inverze s does + nezapomeň na „but“."),
    mc("L-inv-6","inv","____ had I sat down when the phone rang.",["Hardly","Rarely","Only","Little"],0,"Hardly had … when = sotva. Rarely / Little by neseděly s „when“, Only potřebuje doplnění (Only after…).")
  ]},
{id:"cond", title:"Podmínky a wish", cats:["cond"],
  intro:"C1 testuje hlavně smíšené a formální podmínky, náhrady za if (unless, provided, as long as, but for) a lítost pomocí wish / if only / would rather.",
  table:[
    ["If + past perfect, would have + 3. tvar","neskutečná minulost","If I had left earlier, I would have caught it."],
    ["If + past perfect, would + inf.","smíšená (minulost → přítomnost)","If I had studied medicine, I would be a doctor now."],
    ["Had / Were / Should + S (bez if)","formální inverze","Should you need help, call me."],
    ["unless / provided (that) / as long as / on condition that","pokud ne / pokud","You can go as long as you're back by ten."],
    ["But for / If it hadn't been for + n.","nebýt …","But for your help, I'd have failed."],
    ["wish / if only + past simple","přání o přítomnosti","I wish I knew the answer."],
    ["wish + past perfect","lítost nad minulostí","I wish I hadn't said that."],
    ["wish + sb + would","stížnost na chování druhých","I wish you would stop interrupting."],
    ["would rather + sb + past simple; it's (high) time + past simple","radši by…; je nejvyšší čas","It's high time we left."]
  ],
  tips:["Wish + would nepoužíváš o sobě (ne I wish I would).","In case ≠ if: in case = pro případ, že.","Supposing / Imagine (that) se chovají jako if."],
  quiz:[
    oc("L-cond-1","cond","____ you need any help, just give me a call.",["should"],"Should you need = If you (should) need – formální inverze."),
    oc("L-cond-2","cond","I wish you ____ stop interrupting me!",["would"],"wish + osoba + would = stížnost na chování někoho jiného."),
    kt("L-cond-3","cond","I regret telling him the truth.","WISH","I ____ him the truth.",["wish I had not told","wish I hadn't told"],[["wish I"],["had not told"]],"Lítost nad minulostí: wish + had (not) + 3. tvar."),
    kt("L-cond-4","cond","You can borrow my car, but you must bring it back by six.","LONG","You can borrow my car ____ bring it back by six.",["as long as you","so long as you"],[["as long as","so long as"],["you"]],"as long as = pokud, za podmínky že."),
    kt("L-cond-5","cond","We didn't go out because of the storm.","IF","____ the storm, we would have gone out.",["if it had not been for","if it hadn't been for"],[["if it had not been","if it hadn't been"],["for"]],"If it hadn't been for + podstatné jméno = nebýt…"),
    mc("L-cond-6","cond","It's high time the government ____ something about the traffic.",["did","does","will do","has done"],0,"It's (high) time + minulý čas prostý = už je načase.")
  ]},
{id:"ded", title:"Modální slovesa a dedukce", cats:["ded"],
  intro:"Modální slovesa vyjadřují, jak moc jsme si něčím jistí. V minulosti se tvoří modální sloveso + have + 3. tvar – to je v Part 4 jedna z nejčastějších struktur.",
  table:[
    ["must + inf. / must have + 3. tvar","určitě (je / byl)","She must have forgotten."],
    ["can't / couldn't have + 3. tvar","určitě ne","He can't have seen us."],
    ["may / might / could have + 3. tvar","možná","They might have missed the bus."],
    ["should have + 3. tvar","měl jsi (a neudělal jsi)","You should have told me."],
    ["needn't have + 3. tvar","zbytečně jsi to udělal","You needn't have cooked."],
    ["didn't need to + inf.","nebylo nutné (asi neudělal)","I didn't need to pay."],
    ["be bound / sure / certain to + inf.","určitě (v budoucnu)","It's bound to rain."],
    ["be likely / unlikely to + inf.","pravděpodobně (ne)","He is unlikely to agree."],
    ["could have + 3. tvar (výčitka)","mohl jsi (a neudělal)","You could have warned me!"]
  ],
  tips:["Opak must have je can't have, ne mustn't have.","Klíčové slovo CAN'T nesmíš rozepsat na cannot.","There's bound to be = určitě tam bude."],
  quiz:[
    kt("L-ded-1","ded","I'm certain that Sarah wasn't at the party.","CAN'T","Sarah ____ at the party.",["can't have been"],[["can't have"],["been"]],"can't have + 3. tvar = určitě ne (v minulosti)."),
    kt("L-ded-2","ded","It's possible that the letter got lost in the post.","MAY","The letter ____ in the post.",["may have got lost","may have been lost","may have gotten lost"],[["may have"],["got lost","been lost","gotten lost"]],"may have + 3. tvar = možná se stalo."),
    oc("L-ded-3","ded","You ____ have told me you were coming – I'd have cooked something special!",["could","might","should"],"could / might / should have + 3. tvar = výčitka: mohl jsi mi to říct."),
    oc("L-ded-4","ded","You needn't ____ bought a present – but thank you!",["have"],"needn't have + 3. tvar = udělal jsi to zbytečně."),
    mc("L-ded-5","ded","The keys can't have disappeared – you ____ have left them in the car.",["must","can","should","need"],0,"must have = logický závěr (určitě jsi je nechal v autě)."),
    kt("L-ded-6","ded","It wasn't necessary for you to wait for me.","NEED","You ____ for me.",["need not have waited","needn't have waited","did not need to wait","didn't need to wait"],[["need not have","did not need to"],["waited","wait"]],"needn't have waited (čekal jsi zbytečně) nebo didn't need to wait (nebylo nutné).")
  ]},
{id:"pas", title:"Trpný rod a have sth done", cats:["pas"],
  intro:"Kromě běžného pasiva C1 testuje osobní pasivum se slovesy mínění (is said to, is thought to have), pasivní infinitiv a -ing a kauzativ have / get sth done.",
  table:[
    ["be + 3. tvar (ve všech časech)","běžné pasivum","The bridge is being repaired."],
    ["S + is said / thought / believed + to inf.","osobní pasivum – přítomnost","He is said to be very rich."],
    ["S + is said … + to have + 3. tvar","osobní pasivum – minulost","She is thought to have left."],
    ["It is said / believed that …","neosobní pasivum","It is believed that the cave is old."],
    ["have / get + předmět + 3. tvar","nechat si udělat / stalo se mi","I had my bike stolen."],
    ["get + 3. tvar","dynamické pasivum","He got injured in the match."],
    ["to be + 3. tvar / being + 3. tvar","pasivní infinitiv / -ing","I hate being interrupted."],
    ["need + -ing (BrE)","potřebuje (být) …","The car needs washing."],
    ["There is said to be …","prý je / existuje","There is said to be a ghost."]
  ],
  tips:["Have sth done: předmět stojí PŘED 3. tvarem (had the roof repaired).","Pokud událost proběhla dřív než „říkání“, použij to have + 3. tvar.","By + činitel uváděj, jen když je důležitý."],
  quiz:[
    kt("L-pas-1","pas","Someone stole her bag while she was on the train.","HAD","She ____ while she was on the train.",["had her bag stolen"],[["had her bag"],["stolen"]],"have + předmět + 3. tvar = stalo se jí to (ne vlastní vůlí)."),
    kt("L-pas-2","pas","Experts believe that the painting is a forgery.","BELIEVED","The painting ____ a forgery.",["is believed to be"],[["is believed"],["to be"]],"Osobní pasivum: is believed to be."),
    oc("L-pas-3","pas","The new hospital is expected to ____ completed by next spring.",["be"],"Pasivní infinitiv: to be + 3. tvar."),
    oc("L-pas-4","pas","I'm going to get my hair ____ before the wedding.",["cut","done","styled"],"get + předmět + 3. tvar = nechat si udělat."),
    mc("L-pas-5","pas","The suspect is reported ____ the country last week.",["to have left","to leave","having left","that he left"],0,"Událost minulá (last week) → perfektní infinitiv to have left."),
    kt("L-pas-6","pas","They are going to demolish the old cinema.","BE","The old cinema ____ demolished.",["is going to be"],[["is going"],["to be"]],"Pasivum s going to: is going to be + 3. tvar.")
  ]},
{id:"prep", title:"Předložkové vazby", cats:["prep"],
  intro:"Závislé předložky se nedají odvodit z češtiny – musíš je znát. V Part 2 tvoří zhruba čtvrtinu mezer, v Part 1 rozhodují mezi synonymy.",
  table:[
    ["sloveso + on","depend, rely, insist, concentrate, comment, congratulate sb","She insisted on paying."],
    ["sloveso + of","accuse sb, approve, consist, dispose, deprive sb","He was accused of fraud."],
    ["sloveso + from","prevent / stop / discourage sb, refrain, benefit, differ","Refrain from smoking."],
    ["sloveso + in","succeed, result, participate, invest, specialise","It resulted in chaos."],
    ["sloveso + to","object, adapt, contribute, react, resort, be used","I object to being lied to."],
    ["přídavné jméno + of","aware, capable, fond, critical, typical, envious","She's capable of anything."],
    ["přídavné jméno + to","prone, immune, vulnerable, entitled, committed","He is prone to exaggeration."],
    ["podstatné jméno + in","increase, rise, fall, decline, interest, pride","a sharp rise in prices"],
    ["podstatné jméno + for / to / with","demand for, reason for, solution to, key to, problem with","the key to success"]
  ],
  tips:["Po předložce následuje -ing: look forward to SEEING.","Increase IN (o čem), increase OF (o kolik): an increase of 5 %.","Učte se vazby celé: take pride in, have an impact on."],
  quiz:[
    oc("L-prep-1","prep","She takes great pride ____ her work.",["in"],"take pride in sth = být hrdý na."),
    oc("L-prep-2","prep","He was accused ____ stealing company secrets.",["of"],"accuse sb of + -ing."),
    oc("L-prep-3","prep","There has been a sharp increase ____ the number of applicants.",["in"],"an increase in sth = nárůst čeho."),
    mc("L-prep-4","prep","The success of the project depends largely ____ funding.",["on","of","from","at"],0,"depend on sth."),
    mc("L-prep-5","prep","Nobody has ever succeeded ____ climbing the north face in winter.",["in","at","on","with"],0,"succeed in + -ing."),
    kt("L-prep-6","prep","I'm not interested in politics any more.","LOST","I ____ politics.",["have lost interest in","'ve lost interest in"],[["have lost interest"],["in"]],"lose interest in sth = ztratit zájem o.")
  ]},
{id:"col", title:"Kolokace a frázová slovesa", cats:["col","pv","fix"],
  intro:"Kolokace jsou slova, která „chodí spolu“. Part 1 je testuje nejčastěji: všechna čtyři slova mají podobný význam, ale jen jedno se s daným podstatným jménem pojí.",
  table:[
    ["make","an effort, a decision, progress, a difference, a living, sense","She made a conscious effort."],
    ["do","research, damage, harm, a favour, your best, business","Too much sun can do harm."],
    ["take","advantage of, part in, place, into account, for granted","Don't take me for granted."],
    ["strike / reach / draw","a balance / a compromise, an agreement / a conclusion","They struck a deal."],
    ["pose / raise / meet","a threat, a question / awareness, funds / a demand, a deadline","It poses a serious threat."],
    ["intenzifikátor + adj.","bitterly disappointed, highly likely, deeply moved, fully aware","I'm fully aware of it."],
    ["break / fall / come","break down, fall through, come up with, come across","The deal fell through."],
    ["put / get / set","put up with, get away with, set up, put off","I can't put up with it."],
    ["fráze s předložkou","on the verge of, in the wake of, at stake, out of the question","Their jobs are at stake."]
  ],
  tips:["Zapisuj si vždy celou frázi, ne jedno slovo (raise awareness, ne jen raise).","U frázových sloves sleduj i předmět: put sb off (odradit) × put sth off (odložit).","V Part 1 často rozhoduje předložka za mezerou."],
  quiz:[
    mc("L-col-1","col","The company has ____ a lot of criticism for its new advertising campaign.",["attracted","pulled","collected","gathered"],0,"attract criticism = vyvolat kritiku."),
    mc("L-col-2","col","We need to ____ a balance between work and family life.",["strike","hit","make","beat"],0,"strike a balance = najít rovnováhu."),
    mc("L-col-3","pv","The negotiations ____ down after the two sides failed to agree.",["broke","fell","went","came"],0,"break down = zkrachovat (jednání, stroj)."),
    oc("L-col-4","pv","I can't put ____ with this noise any longer.",["up"],"put up with = snášet."),
    oc("L-col-5","pv","The meeting has been called ____ because the manager is ill.",["off"],"call off = zrušit."),
    mc("L-col-6","col","He made a ____ effort to be polite, although he was furious.",["conscious","aware","knowing","sensible"],0,"make a conscious effort = vědomě se snažit.")
  ]},
{id:"wf", title:"Pravidla tvoření slov", cats:["wfa","wfc","wfn","wfv"],
  intro:"Většinu slov v Part 3 vytvoříš pomocí asi 25 přípon a 8 záporných předpon. Nejdůležitější je správně určit slovní druh a pak pečlivě napsat pravopis.",
  table:[
    ["podstatné jméno – děj","-tion / -sion / -ment / -al / -ance / -ence","refuse → refusal, permit → permission"],
    ["podstatné jméno – vlastnost","-ness / -ity / -ence / -th / -dom / -hood","complex → complexity, wide → width"],
    ["podstatné jméno – osoba","-er / -or / -ist / -ant / -ee","apply → applicant, employ → employee"],
    ["přídavné jméno","-ful / -less / -ous / -ive / -able / -ible / -al / -ic","science → scientific, rely → reliable"],
    ["sloveso","-en / -ise / -ify / en- / em-","wide → widen, sure → ensure, power → empower"],
    ["příslovce","-ly / -ally (u -ic)","necessary → necessarily, basic → basically"],
    ["záporné předpony","un- / in- / im- / il- / ir- / dis- / non-","illogical, irregular, disapprove"],
    ["„špatně / moc / málo“","mis- / over- / under-","misunderstand, overestimate, underpaid"],
    ["pravopis","-e vypadá před samohláskou; y → i; zdvojení u krátké přízvučné slabiky","argue → argument, happy → happiness, forget → forgettable"]
  ],
  tips:["Před příponou -able u slov na -ce / -ge e zůstává: noticeable, manageable.","Slova na -ic dávají příslovce na -ically.","Zkontroluj, jestli nepotřebuješ množné číslo."],
  quiz:[
    wf("L-wf-1","wfa","There is no ____ evidence that the drug is effective.","SCIENCE",["scientific"],"Před podstatným jménem evidence → přídavné jméno: scientific."),
    wf("L-wf-2","wfv","The company plans to ____ its range of products next year.","WIDE",["widen"],"Po „plans to“ → sloveso: wide + -en = widen."),
    wf("L-wf-3","wfa","His ____ to apologise only made matters worse.","REFUSE",["refusal"],"his … to → podstatné jméno: refuse → refusal."),
    wf("L-wf-4","wfa","Despite the ____ of the task, she finished it on time.","COMPLEX",["complexity"],"the … of → podstatné jméno: complex + -ity."),
    wf("L-wf-5","wfn","The film was ____ long, and many viewers left before the end.","NECESSARY",["unnecessarily"],"Před přídavným jménem long → příslovce, kontext negativní: un + necessar(y→i) + -ly."),
    wf("L-wf-6","wfa","The ____ of the new rules caused a great deal of confusion.","INTRODUCE",["introduction"],"the … of → podstatné jméno: introduce → introduction.")
  ]}
];

/* ================================================================ CATEGORY RULES (feedback) */
const catRules = {
  inv:{rule:"Záporný nebo omezující výraz na začátku věty (Never, Rarely, Not only, No sooner, Only when, Little) → pomocné sloveso před podmětem.", ex:["Seldom do we get such a clear view of the mountains.","Not until the very end did the audience realise who the narrator was."]},
  ded:{rule:"Míra jistoty: must (určitě), can't (určitě ne), may / might / could (možná). O minulosti: modální sloveso + have + 3. tvar.", ex:["He can't have noticed the sign – he drove straight past it.","They might have taken the earlier train."]},
  pas:{rule:"Pasivum: be + 3. tvar. Osobní pasivum: S + is said / thought + to (have) … Kauzativ: have / get + předmět + 3. tvar.", ex:["The suspect is thought to have fled abroad.","We're having the kitchen redecorated next month."]},
  cond:{rule:"Neskutečná minulost: had + 3. tvar → would have + 3. tvar. Wish + minulý čas (přítomnost) / past perfect (minulost). Bez if: Had / Should / Were + podmět.", ex:["Were I in your position, I would accept the offer.","If only I had listened to her advice."]},
  link:{rule:"Although / even though / whereas + věta; despite / in spite of + podstatné jméno nebo -ing; however = však (oddělené čárkou).", ex:["In spite of feeling exhausted, she kept going.","Much as I enjoy city life, I sometimes miss the countryside."]},
  prep:{rule:"Závislé předložky se učí s celým slovem: depend on, insist on, accuse of, prevent from, succeed in, object to. Po předložce následuje -ing.", ex:["She objected to being treated like a child.","The decision resulted in widespread protests."]},
  gram:{rule:"Gramatické struktury C1: vztažná zájmena (whose, which), čas (předpřítomný pro trvání), too / enough, no matter how, vazby se -ing a infinitivem.", ex:["No matter how often I explain it, he still gets it wrong.","The town, whose population has doubled, needs a new school."]},
  wfa:{rule:"Urči slovní druh (člen → podstatné jméno, před podstatným jménem → přídavné jméno, u slovesa → příslovce) a připoj správnou příponu.", ex:["The committee's decision caused considerable disappointment.","Her performance was remarkably consistent."]},
  wfc:{rule:"Záměnná slova: -ed × -ing, -ic × -ical, -able × -ible, osoba × věc (competitor × competition). Rozhoduje význam ve větě.", ex:["The economic situation is improving, but it is not an economical car.","It was a historic victory, not just a historical event."]},
  col:{rule:"Kolokace = slova, která spolu přirozeně chodí (strike a balance, pose a threat, bitterly disappointed). Učí se jako celek.", ex:["The new evidence sheds light on the cause of the fire.","Their decision has far-reaching consequences."]},
  pv:{rule:"Frázové sloveso = sloveso + částice s novým významem (come up with, put off, break down). Všechny možnosti v Part 1 bývají slovesa – rozhoduje částice.", ex:["They had to call off the match because of the storm.","She came up with an ingenious solution."]},
  fix:{rule:"Ustálená spojení mají pevný tvar, slova v nich nelze nahradit synonymem (on the verge of, at stake, by no means, in the long run).", ex:["The company is on the verge of bankruptcy.","In the long run, the investment will pay off."]},
  rep:{rule:"Nepřímá řeč: posun času a uvozovací slovesa s vazbou – suggest doing, accuse sb of, deny doing, urge sb to, insist on.", ex:["She denied having seen the documents.","He urged us to reconsider our decision."]},
  ptc:{rule:"Participiální vazby zkracují větu: -ing (současně / aktivně), having + 3. tvar (předtím), 3. tvar (pasivně). Podmět musí být stejný.", ex:["Having finished the report, she went home.","Built in 1890, the station is now a museum."]},
  cleft:{rule:"Vytýkací věty zdůrazňují část věty: It was … that / who; What … is / was; All … is; It was not until … that.", ex:["What surprised me most was his honesty.","It was not until midnight that the guests left."]},
  quant:{rule:"Kvantifikátory: few / little (málo), a few / a little (pár), each / every, either / neither, none of, much / many, a great deal of + nepočitatelné.", ex:["Few people realise how much water is wasted.","Neither of the explanations was convincing."]},
  comp:{rule:"Srovnání: as … as, much / far / a lot + 2. stupeň, by far + 3. stupeň, the + 2. st. …, the + 2. st.", ex:["The longer you wait, the harder it gets.","This is by far the best solution."]},
  wfn:{rule:"Záporné předpony: un-, in-, im- (b/m/p), il- (l), ir- (r), dis-, non-, mis-. Kontext rozhoduje, zda zápor potřebuješ.", ex:["The witness's account was inconsistent with the evidence.","Such behaviour is completely irresponsible."]},
  wfv:{rule:"Slovesa ze slov: -en (widen, strengthen), en- / em- (enable, empower), -ise / -ify (modernise, clarify), re- (rebuild).", ex:["The new law aims to strengthen consumer rights.","Could you clarify what you mean?"]}
};

/* which topic lesson covers which category (for "recommended next step") */
const catTopic = {inv:"inv", cond:"cond", ded:"ded", pas:"pas", prep:"prep", col:"col", pv:"col", fix:"col", wfa:"wf", wfc:"wf", wfn:"wf", wfv:"wf"};

return {parts, topics, catRules, catTopic};
})();
