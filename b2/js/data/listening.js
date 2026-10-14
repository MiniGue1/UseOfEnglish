/* DATA.listening – B2 First Listening, Parts 1–4. ALL CONTENT ORIGINAL (written for this portal).
 *
 * There is no audio: every recording is a transcript that the module speaks with the Web Speech API
 * (or shows sentence by sentence in "reader mode" when no speech engine is available).
 * Scripts are natural spoken British English at B2 level – slower, clearer and with more common vocabulary than C1.
 *
 * SHAPE
 * voices      : { presetKey: {g:"m"|"f", voiceIdx, pitch, rate} }   // g = preferred voice gender, voiceIdx = fallback index
 * trapTypes   : { key: "Czech label" }                                  // typical exam traps, used for weak-spot statistics
 * A "recording" = { speakers:{ "Name as used in lines": "presetKey" }, lines:[ {sp:"Name", t:"spoken text"} ] }
 * Every question has: why (CZ explanation), trap (CZ: the typical trap in this item), tt (trapTypes key),
 *                     evidence (EXACT substring of one line of its recording – highlighted after checking)
 *
 * p1: [{id, title, extracts:[ recording + {context:"You hear …", q, opts:[3], correct:0-2, evidence, why, trap, tt} ×8 ]}]   // Q1–8
 * p2: [{id, title, context:"You will hear …", …recording (one speaker),
 *       qs:[ {s:"sentence with ___ gap", ans:["words heard in the recording", "accepted variant", …], …} ×10 ]}]            // Q9–18
 * p3: [{id, title, context:"You will hear five short extracts in which people are talking about …",
 *       ask:"what each speaker says about …", opts:[8 strings A–H], …recording (sp = "Speaker 1" … "Speaker 5"),
 *       qs:[ {n:1-5, correct:0-7, …} ×5 ]}]                    // Q19–23, five different letters, three options unused
 * p4: [{id, title, context:"You will hear an interview …", …recording, qs:[ {q, opts:[3], correct:0-2, …} ×7 ]}]  // Q24–30
 * Spoken lines avoid abbreviations with full stops (Dr., Mr.) and decimals, so sentence chunking for speech works.
 */
window.DATA = window.DATA || {};
window.DATA.listening = window.DATA.listening || {};
(function(L){
"use strict";

L.voices = {
  EX: {g:"f", voiceIdx:0, pitch:1.0,  rate:0.9},    // examiner / rubric
  M1: {g:"m", voiceIdx:1, pitch:0.85, rate:0.95},
  M2: {g:"m", voiceIdx:3, pitch:1.0,  rate:0.97},
  M3: {g:"m", voiceIdx:5, pitch:0.75, rate:0.92},
  F1: {g:"f", voiceIdx:0, pitch:1.1,  rate:0.95},
  F2: {g:"f", voiceIdx:2, pitch:1.25, rate:0.97},
  F3: {g:"f", voiceIdx:4, pitch:0.95, rate:0.92},
  G1: {g:"f", voiceIdx:1, pitch:1.35, rate:1.0},    // girl / young woman
  B1: {g:"m", voiceIdx:2, pitch:1.2,  rate:1.0}     // boy / young man
};

L.trapTypes = {
  paraphrase: "Parafráze (jiná slova než v nahrávce)",
  distractor: "Zmíněno, ale odmítnuto",
  change:     "Změna názoru / plánu",
  attitude:   "Postoj a pocity mluvčího",
  inference:  "Implicitní význam (účel, vztah, místo)",
  detail:     "Přesné slovo / pravopis / číslo"
};

L.p1 = []; L.p2 = []; L.p3 = []; L.p4 = [];
})(window.DATA.listening);

/* ===================================================================================== PART 1 (sets 1–4) */
(function(L){
"use strict";
L.p1.push(
{ id:"p1-01", title:"Set 1 · Concert · New school · Charity bike ride", extracts:[
  { context:"You hear two friends talking about a concert they went to.",
    speakers:{"Girl":"G1","Boy":"B1"},
    lines:[
      {sp:"Girl", t:"That concert last night was amazing, wasn't it? Although I have to say, I wasn't keen on their new songs. They all sounded a bit the same to me."},
      {sp:"Boy", t:"Really? I thought a couple of them were all right. The venue was a bit of a let-down, though. It was so hot in there, and we couldn't see much from the back."},
      {sp:"Girl", t:"True. But everyone singing along at the end – that was the best bit."},
      {sp:"Boy", t:"Definitely. When the whole crowd joined in with the last song, I got goosebumps. I'd go again just for that."}
    ],
    q:"What did they both enjoy most about the concert?", opts:["the band's new songs","the place where it was held","the atmosphere created by the crowd"], correct:2,
    evidence:"everyone singing along at the end – that was the best bit",
    why:"Dívka: společné zpívání na konci bylo „the best bit“; chlapec souhlasí („Definitely“) a dostal z toho husí kůži → oba nejvíc ocenili atmosféru publika.",
    trap:"Nové písně se líbily jen chlapci (a jen „a couple of them“). Místo konání (venue) oba kritizují – horko a špatný výhled.", tt:"distractor"},
  { context:"You hear a man leaving a voice message for a friend.",
    speakers:{"Man":"M2"},
    lines:[
      {sp:"Man", t:"Hi Sam, it's Rob. It's about tomorrow. Don't worry, I'm still up for the bike ride – I'm not calling to cancel. It's just that my sister's asked me to help her move flat in the morning, so could we meet at two instead of ten? We'd still have plenty of daylight."},
      {sp:"Man", t:"Oh, and you don't need to bring that spare helmet after all – I found mine under the bed. Anyway, text me back if two o'clock is OK."}
    ],
    q:"Why is Rob calling Sam?", opts:["to cancel a bike ride","to suggest a later start","to ask Sam to lend him something"], correct:1,
    evidence:"could we meet at two instead of ten?",
    why:"Rob chce posunout sraz z deseti na druhou – „could we meet at two instead of ten?“ = navrhuje pozdější začátek.",
    trap:"„I'm not calling to cancel“ – zrušení výslovně popírá. Půjčit helmu už nepotřebuje („you don't need to bring that spare helmet after all“).", tt:"distractor"},
  { context:"You hear a girl talking about her first week at a new school.",
    speakers:{"Girl":"G1"},
    lines:[
      {sp:"Girl", t:"Before I started, I was really nervous. I didn't know a single person there, and everyone kept telling me the homework would be impossible. Actually, the homework's been fine so far, and most of the teachers are great – apart from maths, which is a bit boring."},
      {sp:"Girl", t:"What I was really dreading was lunchtime, sitting on my own. But on the second day a girl in my class asked me to sit with her friends, and now there are four of us who hang out together. So I can finally stop worrying!"}
    ],
    q:"How does the girl feel now about her new school?", opts:["relieved that she has made friends","worried about the amount of homework","disappointed with most of her lessons"], correct:0,
    evidence:"now there are four of us who hang out together",
    why:"Nejvíc se bála obědů o samotě, ale teď má partu čtyř kamarádek – „So I can finally stop worrying!“ = úleva.",
    trap:"Domácích úkolů se bála jen předem – ve skutečnosti jsou „fine“. Nudná je jen matematika, ne většina hodin.", tt:"change"},
  { context:"You hear two colleagues talking about a training course.",
    speakers:{"Woman":"F1","Man":"M1"},
    lines:[
      {sp:"Woman", t:"So what did you think of the training course yesterday?"},
      {sp:"Man", t:"Well, the trainer obviously knew her stuff, and she answered all my questions, which I appreciated."},
      {sp:"Woman", t:"Yes, she was really patient with us. I just wish it had been shorter. Six hours on spreadsheets is a lot."},
      {sp:"Man", t:"Oh, I didn't mind the length. The time went quite quickly, actually. And some of it will be really useful for our monthly reports."},
      {sp:"Woman", t:"Maybe for you. I hardly ever use spreadsheets in my job."}
    ],
    q:"What do the two colleagues agree about?", opts:["The trainer was helpful.","The course was too long.","The course wasn't relevant to their work."], correct:0,
    evidence:"Yes, she was really patient with us",
    why:"Muž chválí školitelku (odpověděla na všechny otázky) a žena přitakává „Yes, she was really patient with us“ – shodnou se, že byla nápomocná.",
    trap:"Délku kritizuje jen žena (muž: „I didn't mind the length“). Že kurz nebyl k ničemu, si myslí jen žena – muži se bude hodit.", tt:"distractor"},
  { context:"You hear a woman talking about a hotel she stayed in.",
    speakers:{"Woman":"F3"},
    lines:[
      {sp:"Woman", t:"We chose the hotel because the photos online looked lovely, and to be fair, the room was exactly like the pictures. It was a bit of a walk from the beach, but we didn't mind that – we needed the exercise after all the food! And the breakfast was fantastic."},
      {sp:"Woman", t:"No, what spoiled it was the building work next door. They started drilling at seven every morning, so we never had a lie-in. I did complain, but the staff said there was nothing they could do."}
    ],
    q:"What spoiled the woman's stay at the hotel?", opts:["the noise early in the day","its distance from the beach","the quality of the room"], correct:0,
    evidence:"what spoiled it was the building work next door",
    why:"Pokoj i snídaně byly skvělé; pobyt zkazila stavba vedle – vrtání od sedmi ráno = hluk brzy ráno.",
    trap:"Vzdálenost od pláže zmíní, ale „we didn't mind that“. Pokoj byl „exactly like the pictures“.", tt:"distractor"},
  { context:"You hear two friends talking about a new video game.",
    speakers:{"Girl":"G1","Boy":"B1"},
    lines:[
      {sp:"Girl", t:"Have you tried that new racing game yet?"},
      {sp:"Boy", t:"Yeah, I got it at the weekend. I'd read some bad reviews, so I wasn't expecting much, but honestly, I can't stop playing it. Everyone goes on about the graphics, and they're fine, but what I love is the tracks. They're really clever."},
      {sp:"Girl", t:"Isn't it really hard, though? My cousin says he keeps crashing."},
      {sp:"Boy", t:"It's tricky at first, but there's a practice mode that helps you get the hang of it. I was winning races after a couple of days."}
    ],
    q:"What does the boy think of the game?", opts:["It's too difficult for beginners.","Its graphics are disappointing.","It's better than he expected."], correct:2,
    evidence:"I wasn't expecting much, but honestly, I can't stop playing it",
    why:"Po špatných recenzích nic nečekal, ale nemůže přestat hrát → hra je lepší, než čekal.",
    trap:"Obtížnost zmiňuje dívka; chlapec říká, že cvičný režim pomůže a za pár dní vyhrával. Grafika je „fine“, ne zklamání.", tt:"paraphrase"},
  { context:"You hear a presenter on a local radio station.",
    speakers:{"Presenter":"M3"},
    lines:[
      {sp:"Presenter", t:"And finally, a reminder about Sunday's charity bike ride. Last year we had over three hundred riders, and we'd love to beat that this time. You don't need to be fast, and you don't need an expensive bike – there's a short ten-mile route for families, as well as the full fifty miles."},
      {sp:"Presenter", t:"The route is the same as last year, starting and finishing in Victoria Park. Every rider gets a medal, and all the money goes to the children's hospital. So put your name down on our website – there's still time!"}
    ],
    q:"What is the presenter doing?", opts:["explaining a change to an event","persuading listeners to take part","thanking people who raised money"], correct:1,
    evidence:"So put your name down on our website",
    why:"Láká posluchače: nemusíš být rychlý ani mít drahé kolo, každý dostane medaili a „put your name down“ = přihlas se.",
    trap:"Trasa je „the same as last year“ – žádná změna. Nikomu neděkuje; o penězích jen říká, komu půjdou.", tt:"inference"},
  { context:"You hear two friends talking about a TV series.",
    speakers:{"Man":"M2","Woman":"F2"},
    lines:[
      {sp:"Man", t:"Are you still watching that detective series?"},
      {sp:"Woman", t:"I've just finished the second season. The first one had me hooked from the start, but this one really dragged. They added too many new characters, and half the episodes went nowhere."},
      {sp:"Man", t:"That's a shame. Isn't it based on a book?"},
      {sp:"Woman", t:"It is, and I actually read the book first. The series follows it quite closely, so there weren't any surprises. The main actor's still brilliant, though. I'll probably watch the next season just for him."}
    ],
    q:"What does the woman say about the series?", opts:["The main actor is not right for the part.","It is better than the book it is based on.","The second season is not as good as the first."], correct:2,
    evidence:"this one really dragged",
    why:"První řada ji hned chytila, druhá se „táhla“ (dragged) – moc nových postav, epizody bez děje → je horší než první.",
    trap:"Hlavní herec je „still brilliant“. O knize říká jen, že ji seriál věrně sleduje – ne že je seriál lepší.", tt:"paraphrase"}
]},

{ id:"p1-02", title:"Set 2 · Cooking class · Lifeguard · Museum trip", extracts:[
  { context:"You hear a woman talking about a cooking class she went to.",
    speakers:{"Woman":"F1"},
    lines:[
      {sp:"Woman", t:"My friend booked us both on a Thai cooking class for my birthday. I'm not a great cook, so I was a bit worried I'd make a mess of it. In the end, the curry we made was OK – not as good as in a restaurant, to be honest."},
      {sp:"Woman", t:"But the chef showed us how to chop vegetables properly, really fast, like professionals do, and I've been practising ever since. That was worth the money on its own. There were only six of us, so it was quite relaxed too."}
    ],
    q:"What did the woman enjoy most about the class?", opts:["the dish they cooked","a technique she learnt","the people she met"], correct:1,
    evidence:"the chef showed us how to chop vegetables properly",
    why:"Kuchař je naučil krájet zeleninu jako profesionálové – „That was worth the money on its own“ = to pro ni bylo nejcennější.",
    trap:"Kari bylo jen „OK“, horší než v restauraci. Malá skupina byla příjemná, ale o seznamování s lidmi nemluví.", tt:"paraphrase"},
  { context:"You hear two friends talking about a mobile phone.",
    speakers:{"Girl":"G1","Boy":"B1"},
    lines:[
      {sp:"Girl", t:"Are you really getting another phone? Yours isn't that old."},
      {sp:"Boy", t:"I know, and everyone thinks it's because of the crack in the screen, but that doesn't bother me. It still works fine."},
      {sp:"Girl", t:"So what's the problem?"},
      {sp:"Boy", t:"It dies by lunchtime. I charge it overnight, and by the middle of the day it's on five per cent. I can't even listen to music on the way home. The camera on the new model is supposed to be amazing too, but that's not why I'm getting it."}
    ],
    q:"Why does the boy want a new phone?", opts:["He wants a better camera.","Its screen is damaged.","Its battery runs out too quickly."], correct:2,
    evidence:"It dies by lunchtime",
    why:"„It dies by lunchtime“ – telefon se do oběda vybije, v poledne má pět procent → baterie nevydrží.",
    trap:"Prasklý displej ho netrápí („that doesn't bother me“) a fotoaparát výslovně odmítá („that's not why I'm getting it“).", tt:"distractor"},
  { context:"You hear a lifeguard talking about his job.",
    speakers:{"Man":"M1"},
    lines:[
      {sp:"Man", t:"People think being a lifeguard is an easy summer job – sitting in the sun all day watching people swim. The heat I can cope with; you get used to it. But you can't relax for a second. You're constantly watching the water and counting heads."},
      {sp:"Man", t:"Most days nothing happens, and then suddenly a child's been pulled out by the current and you're running into the sea. Those moments are scary, but your training takes over. The hardest part, honestly, is staying focused for eight hours on the quiet days."}
    ],
    q:"What does the man find hardest about his job?", opts:["dealing with emergencies","working in the heat","concentrating for long periods"], correct:2,
    evidence:"The hardest part, honestly, is staying focused for eight hours",
    why:"„The hardest part… is staying focused for eight hours“ = udržet pozornost dlouhou dobu.",
    trap:"Nouzové situace jsou děsivé, ale „your training takes over“. Horko zvládá („The heat I can cope with“).", tt:"distractor"},
  { context:"You hear a girl talking to her teacher.",
    speakers:{"Girl":"G1","Teacher":"F3"},
    lines:[
      {sp:"Girl", t:"Excuse me, Mrs Lane, have you got a minute? It's about the history project."},
      {sp:"Teacher", t:"Of course. Is everything all right with your group?"},
      {sp:"Girl", t:"Yes, the group's fine, we're working well together. It's just that I was ill last week, so I missed two of the sessions in the library. Would it be possible to give mine in next Friday instead of this Friday? I don't want to rush it."},
      {sp:"Teacher", t:"I think that's fair. Just send me an email so I don't forget."}
    ],
    q:"What does the girl want to do?", opts:["move to a different group","get more time for a piece of work","ask for help with her research"], correct:1,
    evidence:"Would it be possible to give mine in next Friday instead of this Friday?",
    why:"Chce odevzdat projekt o týden později – to je „more time for a piece of work“.",
    trap:"Se skupinou je spokojená („the group's fine“). Knihovna zazní jen jako důvod zpoždění, o pomoc s rešerší nežádá.", tt:"inference"},
  { context:"You hear two friends talking about a film they have seen.",
    speakers:{"Woman":"F2","Man":"M1"},
    lines:[
      {sp:"Woman", t:"So, was it worth the ticket price?"},
      {sp:"Man", t:"Mostly. I know people complain that it's nearly three hours long, but I honestly didn't notice the time. The special effects were incredible, as you'd expect. My problem was the ending. I still don't understand what happened to the main character. Did he survive or not?"},
      {sp:"Woman", t:"I think that's the point. You're supposed to decide for yourself."},
      {sp:"Man", t:"Well, I'd rather they'd just told us."}
    ],
    q:"What did the man dislike about the film?", opts:["its ending","its length","its special effects"], correct:0,
    evidence:"My problem was the ending",
    why:"„My problem was the ending“ – nerozumí, co se stalo s hlavní postavou, a radši by to věděl.",
    trap:"Délku kritizují jiní lidé („people complain“), on čas nevnímal. Efekty byly „incredible“.", tt:"distractor"},
  { context:"You hear a woman talking about an app that helped her start running.",
    speakers:{"Woman":"F1"},
    lines:[
      {sp:"Woman", t:"A friend recommended this running app for beginners. It starts you off really gently – running for one minute, walking for two, that kind of thing. For the first couple of weeks, I found the voice telling me to keep going quite annoying, to be honest. But now I'm used to it."},
      {sp:"Woman", t:"Last Saturday I ran for thirty minutes without stopping, which I never thought I'd be able to do. I actually told everyone at work about it on Monday!"}
    ],
    q:"How does the woman feel now?", opts:["proud of what she has achieved","annoyed by the instructions the app gives","bored by how slowly the programme starts"], correct:0,
    evidence:"which I never thought I'd be able to do",
    why:"Uběhla 30 minut bez zastavení, což by nikdy nečekala, a pochlubila se v práci → je hrdá.",
    trap:"Hlas aplikace ji štval jen první dva týdny – „But now I'm used to it“. Pomalý začátek popisuje bez stížnosti.", tt:"change"},
  { context:"You hear a man phoning a sports centre.",
    speakers:{"Man":"M2","Receptionist":"F3"},
    lines:[
      {sp:"Man", t:"Hello, I'm calling about the tennis courts. I booked one for six o'clock this evening, but when we arrived there were already people playing on it, and nobody at reception could explain why. We waited twenty minutes and then went home."},
      {sp:"Man", t:"I'm not trying to book again. I just think you should know that your system isn't working, and I'd like my money back for tonight."},
      {sp:"Receptionist", t:"I'm really sorry about that. Let me check what happened."}
    ],
    q:"Why is the man calling the sports centre?", opts:["to book a tennis court","to make a complaint","to change the time of a booking"], correct:1,
    evidence:"I just think you should know that your system isn't working",
    why:"Stěžuje si: kurt byl obsazený, nikdo nic nevysvětlil, systém nefunguje a chce peníze zpět.",
    trap:"„I'm not trying to book again“ – rezervaci odmítá. Čas šest hodin zmiňuje jen jako fakt, nemění ho.", tt:"distractor"},
  { context:"You hear two students talking about a school trip.",
    speakers:{"Boy":"B1","Girl":"G1"},
    lines:[
      {sp:"Boy", t:"That science museum was much better than I'd expected."},
      {sp:"Girl", t:"I know! I thought it'd be boring, just old machines in glass cases. But you could actually try things out."},
      {sp:"Boy", t:"The guide was a bit dull, though. He just read from his notes."},
      {sp:"Girl", t:"Oh, I thought he was OK. But I wish we'd had longer there. Two hours wasn't enough."},
      {sp:"Boy", t:"Yeah, I agree. We didn't even get to the space section."}
    ],
    q:"What do the students agree about?", opts:["The guide was interesting.","The exhibits were rather old-fashioned.","They would have liked more time there."], correct:2,
    evidence:"I wish we'd had longer there",
    why:"Dívka by chtěla víc času (dvě hodiny nestačily) a chlapec: „Yeah, I agree“ – nestihli ani sekci o vesmíru.",
    trap:"Na průvodce mají různý názor (dull × OK). Staré stroje ve vitrínách dívka jen čekala – ve skutečnosti si šlo věci vyzkoušet.", tt:"distractor"}
]},

{ id:"p1-03", title:"Set 3 · Camping · Animal shelter · Food festival", extracts:[
  { context:"You hear a man talking about a camping trip.",
    speakers:{"Man":"M3"},
    lines:[
      {sp:"Man", t:"We'd checked the forecast before we left, and it said sunshine all weekend, which, for once, turned out to be true. The campsite was lovely, right next to a lake."},
      {sp:"Man", t:"The problem was that I'd borrowed my brother's tent, and I hadn't thought to check it first. When we unpacked it, half the poles were missing. We ended up sleeping in the car, which wasn't much fun for two people over six feet tall!"}
    ],
    q:"What went wrong on the camping trip?", opts:["The weather was bad.","Some equipment was missing.","The campsite was uncomfortable."], correct:1,
    evidence:"half the poles were missing",
    why:"V půjčeném stanu chyběla polovina tyčí – chybělo vybavení, a tak spali v autě.",
    trap:"Předpověď slibovala slunce a „turned out to be true“. Kemp byl „lovely“ – nepohodlné bylo až auto.", tt:"distractor"},
  { context:"You hear two friends talking about a new café.",
    speakers:{"Man":"M1","Woman":"F2"},
    lines:[
      {sp:"Man", t:"Have you been to that new café on the high street yet?"},
      {sp:"Woman", t:"Yes, a few times. It's not cheap, but I don't mind paying a bit more for good coffee."},
      {sp:"Man", t:"I thought the cakes looked amazing."},
      {sp:"Woman", t:"They look better than they taste, honestly. No, what I love about it is that it's so quiet. There's no loud music, so I can sit there for an hour and get on with my studying. It's hard to find anywhere like that in town."}
    ],
    q:"What does the woman like most about the café?", opts:["It's a peaceful place to work.","The cakes are delicious.","The prices are reasonable."], correct:0,
    evidence:"what I love about it is that it's so quiet",
    why:"„What I love about it is that it's so quiet“ – žádná hlasitá hudba, může se tam učit → klidné místo k práci.",
    trap:"Dorty „look better than they taste“. Kavárna „isn't cheap“ – ceny rozumné nejsou.", tt:"distractor"},
  { context:"You hear a girl talking about volunteering at an animal shelter.",
    speakers:{"Girl":"G1"},
    lines:[
      {sp:"Girl", t:"I started at the animal shelter because I needed some volunteering for my school award. I thought I'd be playing with puppies all day, but mostly it's cleaning and feeding, which can be hard work. I don't mind that, though."},
      {sp:"Girl", t:"The best thing is that I've met the vet who comes in every week, and she lets me watch when she checks the animals. Before, I had no idea what I wanted to do after school. Now I'm sure – I'm going to study to be a vet."}
    ],
    q:"What does the girl say about volunteering at the shelter?", opts:["It's mainly playing with the animals.","It has given her a clear aim for the future.","She finds the work too tiring."], correct:1,
    evidence:"Now I'm sure – I'm going to study to be a vet",
    why:"Dřív nevěděla, co po škole; teď je si jistá, že bude studovat veterinu → jasný cíl do budoucna.",
    trap:"Hraní se štěňaty jen čekala – ve skutečnosti uklízí a krmí. Práce je náročná, ale „I don't mind that“.", tt:"change"},
  { context:"You hear a woman leaving a message for a colleague.",
    speakers:{"Woman":"F1"},
    lines:[
      {sp:"Woman", t:"Hi Martin, it's Julia. I'm stuck on a train outside Reading – there's a problem with the signals, and they're saying it could be an hour. So I'm going to miss the start of the meeting with the clients at ten."},
      {sp:"Woman", t:"Could you start without me? You know the project as well as I do. I've already emailed them the report, so they'll have it in front of them. I'll join you as soon as I can."}
    ],
    q:"What does Julia ask Martin to do?", opts:["begin a meeting in her place","email a report to some clients","phone the clients to apologise"], correct:0,
    evidence:"Could you start without me?",
    why:"„Could you start without me?“ – Martin má schůzku s klienty zahájit sám.",
    trap:"Zprávu už klientům poslala sama („I've already emailed them the report“). O omluvném telefonátu neříká nic.", tt:"distractor"},
  { context:"You hear a man talking about a book he has just read.",
    speakers:{"Man":"M2"},
    lines:[
      {sp:"Man", t:"I'm not much of a reader, to be honest. Apart from the books we had to read at school, I've hardly read any novels. I'd seen the film version a few years ago and quite liked it, but it never occurred to me to read the book."},
      {sp:"Man", t:"Then my sister gave it to me for my birthday and said I wouldn't be able to put it down. She was right! I finished it in three days. It's much more detailed than the film, and the ending's completely different."}
    ],
    q:"Why did the man read the book?", opts:["He had enjoyed the film.","He needed it for his studies.","Someone persuaded him to."], correct:2,
    evidence:"my sister gave it to me for my birthday and said I wouldn't be able to put it down",
    why:"Knihu mu darovala sestra a tvrdila, že ji neodloží – to ho přimělo číst.",
    trap:"Film se mu líbil, ale „it never occurred to me to read the book“. Povinná četba byla jen ve škole, dávno.", tt:"distractor"},
  { context:"You hear two people talking about a football match.",
    speakers:{"Man":"M1","Woman":"F3"},
    lines:[
      {sp:"Man", t:"Unlucky about the match on Saturday."},
      {sp:"Woman", t:"Thanks. I thought we'd win easily, to be honest – they're bottom of the league. But they played really well, and we just couldn't score."},
      {sp:"Man", t:"A draw's not a disaster, though."},
      {sp:"Woman", t:"No, I suppose not. And our goalkeeper was brilliant. But we needed those three points to stay in the top two. Now it's going to be really difficult. I'm still annoyed about it."}
    ],
    q:"How does the woman feel about the result?", opts:["relieved that they didn't lose","pleased with her team's performance","disappointed that they didn't win"], correct:2,
    evidence:"I'm still annoyed about it",
    why:"Potřebovali tři body, aby zůstali v první dvojce; remíza jí to komplikuje – „I'm still annoyed about it“.",
    trap:"Na „A draw's not a disaster“ jen neochotně kývne („I suppose not“) – úlevu necítí. Chválí jen brankáře, ne výkon týmu.", tt:"attitude"},
  { context:"You hear an announcement on the radio.",
    speakers:{"Presenter":"F1"},
    lines:[
      {sp:"Presenter", t:"If you're planning to go to the Riverside Food Festival this weekend, please note that it won't be in the park as usual. Because of all the rain we've had, the grass is far too wet, so the organisers have moved everything to the car park of the sports stadium."},
      {sp:"Presenter", t:"The opening times and ticket prices are the same, and there'll still be over forty stalls. Parking will be available in the streets around the stadium, so do allow a bit of extra time."}
    ],
    q:"What is the main purpose of the announcement?", opts:["to tell people about a new location","to advertise cheaper tickets","to warn drivers about traffic jams"], correct:0,
    evidence:"the organisers have moved everything to the car park of the sports stadium",
    why:"Hlavní zpráva: festival se kvůli dešti přesouvá z parku na parkoviště stadionu → nové místo.",
    trap:"Ceny jsou „the same“, ne nižší. „Allow a bit of extra time“ je jen drobná rada k parkování, ne hlavní účel.", tt:"inference"},
  { context:"You hear a boy telling a friend about learning the guitar.",
    speakers:{"Boy":"B1"},
    lines:[
      {sp:"Boy", t:"So I've been having guitar lessons for three months now. My teacher's great – she doesn't make me learn to read music, she just shows me the chords, which suits me fine. I practise every evening, usually for half an hour, and I actually enjoy it."},
      {sp:"Boy", t:"What I'm finding really hard is playing with my friend's band. When I play on my own I'm fine, but with the drums and everything, I lose my place and can't keep up."}
    ],
    q:"What is the boy finding difficult?", opts:["reading music","finding time to practise","playing with other people"], correct:2,
    evidence:"What I'm finding really hard is playing with my friend's band",
    why:"Sám hraje dobře, ale s kapelou se ztrácí a nestíhá → hraní s ostatními.",
    trap:"Noty se učit nemusí. Cvičí každý večer a baví ho to – s časem problém nemá.", tt:"distractor"}
]},

{ id:"p1-04", title:"Set 4 · Countryside · First day at work · School play", extracts:[
  { context:"You hear a woman talking about moving to the countryside.",
    speakers:{"Woman":"F3"},
    lines:[
      {sp:"Woman", t:"We moved out of the city last spring, and on the whole I don't regret it. The air's cleaner, the kids have a garden, and the neighbours are friendly. People ask whether I miss the shops and restaurants, but there's a decent town twenty minutes away, so that's fine."},
      {sp:"Woman", t:"What I really miss is being able to get anywhere without a car. In the city there was a bus every five minutes. Here there are two a day, so I spend half my life driving the children around."}
    ],
    q:"What does the woman miss about living in the city?", opts:["good public transport","the variety of shops","her friendly neighbours"], correct:0,
    evidence:"What I really miss is being able to get anywhere without a car",
    why:"Chybí jí, že se všude dostala bez auta – ve městě jel autobus každých pět minut → dobrá veřejná doprava.",
    trap:"Obchody jí nechybí – město je 20 minut daleko. Přátelští sousedé jsou naopak na venkově.", tt:"distractor"},
  { context:"You hear two friends talking about a party.",
    speakers:{"Woman":"F1","Man":"M2"},
    lines:[
      {sp:"Woman", t:"You left the party early on Saturday. Weren't you having fun?"},
      {sp:"Man", t:"Not really. Oh, the music was great, and the food was amazing. It's just that apart from Tom, I didn't know a single person there, and Tom spent the whole evening in the kitchen talking to his girlfriend."},
      {sp:"Woman", t:"You should have come and found me!"},
      {sp:"Man", t:"I didn't know you were there! Anyway, I said I had a headache and went home."}
    ],
    q:"Why did the man leave the party early?", opts:["He wasn't feeling well.","He felt left out.","He didn't like the music."], correct:1,
    evidence:"apart from Tom, I didn't know a single person there",
    why:"Kromě Toma nikoho neznal a Tom se mu nevěnoval → cítil se odstrčený, osamělý.",
    trap:"Bolest hlavy byla jen výmluva („I said I had a headache“). Hudba byla „great“.", tt:"inference"},
  { context:"You hear a man talking about his first day in a new job.",
    speakers:{"Man":"M1"},
    lines:[
      {sp:"Man", t:"I'd been warned that my new boss was quite strict, so I was expecting to be given loads of work straight away. But actually, I spent most of the morning just being shown around and having coffee with different people."},
      {sp:"Man", t:"Everyone came over to introduce themselves, and three people offered to have lunch with me. In my last job nobody spoke to me for a week! The office itself is a bit old-fashioned, but that doesn't matter."}
    ],
    q:"What surprised the man on his first day?", opts:["how welcoming his colleagues were","how much work he was given","how modern the office was"], correct:0,
    evidence:"Everyone came over to introduce themselves",
    why:"Všichni se přišli představit a tři lidé ho zvali na oběd – oproti minulé práci velké a příjemné překvapení.",
    trap:"Čekal hodně práce, ale celé dopoledne ho jen provázeli. Kancelář je „a bit old-fashioned“, ne moderní.", tt:"distractor"},
  { context:"You hear a girl talking about a school play she was in.",
    speakers:{"Girl":"G1"},
    lines:[
      {sp:"Girl", t:"I only had a small part in the school play, just a few lines, but I was terrified beforehand. My hands were shaking. And then, in the second scene, I completely forgot one of my lines! Luckily, the boy next to me whispered it, and I don't think anyone in the audience noticed."},
      {sp:"Girl", t:"When it was over, I didn't feel proud or anything – I was just so glad it had finished and I hadn't ruined the whole thing."}
    ],
    q:"How did the girl feel after the play?", opts:["proud of her performance","embarrassed about her mistake","relieved that she had got through it"], correct:2,
    evidence:"I was just so glad it had finished",
    why:"„So glad it had finished and I hadn't ruined the whole thing“ = úleva, že to přežila bez katastrofy.",
    trap:"Hrdost výslovně popírá („I didn't feel proud“). Zapomenutou repliku nikdo nepostřehl, takže stud nezmiňuje.", tt:"distractor"},
  { context:"You hear two colleagues talking about a meeting.",
    speakers:{"Man":"M3","Woman":"F1"},
    lines:[
      {sp:"Man", t:"That was a long meeting, wasn't it?"},
      {sp:"Woman", t:"It was, but I don't mind long meetings if something gets decided. The problem is that nothing did. We talked about the new website for two hours and we're exactly where we started."},
      {sp:"Man", t:"Well, at least we heard what the designers think."},
      {sp:"Woman", t:"We could have read that in an email. Honestly, I don't know why we all had to be there."}
    ],
    q:"What is the woman's opinion of the meeting?", opts:["It went on for too long.","It was a waste of time.","It was useful for hearing other people's views."], correct:1,
    evidence:"I don't know why we all had to be there",
    why:"Nic se nerozhodlo a názory designérů mohli číst v e-mailu → schůzka byla zbytečná.",
    trap:"Délka jí nevadí („I don't mind long meetings“). Užitečnost vidí muž, ona ji odmítá.", tt:"attitude"},
  { context:"You hear a man talking about a bus tour.",
    speakers:{"Man":"M2"},
    lines:[
      {sp:"Man", t:"We took a bus tour round the city on our first day. The bus itself was a bit old and the seats weren't very comfortable, but the guide was the star of the show."},
      {sp:"Man", t:"She knew so much – not just dates and names, but funny stories about the people who'd lived in all the buildings we passed. Everyone on the bus was laughing. I'd recommend it, even though it's not the cheapest tour you can do."}
    ],
    q:"What did the man think of the tour guide?", opts:["She made the tour entertaining.","She gave too many facts and dates.","She was difficult to hear on the old bus."], correct:0,
    evidence:"the guide was the star of the show",
    why:"Průvodkyně byla „hvězdou“ – vtipné historky, celý autobus se smál → prohlídka byla zábavná.",
    trap:"„Not just dates and names“ – nejen fakta. Starý autobus kritizuje kvůli sedadlům, ne kvůli slyšitelnosti.", tt:"paraphrase"},
  { context:"You hear a woman talking to a shop assistant.",
    speakers:{"Woman":"F2","Assistant":"M1"},
    lines:[
      {sp:"Woman", t:"Hi, I bought this jacket here last week. It's the right size and everything, and I love the colour, but look – the zip's broken already. It only lasted three days."},
      {sp:"Assistant", t:"Oh dear, I'm sorry about that. Would you like a new one, or your money back?"},
      {sp:"Woman", t:"I'd rather have my money back, please. I don't really want to risk it happening again."}
    ],
    q:"What does the woman want?", opts:["a jacket in another size","a jacket in a different colour","a refund for a faulty item"], correct:2,
    evidence:"I'd rather have my money back, please",
    why:"Zip se rozbil po třech dnech; místo nové bundy chce peníze zpět = refund za vadné zboží.",
    trap:"Velikost i barva jsou v pořádku („the right size“, „I love the colour“).", tt:"distractor"},
  { context:"You hear two friends planning a holiday.",
    speakers:{"Woman":"F2","Man":"M1"},
    lines:[
      {sp:"Woman", t:"So, for the trip in August – are we camping or not?"},
      {sp:"Man", t:"Well, camping's the cheapest, but if it rains for a week, we'll be miserable."},
      {sp:"Woman", t:"True. A hotel would be nice, but they're so expensive in the summer."},
      {sp:"Man", t:"What about renting a flat? If we split it four ways, it's not much more than camping, and we can cook our own meals."},
      {sp:"Woman", t:"That's a good point. Let's do that. I'll look online tonight."}
    ],
    q:"Where do the friends decide to stay?", opts:["in a tent","in a hotel","in self-catering accommodation"], correct:2,
    evidence:"What about renting a flat?",
    why:"Muž navrhne pronájem bytu (můžou si vařit = self-catering) a žena souhlasí „Let's do that“.",
    trap:"Stan zamítnou kvůli dešti, hotel kvůli ceně – obojí zazní jako první, ale nakonec ne.", tt:"change"}
]}
);
})(window.DATA.listening);

