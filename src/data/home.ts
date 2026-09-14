// Homepage content — { en, it } fields resolved via pick(). DRAFT COPY:
// Francesco redlines wording, the third-pillar emphasis, and CTA text at build.

export const hero = {
  kicker: { en: "Hi, I'm Francesco 👋", it: "Ciao, sono Francesco 👋" },
  title: {
    en: 'Machine learning that <em class="accent-draw">survives</em> deployment.',
    it: 'Machine learning che <em class="accent-draw">sopravvive</em> al deployment.',
  },
  lead: {
    en: "I'm a PhD engineer and researcher. I build AI that has to work outside the lab — from medical-imaging foundation models to robots on the factory floor — and the infrastructure to run it in production.",
    it: "Sono un ingegnere e ricercatore con un dottorato. Costruisco AI che deve funzionare fuori dal laboratorio — dai foundation model per l'imaging medico ai robot in fabbrica — e l'infrastruttura per portarla in produzione.",
  },
  primary: { en: "Let's talk", it: "Parliamone" },
  secondary: { en: "Download CV", it: "Scarica il CV" },
  cvHref: "/Francesco-Vigni-CV.pdf",
  // Replace with a real portrait at public/francesco.jpg (square works best).
  photo: "/francesco.jpg",
};

// Narrative "My story" — warm, first-person, skimmable (annino.dev-inspired).
// Bold the milestones, keep it tight so recruiters don't hit a wall of prose.
export const story = {
  kicker: { en: "My story", it: "La mia storia" },
  title: {
    en: "From a robotics thesis at Disney to AI in the clinic.",
    it: "Da una tesi di robotica alla Disney all'AI in clinica.",
  },
  paragraphs: {
    en: [
      "I studied engineering in **Siena**, and did my Master's thesis at **Disney Research Zurich** — closed-loop control for a robot that shakes your hand, which ended up as a paper in **IEEE RA-L**. That set the tone for everything since: I like building things that have to work with real people, in the real world.",
      "I spent years in **Germany** making that happen — autonomous mobile robots deployed across factories, and core 3D-perception and grasping software at **Roboception** for industrial pick-and-place. Then I went back to research for a **Marie Skłodowska-Curie PhD in Naples**, with secondments at **TU Wien** and studying how robots make their intentions legible to people.",
      "Today I lead the technical development of a **self-supervised foundation model for medical imaging** with a European clinical institute — the work I most want to keep doing. Alongside it I run a small self-hosted **Kubernetes** platform for my own services, because I like owning the whole stack, from the model down to the metal.",
      "I'm Italian, based in **Forlì**, and I speak Italian, Spanish, and English (plus some German). I'm now looking for a stable role where I can do this kind of work — research, engineering, or infrastructure — with a good team.",
    ],
    it: [
      "Ho studiato ingegneria a **Siena** e ho fatto la tesi magistrale al **Disney Research di Zurigo** — controllo in retroazione per un robot che stringe la mano, poi diventato un articolo su **IEEE RA-L**. Da lì in poi il filo è sempre lo stesso: mi piace costruire cose che devono funzionare con persone vere, nel mondo reale.",
      "Ho passato anni in **Germania** a farlo — robot mobili autonomi installati in fabbrica e il software di percezione 3D e grasping di **Roboception** per il pick-and-place industriale. Poi sono tornato alla ricerca con un **dottorato Marie Skłodowska-Curie a Napoli**, con periodi alla **TU Wien**, studiando come i robot rendono leggibili le proprie intenzioni.",
      "Oggi guido lo sviluppo tecnico di un **foundation model self-supervised per l'imaging medico** con un istituto clinico europeo — il lavoro che più desidero continuare a fare. In parallelo gestisco una piccola piattaforma **Kubernetes** self-hosted per i miei servizi, perché mi piace padroneggiare tutto lo stack, dal modello fino al ferro.",
      "Sono italiano, vivo a **Forlì**, e parlo italiano, spagnolo e inglese (e un po' di tedesco). Cerco ora un ruolo stabile dove fare questo tipo di lavoro — ricerca, ingegneria o infrastruttura — con un buon team.",
    ],
  },
};

