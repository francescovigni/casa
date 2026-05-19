// Lightweight i18n core for the partial Italian localization (Approach B).
// No plugin: locale is passed explicitly via props from each page.

export const LOCALES = ["en", "it"];
export const DEFAULT_LOCALE = "en";

// Single source of truth pairing English <-> Italian routes.
// Used by both the language toggle (Header) and hreflang tags (Seo).
export const localePairs = [
  { en: "/", it: "/it/" },
  { en: "/work/", it: "/it/lavoro/" },
  { en: "/insights/", it: "/it/approfondimenti/" },
  { en: "/insights/ehds-readiness/", it: "/it/approfondimenti/ehds-readiness/" },
  { en: "/insights/clinical-ai-validation/", it: "/it/approfondimenti/clinical-ai-validation/" },
  { en: "/contact/", it: "/it/contatti/" },
];

// Given a path, return its counterpart in `targetLocale`, or null if unpaired.
export function getCounterpart(path, targetLocale) {
  if (!path) return null;
  const pair = localePairs.find((p) => p.en === path || p.it === path);
  return pair ? pair[targetLocale] : null;
}

// Resolve a possibly-translated field. A field shaped like { en, it } is
// resolved for `locale` (falling back to English); anything else is returned
// as-is. React elements pass through untouched.
export function pick(field, locale) {
  if (field && typeof field === "object" && !field.$$typeof && "en" in field) {
    return field[locale] ?? field.en;
  }
  return field;
}

// English 3-letter month -> Italian, for milestone/experience dates.
const MONTHS_IT = {
  Jan: "Gen", Feb: "Feb", Mar: "Mar", Apr: "Apr", May: "Mag", Jun: "Giu",
  Jul: "Lug", Aug: "Ago", Sep: "Set", Oct: "Ott", Nov: "Nov", Dec: "Dic",
};
export function localizeMonth(month, locale) {
  if (locale !== "it") return month;
  return MONTHS_IT[month] || month;
}

// Milestone tag -> display label per locale (tag itself stays an English key).
export const tagLabels = {
  en: {
    Award: "Award", Publication: "Publication", Talk: "Talk", Event: "Event",
    Media: "Media", Workshop: "Workshop", Education: "Education",
    Community: "Community", Milestone: "Milestone", Project: "Project",
    Visit: "Visit",
  },
  it: {
    Award: "Premio", Publication: "Pubblicazione", Talk: "Intervento",
    Event: "Evento", Media: "Stampa", Workshop: "Workshop",
    Education: "Formazione", Community: "Community", Milestone: "Traguardo",
    Project: "Progetto", Visit: "Visita",
  },
};
export function tagLabel(tag, locale) {
  return (tagLabels[locale] || tagLabels.en)[tag] || tag;
}

// Milestone tag -> Tailwind color classes. Shared by Home and Work pages.
export const tagColors = {
  Award: "bg-amber-50 text-amber-700",
  Publication: "bg-blue-50 text-blue-700",
  Talk: "bg-green-50 text-green-700",
  Event: "bg-purple-50 text-purple-700",
  Media: "bg-rose-50 text-rose-700",
  Workshop: "bg-orange-50 text-orange-700",
  Education: "bg-emerald-50 text-emerald-700",
  Community: "bg-teal-50 text-teal-700",
  Milestone: "bg-indigo-50 text-indigo-700",
  Project: "bg-gray-100 text-gray-600",
  Visit: "bg-cyan-50 text-cyan-700",
};

// Chrome strings (header nav, cookie banner, language toggle).
export const ui = {
  en: {
    nav: {
      home: "Home",
      work: "Work",
      insights: "Insights",
      contact: "Contact",
    },
    toggle: { code: "IT", aria: "Passa alla versione italiana" },
    menu: { open: "Open menu", close: "Close menu" },
    cookie: {
      text: "This site uses cookies for anonymous analytics.",
      policy: "Privacy Policy",
      decline: "Decline",
      accept: "Accept",
    },
  },
  it: {
    nav: {
      home: "Home",
      work: "Lavoro",
      insights: "Approfondimenti",
      contact: "Contatti",
    },
    toggle: { code: "EN", aria: "Switch to the English version" },
    menu: { open: "Apri il menu", close: "Chiudi il menu" },
    cookie: {
      text: "Questo sito utilizza cookie per analisi anonime.",
      policy: "Informativa privacy",
      decline: "Rifiuta",
      accept: "Accetta",
    },
  },
};