/* ===================================================================================== PART 1 (sets 5–8) */
(function(L){
"use strict";
L.p1.push(
{ id:"p1-05", title:"Set 5 · New gym · Sleepover · Grandmother", extracts:[
  { context:"You hear a man talking about joining a gym.",
    speakers:{"Man":"M1"},
    lines:[
      {sp:"Man", t:"I'd been meaning to get fit for ages, and there are loads of gyms near my office, but I never got round to joining one. Then this new place opened at the end of my street."},
      {sp:"Man", t:"It's not the cheapest – actually, it's more expensive than my friend's gym – but I can be there in two minutes, so I've got no excuse. I go every morning before breakfast now."}
    ],
    q:"Why did the man choose this gym?", opts:["It's close to his home.","It's cheaper than other gyms.","A friend recommended it."], correct:0,
    evidence:"I can be there in two minutes",
    why:"Posilovna otevřela na konci jeho ulice a je tam za dvě minuty → je blízko domova.",
    trap:"Posiloven u kanceláře je hodně, ale do žádné nechodil. Je dražší než posilovna kamaráda – kamarád ji nedoporučil.", tt:"distractor"},
  { context:"You hear a girl talking to her father.",
    speakers:{"Girl":"G1","Father":"M3"},
    lines:[
      {sp:"Girl", t:"Dad, you know it's Ellie's birthday on Saturday?"},
      {sp:"Father", t:"Yes, you're going to the cinema, aren't you?"},
      {sp:"Girl", t:"We were, but now her mum says we can all sleep over at their house afterwards. Is that OK? Her mum will drive us home on Sunday morning."},
      {sp:"Father", t:"I suppose so, as long as you've done your homework first."},
      {sp:"Girl", t:"I'll do it on Friday, I promise!"}
    ],
    q:"What is the girl asking her father?", opts:["if she can go to the cinema","if she can spend the night at a friend's house","if he can give her a lift home"], correct:1,
    evidence:"now her mum says we can all sleep over at their house afterwards",
    why:"Ptá se, jestli může u Ellie přespat („sleep over“) – to je ta nová prosba.",
    trap:"Kino už je domluvené („you're going to the cinema, aren't you?“). Domů je odveze Elliina máma, ne táta.", tt:"inference"},
  { context:"You hear a woman talking about gardening.",
    speakers:{"Woman":"F3"},
    lines:[
      {sp:"Woman", t:"I only started gardening during the summer holidays because I had a bit of free time. I thought it would save me money on vegetables, but by the time I'd bought the seeds, the tools and the compost, it cost me more than the supermarket!"},
      {sp:"Woman", t:"It doesn't matter, though. Half an hour in the garden after work, with my hands in the soil, and all the stress of the day just disappears."}
    ],
    q:"What does the woman say about gardening?", opts:["It helps her to relax.","It has saved her money.","It takes up too much of her time."], correct:0,
    evidence:"all the stress of the day just disappears",
    why:"Po práci na zahradě „all the stress of the day just disappears“ → pomáhá jí odpočinout si.",
    trap:"Myslela, že ušetří, ale nakonec to stálo víc než v supermarketu. Půl hodiny denně není „too much time“.", tt:"change"},
  { context:"You hear two friends talking about someone they know.",
    speakers:{"Woman":"F1","Man":"M2"},
    lines:[
      {sp:"Woman", t:"Did you hear that Jake won the photography competition?"},
      {sp:"Man", t:"Yes! I'm so pleased for him. To be honest, I didn't think he'd even enter. He's always saying his photos aren't good enough."},
      {sp:"Woman", t:"I know. I had to really push him to send it in. He took that photo of the old fishing boat ages ago."},
      {sp:"Man", t:"Well, I'm glad you did. It really deserved to win."}
    ],
    q:"What do we learn about Jake?", opts:["He took the photo especially for the competition.","He lacks confidence in his work.","He has won competitions before."], correct:1,
    evidence:"He's always saying his photos aren't good enough",
    why:"Jake pořád tvrdí, že jeho fotky nejsou dost dobré, a soutěže se musel „dotlačit“ → nevěří si.",
    trap:"Fotku lodi pořídil „ages ago“, ne pro soutěž. O dřívějších výhrách nic – naopak se nečekalo, že se vůbec přihlásí.", tt:"inference"},
  { context:"You hear a man talking to a group of new students.",
    speakers:{"Man":"M3"},
    lines:[
      {sp:"Man", t:"Welcome, everyone. Just a few things before you start. You can borrow up to six items at a time, for three weeks. If you need longer, you can renew them online. The quiet study area is upstairs – please keep your phones on silent there."},
      {sp:"Man", t:"The computers on this floor can be booked for an hour at a time at the front desk. And if you need any help finding information for your projects, just ask any of us."}
    ],
    q:"Where is the man speaking?", opts:["in a library","in a bookshop","in a computer shop"], correct:0,
    evidence:"You can borrow up to six items at a time",
    why:"Půjčování na tři týdny, prodlužování online, studovna – to je knihovna.",
    trap:"V knihkupectví se nepůjčuje. Počítače se tu jen rezervují na hodinu, neprodávají se.", tt:"inference"},
  { context:"You hear a woman talking about her grandmother.",
    speakers:{"Woman":"F2"},
    lines:[
      {sp:"Woman", t:"My grandmother's eighty-five, and she's amazing. She still makes the best apple pie in the world, and she's always been very patient with us grandchildren. But what I really admire is that she never stops trying new things."},
      {sp:"Woman", t:"Last year she learnt to use a tablet so she could video-call my cousin in Australia, and this year she's joined a dance class. I hope I'm like that at her age."}
    ],
    q:"What does the woman admire most about her grandmother?", opts:["her cooking skills","her patience with children","her willingness to learn"], correct:2,
    evidence:"what I really admire is that she never stops trying new things",
    why:"„What I really admire“ – babička pořád zkouší nové věci: tablet, taneční kurz → ochota učit se.",
    trap:"Jablečný koláč a trpělivost zazní jako první, ale „But what I really admire…“ přichází až potom.", tt:"distractor"},
  { context:"You hear two friends talking about learning a language.",
    speakers:{"Woman":"F1","Man":"M1"},
    lines:[
      {sp:"Woman", t:"I hear you've signed up for Spanish classes. Is it for work?"},
      {sp:"Man", t:"Everyone asks that! My company does a lot of business in Mexico, but no, I won't need it. My girlfriend's from Madrid, and her parents don't speak any English. Every time we visit, I just sit there smiling and nodding. I'd love to have a proper conversation with them."},
      {sp:"Woman", t:"That's a great reason. And you'll be able to use it on holiday too."}
    ],
    q:"Why does the man want to learn Spanish?", opts:["to help him at work","to make holidays easier","to communicate with his girlfriend's family"], correct:2,
    evidence:"her parents don't speak any English",
    why:"Rodiče přítelkyně nemluví anglicky a on se s nimi chce normálně bavit.",
    trap:"Práce: „no, I won't need it“. Dovolenou zmiňuje žena jako bonus, není to jeho důvod.", tt:"distractor"},
  { context:"You hear a chef talking about his restaurant.",
    speakers:{"Chef":"M2"},
    lines:[
      {sp:"Chef", t:"When we opened, lots of people told me we'd never survive. The rent here is high, and there are three other Italian restaurants on this street. But we do one thing they don't."},
      {sp:"Chef", t:"Every vegetable, every herb we use comes from our own farm, just ten miles away. We pick it in the morning and it's on the plate by lunchtime. Customers can really taste the difference. Our prices are about the same as everyone else's."}
    ],
    q:"According to the chef, what makes his restaurant special?", opts:["its low prices","its location","its fresh ingredients"], correct:2,
    evidence:"Every vegetable, every herb we use comes from our own farm",
    why:"Zelenina a bylinky z vlastní farmy – ráno utržené, v poledne na talíři → čerstvé suroviny.",
    trap:"Ceny jsou „about the same“ jako jinde. Ulice s vysokým nájmem a třemi dalšími restauracemi je spíš nevýhoda.", tt:"distractor"}
]},

{ id:"p1-06", title:"Set 6 · Pizza job · Neighbours · Phone-in", extracts:[
  { context:"You hear a boy talking about his part-time job.",
    speakers:{"Boy":"B1"},
    lines:[
      {sp:"Boy", t:"I work in a pizza place on Saturdays. The pay's not great, if I'm honest, and I always go home smelling of cheese. We do get a free pizza at the end of the shift, which is nice."},
      {sp:"Boy", t:"But the main reason I've stayed so long is the people I work with. We have such a laugh, even when it's really busy, and a couple of them have become my best friends."}
    ],
    q:"What does the boy like most about his job?", opts:["the people he works with","the money he earns","the free food"], correct:0,
    evidence:"the main reason I've stayed so long is the people I work with",
    why:"Hlavní důvod, proč tam zůstává, jsou kolegové – zažijí spoustu legrace, dva jsou jeho nejlepší kamarádi.",
    trap:"Plat „not great“. Pizza zdarma je „nice“, ale „But the main reason…“ je jinde.", tt:"distractor"},
  { context:"You hear a woman talking about her neighbours.",
    speakers:{"Woman":"F3"},
    lines:[
      {sp:"Woman", t:"Our neighbours are lovely people, really. They've got a dog that barks sometimes, but it doesn't bother me. And they're quiet – no loud parties or anything."},
      {sp:"Woman", t:"The only thing is, they've got three cars, and every evening one of them ends up in front of our house. So when I get back from work, I have to park miles away and carry my shopping all the way home. I'm going to have to say something soon."}
    ],
    q:"What is the woman's problem with her neighbours?", opts:["They make too much noise.","Their dog is badly behaved.","They take her parking space."], correct:2,
    evidence:"every evening one of them ends up in front of our house",
    why:"Jedno z jejich tří aut stojí každý večer před jejím domem, takže musí parkovat daleko.",
    trap:"Pes občas štěká, ale „it doesn't bother me“. Sousedé jsou tiší – žádné večírky.", tt:"distractor"},
  { context:"You hear two friends talking about a book club.",
    speakers:{"Man":"M1","Woman":"F2"},
    lines:[
      {sp:"Man", t:"How's the book club going?"},
      {sp:"Woman", t:"Really well! I mainly joined because I'd just moved here and didn't know anyone. I've always read a lot anyway, so that wasn't the point. A woman from work told me about it, but she never actually comes herself!"},
      {sp:"Man", t:"And have you made friends?"},
      {sp:"Woman", t:"Yes, we go for a meal together after every meeting now. Although, to be honest, we sometimes forget to talk about the book!"}
    ],
    q:"Why did the woman join the book club?", opts:["to make new friends","to read more books","to please a friend"], correct:0,
    evidence:"I'd just moved here and didn't know anyone",
    why:"Právě se přistěhovala a nikoho neznala → chtěla poznat lidi.",
    trap:"Číst víc nepotřebovala – „that wasn't the point“. Kolegyně jí o klubu jen řekla, sama tam ani nechodí.", tt:"distractor"},
  { context:"You hear a man talking about selling his car.",
    speakers:{"Man":"M3"},
    lines:[
      {sp:"Man", t:"Lots of people think I sold my car to save money, and it's true that it was costing me a fortune. But that's not really why. When we moved to the city centre, I realised I hardly ever used it."},
      {sp:"Man", t:"Everything's within walking distance, and parking's a nightmare anyway. It just sat outside the flat for weeks. Now I walk everywhere, and I've lost a few kilos too, which is a nice bonus."}
    ],
    q:"Why did the man sell his car?", opts:["It cost too much to run.","He wanted to get fitter.","He no longer needed it."], correct:2,
    evidence:"I realised I hardly ever used it",
    why:"V centru má vše v docházkové vzdálenosti, auto týdny jen stálo → už ho nepotřeboval.",
    trap:"Peníze: „that's not really why“. Shozená kila jsou jen „a nice bonus“, ne důvod.", tt:"distractor"},
  { context:"You hear a girl talking to a friend about a test.",
    speakers:{"Girl":"G1","Boy":"B1"},
    lines:[
      {sp:"Girl", t:"I can't believe the maths test is tomorrow. I've been revising all week, and I understand most of it now, but there's one topic – the graphs – that I still don't get. Every time I look at it, my mind goes blank. I'm not going to sleep tonight, I just know it."},
      {sp:"Boy", t:"You'll be fine. Do you want me to go through it with you?"},
      {sp:"Girl", t:"Would you? That would be great."}
    ],
    q:"How does the girl feel about the test?", opts:["anxious about part of it","confident that she'll do well","annoyed that she has to take it"], correct:0,
    evidence:"there's one topic – the graphs – that I still don't get",
    why:"Většině rozumí, ale grafy jí nejdou a bojí se jich tak, že nebude spát → úzkost z části testu.",
    trap:"„I understand most of it now“ zní sebejistě, ale jen o části látky. Na test samotný se nezlobí.", tt:"attitude"},
  { context:"You hear two colleagues talking about their new manager.",
    speakers:{"Woman":"F1","Man":"M2"},
    lines:[
      {sp:"Woman", t:"What do you think of the new manager?"},
      {sp:"Man", t:"Well, she's certainly organised. Did you see the timetable she gave us? Every task, every deadline."},
      {sp:"Woman", t:"Yes, it's very clear. I know exactly what I'm doing this week, which makes a change."},
      {sp:"Man", t:"She's not very chatty, though. She hardly said good morning, and she ate her lunch at her desk."},
      {sp:"Woman", t:"Oh, I think she's just shy. Give her time. And she's not strict at all – she let Paul go home early yesterday."}
    ],
    q:"What do the colleagues agree about the new manager?", opts:["She is very friendly.","She plans things well.","She is too strict."], correct:1,
    evidence:"Yes, it's very clear",
    why:"Muž: „she's certainly organised“ (rozpis úkolů a termínů), žena: „Yes, it's very clear“ → shoda, že dobře plánuje.",
    trap:"Přátelská podle muže není („not very chatty“), žena ji omlouvá ostýchavostí – neshodnou se. Přísná podle ženy není („not strict at all“).", tt:"paraphrase"},
  { context:"You hear a man talking about a long walk he did.",
    speakers:{"Man":"M1"},
    lines:[
      {sp:"Man", t:"We walked the whole coast path – two weeks, nearly three hundred kilometres. Everyone warned me about the weather, but we were lucky, it only rained twice. My feet were fine too, thanks to good boots."},
      {sp:"Man", t:"What nearly made me give up was my rucksack. I'd packed far too much – books, spare shoes, a cooking set – and on the hills it felt like carrying a small child. In the end I posted half of it home."}
    ],
    q:"What did the man find most difficult?", opts:["the bad weather","the weight of his luggage","pain in his feet"], correct:1,
    evidence:"What nearly made me give up was my rucksack",
    why:"Málem to vzdal kvůli batohu – zabalil moc věcí, do kopce to bylo jako nést dítě → váha zavazadla.",
    trap:"Pršelo jen dvakrát („we were lucky“) a nohy byly v pořádku díky botám.", tt:"distractor"},
  { context:"You hear a woman calling a radio programme.",
    speakers:{"Presenter":"M3","Caller":"F2"},
    lines:[
      {sp:"Presenter", t:"And we've got Lisa on the line. Hi Lisa, what would you like to say?"},
      {sp:"Caller", t:"Hi. I was listening to your discussion about school uniforms earlier, and I just wanted to say that I completely disagree with your last caller. When I was at school, uniforms meant nobody got teased for wearing cheap clothes. I think they make things fairer for everybody."},
      {sp:"Presenter", t:"Thanks, Lisa. And would you like us to play a song for you?"},
      {sp:"Caller", t:"Oh, anything by the Beatles, please!"}
    ],
    q:"Why has Lisa called the programme?", opts:["to ask for a song to be played","to get advice about her children's school","to share her view on a topic"], correct:2,
    evidence:"I completely disagree with your last caller",
    why:"Volá kvůli diskusi o uniformách – nesouhlasí s předchozím volajícím a říká svůj názor.",
    trap:"Píseň si vybere, až když se moderátor zeptá – není to důvod hovoru. O radu nežádá.", tt:"inference"}
]},

{ id:"p1-07", title:"Set 7 · Swimming · Train station · Climbing", extracts:[
  { context:"You hear a woman talking about learning to swim as an adult.",
    speakers:{"Woman":"F1"},
    lines:[
      {sp:"Woman", t:"I never learnt to swim as a child, and for years it didn't really matter. Even on beach holidays I just sat on the sand. My doctor kept saying swimming would be good for my back, but I always found an excuse."},
      {sp:"Woman", t:"What finally changed my mind was my son. He started lessons last year, and he kept asking me to come in the pool with him. I couldn't keep saying no. Now we go together every Sunday."}
    ],
    q:"Why did the woman decide to learn to swim?", opts:["She wanted to swim with her son.","Her doctor advised her to.","She was going on holiday."], correct:0,
    evidence:"What finally changed my mind was my son",
    why:"Syn ji pořád zval do bazénu a ona nemohla stále odmítat – „What finally changed my mind was my son“.",
    trap:"Lékař jí plavání doporučoval, ale „I always found an excuse“. Na dovolené jen seděla na písku.", tt:"distractor"},
  { context:"You hear two friends talking about a website.",
    speakers:{"Woman":"F2","Man":"M1"},
    lines:[
      {sp:"Woman", t:"Have you tried that website for second-hand clothes? I've just sold three jackets on it."},
      {sp:"Man", t:"No. Isn't it complicated?"},
      {sp:"Woman", t:"Not at all. You take a photo, write a couple of lines, and that's it. The best thing is that the money goes straight into your bank account, so you don't have to meet strangers. I used to sell things at the market on Sundays, and it took all day."},
      {sp:"Man", t:"Sounds good. I've got loads of stuff I never wear."}
    ],
    q:"What does the woman like best about the website?", opts:["It's quick to put things on it.","It saves her from meeting buyers.","It gets her better prices than the market."], correct:1,
    evidence:"you don't have to meet strangers",
    why:"„The best thing is…“ – peníze přijdou na účet a nemusí se potkávat s cizími lidmi.",
    trap:"Jednoduchost zmíní taky, ale signál „the best thing“ patří k setkávání. O lepších cenách nemluví – trh jen zabral celý den.", tt:"paraphrase"},
  { context:"You hear a teacher talking about his job.",
    speakers:{"Teacher":"M2"},
    lines:[
      {sp:"Teacher", t:"People always say teachers have long holidays, and yes, that's nice, but it's not why I do it. And the pay's not amazing. For me, the best moment is when a student who's been struggling for weeks suddenly understands something. You can see it in their face."},
      {sp:"Teacher", t:"Last week a boy who's always hated maths came up to me and said he'd actually enjoyed the lesson. That made my whole year."}
    ],
    q:"What does the teacher find most rewarding?", opts:["having long holidays","being well paid","seeing students make progress"], correct:2,
    evidence:"the best moment is when a student who's been struggling for weeks suddenly understands something",
    why:"Nejvíc ho těší, když student, který dlouho tápal, konečně pochopí – tedy pokrok žáků.",
    trap:"Prázdniny „that's nice, but it's not why I do it“. Plat „not amazing“.", tt:"distractor"},
  { context:"You hear two people talking at a railway station.",
    speakers:{"Woman":"F3","Man":"M3"},
    lines:[
      {sp:"Woman", t:"Platform four, it says. But the board says the train's delayed."},
      {sp:"Man", t:"Delayed? Let me look. Oh no – it says cancelled now. Look, it's just changed."},
      {sp:"Woman", t:"You're joking. That's the last direct train today."},
      {sp:"Man", t:"We could get the one to Bristol and change there. It leaves in ten minutes from platform two."},
      {sp:"Woman", t:"OK, let's do that. We'll get home about an hour later than we planned, but at least we'll get there. Come on, quickly."}
    ],
    q:"What problem do the speakers have?", opts:["They are waiting on the wrong platform.","Their train will not run.","They have missed their train."], correct:1,
    evidence:"it says cancelled now",
    why:"Vlak byl nejdřív zpožděný, pak zrušený („cancelled“) → nepojede.",
    trap:"Nástupiště 2 je pro náhradní vlak do Bristolu – na špatném nástupišti nečekají. Vlak jim neujel.", tt:"paraphrase"},
  { context:"You hear a girl talking about climbing.",
    speakers:{"Girl":"G1"},
    lines:[
      {sp:"Girl", t:"I started climbing because my brother did it, and at first I was pretty bad. I'm better now, but I'm not one of the best in my club or anything. And it's not really a team thing – you're on your own on the wall."},
      {sp:"Girl", t:"What I love is that when I'm halfway up, I can't think about anything else. School, exams, arguments with my friends – it all goes away. It's the only time my head feels completely clear."}
    ],
    q:"Why does the girl enjoy climbing?", opts:["She is better at it than most people.","It is a good way to make friends.","It takes her mind off her problems."], correct:2,
    evidence:"it all goes away",
    why:"Ve stěně nemyslí na školu, zkoušky ani hádky – všechno zmizí → odreaguje se od starostí.",
    trap:"Nejlepší v klubu není. Lezení není týmový sport – „you're on your own“.", tt:"paraphrase"},
  { context:"You hear a woman talking on the phone.",
    speakers:{"Woman":"F1"},
    lines:[
      {sp:"Woman", t:"Hello, it's Anna Price. I've got an appointment with you on Thursday at four. I'm really sorry, but I've got to work late that day – we've got a big meeting with some clients. Have you got anything on Friday instead? I'm free all morning."},
      {sp:"Woman", t:"Eleven o'clock? Perfect. And could I see Jo again, please? She did a lovely job last time – everyone said my hair looked great. Thanks so much. See you on Friday, then."}
    ],
    q:"Who is the woman talking to?", opts:["a receptionist at a hairdresser's","a receptionist at a dentist's","a colleague at work"], correct:0,
    evidence:"everyone said my hair looked great",
    why:"Přesouvá termín a chce znovu Jo, protože jí minule vlasy udělala skvěle → volá do kadeřnictví.",
    trap:"„Appointment“ svádí k zubaři, ale klíčem jsou vlasy. Práce zazní jen jako důvod přesunu.", tt:"inference"},
  { context:"You hear a man talking about a holiday in Scotland.",
    speakers:{"Man":"M1"},
    lines:[
      {sp:"Man", t:"We spent a week in the Highlands in May. Everyone talks about the scenery, and yes, the mountains were beautiful, when we could see them through the clouds! The food was better than I expected, too."},
      {sp:"Man", t:"But the highlight was definitely the boat trip we took on the last day. We saw dolphins swimming right next to the boat, and later a group of seals lying on the rocks. I'll never forget it."}
    ],
    q:"What did the man enjoy most about his holiday?", opts:["seeing wild animals","the mountain views","the local food"], correct:0,
    evidence:"the highlight was definitely the boat trip",
    why:"Vrcholem byl výlet lodí – delfíni a tuleni → divoká zvířata.",
    trap:"Hory byly často v mracích, jídlo jen „better than I expected“. „But the highlight…“ přichází až potom.", tt:"distractor"},
  { context:"You hear two students talking about a project.",
    speakers:{"Boy":"B1","Girl":"G1"},
    lines:[
      {sp:"Boy", t:"How's the project going? I've finished the bit about the history of the town."},
      {sp:"Girl", t:"Great. I've done the interviews, but I'm worried about Max. He said he'd do the photos, and he hasn't even started."},
      {sp:"Boy", t:"He always leaves things to the last minute."},
      {sp:"Girl", t:"I know. But the deadline's on Monday! I think one of us should just do it."},
      {sp:"Boy", t:"Let's give him until tomorrow."}
    ],
    q:"What is the girl worried about?", opts:["The interviews are not finished.","The deadline has been changed.","One member of the group is behind."], correct:2,
    evidence:"He said he'd do the photos, and he hasn't even started",
    why:"Max měl dělat fotky a ještě nezačal → jeden člen skupiny je pozadu.",
    trap:"Rozhovory už má hotové („I've done the interviews“). Termín je pondělí – nikdo ho nezměnil.", tt:"distractor"}
]},

{ id:"p1-08", title:"Set 8 · Music festival · Job interview · Marathon", extracts:[
  { context:"You hear a man talking about a music festival.",
    speakers:{"Man":"M2"},
    lines:[
      {sp:"Man", t:"It was my first time at a big music festival, and I'd heard horror stories – mud everywhere, terrible toilets, expensive food. Actually, the food was reasonable, and the weather was dry all weekend."},
      {sp:"Man", t:"The only real downside was how many people there were. Getting to the front for the main bands was impossible, and it took forty minutes just to get a drink. I'd still go again, though."}
    ],
    q:"What disappointed the man about the festival?", opts:["the number of people","the price of the food","the weather conditions"], correct:0,
    evidence:"The only real downside was how many people there were",
    why:"Jediná skutečná nevýhoda byly davy – nedostal se dopředu a na pití čekal 40 minut.",
    trap:"Drahé jídlo a bláto jsou „horror stories“, které jen slyšel; ve skutečnosti jídlo „reasonable“ a sucho.", tt:"distractor"},
  { context:"You hear two friends talking about getting a dog.",
    speakers:{"Man":"M3","Woman":"F1"},
    lines:[
      {sp:"Man", t:"So you're really getting a dog?"},
      {sp:"Woman", t:"I think so. Everyone says it's because I live alone and want company, but I've got plenty of friends. It's more that I sit at a computer all day, and I need a reason to go outside. A dog will make me go for a walk twice a day, whatever the weather."},
      {sp:"Man", t:"They're a lot of work, though."},
      {sp:"Woman", t:"I know. I've thought about it carefully."}
    ],
    q:"Why does the woman want a dog?", opts:["She feels lonely.","She wants to be more active.","She has always loved animals."], correct:1,
    evidence:"I need a reason to go outside",
    why:"Celý den sedí u počítače a pes ji donutí chodit ven dvakrát denně → chce se víc hýbat.",
    trap:"Samotu si myslí „everyone“, ona ji odmítá („I've got plenty of friends“).", tt:"distractor"},
  { context:"You hear a woman talking about a job interview.",
    speakers:{"Woman":"F2"},
    lines:[
      {sp:"Woman", t:"I'd prepared for weeks, read everything about the company, practised my answers. And the first part went really well. Then they asked me to give a short presentation, which nobody had mentioned."},
      {sp:"Woman", t:"I hadn't got anything ready, so I just talked about a project I'd done at university. I don't think it was terrible, but I'm sure the other candidates were better prepared. I'm trying not to get my hopes up."}
    ],
    q:"How does the woman feel about her interview?", opts:["confident that she'll get the job","angry that she wasn't told about the presentation","unsure about how well she did"], correct:2,
    evidence:"I'm trying not to get my hopes up",
    why:"Prezentace prý nebyla hrozná, ale ostatní byli asi lépe připravení – nechce si dělat naděje → neví, jak dopadla.",
    trap:"První část šla dobře, ale celkově sebejistá není. Prezentaci nikdo nezmínil – konstatuje to, ale nezlobí se.", tt:"attitude"},
  { context:"You hear two people talking in a shop.",
    speakers:{"Woman":"F3","Man":"M1"},
    lines:[
      {sp:"Woman", t:"What about this scarf? Your mum likes blue."},
      {sp:"Man", t:"She does, but she's got about ten scarves already. I want to get her something different this year."},
      {sp:"Woman", t:"How about one of these cookery books? She's always trying new recipes."},
      {sp:"Man", t:"Hmm, that's a good idea. This one about Indian food looks great. And it's half price!"},
      {sp:"Woman", t:"Perfect. Shall we get her a birthday card as well?"},
      {sp:"Man", t:"Yes, she'd like that. Then let's pay and go and get a coffee."}
    ],
    q:"What are the speakers doing?", opts:["looking for a gift","returning something they bought","comparing prices in different shops"], correct:0,
    evidence:"I want to get her something different this year",
    why:"Vybírají dárek pro mámu – šálu zamítnou, nakonec kuchařku.",
    trap:"„Half price“ je jen bonus u kuchařky, ceny v různých obchodech neporovnávají.", tt:"inference"},
  { context:"You hear a man talking about his first marathon.",
    speakers:{"Man":"M2"},
    lines:[
      {sp:"Man", t:"I'd trained for six months, so I knew I could finish. My plan was to run it in under four hours. Everything went well until about kilometre thirty, when my legs just stopped working. I walked quite a lot of the last part."},
      {sp:"Man", t:"I finished in four hours twenty, so I missed my target, but honestly, I don't care. Crossing that finish line was one of the best moments of my life."}
    ],
    q:"How does the man feel about his marathon?", opts:["disappointed with his time","pleased that he completed it","surprised that he had to walk"], correct:1,
    evidence:"Crossing that finish line was one of the best moments of my life",
    why:"Cíl nesplnil, ale „I don't care“ – proběhnutí cílem byl jeden z nejlepších okamžiků života.",
    trap:"Čas 4:20 je pod jeho plánem, ale zklamání popírá. Chůzi jen popisuje, nepřekvapila ho.", tt:"attitude"},
  { context:"You hear a woman talking to a group of people.",
    speakers:{"Woman":"F1"},
    lines:[
      {sp:"Woman", t:"OK, everyone, welcome to your first day. Your ID cards will open the main door and the staff room, but not the storeroom – only managers can go in there. Lunch is from twelve to one, but please check the rota, because we can't all go at once."},
      {sp:"Woman", t:"The customers come first, so if someone needs help, stop what you're doing. And don't forget, your uniform must be clean every day."}
    ],
    q:"Who is the woman talking to?", opts:["new members of staff","a group of customers","some managers"], correct:0,
    evidence:"Your ID cards will open the main door and the staff room",
    why:"První den, karty do místnosti pro zaměstnance, rozpis obědů, uniformy → noví zaměstnanci.",
    trap:"Zákazníci jsou ti, kterým mají pomáhat. Do skladu smějí jen manažeři – posluchači tedy manažeři nejsou.", tt:"inference"},
  { context:"You hear two friends talking about a new swimming pool.",
    speakers:{"Boy":"B1","Girl":"G1"},
    lines:[
      {sp:"Boy", t:"Have you been to the new swimming pool yet?"},
      {sp:"Girl", t:"Yes, on Saturday. It's huge, isn't it? But the changing rooms are tiny. I had to wait ages for a locker."},
      {sp:"Boy", t:"I noticed that too! And it's quite expensive – six pounds for an hour."},
      {sp:"Girl", t:"I didn't think that was too bad, actually. Not with the slides."},
      {sp:"Boy", t:"Oh, the slides are brilliant."}
    ],
    q:"What do the friends agree about?", opts:["The pool is too expensive.","The slides are disappointing.","The changing rooms are too small."], correct:2,
    evidence:"But the changing rooms are tiny",
    why:"Dívka: šatny jsou malinké, chlapec: „I noticed that too!“ → shoda.",
    trap:"Cenu kritizuje jen chlapec, dívce nevadí. Tobogány jsou „brilliant“.", tt:"distractor"},
  { context:"You hear a man talking about learning to cook.",
    speakers:{"Man":"M3"},
    lines:[
      {sp:"Man", t:"I couldn't cook at all until I was twenty-five. When I left home for university, I lived on pizza and takeaways, which cost a fortune. Then I met my girlfriend, and she's a fantastic cook."},
      {sp:"Man", t:"I wanted to make her a special meal for her birthday, so I watched loads of videos and practised for weeks. It went well, and now I'm the one who cooks most evenings!"}
    ],
    q:"Why did the man start learning to cook?", opts:["He had just left home.","He wanted to save money.","He wanted to do something special for someone."], correct:2,
    evidence:"I wanted to make her a special meal for her birthday",
    why:"Chtěl přítelkyni uvařit slavnostní večeři k narozeninám – kvůli tomu se začal učit.",
    trap:"Po odchodu z domova jedl pizzu a jídlo s sebou – vařit se tehdy nenaučil. Drahé jídlo zmíní, ale nebyl to důvod.", tt:"distractor"}
]}
);
})(window.DATA.listening);

