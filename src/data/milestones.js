import React from "react";

// Milestones timeline — single source for the EN and IT homepages.
// `date` stays an English "Mon YYYY" string (the month is localized at
// render time); `tag` is an English key into tagLabels; `text` is { en, it }.
const milestones = [
  {
    date: "May 2026",
    tag: "Event",
    text: {
      en: "Attended Exposanità, the international healthcare and assistance exhibition, held in Bologna, Italy.",
      it: "Partecipato a Exposanità, la mostra internazionale al servizio della sanità e dell'assistenza, tenutasi a Bologna.",
    },
  },
  {
    date: "Mar 2026",
    tag: "Community",
    text: {
      en: "Joined the Commission for Information and Electronics Engineering, Ordine degli Ingegneri della provincia di Forlì-Cesena.",
      it: "Membro nella Commissione Ingegneria dell'Informazione ed Elettronica, Ordine degli Ingegneri della provincia di Forlì-Cesena.",
    },
  },
  {
    date: "Mar 2026",
    tag: "Event",
    text: {
      en: "Attended MECSPE 2026, the international trade fair for the manufacturing industry, held in Bologna, Italy.",
      it: "Partecipato a MECSPE 2026, la fiera internazionale dell'industria manifatturiera, tenutasi a Bologna.",
    },
  },
  {
    date: "Feb 2026",
    tag: "Project",
    text: {
      en: "Started a medical imaging consultancy project — foundation-model fine-tuning for endoscopy.",
      it: "Avviato un progetto di consulenza in medical imaging — fine-tuning di foundation model per l'endoscopia.",
    },
  },
  {
    date: "Dec 2025",
    tag: "Award",
    text: {
      en: "Won 1st prize at the 2nd Startup Creation Lab — Università di Bologna, hosted at Laboratorio Aperto Forlì.",
      it: "Vinto il 1° premio alla 2ª edizione dello Startup Creation Lab — Università di Bologna, ospitato al Laboratorio Aperto di Forlì.",
    },
  },
  {
    date: "Sep 2025",
    tag: "Project",
    text: {
      en: "Launched updated portfolio showcasing recent projects, ML demos, and interests.",
      it: "Pubblicato il portfolio aggiornato con progetti recenti, demo di ML e interessi.",
    },
  },
  {
    date: "Jul 2025",
    tag: "Project",
    text: {
      en: (
        <a href="https://walk.francescovigni.com">
          Walked about 1000 km along north of Spain through the Camino del
          Norte.{" "}
        </a>
      ),
      it: (
        <a href="https://walk.francescovigni.com">
          Percorsi circa 1000 km nel nord della Spagna lungo il Camino del
          Norte.{" "}
        </a>
      ),
    },
  },
  {
    date: "Mar 2025",
    tag: "Milestone",
    text: {
      en: "Joined the Ordine degli Ingegneri (Forlì-Cesena) — Sector A, Information Engineering.",
      it: "Iscritto all'Ordine degli Ingegneri (Forlì-Cesena) — Settore A, Ingegneria dell'Informazione.",
    },
  },
  {
    date: "Feb 2025",
    tag: "Education",
    text: {
      en: 'Defended Ph.D. thesis "The Unscripted Encounter: Social Cues for Spontaneous Human-Robot Interactions" — Doctor Europæus label, University of Naples Federico II.',
      it: 'Discussa la tesi di dottorato "The Unscripted Encounter: Social Cues for Spontaneous Human-Robot Interactions" — menzione Doctor Europæus, Università di Napoli Federico II.',
    },
  },
  {
    date: "Feb 2025",
    tag: "Community",
    text: {
      en: "Joined the Young Leaders Committee of ICSR25+AI (Naples, Sep 2025).",
      it: "Entrato nello Young Leaders Committee di ICSR25+AI (Napoli, settembre 2025).",
    },
  },
  {
    date: "Jan 2025",
    tag: "Publication",
    text: {
      en: "Proceedings of the ALTRUIST, BAILAR, SCRITA, and WARN 2024 workshops published online.",
      it: "Pubblicati online gli atti dei workshop ALTRUIST, BAILAR, SCRITA e WARN 2024.",
    },
  },
  {
    date: "May 2024",
    tag: "Publication",
    text: {
      en: "Paper accepted at IEEE RO-MAN 2024 (Pasadena): emotion-based social distances for robot path planning.",
      it: "Articolo accettato a IEEE RO-MAN 2024 (Pasadena): distanze sociali basate sulle emozioni per il path planning robotico.",
    },
  },
  {
    date: "May 2024",
    tag: "Publication",
    text: {
      en: "Paper accepted at IEEE RO-MAN 2024 (Pasadena): emotion-adapted proxemics behaviours.",
      it: "Articolo accettato a IEEE RO-MAN 2024 (Pasadena): comportamenti prossemici adattati alle emozioni.",
    },
  },
  {
    date: "Mar 2024",
    tag: "Talk",
    text: {
      en: 'Invited talk "Datemi un bit e solleverò il mondo" at Istituto Salesiano Sacro Cuore, Naples (~200 students).',
      it: 'Intervento su invito "Datemi un bit e solleverò il mondo" all\'Istituto Salesiano Sacro Cuore, Napoli (~200 studenti).',
    },
  },
  {
    date: "Mar 2024",
    tag: "Workshop",
    text: {
      en: "WARN workshop (2nd ed.) accepted at IEEE RO-MAN 2024, Pasadena.",
      it: "Workshop WARN (2ª ed.) accettato a IEEE RO-MAN 2024, Pasadena.",
    },
  },
  {
    date: "Feb 2024",
    tag: "Visit",
    text: {
      en: "Visiting researcher at Autonomous Systems Lab, TU Wien, Vienna (5 months).",
      it: "Ricercatore in visita all'Autonomous Systems Lab, TU Wien, Vienna (5 mesi).",
    },
  },
  {
    date: "Jan 2024",
    tag: "Publication",
    text: {
      en: "Late Breaking Report accepted at ACM/IEEE HRI 2024, Boulder CO — A Rosbag Tool to Improve Dataset Reliability.",
      it: "Late Breaking Report accettato a ACM/IEEE HRI 2024, Boulder (CO) — uno strumento per rosbag che migliora l'affidabilità dei dataset.",
    },
  },
  {
    date: "Oct 2023",
    tag: "Publication",
    text: {
      en: "Presented work on robot communication style impact on user task performance at I-RIM 3D, Rome.",
      it: "Presentato a I-RIM 3D, Roma, uno studio sull'impatto dello stile comunicativo del robot sulle prestazioni dell'utente.",
    },
  },
  {
    date: "Jul 2023",
    tag: "Visit",
    text: {
      en: "Visiting researcher at Noosware NV, Eindhoven (2 months) — emotional-aware mobile robotics.",
      it: "Ricercatore in visita a Noosware NV, Eindhoven (2 mesi) — robotica mobile sensibile alle emozioni.",
    },
  },
  {
    date: "Jun 2023",
    tag: "Publication",
    text: {
      en: "Paper accepted at IEEE RO-MAN 2023 (Busan): cheerful robot boosts users' performance in a game scenario.",
      it: "Articolo accettato a IEEE RO-MAN 2023 (Busan): un robot allegro migliora le prestazioni degli utenti in uno scenario di gioco.",
    },
  },
  {
    date: "Mar 2023",
    tag: "Workshop",
    text: {
      en: "WARN workshop accepted at IEEE RO-MAN 2023, Busan.",
      it: "Workshop WARN accettato a IEEE RO-MAN 2023, Busan.",
    },
  },
  {
    date: "Mar 2023",
    tag: "Talk",
    text: {
      en: "Presented interaction-centric metrics at CONCATENATE workshop, HRI 2023, Stockholm.",
      it: "Presentate metriche centrate sull'interazione al workshop CONCATENATE, HRI 2023, Stoccolma.",
    },
  },
  {
    date: "Mar 2023",
    tag: "Talk",
    text: {
      en: "Invited talk on AI and Robotics at Liceo Statale Gandhi, Casoria.",
      it: "Intervento su invito su AI e Robotica al Liceo Statale Gandhi, Casoria.",
    },
  },
  {
    date: "Dec 2022",
    tag: "Publication",
    text: {
      en: "Poster at ICSR 2022 (Florence): non-verbal strategies for initiating HRI.",
      it: "Poster a ICSR 2022 (Firenze): strategie non verbali per avviare l'interazione uomo-robot.",
    },
  },
  {
    date: "Dec 2022",
    tag: "Publication",
    text: {
      en: "Poster at ICSR 2022 (Florence): emotional transparency of a non-humanoid social robot.",
      it: "Poster a ICSR 2022 (Firenze): trasparenza emotiva di un robot sociale non antropomorfo.",
    },
  },
  {
    date: "Sep 2022",
    tag: "Publication",
    text: {
      en: "Co-presented familiar acoustic cues for legible service robots at IEEE RO-MAN 2022, Naples.",
      it: "Co-presentato a IEEE RO-MAN 2022, Napoli, uno studio su segnali acustici familiari per robot di servizio più leggibili.",
    },
  },
  {
    date: "May 2021",
    tag: "Media",
    text: {
      en: "Interviewed by ForliToday on career path and insights in Robotics & AI.",
      it: "Intervistato da ForlìToday sul percorso professionale e su spunti in Robotica e AI.",
    },
  },
  {
    date: "May 2021",
    tag: "Media",
    text: {
      en: "Met (former) Chancellor Angela Merkel and PM Markus Söder during their visit to MIRMI, TUM.",
      it: "Incontrato l'ex Cancelliera Angela Merkel e il Ministro-Presidente Markus Söder durante la loro visita al MIRMI, TUM.",
    },
  },
  {
    date: "May 2019",
    tag: "Media",
    text: {
      en: "Closed-loop human-robot handshake research featured in Corriere di Siena and il cittadino online.",
      it: "La ricerca sull'handshake uomo-robot in closed-loop è stata raccontata da Corriere di Siena e il cittadino online.",
    },
  },
  {
    date: "May 2019",
    tag: "Award",
    text: {
      en: "Finalist for Best Paper Award in HRI at ICRA 2019.",
      it: "Finalista per il Best Paper Award in HRI a ICRA 2019.",
    },
  },
  {
    date: "May 2019",
    tag: "Award",
    text: {
      en: "Awarded academic grant from BCC Ravennate Forlivese e Imolese.",
      it: "Ricevuto un contributo accademico da BCC Ravennate Forlivese e Imolese.",
    },
  },
  {
    date: "Dec 2018",
    tag: "Talk",
    text: {
      en: "Career talk at former high school ITE Matteucci, Forlì.",
      it: "Talk di orientamento professionale presso l'ex istituto superiore ITE Matteucci, Forlì.",
    },
  },
];

// Sort newest-first automatically from the "Mon YYYY" date, so entries above
// can be added in any order. Sort is stable — same-month entries keep their
// authored order.
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const dateValue = (date) => {
  const [month, year] = date.split(" ");
  return Number(year) * 12 + MONTHS.indexOf(month);
};

const sortedMilestones = [...milestones].sort(
  (a, b) => dateValue(b.date) - dateValue(a.date)
);

export default sortedMilestones;
