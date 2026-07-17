const localePairs = [
  { en: "/", it: "/it/" },
  { en: "/work/", it: "/it/lavoro/" },
  { en: "/contact/", it: "/it/contatti/" },
  { en: "/privacy/", it: "/it/privacy/" }
];
function localeFromPath(pathname) {
  return pathname === "/it" || pathname === "/it/" || pathname.startsWith("/it/") ? "it" : "en";
}
function getCounterpart(path, target) {
  const norm = path.endsWith("/") ? path : path + "/";
  const pair = localePairs.find((p) => p.en === norm || p.it === norm);
  if (pair) return pair[target];
  return target === "it" ? "/it/" : "/";
}
function pick(field, locale) {
  if (field && typeof field === "object" && "en" in field) {
    const f = field;
    return f[locale] ?? f.en;
  }
  return field;
}
const ui = {
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
      accept: "Accept"
    }
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
      accept: "Accetta"
    }
  }
};

export { localePairs as a, getCounterpart as g, localeFromPath as l, pick as p, ui as u };
