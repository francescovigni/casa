// Research case studies, ported from the standalone portfolio.francescovigni.com
// site. Each entry is the *card* only: one finding, three numbers, one figure.
// The argument itself lives in the detail page under src/pages/research/, and
// the repository stays the source of record.
//
// Figures are copied in with the date in the filename, never hot-linked, so a
// regenerated figure in a source repo cannot silently change this page and how
// stale a card is stays visible.
//
// English only by design: unpaired with /it/, see i18n.ts localePairs.

export interface Stat {
  /** The number itself. The first stat in a card is the headline one. */
  value: string;
  /** What it measures, in lower case. */
  label: string;
}

export interface ResearchStudy {
  /** URL slug under /research/. */
  slug: string;
  /** Small caps eyebrow: domain · what it is about. */
  eyebrow: string;
  /** The finding that earns the click. `strong` is highlighted. */
  finding: string;
  /** One paragraph of supporting detail. */
  detail: string;
  stats: [Stat, Stat, Stat];
  figure: { src: string; alt: string };
  /** Text of the link into the detail page. */
  cta: string;
  repo: string;
}

export const research: ResearchStudy[] = [
  {
    slug: "endoscopy-standardization",
    eyebrow: "Endoscopy · acquisition shortcuts",
    finding:
      "You can tell which hospital a colonoscopy frame came from <strong>96% of the time, without looking at the anatomy</strong>, and the standard fix barely helps.",
    detail:
      "Nine numbers describing the frame the <em>equipment</em> drew (letterboxing, the field-of-view mask, the burned-in date) identify the source dataset out of five, at chance 0.20.",
    stats: [
      { value: "0.961", label: "as acquired" },
      { value: "0.859", label: "after the standard crop-and-pad" },
      { value: "0.891", label: "from a frozen self-supervised encoder" },
    ],
    figure: {
      src: "/research/figures/endoscopy-card-2026-09-01.png",
      alt: "The same endoscopic frame shown through four preprocessing pipelines, for two source datasets",
    },
    cta: "Four findings, and the one that failed",
    repo: "https://github.com/francescovigni/endoscopy-standardization",
  },
  {
    slug: "fetal-cardiac-orientation",
    eyebrow: "Fetal ultrasound · orientation",
    finding:
      "Estimating fetal cardiac orientation <strong>does not need a trained model</strong>: closed-form geometry beats the network by two orders of magnitude.",
    detail:
      "The useful part is knowing when that shortcut breaks. It does not break where the usual quality score says it should: a mask scoring Dice 0.87 can give a 46° error, one at 0.77 gives 0.22°.",
    stats: [
      { value: "0.28°", label: "second-order moments, no training" },
      { value: "7.04°", label: "trained landmark model, box only" },
      { value: "±18°", label: "95% limits of agreement" },
    ],
    figure: {
      src: "/research/figures/cardiac-orientation-2026-08-31.png",
      alt: "Six fetal four-chamber ultrasound frames with the annotated and predicted heart axes overlaid, labelled best, median and worst",
    },
    cta: "Why landmarks, and where they break",
    repo: "https://github.com/francescovigni/fetal-cardiac-orientation",
  },
];
