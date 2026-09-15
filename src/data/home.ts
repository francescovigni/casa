// Homepage content: { en, it } fields resolved via pick().

export const hero = {
  kicker: { en: "Hi, I'm Francesco 👋", it: "Ciao, sono Francesco 👋" },
  // Self-description, not a job title: the schema.org jobTitle in data/person.ts
  // stays on literal role words that search engines can match.
  tagline: { en: "High-Tech Artisan", it: "Artigiano hi-tech" },
  // Literal role words next to the memorable label: "High-Tech Artisan" is the
  // personality, this is what a hiring manager or a client searches for.
  role: { en: "Applied ML Engineer · AI Consultant", it: "Ingegnere ML · Consulente AI" },
  title: {
    en: 'I find out when the model is <em class="accent-draw">wrong</em>.',
    it: 'Scopro quando il modello <em class="accent-draw">sbaglia</em>.',
  },
  lead: {
    en: "PhD engineer and applied AI researcher. I take difficult models from research to systems that run: medical-imaging foundation models, robots on factory floors, and the infrastructure that keeps both in production. Whether it starts as a research question or a production problem, the work is the same.",
    it: "Ingegnere e ricercatore applicato in AI, con dottorato. Porto modelli difficili dalla ricerca a sistemi che funzionano: foundation model per l'imaging medico, robot in fabbrica e l'infrastruttura che li tiene in produzione. Che si parta da una domanda di ricerca o da un problema di produzione, il lavoro è lo stesso.",
  },
  primary: { en: "Let's talk", it: "Parliamone" },
  secondary: { en: "Download CV", it: "Scarica il CV" },
  cvHref: "/Francesco-Vigni-CV.pdf",
};

// Narrative "My story": warm, first-person, skimmable.
// Bold the milestones, keep it tight so recruiters don't hit a wall of prose.
export const story = {
  kicker: { en: "My story", it: "La mia storia" },
  title: {
    en: "From a robotics thesis at Disney to AI in the clinic.",
    it: "Da una tesi di robotica alla Disney all'AI in clinica.",
  },
  paragraphs: {
    en: [
      "I studied engineering in **Siena**, and did my Master's thesis at **Disney Research Zurich**, on closed-loop control for a robot that shakes your hand, which ended up as a paper in **IEEE RA-L**. That set the tone for everything since: I like building things that have to work with real people, in the real world.",
      "I spent years in **Germany** making that happen: autonomous mobile robots deployed across factories, and core 3D-perception and grasping software at **Roboception** for industrial pick-and-place. Then I went back to research for a **Marie Skłodowska-Curie PhD in Naples**, with secondments at **TU Wien** and studying how robots make their intentions legible to people.",
      "Today I lead the technical development of a **self-supervised foundation model for medical imaging** with a European clinical institute. It is the work I most want to keep doing. Alongside it I run a small self-hosted **Kubernetes** platform for my own services, because I like owning the whole stack, from the model down to the metal.",
      "I'm Italian, based in **Forlì**, and I speak Italian, Spanish, and English (plus some German).",
    ],
    it: [
      "Ho studiato ingegneria a **Siena** e ho fatto la tesi magistrale al **Disney Research di Zurigo**, sul controllo in retroazione per un robot che stringe la mano, poi diventato un articolo su **IEEE RA-L**. Da lì in poi il filo è sempre lo stesso: mi piace costruire cose che devono funzionare con persone vere, nel mondo reale.",
      "Ho passato anni in **Germania** a farlo: robot mobili autonomi installati in fabbrica e il software di percezione 3D e grasping di **Roboception** per il pick-and-place industriale. Poi sono tornato alla ricerca con un **dottorato Marie Skłodowska-Curie a Napoli**, con periodi alla **TU Wien**, studiando come i robot rendono leggibili le proprie intenzioni.",
      "Oggi guido lo sviluppo tecnico di un **foundation model self-supervised per l'imaging medico** con un istituto clinico europeo. È il lavoro che più desidero continuare a fare. In parallelo gestisco una piccola piattaforma **Kubernetes** self-hosted per i miei servizi, perché mi piace padroneggiare tutto lo stack, dal modello fino al ferro.",
      "Sono italiano, vivo a **Forlì**, e parlo italiano, spagnolo e inglese (e un po' di tedesco).",
    ],
  },
};

// Three capability pillars: each target audience finds itself here.
export const pillars = [
  {
    id: "research",
    label: { en: "Applied AI / ML", it: "AI / ML applicata" },
    body: {
      en: "Foundation models, computer vision, self-supervised learning, and the model evaluation that says whether a result is real. Medical imaging is where most of it runs.",
      it: "Foundation model, computer vision, self-supervised learning e la valutazione che dice se un risultato è reale. L'imaging medico è dove tutto questo gira.",
    },
  },
  {
    id: "robotics",
    label: { en: "Robotics & Edge AI", it: "Robotica & Edge AI" },
    body: {
      en: "ROS2 navigation and perception, real-time inference on NVIDIA Jetson, embedded deployment, and industrial systems sold in several countries.",
      it: "Navigazione e percezione ROS2, inferenza in tempo reale su NVIDIA Jetson, deployment embedded e sistemi industriali venduti in diversi paesi.",
    },
  },
  {
    id: "infra",
    label: { en: "ML Infrastructure", it: "Infrastruttura ML" },
    body: {
      en: "Training infrastructure and MLOps: distributed runs, experiment tracking, reproducibility, and Kubernetes delivery that rolls back on its own.",
      it: "Infrastruttura di training e MLOps: run distribuiti, tracking degli esperimenti, riproducibilità e delivery su Kubernetes che fa rollback da sola.",
    },
  },
];

// Institutions: instant-credibility strip.
export const pedigree = [
  "Univ. Naples Federico II",
  "Univ. Siena",
  "TU Wien",
  "TU Munich",
  "Disney Research",
  "Roboception",
  "Marie Skłodowska-Curie Fellow",
];

// Trust & compliance: matters for healthcare-data and EU roles.
export const trust = {
  kicker: { en: "Built to be trusted", it: "Fatto per essere affidabile" },
  badges: [
    { en: "EU-based", it: "Con base in UE" },
    { en: "GDPR-aware", it: "Attento al GDPR" },
    { en: "NDA-friendly", it: "Disponibile a NDA" },
    { en: "Self-hosted capable", it: "Self-hosted possibile" },
    {
      en: "Registered Engineer (Ordine degli Ingegneri #2988)",
      it: "Ingegnere iscritto (Ordine degli Ingegneri #2988)",
    },
  ],
};

