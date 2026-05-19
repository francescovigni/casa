// Homepage copy, per locale. The homepage is an 8-section lead tool;
// structural data lives in projects.js / engagement.js / fit.js / trust.js.
const homeStrings = {
  en: {
    name: "Francesco Vigni, PhD",
    role: "Medical AI Consultant",
    headline: "I make AI survive contact with the real world.",
    convergence:
      "I've spent my career on the gap between a model that works in a paper and a system that works in the field. From industrial and human-facing robotics to clinical AI imaging.",
    btnTalk: "Book a call",
    btnHow: "How I work",
    calendlyAria: "Book a free 15-minute call on Calendly",

    whoForHeading: "Who I work with",
    audiences: [
      {
        title: "Hospitals & IRCCS",
        body: "You're deploying your first clinical-AI system and need it to pass validation, satisfy GDPR and EHDS, and survive procurement, not just demo well.",
      },
      {
        title: "R&D teams",
        body: "You're building technical solutions and need experienced support on model performance, MLOps, and the path from prototype to real deployment.",
      },
    ],

    pedigreeHeading: "Experience from",

    engagementHeading: "How I help",
    engagementIntro: "Three ways to work together, depending on where you are.",

    fitHeading: "Is this a fit?",
    fitGood: "We're a good fit if",
    fitNot: "Probably not a fit if",

    proofHeading: "Selected work",
    proofIntro:
      "Deployment stories: the constraints that mattered and what actually shipped.",
    proofViewAll: "See all work →",

    trustHeading: "Trust & compliance",
    trustIntro: "How clinical-AI work stays safe, compliant, and accountable.",

    ctaHeading: "Have a clinical-AI problem worth solving?",
    ctaText:
      "A 15-minute call is the fastest way to find out if I can help.",
    ctaButton: "Book a call",
  },
  it: {
    name: "Francesco Vigni, PhD",
    role: "Consulente AI per la Sanità",
    headline: "IA che regge l'impatto con il mondo reale.",
    convergence:
      "Ho dedicato la mia carriera al divario tra un modello che funziona in un paper e un sistema che funziona sul campo. Dalla robotica industriale e human-facing all'IA per l'imaging clinico.",
    btnTalk: "Prenota una call",
    btnHow: "Come lavoro",
    calendlyAria: "Prenota una call gratuita di 15 minuti su Calendly",

    whoForHeading: "Con chi lavoro",
    audiences: [
      {
        title: "Ospedali e IRCCS",
        body: "Stai introducendo il tuo primo sistema di AI clinica e hai bisogno che superi la validazione, rispetti GDPR ed EHDS e regga il procurement.",
      },
      {
        title: "Team di R&S",
        body: "Sviluppi soluzioni tecnologiche e ti serve competenza esperta su prestazioni del modello, MLOps e il percorso dal prototipo al deployment reale.",
      },
    ],

    pedigreeHeading: "Esperienza presso",

    engagementHeading: "Come posso aiutarti",
    engagementIntro: "Tre modi di collaborare, a seconda del punto in cui ti trovi.",

    fitHeading: "Siamo compatibili?",
    fitGood: "Siamo una buona scelta se",
    fitNot: "Probabilmente non lo siamo se",

    proofHeading: "Lavori selezionati",
    proofIntro:
      "Storie di deployment: i vincoli che contavano e ciò che è stato effettivamente realizzato.",
    proofViewAll: "Vedi tutti i lavori →",

    trustHeading: "Affidabilità e compliance",
    trustIntro:
      "Come il lavoro sull'AI clinica resta sicuro, conforme e responsabile.",

    ctaHeading: "Hai un problema di AI clinica che vale la pena risolvere?",
    ctaText:
      "Una call di 15 minuti è il modo più rapido per capire se posso aiutarti.",
    ctaButton: "Prenota una call",
  },
};

export default homeStrings;
