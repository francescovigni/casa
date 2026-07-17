import { f as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_DHcPpfwo.mjs';
import 'piccolore';
import { $ as $$Base } from '../chunks/Base_B4-uQlWV.mjs';
import { $ as $$Hero, a as $$Pillars, b as $$Pedigree, c as $$WaysToWork, d as $$Proof, e as $$Trust, f as $$Close } from '../chunks/Close_Bf8tnY-6.mjs';
import { $ as $$Qualifier } from '../chunks/Qualifier_D9Eguz4z.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Francesco Vigni, PhD \u2014 AI Researcher & Engineer", "description": "Engineer and researcher building machine learning that survives deployment \u2014 medical-imaging foundation models, robotics, and the infrastructure to run it in production. Open to research, engineering, and infrastructure roles." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "locale": "en" })} ${renderComponent($$result2, "Pillars", $$Pillars, { "locale": "en" })} ${renderComponent($$result2, "Pedigree", $$Pedigree, { "locale": "en" })} ${renderComponent($$result2, "WaysToWork", $$WaysToWork, { "locale": "en" })} ${renderComponent($$result2, "Qualifier", $$Qualifier, { "locale": "en" })} ${renderComponent($$result2, "Proof", $$Proof, { "locale": "en" })} ${renderComponent($$result2, "Trust", $$Trust, { "locale": "en" })} ${renderComponent($$result2, "Close", $$Close, { "locale": "en" })} ` })}`;
}, "/Users/fra/Tech/new-home/src/pages/index.astro", void 0);

const $$file = "/Users/fra/Tech/new-home/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
