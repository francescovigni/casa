import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_DHcPpfwo.mjs';
import 'piccolore';
import 'clsx';
import { p as pick } from './i18n_ClCD8eWO.mjs';

const $$Astro = createAstro("https://francescovigni.com");
const $$ProjectStory = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectStory;
  const { project, locale } = Astro2.props;
  const labels = {
    en: { context: "Context", constraints: "Constraints", did: "What I did", outcome: "Outcome" },
    it: { context: "Contesto", constraints: "Vincoli", did: "Cosa ho fatto", outcome: "Risultato" }
  }[locale];
  const rows = [
    { k: labels.context, v: pick(project.context, locale) },
    { k: labels.constraints, v: pick(project.constraints, locale) },
    { k: labels.did, v: pick(project.whatIDid, locale) },
    { k: labels.outcome, v: pick(project.outcome, locale) }
  ];
  return renderTemplate`${maybeRenderHead()}<article class="border-t border-line py-10 first:border-t-0"> <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"> <h2 class="font-serif text-2xl text-ink"> ${project.link ? renderTemplate`<a${addAttribute(project.link, "href")} target="_blank" rel="noopener" class="hover:text-accent"> ${project.title} </a>` : project.title} </h2> <span class="kicker text-accent">${project.category}</span> </div> <ul class="mt-3 flex flex-wrap gap-1.5"> ${project.tags.map((tag) => renderTemplate`<li class="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-faint">${tag}</li>`)} </ul> <dl class="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2"> ${rows.map((r) => renderTemplate`<div> <dt class="kicker mb-1">${r.k}</dt> <dd class="text-sm leading-relaxed text-muted">${r.v}</dd> </div>`)} </dl> </article>`;
}, "/Users/fra/Tech/new-home/src/components/ProjectStory.astro", void 0);

export { $$ProjectStory as $ };
