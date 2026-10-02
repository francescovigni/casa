// Italian service pages: one per buyer problem, named in the words a company
// types into Google, not after the technology underneath. Italian only: the
// buyer is an Italian SME, the English tree stays the research and hiring side.
// Proof comes from projects.ts by slug, so every number here is one the work
// page already verifies.

export interface Service {
  slug: string;
  /** Card title and page <h1>. */
  title: string;
  /** <title> tag: the query the page answers. */
  seoTitle: string;
  description: string;
  /** One line for the card on the homepage and the hub. */
  blurb: string;
  lead: string;
  /** "Fa per te se": situations the reader recognises. */
  forWho: string[];
  steps: { name: string; body: string }[];
  proofIntro: string;
  /** Project slugs from projects.ts. */
  proof: string[];
  /** One onward link under the proof, where a study says it better. */
  more?: { href: string; label: string };
  faq: FaqItem[];
}

/** A question, its short answer, and optionally the guide that answers it in full. */
export interface FaqItem {
  q: string;
  a: string;
  more?: { href: string; label: string };
}

export const services: Service[] = [
  {
    slug: "controllo-qualita-visione-artificiale",
    title: "Controllo qualità con la visione artificiale",
    seoTitle: "Controllo qualità con visione artificiale per PMI | Francesco Vigni",
    description:
      "Ispezione visiva automatica di pezzi, confezioni e linee di produzione con telecamere e AI: sopralluogo, prototipo sui tuoi campioni e messa in linea, anche su hardware edge. In Emilia-Romagna e in tutta Italia.",
    blurb:
      "Telecamere e AI che riconoscono difetti, contano pezzi e verificano confezioni direttamente in linea.",
    lead: "Chi controlla a occhio ogni pezzo si stanca, e i difetti rari passano. Un sistema di visione artificiale guarda ogni pezzo allo stesso modo, a qualsiasi ora, e segnala solo quello che merita un secondo sguardo. Ho portato la visione artificiale in fabbrica per anni, su prodotti industriali venduti in diversi paesi: so dove questi sistemi funzionano e dove si inceppano, tra luce che cambia, riflessi e pezzi sovrapposti.",
    forWho: [
      "Il controllo qualità è manuale e rallenta la linea.",
      "I difetti arrivano al cliente e li scopri dai resi.",
      "Hai provato una soluzione pronta, ma con la tua luce e i tuoi pezzi sbaglia troppo.",
      "Vuoi contare, misurare o leggere codici ed etichette senza fermare la produzione.",
    ],
    steps: [
      {
        name: "Sopralluogo e campioni",
        body: "Guardo la linea, le condizioni di luce e i difetti che contano davvero. Raccogliamo immagini di pezzi buoni e difettosi.",
      },
      {
        name: "Prototipo sui tuoi pezzi",
        body: "Addestro il modello sulle tue immagini e misuro quanti difetti trova e quanti falsi allarmi dà. Hai i numeri prima di comprare hardware.",
      },
      {
        name: "In linea",
        body: "Installazione su PC industriale o su un dispositivo edge come NVIDIA Jetson, collegamento ai tuoi sistemi e supporto dopo l'avvio.",
      },
    ],
    proofIntro:
      "Percezione 3D e presa robotica per prodotti industriali, e visione in tempo reale su hardware edge:",
    proof: ["bin-picking-reliability", "edge-ai-occupancy"],
    faq: [
      {
        q: "Servono telecamere costose?",
        a: "Non sempre. Spesso bastano telecamere industriali di fascia media. La scelta si fa dopo il prototipo, quando sappiamo cosa serve davvero vedere.",
      },
      {
        q: "Quante immagini servono?",
        a: "Per un primo prototipo spesso bastano alcune centinaia di immagini, con esempi dei difetti principali. Se i difetti sono rari, ci sono tecniche che partono dai soli pezzi buoni.",
      },
      {
        q: "Funziona senza internet?",
        a: "Sì. Il modello può girare in locale, sulla linea, senza mandare immagini fuori dall'azienda.",
      },
    ],
  },
  {
    slug: "automazione-documenti-ai",
    title: "Automazione di documenti ed email con l'AI",
    seoTitle: "Automazione documenti con l'AI: fatture, DDT, ordini | Francesco Vigni",
    description:
      "Estrazione automatica dei dati da fatture, DDT, ordini ed email verso il gestionale, con l'intelligenza artificiale e un controllo umano dove serve. Per PMI in Emilia-Romagna e in tutta Italia.",
    blurb:
      "Dati estratti da fatture, DDT, ordini ed email e caricati nel gestionale, senza ricopiarli a mano.",
    lead: "In molte aziende qualcuno passa ore a ricopiare dati da PDF ed email nel gestionale: ordini dei clienti, documenti di trasporto, schede tecniche. I modelli linguistici oggi leggono questi documenti bene, ma non perfettamente. Il lavoro vero è costruire il flusso in modo che l'AI faccia il grosso e una persona controlli solo i casi dubbi, così un errore non finisce in fattura.",
    forWho: [
      "Ricevi ordini via email o PDF, ognuno in un formato diverso.",
      "Qualcuno in ufficio ricopia dati a mano nel gestionale ogni giorno.",
      "Le informazioni sono sparse tra email, cartelle condivise e allegati.",
      "Hai provato ChatGPT, ma non sai come collegarlo ai tuoi sistemi in modo sicuro.",
    ],
    steps: [
      {
        name: "Mappa del processo",
        body: "Seguo il documento da quando arriva a quando entra nel gestionale, e misuriamo quanto tempo costa oggi.",
      },
      {
        name: "Prototipo su documenti veri",
        body: "Provo l'estrazione su un campione dei tuoi documenti e misuro quanti campi escono giusti. Senza numeri non si va avanti.",
      },
      {
        name: "Flusso in produzione",
        body: "Collegamento a email, cartelle e gestionale, con una coda di revisione per i casi incerti e un registro di cosa ha fatto l'AI.",
      },
    ],
    proofIntro:
      "Gestisco in produzione i miei servizi di automazione e CRM, con aggiornamenti reversibili e backup. La stessa cura va nei tuoi flussi:",
    proof: ["self-hosted-infra"],
    faq: [
      {
        q: "I documenti finiscono su server esterni?",
        a: "Lo decidiamo insieme. Si possono usare modelli in cloud con contratti adeguati al GDPR, oppure modelli che girano su un server tuo, senza che i documenti escano dall'azienda.",
      },
      {
        q: "E se l'AI sbaglia un dato?",
        a: "Succede, ed è previsto. Il flusso segnala i campi incerti e li manda a una persona prima che entrino nel gestionale.",
      },
      {
        q: "Funziona con il mio gestionale?",
        a: "Se il gestionale ha un'interfaccia (API), un'importazione da file o un database accessibile, di solito sì. Lo verifichiamo nella prima analisi.",
      },
    ],
  },
  {
    slug: "assistente-ai-aziendale",
    title: "Un assistente AI sui documenti della tua azienda",
    seoTitle: "Assistente AI aziendale on-premise sui tuoi documenti | Francesco Vigni",
    description:
      "Un assistente AI che risponde su manuali, procedure, schede tecniche e contratti dell'azienda, citando la fonte. Installato sui tuoi server o su un cloud europeo: i documenti riservati restano in casa. In Emilia-Romagna e in tutta Italia.",
    blurb:
      "Risponde su manuali, procedure e schede tecniche citando la fonte, installato sui tuoi server.",
    lead: "Le risposte che servono ogni giorno sono già in azienda: nei manuali, nelle procedure, nelle schede tecniche, nelle email di chi c'era prima. Un assistente AI può trovarle e citarle in pochi secondi. A tre condizioni: che indichi da quale documento viene ogni risposta, che dica quando non lo sa, e che i documenti riservati non finiscano sui server di qualcun altro.",
    forWho: [
      "Tecnici e commerciali perdono tempo a cercare informazioni nei documenti.",
      "Chi entra in azienda impiega mesi a sapere dove sono le cose.",
      "Vuoi usare l'AI, ma i documenti sono riservati e non possono andare su servizi esterni.",
      "L'assistenza clienti risponde sempre alle stesse domande tecniche.",
    ],
    steps: [
      {
        name: "Scelta dei documenti",
        body: "Decidiamo quali fonti usare e chi può vedere cosa. Un assistente vale quanto i documenti che legge.",
      },
      {
        name: "Prototipo con domande vere",
        body: "Raccolgo domande reali dei tuoi colleghi e misuro quante risposte sono corrette e citate, prima di aprirlo a tutti.",
      },
      {
        name: "Installazione e manutenzione",
        body: "Sui tuoi server o su un cloud europeo, con accessi controllati, aggiornamento automatico dei documenti e un modo semplice per segnalare le risposte sbagliate.",
      },
    ],
    proofIntro:
      "Gestisco da solo una piattaforma Kubernetes con oltre una dozzina di servizi, e ho costruito pipeline per dati clinici sotto GDPR e NDA:",
    proof: ["self-hosted-infra", "medical-ai-consulting"],
    faq: [
      {
        q: "È come ChatGPT?",
        a: "Usa lo stesso tipo di tecnologia, ma risponde solo a partire dai tuoi documenti e indica da quale documento viene ogni risposta.",
      },
      {
        q: "Serve un server potente?",
        a: "Dipende da quante persone lo usano e da quale modello scegliamo. Per molte PMI basta un server con una GPU; in alternativa, un cloud europeo.",
      },
      {
        q: "Chi lo tiene aggiornato?",
        a: "Il caricamento dei documenti nuovi si automatizza. Per il resto posso seguirlo io con un supporto continuativo, oppure formare una persona interna.",
      },
    ],
  },
  {
    slug: "valutazione-progetto-ai",
    title: "Prima di investire: capire se l'AI serve davvero",
    seoTitle: "Valutazione e audit di progetti AI per PMI | Francesco Vigni",
    description:
      "Un'analisi indipendente per capire se un progetto di intelligenza artificiale ha senso, quanto costa e dove può sbagliare. Anche per verificare un sistema AI già acquistato che non funziona come promesso. In Emilia-Romagna e in tutta Italia.",
    blurb:
      "Un parere tecnico indipendente, prima di firmare un preventivo o dopo un sistema che non mantiene le promesse.",
    lead: "Nella ricerca il mio lavoro è scoprire quando un modello sbaglia, e perché. È la stessa domanda da farsi prima di investire in un progetto di AI: funzionerà sui tuoi dati, o solo nella demo? Faccio un'analisi breve e indipendente: cosa conviene automatizzare, cosa no, quanto costa farlo bene e quali rischi ci sono.",
    forWho: [
      "Hai un preventivo per un progetto AI e vuoi un secondo parere tecnico.",
      "Un sistema AI già acquistato funziona in demo ma sbaglia nel lavoro vero.",
      "Sai che l'AI potrebbe aiutarti, ma non da quale processo partire.",
      "Devi scegliere tra più fornitori e non hai un tecnico interno che li valuti.",
    ],
    steps: [
      {
        name: "Colloquio e dati",
        body: "Capisco il processo, gli obiettivi e che dati hai. Se c'è già un sistema, lo guardo lavorare.",
      },
      {
        name: "Analisi",
        body: "Verifico fattibilità, costi e punti deboli. Se c'è un modello da valutare, lo misuro sui tuoi casi, compresi quelli difficili.",
      },
      {
        name: "Relazione e raccomandazione",
        body: "Un documento chiaro: cosa fare, cosa evitare, in che ordine e con che budget. Se il progetto non conviene, te lo dico.",
      },
    ],
    proofIntro:
      "Nella ricerca ho mostrato che da un fotogramma di colonscopia si capisce da quale ospedale proviene senza guardare l'anatomia, e che quella parte non anatomica basta a prevedere la diagnosi: una scorciatoia che un modello può imparare al posto della medicina. Gli stessi controlli servono su qualunque sistema AI.",
    proof: ["medical-ai-consulting"],
    more: { href: "/research/endoscopy-standardization/", label: "Lo studio completo, in inglese" },
    faq: [
      {
        q: "Sei indipendente dai fornitori?",
        a: "Sì. Nell'analisi il mio compito è dirti cosa conviene a te. Se la soluzione migliore è un prodotto pronto, te lo dico.",
      },
      {
        q: "E l'AI Act?",
        a: "Nell'analisi segnalo se il sistema rientra tra quelli con obblighi specifici dell'AI Act europeo, così lo sai prima di investire. Non è una certificazione di conformità.",
        more: { href: "/it/guide/ai-act-pmi/", label: "La guida all'AI Act per le PMI" },
      },
      {
        q: "Posso chiederti di valutare un sistema di un altro fornitore?",
        a: "Sì, è uno dei casi più utili. Serve poter provare il sistema su casi reali, o avere accesso ai suoi risultati.",
      },
    ],
  },
];

