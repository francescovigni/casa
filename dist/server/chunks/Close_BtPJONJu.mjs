import { e as createAstro, f as createComponent, m as maybeRenderHead, u as unescapeHTML, h as addAttribute, r as renderTemplate } from './astro/server_DHcPpfwo.mjs';
import 'piccolore';
import 'clsx';
import { p as pick } from './i18n_ClCD8eWO.mjs';
import { p as projects } from './projects_Dddaukeh.mjs';

const hero = {
  kicker: { en: "Francesco Vigni, PhD", it: "Francesco Vigni, PhD" },
  title: {
    en: "Machine learning that <em>survives</em> deployment.",
    it: "Machine learning che <em>sopravvive</em> al deployment."
  },
  lead: {
    en: "Engineer and researcher building AI that has to work outside the lab — from medical-imaging foundation models to robots on the factory floor — and the infrastructure to run it in production.",
    it: "Ingegnere e ricercatore: costruisco AI che deve funzionare fuori dal laboratorio — dai foundation model per l'imaging medico ai robot in fabbrica — e l'infrastruttura per portarla in produzione."
  },
  primary: { en: "Let's talk", it: "Parliamone" },
  secondary: { en: "Download CV", it: "Scarica il CV" },
  cvHref: "/Francesco-Vigni-CV.pdf"
};
const pillars = [
  {
    id: "research",
    flagship: true,
    label: { en: "AI / ML Research", it: "Ricerca AI / ML" },
    body: {
      en: "Foundation models for medical imaging (self-supervised ViT, distributed training), reproducible evaluation, and a defined path from research to clinical validation.",
      it: "Foundation model per l'imaging medico (ViT self-supervised, training distribuito), valutazione riproducibile e un percorso definito dalla ricerca alla validazione clinica."
    }
  },
  {
    id: "robotics",
    flagship: false,
    label: { en: "Robotics & Edge", it: "Robotica & Edge" },
    body: {
      en: "ROS2 navigation and perception, real-time inference on NVIDIA Jetson, and industrial systems deployed commercially across multiple countries.",
      it: "Navigazione e percezione ROS2, inferenza in tempo reale su NVIDIA Jetson e sistemi industriali in produzione in diversi paesi."
    }
  },
  {
    id: "infra",
    flagship: false,
    label: { en: "DevOps & Infrastructure", it: "DevOps & Infrastruttura" },
    body: {
      en: "Self-hosted single-node Kubernetes (k3s) with Helm, health-gated reversible delivery, CI/CD, and hands-on production incident debugging.",
      it: "Kubernetes single-node self-hosted (k3s) con Helm, delivery reversibile health-gated, CI/CD e debugging di incidenti in produzione."
    }
  }
];
const pedigree = [
  "Univ. Naples Federico II",
  "TU Wien",
  "TU Munich",
  "Disney Research",
  "Roboception",
  "Marie Skłodowska-Curie Fellow"
];
const waysToWork = {
  kicker: { en: "Ways to work together", it: "Modi di collaborare" },
  title: {
    en: "Open to the right role — and good collaborations.",
    it: "Aperto al ruolo giusto — e a buone collaborazioni."
  },
  cards: [
    {
      primary: true,
      title: { en: "Full-time role", it: "Ruolo a tempo pieno" },
      body: {
        en: "Research, engineering, or infrastructure positions where ML has to reach production. Actively looking.",
        it: "Posizioni di ricerca, ingegneria o infrastruttura dove l'ML deve arrivare in produzione. In cerca attiva."
      }
    },
    {
      primary: false,
      title: { en: "Research collaboration", it: "Collaborazione di ricerca" },
      body: {
        en: "Joint projects, co-authored papers, EU-funded research, and clinical-AI partnerships.",
        it: "Progetti congiunti, pubblicazioni, ricerca finanziata UE e partnership su AI clinica."
      }
    },
    {
      primary: false,
      title: { en: "Select consulting", it: "Consulenza selezionata" },
      body: {
        en: "A limited number of scoped technical engagements where I can genuinely move the needle.",
        it: "Un numero limitato di incarichi tecnici circoscritti dove posso davvero fare la differenza."
      }
    }
  ]
};
const trust = {
  kicker: { en: "Built to be trusted", it: "Fatto per essere affidabile" },
  badges: [
    { en: "GDPR", it: "GDPR" },
    { en: "EHDS-ready", it: "Pronto per l'EHDS" },
    { en: "NDA-friendly", it: "Disponibile a NDA" },
    { en: "Ordine degli Ingegneri #2988", it: "Ordine degli Ingegneri #2988" },
    { en: "EU / self-hosted stack", it: "Stack UE / self-hosted" }
  ]
};
const close = {
  title: { en: "Let's see if I can help.", it: "Vediamo se posso essere utile." },
  body: {
    en: "Tell me about the role or the project. I reply personally.",
    it: "Raccontami del ruolo o del progetto. Rispondo personalmente."
  }
};

