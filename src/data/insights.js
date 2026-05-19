// Insights articles. Structured bodies (no markdown pipeline) — each body is
// an ordered list of blocks: { type: "p" | "h2", text } or { type: "ul", items }.
//
// NOTE: these two articles are substantive DRAFTS for Francesco to review and
// finalize before the branch is deployed.

const insights = [
  {
    slug: "ehds-readiness",
    date: "2026-05-19",
    title: {
      en: "EHDS readiness for hospital AI projects — a practical checklist",
      it: "Preparazione all'EHDS per i progetti di AI ospedaliera — una checklist pratica",
    },
    summary: {
      en: "The European Health Data Space is a present design constraint, not a future compliance problem. Getting the data foundation right early is far cheaper than retrofitting it.",
      it: "Lo European Health Data Space è un vincolo di progettazione presente, non un problema di compliance futuro. Impostare bene le fondamenta dei dati subito costa molto meno che rifarle dopo.",
    },
    body: {
      en: [
        { type: "p", text: "The European Health Data Space (EHDS) regulation reshapes how health data can be used for research and AI across the EU. For a hospital starting an AI project, EHDS is not a future compliance problem — it is a present design constraint. Getting the data foundation right early is far cheaper than retrofitting it." },
        { type: "h2", text: "What EHDS changes" },
        { type: "p", text: "EHDS creates a framework for the secondary use of health data — using clinical data for research, innovation, and AI — through governed access rather than ad-hoc sharing. In practice, data access runs through defined permits and secure processing environments, with provenance and purpose tracked throughout the lifecycle of a project." },
        { type: "h2", text: "The readiness checklist" },
        { type: "ul", items: [
          "A clear, documented purpose for every dataset — secondary use must be specific and lawful.",
          "Data minimisation: collect and retain only what the model genuinely needs.",
          "Provenance tracking: know where every image or record came from, and under what consent or legal basis.",
          "Anonymisation or pseudonymisation appropriate to the use, with re-identification risk explicitly assessed.",
          "A secure processing environment — training and experimentation happen where the data is governed, not on ad-hoc laptops or unmanaged cloud buckets.",
          "Access control and audit logs: who touched the data, when, and why.",
          "A data governance owner on the hospital side — EHDS readiness is an organisational role, not just a technical setting.",
        ] },
        { type: "h2", text: "Why this pays off" },
        { type: "p", text: "Teams that build these controls in from day one move faster later: validation, audits, and partnerships with medtech companies become routine rather than emergency projects. Teams that skip them usually discover the gap at the worst moment — when a model works and is ready to deploy, but its data lineage cannot withstand scrutiny." },
        { type: "h2", text: "Where to start" },
        { type: "p", text: "If you are at the beginning, start with two artefacts: a data inventory (what you have, where it came from, under what basis) and a one-page data-flow diagram for the AI project. Those two documents surface most readiness gaps within a week — and they cost nothing but an afternoon." },
      ],
      it: [
        { type: "p", text: "Il regolamento sullo European Health Data Space (EHDS) ridefinisce come i dati sanitari possono essere usati per ricerca e AI in tutta l'UE. Per un ospedale che avvia un progetto di AI, l'EHDS non è un problema di compliance futuro: è un vincolo di progettazione presente. Impostare bene le fondamenta dei dati subito costa molto meno che rifarle dopo." },
        { type: "h2", text: "Cosa cambia con l'EHDS" },
        { type: "p", text: "L'EHDS crea un quadro per l'uso secondario dei dati sanitari — l'uso dei dati clinici per ricerca, innovazione e AI — tramite un accesso governato anziché condivisioni estemporanee. In pratica, l'accesso ai dati passa per permessi definiti e ambienti di elaborazione sicuri, con provenienza e finalità tracciate lungo tutto il ciclo di vita del progetto." },
        { type: "h2", text: "La checklist di preparazione" },
        { type: "ul", items: [
          "Una finalità chiara e documentata per ogni dataset — l'uso secondario deve essere specifico e lecito.",
          "Minimizzazione dei dati: raccogliere e conservare solo lo stretto necessario al funzionamento del modello.",
          "Tracciamento della provenienza: sapere da dove proviene ogni immagine o record, e su quale base di consenso o legale.",
          "Anonimizzazione o pseudonimizzazione adeguata all'uso, con il rischio di re-identificazione valutato esplicitamente.",
          "Un ambiente di elaborazione sicuro — training ed esperimenti avvengono dove i dati sono governati, non su laptop personali o bucket cloud non gestiti.",
          "Controllo degli accessi e log di audit: chi ha toccato i dati, quando e perché.",
          "Un responsabile della data governance dal lato ospedale — la preparazione all'EHDS è un ruolo organizzativo, non solo un'impostazione tecnica.",
        ] },
        { type: "h2", text: "Perché conviene" },
        { type: "p", text: "I team che costruiscono questi controlli fin dal primo giorno vanno più veloci in seguito: validazione, audit e partnership con aziende medtech diventano attività ordinarie anziché progetti d'emergenza. Chi li salta scopre di solito la lacuna nel momento peggiore — quando un modello funziona ed è pronto al deployment, ma la sua tracciabilità dei dati non regge a un controllo." },
        { type: "h2", text: "Da dove iniziare" },
        { type: "p", text: "Se sei all'inizio, parti da due documenti: un inventario dei dati (cosa hai, da dove proviene, su quale base) e un diagramma di una pagina del flusso dati del progetto di AI. Questi due documenti fanno emergere la maggior parte delle lacune entro una settimana — e non costano nulla se non un pomeriggio." },
      ],
    },
  },
  {
    slug: "clinical-ai-validation",
    date: "2026-05-19",
    title: {
      en: "Why clinical-AI pilots fail validation, and how to design for it",
      it: "Perché i progetti pilota di AI clinica falliscono la validazione, e come progettarli per superarla",
    },
    summary: {
      en: "Most clinical-AI pilots that stall at validation were never wrong about the model — they were designed in a way validation could not survive. The failures are predictable.",
      it: "La maggior parte dei progetti pilota di AI clinica che si arenano alla validazione non aveva torto sul modello: erano progettati in modo che la validazione non potesse reggere. Questi fallimenti sono prevedibili.",
    },
    body: {
      en: [
        { type: "p", text: "Many clinical-AI pilots show strong results in development and then stall — or fail outright — at validation. Often the model was never wrong; the pilot was designed in a way that validation could not survive. Most of these failures are predictable, and designing for them from the start costs very little." },
        { type: "h2", text: "Failure 1: the validation set was never independent" },
        { type: "p", text: "If the data used to validate a model shares patients, devices, or sites with the training data, the validation overstates performance. Real validation needs data the model has never seen — ideally from a different site or time period. Define the validation split before training, not after." },
        { type: "h2", text: "Failure 2: the metric did not match the clinical question" },
        { type: "p", text: "A model optimised for overall accuracy can still be useless — or unsafe — for the decision a clinician actually makes. Validation should measure what matters clinically: sensitivity at a usable specificity, performance on the hard cases, and behaviour on the populations the hospital actually serves." },
        { type: "h2", text: "Failure 3: distribution shift was ignored" },
        { type: "p", text: "Endoscopy video from a different scope, scanner, or operator looks different to a model. A pilot validated on one site's data often degrades on another's. Design the pilot to test this explicitly, rather than discovering it after deployment." },
        { type: "h2", text: "Failure 4: no plan for the human in the loop" },
        { type: "p", text: "A clinical model is part of a workflow, not a replacement for it. If the pilot never defined how a clinician sees, overrides, or is alerted by the model, validation cannot assess the system that will actually be used." },
        { type: "h2", text: "Designing for validation" },
        { type: "ul", items: [
          "Define the validation data and the split before any training begins.",
          "Choose metrics from the clinical decision backwards, not from the model forwards.",
          "Include at least one external or temporally separate test set.",
          "Specify the human-in-the-loop workflow as part of the pilot, not after it.",
          "Write the validation plan down and agree it with clinical stakeholders early.",
        ] },
        { type: "p", text: "A pilot designed this way is slower to start and far more likely to finish. Validation stops being a gate the project might fail, and becomes a milestone the project was built to pass." },
      ],
      it: [
        { type: "p", text: "Molti progetti pilota di AI clinica mostrano risultati solidi in sviluppo e poi si arenano — o falliscono del tutto — alla validazione. Spesso il modello non aveva torto: il pilota era progettato in un modo che la validazione non poteva reggere. La maggior parte di questi fallimenti è prevedibile, e progettarli per evitarli costa pochissimo." },
        { type: "h2", text: "Errore 1: il set di validazione non era indipendente" },
        { type: "p", text: "Se i dati usati per validare un modello condividono pazienti, dispositivi o centri con i dati di training, la validazione sovrastima le prestazioni. Una validazione reale richiede dati che il modello non ha mai visto — idealmente da un centro o da un periodo diverso. La suddivisione di validazione si decide prima del training, non dopo." },
        { type: "h2", text: "Errore 2: la metrica non corrispondeva alla domanda clinica" },
        { type: "p", text: "Un modello ottimizzato per l'accuratezza complessiva può comunque essere inutile — o non sicuro — per la decisione che un clinico prende davvero. La validazione deve misurare ciò che conta clinicamente: sensibilità a una specificità utilizzabile, prestazioni sui casi difficili e comportamento sulle popolazioni che l'ospedale serve realmente." },
        { type: "h2", text: "Errore 3: il distribution shift è stato ignorato" },
        { type: "p", text: "Un video endoscopico da uno strumento, uno scanner o un operatore diverso appare diverso a un modello. Un pilota validato sui dati di un centro spesso peggiora su quelli di un altro. Progetta il pilota per testarlo esplicitamente, anziché scoprirlo dopo il deployment." },
        { type: "h2", text: "Errore 4: nessun piano per l'interazione umana ('human-in-the-loop')" },
        { type: "p", text: "Un modello clinico è parte di un flusso di lavoro, non un suo sostituto. Se il pilota non ha mai definito come un clinico vede, corregge o viene allertato dal modello, la validazione non può valutare il sistema che verrà effettivamente usato." },
        { type: "h2", text: "Progettare per la validazione" },
        { type: "ul", items: [
          "Definisci i dati di validazione e la suddivisione prima di iniziare qualsiasi training.",
          "Scegli le metriche partendo dalla decisione clinica, non dal modello.",
          "Includi almeno un test set esterno o separato nel tempo.",
          "Specifica il flusso con l'essere umano nel processo come parte del pilota, non dopo.",
          "Metti per iscritto il piano di validazione e concordalo con gli stakeholder clinici fin da subito.",
        ] },
        { type: "p", text: "Un pilota progettato così è più lento a partire e molto più probabile che arrivi in fondo. La validazione smette di essere un cancello che il progetto potrebbe non superare e diventa un traguardo per cui il progetto è stato costruito." },
      ],
    },
  },
];

export const getArticle = (slug) => insights.find((a) => a.slug === slug);

export default insights;