// Three capability pillars — each target audience finds itself here.
export const pillars = [
  {
    id: "research",
    flagship: true,
    label: { en: "AI / ML Research", it: "Ricerca AI / ML" },
    body: {
      en: "Foundation models for medical imaging (self-supervised ViT, distributed training), reproducible evaluation, and a defined path from research to clinical validation.",
      it: "Foundation model per l'imaging medico (ViT self-supervised, training distribuito), valutazione riproducibile e un percorso definito dalla ricerca alla validazione clinica.",
    },
  },
  {
    id: "robotics",
    flagship: false,
    label: { en: "Robotics & Edge", it: "Robotica & Edge" },
    body: {
      en: "ROS2 navigation and perception, real-time inference on NVIDIA Jetson, and industrial systems deployed commercially across multiple countries.",
      it: "Navigazione e percezione ROS2, inferenza in tempo reale su NVIDIA Jetson e sistemi industriali in produzione in diversi paesi.",
    },
  },
  {
    id: "infra",
    flagship: false,
    label: { en: "DevOps & Infrastructure", it: "DevOps & Infrastruttura" },
    body: {
      en: "Self-hosted single-node Kubernetes (k3s) with Helm, health-gated reversible delivery, CI/CD, and hands-on production incident debugging.",
      it: "Kubernetes single-node self-hosted (k3s) con Helm, delivery reversibile health-gated, CI/CD e debugging di incidenti in produzione.",
    },
  },
];

// Institutions — instant-credibility strip.
export const pedigree = [
  "Univ. Naples Federico II",
  "TU Wien",
  "TU Munich",
  "Disney Research",
  "Roboception",
  "Marie Skłodowska-Curie Fellow",
];

// Ways to work together — replaces the consulting engagement ladder.
export const waysToWork = {
  kicker: { en: "Ways to work together", it: "Modi di collaborare" },
  title: {
    en: "Open to the right role — and good collaborations.",
    it: "Aperto al ruolo giusto — e a buone collaborazioni.",
  },
  cards: [
    {
      primary: true,
      title: { en: "Full-time role", it: "Ruolo a tempo pieno" },
      body: {
        en: "Research, engineering, or infrastructure positions where ML has to reach production. Actively looking.",
        it: "Posizioni di ricerca, ingegneria o infrastruttura dove l'ML deve arrivare in produzione. In cerca attiva.",
      },
    },
    {
      primary: false,
      title: { en: "Research collaboration", it: "Collaborazione di ricerca" },
      body: {
        en: "Joint projects, co-authored papers, EU-funded research, and clinical-AI partnerships.",
        it: "Progetti congiunti, pubblicazioni, ricerca finanziata UE e partnership su AI clinica.",
      },
    },
    {
      primary: false,
      title: { en: "Select consulting", it: "Consulenza selezionata" },
      body: {
        en: "A limited number of scoped technical engagements where I can genuinely move the needle.",
        it: "Un numero limitato di incarichi tecnici circoscritti dove posso davvero fare la differenza.",
      },
    },
  ],
};

// Trust & compliance — matters for healthcare-data and EU roles.
export const trust = {
  kicker: { en: "Built to be trusted", it: "Fatto per essere affidabile" },
  badges: [
    { en: "GDPR", it: "GDPR" },
    { en: "EHDS-ready", it: "Pronto per l'EHDS" },
    { en: "NDA-friendly", it: "Disponibile a NDA" },
    { en: "Ordine degli Ingegneri #2988", it: "Ordine degli Ingegneri #2988" },
    { en: "EU / self-hosted stack", it: "Stack UE / self-hosted" },
  ],
};

export const close = {
  title: { en: "Let's see if I can help.", it: "Vediamo se posso essere utile." },
  body: {
    en: "Tell me about the role or the project. I reply personally.",
    it: "Raccontami del ruolo o del progetto. Rispondo personalmente.",
  },
};
