// Homepage content — { en, it } fields resolved via pick(). DRAFT COPY:
// Francesco redlines wording, the third-pillar emphasis, and CTA text at build.

export const hero = {
  kicker: { en: "Francesco Vigni, PhD", it: "Francesco Vigni, PhD" },
  title: {
    en: 'Machine learning that <em class="accent-draw">survives</em> deployment.',
    it: 'Machine learning che <em class="accent-draw">sopravvive</em> al deployment.',
  },
  lead: {
    en: "Engineer and researcher building AI that has to work outside the lab — from medical-imaging foundation models to robots on the factory floor — and the infrastructure to run it in production.",
    it: "Ingegnere e ricercatore: costruisco AI che deve funzionare fuori dal laboratorio — dai foundation model per l'imaging medico ai robot in fabbrica — e l'infrastruttura per portarla in produzione.",
  },
  primary: { en: "Let's talk", it: "Parliamone" },
  secondary: { en: "Download CV", it: "Scarica il CV" },
  cvHref: "/Francesco-Vigni-CV.pdf",
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