/* ===================================================================================== PART 2 (1–4) */
(function(L){
"use strict";
L.p2.push(
{ id:"p2-01", title:"A summer job with penguins", context:"You will hear a young woman called Emma talking about her summer job at a wildlife park.",
  speakers:{"Emma":"F1"},
  lines:[
    {sp:"Emma", t:"Hi everyone. I'm Emma, and last summer I spent ten weeks working at a wildlife park in the south of England. I'm studying biology at university, so I thought it would be good experience, and it really was."},
    {sp:"Emma", t:"I'd applied to work with the big cats, the lions and tigers, but they gave that job to someone with more experience. So I ended up looking after the penguins, which, to be honest, turned out to be much more fun."},
    {sp:"Emma", t:"My day started at half past six. The first job was always cleaning the pool, which took about an hour. Then it was time for the first feed of the day. Penguins eat a lot of fish – we got through about forty kilos every day!"},
    {sp:"Emma", t:"Every afternoon at three, we gave a talk to visitors. I was really nervous about it at first, because I'm quite shy, but I soon realised that people just wanted to watch the penguins being fed. The question I got asked most often was whether penguins can fly. They can't, of course, but they swim incredibly fast."},
    {sp:"Emma", t:"Each penguin has a name, and we told them apart by the coloured bands on their wings. I thought I'd never learn them all, but after two weeks I knew every one of the thirty-two birds. My favourite was a very old penguin called Captain, who followed me everywhere."},
    {sp:"Emma", t:"The hardest part of the job wasn't the early mornings or the smell of fish, although that did get into my clothes and hair. It was the weather. We had a heatwave in July, and penguins really suffer in the heat, so we had to keep checking the water temperature and spraying them with cold water."},
    {sp:"Emma", t:"One day I'll never forget is when one of the eggs hatched. We'd been watching the nest on a camera for weeks, and suddenly there was this tiny grey chick. The staff let me choose a name for him, so I called him Pebble."},
    {sp:"Emma", t:"The job wasn't well paid – I earned just above the minimum wage – but the park gave us free accommodation in a caravan, which meant I could actually save some money. I shared it with two other students who worked in the gift shop and the café."},
    {sp:"Emma", t:"Next summer I'm hoping to go back, but this time I'd like to work in the education team, running workshops for school groups. In the long term, I'd love to work in marine conservation, protecting animals in the ocean."}
  ],
  qs:[
    {s:"Emma was given the job of looking after the ___ at the park.", ans:["penguins"], evidence:"So I ended up looking after the penguins",
     why:"O velké kočky nakonec nepřišla – „I ended up looking after the penguins“.", trap:"Lvi a tygři (big cats) byli to, o co se ucházela – práci dostal někdo jiný.", tt:"distractor"},
    {s:"The penguins ate about ___ of fish every day.", ans:["forty kilos","40 kilos","40 kg","40kg","forty kilograms","40 kilograms"], evidence:"we got through about forty kilos every day",
     why:"„We got through about forty kilos every day“ – spotřebovali asi 40 kg ryb denně.", trap:"Ve stejné části zazní i „half past six“ a „about an hour“ – čísla, která se týkají něčeho jiného.", tt:"detail"},
    {s:"At first, Emma felt ___ about giving talks to visitors.", ans:["nervous","really nervous"], evidence:"I was really nervous about it at first",
     why:"Na začátku byla z přednášek nervózní, protože je stydlivá.", trap:"„Shy“ popisuje její povahu obecně, ne pocit z přednášek – do věty se hodí „nervous“.", tt:"paraphrase"},
    {s:"Visitors most often asked Emma if penguins are able to ___ .", ans:["fly"], evidence:"whether penguins can fly",
     why:"Nejčastější otázka: „whether penguins can fly“ – zda tučňáci umějí létat.", trap:"„Swim“ zazní hned potom jako to, co umějí – na to se ale neptali.", tt:"distractor"},
    {s:"The keepers recognised each penguin by the ___ on its wing.", ans:["coloured bands","colored bands","bands","coloured band","colored band"], evidence:"we told them apart by the coloured bands on their wings",
     why:"„Told them apart“ = rozeznávali je podle barevných kroužků (bands) na křídlech.", trap:"Jména měli všichni tučňáci, ale rozeznávali je podle kroužků.", tt:"paraphrase"},
    {s:"Emma's favourite penguin was called ___ .", ans:["Captain"], evidence:"a very old penguin called Captain",
     why:"Oblíbený starý tučňák, který za ní všude chodil, se jmenoval Captain.", trap:"Pebble je jméno mláděte, které vybrala později.", tt:"distractor"},
    {s:"Emma says the most difficult thing about the job was the ___ .", ans:["weather","heat","heatwave"], evidence:"It was the weather",
     why:"Nejtěžší bylo počasí – vedra v červenci, kdy tučňáci trpí.", trap:"Brzké vstávání a zápach ryb vyloučí: „wasn't the early mornings or the smell of fish“.", tt:"distractor"},
    {s:"Emma was allowed to name a newly hatched ___ .", ans:["chick"], evidence:"suddenly there was this tiny grey chick",
     why:"Z vejce se vylíhlo malé šedé mládě (chick) a ona ho pojmenovala Pebble.", trap:"„Egg“ zazní taky, ale pojmenovala až mládě.", tt:"detail"},
    {s:"Emma could save money because she lived for free in a ___ .", ans:["caravan"], evidence:"free accommodation in a caravan",
     why:"Park poskytl ubytování zdarma v karavanu, takže mohla šetřit.", trap:"Obchod se suvenýry a kavárna jsou místa, kde pracovali její spolubydlící.", tt:"distractor"},
    {s:"Next summer, Emma would like to work in the park's ___ team.", ans:["education"], evidence:"I'd like to work in the education team",
     why:"Příští léto chce do vzdělávacího týmu (workshopy pro školy).", trap:"„Marine conservation“ je její dlouhodobý sen, ne plán na příští léto.", tt:"distractor"}
  ]},

{ id:"p2-02", title:"A TV cooking competition", context:"You will hear a young man called Jack talking about taking part in a TV cooking competition.",
  speakers:{"Jack":"M2"},
  lines:[
    {sp:"Jack", t:"Hi, I'm Jack. Two years ago, when I was nineteen, I took part in a TV cooking competition called Young Chef. I'd never cooked professionally – I was working in a bike shop at the time – but my mum saw the advert online and kept telling me to apply."},
    {sp:"Jack", t:"The application was quite simple. You had to send a short video of yourself cooking your favourite dish. I made a lamb curry, which is my grandmother's recipe, and filmed it in our kitchen with my phone."},
    {sp:"Jack", t:"A month later, I got a phone call inviting me to London for a cooking test. There were about two hundred people there, and only twelve of us were chosen for the programme. I couldn't believe it."},
    {sp:"Jack", t:"The filming took place over six weeks in a studio. What people don't realise is how long each day is. We often started at seven and finished at nine at night, and a lot of that time was spent just waiting while the cameras were moved around. The waiting was actually more tiring than the cooking."},
    {sp:"Jack", t:"Each week there was a different challenge. The one I was most worried about was baking, because I'd never made bread before. In fact, the bread went fine. It was the dessert challenge that nearly sent me home – my chocolate sauce went completely wrong, and the judges weren't impressed."},
    {sp:"Jack", t:"The judges were all well-known chefs, and they could be quite hard on us. But one of them, a French chef called Marie, always found something positive to say, even when things went badly. She taught me that a good chef has to stay calm under pressure."},
    {sp:"Jack", t:"Somehow I got to the final, which I never expected. For the final, we had to cook a three-course meal for fifty guests. I came second, which I was really happy with. The winner, a girl called Priya, was brilliant – she deserved it."},
    {sp:"Jack", t:"After the programme, my life changed quite a lot. I got loads of messages on social media, and a restaurant in my town offered me a job as a trainee chef. I've been there ever since, although I still help out at the bike shop on Sundays."},
    {sp:"Jack", t:"My advice to anyone thinking of entering a competition like this is simple: practise cooking against the clock. At home you can take as long as you like, but on TV every second counts. And don't forget to enjoy it!"}
  ],
  qs:[
    {s:"When he applied, Jack had a job in a ___ .", ans:["bike shop","bicycle shop","cycle shop"], evidence:"I was working in a bike shop at the time",
     why:"V té době pracoval v obchodě s koly – profesionálně nevařil.", trap:"„Advert online“ viděla jeho máma – není to jeho práce.", tt:"detail"},
    {s:"In his application video, Jack cooked a ___ .", ans:["lamb curry","curry"], evidence:"I made a lamb curry",
     why:"Do videa uvařil jehněčí kari podle babiččina receptu.", trap:"„Grandmother's recipe“ není jídlo – do mezery patří samotný pokrm.", tt:"detail"},
    {s:"Jack was one of ___ people chosen to appear on the programme.", ans:["twelve","12"], evidence:"only twelve of us were chosen for the programme",
     why:"Z asi dvou set lidí vybrali jen dvanáct.", trap:"„Two hundred“ je počet lidí na testu v Londýně, ne vybraných.", tt:"detail"},
    {s:"Jack found the ___ during filming more tiring than the cooking.", ans:["waiting"], evidence:"The waiting was actually more tiring than the cooking",
     why:"Čekání, než přestaví kamery, ho vyčerpávalo víc než vaření.", trap:"Dlouhé dny (od sedmi do devíti) jsou důvod, ale do věty patří „waiting“.", tt:"paraphrase"},
    {s:"Jack nearly had to leave the competition after the ___ challenge.", ans:["dessert"], evidence:"It was the dessert challenge that nearly sent me home",
     why:"„Nearly sent me home“ = málem vypadl – kvůli dezertu (nepovedená čokoládová omáčka).", trap:"Pečení (baking) bylo to, čeho se bál, ale chleba se povedl.", tt:"distractor"},
    {s:"One judge taught Jack that a chef must remain ___ when under pressure.", ans:["calm"], evidence:"a good chef has to stay calm under pressure",
     why:"Porotkyně Marie ho naučila, že kuchař musí zůstat v klidu i pod tlakem.", trap:"„Positive“ popisuje, jak Marie mluvila, ne co ho naučila.", tt:"paraphrase"},
    {s:"In the final, the contestants cooked for ___ guests.", ans:["fifty","50"], evidence:"a three-course meal for fifty guests",
     why:"Ve finále vařili tříchodové menu pro padesát hostů.", trap:"„Three-course“ je počet chodů, ne hostů.", tt:"detail"},
    {s:"Jack finished in ___ place in the competition.", ans:["second","2nd"], evidence:"I came second",
     why:"„I came second“ – skončil druhý.", trap:"Vyhrála Priya – nepiš „first“.", tt:"detail"},
    {s:"Jack now works as a ___ in a restaurant in his town.", ans:["trainee chef"], evidence:"offered me a job as a trainee chef",
     why:"Restaurace mu nabídla místo kuchaře v zácviku a pracuje tam dodnes.", trap:"V obchodě s koly už jen vypomáhá o nedělích.", tt:"distractor"},
    {s:"Jack's advice is to get used to cooking against the ___ .", ans:["clock"], evidence:"practise cooking against the clock",
     why:"„Against the clock“ = na čas; v televizi rozhoduje každá sekunda.", trap:"Doma si můžeš dát na čas – to je opak toho, co radí.", tt:"detail"}
  ]},

{ id:"p2-03", title:"A week on a sailing ship", context:"You will hear a woman called Lucy talking about a week she spent on a sail training ship when she was a teenager.",
  speakers:{"Lucy":"F3"},
  lines:[
    {sp:"Lucy", t:"Hello. I'm Lucy, and I want to tell you about the week I spent on a sail training ship when I was sixteen. My school offered three places, and I only applied because my best friend did. In the end, she didn't get a place and I did, so I went on my own!"},
    {sp:"Lucy", t:"The ship was called the Northern Star. It was over a hundred years old, and it was originally built for carrying fish. There were forty young people on board, from all over the country, plus twelve crew members."},
    {sp:"Lucy", t:"We were divided into four teams called watches, and each watch had to take turns sailing the ship, day and night. That meant you might be woken up at two in the morning to go on deck. I found that really hard at first, but by the end of the week I was used to it."},
    {sp:"Lucy", t:"Everybody had to do everything, including cooking and cleaning. My least favourite job was cleaning the toilets, obviously, but the thing I was most scared of was climbing the mast. It's about thirty metres high, and the first time I went up, my legs were shaking."},
    {sp:"Lucy", t:"The weather was mostly good, but on the fourth day there was a storm. Lots of people were seasick, including me. The crew told us the best thing to do was to stay on deck and look at the horizon, and it really did help."},
    {sp:"Lucy", t:"We stopped at a small island off the coast of Scotland, where we went for a long walk and saw seals lying on the beach. I'd never seen them in the wild before. Some people went swimming, but the water was far too cold for me."},
    {sp:"Lucy", t:"What surprised me most was how quickly we all became friends. There was no wifi on board, so nobody was on their phone. In the evenings we played cards and told stories, and I didn't miss social media at all."},
    {sp:"Lucy", t:"At the end of the trip, everyone got a certificate, and the captain chose one person from each watch for a special award. I got the award for teamwork, which I was really proud of, because at the start I was so shy."},
    {sp:"Lucy", t:"The trip changed me a lot. I became much more confident, and I learnt that I can cope with difficult situations. I've since done a sailing course, and next year I'm going to work as a volunteer on the same ship, helping the next group of young people."}
  ],
  qs:[
    {s:"Lucy applied for the trip because her ___ was applying.", ans:["best friend","friend"], evidence:"I only applied because my best friend did",
     why:"Přihlásila se jen proto, že se hlásila její nejlepší kamarádka.", trap:"Škola nabízela tři místa – to je informace, ne důvod.", tt:"detail"},
    {s:"The ship was first used to carry ___ .", ans:["fish"], evidence:"it was originally built for carrying fish",
     why:"„Originally built for carrying fish“ – původně loď vozila ryby.", trap:"Neplete se s „young people“ – ti jsou na palubě dnes.", tt:"paraphrase"},
    {s:"There were ___ young people on the trip, as well as the crew.", ans:["forty","40"], evidence:"There were forty young people on board",
     why:"Na palubě bylo čtyřicet mladých lidí plus dvanáct členů posádky.", trap:"„Twelve“ je posádka, „a hundred“ stáří lodi.", tt:"detail"},
    {s:"The teams on the ship were known as ___ .", ans:["watches"], evidence:"four teams called watches",
     why:"Týmy se jmenovaly „watches“ (hlídky).", trap:"„Four“ je počet týmů, ne jejich název.", tt:"detail"},
    {s:"The activity Lucy was most afraid of was climbing the ___ .", ans:["mast"], evidence:"the thing I was most scared of was climbing the mast",
     why:"Nejvíc se bála lézt na stěžeň (mast), 30 metrů vysoko.", trap:"Čištění záchodů byla nejméně oblíbená práce, ale ne to, čeho se bála.", tt:"distractor"},
    {s:"To feel less seasick, they were told to look at the ___ .", ans:["horizon"], evidence:"look at the horizon",
     why:"Posádka radila zůstat na palubě a dívat se na horizont.", trap:"„Stay on deck“ je první část rady; do mezery po „look at the“ patří horizon.", tt:"detail"},
    {s:"On the island, Lucy saw ___ in the wild for the first time.", ans:["seals"], evidence:"saw seals lying on the beach",
     why:"Na ostrově viděla tuleně ležet na pláži – poprvé ve volné přírodě.", trap:"Plavání vynechala – voda byla příliš studená.", tt:"detail"},
    {s:"Instead of using phones, in the evenings they played ___ .", ans:["cards"], evidence:"In the evenings we played cards and told stories",
     why:"Bez wifi večer hráli karty a vyprávěli příběhy.", trap:"„Social media“ jí naopak nechyběla.", tt:"paraphrase"},
    {s:"Lucy received a special award for ___ .", ans:["teamwork"], evidence:"I got the award for teamwork",
     why:"Dostala zvláštní cenu za týmovou práci.", trap:"Certifikát dostal každý – zvláštní cena byla za teamwork.", tt:"distractor"},
    {s:"Next year Lucy is going to work as a ___ on the ship.", ans:["volunteer"], evidence:"work as a volunteer on the same ship",
     why:"Příští rok bude na stejné lodi dobrovolnicí.", trap:"Kurz jachtingu už absolvovala – to není plán na příští rok.", tt:"distractor"}
  ]},

{ id:"p2-04", title:"A guide in the caves", context:"You will hear a man called Daniel talking about his job as a guide in some caves.",
  speakers:{"Daniel":"M1"},
  lines:[
    {sp:"Daniel", t:"Good afternoon, everyone. My name's Daniel, and for the last five years I've worked as a guide at the Blackwater Caves in Wales. Before that, I was a geography teacher, so I'm used to talking to groups, although these days my classroom is about sixty metres underground."},
    {sp:"Daniel", t:"The caves were discovered about a hundred years ago by two brothers who were looking for a lost sheep. They followed the sound of running water and found the entrance behind some rocks."},
    {sp:"Daniel", t:"Each tour takes about ninety minutes and covers just over a kilometre. The temperature inside stays at around ten degrees all year, so even in summer I tell visitors to bring a jumper. People often turn up in shorts and flip-flops, and they regret it!"},
    {sp:"Daniel", t:"The most popular part of the tour is the Cathedral, a huge cave about as tall as a ten-storey building. We switch off all the lights there for one minute, so people can experience total darkness. Some visitors find it a bit frightening, but most say it's the highlight."},
    {sp:"Daniel", t:"There's also an underground lake, which is incredibly clear. People always ask if there are fish in it. There aren't, but there are tiny white shrimps, which have no eyes because they've never needed them."},
    {sp:"Daniel", t:"The biggest danger in the caves isn't falling rocks, as many people think – it's water. After heavy rain, the river inside can rise very quickly, so we check the weather forecast every morning and close the caves if necessary."},
    {sp:"Daniel", t:"Most of our visitors are families and school groups. But my favourite groups are the older visitors, because they ask the best questions. Last month a woman of ninety-two came on the tour, and she managed all the steps without any help."},
    {sp:"Daniel", t:"Being a guide isn't just about talking. We're all trained in first aid, and twice a year we practise rescuing someone from the deepest part of the caves. It's hard work – it once took us four hours to carry a pretend patient out."},
    {sp:"Daniel", t:"One thing visitors are always surprised by is the number of bats. About three hundred of them spend the winter near the entrance. We have to be very quiet in that area so we don't wake them up."},
    {sp:"Daniel", t:"If you'd like to visit, the caves are open every day from March to October. And if you're interested in becoming a guide yourself, we're looking for new people for next season. You just need to be good with people and not afraid of small spaces!"}
  ],
  qs:[
    {s:"Before becoming a guide, Daniel worked as a ___ .", ans:["geography teacher","teacher"], evidence:"I was a geography teacher",
     why:"Dříve učil zeměpis – proto je zvyklý mluvit ke skupinám.", trap:"„Sixty metres“ je hloubka jeho „třídy“ dnes, ne předchozí práce.", tt:"detail"},
    {s:"The caves were found by two brothers who were searching for a ___ .", ans:["lost sheep","sheep"], evidence:"looking for a lost sheep",
     why:"Bratři hledali ztracenou ovci a vchod našli za skalami.", trap:"„Running water“ je zvuk, kterým se řídili, ne to, co hledali.", tt:"paraphrase"},
    {s:"Daniel tells visitors to bring a ___ , even in summer.", ans:["jumper"], evidence:"I tell visitors to bring a jumper",
     why:"V jeskyni je celoročně asi deset stupňů, proto radí vzít si svetr (jumper).", trap:"Šortky a žabky jsou to, v čem lidé chybně přijdou.", tt:"distractor"},
    {s:"In the cave called the ___ , all the lights are switched off for a minute.", ans:["Cathedral"], evidence:"The most popular part of the tour is the Cathedral",
     why:"V obrovské jeskyni Cathedral na minutu zhasnou, aby lidé zažili úplnou tmu.", trap:"„Ten-storey building“ je jen přirovnání výšky.", tt:"detail"},
    {s:"The animals living in the underground lake are tiny ___ .", ans:["shrimps","shrimp","white shrimps","white shrimp"], evidence:"there are tiny white shrimps",
     why:"V jezeře žijí drobné bílé krevetky bez očí.", trap:"Ryby výslovně popírá: „There aren't“.", tt:"distractor"},
    {s:"The main danger in the caves comes from ___ .", ans:["water","heavy rain","rain"], evidence:"it's water",
     why:"Největší nebezpečí je voda – po dešti řeka v jeskyni rychle stoupá.", trap:"Padající kameny si myslí „many people“, Daniel to odmítá.", tt:"distractor"},
    {s:"Daniel says ___ visitors ask the most interesting questions.", ans:["older","the older","older visitors"], evidence:"my favourite groups are the older visitors",
     why:"Nejraději má starší návštěvníky, protože kladou nejlepší otázky.", trap:"Rodiny a školy jsou nejčastější skupiny, ne oblíbené.", tt:"distractor"},
    {s:"All the guides are trained in ___ .", ans:["first aid"], evidence:"We're all trained in first aid",
     why:"Všichni průvodci mají kurz první pomoci.", trap:"Záchranu „pretend patient“ jen nacvičují – školení je v první pomoci.", tt:"detail"},
    {s:"Around ___ bats spend the winter close to the entrance.", ans:["three hundred","300"], evidence:"About three hundred of them spend the winter near the entrance",
     why:"U vchodu přezimuje asi tři sta netopýrů.", trap:"„Four hours“ a „twice a year“ v předchozí části se týkají cvičení.", tt:"detail"},
    {s:"The caves are open to the public from March until ___ .", ans:["October"], evidence:"open every day from March to October",
     why:"Jeskyně jsou otevřené denně od března do října.", trap:"„Next season“ není měsíc – piš přesný měsíc.", tt:"detail"}
  ]}
);
})(window.DATA.listening);