const $$Astro$6 = createAstro("https://francescovigni.com");
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Hero;
  const { locale } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden"> <div class="wrap grid gap-10 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.4fr_1fr] lg:items-end"> <div> <p class="kicker mb-6">${pick(hero.kicker, locale)} · AI Researcher &amp; Engineer</p> <h1 class="display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">${unescapeHTML(pick(hero.title, locale))}</h1> <p class="lead mt-6 max-w-prose text-lg">${pick(hero.lead, locale)}</p> <div class="mt-9 flex flex-wrap items-center gap-3"> <a${addAttribute(locale === "it" ? "/it/contatti/" : "/contact/", "href")} class="btn-primary"> ${pick(hero.primary, locale)} <span aria-hidden="true">→</span> </a> <a${addAttribute(hero.cvHref, "href")} class="btn-ghost" download> ${pick(hero.secondary, locale)} </a> </div> </div> <dl class="grid grid-cols-3 gap-6 border-t border-line pt-6 lg:border-none lg:pt-0"> <div> <dt class="font-serif text-3xl text-ink">10<span class="text-accent">+</span></dt> <dd class="mt-1 text-xs leading-snug text-faint"> ${locale === "it" ? "anni ricerca + industria" : "yrs research + industry"} </dd> </div> <div> <dt class="font-serif text-3xl text-ink">8</dt> <dd class="mt-1 text-xs leading-snug text-faint"> ${locale === "it" ? "pubblicazioni peer-reviewed" : "peer-reviewed papers"} </dd> </div> <div> <dt class="font-serif text-3xl text-ink">4</dt> <dd class="mt-1 text-xs leading-snug text-faint"> ${locale === "it" ? "paesi: IT \xB7 DE \xB7 AT \xB7 CH" : "countries: IT \xB7 DE \xB7 AT \xB7 CH"} </dd> </div> </dl> </div> </section>`;
}, "/Users/fra/Tech/new-home/src/components/Hero.astro", void 0);

const $$Astro$5 = createAstro("https://francescovigni.com");
const $$Pillars = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Pillars;
  const { locale } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="wrap py-16 sm:py-20"> <p class="kicker mb-3">${locale === "it" ? "Cosa faccio" : "What I do"}</p> <h2 class="display mb-10 max-w-prose text-2xl sm:text-3xl"> ${locale === "it" ? "Tre aree, un filo conduttore: far arrivare l'AI in produzione." : "Three areas, one throughline: getting AI to production."} </h2> <div class="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3"> ${pillars.map((p) => renderTemplate`<article class="flex flex-col bg-canvas p-6"> <div class="mb-3 flex items-center gap-2"> <h3 class="font-sans text-base font-semibold text-ink">${pick(p.label, locale)}</h3> ${p.flagship && renderTemplate`<span class="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent"> ${locale === "it" ? "Punta di diamante" : "Flagship"} </span>`} </div> <p class="text-sm leading-relaxed text-muted">${pick(p.body, locale)}</p> </article>`)} </div> </section>`;
}, "/Users/fra/Tech/new-home/src/components/Pillars.astro", void 0);

const $$Astro$4 = createAstro("https://francescovigni.com");
const $$Pedigree = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Pedigree;
  const { locale } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="border-y border-line bg-canvas"> <div class="wrap flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-10"> <p class="kicker shrink-0"> ${locale === "it" ? "Dieci anni, ricerca e industria" : "Ten years, research & industry"} </p> <ul class="flex flex-wrap gap-x-7 gap-y-2"> ${pedigree.map((org) => renderTemplate`<li class="text-sm font-medium tracking-tight text-faint">${org}</li>`)} </ul> </div> </section>`;
}, "/Users/fra/Tech/new-home/src/components/Pedigree.astro", void 0);