/** General questions for the Italian homepage. */
export const homeFaq: FaqItem[] = [
  {
    q: "Quanto costa un progetto di AI?",
    a: "Dipende dal processo e dai dati. Per questo si parte da un'analisi breve: ti dice cosa conviene automatizzare e quanto costa farlo, prima di impegnarti sul progetto intero.",
    more: { href: "/it/guide/quanto-costa-progetto-ai-pmi/", label: "La guida ai costi" },
  },
  {
    q: "I dati della mia azienda escono dall'azienda?",
    a: "Solo se lo decidi tu. Molti sistemi possono girare sui tuoi server o su un cloud europeo. Lavoro con attenzione al GDPR e firmo accordi di riservatezza.",
  },
  {
    q: "Posso usare contributi pubblici?",
    a: "In molti casi sì. Le Camere di Commercio, in Emilia-Romagna e nel resto d'Italia, finanziano con i voucher del Punto Impresa Digitale tecnologie AI e consulenza specialistica per micro, piccole e medie imprese. Requisiti e scadenze cambiano da bando a bando e da provincia a provincia: li verifichiamo insieme all'inizio.",
    more: { href: "/it/guide/bandi-contributi-intelligenza-artificiale-pmi/", label: "La guida a bandi e contributi" },
  },
  {
    q: "Lavori solo in Emilia-Romagna?",
    a: "No. Sono a Forlì e in Emilia-Romagna vengo volentieri di persona. Nel resto d'Italia lavoro da remoto, con sopralluoghi quando servono.",
  },
  {
    q: "Chi c'è dietro?",
    a: "Io: ingegnere iscritto all'Ordine, dottorato Marie Skłodowska-Curie, dieci anni tra ricerca e industria in Italia, Germania e Austria. La storia completa è nella pagina Lavoro.",
  },
];