/* ===================================================================================== PART 2 (5–8) */
(function(L){
"use strict";
L.p2.push(
{ id:"p2-05", title:"An exchange year in Canada", context:"You will hear a young woman called Sophie talking about a school year she spent in Canada.",
  speakers:{"Sophie":"F2"},
  lines:[
    {sp:"Sophie", t:"Hi, I'm Sophie. When I was seventeen, I spent a whole school year in Canada, living with a family in a small town near Vancouver. I'd always wanted to go to Australia, actually, but the exchange programme my school was part of only had places in Canada and the USA. I'd never been further than Spain before, so it was a huge step for me."},
    {sp:"Sophie", t:"My host family were amazing. There were the parents, two younger boys, and a huge dog called Bear, who slept outside my bedroom door every night. My host mum was a nurse, and my host dad ran a small boat company, taking tourists out to watch whales."},
    {sp:"Sophie", t:"The school was very different from mine at home. Classes were much more relaxed, and you could call some teachers by their first names. The thing I found strangest, though, was that you could choose subjects like photography and cooking. I took a course in woodwork and made a chair, which is now in my bedroom back home."},
    {sp:"Sophie", t:"The hardest thing at first was the weather. In winter it rained almost every day for three months. I'd expected snow, but we only had it twice all year. I missed the sun far more than I'd thought I would."},
    {sp:"Sophie", t:"To make friends, I joined the school's rowing team. I'd never rowed before, and we had to train at half past five in the morning, three times a week. But it was the best decision I made, because the girls in the team became my closest friends."},
    {sp:"Sophie", t:"At Christmas, my host family took me skiing in the mountains. I was terrible at it and spent most of the time on the ground, but it's still one of my best memories of the whole year."},
    {sp:"Sophie", t:"Of course, there were difficult moments. In November I felt really homesick, especially when my whole family at home got together for my grandad's eightieth birthday without me. My host mum noticed, and she cooked me a traditional English dinner, which made me cry, but in a good way."},
    {sp:"Sophie", t:"Living abroad changed me in lots of ways. I became much more independent, and I'm much more confident with strangers now. Before, I'd never have started a conversation with someone I didn't know."},
    {sp:"Sophie", t:"I'm now at university studying environmental science, partly because of all the time I spent on the water in Canada, seeing how beautiful the coast was. And next summer I'm going back to visit my host family. The boys have promised to teach me to fish, although I'm not sure I'll be any good at it!"}
  ],
  qs:[
    {s:"Sophie originally hoped to spend her exchange year in ___ .", ans:["Australia"], evidence:"I'd always wanted to go to Australia",
     why:"Vždycky chtěla do Austrálie, ale program nabízel jen Kanadu a USA.", trap:"Kanada je místo, kam nakonec jela; USA byla druhá nabízená možnost.", tt:"distractor"},
    {s:"The family's dog was called ___ .", ans:["Bear"], evidence:"a huge dog called Bear",
     why:"Velký pes se jmenoval Bear a spal u jejích dveří.", trap:"Nepiš „huge dog“ – věta chce jméno.", tt:"detail"},
    {s:"Sophie's host father had a business taking tourists to see ___ .", ans:["whales"], evidence:"taking tourists out to watch whales",
     why:"Hostitelský otec měl lodní firmu a vozil turisty pozorovat velryby.", trap:"„Nurse“ je povolání hostitelské matky.", tt:"detail"},
    {s:"In her woodwork class, Sophie made a ___ .", ans:["chair"], evidence:"I took a course in woodwork and made a chair",
     why:"Na kurzu práce se dřevem vyrobila židli.", trap:"Fotografie a vaření byly jen příklady předmětů, které si šlo vybrat.", tt:"distractor"},
    {s:"Sophie had expected a lot of ___ in winter, but it mostly rained.", ans:["snow"], evidence:"I'd expected snow",
     why:"Čekala sníh, ale celou zimu skoro denně pršelo.", trap:"„Sun“ jí chybělo – ale do věty o očekávání patří snow.", tt:"paraphrase"},
    {s:"Sophie made her closest friends after joining the ___ team.", ans:["rowing"], evidence:"I joined the school's rowing team",
     why:"Holky z veslařského týmu se staly jejími nejbližšími kamarádkami.", trap:"„Half past five“ je čas tréninku – nepiš číslo.", tt:"detail"},
    {s:"When Sophie felt homesick, her host mother cooked her a traditional ___ dinner.", ans:["English"], evidence:"she cooked me a traditional English dinner",
     why:"Hostitelská máma jí uvařila tradiční anglickou večeři.", trap:"Dědečkovy 80. narozeniny jsou důvod stesku, ne druh večeře.", tt:"detail"},
    {s:"Sophie says she is now much more confident with ___ .", ans:["strangers"], evidence:"I'm much more confident with strangers now",
     why:"Je sebevědomější při jednání s cizími lidmi – dřív by konverzaci nezačala.", trap:"„Independent“ je jiná změna, kterou zmíní předtím.", tt:"paraphrase"},
    {s:"Sophie is now studying ___ at university.", ans:["environmental science"], evidence:"I'm now at university studying environmental science",
     why:"Studuje environmentální vědy – částečně kvůli času na vodě v Kanadě.", trap:"„The coast“ je inspirace, ne obor.", tt:"detail"},
    {s:"The boys in her host family have promised to teach Sophie to ___ .", ans:["fish"], evidence:"The boys have promised to teach me to fish",
     why:"Kluci slíbili, že ji naučí rybařit.", trap:"Veslovat už umí z Kanady – nepiš „row“.", tt:"distractor"}
  ]},

{ id:"p2-06", title:"Cleaning up the coast", context:"You will hear a young man called Ben talking about a beach-cleaning group that he started.",
  speakers:{"Ben":"B1"},
  lines:[
    {sp:"Ben", t:"Hi, I'm Ben, and I'm going to talk about Clean Coast, the beach-cleaning group I started three years ago, when I was fifteen. It all began on a family holiday in Cornwall. I went for a swim and came out of the sea with a plastic bag wrapped around my leg."},
    {sp:"Ben", t:"When I got home, I asked a few friends to help me clean our local beach. Only four people came to the first clean-up, and two of them were my parents! But I put some photos online, and the next month thirty people turned up."},
    {sp:"Ben", t:"Now we meet on the first Sunday of every month. We work for two hours, and afterwards everyone goes to a café on the seafront that gives us free hot chocolate. That's probably why so many teenagers come! Some people bring their dogs, and one family comes with three small children who are amazing at spotting tiny bits of plastic."},
    {sp:"Ben", t:"People always think the most common thing we find is plastic bottles. Actually, it's cigarette ends. Last year we collected over ten thousand of them. They're tiny, but they're full of chemicals that are bad for sea life."},
    {sp:"Ben", t:"We also find some strange things. The strangest so far was a toilet seat, and once we found a wedding ring. We put a message online and, amazingly, the owner saw it and came to collect it. She'd lost it on the beach twenty years before."},
    {sp:"Ben", t:"We record everything we find and send the information to a university, where scientists use it to study how rubbish travels around the ocean. It's nice to know that our work is useful for research. Last month two of the scientists actually came along to one of our clean-ups to see how we work."},
    {sp:"Ben", t:"Last year the town council gave us some money, which we used to buy proper equipment – gloves, strong bags and special tools for picking things up, called litter pickers. Before that, we were using kitchen gloves from home!"},
    {sp:"Ben", t:"The best thing about the project, for me, isn't the clean beach, although that's great. It's seeing people change their habits. Lots of our volunteers now take their own bags to the shops and try not to buy things wrapped in plastic."},
    {sp:"Ben", t:"Next year we're hoping to start groups in other towns along the coast. We've already had messages from people in six different places who want to do the same thing. So if you live near the sea, get in touch – we'd love to help you get started."}
  ],
  qs:[
    {s:"Ben got the idea for the group on a family holiday in ___ .", ans:["Cornwall"], evidence:"It all began on a family holiday in Cornwall",
     why:"Všechno začalo na rodinné dovolené v Cornwallu.", trap:"Pláž, kterou uklízejí, je jejich místní pláž – ne Cornwall.", tt:"detail"},
    {s:"When Ben came out of the sea, there was a ___ around his leg.", ans:["plastic bag","bag"], evidence:"came out of the sea with a plastic bag wrapped around my leg",
     why:"Z moře vylezl s igelitovou taškou omotanou kolem nohy.", trap:"Plastové lahve zmíní až později jako to, co si lidé myslí, že nacházejí.", tt:"detail"},
    {s:"After Ben put photos online, ___ people came to the next clean-up.", ans:["thirty","30"], evidence:"the next month thirty people turned up",
     why:"Po fotkách na internetu přišlo další měsíc třicet lidí.", trap:"„Four“ je počet lidí na prvním úklidu (z toho dva rodiče).", tt:"detail"},
    {s:"After each clean-up, a café gives the volunteers free ___ .", ans:["hot chocolate"], evidence:"gives us free hot chocolate",
     why:"Kavárna na nábřeží dává dobrovolníkům horkou čokoládu zdarma.", trap:"„Two hours“ je délka úklidu.", tt:"detail"},
    {s:"The thing the group finds most often is ___ .", ans:["cigarette ends","cigarette end"], evidence:"Actually, it's cigarette ends",
     why:"Nejčastěji nacházejí nedopalky cigaret (přes deset tisíc za rok).", trap:"Plastové lahve si myslí „people“ – „Actually“ ohlašuje opravu.", tt:"distractor"},
    {s:"The group managed to return a lost ___ to its owner.", ans:["wedding ring","ring"], evidence:"once we found a wedding ring",
     why:"Našli snubní prsten a majitelka si ho po dvaceti letech vyzvedla.", trap:"Záchodové prkénko je „the strangest“ nález, ale vlastníkovi ho nevraceli.", tt:"distractor"},
    {s:"The group sends information about what it finds to a ___ .", ans:["university"], evidence:"send the information to a university",
     why:"Data posílají univerzitě, kde vědci zkoumají, jak se odpad pohybuje oceánem.", trap:"Městská rada jim dala peníze – data jí neposílají.", tt:"distractor"},
    {s:"Money from the council paid for special tools known as ___ .", ans:["litter pickers","litter picker"], evidence:"special tools for picking things up, called litter pickers",
     why:"Za peníze od rady koupili speciální nástroje „litter pickers“ (sběrací kleště).", trap:"Kuchyňské rukavice používali předtím, z domova.", tt:"detail"},
    {s:"Ben most enjoys seeing people change their ___ .", ans:["habits"], evidence:"It's seeing people change their habits",
     why:"Nejvíc ho těší, když lidé mění své návyky (vlastní tašky, méně plastu).", trap:"Čistá pláž „isn't the best thing“, i když je skvělá.", tt:"distractor"},
    {s:"People in ___ other places have asked about starting similar groups.", ans:["six","6"], evidence:"people in six different places",
     why:"Ozvali se lidé ze šesti různých míst.", trap:"„Three years“ a „fifteen“ ze začátku se týkají historie skupiny.", tt:"detail"}
  ]},

{ id:"p2-07", title:"Working as a stunt performer", context:"You will hear a woman called Maya talking about her job as a stunt performer.",
  speakers:{"Maya":"F1"},
  lines:[
    {sp:"Maya", t:"Hi, I'm Maya, and I work as a stunt performer in films and TV. People often ask how I got into it. Well, I was a gymnast as a child, and later I did kickboxing, so when a friend told me about a stunt course, it seemed perfect for me."},
    {sp:"Maya", t:"To become a professional, you have to pass tests in six different skills, like swimming, horse riding and climbing. It took me three years. The one I found hardest was horse riding, because I'd never been near a horse before."},
    {sp:"Maya", t:"My first job was on a historical drama. I had to fall off a horse – which was funny, after all that practice! – and I did it eleven times before the director was happy. I was covered in bruises the next day."},
    {sp:"Maya", t:"A lot of my work is doubling for actresses. That means I wear the same clothes and wig as the actress, and do the dangerous bits for her. The camera usually films me from behind, so nobody can see my face. Sometimes I don't even meet the actress until the day of filming."},
    {sp:"Maya", t:"People think stunts are about being brave, but really they're about planning. Before a stunt, we spend hours, sometimes days, checking every detail. The most important person on set for me is the stunt coordinator, who makes sure everything is safe."},
    {sp:"Maya", t:"The stunt I'm proudest of was jumping from a bridge into a river for a police series. It was only about eight metres, but the water was freezing, and I had to do it at night. We practised the jump in a swimming pool for a whole week before we filmed it."},
    {sp:"Maya", t:"Of course, injuries happen. I broke my wrist two years ago – not during a big stunt, but when I slipped on some stairs between scenes! I was off work for two months, which was really frustrating."},
    {sp:"Maya", t:"To stay fit, I train every day, usually running in the morning and lifting weights in the afternoon. I also do yoga, which keeps me flexible and calm. I have to be careful about what I eat, too, because if I put on weight, the costumes don't fit!"},
    {sp:"Maya", t:"The best part of the job is the variety. One week I might be falling down the stairs of a castle, and the next I'm driving a car through a city at night. No two days are ever the same."},
    {sp:"Maya", t:"There still aren't many women in the industry – maybe one in five stunt performers is female – but it's changing. I now run workshops for girls who are interested in the job, and some of them are already better than I was at their age."}
  ],
  qs:[
    {s:"When she was a child, Maya was a ___ .", ans:["gymnast"], evidence:"I was a gymnast as a child",
     why:"Jako dítě byla gymnastka (gymnast).", trap:"Kickbox dělala až později.", tt:"distractor"},
    {s:"The skill Maya found most difficult to learn was ___ .", ans:["horse riding","horse-riding","riding"], evidence:"The one I found hardest was horse riding",
     why:"Nejtěžší byla jízda na koni – předtím ke koni ani nepřišla.", trap:"Plavání a lezení jsou jen další příklady dovedností.", tt:"distractor"},
    {s:"In her first job, Maya fell off a horse ___ times.", ans:["eleven","11"], evidence:"I did it eleven times",
     why:"Pád z koně opakovala jedenáctkrát, než byl režisér spokojený.", trap:"„Six“ je počet dovedností a „three years“ doba výcviku.", tt:"detail"},
    {s:"As a double, Maya wears the same clothes and ___ as the actress.", ans:["wig"], evidence:"I wear the same clothes and wig as the actress",
     why:"Jako dablérka nosí stejné oblečení a paruku (wig).", trap:"„Face“ je to, co kamera NEukazuje.", tt:"detail"},
    {s:"According to Maya, stunts depend mainly on ___ , not bravery.", ans:["planning"], evidence:"really they're about planning",
     why:"Kaskadérské kousky jsou hlavně o plánování, ne o odvaze.", trap:"„Being brave“ si myslí lidé – Maya to opravuje.", tt:"distractor"},
    {s:"Maya says the person who matters most during filming is the ___ .", ans:["stunt coordinator","coordinator"], evidence:"The most important person on set for me is the stunt coordinator",
     why:"Nejdůležitější je pro ni koordinátor kaskadérů, který hlídá bezpečnost.", trap:"Režisér zazněl dřív, u prvního natáčení.", tt:"paraphrase"},
    {s:"The stunt Maya is proudest of was a jump from a ___ .", ans:["bridge"], evidence:"jumping from a bridge into a river",
     why:"Nejpyšnější je na skok z mostu do řeky pro policejní seriál.", trap:"„River“ je místo dopadu, ne odkud skákala.", tt:"detail"},
    {s:"Maya broke her wrist when she slipped on some ___ .", ans:["stairs"], evidence:"when I slipped on some stairs between scenes",
     why:"Zápěstí si zlomila, když uklouzla na schodech mezi scénami.", trap:"„Not during a big stunt“ – kaskadérský kousek to nebyl.", tt:"distractor"},
    {s:"Maya does yoga because it keeps her ___ and calm.", ans:["flexible"], evidence:"I also do yoga, which keeps me flexible and calm",
     why:"Jóga ji udržuje ohebnou (flexible) a klidnou.", trap:"Běh a posilování jsou jiné druhy tréninku.", tt:"detail"},
    {s:"Maya now runs ___ for girls who are interested in stunt work.", ans:["workshops"], evidence:"I now run workshops for girls",
     why:"Vede workshopy pro dívky, které o tuto práci stojí.", trap:"„One in five“ je podíl žen v oboru.", tt:"detail"}
  ]},

{ id:"p2-08", title:"A school robot team", context:"You will hear a teacher called Oliver talking about a robot competition that some of his students entered.",
  speakers:{"Oliver":"M3"},
  lines:[
    {sp:"Oliver", t:"Good evening. I'm Oliver, and I teach science at Greenfield School. Last year, five of my students entered a national robot competition for teenagers, and I'd like to tell you how it went. I should say first that none of them had built a robot before – most of them had never even written computer code."},
    {sp:"Oliver", t:"The task was to build a robot that could find its way through a maze and pick up three coloured balls. We had four months, and the students worked on it every Wednesday after school, and often at weekends too. The maze was different every time, so the robot couldn't just learn one route – it had to use its sensors to decide where to go."},
    {sp:"Oliver", t:"The first problem was money. The parts cost about four hundred pounds, which the school couldn't afford. So the students organised a cake sale, which raised about a hundred pounds after days of baking, and in the end a local technology company paid for the rest."},
    {sp:"Oliver", t:"The students called their robot Max, after the school's cat, who wanders round the science labs as if he owns them. Max the robot was quite slow, but it was very accurate."},
    {sp:"Oliver", t:"Building it took far longer than anyone expected. The first version kept driving into walls, and one evening it went round in circles for twenty minutes while we all stood there laughing. But slowly, week by week, it got better."},
    {sp:"Oliver", t:"Two weeks before the competition, disaster struck. The robot fell off a table and its main sensor broke. We had to order a new one from Germany, and it arrived just two days before the event. I don't think I've ever been so stressed."},
    {sp:"Oliver", t:"The competition was held in a huge hall in Birmingham, with sixty teams from all over the country. Our students were incredibly nervous, especially because some of the other teams had been competing for years. Each team had three attempts at the maze, and only the best one counted."},
    {sp:"Oliver", t:"Max didn't win – we finished fourteenth – but the judges gave the team a special prize for their presentation, because they explained their design so clearly. The students were delighted, and so was I."},
    {sp:"Oliver", t:"Since then, the robot club has grown from five members to over thirty, and we're planning to enter again next year. Two of the original team have even decided to study engineering at university, which I think is the best result of all."}
  ],
  qs:[
    {s:"Before the competition, most of the students had never written any ___ .", ans:["computer code","code"], evidence:"most of them had never even written computer code",
     why:"Většina studentů nikdy nenapsala počítačový kód.", trap:"„Built a robot“ – to také nikdy nedělali, ale věta končí slovem „written“.", tt:"detail"},
    {s:"The robot had to collect three coloured ___ .", ans:["balls"], evidence:"pick up three coloured balls",
     why:"Robot musel projet bludištěm a sebrat tři barevné míčky.", trap:"„Maze“ je bludiště, kterým projížděl – ne to, co sbíral.", tt:"detail"},
    {s:"The students usually worked on the robot every ___ after school.", ans:["Wednesday","Wednesdays"], evidence:"every Wednesday after school",
     why:"Pracovali každou středu po vyučování (a často o víkendech).", trap:"„Weekends“ zazní jako doplněk – „often at weekends too“.", tt:"detail"},
    {s:"A local ___ company paid most of the cost of the parts.", ans:["technology"], evidence:"a local technology company paid for the rest",
     why:"Zbytek peněz zaplatila místní technologická firma.", trap:"Prodej dortů (cake sale) vynesl jen část.", tt:"distractor"},
    {s:"The robot got its name from the school's ___ .", ans:["cat"], evidence:"after the school's cat",
     why:"Robot Max dostal jméno po školní kočce.", trap:"„Science labs“ jsou místo, kudy kocour chodí.", tt:"detail"},
    {s:"Two weeks before the event, the robot's ___ was broken in an accident.", ans:["sensor","main sensor"], evidence:"its main sensor broke",
     why:"Robot spadl ze stolu a rozbil se hlavní senzor.", trap:"„Germany“ je místo, odkud objednali nový.", tt:"detail"},
    {s:"There were ___ teams at the competition.", ans:["sixty","60"], evidence:"with sixty teams from all over the country",
     why:"V Birminghamu soutěžilo šedesát týmů.", trap:"„Two days“ a „two weeks“ se týkají opravy senzoru.", tt:"detail"},
    {s:"The team finished in ___ place.", ans:["fourteenth","14th"], evidence:"we finished fourteenth",
     why:"Skončili čtrnáctí.", trap:"Zvláštní cena neznamená vítězství – „Max didn't win“.", tt:"detail"},
    {s:"The judges gave the team a special prize for its ___ .", ans:["presentation"], evidence:"a special prize for their presentation",
     why:"Zvláštní cenu dostali za prezentaci – jasně vysvětlili konstrukci.", trap:"„Design“ je to, co vysvětlovali; cena byla za prezentaci.", tt:"paraphrase"},
    {s:"Two members of the original team now plan to study ___ .", ans:["engineering"], evidence:"decided to study engineering at university",
     why:"Dva ze studentů se rozhodli studovat inženýrství.", trap:"Věda (science) je předmět, který Oliver učí.", tt:"distractor"}
  ]}
);
})(window.DATA.listening);