const $$Astro$3 = createAstro("https://francescovigni.com");
const $$WaysToWork = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$WaysToWork;
  const { locale } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="wrap py-16 sm:py-20"> <p class="kicker mb-3">${pick(waysToWork.kicker, locale)}</p> <h2 class="display mb-10 max-w-prose text-2xl sm:text-3xl"> ${pick(waysToWork.title, locale)} </h2> <div class="grid gap-4 sm:grid-cols-3"> ${waysToWork.cards.map((c) => renderTemplate`<article${addAttribute([
    "rounded-lg border p-6",
    c.primary ? "border-ink bg-ink text-canvas" : "border-line bg-canvas"
  ], "class:list")}> ${c.primary && renderTemplate`<span class="mb-3 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-canvas"> ${locale === "it" ? "In cerca attiva" : "Actively looking"} </span>`} <h3${addAttribute([
    "font-serif text-xl",
    c.primary ? "text-canvas" : "text-ink"
  ], "class:list")}> ${pick(c.title, locale)} </h3> <p${addAttribute([
    "mt-2 text-sm leading-relaxed",
    c.primary ? "text-canvas/80" : "text-muted"
  ], "class:list")}> ${pick(c.body, locale)} </p> </article>`)} </div> </section>`;
}, "/Users/fra/Tech/new-home/src/components/WaysToWork.astro", void 0);

const $$Astro$2 = createAstro("https://francescovigni.com");
const $$Proof = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Proof;
  const { locale } = Astro2.props;
  const featured = projects.slice(0, 3);
  const workHref = locale === "it" ? "/it/lavoro/" : "/work/";
  return renderTemplate`${maybeRenderHead()}<section class="wrap py-16 sm:py-20"> <div class="mb-10 flex items-end justify-between gap-6"> <div> <p class="kicker mb-3">${locale === "it" ? "Lavori selezionati" : "Selected work"}</p> <h2 class="display max-w-prose text-2xl sm:text-3xl"> ${locale === "it" ? "Prove, non slide." : "Evidence, not slideware."} </h2> </div> <a${addAttribute(workHref, "href")} class="hidden shrink-0 text-sm font-semibold text-accent underline-offset-4 hover:underline sm:inline"> ${locale === "it" ? "Tutti i lavori \u2192" : "All work \u2192"} </a> </div> <div class="grid gap-4 md:grid-cols-3"> ${featured.map((p) => renderTemplate`<article class="flex flex-col rounded-lg border border-line bg-canvas p-6"> <p class="kicker mb-3 text-accent">${p.category}</p> <h3 class="font-serif text-lg leading-snug text-ink">${p.title}</h3> <p class="mt-3 flex-1 text-sm leading-relaxed text-muted">${pick(p.blurb, locale)}</p> <ul class="mt-4 flex flex-wrap gap-1.5"> ${p.tags.slice(0, 3).map((tag) => renderTemplate`<li class="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-faint"> ${tag} </li>`)} </ul> </article>`)} </div> <a${addAttribute(workHref, "href")} class="mt-6 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline sm:hidden"> ${locale === "it" ? "Tutti i lavori \u2192" : "All work \u2192"} </a> </section>`;
}, "/Users/fra/Tech/new-home/src/components/Proof.astro", void 0);

const $$Astro$1 = createAstro("https://francescovigni.com");
const $$Trust = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Trust;
  const { locale } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="border-t border-line bg-[#f4f1ea]"> <div class="wrap flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between"> <p class="kicker shrink-0">${pick(trust.kicker, locale)}</p> <ul class="flex flex-wrap gap-2.5"> ${trust.badges.map((b) => renderTemplate`<li class="rounded border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-muted"> ${pick(b, locale)} </li>`)} </ul> </div> </section>`;
}, "/Users/fra/Tech/new-home/src/components/Trust.astro", void 0);

const $$Astro = createAstro("https://francescovigni.com");
const $$Close = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Close;
  const { locale } = Astro2.props;
  const contactHref = locale === "it" ? "/it/contatti/" : "/contact/";
  return renderTemplate`${maybeRenderHead()}<section class="wrap py-20 sm:py-28"> <div class="max-w-prose"> <h2 class="display text-3xl sm:text-4xl">${pick(close.title, locale)}</h2> <p class="lead mt-4 text-lg">${pick(close.body, locale)}</p> <div class="mt-8 flex flex-wrap items-center gap-3"> <a${addAttribute(contactHref, "href")} class="btn-primary"> ${pick(hero.primary, locale)} <span aria-hidden="true">→</span> </a> <a${addAttribute(hero.cvHref, "href")} class="btn-ghost" download>${pick(hero.secondary, locale)}</a> </div> </div> </section>`;
}, "/Users/fra/Tech/new-home/src/components/Close.astro", void 0);

export { $$Hero as $, $$Pillars as a, $$Pedigree as b, $$WaysToWork as c, $$Proof as d, $$Trust as e, $$Close as f };
