/* Reading Part 5 (multiple choice) + Part 6 (cross-text multiple matching).
   All texts are ORIGINAL, written for this portal. Shape: see docs/CONTRACT.md ("Shared data shape: Reading"). */
window.DATA = window.DATA || {};
window.DATA.reading = window.DATA.reading || {};

window.DATA.reading.p5 = [
/* ------------------------------------------------------------------ */
{
id:"p5-boredom", title:"The uses of boredom", topic:"psychologie",
text:`For most of the last century, boredom was the poor relation of the emotions. Psychologists who devoted entire careers to fear, anger or grief rarely gave it more than a passing glance, and when they did, it was usually to file it away as a symptom of something else – depression, perhaps, or simply a lack of character. Dr Miriam Hale, who has spent fifteen years studying the condition at a university laboratory in Leeds, remembers being advised by a senior colleague to choose a 'proper' subject if she wanted to be taken seriously. 'He meant it kindly,' she says. 'But it told me a great deal about how little we understood.'

What has changed, Hale argues, is not so much the science as the circumstances in which we now live. Boredom used to be an unavoidable feature of daily life: the bus queue, the waiting room, the long Sunday afternoon. Today, almost every one of those empty moments can be filled in seconds by a device that most of us carry in our pockets. 'We have effectively engineered boredom out of existence,' she says, 'and only now are we beginning to ask what we may have lost in the process.'

Her own experiments suggest the answer may be rather more than we assume. In one widely cited study, volunteers were asked to spend fifteen minutes copying numbers from a telephone directory – a task chosen precisely because it is so mind-numbingly dull – before being set a creative problem. Compared with a group who had gone straight to the problem, the copiers came up with a greater number of solutions, and these were judged by an independent panel to be more original. Hale is careful not to overstate the findings. The effect was modest, she points out, and it has yet to be reproduced outside the artificial conditions of a laboratory. Nonetheless, it fits neatly with a theory that has been gaining ground: that boredom is less a state of emptiness than a signal, prompting the mind to go in search of something more rewarding.

If that is the case, then the habit of reaching for a phone the moment our attention begins to wander may be cutting the process short. The discomfort we feel, according to this view, is the very thing that drives us to daydream, to plan, or to notice what we would otherwise overlook. Remove it too quickly and the mind never gets as far as the interesting part. It is a seductive argument, and one that has been enthusiastically taken up by writers of self-help books, many of whom now recommend scheduling periods of deliberate inactivity into the working week.

Hale, however, is wary of the way her research has been put to use. 'There's a tendency to romanticise boredom,' she says, 'as though all you need to do to become a genius is stare out of the window for an hour.' Prolonged or chronic boredom, she notes, is associated with a range of far less attractive outcomes, from overeating to risk-taking and, in some studies, aggression. The people most prone to it are not the idle rich of popular imagination but those with little control over how they spend their time – prisoners, for example, or workers on monotonous production lines. For them, the advice to embrace the tedium is not merely unhelpful; it is faintly insulting.

What interests Hale most is the gap between these two kinds of experience. Why should a few minutes of dullness sharpen the mind, while months of it appear to blunt it? Her current hunch is that the crucial factor is not the boredom itself, but whether the person experiencing it believes they have the freedom to act on the restlessness it produces. A child kicking her heels on a rainy afternoon can, eventually, invent a game. A factory worker cannot simply walk away from the machine.

It is a hypothesis that will be difficult to test, and Hale admits that she may be wrong. But she is convinced that the question deserves the attention it has so long been denied. 'Boredom is telling us something about the fit between ourselves and our surroundings,' she says. 'The worst thing we could do is to keep switching it off before we've heard what it has to say.'`,
questions:[
{q:"What does the writer suggest about boredom in the first paragraph?",
 opts:["It was once considered too insignificant to merit serious scientific attention.","It was wrongly confused with depression by most psychologists.","It was a subject that senior researchers actively prevented others from studying.","It had been studied less than fear because it is harder to measure."],
 correct:0, why:"Psychologové se nudě věnovali jen 'letmým pohledem' (a passing glance) a Hale radili vybrat si 'pořádné' téma. B je past: deprese je zmíněna jen jako jedno z možných zařazení, ne že by ji psychologové spletli. C přehání – kolega jí radil 'laskavě', nebránil jí.",
 evidence:"Psychologists who devoted entire careers to fear, anger or grief rarely gave it more than a passing glance"},
{q:"According to Hale, what has led to renewed interest in boredom?",
 opts:["new methods of measuring emotional states","the popularity of books about the benefits of idleness","growing evidence that boredom is harmful to health","a change in the way people's everyday lives are organised"],
 correct:3, why:"Změnila se 'ne tolik věda jako okolnosti, ve kterých žijeme' – prázdné chvíle vyplní mobil. A text výslovně popírá (not so much the science). B (self-help knihy) přichází až později a jako důsledek, ne příčina.",
 evidence:"What has changed, Hale argues, is not so much the science as the circumstances in which we now live."},
{q:"What does Hale say about her experiment with the telephone directory?",
 opts:["Its results were more striking than she had anticipated.","It has been criticised for using an unrealistic task.","Its conclusions should be treated with a degree of caution.","It proved that boredom causes people to think more creatively."],
 correct:2, why:"Hale 'nechce přeceňovat výsledky' – efekt byl malý a zatím nezopakovaný mimo laboratoř. D je typická past: 'proved' je příliš silné. B – laboratoř je 'artificial', ale nikdo studii nekritizoval.",
 evidence:"Hale is careful not to overstate the findings."},
{q:"The phrase 'the interesting part' in the fourth paragraph refers to",
 opts:["the creative mental activity that boredom can lead to.","the moment when people decide to check their phones.","the discomfort that accompanies boredom.","the periods of inactivity recommended by some writers."],
 correct:0, why:"Nepohodlí nás 'žene k snění, plánování, všímání si' – a právě k tomu se mysl nedostane, když nudu hned vypneme. C je past: nepohodlí je jen spouštěč, 'zajímavá část' je to, co následuje.",
 evidence:"the very thing that drives us to daydream, to plan, or to notice what we would otherwise overlook"},
{q:"Why does Hale mention prisoners and production-line workers?",
 opts:["to show that chronic boredom is more common than people think","to challenge a popular assumption about who suffers most from boredom","to illustrate the link between boredom and aggression","to suggest that some jobs should be redesigned"],
 correct:1, why:"Nejvíc trpí ne 'zahálčiví boháči, jak si lidé představují', ale ti bez kontroly nad svým časem – vyvrací tedy rozšířenou představu. C: agrese je zmíněna, ale příklady k ní nejsou vztaženy.",
 evidence:"The people most prone to it are not the idle rich of popular imagination but those with little control over how they spend their time"},
{q:"What is Hale's current hypothesis?",
 opts:["Short periods of boredom are beneficial only for children.","People who are easily bored cope less well with restrictions.","Boredom becomes harmful once it lasts for more than a few minutes.","The effects of boredom depend on whether people feel able to respond to it."],
 correct:3, why:"Rozhoduje, zda člověk věří, že má svobodu na neklid reagovat (dítě si vymyslí hru, dělník od stroje odejít nemůže). A bere příklad s dítětem doslova; C převádí 'minuty vs. měsíce' na pevnou hranici, kterou text nestanoví.",
 evidence:"whether the person experiencing it believes they have the freedom to act on the restlessness it produces"}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-citizen-science", title:"The rise of the citizen scientist", topic:"věda",
text:`When a retired schoolteacher in Northumberland noticed an unusual flicker in the light of a distant star one night in 2019, she did what thousands of volunteers around the world now do as a matter of routine: she logged it on a website and went to bed. Three months later, a team of professional astronomers confirmed that she had spotted a previously unknown planet. Her name appears, alongside theirs, on the paper that announced the discovery – a small detail, but one that would have been almost unthinkable a generation ago.

Citizen science, as it has come to be known, is hardly new. Amateurs have been counting birds, recording the weather and collecting fossils for centuries, and many of the great Victorian naturalists were, strictly speaking, enthusiasts with private incomes rather than salaried researchers. What is new is the sheer scale of the enterprise. Online platforms now allow millions of people to classify galaxies, transcribe ships' logs or identify animals caught on camera traps, and the data they produce has become indispensable to fields that could never afford to pay for such labour.

For the scientists who run these projects, the attraction is obvious. A single researcher might take years to examine a hundred thousand images; a crowd of volunteers can do it in a matter of weeks. Less obvious, perhaps, is the extent to which the volunteers have shaped the questions being asked. Several projects have been redirected after participants drew attention to patterns that the professionals had simply not been looking for. 'We set out to build a tool,' one project leader told me, 'and found ourselves with a community of colleagues.'

Not everyone is quite so enthusiastic. Some researchers privately question whether data gathered by untrained people can ever be as reliable as that collected by specialists, and there have been embarrassing cases in which well-meaning amateurs misidentified common species as rare ones. Yet the evidence on accuracy is, on the whole, reassuring. Because each item is typically examined by many volunteers, individual errors tend to cancel one another out, and studies comparing the results with expert judgements have generally found little difference. The real weakness of citizen science lies elsewhere.

That weakness is one of geography and class. Surveys of participants consistently show that they are disproportionately well educated, comfortably off and concentrated in a handful of wealthy countries. This matters not only as a question of fairness. Birdwatchers, for instance, tend to record birds in places where birdwatchers like to go – nature reserves, attractive coastlines, the countryside near prosperous towns – with the result that maps of species distribution can end up reflecting the habits of the observers as much as those of the birds.

Project organisers are aware of the problem and some have made determined efforts to address it, translating their websites into dozens of languages and working with schools in areas where participation has traditionally been low. Progress, though, has been slow. Taking part requires spare time, a reliable internet connection and, perhaps above all, a sense that science is something in which people like oneself have a legitimate place – and that last condition is not one that a well-designed website can easily create.

None of this diminishes what has been achieved. The retired teacher in Northumberland is now an active member of a group that meets monthly to compare observations, several of whom had never looked through a telescope before they joined. She is modest about her planet. 'I was in the right place at the right time,' she says. 'The important thing is that somebody was looking.' If citizen science is to fulfil its promise, the challenge will be to ensure that the somebodies doing the looking are drawn from a far wider range of people than they are at present.`,
questions:[
{q:"The writer mentions that the teacher's name appears on the paper in order to",
 opts:["highlight a change in professional attitudes to amateur contributions.","suggest that she deserved more credit than she actually received.","show that the discovery was made largely by chance.","emphasise how rare it is for amateurs to make discoveries."],
 correct:0, why:"Drobnost, která by byla 'před generací téměř nemyslitelná' – tj. profesionálové dnes amatéry uznávají jinak než dřív. D je past: text netvrdí, že objevy amatérů jsou vzácné, ale že je vzácné bylo jejich uznání.",
 evidence:"a small detail, but one that would have been almost unthinkable a generation ago"},
{q:"What does the writer say about citizen science in the second paragraph?",
 opts:["It began with the work of Victorian naturalists.","It has largely replaced the work of salaried researchers.","Its distinctive modern feature is the number of people involved.","It has enabled amateurs to earn money from research."],
 correct:2, why:"Občanská věda není nová – nové je 'naprosté měřítko' (sheer scale), tj. miliony účastníků. A: viktoriánští přírodovědci jsou jen příklad, ne počátek ('for centuries').",
 evidence:"What is new is the sheer scale of the enterprise."},
{q:"What point does the writer make in the third paragraph?",
 opts:["Volunteers work considerably faster than professional researchers.","Researchers initially underestimated the cost of the projects.","Researchers have come to depend on volunteers for new ideas.","Volunteers have influenced the focus of some research projects."],
 correct:3, why:"Některé projekty 'změnily směr', protože dobrovolníci upozornili na vzorce, které profesionálové nehledali. A: rychlejší je dav, ne jednotlivý dobrovolník. C přehání ('depend on').",
 evidence:"Several projects have been redirected after participants drew attention to patterns that the professionals had simply not been looking for."},
{q:"What is the writer's view of the accuracy of citizen science data?",
 opts:["It is less of a concern than some critics suggest.","It varies considerably from one field to another.","It has been undermined by a number of high-profile errors.","It can only be guaranteed if experts check every item."],
 correct:0, why:"Kritici pochybují, ale 'důkazy o přesnosti jsou celkově uklidňující'. C: chyby se staly, ale autor říká, že skutečná slabina 'leží jinde'.",
 evidence:"Yet the evidence on accuracy is, on the whole, reassuring."},
{q:"The example of birdwatchers illustrates how",
 opts:["amateurs tend to favour certain species over others.","the profile of participants can distort scientific findings.","wealthy countries have better facilities for observing wildlife.","some volunteers are more reliable than others."],
 correct:1, why:"Mapy výskytu druhů nakonec odrážejí zvyky pozorovatelů (kam rádi chodí bohatší lidé), ne jen ptáků – složení účastníků tedy zkresluje data. A: nejde o druhy, ale o místa.",
 evidence:"maps of species distribution can end up reflecting the habits of the observers as much as those of the birds"},
{q:"According to the writer, why has progress in widening participation been slow?",
 opts:["Organisers have not invested enough in translation.","Schools have been reluctant to become involved.","Some people feel that science is not for people like them.","The technology required is too expensive for many."],
 correct:2, why:"Klíčová podmínka je 'pocit, že věda je něco, kam lidé jako já legitimně patří' – a to žádný web nevytvoří. A a B jsou naopak kroky, které organizátoři už dělají.",
 evidence:"a sense that science is something in which people like oneself have a legitimate place"}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-office", title:"The lost apprenticeship", topic:"práce",
text:`Ask anyone who started their career before the turn of the century how they learned to do their job, and the answer is rarely 'on a course'. More often, it involves a particular person – a manager who let them sit in on difficult phone calls, a colleague at the next desk whose way of handling an angry client they quietly copied. Much of what made these people competent was never written down, and it was never deliberately taught. It was simply absorbed, over months and years, from being in the same room as people who already knew what they were doing.

That room, for millions of office workers, is now largely empty. The shift towards working from home, which began as an emergency measure, has settled into a permanent arrangement for a substantial proportion of the workforce, and the benefits are not hard to identify. Employees save hours each week that would otherwise be spent commuting; employers save on rent; and surveys repeatedly find that most people who have tried remote working have no wish to give it up. It would be perverse to pretend that nothing has been gained.

And yet a growing number of managers have begun to voice an uneasy suspicion that something has been lost along the way – and that those who have lost most are precisely the people least able to complain about it. Experienced staff, who acquired their know-how in the old way, can work perfectly well from their kitchen tables. Their younger colleagues, however, are being asked to learn a profession largely through a screen, and the informal lessons that once happened by accident are no longer happening at all.

Research on the subject is still at an early stage, but what there is tends to support the managers' instincts. One study of software engineers found that those who sat close to their teammates received significantly more feedback on their work than those who were physically separated, even when all of them were in the same building. The effect was strongest for junior staff and for women. Interestingly, the more senior engineers in the study paid a price for this arrangement: they wrote less code, presumably because they were spending more time answering questions. Mentoring, it seems, is not free – it has simply been invisible.

That invisibility is part of the difficulty. When the cost of training a newcomer was spread across countless small interruptions, nobody needed to budget for it. Now that it must be organised deliberately – through scheduled calls, formal mentoring schemes and the like – it appears, perhaps for the first time, as a demand on people's time that has to be justified. Some organisations have risen to the challenge admirably. Others have quietly decided that, if the new recruits cannot pick things up for themselves, that is their problem.

The obvious solution, insisting that everyone return to the office, is less straightforward than it sounds. Junior employees gain little from coming in if the people they might learn from stay at home, and senior staff are understandably reluctant to give up a way of working that suits them. A handful of firms have experimented with asking teams to agree on 'anchor days', when everyone is expected to be present. Early reports are encouraging, though it is too soon to say whether the arrangement will survive once the novelty wears off.

Whatever the answer turns out to be, it will require us to think more carefully about what offices were actually for. For decades, we assumed that their purpose was to provide somewhere to do work. The experience of the past few years suggests that this was only half the story. They were also, without anyone quite intending it, places where one generation passed on its skills to the next – and if we no longer need them for the first purpose, we had better find some other way of fulfilling the second.`,
questions:[
{q:"In the first paragraph, the writer suggests that people who started work before 2000",
 opts:["were reluctant to admit that they lacked certain skills.","learned their jobs mainly by observing those around them.","frequently struggled to deal with difficult clients.","relied heavily on written instructions from their managers."],
 correct:1, why:"Znalosti 'prostě nasáli' tím, že byli v jedné místnosti se zkušenými lidmi. D je opak – nic z toho 'nebylo nikdy zapsáno'. C: rozzlobený klient je jen příklad situace.",
 evidence:"It was simply absorbed, over months and years, from being in the same room as people who already knew what they were doing."},
{q:"What is the writer's attitude to the benefits of remote working?",
 opts:["The writer doubts whether they are as great as surveys suggest.","The writer feels that they have been exaggerated by employers.","The writer accepts that they are genuine and significant.","The writer believes that they apply mainly to experienced staff."],
 correct:2, why:"'Bylo by zvrácené tvrdit, že se nic nezískalo' – autor výhody uznává, než přejde k 'And yet…'. Postoj autora často poznáte podle hodnoticích slov (perverse).",
 evidence:"It would be perverse to pretend that nothing has been gained."},
{q:"According to the third paragraph, who has been most disadvantaged by the move to remote working?",
 opts:["managers who have to supervise staff at a distance","experienced employees who no longer see their colleagues","staff at the beginning of their careers","employees who have openly complained about working from home"],
 correct:2, why:"Nejvíc ztratili mladší kolegové, kteří se mají učit profesi 'přes obrazovku'. B je opak – zkušení pracují z kuchyně 'perfectly well'. D: naopak jsou to lidé, kteří si 'nejméně můžou stěžovat'.",
 evidence:"Their younger colleagues, however, are being asked to learn a profession largely through a screen"},
{q:"What does the study of software engineers suggest about mentoring?",
 opts:["It benefits all junior employees to an equal extent.","It is resented by many senior members of staff.","It is less effective when staff work in the same building.","It involves a cost that has previously gone unnoticed."],
 correct:3, why:"Seniorní inženýři napsali méně kódu – mentoring 'není zadarmo, jen byl neviditelný'. A: efekt byl nejsilnější u juniorů a žen, ne stejný. B: o nelibosti text nemluví.",
 evidence:"Mentoring, it seems, is not free – it has simply been invisible."},
{q:"What does 'the challenge' in the fifth paragraph refer to?",
 opts:["the need to justify the time spent training new employees","the task of persuading new recruits to learn independently","the problem of reducing interruptions at work","the difficulty of setting up mentoring schemes quickly"],
 correct:0, why:"Zaškolení je nyní poprvé vidět jako 'nárok na čas lidí, který je třeba zdůvodnit' – to je výzva, na kterou některé firmy reagovaly. B popisuje firmy, které výzvu NEzvládly.",
 evidence:"it appears, perhaps for the first time, as a demand on people's time that has to be justified"},
{q:"What does the writer say about 'anchor days'?",
 opts:["They have been rejected by most senior staff.","They have been imposed on teams by management.","They are of little benefit to junior employees.","Their long-term success remains uncertain."],
 correct:3, why:"První zprávy jsou povzbudivé, ale 'je příliš brzy říct', zda vydrží. B: týmy se mají 'dohodnout' (agree), nejde o nařízení. C se týká návratu do kanceláře obecně, ne anchor days.",
 evidence:"it is too soon to say whether the arrangement will survive once the novelty wears off"}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-translation", title:"The invisible art", topic:"umění",
text:`There is an old joke among literary translators that the highest compliment a reviewer can pay them is to say nothing at all. A novel that reads smoothly in English is praised for the author's elegant prose; one that reads awkwardly is criticised for its clumsy translation. Either way, the person who actually chose every word on the page is mentioned, if at all, in a single adjective near the end of the review. I have been translating fiction from Portuguese for nearly twenty years, and I have long since stopped finding the joke funny – though I confess that I have also stopped expecting it to change.

Part of the problem is that most readers have only the vaguest idea of what translation involves. They tend to imagine it as a kind of technical substitution, in which each word of the original is swapped for its nearest equivalent, rather like changing currency at an airport. In reality, almost nothing transfers cleanly from one language to another. A sentence that sounds natural in Lisbon may sound stilted in London; a joke that depends on a pun must either be abandoned or rebuilt from scratch; a tone of gentle irony that Portuguese achieves through word order may have to be created in English by entirely different means.

Every translation, in other words, is the product of thousands of small decisions, and each of those decisions involves a loss of some kind. The question is never whether to sacrifice something but what. Do I preserve the rhythm of a sentence at the expense of its exact meaning? Do I keep a reference that English readers will not understand, or replace it with something familiar and risk making the book feel less foreign than it is? There are no correct answers to such questions, only defensible ones, and two equally skilled translators working on the same text will produce versions that differ on almost every page.

This is precisely why the current enthusiasm for machine translation leaves me unmoved. The software has become impressively fluent, and for many purposes – reading a menu, say, or getting the gist of a news report – it is genuinely useful. But fluency is not the same as judgement. A program can tell you what a sentence means; it cannot tell you what the author would have wanted it to mean to someone who has never set foot in Portugal. That requires an understanding not just of two languages but of two cultures, and a willingness to take responsibility for choices that cannot be justified by any rule.

I do not want to exaggerate the mystique of the profession. Much of the work is painstaking rather than inspired: checking facts, looking up obscure plants and nineteenth-century legal terms, reading passages aloud to see whether they sound right. And translators can be as guilty as anyone of treating their own preferences as principles. I have read reviews by colleagues who condemn a rival's version for its 'inaccuracies' when what they really object to is a style that differs from their own.

Still, I would argue that readers lose something by remaining unaware of how the books they read have been made. A reader who knows that a novel has passed through another person's sensibility is better placed to read it critically, to notice where it feels smooth and where it resists, and perhaps to seek out a second translation for comparison. Some publishers have begun to put translators' names on the cover, and a few have even included short essays explaining the choices that were made. These are welcome developments, if modest ones.

My own ambition is simpler. I would like readers to finish a translated novel with the sense that they have encountered a genuinely different way of seeing the world – and to understand that this encounter was made possible, sentence by sentence, by someone who will probably never be thanked for it. That, rather than a mention in the reviews, is the recognition that matters.`,
questions:[
{q:"How does the writer feel about the situation described in the 'old joke'?",
 opts:["The writer believes it is gradually improving.","The writer has accepted it, without approving of it.","The writer thinks it is mainly the fault of authors.","The writer finds it more amusing than other translators do."],
 correct:1, why:"Vtip už autora nebaví (nesouhlas), ale zároveň 'přestal čekat, že se to změní' (smíření). A je opak. D je opak – 'stopped finding the joke funny'.",
 evidence:"I have long since stopped finding the joke funny – though I confess that I have also stopped expecting it to change."},
{q:"The writer compares translation to 'changing currency at an airport' in order to",
 opts:["show how complicated the process of translation really is.","emphasise how quickly translators are expected to work.","suggest that translations lose much of the original's value.","illustrate a common misconception about translation."],
 correct:3, why:"Přirovnání popisuje, jak si překlad PŘEDSTAVUJÍ čtenáři ('tend to imagine') – a hned následuje 'In reality…'. A je past: složitost je až v další větě a je to protiklad k přirovnání.",
 evidence:"They tend to imagine it as a kind of technical substitution"},
{q:"What point does the writer make in the third paragraph?",
 opts:["Skilled translators usually reach similar conclusions about a text.","Translators should avoid making books feel too foreign.","Translation inevitably involves deciding what to give up.","Some translation decisions are more important than others."],
 correct:2, why:"Otázka 'nikdy není, zda něco obětovat, ale co'. A je opak – dva stejně dobří překladatelé se liší 'téměř na každé straně'. B je jen jedna z otázek, kterou si autor klade, ne doporučení.",
 evidence:"The question is never whether to sacrifice something but what."},
{q:"What is the writer's view of machine translation?",
 opts:["It is unlikely ever to become as fluent as a human translator.","It is of very limited use in any situation.","It will soon replace translators for non-literary texts.","It lacks the ability to make interpretive decisions."],
 correct:3, why:"Plynulost není totéž co úsudek (judgement) – program neumí rozhodnout, co by autor chtěl. A je opak ('impressively fluent'), B také ('genuinely useful').",
 evidence:"But fluency is not the same as judgement."},
{q:"In the fifth paragraph, the writer admits that translators sometimes",
 opts:["make factual errors in their work.","confuse personal taste with objective standards.","depend too much on inspiration.","write unfair reviews in order to gain work."],
 correct:1, why:"Překladatelé vydávají 'své preference za principy' – kritizují 'nepřesnosti', i když jim vadí jen jiný styl. D: recenze jsou nespravedlivé, ale ne kvůli získání zakázek.",
 evidence:"translators can be as guilty as anyone of treating their own preferences as principles"},
{q:"How does the writer feel about publishers putting translators' names on covers?",
 opts:["pleased, although the change is a limited one","doubtful whether it will alter readers' behaviour","grateful on behalf of less experienced translators","surprised that it has taken so long to happen"],
 correct:0, why:"'Vítaný vývoj, i když skromný' – 'if modest' = i když jen malý. Výrazy jako if modest, albeit, though limited často nesou odpověď na otázku o postoji.",
 evidence:"These are welcome developments, if modest ones."}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-rewilding", title:"Letting the land go", topic:"životní prostředí",
text:`The first thing visitors notice about Holloway Farm is the noise. On a still morning in May, the hedges – now so overgrown that they are more like thin strips of woodland – are loud with birdsong, and the fields, which for most of the last century produced wheat and barley, are a tangle of thorn, bramble and young oak. Twelve years ago, Tom and Rachel Ashdown decided to stop farming their four hundred acres in the conventional sense and to let nature, as Tom puts it, 'make its own decisions'.

It was not, he insists, a romantic gesture. The farm had been losing money for most of a decade, and the couple had reached the point where they could either sell up or try something radical. 'We weren't environmentalists,' he says. 'We were desperate.' What persuaded them was a visit to an estate in the south of England where a similar experiment was already under way, and where the owners were earning a modest but reliable income from wildlife tourism. If it could work there, they reasoned, there was no obvious reason why it could not work for them.

The early years were harder than they had anticipated. Neighbouring farmers, some of whose families had worked the land around Holloway for generations, regarded the project with open hostility. Weeds from the abandoned fields, they complained, were spreading onto their own land, and the sight of good farmland being allowed to 'go to rack and ruin' struck many of them as an insult to everything their parents and grandparents had worked for. Rachel remembers being cold-shouldered in the village shop. 'It wasn't really about the weeds,' she says. 'It was about what the land meant to people.'

Attitudes have softened since then, though not entirely. The return of species that had not been seen in the area for decades – nightingales, turtle doves, several rare butterflies – has attracted visitors and a certain amount of local pride, and two neighbouring farms have now set aside parts of their own land for similar purposes. But the wider debate about rewilding remains fiercely contested, and it is easy to see why. With food prices rising and the population growing, critics argue, taking productive land out of farming is a luxury the country can ill afford.

The Ashdowns take the argument seriously, but they believe it rests on a misunderstanding. Much of the land currently used for farming, they point out, is only marginally productive, and is kept in cultivation largely because of subsidies. Their own fields were never particularly fertile; the yields they achieved depended on heavy and expensive applications of fertiliser. 'Nobody is suggesting that we rewild the best farmland in the country,' Tom says. 'The question is whether it makes sense to keep growing poor crops on poor soil when that land could be doing something more useful.'

What that 'something' consists of is not always easy to measure. The farm's income now comes from a mixture of tourism, a small herd of free-roaming cattle sold for meat, and payments from a government scheme that rewards landowners for storing carbon and improving water quality. It is, Rachel admits, a less predictable way of making a living than growing wheat, and there have been lean years. But the land itself, she says, is in better health than at any time in living memory, with richer soil and streams that no longer flood the village every winter.

Whether Holloway offers a model for others is a question the couple are reluctant to answer. Every farm is different, they say, and what has worked for them depended on particular circumstances – not least the willingness of a bank manager to give them time. Tom is more interested in what the experiment has taught him about his own profession. 'For most of my life I thought of farming as a battle against nature,' he says. 'It turns out you can achieve a great deal more by getting out of the way.'`,
questions:[
{q:"What does the writer suggest about the Ashdowns' decision in the second paragraph?",
 opts:["It was mainly motivated by financial necessity.","It was inspired by their long-standing interest in conservation.","It was taken against the advice of other landowners.","It was based on careful research into wildlife tourism."],
 correct:0, why:"Farma byla deset let ve ztrátě, 'nebyli jsme ekologové, byli jsme zoufalí'. B je přímý opak. D: šlo o jednu návštěvu a úvahu 'když to funguje tam…', ne pečlivý výzkum.",
 evidence:"The farm had been losing money for most of a decade"},
{q:"According to Rachel, the neighbours' hostility was caused by",
 opts:["the damage the project did to their crops.","the emotional significance the land had for them.","the Ashdowns' failure to consult them.","their fear that the village would lose income."],
 correct:1, why:"'Nešlo doopravdy o plevel, šlo o to, co pro lidi půda znamenala.' A je past – plevel sousedé zmiňovali, ale Rachel říká, že skutečný důvod byl jiný.",
 evidence:"It was about what the land meant to people."},
{q:"In the fourth paragraph, the writer suggests that critics of rewilding",
 opts:["are mostly farmers with a financial interest in the issue.","have changed their views as a result of projects like Holloway.","have raised a concern that is understandable.","underestimate the number of visitors rewilding attracts."],
 correct:2, why:"Debata je vyhrocená 'a je snadné pochopit proč' – autor uznává, že obava (ceny potravin, růst populace) dává smysl. B se týká místních sousedů, ne kritiků obecně.",
 evidence:"the wider debate about rewilding remains fiercely contested, and it is easy to see why"},
{q:"What is the Ashdowns' main response to the critics?",
 opts:["Rewilding should replace farming on most land in the country.","Farm subsidies should be abolished altogether.","Fertilisers do more harm to the soil than is generally realised.","Some farmland is hardly worth keeping in production."],
 correct:3, why:"Velká část půdy je 'jen okrajově produktivní' a obdělává se kvůli dotacím. A je opak ('Nobody is suggesting… the best farmland'). B: dotace jsou zmíněny, ale jejich zrušení nikdo nenavrhuje.",
 evidence:"Much of the land currently used for farming, they point out, is only marginally productive"},
{q:"What does Rachel say about the farm's current situation?",
 opts:["Its income is now higher than when it grew wheat.","Its income is less secure but the land has improved.","It depends almost entirely on government payments.","It has caused flooding problems in the village."],
 correct:1, why:"Méně předvídatelný příjem (byly i 'hubené roky'), ale půda je zdravější než kdy dřív. C: státní platby jsou jen jedna ze tří složek. D je opak – potoky už vesnici nezaplavují.",
 evidence:"It is, Rachel admits, a less predictable way of making a living than growing wheat"},
{q:"Why are the Ashdowns reluctant to recommend their approach to others?",
 opts:["They doubt whether it could be repeated elsewhere in the same way.","They fear that too many farms would compete for tourists.","They are still unsure whether the project has succeeded.","They believe banks are unlikely to support similar projects."],
 correct:0, why:"Každá farma je jiná a jejich úspěch závisel na konkrétních okolnostech. D je past: ochotný bankéř je příklad takové okolnosti, ne tvrzení, že banky nepomohou.",
 evidence:"Every farm is different, they say, and what has worked for them depended on particular circumstances"}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-digital-archive", title:"The vanishing present", topic:"technologie",
text:`In a climate-controlled basement beneath a university library, an archivist named Helen Okafor is trying to read a document written in 1994. The document itself is not especially remarkable – a draft report on local housing, saved on a floppy disk by a council official who died some years ago. What is remarkable is the effort required to open it. The disk drive has had to be bought second-hand from a collector, the computer it connects to runs an operating system that has not been supported for decades, and the word-processing program in which the report was written is no longer sold anywhere.

Okafor spends much of her working life on rescues of this kind, and she is in no doubt about the scale of the problem. 'People assume that because something is digital, it will last for ever,' she says. 'In fact, the opposite is closer to the truth.' A letter written on paper in the eighteenth century can be read today by anyone who understands the language. A file created thirty years ago may be unreadable without hardware and software that have long since disappeared – and the more recent the technology, paradoxically, the shorter its life expectancy tends to be.

The phrase most often used to describe this danger is 'digital dark age', a term popularised by computer scientists who warned that future historians might find our era harder to study than the Middle Ages. The warning has become something of a cliché, and Okafor is not entirely comfortable with it. 'It makes it sound like a sudden catastrophe,' she says, 'when really it's a slow leak.' Most of what is lost, she explains, does not vanish in a single dramatic event but simply fades away: a website goes offline when its owner stops paying the bill, a company is taken over and its records are discarded, a format falls out of use and nobody thinks to convert the files saved in it.

There are, of course, organisations devoted to preventing such losses. National libraries in many countries now attempt to capture every website registered within their borders, and a number of non-profit archives have been copying material from the internet since the 1990s. Their achievements are considerable. But they are working against formidable odds. The quantity of information produced every day is so vast that even the best-funded institutions can preserve only a fraction of it, and decisions about what to keep are inevitably shaped by the priorities of the present.

That last point troubles Okafor more than any technical obstacle. Historians have often found that the most revealing sources are not the official documents that people deliberately preserved but the ordinary, apparently trivial records that survived by accident: shopping lists, private letters, the margins of school exercise books. The digital equivalents of such material – text messages, social media posts, emails between friends – are precisely what archives are least likely to collect, partly because there is so much of it and partly because it raises difficult questions about privacy.

Some of those questions have no easy answers. Should a person's online life be preserved after their death if they never gave permission? Who decides which voices from our time deserve to be heard in a hundred years? Okafor does not claim to have resolved these dilemmas, but she believes they need to be discussed more widely than they are at present, rather than being left to a small community of specialists.

In the meantime, she offers some practical advice to anyone who cares about their own digital legacy. Print the photographs that matter most. Save important documents in common, openly published formats rather than those owned by a single company. And, every few years, check that the files you think are safe can still be opened. 'It isn't glamorous,' she admits. 'But the people who will thank you for it haven't been born yet.'`,
questions:[
{q:"What point is illustrated by the story of the 1994 document?",
 opts:["Local government records are often poorly maintained.","Archivists are often unable to read documents written on computers.","Some documents are kept long after they have ceased to be useful.","Recovering old digital files can require considerable resources."],
 correct:3, why:"Pozoruhodný není dokument, ale 'úsilí potřebné k jeho otevření' – mechanika od sběratele, starý systém, nedostupný program. B přehání ('often unable'); Okafor ho nakonec čte.",
 evidence:"What is remarkable is the effort required to open it."},
{q:"According to Okafor, what do people wrongly believe about digital information?",
 opts:["It is less valuable than material written on paper.","It is more difficult to read than older documents.","It is safe from deterioration over time.","It is mostly produced using recent technology."],
 correct:2, why:"Lidé předpokládají, že digitální věci 'vydrží navždy' – opak je blíže pravdě. B je ve skutečnosti pravda (ne mylná víra), proto to není odpověď na otázku.",
 evidence:"People assume that because something is digital, it will last for ever"},
{q:"Why is Okafor 'not entirely comfortable' with the term 'digital dark age'?",
 opts:["It gives a misleading impression of how information is lost.","It was invented by people with little knowledge of history.","It exaggerates the amount of information that has disappeared.","It has been used too often to have any real impact."],
 correct:0, why:"Zní to jako 'náhlá katastrofa', ve skutečnosti jde o 'pomalý únik'. D je past: 'cliché' je zmíněno, ale její výhrada se týká obrazu ztráty, ne opotřebení výrazu.",
 evidence:"It makes it sound like a sudden catastrophe"},
{q:"In the fourth paragraph, the writer suggests that digital archives",
 opts:["have had little success in preserving websites.","have been established mainly by national governments.","can keep no more than a small proportion of what is produced.","are wrong to prioritise recent material over older content."],
 correct:2, why:"I nejlépe financované instituce uchovají 'jen zlomek'. A je opak – 'their achievements are considerable'. D zkresluje 'priorities of the present' (= dnešní hodnoty, ne novější materiál).",
 evidence:"even the best-funded institutions can preserve only a fraction of it"},
{q:"What concerns Okafor most about current archiving practice?",
 opts:["It overlooks the kind of everyday material historians find most valuable.","It fails to protect the privacy of ordinary people.","It depends on technology that may soon become obsolete.","It focuses too much on documents created by governments."],
 correct:0, why:"Nejcennější bývají obyčejné, náhodou dochované záznamy – a jejich digitální obdoby archivy sbírají nejméně. B: soukromí je důvod, proč se nesbírají, ne Okaforina obava. C výslovně vylučuje 'more than any technical obstacle'.",
 evidence:"are precisely what archives are least likely to collect"},
{q:"In the sixth paragraph, Okafor expresses the view that",
 opts:["people should give permission before their data is archived.","specialists are best placed to decide what should be preserved.","ethical questions about preservation deserve wider public debate.","it is impossible to predict what future historians will want."],
 correct:2, why:"Dilemata je třeba 'diskutovat šířeji', ne je nechat 'malé komunitě specialistů'. B je přímý opak. A je jen otázka, kterou si klade, ne její názor.",
 evidence:"she believes they need to be discussed more widely than they are at present"}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-slow-travel", title:"The long way round", topic:"cestování",
text:`The decision to travel from London to Istanbul by train was not, I should admit at the outset, made on principle. I had been meaning to give up flying for some time, in the vague way that one means to take up running or learn Italian, but what finally tipped the balance was a cancelled flight, a sympathetic friend with a railway timetable, and a stubborn refusal to spend another night in an airport hotel. The journey took four days. The flight would have taken under four hours. I have been trying ever since to work out why the former felt so much more like travelling.

Part of the answer, I suspect, lies in the way a train journey reveals the gradual nature of change. From the window of a plane, one country looks much like another, and the moment of arrival is abrupt: you step out of a sealed metal tube into a different climate, a different language, a different set of rules. On the ground, the transitions are slower and more instructive. You watch the architecture alter from one valley to the next, notice the point at which the station signs switch alphabets, and observe your fellow passengers changing as people get off and others take their place.

It would be dishonest to pretend that every hour was a revelation. There were long stretches of tedium, a night in a couchette shared with a man who snored with remarkable persistence, and a delay of six hours at a border crossing for reasons that nobody seemed able, or willing, to explain. I spent a good deal of the time reading, sleeping and staring blankly at fields. Yet even the boredom had a quality that I have never experienced on a plane – a sense of time passing usefully, of distance being earned rather than simply skipped.

Advocates of what has come to be called 'slow travel' are inclined to make large claims for it. It is better for the environment, they argue, better for local economies, and better for the traveller's soul. The first of these claims is largely true, although the difference depends heavily on how a train is powered and how full it is. The second is debatable. As for the third, I am wary of any form of tourism that presents itself as morally superior to the alternatives; there is something faintly self-congratulatory about the way some enthusiasts describe their journeys, as though taking longer were a virtue in itself.

What slow travel undeniably requires is time, and time is a resource that is far from evenly distributed. I was able to spend four days getting to Istanbul because my work is flexible and nobody was waiting for me at home. For a nurse with a fortnight's annual leave, or a parent with young children, the calculation is very different. To lecture such people on the evils of flying, as some campaigners do, seems to me both unfair and counterproductive.

The more interesting question, perhaps, is whether the experience of slowness can be separated from the means of transport. I have met people who fly to a single destination and then spend a month there, getting to know a place with a thoroughness that no overland traveller rushing through eight countries could hope to match. Conversely, it is perfectly possible to take a train across a continent while staring at a phone the entire way. Slowness, in this sense, is less a matter of speed than of attention.

I returned from Istanbul by train as well, partly out of curiosity and partly because the journey out had left me with a reluctance to be hurried. Whether I will always travel this way, I cannot honestly say. But I no longer think of the hours between departure and arrival as time to be endured. They turned out to be, in many ways, the point of the journey.`,
questions:[
{q:"What does the writer say about the decision to go to Istanbul by train?",
 opts:["It reflected a long-held commitment to avoid flying.","It was prompted partly by practical frustrations.","It was suggested by a friend who had made the same journey.","It was made in spite of the length of the journey."],
 correct:1, why:"Rozhodlo zrušené letadlo a odpor k další noci v letištním hotelu – 'not made on principle'. A je opak (jen 'vague' záměr). C: kamarád měl jízdní řád, o jeho cestě text nemluví.",
 evidence:"what finally tipped the balance was a cancelled flight"},
{q:"In the second paragraph, the writer contrasts train and air travel in terms of",
 opts:["how comfortable the experience is for passengers.","how easy it is to meet people from other countries.","how the traveller perceives the differences between places.","how much of the scenery the traveller is able to see."],
 correct:2, why:"Vlak ukazuje 'postupnou povahu změny' (architektura, abecedy), letadlo vás vysadí náhle. D je past: nejde o množství krajiny, ale o vnímání přechodu mezi místy.",
 evidence:"a train journey reveals the gradual nature of change"},
{q:"How does the writer describe the less enjoyable parts of the journey?",
 opts:["They made the writer question the decision to travel by train.","They were outweighed by a sense that the time was well spent.","They were caused mainly by poor organisation at borders.","They were more frequent than the writer had expected."],
 correct:1, why:"Nuda i zpoždění byly, 'přesto' měl pocit, že čas plyne užitečně a vzdálenost je 'zasloužená'. C: šest hodin na hranici je jen jedna z nepříjemností.",
 evidence:"a sense of time passing usefully, of distance being earned rather than simply skipped"},
{q:"What is the writer's opinion of the claims made by advocates of slow travel?",
 opts:["They are supported by clear evidence in each case.","They ignore the economic benefits that flying brings.","Some are justified, but the way they are presented is off-putting.","They are mostly accurate, though the writer finds them dull."],
 correct:2, why:"První tvrzení je 'z velké části pravdivé', druhé sporné, a vadí mu 'samolibý' tón nadšenců. A neplatí – druhé tvrzení je 'debatable'.",
 evidence:"there is something faintly self-congratulatory about the way some enthusiasts describe their journeys"},
{q:"Why does the writer mention a nurse and a parent?",
 opts:["to suggest that criticism of people who fly is often unfair","to show that slow travel appeals to a wider range of people","to argue that employers should offer more flexible holidays","to contrast their attitudes to travel with the writer's own"],
 correct:0, why:"Tito lidé nemají čas – kázat jim o zlu létání je 'nespravedlivé a kontraproduktivní'. D: nesrovnává jejich postoje, ale jejich podmínky (čas).",
 evidence:"To lecture such people on the evils of flying, as some campaigners do, seems to me both unfair and counterproductive."},
{q:"What does the writer conclude in the sixth paragraph?",
 opts:["Overland travellers usually get to know places better than those who fly.","It is better to visit a single destination than many countries.","Modern technology has spoiled the experience of long train journeys.","The value of slow travel lies in the traveller's state of mind."],
 correct:3, why:"'Pomalost je méně otázkou rychlosti než pozornosti.' A je opak (ten, kdo letí a zůstane měsíc, pozná místo lépe). C a B jsou jen příklady, ne závěr.",
 evidence:"Slowness, in this sense, is less a matter of speed than of attention."}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-by-heart", title:"The case for learning by heart", topic:"vzdělávání",
text:`When I was eleven, my English teacher made our class learn a poem by heart every week. We hated it. The poems were long, the language was often baffling, and the weekly recitation, in which each of us stood up in turn to stumble through the lines in front of everyone else, was a source of genuine dread. It is a measure of how unfashionable this practice has since become that, when I mention it to younger colleagues, they tend to react as though I had described a form of corporal punishment.

Their reaction is understandable. For several decades, educational thinking has been dominated by a suspicion of what is dismissively called 'rote learning'. Memorisation, according to this view, produces pupils who can repeat facts without understanding them, and who are ill-equipped for a world in which information is instantly available at the touch of a button. Why, the argument goes, should anyone spend hours committing to memory what they can look up in seconds? Far better to teach young people how to find, evaluate and apply knowledge than to fill their heads with it.

It is a persuasive case, and it contains a good deal of truth. Few people would wish to return to the kind of classroom in which children chanted multiplication tables and the names of kings without the faintest idea of why they mattered. But the argument rests on an assumption that research in cognitive psychology has increasingly called into question: namely, that knowing something and understanding it are separate processes, and that the second can be achieved without much of the first.

In fact, the evidence suggests that the two are closely intertwined. Our capacity to think about a subject depends heavily on what psychologists call long-term memory – the store of facts, concepts and patterns on which we draw, often without realising it, whenever we try to make sense of something new. Working memory, by contrast, the mental space in which we consciously reason, is remarkably limited. Someone who has to look up every relevant fact is using up that limited capacity on retrieval, leaving little for the kind of thinking that education is supposed to encourage. Knowledge, in short, is not the opposite of critical thinking; it is what critical thinking is made of.

None of this amounts to a defence of memorisation for its own sake. A pupil who can recite the dates of every battle in the Hundred Years War but has no idea why the war was fought has not learned very much. The point is rather that understanding cannot simply be taught as a skill, separately from the content to which it applies. A historian thinks critically about the past because she knows a great deal about it, not because she has attended a course in critical thinking.

There is also, I would suggest, a less measurable benefit. The poems I learned at eleven have stayed with me ever since, and they have acquired meanings I could not possibly have grasped at the time. Lines that once seemed like meaningless noise have returned to me at funerals, on long walks, in moments of happiness and grief. I did not understand them when I memorised them; I understood them because I had memorised them, and had carried them around long enough for my life to catch up with them.

I would not want to inflict the weekly recitation on today's pupils, at least not in its original form. The fear it caused was real, and fear is a poor teacher. But I have come to think that my teacher understood something that we have since forgotten: that what we know by heart becomes part of who we are, in a way that what we can merely look up never will.`,
questions:[
{q:"Why does the writer mention younger colleagues' reaction in the first paragraph?",
 opts:["to show how attitudes to memorisation have changed","to suggest that younger teachers are too sensitive","to emphasise how unpleasant reciting poems was","to illustrate how strict teachers were in the past"],
 correct:0, why:"Jejich reakce je 'měřítkem toho, jak nemoderní tato praxe mezitím je'. C je past: nepříjemnost je popsána předtím, reakce kolegů slouží k ukázání změny postojů.",
 evidence:"It is a measure of how unfashionable this practice has since become"},
{q:"In the second paragraph, the writer",
 opts:["argues that rote learning has been unfairly criticised.","summarises a widely held view of memorisation.","explains how information technology has changed education.","questions whether pupils can be taught to evaluate information."],
 correct:1, why:"Odstavec shrnuje cizí názor ('according to this view', 'the argument goes'), zatím ho nehodnotí. A přichází až ve 3.–4. odstavci. Pozor na signály převyprávění cizího názoru.",
 evidence:"For several decades, educational thinking has been dominated by a suspicion of what is dismissively called 'rote learning'."},
{q:"What does the writer say about the argument against memorisation in the third paragraph?",
 opts:["It is based largely on outdated research.","It ignores the fact that pupils enjoy learning facts.","It was originally a reaction against the teaching of history.","It is partly valid but depends on a questionable belief."],
 correct:3, why:"'Obsahuje hodně pravdy', ale stojí na předpokladu, který psychologie zpochybňuje. A: zastaralý výzkum nikde – naopak nový výzkum předpoklad zpochybňuje.",
 evidence:"But the argument rests on an assumption that research in cognitive psychology has increasingly called into question"},
{q:"According to the fourth paragraph, why is knowledge important for thinking?",
 opts:["It allows people to remember the results of their reasoning.","It enables people to search for information more efficiently.","It gradually increases the capacity of working memory.","It frees up limited mental capacity for reasoning."],
 correct:3, why:"Kdo musí vše dohledávat, spotřebuje omezenou pracovní paměť na vybavování a na myšlení mu nezbude. C je past: pracovní paměť je 'remarkably limited', text netvrdí, že roste.",
 evidence:"Someone who has to look up every relevant fact is using up that limited capacity on retrieval"},
{q:"The writer refers to a historian in the fifth paragraph to illustrate that",
 opts:["critical thinking courses are of little value to specialists.","memorising dates is an essential part of learning history.","the ability to think critically grows out of knowledge of a subject.","experts often find it difficult to explain how they think."],
 correct:2, why:"Historička myslí kriticky, protože 'o minulosti hodně ví', ne kvůli kurzu. B je opak – žák znající jen data 'se moc nenaučil'. A zobecňuje víc, než text říká.",
 evidence:"A historian thinks critically about the past because she knows a great deal about it"},
{q:"What does the writer suggest about the poems learned at school?",
 opts:["They were too difficult for children of that age.","They became meaningful through later experience.","They helped the writer overcome a fear of speaking in public.","They should be taught to pupils again in the same way."],
 correct:1, why:"Porozuměl jim, protože je nosil v paměti tak dlouho, až ho 'život dohnal'. D je opak – v původní podobě by recitaci dnešním žákům nepřál.",
 evidence:"I understood them because I had memorised them, and had carried them around long enough for my life to catch up with them"}
]}
];

window.DATA.reading.p6 = [
/* ------------------------------------------------------------------ */
{
id:"p6-arts-funding", title:"Public money and the arts", topic:"společnost",
intro:"You are going to read four extracts from articles in which commentators give their views on public funding for the arts.",
texts:[
{label:"A", text:`Few would dispute that the arts generate wealth: theatres fill restaurants, festivals fill hotels, and the creative industries now rival manufacturing as a source of export earnings. Yet the way public money is allocated remains stubbornly lopsided. A handful of large institutions, most of them in the capital, continue to receive the lion's share, while community projects in the regions compete for scraps. Those who receive public money must, of course, be able to show that it has been spent wisely, and it is entirely reasonable for funders to set out what they expect in return. Nor should we assume that the state must foot the whole bill. With the right tax incentives, private donors could be persuaded to play a far larger role than they do at present, as they already do in the United States.`},
{label:"B", text:`Defenders of arts funding have grown fond of quoting figures about the economic return on every pound invested. I am not convinced. Such calculations rely on assumptions that would not survive serious scrutiny, and they risk conceding the very point they set out to refute – that the arts are worth supporting only if they pay their way. The real case is a different one: a society that values only what can be measured has lost something essential. It follows that funding must come without strings. The moment a government starts to specify what kind of work it wishes to see, art becomes propaganda by another name. And those who believe that wealthy patrons will step in if the state withdraws should look at what happens when sponsors dislike the work: they quietly take their money elsewhere.`},
{label:"C", text:`The economic benefits of the arts are well documented, and it would be foolish to ignore them when making the case to a sceptical Treasury. What troubles me more is who actually benefits. Surveys consistently show that audiences for publicly funded opera, ballet and classical music are overwhelmingly affluent, which means that taxpayers on modest incomes are effectively subsidising the leisure of the better-off. Until funding bodies direct more of their money towards forms of culture that reach a broader public, it will be difficult to defend the current system as fair. Corporate sponsorship, sometimes held up as the answer, has proved a fickle friend: companies are happy to attach their names to prestigious events in good times, but their generosity tends to evaporate at the first sign of an economic downturn.`},
{label:"D", text:`There is no longer any serious doubt that cultural investment pays for itself many times over, through tourism, employment and the regeneration of run-down town centres. Critics who claim that funding is monopolised by a metropolitan elite are, in my view, a decade out of date: the past ten years have seen a determined and largely successful effort to spread money more evenly across the country. My concern lies elsewhere. Increasingly, grants come with lengthy lists of social objectives that artists are expected to meet, from improving public health to promoting community cohesion. Worthy as these aims may be, they are not what art is for, and an artist who is constantly ticking boxes is unlikely to produce anything of lasting value. Nor would private sponsors fill the gap if public money disappeared; there simply are not enough of them.`}
],
questions:[
{q:"Which writer has a different view from the others on whether the arts bring economic benefits?", answer:"B",
 why:"A, C i D ekonomický přínos uznávají ('Few would dispute', 'well documented', 'pays for itself'). B výpočtům nevěří ('I am not convinced') a ekonomický argument považuje za chybný.",
 evidence:[{label:"B", quote:"I am not convinced."},{label:"A", quote:"Few would dispute that the arts generate wealth"}]},
{q:"Which writer shares A's view on how public money for the arts is currently distributed?", answer:"C",
 why:"A: rozdělení je 'tvrdošíjně nevyvážené'. C souhlasí – systém nelze obhájit jako spravedlivý, z dotací těží bohatí. D tvrdí opak (peníze se už rozdělují rovnoměrněji); B o rozdělení nemluví.",
 evidence:[{label:"A", quote:"Yet the way public money is allocated remains stubbornly lopsided."},{label:"C", quote:"it will be difficult to defend the current system as fair"}]},
{q:"Which writer expresses a similar view to D on attaching conditions to arts funding?", answer:"B",
 why:"D: sociální cíle připojené ke grantům 'nejsou to, k čemu umění je'. B: financování musí být 'bez podmínek' (without strings). A naopak považuje podmínky za rozumné.",
 evidence:[{label:"D", quote:"they are not what art is for"},{label:"B", quote:"It follows that funding must come without strings."}]},
{q:"Which writer has a different view from the others about the role private sponsors could play?", answer:"A",
 why:"B, C i D pochybují, že by soukromí sponzoři stát nahradili (odejdou, jsou nestálí, není jich dost). A věří, že s daňovými pobídkami by mohli hrát 'mnohem větší roli'.",
 evidence:[{label:"A", quote:"private donors could be persuaded to play a far larger role than they do at present"},{label:"D", quote:"Nor would private sponsors fill the gap if public money disappeared"}]}
]},
/* ------------------------------------------------------------------ */
{
id:"p6-phones-schools", title:"Smartphones in schools", topic:"vzdělávání",
intro:"You are going to read four extracts from articles in which teachers and researchers discuss proposals to ban mobile phones in schools.",
texts:[
{label:"A", text:`Anyone who has taught a class of fourteen-year-olds knows how a single vibrating phone can derail a lesson. The research on attention merely confirms what teachers have observed for years. Critics of a ban like to claim that it is impossible to police, but in my experience the opposite is true: once a rule is applied consistently across the whole school, pupils accept it surprisingly quickly. What schools cannot do alone is change the culture. If parents are messaging their children throughout the day and scrolling through their own phones at the dinner table, no school policy will compensate. At the same time, a ban should not be an excuse to avoid the subject altogether. Young people need to be taught how to manage technology sensibly, and the classroom is an obvious place to do it.`},
{label:"B", text:`There is little doubt that smartphones are a distraction; the evidence that they reduce concentration and harm results is now substantial. But those who see an outright ban as the solution are, I fear, being naive. Teenagers are endlessly resourceful, and a rule that relies on teachers confiscating devices from thirty pupils at a time will be quietly evaded within weeks. Schools would do better to accept that phones are here to stay and concentrate on what they do best – teaching their subjects. I am also sceptical about the growing enthusiasm for lessons in 'digital wellbeing'. The curriculum is already overcrowded, and I have yet to see any evidence that an hour a week spent discussing screen time changes how teenagers actually behave.`},
{label:"C", text:`The case against phones in classrooms is, by now, overwhelming: study after study links their presence to poorer concentration and lower attainment. Yet I share the doubts of those who question whether a ban can work in practice. Devices are small, easily hidden and, for many pupils, a lifeline they will go to great lengths to keep. Enforcement turns teachers into security guards and generates exactly the kind of confrontation that damages relationships in a school. A more promising approach is to make responsible use part of what pupils learn, so that they understand for themselves why switching off matters. Schools cannot simply wait for families to take the lead on this; many parents feel as powerless in the face of the technology as their children do.`},
{label:"D", text:`The current panic about smartphones owes more to adult anxiety than to solid evidence. The studies most often cited show, at best, a weak link between phone use and concentration, and many fail to account for other factors such as sleep or family circumstances. Before blaming devices for every lapse in attention, we might ask where children learn their habits in the first place. The answer, uncomfortably, is at home: young people who see their parents constantly checking messages naturally assume that this is normal behaviour. Rather than banning phones, schools should help pupils develop the judgement to use them well, since they will need that skill for the rest of their lives.`}
],
questions:[
{q:"Which writer has a different opinion from the others about whether phones harm pupils' concentration?", answer:"D",
 why:"A, B i C škodlivost považují za prokázanou ('overwhelming', 'substantial'). D tvrdí, že panika vychází spíš z úzkosti dospělých a souvislost je 'v nejlepším případě slabá'.",
 evidence:[{label:"D", quote:"owes more to adult anxiety than to solid evidence"},{label:"C", quote:"study after study links their presence to poorer concentration and lower attainment"}]},
{q:"Which writer shares B's view on whether a ban can be enforced?", answer:"C",
 why:"B: zákaz bude 'během týdnů potichu obcházen'. C výslovně sdílí pochybnosti, zda zákaz může fungovat v praxi. A tvrdí opak (žáci pravidlo rychle přijmou); D o vymáhání nemluví.",
 evidence:[{label:"B", quote:"will be quietly evaded within weeks"},{label:"C", quote:"Yet I share the doubts of those who question whether a ban can work in practice."}]},
{q:"Which writer expresses a similar view to A on the influence of parents?", answer:"D",
 why:"A: když rodiče sami pořád píší zprávy, škola to nevyrovná. D: návyky se děti učí 'doma' od rodičů. C zmiňuje rodiče jinak – škola nemůže čekat, až převezmou iniciativu (cítí se bezmocní).",
 evidence:[{label:"A", quote:"If parents are messaging their children throughout the day"},{label:"D", quote:"The answer, uncomfortably, is at home"}]},
{q:"Which writer takes a different view from the others on whether schools should teach pupils to use phones responsibly?", answer:"B",
 why:"A, C i D chtějí, aby škola učila rozumné používání. B je skeptický – osnovy jsou přeplněné a důkazy, že to funguje, neviděl.",
 evidence:[{label:"B", quote:"I am also sceptical about the growing enthusiasm for lessons in 'digital wellbeing'."},{label:"A", quote:"Young people need to be taught how to manage technology sensibly"}]}
]},
/* ------------------------------------------------------------------ */
{
id:"p6-sleep-book", title:"Hours of Darkness – four reviews", topic:"věda",
intro:"You are going to read four reviews of a book about the science of sleep, written by the neuroscientist Paula Wren.",
texts:[
{label:"A", text:`Paula Wren writes with an ease that many scientists would envy, and readers with no background in biology will have little difficulty following her account of what happens in the brain each night. The chapter on dreaming is a particular delight, weaving together laboratory findings and literary history to fascinating effect. My reservations concern the way she handles the evidence. Time and again, studies involving a few dozen undergraduates are presented as though they had settled questions that remain very much open, and the cautious language of the original papers is lost along the way. The final section, which offers advice on improving one's sleep, is the least successful part of the book: keep the bedroom cool, avoid screens late at night, go to bed at the same time each evening. Sensible, no doubt, but hardly news.`},
{label:"B", text:`Hours of Darkness is not, despite its publisher's claims, a book for the casual reader. Wren seems unable to resist explaining every mechanism in exhaustive detail, and anyone who does not already know the difference between a neurotransmitter and a hormone is likely to give up well before the halfway point. That is a pity, because there is much here to admire. Wren is scrupulous in distinguishing between what has been firmly established and what remains speculative, and she is refreshingly willing to admit the limits of current knowledge. Her account of the competing theories of dreaming is the highlight of the book – lucid, balanced and genuinely thought-provoking.`},
{label:"C", text:`One of the pleasures of Hours of Darkness is its clarity: Wren has a gift for translating complex neuroscience into prose that any interested reader can enjoy. She is less sure-footed when she ventures beyond her own field. The long chapter on dreams, which strays into psychoanalysis and the history of art, feels padded and unfocused, as though written to fill space rather than to illuminate. Readers hoping for a solution to their own sleepless nights may also be disappointed. Wren's recommendations, though perfectly reasonable, are the same ones that have appeared in magazine articles for years, and she adds little to them beyond the authority of her title.`},
{label:"D", text:`Wren is that rare thing, a researcher who can write for a general audience without talking down to it, and her book deserves to be widely read. Her discussion of dreaming, in particular, is as entertaining as anything I have read on the subject. I was less convinced by her confident claims about the long-term effects of poor sleep on health. Several of the studies she relies on have been challenged by other researchers, a fact she mentions only in passing, if at all. Still, the practical chapter at the end is worth the price of the book on its own: her suggestions are specific, grounded in evidence and, in my own case at least, surprisingly effective.`}
],
questions:[
{q:"Which reviewer has a different opinion from the others on how accessible the book is to non-specialist readers?", answer:"B",
 why:"A, C i D chválí srozumitelnost pro laiky. B tvrdí, že kniha 'není pro běžného čtenáře' – vše vysvětluje příliš podrobně.",
 evidence:[{label:"B", quote:"is not, despite its publisher's claims, a book for the casual reader"},{label:"D", quote:"a researcher who can write for a general audience without talking down to it"}]},
{q:"Which reviewer shares C's opinion of the author's practical advice?", answer:"A",
 why:"C: rady jsou rozumné, ale stejné jako v časopisech léta. A: 'rozumné, ale žádná novinka'. D je opak (rady jsou konkrétní a účinné); B rady nezmiňuje.",
 evidence:[{label:"C", quote:"are the same ones that have appeared in magazine articles for years"},{label:"A", quote:"Sensible, no doubt, but hardly news."}]},
{q:"Which reviewer has a similar view to A about the way the author presents research findings?", answer:"D",
 why:"A: malé studie podává, jako by otázky rozhodly. D: její sebejistá tvrzení ho nepřesvědčila, zpochybněné studie zmiňuje jen letmo. B tvrdí opak – pečlivě odlišuje prokázané od spekulativního.",
 evidence:[{label:"A", quote:"studies involving a few dozen undergraduates are presented as though they had settled questions that remain very much open"},{label:"D", quote:"I was less convinced by her confident claims"}]},
{q:"Which reviewer expresses a different view from the others about the chapter on dreams?", answer:"C",
 why:"A, B i D kapitolu o snech chválí ('delight', 'highlight', 'entertaining'). C ji považuje za vatu – 'padded and unfocused'.",
 evidence:[{label:"C", quote:"feels padded and unfocused"},{label:"B", quote:"Her account of the competing theories of dreaming is the highlight of the book"}]}
]},
/* ------------------------------------------------------------------ */
{
id:"p6-ecotourism", title:"Can ecotourism save wildlife?", topic:"cestování / životní prostředí",
intro:"You are going to read four extracts from articles in which travel writers consider whether ecotourism helps to protect wildlife.",
texts:[
{label:"A", text:`At its best, ecotourism is one of the few arrangements in which everybody wins. Visitors pay handsomely to see gorillas or whale sharks, and that money gives villagers a reason to protect animals they might otherwise hunt. I accept that the long-haul flights involved carry an environmental cost, but without the income they make possible, many reserves would simply not exist. What I find harder to defend is the way the word 'eco' has been stretched beyond recognition. Hotels that change the towels less often now advertise themselves as sustainable, and there is no reliable way for travellers to tell the genuine projects from the opportunists. Even the genuine ones must be carefully managed: too many visitors, too close, and the animals begin to change their behaviour in ways that may harm them.`},
{label:"B", text:`I have seen what ecotourism can do for a community. In one Ugandan village, income from guided treks now pays for a school and a health clinic, and former poachers work as trackers. Yet I find it increasingly hard to ignore the contradiction at the heart of the industry. A return flight to Central Africa produces more carbon than many of the villagers will generate in years, and no amount of good work on the ground can fully offset that. Nor are the animals unaffected. Habituating gorillas to human visitors exposes them to diseases against which they have no defence, a risk that operators are understandably reluctant to publicise.`},
{label:"C", text:`The brochures are full of smiling local guides, but the reality is often less appealing. Studies of ecotourism projects in several countries have found that most of the money stays with foreign-owned tour companies and international hotel chains, while local people are offered low-paid, seasonal work. The problem is made worse by the lack of any agreed definition of what ecotourism actually is. Almost any holiday can now be sold with a green label attached, and companies have every incentive to exploit the confusion. Meanwhile, the steady stream of jeeps and boats around the most popular sites is changing the feeding and breeding habits of the very species tourists come to see.`},
{label:"D", text:`For many communities, ecotourism has provided the first real alternative to logging or farming, and the benefits – jobs, schools, roads – are visible to anyone who visits. I would be more enthusiastic still if it did not depend so heavily on air travel. Every long-haul flight undoes a little of the good that the visitors' money achieves, and it is far from clear that the balance is a positive one. Concerns about disturbance to wildlife, on the other hand, seem to me overstated. Animals in well-run reserves quickly learn to ignore vehicles that keep a sensible distance, and the presence of guides and rangers protects them from far greater threats.`}
],
questions:[
{q:"Which writer has a different view from the others on whether ecotourism benefits local communities?", answer:"C",
 why:"A, B i D vidí přínos pro místní (škola, klinika, práce). C: většina peněz zůstává zahraničním firmám, místní dostanou jen špatně placenou sezónní práci.",
 evidence:[{label:"C", quote:"most of the money stays with foreign-owned tour companies and international hotel chains"},{label:"B", quote:"income from guided treks now pays for a school and a health clinic"}]},
{q:"Which writer shares D's view on the environmental impact of flying to distant destinations?", answer:"B",
 why:"D: každý dálkový let 'trochu ruší' dobro, které peníze přinesou. B: žádná dobrá práce na místě to 'nemůže plně vyvážit'. A naopak lety obhajuje – bez nich by rezervace neexistovaly.",
 evidence:[{label:"D", quote:"Every long-haul flight undoes a little of the good that the visitors' money achieves"},{label:"B", quote:"no amount of good work on the ground can fully offset that"}]},
{q:"Which writer has a similar opinion to C about the way the term 'eco' is used?", answer:"A",
 why:"C: téměř každou dovolenou lze prodat se zelenou nálepkou. A: slovo 'eco' je 'roztažené k nepoznání' a cestovatel nepozná pravé projekty od oportunistů.",
 evidence:[{label:"C", quote:"Almost any holiday can now be sold with a green label attached"},{label:"A", quote:"the way the word 'eco' has been stretched beyond recognition"}]},
{q:"Which writer takes a different view from the others on whether tourists disturb wildlife?", answer:"D",
 why:"A, B i C upozorňují, že turisté mění chování zvířat nebo jim přenášejí nemoci. D obavy považuje za přehnané – zvířata se naučí vozidla ignorovat.",
 evidence:[{label:"D", quote:"Concerns about disturbance to wildlife, on the other hand, seem to me overstated."},{label:"C", quote:"is changing the feeding and breeding habits of the very species tourists come to see"}]}
]},
/* ------------------------------------------------------------------ */
{
id:"p6-four-day-week", title:"The four-day week", topic:"práce",
intro:"You are going to read four extracts from articles in which economists and commentators discuss the idea of a four-day working week.",
texts:[
{label:"A", text:`Advocates of the four-day week point to impressive results: companies taking part in recent trials reported that output held steady, or even rose, while staff worked fewer hours. I do not doubt that productivity can survive the change. But I would treat the trials themselves with caution. The firms involved chose to take part, which suggests they were already well suited to the experiment, and many of them were small businesses in the technology and marketing sectors. What concerns me more is the human cost. In practice, many employers have squeezed five days' work into four, and the staff I have spoken to describe longer, more pressured days that leave them too exhausted to enjoy the extra time off.`},
{label:"B", text:`It is easy to see why the four-day week has captured the public imagination. Few people would turn down an extra day of rest, and the benefits for mental health and family life are well established. The economics, however, are less encouraging. Outside a narrow range of office jobs, reducing hours almost always means reducing output, since a nurse or a bus driver cannot simply work faster to make up the difference. Hospitals, schools and shops would have to employ more staff to maintain the same level of service, at a cost that somebody would have to bear.`},
{label:"C", text:`The evidence from the largest trials so far is hard to dismiss. Hundreds of firms, thousands of employees and independent researchers monitoring the results: this was not a public relations exercise. Productivity was maintained in the great majority of cases, while sick leave fell and staff reported feeling happier and less burnt out. I would add one caveat. The model works best where output is measured by results rather than by hours, and there are many jobs – in care, transport or emergency services – where that simply is not the case. For those sectors, a different solution will be needed.`},
{label:"D", text:`Rested employees are more focused employees, and the companies I have studied found that a shorter week led to fewer mistakes and higher output per hour, as well as a striking improvement in staff morale. That said, the published trials have weaknesses that their supporters tend to overlook. Participating firms volunteered, many had already introduced flexible working, and the trials lasted only six months – long enough for enthusiasm, perhaps, but not for the novelty to wear off. Nor do I accept the common objection that the idea cannot work in hospitals or schools. With imaginative scheduling, staggered rotas and some initial investment, almost any organisation could adapt.`}
],
questions:[
{q:"Which writer has a different view from the others on the effect of a four-day week on productivity?", answer:"B",
 why:"A, C i D tvrdí, že produktivita se udrží nebo vzroste. B: mimo kanceláře zkrácení hodin 'téměř vždy' znamená nižší výkon.",
 evidence:[{label:"B", quote:"Outside a narrow range of office jobs, reducing hours almost always means reducing output"},{label:"A", quote:"I do not doubt that productivity can survive the change."}]},
{q:"Which writer shares A's view on the reliability of the evidence from trials?", answer:"D",
 why:"A: k pokusům je třeba přistupovat opatrně (firmy se přihlásily dobrovolně). D: zveřejněné pokusy mají slabiny (dobrovolníci, jen šest měsíců). C naopak důkazy považuje za těžko zpochybnitelné.",
 evidence:[{label:"A", quote:"But I would treat the trials themselves with caution."},{label:"D", quote:"the published trials have weaknesses that their supporters tend to overlook"}]},
{q:"Which writer expresses a similar opinion to B about whether the model suits all kinds of work?", answer:"C",
 why:"B: zdravotní sestra ani řidič nemohou 'prostě pracovat rychleji'. C: v péči, dopravě či záchranných službách model nefunguje. D tvrdí opak – přizpůsobit se může téměř každá organizace.",
 evidence:[{label:"B", quote:"a nurse or a bus driver cannot simply work faster to make up the difference"},{label:"C", quote:"there are many jobs – in care, transport or emergency services – where that simply is not the case"}]},
{q:"Which writer takes a different view from the others on how a four-day week affects employees' well-being?", answer:"A",
 why:"B, C i D uvádějí lepší duševní zdraví, méně vyhoření a lepší morálku. A: lidé mají delší a stresovější dny a jsou příliš vyčerpaní, aby si volno užili.",
 evidence:[{label:"A", quote:"leave them too exhausted to enjoy the extra time off"},{label:"C", quote:"staff reported feeling happier and less burnt out"}]}
]},
/* ------------------------------------------------------------------ */
{
id:"p6-personality-tests", title:"Personality tests in recruitment", topic:"psychologie",
intro:"You are going to read four extracts from articles in which psychologists comment on the use of personality tests when recruiting staff.",
texts:[
{label:"A", text:`The personality questionnaire has become a fixture of graduate recruitment, largely because it allows employers to screen thousands of applicants quickly and cheaply. Its scientific credentials are rather less impressive. Scores on most commercial tests bear only a weak relationship to how well people actually perform once they are hired. Worse, anyone with a little intelligence can work out what the employer wants to hear: few applicants for a sales job will admit to disliking strangers. I am also troubled by the effect on candidates who think differently. People with autism or ADHD, for example, may answer honestly and find themselves rejected for traits that have little bearing on their ability to do the job.`},
{label:"B", text:`Personality tests are frequently dismissed as pseudo-science, but the research tells a more nuanced story. Well-designed questionnaires measuring traits such as conscientiousness are among the better predictors of job performance available, outperforming the unstructured interviews on which many employers still rely. For a large organisation facing an avalanche of applications, they offer an efficient way to narrow the field. They also have an advantage that is rarely acknowledged: unlike an interviewer, a questionnaire is not swayed by a candidate's accent, appearance or old school, which makes it, if anything, a fairer instrument than the alternatives.`},
{label:"C", text:`There is little evidence that personality tests tell employers anything useful about how candidates will perform. So why are they so popular? The cost argument is often cited, but I suspect the real attraction is that they allow recruiters to present subjective decisions as scientific ones. If a candidate is rejected because of a score, nobody has to take personal responsibility. The irony is that the scores themselves are easily distorted. Candidates quickly learn to present the profile they believe the employer is looking for, and coaching websites now offer to teach them how.`},
{label:"D", text:`Most employers adopt personality tests for practical reasons: they need to process large numbers of applicants and cannot interview them all. That is understandable, but it does not make the tests any more valid. Their power to predict who will succeed in a job is modest at best. The popular belief that candidates routinely lie on these questionnaires is, I think, exaggerated; most people answer reasonably honestly, if only because they find it hard to guess what is wanted. The more serious problem is that the 'ideal' profile is usually based on existing staff, which means that applicants from under-represented backgrounds, or those with conditions such as dyslexia, may be screened out for no good reason.`}
],
questions:[
{q:"Which writer has a different view from the others on how well personality tests predict job performance?", answer:"B",
 why:"A, C i D tvrdí, že testy výkon předpovídají slabě. B: dobře navržené dotazníky patří 'mezi lepší dostupné prediktory' – lepší než nestrukturovaný pohovor.",
 evidence:[{label:"B", quote:"are among the better predictors of job performance available"},{label:"D", quote:"Their power to predict who will succeed in a job is modest at best."}]},
{q:"Which writer shares C's view on whether candidates can manipulate their answers?", answer:"A",
 why:"C: uchazeči se rychle naučí předvést profil, který zaměstnavatel chce. A: každý trochu inteligentní pozná, co chce zaměstnavatel slyšet. D tvrdí opak – většina odpovídá poctivě.",
 evidence:[{label:"C", quote:"Candidates quickly learn to present the profile they believe the employer is looking for"},{label:"A", quote:"anyone with a little intelligence can work out what the employer wants to hear"}]},
{q:"Which writer has a similar opinion to A about the risk that tests unfairly exclude certain candidates?", answer:"D",
 why:"A: lidé s autismem či ADHD mohou být odmítnuti kvůli rysům, které s prací nesouvisí. D: uchazeči z nedostatečně zastoupených skupin či s dyslexií mohou být vyřazeni 'bez dobrého důvodu'. B naopak považuje testy za spravedlivější než pohovor.",
 evidence:[{label:"A", quote:"may answer honestly and find themselves rejected for traits that have little bearing on their ability to do the job"},{label:"D", quote:"may be screened out for no good reason"}]},
{q:"Which writer has a different view from the others about why employers use personality tests?", answer:"C",
 why:"A, B i D uvádějí praktický důvod – rychlé a levné vyřazení velkého počtu uchazečů. C podezírá jiný 'skutečný' důvod: testy umožní vydávat subjektivní rozhodnutí za vědecká.",
 evidence:[{label:"C", quote:"I suspect the real attraction is that they allow recruiters to present subjective decisions as scientific ones"},{label:"A", quote:"largely because it allows employers to screen thousands of applicants quickly and cheaply"}]}
]}
];
