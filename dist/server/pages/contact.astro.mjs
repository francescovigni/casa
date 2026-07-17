import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DHcPpfwo.mjs';
import 'piccolore';
import { $ as $$Base } from '../chunks/Base_B4-uQlWV.mjs';
import { $ as $$Qualifier } from '../chunks/Qualifier_D9Eguz4z.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Contact \u2014 Francesco Vigni, PhD", "description": "Get in touch about a role, a research collaboration, or a project. I reply personally." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-16"> <div> <p class="kicker mb-4">Contact</p> <h1 class="display text-4xl sm:text-5xl">Let's talk.</h1> <p class="lead mt-5 text-lg">
About a role, a research collaboration, or a scoped project. I reply personally, usually
        within a day or two.
</p> <dl class="mt-8 space-y-4 text-sm"> <div> <dt class="kicker mb-1">Email</dt> <dd><a href="mailto:hello@francescovigni.com" class="text-ink underline-offset-2 hover:underline">hello@francescovigni.com</a></dd> </div> <div> <dt class="kicker mb-1">Based in</dt> <dd class="text-muted">Forlì, Italy · open to relocation & remote</dd> </div> <div> <dt class="kicker mb-1">Elsewhere</dt> <dd class="text-muted"> <a href="https://www.linkedin.com/in/francesco-vigni/" class="hover:text-ink">LinkedIn</a> ·
<a href="https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en" class="hover:text-ink">Scholar</a> ·
<a href="https://github.com/francescovigni" class="hover:text-ink">GitHub</a> </dd> </div> </dl> </div> ${renderComponent($$result2, "Qualifier", $$Qualifier, { "locale": "en", "variant": "page" })} </section> ` })}`;
}, "/Users/fra/Tech/new-home/src/pages/contact.astro", void 0);

const $$file = "/Users/fra/Tech/new-home/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
