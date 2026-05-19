// Section labels and prose for the Work page, per locale. Structural content
// lives in projects.js / experience.js / education.js / talks.js / milestones.js.
const workStrings = {
  en: {
    title: "Work",
    intro:
      "Selected projects, professional experience, and research background across medical AI and robotics.",
    careerArc:
      "My career has followed one thread: making AI and autonomous systems survive contact with the real world. I started in industrial and human-facing robotics — the hardest deployment problem there is, where a system has to work safely around people and machines in conditions you don't control. That same discipline now goes into clinical AI: the highest-stakes deployment problem, where a model has to survive validation, governance, and a hospital's reality. Robotics taught me deployment; medicine is where I apply it.",
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
      "Peer-reviewed research in human-robot interaction and social robotics — the human-facing systems work that underpins how I approach clinical AI.",
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
      "La mia carriera ha seguito un solo filo conduttore: fare in modo che l'AI e i sistemi autonomi reggano l'impatto con il mondo reale. Ho iniziato nella robotica industriale e human-facing — il problema di deployment più difficile che esista, dove un sistema deve funzionare in sicurezza tra persone e macchine in condizioni che non controlli. La stessa disciplina confluisce oggi nell'AI clinica: il problema di deployment a più alta posta in gioco, dove un modello deve superare validazione, governance e la realtà di un ospedale. La robotica mi ha insegnato il deployment; la medicina è dove lo applico.",
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
      "Ricerca peer-reviewed in interazione uomo-robot e robotica sociale — il lavoro sui sistemi human-facing che è alla base del mio approccio all'AI clinica.",
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
