import { SecurePassword } from "blitz"
import db from "./index"

const data = [
  {
    body: "",
    description: "La biscotte ergonomique",
    name: "Kiro",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2F07GPlTkVeRdzvyTJsTbM%2Fimages%2FRcC0PcqtSnUyGGaP7oJI%2Fmain-image-a3@thumbnail.jpg?generation=1578480605245243&alt=media",
    what:
      "The Kiro Ro ’cracker can be broken in two along a pre-cut line: a rounded part is ready to be decorated with toppings and a smaller part which can be used as a spreading tool. This version offers a playful and practical cookie, with a practical dimension.\n" +
      "\n" +
      "The Kiro Rec ’crackers offer several handling possibilities thanks to their intuitive use in order to offer maximum comfort to each user according to their mobility and habits.",
    why:
      'The name Kiro comes from the prefix "chiro", coming from the ancient Greek kheír ("hand").\n' +
      "The shapes of the Kiro crackers have been thought through and tested to facilitate handling for users with certain gripping difficulties. Usually, the shapes of rusks and other crackers are designed according to production machines or aesthetic or marketing criteria. Kiro's variations have been imagined to adapt to the human and in the first place to the ergonomics of the hand.",
  },
  {
    body: "",
    description:
      "Girello in legno, acciaio e tessuto colorato, con sistema frenante che entra in funzione in caso di necessità e con imbrago a rotaia che facilita il cambio della direzione del moto.",
    name: "Marco Kart",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2F0XUTQSgCkQptIfaOI54P%2Fimages%2FByjHCSG5aG3jUjHxOMvW%2FIMG_7438-min@thumbnail.jpg?generation=1563725929702155&alt=media",
    what:
      "Per far fronte allo scarso senso di equilibrio, abbiamo sviluppato un girello chiuso su tutti i lati. Il bambino viene infilato dall'alto in una struttura in stoffa che, in caso di caduta, lo sostiene, portandolo in posizione seduta. \n" +
      "Inoltre, la struttura è dotata di un impianto frenante, che entra in azione in caso di caduta, garantendo sicurezza. Lo stesso meccanismo si attiva anche se Marco si siede: in questo modo, Marco Kart diviene anche uno stimolo a restare in posizione eretta e camminare.",
    why: "Marco Kart è un deambulatore progettato e realizzato per Marco Chiaro, un bimbo di 8 anni affetto da un rara malattia. Nonostante le molte patologie connesse all'1q41.12,  Marco ha la capacità di camminare ma l'operazione è molto faticosa e pericolosa. Pertanto il girello, si propone di rendere Marco più confidente e autonomo, limitando le sue difficoltà. ",
  },
  {
    body: "",
    description:
      "Strizzatore di stracci e spugnette tramite pressione orizzontale per coloro che non hanno la piena mobilità delle mani.",
    name: "Squeezer 46",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2F0o7sqm7ArxzCKJZVDcsg%2Fimages%2FRWI0F7VQMwEQfmZFv8cm%2FP_20190710_211343_vHDR_On_1@thumbnail.jpg?generation=1563228744992117&alt=media",
    what: "Squeezer 46 è uno strizzatore composto da due parti cilindriche di diametri diversi le quali vengono compresse orizzontalmente tra di loro tramite i palmi delle mani e permettono, grazie al loro particolare profilo, la fuoriuscita dell'acqua. Esso è perfettamente trasportabile ed utilizzabile in qualsiasi ambiente che presenti un lavabo o una bacinella.",
    why: "Abbiamo progettato questo strizza-stracci per Francesca, una ragazza che essendo tetraplegica non ha la totale mobilità delle mani. Non potendo infatti compiere completamente l'azione dello strizzamento necessitava di un ausilio che la aiutasse.",
  },
  {
    body: "",
    description:
      "Un pratico fermapiede per bicicletta facile da calzare e che, impedendo il movimento laterale del piede, consente al ciclista di avere una pedalata fluida e regolare.",
    name: "X-GP",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2F3wnpu1O15zYACVw2nXg1%2Fimages%2Fp2K8TH9JsVybtDm1pIjk%2FWhatsApp-Image-2019-06-16-at-13@thumbnail.jpg?generation=1561923550867194&alt=media",
    what: "L'X-GP è un fermapiede che prevede due prolungamenti laterali rigidi grazie ai quali il piede non urta la pedivella e resta fermo sul pedale. Inoltre l'inserimento di un elastico che avvolge la caviglia, contribuisce alla maggiore stabilità del piede e facilita la calzata del fermapiede.",
    why: "Il progetto è stato pensato per Gianpaolo, appassionato di ciclismo. Non avendo il pieno controllo della gamba destra, Gianpaolo ha difficoltà a mantenere perfettamente stabile il piede destro sul pedale, urtando così la pedivella e rendendo faticosa e poco sicura la pedalata, soprattutto nei tratti in salita. ",
  },
  {
    body: "",
    description: "Il primo tavolino pieghevole per carrozzina. Tutto stampato in 3D.",
    name: "Tournée",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2F6Y0vcf2oyNTmP0ibUiN8%2Fimages%2FkRy2RDw9n0Y4xh72yIcQ%2FIMG_4062_C@thumbnail.jpeg?generation=1557913798997873&alt=media",
    what: "Tournée è un tavolino facilmente pieghevole e trasportabile che tramite delle cinghie strap si adatta ai vari modelli di carrozzina. Le dimensioni sono pensate per attraversare anche le soglie più strette.",
    why: "Daniela non riusciva sempre ad entrare negli ascensori con suo figlio Francesco, in carrozzina e con il suo tavolino. Inoltre era difficile da trasportare durante gli spostamenti, viaggi, gite, o altro.",
  },
  {
    body: "",
    description: "Un apri-finestre per Chiara",
    name: "ABA",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2F6i5Em8w39fbRkUbweSwY%2Fimages%2Fj9Vi0kkCy1wXbPrAOcH7%2FIMG_4369_B@thumbnail.jpg?generation=1585987619074586&alt=media",
    what: "Permette di ruotare e spostare la maniglia della finestra a piacimento. ",
    why: "Chiara ha una finestra difficile da raggiungere, in più ha difficoltà motorie tali che è quasi impossibile per lei accedervi.",
  },
  {
    body: "",
    description:
      "Giulia cercava un passeggino utilizzabile da persone in carrozzina per poter trasportare il proprio bambino nella maniera più confortevole possibile, poiché sul mercato non esiste tutt'ora nulla di soddisfacente.",
    name: "Baby on Board",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2F9xQsGn2KGdOsWHbCUGN0%2Fimages%2FQaQQcxMbt6jODXPN5jlc%2FImmagine-1@thumbnail.jpg?generation=1562174895784093&alt=media",
    what: "Il progetto è nato per consentire a mamme e papà in carrozzina di poter trasportare autonomamente il proprio neonato, sia fuori che dentro casa e nel modo più pratico possibile. Questa è una necessità che fino ad ora non è stata presa sufficientemente in considerazione dal mercato internazionale e soprattutto da quello italiano. Ideando questa culla autoportante abbiamo voluto agevolare le coppie con disabilità nel poter ampliare la famiglia, offrendo loro il mezzo per potersi spostare in tutta libertà!",
    why: "A tutto il gruppo è piaciuta fin da subito l'idea di lavorare su questo progetto per due motivi: il primo era che ci sembrava una sfida interessante e stimolante nella quale ci saremmo cimentati molto volentieri, come seconda ragione invece ci piaceva molto l'idea di risolvere un problema di molte persone e rendere possibile qualcosa che prima poteva sembrare difficile o infattibile.",
  },
  {
    body: "",
    description: "Manico per bastone da passeggio performante",
    name: "P-Cane",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FDlzkhaDkwMZsCnVFqGAd%2Fimages%2F8tIUaLp2UgWttb70XCOZ%2FP-Cane_1@thumbnail?generation=1557867854990552&alt=media",
    what: "P-Cane è un manico per bastone da passeggio che può essere appeso (o messo in sicurezza) e permette due impugnature (alta e bassa) per salire e scendere le scale più facilmente.",
    why: "Durante il laboratorio di Hackability4Pontelambro abbiamo scelto dei progetti da rivedere e riprogettare perché possano essere d'aiuto alle persone anziane.",
  },
  {
    body: "",
    description: "plateau amovible pour fauteuil roulant",
    name: "Lift",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FE5dzDmPuve7C387DIles%2Fimages%2F7kvMqKJ9q880paNxYyKj%2FLIFT-@NASSIMA-KITCHEN@thumbnail.jpg?generation=1578281010491694&alt=media",
    what: "The tray is designed to be easily fixed to a wheelchair by the user herself. It has a large indentation on the front to load a plate and borders on sides to prevent things to fall. the tray is locked by the chair joystick. It can be lift and move around to eat, work on laptop or slice vegetable for example. The feet also allow Nassima to use it at bed.",
    why: "We are developing a wheelchair tray allowing the user to recover some of his autonomy especially around cooking and eating, despite a heavy handicap .",
  },
  {
    body: "",
    description:
      "Massaggiatore plantare per la riattivazione della microcircolazione sanguigna della pianta del piede.",
    name: "Massaggiatore plantare",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FGbzaFzg6YvLvUehaR0Kw%2Fimages%2FduJf6rhRD3ailkDaSq1d%2F59ca46bb-3b3d-43aa-9142-d6f336d9720c@thumbnail.jpeg?generation=1557868630370915&alt=media",
    what: "Il massaggiatore plantare partecipa alla riattivazione della microcircolazione sanguigna",
    why: "Progetto sviluppato a causa della rottura del tendine di Achille, successivo intervento chirurgico e fase riabilitativa.",
  },
  {
    body: "",
    description: "Maniglia porta-sacchetti",
    name: "Easybag",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FIBkGAriD36UUy2mphNB7%2Fimages%2FrbnlUclYI40dZwDz2r9c%2FEasybag_6@thumbnail.jpeg?generation=1557914181191748&alt=media",
    what:
      "Easybag è una maniglia porta-sacchetti, pieghevole e portatile, con chiusura di sicurezza.\n" +
      "In questa versione, risulta un oggetto migliorato in portabilità con qualche accorgimento tecnico che lo rende più confortevole.",
    why: "Durante il laboratorio di Hackability4Pontelambro abbiamo scelto dei progetti da rivedere e riprogettare perché possano essere d'aiuto alle persone anziane.",
  },
  {
    body: "",
    description: "Deambulatore-passeggino ",
    name: "Go Sofi Go",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FIiz36RKjvJiuZ8iZrA1O%2Fimages%2FqhAIZVxlggpZUg6G8MFz%2Fpasseggino@thumbnail.jpg?generation=1563738666408220&alt=media",
    what: "La struttura del telaio realizzato prende spunto dalla forma della sedia utilizzata da Sofia per camminare in casa: comprende un telaio a forma di cuneo per gestire la distribuzione del peso, una seduta ripiegabile, un manubrio a sbarra legante le coppie di gambe anteriori e posteriori. Il sistema di frenaggio è montato posteriormente tramite due rondelle poste simmetricamente ai lati della ruota: una saldata e una regolabile tramite dado per impedire al prototipo di prendere velocità",
    why: "Sofia, bambina di 9 anni affetta da microcefalia grave, aveva bisogno di un deambulatore con cui camminare in sicurezza fuori dagli ambienti domestici. Questo ausilio doveva essere facile da manovrare, stabile in caso di caduta della bambina e doveva potersi trasformare in passeggino cosicché i genitori potessero evitare, in caso di lunghe passeggiate, di portare sia il deambulatore che la carrozzina.",
  },
  {
    body: "",
    description: "Toolkit to improve packagings",
    name: "Unwrapped",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FLYv4kZmpXVrj8uBbByt9%2Fimages%2F8d9TJq58FnkfIVWdjl9S%2FUNWRAPPED-FACILIATATORS_FINAL-(4)@thumbnail.jpg?generation=1579693964544974&alt=media",
    what:
      "\n" +
      "System of easy opening and closing bags: the consumer can easily identify the tears at the top of the bag and take off the twist tie. This twist tie, bigger than the ones usually used, allows an easy grip. Finally, to close it you just have to wrap it.\n" +
      "Clarity of the information: a graphic charter show clearly the information that guide the user in his purchase and later, in his meal.\n" +
      "Information: a QR code on the packagings and the website make essential informations audible on your device.\n" +
      "\n",
    why:
      "\n" +
      "The purpose of this project is to improve the experience while using products from Harry’s and Wasa for blind, limited dexterity, but also no disability people. We identify different issues with the help of two people with disabilities : visibility of products information - description, price, composition -, understanding and practicality of the opening/closing system,...\n",
  },
  {
    body: "",
    description:
      "Questo prototipo di tavola pitagorica si rivolge a bambini con disturbi specifici dell'apprendimento e si propone come strumento compensativo\n" +
      "per lo studio della matematica nei primi anni dell'istruzione.",
    name: "Tavola Pitagorica",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FO5VDDgpzFVeZa7TWWFZH%2Fimages%2FnRdLHKo63pLDqMJAaAL5%2Ftavola-noback@thumbnail.jpg?generation=1563707220857443&alt=media",
    what: "La tavola è composta da due rettangoli di plexiglass sovrapposti ed uniti da viti; tra di esse vi sono una stampa di tavola pitagorica e una mascherina scorrevole, anch’essa in plexiglass, che copre tre righe della tavola. Una riga riporta l’indicazione della colonna corrispondente, una seconda riga è completamente trasparente per rendere possibile la visione del risultato dell’operazione, mentre la terza è oscurata per focalizzare l’attenzione sul risultato.",
    why:
      "Lo studio della matematica richiede un alto livello di pianificazione, quindi il coinvolgimento di più domini neuropsicologici: sono interessati \n" +
      "il campo della pianificazione, della memoria di lavoro, dell’attenzione, della memorizzazione effettiva della tabellina. Nei soggetti con difficoltà \n" +
      "di apprendimento queste operazioni vanno vicariate con oggetti compensativi. La tavola è destinata a ragazzi discalculici, disprastici e soggetti con \n" +
      "difficoltà nella funzionalità visiva.",
  },
  {
    body: "",
    description:
      "Supporto rialzato e adattabile per il piatto per scoraggiare la tendenza di Antonella a chinare la testa verso il piatto promuovendo l'adozione di una postura corretta. È costituito da una base concava e da una serie di piedini ad incastro, stampati in 3D.",
    name: "EatEasy",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FSVjfplQPCmWCej9m9iaV%2Fimages%2F8l9juDEnXKQcXojJBEfW%2F5mKLldy2@thumbnail.jpg?generation=1563531593881467&alt=media",
    what: "Per incentivare l'autonomia di Antonella e per evitare l'assunzione ripetuta di una postura scorretta era necessario avvicinare il piatto al viso, cosicché Antonella non si dovesse piegare sopra al piatto per mangiare da sola.",
    why: "Questo supporto rialzato è stato pensato per Antonella, ragazza di 13 anni affetta da tetraparesi mista, condizione che comprende sintomi di spasticità, contratture muscolari, disturbi della marcia e della coordinazione, movimenti coreici incontrollati. ",
  },
  {
    body: "",
    description:
      "Appoggio per il gomito che rende poco faticosa l'attività di scrittura al computer",
    name: "Supporto-cuscinetto per il braccio",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FUAMIJpuf2nHkx86Xt7ik%2Fimages%2FG35xuMB7vPIz7svbtnQc%2F1@thumbnail.jpg?generation=1571668073500846&alt=media",
    what:
      "Questo appoggio vuole rendere la scrittura meno faticosa per Fabio sostenendogli il braccio. Nella progettazione di questo ausilio, abbiamo compreso che un unico supporto rigido poteva essere limitante per il bambino, poiché questo potrebbe non essere versatile rispetto a computer o tastiere di grandezze differenti.\n" +
      "Così siamo riusciti a conciliare la praticità del supporto a un aspetto ludico, scomponendo l’appoggio in più parti collegabili ad incastro come un puzzle.",
    why:
      "Fabio soffre di una patologia che comporta un degrado neuronale che causa la difficoltà nel controllare i movimenti fini in particolare a livello delle dita e del polso. Fabio utilizza per scrivere prevalentemente il computer, sia a scuola che a casa.\n" +
      "Lo scarso controllo nei movimenti delle dita e del polso, però, lo portano ad affidarsi prevalentemente alla spalla e ad irrigidire il braccio, rendendogli faticose l’utilizzo prolungato della tastiera del computer.",
  },
  {
    body: "",
    description: `Prodotto software per la consultazione di materiale didattico in completa autonomia, con un'interfaccia "ergonomica", per alunni con difficoltà visive e motorie, accessibile tramite monitor touch.\n`,
    name: "A-Team: un team per Alice",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FbO7Bhrduy26h4lkCWakH%2Fimages%2FcheaVNd66WtH4VGw2tdD%2FDiapositiva2@thumbnail.jpg?generation=1590532655356729&alt=media",
    what:
      "Il materiale didattico presentato all’alunno/a è composto da una serie di immagini scelte dai docenti,correlate da un audio contenente la lezione.\n" +
      "Per accedere ai contenuti didattici, sono presenti grandi pulsanti colorati,facilmente individuabili,con feedback vocale che permettono la navigazione tra le diverse materie. Una volta scelta la materia, viene presentata la lezione che il docente ha deciso di presentare. L'inserimento del materiale e il suo aggiornamento avvengono tramite un'interfaccia dedicata.",
    why:
      `"A-team" è un prodotto software che prevede un'interfaccia "ergonomica" realizzata per Alice, una ragazzina di 13 anni con difficoltà visive e motorie, che le rendono quindi molto difficile studiare sui libri e sulle dispense classiche fornite dagli insegnanti.\n` +
      '"A-team" fornisce ad Alice la possibilità di poter usufruire di questo materiale didattico in completa autonomia, rendendola più indipendente, malgrado le sue difficoltà. \n',
  },
  {
    body: "",
    description: "Il gira-chiavi portachiavi",
    name: "Tulip",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FcIolyOA9vAPMFHfVDB5R%2Fimages%2F2XD9YdwvbqrKS2gjRr6r%2FTulip_1@thumbnail.jpeg?generation=1557913906045496&alt=media",
    what: "Insieme alle tue chiavi, hai un 'fiore' e una 'foglia' che diventano una 'maniglia' per girare le chiavi.",
    why: "In collaborazione con ABAR, Thinkalize e PACO Design, ci hanno richiesto un gira-chiavi per persone con artrite reumatoide. I classici strumenti, o spezzano le chiavi, o sono discriminanti/ghettizzanti.",
  },
  {
    body: "",
    description:
      "Tavolino in tela e legno montato su girello, con porta borraccia e sacca per trasportare piccoli oggetti",
    name: "Tavolino di Fabio",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FhaGu584tNULWsOhkPfeg%2Fimages%2FaHgxZKamR4Sv0xFvgsoX%2FWhatsApp-Image-2018-06-14-at-10@thumbnail.jpg?generation=1571666119970645&alt=media",
    what: "Il tavolino, fissato al girello di Fabio attraverso dei velcri, è costituito da un ripiano rigido fornito di porta borraccia e da una sacca che permette a Fabio di trasportare piccoli oggetti, oltre che evitare un urto troppo violento in caso di caduta. Tutti gli spigoli sono stati arrotondati in modo da non essere pericolosi.",
    why:
      "Fabio ha 7 anni ed è affetto dalla malattia di Charcot-Marie-Tooth (CMT), che comporta scarso equilibrio nella deambulazione e un debole controllo della motricità fine soprattutto nei movimenti delle dita e del polso. \n" +
      "Per Fabio abbiamo quindi ideato e realizzato, con l’appoggio e la collaborazione della sua famiglia e della sua scuola, due oggetti che lo aiutino e lo rendano più autonomo: un tavolino da applicare al deambulatore e un supporto per il braccio.",
  },
  {
    body: "",
    description:
      "Seduta mobile con altezza regolabile autonomamente per lavori casalinghi che richiedono di stare, per un tempo prolungato, in posizione difficilmente raggiungibile.",
    name: "Abbassa Tore",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FjV2qzBEbhS4iQfXHuDQ4%2Fimages%2FSuIG6aEMKvkWJ4Ge9Dd5%2Ffoto-abbassatore@thumbnail.jpg?generation=1560874585117700&alt=media",
    what:
      "La seduta può alzarsi e abbassarsi mentre si è seduti sopra senza il bisogno di aiuto esterno o di sollevarsi da essa.\n" +
      "Inoltre è in grado di mantenere l'altezza ed è possibile, grazie a delle ruote dotate di freno, spostarlo in modo da usarlo dove si preferisce.",
    why:
      "Il progetto è stato  ideato, in particolare, per permettere ad una persona affetta da distrofia muscolare di raggiungere ed operare ad altezze altrimenti irraggiungibili (in quanto troppo in basso).\n" +
      "L'obbiettivo principale è stato quello di permettere una maggiore autonomia all'interno della sua abitazione.",
  },
  {
    body: "",
    description:
      "Il progetto consiste in una serie di aggiunte alla carrozzina di Anita per aiutarla a mantenere una posizione corretta nello svolgimento delle sue attività quotidiane",
    name: "Su il ripiano, su il morale!",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FjlouB62rnvLlDUAvYJ6w%2Fimages%2FA31ZD6w486ObS4fW0kRb%2FCattura9@thumbnail.jpg?generation=1563721445952877&alt=media",
    what:
      "Il progetto consiste in:\n" +
      "● Un tavolino portatile e regolabile che possa permettere ad Anita di assumere una\n" +
      "migliore postura mentre gioca con il suo iPad.\n" +
      "● Dei supporti per gomiti che le aiutino a correggere la postura.\n" +
      "● Un supporto per il joystick che le permetta di avere una migliore presa sul comando,\n" +
      "quindi una maggiore libertà di movimento con la sua sedia a rotelle.",
    why:
      "Per la realizzazione di questo progetto il team ha lavorato con Anita, una bambina di 9 anni affetta da tetraparesi spastica. Anita trascorre  molto tempo a guardare\n" +
      "cartoni sul tablet e tende a curvarsi eccessivamente sul tavolino fatto dal\n" +
      "nonno . Il nostro obiettivo è stato quello di costruire, per e con lei, un dispositivo economico ma allo stesso tempo anche facile da replicare. Il costo totale della realizzazione è inferiore a €150.",
  },
  {
    body: "",
    description:
      "Ortesi per la mano per evitare l'eccessiva contrazione e i conseguenti spasmi del braccio nella manipolazione di oggetti sottili come una forchetta o una penna.",
    name: "TakeItEasy",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FjoTMZyTb2vBVUVKoAsaO%2Fimages%2FKWJvOpYglFZoUBqVLBDZ%2FE0xW9D06@thumbnail.jpg?generation=1563542052638353&alt=media",
    what: "L'ortesi permette ad Antonella di avere una presa più stabile sugli oggetti di dimensioni ridotte come una forchetta o una penna, garantendo anche che tali oggetti restino attaccati alla mano in caso di rilassamento muscolare dell'arti.",
    why: "Questa ortesi è stata pensata per Antonella, ragazza di 13 anni affetta da tetraparesi mista, condizione che comprende sintomi di spasticità, contratture muscolari, disturbi della marcia e della coordinazione, movimenti coreici incontrollati. ",
  },
  {
    body: "",
    description:
      "MobiLIS è una porta d’acceso facilitata alle informazioni di servizio, composto da un portale accessibile tramite QR-code",
    name: "MobiLIS",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FmJ4iS8VTgfPY9DtyRGn3%2Fimages%2FixqXvLSRt1TJeJxpmTlg%2Fsupporto_palo@thumbnail.jpg?generation=1583060576752070&alt=media",
    what: "Il progetto è stato pensato per l’ambiente metropolitano, e la soluzione proposta è stata una web app accessibile tramite QR-code, questo può infatti rimandare ad un indirizzo web ed oltre ad essere facilmente implementabile e personalizzabile, può essere facilmente diffuso in ogni ambiente.",
    why: "MobiLIS è un progetto nato durante Hackability4Mobility nato dalla necessità di Elisabetta di avere dei trasporti pubblici più accessibili. Elisabetta è una ragazza sorda che ha evidenziato l’impossibilità di ricevere alcune comunicazioni fatte in stazione e di usare gli interfoni. In caso di blocco di un ascensore o di una carrozza, infatti, un sordo non sempre può parlare all’interfono e, oltre a non sentire cosa gli viene detto, non può avere una conferma della ricezione della sua chiamata.",
  },
  {
    body: "",
    description:
      "La forchetta è customizzata sulle esigenze di Ivan e disegnata sulla forma della sua mano per ottimizzare il grasping!",
    name: "La forchetta di Ivan",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FmkApMc4YX68etdOxPCPx%2Fimages%2FdToq8MFUFQiJUmCxQCH6%2Fduspaghi@thumbnail.jpg?generation=1599490916855795&alt=media",
    what: "Tramite un case 3D disegnato sulla forma della sua mano, Ivan riesce a prenderlo senza che la forchetta gli scappi di mano!",
    why: "Ivan ha un problema di handing e non riesce ad usare le normali posate!",
  },
  {
    body: "",
    description:
      "Triciclo multifunzionale, utilizzabile sia in modo attivo sia passivo dal bambino: spingendosi con i piedi, pedalando e come passeggino grazie alla possibilità del rimando del manubrio dietro al seggiolino.",
    name: "S'Trike",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2Fo3E11j7of5JrY01kXjne%2Fimages%2Fax3quQIlejZTEOdhHjjJ%2FCattura@thumbnail.jpg?generation=1563729683914321&alt=media",
    what: "Il Trike creato è stato ricavato dalla modifica di una bicicletta e permette a Simone di muoversi in totale sicurezza e autonomia. Si può controllare solo con la spinta delle gambe o anche pedalando; inoltre la bicicletta può diventare passeggino o si può attaccare alla bici del papà quando Simone si dovesse stancare.",
    why: "Si voleva modificare un mezzo affinché il Simone, bambino affetto dalla sindrome INVDUP15, potesse imparare ad andare in bicicletta. Con la crescita Simone non è più trasportabile su un carrellino posteriore o su altri supporti porta-bimbi: il veicolo doveva stimolare Simone ad imparare a controllare il mezzo in maniera autonoma, eventualmente proseguendo con l'apprendimento della pedalata in autonomia.",
  },
  {
    body: "",
    description:
      "Trepiede che evita la caduta della stampella nel caso di assenza di appoggi in prossimità della persona",
    name: "Supporto per stampelle",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FocwOg1m3xfZMnefBjBDU%2Fimages%2FFLwrRHCx7gfYlgrzYiLE%2F01@thumbnail.jpg?generation=1558635375202963&alt=media",
    what: "Consente di mantenere le stampelle in posizione stabile perpendicolarmente al suolo",
    why: "Ho sviluppato il progetto a causa di un trauma subito alla gamba.",
  },
  {
    body: "",
    description:
      "AUPaT(Aggiungi Un Posto a Tavola) è un tavolino da applicare sulle sedie a rotelle, progettato per essere il più universale possibile, interamente stampato in 3D. ",
    name: "AUPaT",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FpU39unr8mhA3Qn54a4WL%2Fimages%2FkeNxfreunyc3aTYxkoGH%2FWhatsApp-Image-2019-06-20-at-18@thumbnail.jpg?generation=1562245735728144&alt=media",
    what: "AUPaT è un tavolino regolabile su varie altezze, facile da trasportare, perché pieghevole e adattabile a qualsiasi sedia a rotelle, grazie alle sue componenti universali. Il materiale lo rende resistente, leggero e facile da lavare.",
    why: "Edoardo non riusciva a mangiare sullo stesso piano degli altri sui tavoli da ristorante, a causa dell’ingombro della sua carrozzina. ",
  },
  {
    body: "",
    description: "Riabiltazione muscoli per arco plantare",
    name: "Massaggiatore arco plantare",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FqX54WtdaYYsqKqftsRYE%2Fimages%2FOxcChi6PRkMB3F50NCDd%2F01@thumbnail.jpg?generation=1558633260624358&alt=media",
    what: "Permette il massaggio dell'arco plantare del piede.",
    why: "Trauma dovuto alla rottura del tallone",
  },
  {
    body: "",
    description: "Un economico ingranditore portatile per la lettura e la scrittura",
    name: "Zoomografo",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2Fs9EQNs7phu1CcANdOftw%2Fimages%2Fo716UwEZNWCy9kb68OVk%2F03@thumbnail.jpg?generation=1558614446671050&alt=media",
    what: "Ingrandisce testi e immagini per poter leggere e scrivere, grazie ad una telecamera e un dispositivo mobile.",
    why: "Giovanni e Alice sono ipovedenti gravi. Hanno problemi con la lettura e, a volte, anche a firmare documenti.",
  },
  {
    body: "",
    description: "La prima mappa 3D dell'Italia interattiva per bambini ciechi.",
    name: "Hackability Geo",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2Fth4YC0sUFFt21CQl8oqk%2Fimages%2F9yOzoSigrSHgKq83F9Ph%2FIMG_0145@thumbnail.jpg?generation=1558607917684617&alt=media",
    what:
      "Una mappa italiana tridimensionale presenta dei pulsanti per ogni regione.\n" +
      "Alla pressione dei pulsanti, vengono riprodotte delle tracce audio che descrivono vari aspetti della regione.\n" +
      "Il gioco è configurabile e può essere facilmente esteso ad altre mappe (europa, francia, ecc.)\n",
    why:
      "Massimo è un bambino cieco con problemi di udito appassionato di geografia.\n" +
      "I genitori ci hanno chiesto di creare un gioco che permetta a Massimo di toccare ed interagire con\n" +
      "una cartina italiana con il tatto e i suoni.\n",
  },
  {
    body: "",
    description:
      "Lo strumento che ti aiuta ad allacciare catenelle o bracciali con chiusura a moschettone",
    name: "Horus",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2Fwca658NRavQkwH67NyQu%2Fimages%2F3sJ2XkD0cee4ZQVOJCyl%2FIMG_0167@thumbnail.jpg?generation=1561541150582121&alt=media",
    what: "Horus è un piccolo strumento che permette di incastrare l'apertura a moschettone e ad aprirla molto facilmente.",
    why: "Anna é una ragazza portatrice della Sindrome di Poland; da piccola ha subito l'intervento di pollicizzazione dell'indice  ad entrambe le mani. Le risulta molto complesso, a volte impossibile, allacciare e togliere le collane o i braccialetti. ",
  },
  {
    body: "",
    description:
      "Tagliere multifunzionale che consente di tagliare qualunque alimento utilizzando una sola mano",
    name: "Spugna                                 - aiutante di Capitan Uncino",
    previewImage:
      "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2FyA6WUh80IWtIXQmtrA2J%2Fimages%2FbjBByePy53Fef5ck9IUR%2Ftagliere-vista-3@thumbnail.jpg?generation=1562236149787441&alt=media",
    what:
      "Il tagliere è composto di due parti:\n" +
      "- una parte mobile che ospita: un'isola di chiodini (rimovibile), un incastro che consente il fissaggio di 4 grattugie e una maniglia (che funge anche da cestino per gli scarti)\n" +
      "- una parte strutturale fissa che ne assicura la stabilità ed ospita i cassetti",
    why:
      "Il progetto è stato pensato per Maria, una donna che ha perso la funzionalità dell'arto superiore sinistro. \n" +
      "Questo tagliere le consente di sbucciare, tagliare e affettare con una mano sola tutti gli alimenti.",
  },
]
const seed = async () => {
  const hashedPassword = await SecurePassword.hash("admin".trim())
  await db.user.create({
    data: {
      email: "admin@admin.com",
      hashedPassword,
    },
  })
  await db.project.createMany({ data })
  console.log("done")
}

seed()
export default seed