/* ===================================================================================== PART 3 */
(function(L){
"use strict";
const SP = (a, b, c, d, e) => ({"Speaker 1":a, "Speaker 2":b, "Speaker 3":c, "Speaker 4":d, "Speaker 5":e});
L.p3.push(
{ id:"p3-01", title:"Learning to drive", context:"You will hear five short extracts in which people are talking about learning to drive.",
  ask:"what each speaker says about learning to drive",
  opts:["I was surprised how quickly I learnt.","My instructor made me feel nervous.","I failed my first test because of one small mistake.","I learnt mainly so that I could help my family.","Practising with a parent caused arguments.","I only learnt because I needed it for a job.","I still don't enjoy driving.","The theory test was harder than the practical one."],
  speakers:SP("B1","F1","G1","M3","F3"),
  lines:[
    {sp:"Speaker 1", t:"My dad offered to teach me, which saved a lot of money on lessons. The trouble was, he's not a very patient person. Every time I stalled the car, he'd sigh loudly, I'd tell him to stop, and by the time we got home we weren't speaking to each other. Mum had to take over in the end. I passed first time, though, so I suppose it worked out."},
    {sp:"Speaker 2", t:"Honestly, I'd never have bothered if it wasn't for work. I live in the city and I cycle everywhere. But then I was offered a job as a sales rep, visiting shops all over the region, and the only condition was that I had a driving licence. So I did an intensive course – two weeks, every day. I'm actually starting to like driving now, which I didn't expect."},
    {sp:"Speaker 3", t:"I'd had about thirty lessons and felt really ready. The test was going perfectly – my reversing was fine, and I didn't stall once. Then, right at the end, I forgot to check my mirror before turning left, and that was it. The examiner said everything else was excellent, which made it worse, really. I passed second time, but I'm still annoyed about it. I'd practised that turn a hundred times, too."},
    {sp:"Speaker 4", t:"Everyone worries about the practical test, but for me that was the easy part. I'd been driving round our farm since I was fourteen, so I knew how to control a car. Mum and Dad said a licence would be useful for the farm, but I'd have learnt anyway. What nearly stopped me was the theory test. All those road signs and stopping distances – I had to take it three times!"},
    {sp:"Speaker 5", t:"My instructor was lovely – really calm and encouraging – so I can't blame her. And I passed after fifteen lessons, which is about average. But even now, two years later, I hate getting behind the wheel. Motorways terrify me, and I get stressed every time I have to park. I only drive when there's no other choice. My husband does most of the driving when we go anywhere together."}
  ],
  qs:[
    {n:1, correct:4, evidence:"by the time we got home we weren't speaking to each other",
     why:"Učil ho netrpělivý táta – po každé jízdě spolu nemluvili → cvičení s rodičem vedlo k hádkám.", trap:"„I passed first time“ svádí k A, ale o rychlosti učení nemluví.", tt:"paraphrase"},
    {n:2, correct:5, evidence:"the only condition was that I had a driving licence",
     why:"Řidičák potřebovala kvůli nabídce práce obchodní zástupkyně – jinak by se neučila.", trap:"Intenzivní kurz (dva týdny) svádí k A; „starting to like driving“ vylučuje G.", tt:"paraphrase"},
    {n:3, correct:2, evidence:"I forgot to check my mirror before turning left, and that was it",
     why:"Test šel výborně, ale jedna chyba (zrcátko) na konci znamenala neúspěch.", trap:"Examinátor byl milý („everything else was excellent“) – nervozitu z instruktora (B) nezmiňuje.", tt:"paraphrase"},
    {n:4, correct:7, evidence:"What nearly stopped me was the theory test",
     why:"Praktická zkouška byla snadná, teorii (značky, brzdné dráhy) dělal třikrát.", trap:"Rodiče chtěli řidiče pro farmu (D), ale „I'd have learnt anyway“.", tt:"distractor"},
    {n:5, correct:6, evidence:"even now, two years later, I hate getting behind the wheel",
     why:"Ani po dvou letech řízení nesnáší a jezdí jen z nutnosti.", trap:"Instruktorka byla „calm and encouraging“ – B neplatí. Patnáct lekcí je „about average“, žádné překvapení (A).", tt:"distractor"}
  ]},

{ id:"p3-02", title:"A school trip", context:"You will hear five short extracts in which people are talking about a school trip they went on.",
  ask:"what each speaker says about the trip",
  opts:["It made me want to study a particular subject.","I was disappointed by the place we visited.","I got to know a classmate better.","Something went wrong with the travel arrangements.","I learnt a practical skill.","I felt homesick for the first time.","The weather spoilt some of our plans.","I was given more responsibility than usual."],
  speakers:SP("M2","F2","G1","B1","F3"),
  lines:[
    {sp:"Speaker 1", t:"We went to Paris for three days when I was fourteen. The city was everything I'd hoped for – I loved every minute. But on the way back, our coach broke down on the motorway, and we sat at the side of the road for six hours waiting for another one. We missed the ferry and didn't get home until two in the morning. Our parents were not happy!"},
    {sp:"Speaker 2", t:"Our class went to a science centre where they let us use real microscopes and look at our own blood cells. Before that, I'd always found biology pretty boring, but seeing it for real changed everything. I chose biology for my final exams the next year, and now I'm training to work in a hospital laboratory. I owe a lot to that one day. Even the bus ride home was spent talking about it."},
    {sp:"Speaker 3", t:"It was an outdoor activity week in Wales. It rained most of the time, but we still did everything – canoeing, climbing, the lot. I had to share a tent with a girl called Megan, who I'd never really spoken to. I thought she was a bit unfriendly. Actually, she was just shy, and by the end of the week we were inseparable. We're still best friends now."},
    {sp:"Speaker 4", t:"I went on a trip to a farm when I was about twelve. We did learn how to milk a cow, which was fun, but what I remember most is that our teacher put me in charge of my group of five. I had to make sure everyone got to each activity on time and didn't lose anything. I'd never been trusted like that before. I even had a clipboard!"},
    {sp:"Speaker 5", t:"Everyone had been talking about the castle trip for weeks, and I was so excited. I'd seen pictures in books and imagined something huge with towers. But when we got there, it was just a few old walls in a field. There was hardly anything left! The picnic was nice, and the weather was lovely, but I remember feeling really let down. Our teacher said it was one of the most important castles in the country, but I couldn't see why."}
  ],
  qs:[
    {n:1, correct:3, evidence:"our coach broke down on the motorway",
     why:"Autobus se cestou zpět porouchal, čekali šest hodin a ujel jim trajekt → problém s dopravou.", trap:"Paříž byla „everything I'd hoped for“ – zklamání místem (B) neplatí.", tt:"distractor"},
    {n:2, correct:0, evidence:"I chose biology for my final exams the next year",
     why:"Mikroskopy ji nadchly pro biologii, kterou pak zvolila k maturitě – výlet ji přivedl k oboru.", trap:"Práce s mikroskopem není „practical skill“, o které by mluvila jako o tom hlavním.", tt:"paraphrase"},
    {n:3, correct:2, evidence:"by the end of the week we were inseparable",
     why:"Se spolubydlící ze stanu, se kterou předtím nemluvila, se stala nejlepší kamarádkou.", trap:"Pršelo, ale „we still did everything“ – počasí plány nezkazilo (G).", tt:"distractor"},
    {n:4, correct:7, evidence:"our teacher put me in charge of my group of five",
     why:"Učitel mu svěřil pětičlennou skupinu – nikdy předtím mu tolik nedůvěřovali.", trap:"Dojení krávy (E) zmíní, ale „what I remember most…“ je odpovědnost.", tt:"distractor"},
    {n:5, correct:1, evidence:"it was just a few old walls in a field",
     why:"Čekala velký hrad s věžemi, ale byly to jen zbytky zdí → zklamání („let down“).", trap:"Počasí bylo „lovely“ – G neplatí.", tt:"distractor"}
  ]},

{ id:"p3-03", title:"A part-time job as a teenager", context:"You will hear five short extracts in which people are talking about a part-time job they had as a teenager.",
  ask:"what each speaker says about the job",
  opts:["It helped me decide what career I wanted.","I wasn't paid as much as I'd been promised.","It taught me how to deal with difficult people.","I made a friend for life there.","I found it hard to combine with my studies.","It made me appreciate my parents more.","I got the job through a family member.","I was given the chance to use my creativity."],
  speakers:SP("F1","M2","G1","M1","F3"),
  lines:[
    {sp:"Speaker 1", t:"I worked in a café at the weekends when I was sixteen. Most customers were lovely, but some were incredibly rude – complaining about everything, shouting at me when their food was late. At first I used to cry in the kitchen. But I learnt to stay polite and calm, and to sort out the problem quickly. That's been really useful in every job I've had since."},
    {sp:"Speaker 2", t:"I had a job stacking shelves in a supermarket three evenings a week, during my last year at school. The money was good and the people were friendly, but I'd get home at ten and still have homework to do. My marks started going down, and in the end my teachers had a word with my parents. I had to give it up before my exams."},
    {sp:"Speaker 3", t:"Our neighbour runs a flower shop, and I helped her out every Saturday. I was terrible with money, so she kept me away from the till! Instead, she let me design the window displays. I'd change them every month for the different seasons, and customers often came in just to say how much they liked them. I loved trying out my own ideas. She still uses some of my ideas today."},
    {sp:"Speaker 4", t:"I spent two summers working at a children's holiday camp. I'd seen an advert in the local paper and thought it sounded like fun. It was exhausting – kids up at six, games all day. But I discovered I was good at it, and that I loved helping children learn new things. That's when I realised I wanted to be a primary school teacher, and that's what I do now."},
    {sp:"Speaker 5", t:"I did a paper round when I was thirteen, delivering newspapers at six every morning, even in the snow. My uncle had offered me a job washing cars at his garage, which paid better, but I wanted to find something on my own. Getting up that early, in the cold, made me realise how hard my mum and dad worked, both doing early shifts at the hospital. I started helping more at home after that."}
  ],
  qs:[
    {n:1, correct:2, evidence:"I learnt to stay polite and calm, and to sort out the problem quickly",
     why:"Naučila se zvládat nepříjemné a hrubé zákazníky – hodí se jí to dodnes.", trap:"Pláč v kuchyni byl jen začátek; nejde o kariéru (A).", tt:"paraphrase"},
    {n:2, correct:4, evidence:"I'd get home at ten and still have homework to do",
     why:"Práce do deseti večer + úkoly → horší známky a musel přestat → nešlo to skloubit se školou.", trap:"„The money was good“ – B (nízký plat) neplatí.", tt:"distractor"},
    {n:3, correct:7, evidence:"she let me design the window displays",
     why:"Navrhovala výlohy a zkoušela vlastní nápady → mohla být kreativní.", trap:"Obchod patří sousedce, ne příbuzné – G neplatí.", tt:"distractor"},
    {n:4, correct:0, evidence:"That's when I realised I wanted to be a primary school teacher",
     why:"Na táboře zjistil, že chce učit na prvním stupni – a dnes učí.", trap:"Práci našel z inzerátu, ne přes rodinu (G).", tt:"paraphrase"},
    {n:5, correct:5, evidence:"made me realise how hard my mum and dad worked",
     why:"Ranní vstávání v zimě mu ukázalo, jak tvrdě pracují rodiče → víc si jich váží a pomáhá doma.", trap:"Strýc mu nabízel práci (G), ale odmítl ji – „I wanted to find something on my own“.", tt:"distractor"}
  ]},

{ id:"p3-04", title:"Taking up a new hobby", context:"You will hear five short extracts in which people are talking about taking up a new hobby.",
  ask:"why each speaker took up their new hobby",
  opts:["to spend less time looking at screens","to meet people after moving to a new area","to save money","because a doctor suggested it","because of something they saw on television","to do something with a family member","to prove someone wrong","because they received something as a present"],
  speakers:SP("B1","F3","G1","M2","F1"),
  lines:[
    {sp:"Speaker 1", t:"For my eighteenth birthday, my grandparents gave me a really good camera. I'd never been into photography – I just used my phone. But it seemed a shame to leave such an expensive present in its box, so I joined a local photography club. Now I go out every weekend taking pictures of birds. My old phone photos look terrible to me now! I've even sold a couple of prints at a local market."},
    {sp:"Speaker 2", t:"When we moved to Edinburgh for my husband's job, I didn't know anyone at all. I saw a poster for a choir in the library and thought, why not? I can't really sing, to be honest, but nobody seems to mind. Every Tuesday we practise for two hours, and then we all go to the café next door. I've got more friends here now than I had back home."},
    {sp:"Speaker 3", t:"My brother always laughed at me because I couldn't swim properly. He said I'd never be able to swim a length of the pool without stopping. That was all I needed. I booked lessons the next day, and six months later I swam two kilometres for charity. He came to watch, and I made sure he paid me the ten pounds we'd bet! Now I go to the pool three times a week."},
    {sp:"Speaker 4", t:"I realised I was spending about six hours a day on my phone – scrolling, watching videos, just wasting time. I needed something to do with my hands. So I bought some wood and a few tools and started making small things, like boxes and shelves. My first attempts were awful, but now my friends ask me to make things for them. It's also really relaxing, which I didn't expect."},
    {sp:"Speaker 5", t:"I'd never thought about gardening until I watched a series on TV about a man who turned an empty car park into a vegetable garden. It was so inspiring. The next week I asked the council if I could use a small piece of land near my flat. My doctor's always telling me to get more fresh air, so she's pleased too! Last summer I grew so many tomatoes that I gave bags of them to my neighbours."}
  ],
  qs:[
    {n:1, correct:7, evidence:"my grandparents gave me a really good camera",
     why:"Drahý foťák dostal od prarodičů k narozeninám a nechtěl ho nechat v krabici.", trap:"Prarodiče s ním nefotí (F) a telefon zmiňuje jen pro srovnání (A).", tt:"paraphrase"},
    {n:2, correct:1, evidence:"When we moved to Edinburgh for my husband's job, I didn't know anyone at all",
     why:"Po přestěhování do Edinburghu nikoho neznala, sbor jí přinesl přátele.", trap:"Zpěv sám o sobě není důvod – „I can't really sing“.", tt:"paraphrase"},
    {n:3, correct:6, evidence:"He said I'd never be able to swim a length of the pool without stopping",
     why:"Bratr tvrdil, že to nedokáže – chtěla mu dokázat opak (a vyhrát sázku).", trap:"Bratr přišel jen fandit – plavání s ním (F) nedělá.", tt:"distractor"},
    {n:4, correct:0, evidence:"I realised I was spending about six hours a day on my phone",
     why:"Šest hodin denně na mobilu – chtěl dělat něco rukama místo koukání do obrazovky.", trap:"„Watching videos“ je to, co chtěl omezit, ne inspirace (E).", tt:"paraphrase"},
    {n:5, correct:4, evidence:"until I watched a series on TV",
     why:"Inspiroval ji televizní seriál o muži, který z parkoviště udělal zeleninovou zahradu.", trap:"Lékařka je ráda až dodatečně („so she's pleased too“) – D nebyl důvod.", tt:"distractor"}
  ]},

{ id:"p3-05", title:"Moving to a new home", context:"You will hear five short extracts in which people are talking about moving to a new home.",
  ask:"what each speaker says about moving",
  opts:["I miss the neighbours I had before.","The move cost more than I'd planned.","I'm still getting used to the quiet.","I have more space for my hobby now.","I was against the move at first.","I found packing harder than I expected.","My journey to work or school is much easier now.","I've had problems with the new building."],
  speakers:SP("G1","F3","M1","B1","F2"),
  lines:[
    {sp:"Speaker 1", t:"When my parents told me we were moving to the coast, I was furious. I'd have to change schools in the middle of the year and leave all my friends. I didn't speak to them for days. But now, honestly, I love it. I can walk to the beach after school, and my new friends are great. I still message my old friends every day, though."},
    {sp:"Speaker 2", t:"We moved from the centre of London to a small village. Everyone said I'd miss the shops and restaurants, but I really don't. What I can't get used to is how silent it is at night. In London there was always traffic, sirens, people talking. Here, nothing. For the first month I couldn't sleep at all – I actually played recordings of city noise! My husband sleeps like a baby, of course."},
    {sp:"Speaker 3", t:"The flat looked perfect when we viewed it – new kitchen, lovely views. But since we moved in, it's been one thing after another. First the heating stopped working, then water started coming through the bathroom ceiling. The landlord's slow to fix anything. The location's great – I can walk to the office in ten minutes – but I'm already looking for somewhere else. It's such a shame, because I really wanted to stay for a few years."},
    {sp:"Speaker 4", t:"Our old flat was tiny, and my drum kit had to live in my grandparents' garage. Now we've got a house with a basement, and I've turned it into a music room. I can practise whenever I want without annoying anyone. The packing went quite smoothly, actually – Mum had organised everything weeks before. My new school's further away, though, so I have to get up much earlier for the bus."},
    {sp:"Speaker 5", t:"We'd worked out a budget for everything – the van, the cleaning, new curtains. But we hadn't thought about all the little things. The new place needed a different kind of washing machine, all our lamps had the wrong plugs, and then the van company charged us extra because we took longer than planned. We spent nearly double what we'd expected. Next time I'll add an extra few hundred pounds to the budget, just in case."}
  ],
  qs:[
    {n:1, correct:4, evidence:"I was furious",
     why:"Když se o stěhování dozvěděla, zuřila a dny s rodiči nemluvila – zpočátku byla proti.", trap:"Chybí jí kamarádi, ne sousedé (A) – a s nimi si stejně denně píše.", tt:"change"},
    {n:2, correct:2, evidence:"What I can't get used to is how silent it is at night",
     why:"Na vesnické ticho si pořád nemůže zvyknout – kvůli němu nemohla spát.", trap:"Obchody a restaurace jí nechybí – „I really don't“.", tt:"distractor"},
    {n:3, correct:7, evidence:"it's been one thing after another",
     why:"Topení, zatékající strop, pomalý pronajímatel → problémy s bytem.", trap:"Do kanceláře to má deset minut pěšky (G), ale hlavní sdělení je o problémech s bytem.", tt:"distractor"},
    {n:4, correct:3, evidence:"I've turned it into a music room",
     why:"Ve sklepě má hudebnu a může bubnovat kdykoli → víc místa pro koníček.", trap:"Balení šlo hladce („quite smoothly“) – F neplatí.", tt:"distractor"},
    {n:5, correct:1, evidence:"We spent nearly double what we'd expected",
     why:"Pračka, zástrčky, příplatek za dodávku – stěhování stálo skoro dvakrát víc.", trap:"Rozpočet si udělali („worked out a budget“), ale nezahrnul drobnosti.", tt:"paraphrase"}
  ]},

{ id:"p3-06", title:"Watching a big sports event", context:"You will hear five short extracts in which people are talking about watching a big sports event live.",
  ask:"what each speaker says about the event",
  opts:["I couldn't see very much from my seat.","I was surprised by how friendly the other fans were.","I met a famous sports star.","It was much better than watching on television.","I had to travel a long way to get there.","I didn't really understand the sport.","The tickets were a present.","The weather affected the event."],
  speakers:SP("M2","F1","M3","F2","M1"),
  lines:[
    {sp:"Speaker 1", t:"My girlfriend's crazy about rugby, so I went with her to an international match. The atmosphere was incredible, and everyone was singing. But I had absolutely no idea what was going on. Why did they keep stopping? Why was everyone cheering when nothing seemed to happen? She tried to explain, but I gave up after ten minutes and just enjoyed the noise. I'd probably go again, but only if she explains the rules to me first."},
    {sp:"Speaker 2", t:"We'd had tickets for the tennis final for months. It was a beautiful morning, but just as the players came out, the sky went black and it started pouring. They covered the court and we waited for over two hours. In the end, they finished the match the next day, and we couldn't go back because we both had to work. We watched the end on my phone at work instead, which wasn't quite the same."},
    {sp:"Speaker 3", t:"I'd heard football crowds could be quite aggressive, so I was a bit nervous about taking my son to his first big match. But it wasn't like that at all. The fans around us chatted to us, shared their snacks, and one man even lent my son his scarf when he got cold. Our seats were high up, but you could see everything perfectly. He wants to go to every match now."},
    {sp:"Speaker 4", t:"I'd never have paid for a ticket to the athletics myself – they were really expensive. But my sister won two in a competition at work and couldn't go, so she gave them to me for my birthday. Seeing the hundred metres final from so close was amazing. We waited outside afterwards, hoping to meet some of the athletes, but no luck. I'd only ever watched it on TV before."},
    {sp:"Speaker 5", t:"The cycling race went right past a village in the mountains, so we drove for nine hours through the night to get there. We stood by the road for hours, and then the riders went past in about thirty seconds! Honestly, you see more of the race on television, but being there was special, and I'd do it again. My legs were aching for days afterwards from all the standing."}
  ],
  qs:[
    {n:1, correct:5, evidence:"I had absolutely no idea what was going on",
     why:"Ragby vůbec nerozuměl – proč se zastavují, proč lidé jásají – a vzdal to.", trap:"Atmosféra byla skvělá, ale o přátelskosti fanoušků (B) nemluví.", tt:"paraphrase"},
    {n:2, correct:7, evidence:"just as the players came out, the sky went black and it started pouring",
     why:"Liják přerušil finále a dohrávalo se další den → počasí ovlivnilo akci.", trap:"„A beautiful morning“ na začátku je past – pak se počasí změnilo.", tt:"change"},
    {n:3, correct:1, evidence:"The fans around us chatted to us, shared their snacks",
     why:"Čekal agresivní dav, ale fanoušci si s nimi povídali a dělili se o jídlo → překvapivě přátelští.", trap:"Sedadla vysoko, ale „you could see everything perfectly“ – A neplatí.", tt:"distractor"},
    {n:4, correct:6, evidence:"she gave them to me for my birthday",
     why:"Vstupenky dostala od sestry k narozeninám.", trap:"Na sportovce čekali, ale „no luck“ – C neplatí.", tt:"distractor"},
    {n:5, correct:4, evidence:"we drove for nine hours through the night to get there",
     why:"Jeli devět hodin přes noc do hor → dlouhá cesta.", trap:"„You see more of the race on television“ – výslovně tedy NEtvrdí, že je to lepší než televize (D).", tt:"distractor"}
  ]},

{ id:"p3-07", title:"A first holiday without parents", context:"You will hear five short extracts in which people are talking about their first holiday without their parents.",
  ask:"what each speaker says about the holiday",
  opts:["We ran out of money before the end.","I realised how much my parents usually did for me.","I got lost in an unfamiliar place.","I made friends with people from other countries.","Our accommodation was disappointing.","I was ill for part of the trip.","We argued about what to do each day.","I enjoyed it less than I'd expected."],
  speakers:SP("B1","G1","F2","M2","F1"),
  lines:[
    {sp:"Speaker 1", t:"Four of us went camping in France after our exams. I'd always thought holidays were easy – you just turn up and relax. But nobody had brought anything to cook with, nobody had checked how to get to the campsite, and nobody knew how to put up the tent. I suddenly understood why my mum spends weeks organising our family holidays. We managed in the end, but it took a lot longer than we'd planned."},
    {sp:"Speaker 2", t:"I went to a summer language school in Malta with my best friend. The lessons were OK, but the best thing was the other students. There were people from Brazil, Japan, Germany – everywhere. We went to the beach together every afternoon, and I'm still in touch with most of them. I'm going to visit a girl in Tokyo next year. I even learnt a bit of Portuguese from the Brazilian girls."},
    {sp:"Speaker 3", t:"My friends and I went to Barcelona for a week. The apartment was great and the city was beautiful. The problem was that we all wanted different things. Jake wanted to go clubbing every night, Sara wanted to see every museum, and I just wanted to lie on the beach. By day three we were hardly speaking. Next time I'm going on my own!"},
    {sp:"Speaker 4", t:"We'd saved up for months for our trip to Greece. On the second day I ate some seafood at a little restaurant by the harbour, and that night I was terribly sick. I spent the next three days in bed while my friends went out exploring. I still had a good time in the end, but I haven't eaten prawns since! My friends brought me soup and told me all about the islands they'd visited."},
    {sp:"Speaker 5", t:"We'd planned everything carefully, or so we thought. But everything in Norway was so much more expensive than at home – even a coffee cost a fortune. By the last two days we were living on bread and bananas from the supermarket. My dad had to send me money for the train home, which was a bit embarrassing. Still, we saw some amazing fjords, and I'd love to go back one day with more money."}
  ],
  qs:[
    {n:1, correct:1, evidence:"I suddenly understood why my mum spends weeks organising our family holidays",
     why:"Nikdo nic nezařídil – teprve teď pochopil, kolik práce máma s dovolenou má.", trap:"Cestu do kempu nikdo neověřil, ale o tom, že by se ztratil (C), neříká nic.", tt:"paraphrase"},
    {n:2, correct:3, evidence:"There were people from Brazil, Japan, Germany – everywhere",
     why:"Spřátelila se se studenty z celého světa a s většinou je stále v kontaktu.", trap:"Hodiny byly jen „OK“, ale to není žádná z možností.", tt:"paraphrase"},
    {n:3, correct:6, evidence:"we all wanted different things",
     why:"Každý chtěl něco jiného (kluby, muzea, pláž) a třetí den spolu skoro nemluvili.", trap:"Apartmán byl „great“ – E neplatí.", tt:"distractor"},
    {n:4, correct:5, evidence:"that night I was terribly sick",
     why:"Po mořských plodech mu bylo zle a tři dny proležel.", trap:"„I still had a good time in the end“ – H (užil si to méně) neplatí.", tt:"distractor"},
    {n:5, correct:0, evidence:"By the last two days we were living on bread and bananas",
     why:"V Norsku bylo vše drahé, na konci jedli chleba a banány a táta poslal peníze → došly peníze.", trap:"Táta pomohl, ale neříká, že si uvědomila, co pro ni rodiče dělají (B).", tt:"paraphrase"}
  ]},

{ id:"p3-08", title:"A teacher who made a difference", context:"You will hear five short extracts in which people are talking about a teacher who influenced them.",
  ask:"what each speaker says about the teacher",
  opts:["The teacher helped me with a personal problem.","The teacher introduced me to a hobby.","The teacher noticed a talent I didn't know I had.","The teacher was strict, but fair.","The teacher made a boring subject interesting.","The teacher made me more confident about speaking in public.","The teacher encouraged me when I wanted to give up.","The teacher is now a friend of mine."],
  speakers:SP("M1","F1","G1","M3","F2"),
  lines:[
    {sp:"Speaker 1", t:"Mr Hughes was our art teacher. I'd always thought I was rubbish at art. But one day he saw a cartoon I'd drawn on the back of my maths book – I thought I'd be in trouble! Instead, he said I had a real gift for drawing people and asked me to design the poster for the school play. Now I work as an illustrator."},
    {sp:"Speaker 2", t:"History was always my least favourite subject – just dates and kings. Then Mrs Patel arrived. She turned every lesson into a story, with real people who had problems just like ours. She'd even dress up sometimes! I went from nearly failing to getting top marks, and I still read history books for fun. She made us want to find out what happened next, just like in a good TV series. I'd never felt like that about a school subject before."},
    {sp:"Speaker 3", t:"I'd been learning the violin for three years and I was ready to quit. I wasn't improving, and my friends thought it was uncool. My teacher, Ms Lane, didn't try to force me. She just asked me to give it one more term and found me some pop songs to play instead of the usual classical pieces. I'm so glad I stayed – I play in an orchestra now."},
    {sp:"Speaker 4", t:"Mr Brown, our maths teacher, was famous for being tough. If you hadn't done your homework, you stayed behind – no excuses. Everyone was a bit scared of him. But he treated everyone exactly the same, whether you were the best or the worst in the class, and he always explained things again if you asked. We all respected him. I didn't like him much at the time, but now I can see he was a great teacher."},
    {sp:"Speaker 5", t:"When my parents split up, I was fifteen, and I found it really hard. My marks went down and I stopped talking to my friends. My English teacher noticed something was wrong and asked me to stay after class. She didn't push me, she just listened. She also ran the debate club, but I never joined that. I'll never forget how kind she was."}
  ],
  qs:[
    {n:1, correct:2, evidence:"he said I had a real gift for drawing people",
     why:"Myslel si, že na výtvarku nemá, ale učitel v jeho karikatuře objevil talent → dnes je ilustrátor.", trap:"Kreslení není nový koníček (B) – kreslil už předtím, jen o talentu nevěděl.", tt:"paraphrase"},
    {n:2, correct:4, evidence:"She turned every lesson into a story",
     why:"Dějepis byl nudný („just dates and kings“), ale paní Patel z něj udělala příběhy → zajímavý předmět.", trap:"Čtení historických knih je důsledek, ne nový koníček od učitelky (B).", tt:"paraphrase"},
    {n:3, correct:6, evidence:"She just asked me to give it one more term",
     why:"Chtěla s houslemi skončit, učitelka ji přemluvila na ještě jedno pololetí a dala jí pop písničky.", trap:"Hra v orchestru je výsledek; učitelka ji nenutila („didn't try to force me“).", tt:"paraphrase"},
    {n:4, correct:3, evidence:"he treated everyone exactly the same",
     why:"Byl přísný (no excuses), ale ke všem stejný a ochotně vysvětloval → přísný, ale spravedlivý.", trap:"„Scared of him“ zní negativně, ale „We all respected him“.", tt:"attitude"},
    {n:5, correct:0, evidence:"She didn't push me, she just listened",
     why:"Učitelka si všimla jejích problémů po rozvodu rodičů a vyslechla ji → pomoc s osobním problémem.", trap:"Debatní klub (F) vedla, ale „I never joined that“.", tt:"distractor"}
  ]}
);
})(window.DATA.listening);

