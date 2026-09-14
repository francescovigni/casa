// Peer-reviewed work. Extracted from the Gatsby milestone timeline, which mixed
// papers with conference attendance; the attendance entries were dropped.
//
// `confirmed` marks an entry whose exact title and venue come from the CV or
// from the recorded talk. The rest were reconstructed from the timeline's prose:
// they are accurate in substance, but the titles need checking against Scholar,
// and none of them carry a DOI yet.

export interface Publication {
  title: string;
  venue: string;
  year: number;
  /** "journal" | "conference" | "workshop" | "poster" | "late-breaking" */
  kind: string;
  url?: string;
  confirmed: boolean;
}

export const publications: Publication[] = [
  {
    title: "Proceedings of the ALTRUIST, BAILAR, SCRITA and WARN 2024 workshops",
    venue: "Published online",
    year: 2025,
    kind: "workshop",
    confirmed: false,
  },
  {
    title: "Too Close to You? Emotion-Adapted Proxemics Behaviours",
    venue: "IEEE RO-MAN, Pasadena",
    year: 2024,
    kind: "conference",
    confirmed: true,
  },
  {
    title: "Emotion-based social distances for robot path planning",
    venue: "IEEE RO-MAN, Pasadena",
    year: 2024,
    kind: "conference",
    confirmed: false,
  },
  {
    title: "A Rosbag Tool to Improve Dataset Reliability",
    venue: "ACM/IEEE HRI, Boulder",
    year: 2024,
    kind: "late-breaking",
    confirmed: true,
  },
  {
    title: "Sweet Robot O'Mine: How a Cheerful Robot Boosts Users' Performance",
    venue: "IEEE RO-MAN, Busan",
    year: 2023,
    kind: "conference",
    confirmed: true,
  },
  {
    title: "Non-verbal strategies for initiating human-robot interaction",
    venue: "ICSR, Florence",
    year: 2022,
    kind: "poster",
    confirmed: false,
  },
  {
    title: "Emotional transparency of a non-humanoid social robot",
    venue: "ICSR, Florence",
    year: 2022,
    kind: "poster",
    confirmed: false,
  },
  {
    title: "Familiar acoustic cues for legible service robots",
    venue: "IEEE RO-MAN, Naples",
    year: 2022,
    kind: "conference",
    confirmed: false,
  },
  {
    title: "The Role of Closed-Loop Hand Control in Handshaking Interactions",
    venue: "IEEE Robotics and Automation Letters (RA-L)",
    year: 2019,
    kind: "journal",
    confirmed: true,
  },
];

// Kept from the timeline because they are achievements. Conference and trade
// fair attendance was not.
export const awards: { en: string; it: string }[] = [
  {
    en: "1st prize, 2nd Startup Creation Lab, Università di Bologna (2025)",
    it: "1° premio, 2ª edizione Startup Creation Lab, Università di Bologna (2025)",
  },
  {
    en: "Marie Skłodowska-Curie Fellow, EU H2020 project PERSEO (2021)",
    it: "Marie Skłodowska-Curie Fellow, progetto UE H2020 PERSEO (2021)",
  },
  {
    en: "Best Paper Award finalist in HRI, IEEE ICRA (2019)",
    it: "Finalista Best Paper Award in HRI, IEEE ICRA (2019)",
  },
];
