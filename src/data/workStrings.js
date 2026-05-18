// Section labels for the Work page, per locale. Structural content lives in
// projects.js / experience.js / education.js / talks.js / milestones.js and
// data/*.json (publications).
const workStrings = {
  en: {
    title: "Work",
    intro:
      "Selected projects, research, and professional experience across medical AI and robotics.",
    headingProjects: "Projects",
    headingExperience: "Experience",
    headingEducation: "Education",
    headingPublications: "Publications",
    pubsConference: "Conference & Journal Papers",
    pubsMisc: "Workshops, Theses & Other",
    scholar: "Google Scholar →",
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
      "Una selezione di progetti, ricerca ed esperienza professionale tra AI medica e robotica.",
    headingProjects: "Progetti",
    headingExperience: "Esperienza",
    headingEducation: "Formazione",
    headingPublications: "Pubblicazioni",
    pubsConference: "Articoli di conferenza e rivista",
    pubsMisc: "Workshop, tesi e altro",
    scholar: "Google Scholar →",
    headingTalks: "Interventi",
    headingMilestones: "Traguardi",
    showAll: (n) => `Mostra tutti i ${n} traguardi ↓`,
    showLess: "Mostra meno",
    ctaText: "Hai un progetto in mente?",
    ctaButton: "Contattami",
  },
};

export default workStrings;
