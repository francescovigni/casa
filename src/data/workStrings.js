// Section labels and prose for the Work page, per locale. Structural content
// lives in projects.js / experience.js / education.js / talks.js / milestones.js.
const workStrings = {
  en: {
    title: "Work",
    intro:
      "Selected projects, professional experience, and research background across medical AI and robotics.",
    careerArc:
      "My career has followed one thread: making AI and autonomous systems work outside the lab. I started in industrial and human-facing robotics, the hardest place to deploy a system, where it has to work safely around people and machines in conditions you do not control. The same discipline now goes into clinical AI, where a model has to pass validation and governance and hold up in a real hospital. Robotics taught me deployment. Medicine is where I apply it.",
    headingProjects: "Projects",
    lblContext: "Context",
    lblConstraints: "Constraints",
    lblApproach: "What I did",
    lblOutcome: "Outcome",
    headingExperience: "Experience",
    headingEducation: "Education",
    cvText: "Download full CV (PDF)",
    researchHeading: "Research background",
    researchText:
      "Peer-reviewed research in human-robot interaction and social robotics. This work on human-facing systems underpins how I approach clinical AI.",
    researchLink: "Full publication list on Google Scholar →",
    headingTalks: "Talks",
    headingMilestones: "Milestones",
    showAll: (n) => `Show all ${n} milestones ↓`,
    showLess: "Show less",
    ctaText: "Have a project in mind?",
    ctaButton: "Get in touch",
  },
  it: {
    title: "Lavoro",
    intro:
      "Una selezione di progetti, esperienza professionale e background di ricerca tra AI medica e robotica.",
    careerArc:
      "La mia carriera ha seguito un solo filo: far funzionare l'AI e i sistemi autonomi fuori dal laboratorio. Ho iniziato nella robotica industriale e human-facing, il contesto più difficile in cui mettere in campo un sistema, dove deve funzionare in sicurezza tra persone e macchine in condizioni che non controlli. La stessa disciplina confluisce ora nell'AI clinica, dove un modello deve superare validazione e governance e reggere in un ospedale reale. La robotica mi ha insegnato il deployment. La medicina è dove lo applico.",
    headingProjects: "Progetti",
    lblContext: "Contesto",
    lblConstraints: "Vincoli",
    lblApproach: "Cosa ho fatto",
    lblOutcome: "Risultato",
    headingExperience: "Esperienza",
    headingEducation: "Formazione",
    cvText: "Scarica il CV completo (PDF)",
    researchHeading: "Background di ricerca",
    researchText:
      "Ricerca peer-reviewed in interazione uomo-robot e robotica sociale. Questo lavoro sui sistemi human-facing è alla base del mio approccio all'AI clinica.",
    researchLink: "Elenco completo delle pubblicazioni su Google Scholar →",
    headingTalks: "Interventi",
    headingMilestones: "Traguardi",
    showAll: (n) => `Mostra tutti i ${n} traguardi ↓`,
    showLess: "Mostra meno",
    ctaText: "Hai un progetto in mente?",
    ctaButton: "Contattami",
  },
};

export default workStrings;