/* ===================================================================================== PART 4 (1–4) */
(function(L){
"use strict";
L.p4.push(
{ id:"p4-01", title:"A young climber", context:"You will hear an interview with a young climber called Ellie Ward.",
  speakers:{"Interviewer":"M2","Ellie":"G1"},
  lines:[
    {sp:"Interviewer", t:"My guest today is Ellie Ward, who at nineteen is one of the best young climbers in the country. Ellie, how did you get started?"},
    {sp:"Ellie", t:"Well, it wasn't my idea at all. My dad used to climb when he was younger, and everyone assumes he took me. But actually, he'd stopped long before I was born. It was my best friend's birthday party, at an indoor climbing wall, when I was eight. Everyone else got bored after half an hour, and I didn't want to come down. I begged my parents for lessons after that."},
    {sp:"Interviewer", t:"And you started competing quite young?"},
    {sp:"Ellie", t:"At eleven, yes. To be honest, I didn't enjoy the first few competitions. I wasn't nervous exactly, but I hated waiting around all day for my turn. What kept me going was the other climbers. In climbing, people help each other – they'll shout advice to you even if you're competing against them. That's quite unusual in sport, I think."},
    {sp:"Interviewer", t:"What goes through your mind before a big climb?"},
    {sp:"Ellie", t:"People expect me to say I'm scared of falling, but you're always attached to a rope, so falling isn't really a problem. I just get very quiet. I look at the route for ages and plan every move in my head, like a puzzle. If I've planned it properly, I feel calm. It's when I haven't had time to study the route that I start to panic."},
    {sp:"Interviewer", t:"Last year you had a serious injury. What happened?"},
    {sp:"Ellie", t:"I hurt my shoulder in training – nothing dramatic, I just reached for a hold in the wrong way. I couldn't climb for five months. The pain wasn't too bad, and the exercises the doctors gave me were boring but fine. The worst part was watching my friends go off to competitions without me. I felt completely left out, and I started to wonder if I'd ever be as good again."},
    {sp:"Interviewer", t:"Do you prefer climbing indoors or outside on real rock?"},
    {sp:"Ellie", t:"Competitions are all indoors, so that's where I train most. And indoor walls are great – they're safe, and you can climb in any weather. But nothing beats being outside. Last summer I climbed in Spain, on these orange cliffs above the sea, and I felt so free. Indoors, someone has designed the route for you. Outside, you have to find your own way up. I'd climb outside every weekend if I could, but the nearest good rock is three hours from where I live."},
    {sp:"Interviewer", t:"What advice would you give to someone who wants to try climbing?"},
    {sp:"Ellie", t:"Don't spend lots of money on equipment straight away – most climbing centres will lend you shoes. And don't worry if your arms ache at first. Beginners always try to pull themselves up with their arms, but the secret is to use your legs. They're much stronger. Once you learn that, it gets much easier."},
    {sp:"Interviewer", t:"And what's next for you?"},
    {sp:"Ellie", t:"Everyone asks if I'm aiming for the Olympics. Maybe one day, but right now I'm starting a university course in sports science in September, and I want to do well at that. I'll keep competing, of course. And I'd love to coach young climbers one day, especially girls, because there still aren't enough of them in the sport."}
  ],
  qs:[
    {q:"How did Ellie start climbing?", opts:["Her father taught her.","She went to a party at a climbing centre.","She tried it on a school trip."], correct:1,
     evidence:"It was my best friend's birthday party, at an indoor climbing wall",
     why:"Poprvé lezla na narozeninové oslavě kamarádky na umělé stěně, pak prosila o lekce.", trap:"Táta lezl, ale „he'd stopped long before I was born“ – to si jen všichni myslí.", tt:"distractor"},
    {q:"What does Ellie like about climbing competitions?", opts:["the support between competitors","the chance to win prizes","the long breaks between climbs"], correct:0,
     evidence:"In climbing, people help each other",
     why:"Lezci si radí, i když proti sobě soutěží – to ji u závodů drželo.", trap:"Celodenní čekání na řadu naopak nesnášela („I hated waiting around“).", tt:"distractor"},
    {q:"How does Ellie prepare for a difficult climb?", opts:["She works out each movement in advance.","She tries not to think about falling.","She asks her coach for advice."], correct:0,
     evidence:"plan every move in my head, like a puzzle",
     why:"Dlouho studuje cestu a v hlavě si naplánuje každý pohyb.", trap:"Pád ji netrápí – je jištěná lanem; to jen lidé čekají, že řekne.", tt:"paraphrase"},
    {q:"What did Ellie find hardest about her injury?", opts:["the pain in her shoulder","doing the exercises","missing out on events"], correct:2,
     evidence:"The worst part was watching my friends go off to competitions without me",
     why:"Nejhorší bylo dívat se, jak kamarádi jezdí na závody bez ní → cítila se odstrčená.", trap:"Bolest „wasn't too bad“ a cviky byly „boring but fine“.", tt:"distractor"},
    {q:"Why does Ellie prefer climbing outdoors?", opts:["It is safer.","She can climb in any weather.","She has to decide her own route."], correct:2,
     evidence:"Outside, you have to find your own way up",
     why:"Venku si cestu nahoru musí najít sama, uvnitř ji za ni někdo navrhl.", trap:"Bezpečí a lezení za každého počasí jsou výhody UMĚLÉ stěny.", tt:"distractor"},
    {q:"What is Ellie's main advice to beginners?", opts:["Buy good shoes before you start.","Use your legs more than your arms.","Build up the strength in your arms."], correct:1,
     evidence:"the secret is to use your legs",
     why:"Tajemství je používat nohy – jsou mnohem silnější než ruce.", trap:"Boty si mají naopak půjčit, ne kupovat. Bolest rukou je chyba začátečníků, ne cíl.", tt:"distractor"},
    {q:"What is Ellie going to do in the near future?", opts:["train for the Olympics","begin a course of study","start coaching girls"], correct:1,
     evidence:"right now I'm starting a university course in sports science in September",
     why:"„Right now“ – v září začíná studovat sportovní vědy na univerzitě.", trap:"Olympiáda je „maybe one day“ a trénování dívek je vzdálené přání („one day“).", tt:"distractor"}
  ]},

{ id:"p4-02", title:"Making science videos", context:"You will hear an interview with Sam Okafor, a young man who makes science videos online.",
  speakers:{"Interviewer":"F1","Sam":"B1"},
  lines:[
    {sp:"Interviewer", t:"Today I'm talking to Sam Okafor, whose science videos have been watched by millions of people. Sam, you're only twenty-two. How did it all start?"},
    {sp:"Sam", t:"It started as homework, believe it or not. Our physics teacher asked us to explain an experiment in any way we liked, and most people wrote an essay. I made a short video in my kitchen, showing why ice floats. I put it online for my classmates to see, and somehow, within a week, fifty thousand people had watched it."},
    {sp:"Interviewer", t:"Why do you think it was so popular?"},
    {sp:"Sam", t:"I've thought about that a lot. It wasn't the filming – that was terrible, really shaky. And the science was quite simple. I think people liked that I was obviously having fun and that I made mistakes. At one point I dropped a whole tray of ice on the floor, and I didn't cut it out. People said it made them feel that science wasn't just for clever people."},
    {sp:"Interviewer", t:"How do you choose topics for your videos now?"},
    {sp:"Sam", t:"Most of them come from my viewers. I get hundreds of questions every week, some of them really strange, like why cats always land on their feet. I pick the ones that I don't know the answer to myself, because then I'm learning at the same time as the audience, and I think that comes across in the videos."},
    {sp:"Interviewer", t:"Is it a full-time job now?"},
    {sp:"Sam", t:"It is, yes, although my parents weren't keen at first. They wanted me to finish my engineering degree, and to be fair, I did – I graduated last summer. The money's OK, but not as much as people imagine. What I didn't expect was how much time goes into things that aren't science at all – answering emails, talking to companies, organising the filming. Only about half my week is spent actually making videos."},
    {sp:"Interviewer", t:"You get a lot of comments online. How do you deal with the negative ones?"},
    {sp:"Sam", t:"At first I took them really personally. Someone would say my explanation was wrong, and I'd lie awake all night. Now I read them differently. If a comment is just rude, I ignore it. But if someone's pointing out a real mistake, I'm actually grateful. I've made a few correction videos, and they're often more popular than the original!"},
    {sp:"Interviewer", t:"What's been your favourite moment so far?"},
    {sp:"Sam", t:"Probably last year, when a teacher in Kenya sent me a message. Her school didn't have equipment for experiments, so she'd been showing my videos in her lessons. She sent me a photo of her whole class watching one together. That meant more to me than any number of views. I've kept that photo on my desk ever since, and I look at it whenever I'm finding the work hard."},
    {sp:"Interviewer", t:"Finally, what's next?"},
    {sp:"Sam", t:"I've been asked to present a science programme on TV, which is exciting, but I've said no for now, because I'd lose control over what I make. Instead, I'm writing a book of simple experiments for children, using things you can find in any kitchen. It'll be out next spring."}
  ],
  qs:[
    {q:"Sam made his first video", opts:["as part of a school task.","to show his family an experiment.","for a science competition."], correct:0,
     evidence:"It started as homework, believe it or not",
     why:"První video byl domácí úkol z fyziky – vysvětlit pokus libovolnou formou.", trap:"Natáčel v kuchyni, ale pro spolužáky, ne pro rodinu. O soutěži nemluví.", tt:"paraphrase"},
    {q:"Sam believes his first video was successful because", opts:["it explained a complicated idea.","it was well filmed.","it showed that he wasn't perfect."], correct:2,
     evidence:"I think people liked that I was obviously having fun and that I made mistakes",
     why:"Lidem se líbilo, že se bavil a dělal chyby (spadlý tác s ledem) – věda není jen pro chytré.", trap:"Natáčení bylo „terrible“ a věda „quite simple“ – A i B tedy neplatí.", tt:"distractor"},
    {q:"How does Sam choose the subjects for his videos?", opts:["He picks questions he can't answer himself.","He picks the questions viewers ask most often.","He follows what is taught in schools."], correct:0,
     evidence:"I pick the ones that I don't know the answer to myself",
     why:"Vybírá otázky, na které sám nezná odpověď – učí se spolu s diváky.", trap:"Otázky posílají diváci, ale nevybírá ty nejčastější – vybírá ty, které sám neumí.", tt:"paraphrase"},
    {q:"What has surprised Sam about his job?", opts:["how much money he earns","how much of his time goes on other tasks","how supportive his parents have been"], correct:1,
     evidence:"What I didn't expect was how much time goes into things that aren't science at all",
     why:"Nečekal, kolik času zaberou e-maily, firmy a organizace – natáčí jen polovinu týdne.", trap:"Peníze jsou „not as much as people imagine“; rodiče zpočátku „weren't keen“.", tt:"distractor"},
    {q:"How does Sam now feel about comments that correct his mistakes?", opts:["He is pleased to receive them.","He finds them upsetting.","He tries to ignore them."], correct:0,
     evidence:"But if someone's pointing out a real mistake, I'm actually grateful",
     why:"Za upozornění na skutečnou chybu je vděčný (grateful = pleased) a natáčí opravná videa.", trap:"Rozrušovalo ho to „at first“; ignoruje jen hrubé komentáře.", tt:"change"},
    {q:"Sam's favourite moment involved", opts:["reaching a record number of viewers.","hearing that his videos helped some students.","visiting a school abroad."], correct:1,
     evidence:"she'd been showing my videos in her lessons",
     why:"Učitelka z Keni pouštěla jeho videa ve třídě bez vybavení – to pro něj znamenalo víc než zhlédnutí.", trap:"„More than any number of views“ – počet diváků výslovně odsouvá. Do Keni necestoval.", tt:"distractor"},
    {q:"What is Sam going to do next?", opts:["present a TV programme","go back to university","publish a book"], correct:2,
     evidence:"I'm writing a book of simple experiments for children",
     why:"Píše knihu jednoduchých pokusů pro děti, vyjde na jaře.", trap:"Televizní pořad odmítl („I've said no for now“).", tt:"distractor"}
  ]},

{ id:"p4-03", title:"A wildlife photographer", context:"You will hear an interview with a wildlife photographer called Rachel Moss.",
  speakers:{"Interviewer":"M3","Rachel":"F3"},
  lines:[
    {sp:"Interviewer", t:"My guest is Rachel Moss, whose photographs of British wildlife have won several international prizes. Rachel, you didn't start out as a photographer, did you?"},
    {sp:"Rachel", t:"No, I worked in a bank for ten years. I'd always loved nature, but photography was just something I did on holiday. Then the bank closed my branch, and I was given some money to leave. Most of my colleagues found other jobs in finance, but I thought, if I don't try photography now, I never will."},
    {sp:"Interviewer", t:"Was it difficult at first?"},
    {sp:"Rachel", t:"Very. I knew how to use a camera, but I didn't know anything about the business side – how to sell pictures, how to find clients. For the first two years I earned almost nothing. What saved me was a competition. I entered a photo of a fox in the snow, and it won first prize. Suddenly magazines were calling me."},
    {sp:"Interviewer", t:"Your photos often show very common animals – foxes, pigeons, even rats. Why is that?"},
    {sp:"Rachel", t:"Lots of photographers travel to Africa or the Arctic to photograph rare animals, and their pictures are amazing. But I think people forget how interesting the animals around them are. If I can make someone look at a pigeon in a different way, I've done my job. And it's better for the planet if I don't fly everywhere."},
    {sp:"Interviewer", t:"So you don't travel abroad at all?"},
    {sp:"Rachel", t:"Hardly ever now. I went to Norway once to photograph whales, and the trip was wonderful, but I came home thinking I could have taken equally good pictures twenty minutes from my house."},
    {sp:"Interviewer", t:"How long does it take to get a good picture?"},
    {sp:"Rachel", t:"It depends, but usually much longer than people think. For my photo of a kingfisher catching a fish, I sat in a small tent by the river every morning for six weeks. I got wet, I got cold, and I got very bored. But you need that patience. The animals have to forget you're there."},
    {sp:"Interviewer", t:"Do you use a lot of expensive equipment?"},
    {sp:"Rachel", t:"Less than you'd imagine. Of course, a good camera helps. But some of my favourite pictures were taken with a very old camera that I bought second-hand. Equipment can't teach you where to stand or when to press the button. That comes from understanding the animal – knowing how it behaves and what it's likely to do next."},
    {sp:"Interviewer", t:"You also run workshops for amateur photographers. What's the most common mistake you see?"},
    {sp:"Rachel", t:"People take far too many pictures. They hold the button down and take hundreds of photos in a few seconds, hoping one will be good. Then they spend hours at home deleting them. I tell them to slow down, watch the animal, and take one photo at the right moment."},
    {sp:"Interviewer", t:"And what are you working on at the moment?"},
    {sp:"Rachel", t:"A book about animals that live in cities. I'm spending this year photographing wildlife in London at night – badgers, foxes, owls. It's strange working when everyone else is asleep, but I love it. And I don't need a passport!"}
  ],
  qs:[
    {q:"Why did Rachel become a professional photographer?", opts:["She was unhappy in her job at the bank.","Losing her job gave her an opportunity.","A colleague encouraged her to try."], correct:1,
     evidence:"Then the bank closed my branch, and I was given some money to leave",
     why:"Banka zavřela pobočku, dostala odstupné a řekla si: teď, nebo nikdy → příležitost.", trap:"O nespokojenosti v bance nemluví; kolegové šli dělat jinam do financí – nikdo ji nepovzbuzoval.", tt:"inference"},
    {q:"What helped Rachel most at the start of her career?", opts:["winning a competition","doing a business course","getting a job on a magazine"], correct:0,
     evidence:"What saved me was a competition",
     why:"Zachránila ji soutěž – fotka lišky ve sněhu vyhrála a začaly volat časopisy.", trap:"Časopisy přišly až PO výhře; obchodní kurz nezmiňuje.", tt:"distractor"},
    {q:"Why does Rachel photograph ordinary animals?", opts:["Travelling abroad is too expensive.","Rare animals are difficult to find.","She wants people to notice the wildlife near them."], correct:2,
     evidence:"people forget how interesting the animals around them are",
     why:"Chce, aby lidé viděli, jak zajímavá jsou zvířata kolem nich (třeba holub).", trap:"Cestování odmítá kvůli planetě, ne kvůli ceně.", tt:"paraphrase"},
    {q:"What does Rachel say about her photo of a kingfisher?", opts:["It was taken by chance.","It needed a lot of patience.","It was taken in very bad weather."], correct:1,
     evidence:"I sat in a small tent by the river every morning for six weeks",
     why:"Šest týdnů každé ráno čekala ve stanu – „you need that patience“.", trap:"Promokla a byla jí zima, ale to není hlavní sdělení – jde o trpělivost.", tt:"paraphrase"},
    {q:"According to Rachel, what matters most for a wildlife photographer?", opts:["having the latest equipment","knowing how animals behave","using an old camera"], correct:1,
     evidence:"That comes from understanding the animal",
     why:"Kam se postavit a kdy zmáčknout spoušť – to dá jen znalost chování zvířete.", trap:"Starý fotoaparát je jen příklad, že vybavení není hlavní.", tt:"distractor"},
    {q:"What mistake do Rachel's students often make?", opts:["They take too many photos.","They spend too long editing.","They frighten the animals."], correct:0,
     evidence:"People take far too many pictures",
     why:"Fotí stovky snímků naráz v naději, že jeden bude dobrý.", trap:"Mazání doma je DŮSLEDEK chyby, ne chyba sama.", tt:"distractor"},
    {q:"Rachel's current project is about", opts:["animals in other countries.","rare birds.","wildlife in towns and cities."], correct:2,
     evidence:"A book about animals that live in cities",
     why:"Píše knihu o zvířatech ve městech – fotí noční Londýn.", trap:"Sovy jsou jen jeden příklad; „I don't need a passport“ – nejde o cizí země.", tt:"paraphrase"}
  ]},

{ id:"p4-04", title:"Talking about a gap year", context:"You will hear a conversation between two friends, Max and Lily, who are talking about taking a gap year before university.",
  speakers:{"Lily":"G1","Max":"B1"},
  lines:[
    {sp:"Lily", t:"So, Max, have you decided what you're doing next year? Are you still going straight to university?"},
    {sp:"Max", t:"Actually, no. I've decided to take a gap year. My parents weren't happy at first – they think I'll lose the habit of studying. But I've been studying non-stop since I was four. I just feel I need a break before three more years of it, otherwise I'll burn out."},
    {sp:"Lily", t:"I can understand that. What are you going to do, though? Just sit at home?"},
    {sp:"Max", t:"No way! For the first six months I'm going to work in my uncle's restaurant to save money. Then I want to travel round South America. I've been learning Spanish for two years, and I want to see if I can actually use it."},
    {sp:"Lily", t:"Are you going on your own?"},
    {sp:"Max", t:"At first, yes. My friend Tom might join me in Peru for the last month, but he hasn't decided yet. I'm a bit nervous about travelling alone, but I think it'll be good for me."},
    {sp:"Lily", t:"That sounds amazing. I'd love to do something like that, but I don't think I could."},
    {sp:"Max", t:"Why not? Is it the money?"},
    {sp:"Lily", t:"Partly, but mainly I'm worried I'd fall behind. All my friends will be starting university, and by the time I got there, they'd be in their second year. I'd feel like the new girl all over again. I hated that feeling when we moved schools."},
    {sp:"Max", t:"I get that. But my cousin took a gap year, and he said it was the best thing he ever did. He worked on a farm in New Zealand, and when he started university, he was much more organised than everyone else. He knew how to cook and how to manage his money."},
    {sp:"Lily", t:"Hmm. I suppose that's true. Mum always says I can't even boil an egg!"},
    {sp:"Max", t:"Exactly! Anyway, a gap year doesn't have to be about travelling. You could do some volunteering, or get some work experience in the kind of job you want."},
    {sp:"Lily", t:"Work experience. I hadn't thought of that. I want to be a vet, and it's really hard to get onto the course. Some experience with animals would really help my application."},
    {sp:"Max", t:"There you go! You could work at an animal hospital or on a farm for a few months."},
    {sp:"Lily", t:"Maybe. I'd have to apply to universities again, though, and that was so stressful the first time."},
    {sp:"Max", t:"True, but you'd have more time to do it properly. You could visit a few universities and really think about which one suits you. Anyway, what do your parents think about gap years?"},
    {sp:"Lily", t:"Dad would be fine with it. He travelled for a year in his twenties and he's always telling stories about it. Mum's the one who'd worry. She'd probably want me to stay at home the whole year."},
    {sp:"Max", t:"Well, if you stayed local and worked with animals, she'd probably be happy."},
    {sp:"Lily", t:"That's true. OK, I'm not saying I'll do it. But I'll talk to my parents this weekend and see what they think."},
    {sp:"Max", t:"Great. And if you end up in South America, let me know!"}
  ],
  qs:[
    {q:"Why has Max decided to take a gap year?", opts:["His parents suggested it.","He feels tired of studying.","He didn't get a place at university."], correct:1,
     evidence:"I just feel I need a break before three more years of it",
     why:"Studuje bez přestávky od čtyř let a potřebuje pauzu, jinak „vyhoří“.", trap:"Rodiče naopak „weren't happy at first“.", tt:"distractor"},
    {q:"What does Max plan to do first?", opts:["earn some money","improve his Spanish","travel round South America"], correct:0,
     evidence:"For the first six months I'm going to work in my uncle's restaurant to save money",
     why:"Prvních šest měsíců bude pracovat v restauraci a šetřit.", trap:"Cestování přijde až potom („Then…“); španělštinu se už dva roky učí.", tt:"paraphrase"},
    {q:"What worries Lily most about taking a gap year?", opts:["the cost","having to change schools again","being a year behind her friends"], correct:2,
     evidence:"mainly I'm worried I'd fall behind",
     why:"Hlavně se bojí, že kamarádi budou o ročník napřed a ona zase „ta nová“.", trap:"Peníze jen „partly“; změna školy je vzpomínka na pocit z minulosti.", tt:"distractor"},
    {q:"According to Max, how did his cousin benefit from his gap year?", opts:["He became more independent.","He made a lot of money.","He decided what to study."], correct:0,
     evidence:"he was much more organised than everyone else",
     why:"Bratranec byl organizovanější, uměl vařit a hospodařit s penězi → samostatnější.", trap:"„Manage his money“ neznamená, že vydělal hodně peněz.", tt:"paraphrase"},
    {q:"Lily realises that a gap year could help her", opts:["choose a career.","get onto a university course.","feel less stressed."], correct:1,
     evidence:"Some experience with animals would really help my application",
     why:"Praxe se zvířaty by jí pomohla dostat se na veterinu, kam je těžké se dostat.", trap:"Povolání už má jasné („I want to be a vet“); přihlášky jsou pro ni naopak stresující.", tt:"inference"},
    {q:"How does Lily think her mother would react to a gap year?", opts:["She'd be enthusiastic.","She'd tell stories about her own travels.","She'd be anxious."], correct:2,
     evidence:"Mum's the one who'd worry",
     why:"Máma by se bála a nejradši by ji nechala celý rok doma.", trap:"Příběhy z cest vypráví TÁTA a ten by byl v pohodě.", tt:"distractor"},
    {q:"What does Lily decide to do?", opts:["take a gap year","discuss the idea with her family","visit Max in South America"], correct:1,
     evidence:"I'll talk to my parents this weekend",
     why:"Zatím nic neslibuje, ale o víkendu to probere s rodiči.", trap:"„I'm not saying I'll do it“ – rozhodnutí o gap year ještě nepadlo.", tt:"distractor"}
  ]}
);
})(window.DATA.listening);

