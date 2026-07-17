// The engagement ladder shown on the homepage: how working together looks.
// Mirrors the consulting pipeline stages: Pilot, Support, Transition.
const engagement = [
  {
    key: "pilot",
    name: { en: "Pilot", it: "Pilota" },
    summary: {
      en: "A fixed-scope engagement to prove feasibility before you commit further.",
      it: "Un incarico a perimetro definito per dimostrare la fattibilità prima di impegni maggiori.",
    },
    suits: {
      en: "Teams testing whether a clinical-AI idea is worth a larger investment.",
      it: "Team che vogliono capire se un'idea di AI clinica vale un investimento maggiore.",
    },
  },
  {
    key: "support",
    name: { en: "Support", it: "Affiancamento" },
    summary: {
      en: "An ongoing engagement as your embedded technical partner.",
      it: "Un incarico continuativo come partner tecnico integrato nel team.",
    },
    suits: {
      en: "Teams building a clinical-AI system that needs senior depth they don't have in-house.",
      it: "Team che sviluppano un sistema di AI clinica e necessitano di competenze senior non disponibili internamente.",
    },
  },
  {
    key: "transition",
    name: { en: "Transition", it: "Passaggio di consegne" },
    summary: {
      en: "A hand-off engagement that leaves your team self-sufficient.",
      it: "Un incarico di passaggio di consegne che rende il team autonomo.",
    },
    suits: {
      en: "Teams ready to own a working system and run it without external dependency.",
      it: "Team pronti a gestire internamente un sistema funzionante senza dipendenze esterne.",
    },
  },
];

export default engagement;
