// Lightweight i18n core (ported from the Gatsby site's src/utils/i18n.js).
// No plugin runtime: locale is derived from the URL and passed via props.

export const LOCALES = ["en", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

// Single source of truth pairing EN <-> IT routes. Used by the language
// toggle, the hreflang tags, and the geo middleware.
export const localePairs: { en: string; it: string }[] = [
  { en: "/", it: "/it/" },
  { en: "/work/", it: "/it/lavoro/" },
  { en: "/contact/", it: "/it/contatti/" },
  { en: "/privacy/", it: "/it/privacy/" },
];

/** Derive locale from a pathname. */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/it" || pathname === "/it/" || pathname.startsWith("/it/")
    ? "it"
    : "en";
}

/** Return the counterpart path in `target`, or the locale root if unpaired. */
export function getCounterpart(path: string, target: Locale): string {
  const norm = path.endsWith("/") ? path : path + "/";
  const pair = localePairs.find((p) => p.en === norm || p.it === norm);
  if (pair) return pair[target];
  return target === "it" ? "/it/" : "/";
}

type Translatable<T> = { en: T; it: T };

/** Resolve a { en, it } field for `locale`, falling back to English. */
export function pick<T>(field: Translatable<T> | T, locale: Locale): T {
  if (
    field &&
    typeof field === "object" &&
    "en" in (field as Record<string, unknown>)
  ) {
    const f = field as Translatable<T>;
    return f[locale] ?? f.en;
  }
  return field as T;
}

// Chrome strings: nav, language toggle, cookie banner.
export const ui = {
  en: {
    nav: { home: "Home", work: "Work", contact: "Contact" },
    toggle: { code: "IT", aria: "Passa alla versione italiana" },
    cv: "Download CV",
    talk: "Let's talk",
    menu: { open: "Open menu", close: "Close menu" },
    cookie: {
      text: "This site uses cookies for anonymous analytics.",
      policy: "Privacy Policy",
      decline: "Decline",
      accept: "Accept",
    },
  },
  it: {
    nav: { home: "Home", work: "Lavoro", contact: "Contatti" },
    toggle: { code: "EN", aria: "Switch to the English version" },
    cv: "Scarica il CV",
    talk: "Parliamone",
    menu: { open: "Apri il menu", close: "Chiudi il menu" },
    cookie: {
      text: "Questo sito utilizza cookie per analisi anonime.",
      policy: "Informativa privacy",
      decline: "Rifiuta",
      accept: "Accetta",
    },
  },
} as const;