/* ===================================================================================== PART 4 (5–8) */
(function(L){
"use strict";
L.p4.push(
{ id:"p4-05", title:"An actor's first big role", context:"You will hear an interview with a young actor called James Reid, who is appearing in his first big theatre play.",
  speakers:{"Interviewer":"F2","James":"M1"},
  lines:[
    {sp:"Interviewer", t:"James, congratulations on the play. It's been getting great reviews. How did you get the part?"},
    {sp:"James", t:"Thanks! It was quite unexpected, actually. I'd been working as a waiter for two years, going to auditions in my free time and getting nowhere. I'd almost decided to give up and train as a teacher. Then my agent rang and said the director had seen me in a small student film and wanted to meet me. I didn't even have to audition."},
    {sp:"Interviewer", t:"What was the first day of rehearsals like?"},
    {sp:"James", t:"Terrifying! All the other actors were famous, people I'd watched on TV since I was a child. I was sure they'd think I was a beginner who didn't belong there. But the lead actress, Helen Kerr, came over at lunch and asked me loads of questions about myself. By the end of the week I felt part of the team."},
    {sp:"Interviewer", t:"Your character is quite unpleasant, isn't he?"},
    {sp:"James", t:"He's horrible! He lies to everyone, including his own family. At first I found him really hard to play, because I kept trying to make him nicer. The director told me to stop judging him and just try to understand why he behaves like that. Once I did that, it all made sense, and I actually started to feel a bit sorry for him."},
    {sp:"Interviewer", t:"Is acting on stage very different from acting in films?"},
    {sp:"James", t:"Completely. In a film, if you make a mistake, you just do it again. On stage, there's no second chance. Last week I forgot a whole line, and another actor had to cover for me. But that's also what I love about theatre. Every night is slightly different, and you can feel how the audience is reacting. You don't get that in front of a camera."},
    {sp:"Interviewer", t:"Eight performances a week must be exhausting."},
    {sp:"James", t:"It is. People think actors sleep all day, but my routine is quite strict. I go swimming every morning, I eat a proper lunch, and I sleep for an hour in the afternoon. The hardest thing, actually, is the evening after the show. You're full of energy at eleven o'clock at night, and it's impossible to go to sleep."},
    {sp:"Interviewer", t:"Has your life changed since the play opened?"},
    {sp:"James", t:"A bit. People sometimes recognise me in the street, which is strange. But the biggest change is that I can finally pay my rent without worrying. For years I shared a flat with four other people. Now I've got my own place, even if it is very small – my bedroom's about the size of a cupboard!"},
    {sp:"Interviewer", t:"What advice would you give to young people who want to act?"},
    {sp:"James", t:"Don't wait for someone to give you a chance. Make your own films with your friends, join a local theatre group, write your own plays. That student film is the reason I'm here. And keep a part-time job – you'll need the money! Drama school is great if you can get in, but it isn't the only way."}
  ],
  qs:[
    {q:"How did James get his part in the play?", opts:["A friend recommended him.","He gave an excellent audition.","The director had seen his earlier work."], correct:2,
     evidence:"the director had seen me in a small student film",
     why:"Režisér ho viděl ve studentském filmu a chtěl se s ním sejít – konkurz ani nebyl.", trap:"„I didn't even have to audition“ – B neplatí. Volal agent, ne přítel.", tt:"distractor"},
    {q:"How did James feel on the first day of rehearsals?", opts:["afraid he wouldn't be accepted","excited about meeting famous people","confident about his role"], correct:0,
     evidence:"I was sure they'd think I was a beginner who didn't belong there",
     why:"Bál se, že ho slavní herci budou brát jako začátečníka, který tam nepatří.", trap:"Slavné herce zmiňuje, ale jako zdroj strachu („Terrifying!“), ne nadšení.", tt:"attitude"},
    {q:"What did the director help James to do?", opts:["learn his lines more quickly","make his character more likeable","understand his character's reasons"], correct:2,
     evidence:"just try to understand why he behaves like that",
     why:"Režisér mu poradil postavu nesoudit, ale pochopit, proč se tak chová.", trap:"Snažit se postavu „zlepšit“ (make him nicer) byla právě JEHO chyba.", tt:"distractor"},
    {q:"What does James like most about acting in the theatre?", opts:["being able to repeat scenes","the contact with a live audience","working with famous actors"], correct:1,
     evidence:"you can feel how the audience is reacting",
     why:"Každý večer je jiný a cítí, jak publikum reaguje – to u kamery nemá.", trap:"Opakovat scénu jde naopak ve filmu, ne v divadle.", tt:"paraphrase"},
    {q:"What does James find most difficult about his routine?", opts:["relaxing after a performance","getting up early to swim","eating at regular times"], correct:0,
     evidence:"The hardest thing, actually, is the evening after the show",
     why:"Nejtěžší je večer po představení – je plný energie a nemůže usnout.", trap:"Plavání a oběd jsou součást rutiny, kterou popisuje bez stížnosti.", tt:"paraphrase"},
    {q:"What is the most important change in James's life?", opts:["He has become famous.","He no longer worries about money.","He has moved to a bigger flat."], correct:1,
     evidence:"I can finally pay my rent without worrying",
     why:"Největší změna: konečně platí nájem bez starostí.", trap:"Byt má vlastní, ale „very small“ – ne větší. Poznávání na ulici je jen „strange“.", tt:"distractor"},
    {q:"What is James's main advice to young actors?", opts:["Create your own opportunities.","Find a good agent.","Study at a drama school."], correct:0,
     evidence:"Don't wait for someone to give you a chance",
     why:"Nečekej na šanci – točte filmy, hrajte divadlo, pište hry.", trap:"Herecká škola „isn't the only way“; agenta jako radu nezmiňuje.", tt:"paraphrase"}
  ]},

{ id:"p4-06", title:"Down the Danube by kayak", context:"You will hear an interview with a woman called Kate Lyons, who travelled the length of the River Danube in a kayak.",
  speakers:{"Interviewer":"M2","Kate":"F1"},
  lines:[
    {sp:"Interviewer", t:"Kate, you've just paddled the whole length of the River Danube – nearly three thousand kilometres – in a kayak. Why did you decide to do it?"},
    {sp:"Kate", t:"Lots of people think it was to raise money, and I did raise some for a river charity, but that wasn't the main reason. I'd just turned thirty, and I realised I'd never done anything really challenging. I'd always been the person who watched other people's adventures online. I wanted, just once, to be the one doing it. My mum thought I was mad, of course."},
    {sp:"Interviewer", t:"How much experience did you have?"},
    {sp:"Kate", t:"Not much! I'd done a few weekend trips on rivers in Wales. So I spent a year preparing. I trained four times a week, but the most useful thing I did was take a course in repairing my kayak. Twice during the trip I hit rocks and made holes in it, and there was nobody around to help."},
    {sp:"Interviewer", t:"Where did you sleep?"},
    {sp:"Kate", t:"Mostly in a small tent on the riverbank. But what I hadn't expected was how often people invited me into their homes. In Hungary, a family saw me pulling my kayak out of the water in the rain and insisted I stay with them. They fed me, washed my clothes, and wouldn't take any money. That happened again and again. I've stayed in touch with most of those families since."},
    {sp:"Interviewer", t:"Were there any moments when you wanted to give up?"},
    {sp:"Kate", t:"One. About halfway, in Serbia, it rained for nine days without stopping. I was wet all the time, my hands were sore, and I was so lonely. I phoned my sister and told her I was coming home. She didn't argue with me – she just reminded me how far I'd already come. That was enough. I put the phone down and decided to carry on, even though it rained for two more days."},
    {sp:"Interviewer", t:"What did you learn about the river itself?"},
    {sp:"Kate", t:"That it's in better condition than I expected, in some places at least. I'd read a lot about pollution, and I did see rubbish, especially near the big cities. But I also saw beavers, which had disappeared from many parts of the river and have now come back. One even swam right past my kayak early one morning. That gave me real hope."},
    {sp:"Interviewer", t:"How did it feel to finish?"},
    {sp:"Kate", t:"Strange, actually. I'd imagined crying with happiness when I reached the Black Sea, with crowds cheering. In fact it was a grey morning, there was only one fisherman watching, and I mostly felt sad that it was over. The happiness came later, when I got home and looked through all my photos."},
    {sp:"Interviewer", t:"So what's next? Another river?"},
    {sp:"Kate", t:"People keep asking me that! But for now I'm writing a book about the journey, and I'm giving talks in schools. If I can persuade a few young people to try their own adventure, even a small one, I'll be happy. It doesn't have to be three thousand kilometres – a weekend camping trip is a great start."}
  ],
  qs:[
    {q:"Why did Kate decide to kayak down the Danube?", opts:["to raise money for charity","to challenge herself","to become well known online"], correct:1,
     evidence:"I realised I'd never done anything really challenging",
     why:"Ve třiceti si uvědomila, že nikdy nedělala nic opravdu náročného – chtěla to jednou zkusit sama.", trap:"Peníze pro charitu vybrala, ale „that wasn't the main reason“.", tt:"distractor"},
    {q:"What does Kate say was the most useful part of her preparation?", opts:["learning to repair her equipment","training four times a week","kayaking on rivers in Wales"], correct:0,
     evidence:"the most useful thing I did was take a course in repairing my kayak",
     why:"Nejužitečnější byl kurz opravy kajaku – dvakrát ho cestou prorazila o skály.", trap:"Trénink 4× týdně a výlety ve Walesu zmíní, ale „the most useful thing“ je kurz oprav.", tt:"distractor"},
    {q:"What surprised Kate during her journey?", opts:["how comfortable her tent was","how expensive places to stay were","how generous local people were"], correct:2,
     evidence:"what I hadn't expected was how often people invited me into their homes",
     why:"Nečekala, jak často ji lidé zvali domů, krmili ji a nechtěli peníze.", trap:"Ve stanu spala, ale o pohodlí nemluví; za ubytování u rodin naopak neplatila.", tt:"paraphrase"},
    {q:"What made Kate continue when she wanted to give up?", opts:["Her sister reminded her of her progress.","The weather improved immediately.","She met another kayaker."], correct:0,
     evidence:"she just reminded me how far I'd already come",
     why:"Sestra jí připomněla, jakou dálku už urazila – to stačilo.", trap:"Počasí se NEzlepšilo – pršelo ještě dva dny.", tt:"distractor"},
    {q:"How does Kate feel about the condition of the river?", opts:["shocked by the amount of pollution","more positive than she expected to be","worried about the animals living there"], correct:1,
     evidence:"it's in better condition than I expected",
     why:"Řeka je v lepším stavu, než čekala – návrat bobrů jí dal naději.", trap:"Odpadky u velkých měst viděla, ale celkový dojem je pozitivní.", tt:"attitude"},
    {q:"How did Kate feel when she reached the end of the river?", opts:["delighted","exhausted","sad that it was over"], correct:2,
     evidence:"I mostly felt sad that it was over",
     why:"Na konci byla hlavně smutná, že je konec; radost přišla až doma.", trap:"Pláč štěstím si jen PŘEDSTAVOVALA – „In fact…“ ohlašuje realitu.", tt:"change"},
    {q:"What is Kate's main aim now?", opts:["to plan another river trip","to encourage young people to have adventures","to make money from her book"], correct:1,
     evidence:"If I can persuade a few young people to try their own adventure",
     why:"Chce přesvědčit mladé lidi, aby zkusili vlastní dobrodružství – i malé.", trap:"Další řeku si přejí jiní („People keep asking me“); o výdělku z knihy nemluví.", tt:"distractor"}
  ]},

{ id:"p4-07", title:"From player to coach", context:"You will hear an interview with a football coach called Ryan Hall, who used to be a professional player.",
  speakers:{"Interviewer":"F3","Ryan":"M3"},
  lines:[
    {sp:"Interviewer", t:"Ryan, you played professionally for twelve years. How did you feel when you stopped?"},
    {sp:"Ryan", t:"Lost, to be honest. Football had been my whole life since I was sixteen. People think the hardest thing is losing the money, or the fame, but for me it was not having a routine any more. For twelve years someone had told me when to train, what to eat, when to sleep. Suddenly I had to organise my own day, and I wasn't very good at it."},
    {sp:"Interviewer", t:"How did you get into coaching?"},
    {sp:"Ryan", t:"Completely by accident. My daughter played for a local girls' team, and one Saturday their coach was ill. The parents knew I'd been a player, so they asked me to take the training session. I only agreed because nobody else would. But I loved it, and when the coach moved away a few months later, I took over."},
    {sp:"Interviewer", t:"Is coaching children very different from playing?"},
    {sp:"Ryan", t:"Totally. As a player, you only think about yourself – your fitness, your performance. As a coach, you've got fifteen different people to think about, and they all learn in different ways. Some girls want lots of instructions; others just want to play. I've had to learn to be much more patient."},
    {sp:"Interviewer", t:"Your team has been very successful. What's your secret?"},
    {sp:"Ryan", t:"I don't think it's a secret. We don't train more than other teams – twice a week, like everyone else. And we haven't got the best players either. What we do is enjoy it. We play lots of games in training, we laugh a lot, and nobody's ever shouted at for making a mistake. When children are relaxed, they try new things, and that's how they improve."},
    {sp:"Interviewer", t:"What do you think about parents who shout from the side of the pitch?"},
    {sp:"Ryan", t:"Ah, that's a big problem in children's sport. Most parents mean well, but when they shout instructions, the children get confused – they don't know whether to listen to me or to their mum or dad. So we now have a rule: parents can cheer, but they can't give instructions. Most of them were fine with it, once I explained why."},
    {sp:"Interviewer", t:"Would you like to coach professional players one day?"},
    {sp:"Ryan", t:"People ask me that a lot, and I've had a couple of offers. But no. Professional football is all about results, and coaches lose their jobs after a few bad games. I prefer working with young people, where the most important thing is helping them grow, as players and as people."},
    {sp:"Interviewer", t:"Finally, what advice would you give to a young player who dreams of becoming a professional?"},
    {sp:"Ryan", t:"Work hard, of course, but don't forget your schoolwork. Only a tiny number of young players ever become professionals, and even those who do usually stop playing in their thirties. You need something else to fall back on. I wish someone had told me that when I was sixteen."}
  ],
  qs:[
    {q:"What did Ryan find hardest when he stopped playing?", opts:["earning less money","no longer being famous","having no fixed timetable"], correct:2,
     evidence:"for me it was not having a routine any more",
     why:"Nejtěžší bylo, že mu nikdo neurčoval den – ztratil rutinu.", trap:"Peníze a slávu považují za nejtěžší „people“, on ne.", tt:"distractor"},
    {q:"Ryan started coaching because", opts:["he had always planned to.","he was asked to help when the coach was ill.","his daughter persuaded him."], correct:1,
     evidence:"one Saturday their coach was ill",
     why:"Trenér onemocněl, rodiče ho požádali o záskok – „completely by accident“.", trap:"Dcera v týmu hrála, ale požádali ho RODIČE. Plánované to nebylo.", tt:"paraphrase"},
    {q:"What has Ryan had to learn as a coach?", opts:["to be more patient","to improve his own fitness","to give clearer instructions"], correct:0,
     evidence:"I've had to learn to be much more patient",
     why:"Musel se naučit mnohem víc trpělivosti – každá hráčka se učí jinak.", trap:"Vlastní kondice patřila k myšlení HRÁČE. Instrukce chtějí jen některé dívky.", tt:"distractor"},
    {q:"Why does Ryan think his team is successful?", opts:["They train more often than other teams.","They have very talented players.","They feel relaxed and enjoy themselves."], correct:2,
     evidence:"What we do is enjoy it",
     why:"Baví je to, smějí se a nikdo na ně nekřičí – uvolněné děti zkoušejí nové věci.", trap:"Trénují „like everyone else“ a nejlepší hráčky nemají – A i B popírá.", tt:"distractor"},
    {q:"What does Ryan say about parents who shout instructions?", opts:["They should be banned from matches.","They confuse the players.","They are trying to be unkind."], correct:1,
     evidence:"the children get confused",
     why:"Děti nevědí, koho poslouchat – trenéra, nebo rodiče.", trap:"Rodiče „mean well“ – nejsou zlí. Zákaz se týká jen instrukcí, fandit smějí.", tt:"distractor"},
    {q:"How does Ryan feel about coaching professional players?", opts:["He isn't interested in doing it.","He'd like to do it in the future.","He hasn't been offered the chance."], correct:0,
     evidence:"I prefer working with young people",
     why:"Nabídky měl, ale „But no“ – raději pracuje s mládeží.", trap:"„I've had a couple of offers“ – C neplatí.", tt:"distractor"},
    {q:"What is Ryan's advice to young players?", opts:["Practise as much as possible.","Start playing at a young age.","Make sure you have other options."], correct:2,
     evidence:"You need something else to fall back on",
     why:"Nezanedbávej školu – profesionálem se stane málokdo, takže potřebuješ záložní plán.", trap:"„Work hard, of course“ je samozřejmost, hlavní rada je o škole a jiné možnosti.", tt:"paraphrase"}
  ]},

{ id:"p4-08", title:"A teenage game designer", context:"You will hear an interview with a young woman called Mia Chen, who designed a popular game for mobile phones.",
  speakers:{"Interviewer":"M1","Mia":"F2"},
  lines:[
    {sp:"Interviewer", t:"Mia, your game Garden Rescue has been downloaded over two million times, and you designed it when you were just seventeen. How did the idea come about?"},
    {sp:"Mia", t:"It came from my little brother, actually. He was eight, and he was always on his tablet playing games where you just shoot things. I wanted to make something he'd enjoy that was a bit kinder – where you save things instead of destroying them. So I came up with a game where you rescue animals and plants from a polluted garden."},
    {sp:"Interviewer", t:"Did you already know how to make games?"},
    {sp:"Mia", t:"Not really. I'd done a bit of coding at school, but nothing like this. I learnt mostly from free videos online. The coding wasn't the hardest bit, though. The hardest bit was the art. I can't draw at all, so in the end I asked a friend from my art class to design the characters, and we shared the money."},
    {sp:"Interviewer", t:"How long did it take?"},
    {sp:"Mia", t:"About eighteen months, working in the evenings and at weekends. My parents were worried it would affect my exams, and to be honest, it nearly did. They made me stop completely for two months before the exams. That was really frustrating at the time, because I had so many ideas. But looking back, my parents were right."},
    {sp:"Interviewer", t:"Why do you think the game became so popular?"},
    {sp:"Mia", t:"It wasn't advertising – we didn't have any money for that. What happened was that a well-known teacher who writes a blog about education wrote about it. She said it was a great way to teach children about the environment. Suddenly schools all over the country were recommending it to parents."},
    {sp:"Interviewer", t:"Has the success changed your life?"},
    {sp:"Mia", t:"In some ways. I've earned enough to pay for university, which is amazing. But I still live at home, and I still have to do the washing-up! The strangest thing is that people now want my opinion on things I know nothing about, like running a business. I get invited to speak at conferences, and I usually say no, because I don't feel I'm the right person."},
    {sp:"Interviewer", t:"What about your friend who did the art? How does she feel about it all?"},
    {sp:"Mia", t:"She's thrilled. She's studying animation now, and she says the game helped her get onto the course. We still argue about the characters sometimes, but we're still best friends, which I think is the real success."},
    {sp:"Interviewer", t:"Are you working on a new game?"},
    {sp:"Mia", t:"Yes, but I'm taking it slowly this time. I start studying computer science in September, and I want to enjoy university. The new game is about the ocean. My friend's doing the art again – I'm not making that mistake twice!"},
    {sp:"Interviewer", t:"Finally, what would you say to a teenager who wants to make games?"},
    {sp:"Mia", t:"Start small. Everyone wants to make a huge game with hundreds of levels, and then they give up after a week. Make something tiny that works, and finish it. Finishing something is the most important skill. Then make the next one a bit bigger."}
  ],
  qs:[
    {q:"Where did Mia get the idea for her game?", opts:["from a school project","from wanting to give her brother something better to play","from her interest in gardening"], correct:1,
     evidence:"I wanted to make something he'd enjoy that was a bit kinder",
     why:"Bratr hrál jen střílečky – chtěla mu nabídnout „laskavější“ hru.", trap:"Zahrada je prostředí hry, ne její koníček; školní projekt to nebyl.", tt:"inference"},
    {q:"What did Mia find most difficult when making the game?", opts:["creating the pictures","writing the code","finding tutorials online"], correct:0,
     evidence:"The hardest bit was the art",
     why:"Nejtěžší byla grafika – neumí kreslit, postavy navrhla kamarádka.", trap:"„The coding wasn't the hardest bit“ – B neplatí. Videa na internetu byla zdarma a pomohla.", tt:"distractor"},
    {q:"How does Mia now feel about stopping work on the game before her exams?", opts:["She wishes she hadn't lost the time.","She thinks it was the right decision.","She was relieved to have a break."], correct:1,
     evidence:"But looking back, my parents were right",
     why:"Tehdy to bylo frustrující, ale zpětně uznává, že rodiče měli pravdu.", trap:"Frustraci cítila „at the time“ – otázka se ptá na „now“.", tt:"change"},
    {q:"What made the game popular?", opts:["an advertising campaign","a review in a newspaper","a recommendation from a teacher"], correct:2,
     evidence:"a well-known teacher who writes a blog about education wrote about it",
     why:"Známá učitelka o hře napsala na blogu a školy ji pak doporučovaly rodičům.", trap:"Na reklamu neměli peníze; blog není noviny.", tt:"distractor"},
    {q:"What does Mia find strange about her success?", opts:["being asked about subjects she doesn't know much about","still having to do jobs at home","earning a lot of money"], correct:0,
     evidence:"people now want my opinion on things I know nothing about",
     why:"Lidé chtějí její názor na věci, kterým nerozumí (např. podnikání).", trap:"Mytí nádobí zmiňuje s humorem, ne jako „strangest thing“.", tt:"paraphrase"},
    {q:"What does Mia say about her new game?", opts:["She wants to finish it quickly.","She will design the characters herself.","She is not rushing to complete it."], correct:2,
     evidence:"I'm taking it slowly this time",
     why:"Tentokrát na hře pracuje pomalu – chce si užít univerzitu.", trap:"Grafiku opět dělá kamarádka – „I'm not making that mistake twice“.", tt:"distractor"},
    {q:"What is Mia's main advice to young game designers?", opts:["Begin with a simple project.","Learn to draw well.","Join a game design course."], correct:0,
     evidence:"Make something tiny that works, and finish it",
     why:"Začni malým projektem a dokonči ho – dokončování je nejdůležitější dovednost.", trap:"Kreslit sama neumí – to radit nebude; o kurzech nemluví.", tt:"paraphrase"}
  ]}
);
})(window.DATA.listening);
