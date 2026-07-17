import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, l as renderScript } from './astro/server_DHcPpfwo.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://francescovigni.com");
const $$Qualifier = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Qualifier;
  const { locale, variant = "section" } = Astro2.props;
  const t = {
    en: {
      kicker: "Is this a fit?",
      title: "Tell me what brings you here.",
      lead: "One tap routes you to the right next step.",
      intents: [
        { id: "hiring", label: "Hiring for a role", qualified: true },
        { id: "collaboration", label: "Research collaboration", qualified: true },
        { id: "project", label: "A project or consulting", qualified: true },
        { id: "exploring", label: "Just exploring", qualified: false }
      ],
      form: {
        name: "Your name",
        email: "Email",
        org: "Organization (optional)",
        message: "A sentence or two on what you have in mind",
        send: "Send",
        sending: "Sending\u2026",
        back: "\u2190 change"
      },
      explore: {
        title: "No pitch \u2014 just have a look.",
        body: "Here's my work, my research, and a way to reach me directly.",
        links: [
          { label: "Download CV", href: "/Francesco-Vigni-CV.pdf" },
          { label: "Google Scholar", href: "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en" },
          { label: "Email me", href: "mailto:hello@francescovigni.com" }
        ]
      },
      ok: "Thanks \u2014 I've got it and I'll reply personally, usually within a day or two.",
      err: "Something went wrong. Please email hello@francescovigni.com and I'll come straight back to you."
    },
    it: {
      kicker: "C'\xE8 un match?",
      title: "Dimmi cosa ti porta qui.",
      lead: "Un tap ti indirizza al passo giusto.",
      intents: [
        { id: "hiring", label: "Sto assumendo per un ruolo", qualified: true },
        { id: "collaboration", label: "Collaborazione di ricerca", qualified: true },
        { id: "project", label: "Un progetto o consulenza", qualified: true },
        { id: "exploring", label: "Sto solo esplorando", qualified: false }
      ],
      form: {
        name: "Il tuo nome",
        email: "Email",
        org: "Organizzazione (facoltativo)",
        message: "Una o due frasi su cosa hai in mente",
        send: "Invia",
        sending: "Invio\u2026",
        back: "\u2190 cambia"
      },
      explore: {
        title: "Nessun pitch \u2014 dai un'occhiata.",
        body: "Ecco il mio lavoro, la mia ricerca e un modo per contattarmi direttamente.",
        links: [
          { label: "Scarica il CV", href: "/Francesco-Vigni-CV.pdf" },
          { label: "Google Scholar", href: "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en" },
          { label: "Scrivimi", href: "mailto:hello@francescovigni.com" }
        ]
      },
      ok: "Grazie \u2014 ho ricevuto e ti rispondo personalmente, di solito entro un paio di giorni.",
      err: "Qualcosa \xE8 andato storto. Scrivimi a hello@francescovigni.com e ti rispondo subito."
    }
  }[locale];
  const dark = variant === "section";
  return renderTemplate`${maybeRenderHead()}<section${addAttribute([variant === "section" ? "wrap py-16 sm:py-20" : ""], "class:list")}> <div${addAttribute([
    "rounded-2xl p-8 sm:p-10",
    dark ? "bg-ink text-canvas" : "border border-line bg-canvas"
  ], "class:list")} data-qualifier${addAttribute(locale, "data-locale")}> <p${addAttribute(["kicker mb-3", dark ? "text-canvas/60" : ""], "class:list")}>${t.kicker}</p> <h2${addAttribute(["display text-2xl sm:text-3xl", dark ? "text-canvas" : ""], "class:list")}>${t.title}</h2> <p${addAttribute(["mt-3 text-sm", dark ? "text-canvas/70" : "text-muted"], "class:list")}>${t.lead}</p>  <div class="mt-7 flex flex-wrap gap-2.5" data-step="intent"> ${t.intents.map((intent) => renderTemplate`<button type="button"${addAttribute(intent.id, "data-intent")}${addAttribute(String(intent.qualified), "data-qualified")}${addAttribute([
    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
    dark ? "border-canvas/25 text-canvas hover:border-accent hover:bg-accent hover:text-canvas" : "border-line text-ink hover:border-accent hover:text-accent"
  ], "class:list")}> ${intent.label} </button>`)} </div>  <form class="mt-7 hidden" data-step="form"${addAttribute(t.form.sending, "data-sending")} novalidate> <button type="button" data-back${addAttribute(["mb-4 text-xs font-semibold", dark ? "text-canvas/60 hover:text-canvas" : "text-faint hover:text-ink"], "class:list")}>${t.form.back}</button> <input type="hidden" name="intent" value=""> <input type="hidden" name="locale"${addAttribute(locale, "value")}>  <input type="text" name="company_website" tabindex="-1" autocomplete="off" class="absolute left-[-9999px]" aria-hidden="true"> <div class="grid gap-3 sm:grid-cols-2"> <input required name="name"${addAttribute(t.form.name, "placeholder")}${addAttribute(["rounded-md border px-4 py-3 text-sm", dark ? "border-canvas/20 bg-canvas/5 text-canvas placeholder:text-canvas/40" : "border-line bg-canvas text-ink"], "class:list")}> <input required type="email" name="email"${addAttribute(t.form.email, "placeholder")}${addAttribute(["rounded-md border px-4 py-3 text-sm", dark ? "border-canvas/20 bg-canvas/5 text-canvas placeholder:text-canvas/40" : "border-line bg-canvas text-ink"], "class:list")}> </div> <input name="org"${addAttribute(t.form.org, "placeholder")}${addAttribute(["mt-3 w-full rounded-md border px-4 py-3 text-sm", dark ? "border-canvas/20 bg-canvas/5 text-canvas placeholder:text-canvas/40" : "border-line bg-canvas text-ink"], "class:list")}> <textarea required name="message" rows="3"${addAttribute(t.form.message, "placeholder")}${addAttribute(["mt-3 w-full rounded-md border px-4 py-3 text-sm", dark ? "border-canvas/20 bg-canvas/5 text-canvas placeholder:text-canvas/40" : "border-line bg-canvas text-ink"], "class:list")}></textarea> <button type="submit"${addAttribute(["btn mt-4", dark ? "bg-accent text-canvas" : "bg-ink text-canvas"], "class:list")} data-submit> <span data-label>${t.form.send}</span> </button> </form>  <div class="mt-7 hidden" data-step="explore"> <button type="button" data-back${addAttribute(["mb-4 text-xs font-semibold", dark ? "text-canvas/60 hover:text-canvas" : "text-faint hover:text-ink"], "class:list")}>${t.form.back}</button> <h3${addAttribute(["font-serif text-xl", dark ? "text-canvas" : "text-ink"], "class:list")}>${t.explore.title}</h3> <p${addAttribute(["mt-2 text-sm", dark ? "text-canvas/70" : "text-muted"], "class:list")}>${t.explore.body}</p> <div class="mt-4 flex flex-wrap gap-2.5"> ${t.explore.links.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(["rounded-full border px-4 py-2 text-sm font-medium", dark ? "border-canvas/25 text-canvas hover:bg-canvas hover:text-ink" : "border-line text-ink hover:border-accent hover:text-accent"], "class:list")}> ${l.label} </a>`)} </div> </div>  <p class="mt-6 hidden text-sm font-medium text-green-400" data-ok>${t.ok}</p> <p class="mt-6 hidden text-sm font-medium text-accent-soft" data-err>${t.err}</p> </div> </section> ${renderScript($$result, "/Users/fra/Tech/new-home/src/components/Qualifier.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/fra/Tech/new-home/src/components/Qualifier.astro", void 0);

export { $$Qualifier as $ };
