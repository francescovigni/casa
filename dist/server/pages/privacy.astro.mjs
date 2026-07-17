import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DHcPpfwo.mjs';
import 'piccolore';
import { $ as $$Base } from '../chunks/Base_B4-uQlWV.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Privacy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Privacy Policy \u2014 Francesco Vigni", "description": "How this website handles your data." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="wrap py-16 sm:py-20"> <p class="kicker mb-4">Legal</p> <h1 class="display text-4xl">Privacy Policy</h1> <p class="mt-2 text-sm text-faint">Last updated: 17 July 2026</p> <div class="legal mt-8"> <h2>Data controller</h2> <p>
This website is operated by Francesco Vigni, based in Forlì, Italy. You can reach me at
<a href="mailto:hello@francescovigni.com">hello@francescovigni.com</a>.
</p> <h2>Contact form</h2> <p>
When you submit the contact form, I process the name, email address, optional
        organization, and message you provide, together with the reason you selected (e.g.
        hiring, collaboration, project). This data is used solely to respond to your enquiry and,
        where relevant, to manage it in my customer-relationship system (self-hosted on EU
        infrastructure). If that system is unavailable, the submission is delivered to me by
        email instead so your message is not lost.
</p> <p>
The legal basis is your consent and the taking of steps at your request prior to
        entering into a relationship (Art. 6(1)(a) and 6(1)(b) GDPR). I keep enquiry data only as
        long as needed to follow up, and remove it on request.
</p> <h2>Cookies</h2> <p>
This site sets a single functional cookie, <code>lang</code>, to remember your language
        choice. It is strictly necessary for the site to work as you expect and requires no
        consent. No advertising or cross-site tracking cookies are used.
</p> <h2>Analytics</h2> <p>
This site does not currently use tracking-based analytics. Your approximate country may
        be derived from your IP address by the Cloudflare network in front of this site, solely
        to serve the site in Italian or English; this is transient and not stored.
</p> <h2>Your rights</h2> <p>
Under the GDPR you may request access to, correction of, or erasure of your data, and may
        object to or restrict its processing. To exercise any of these rights, email
<a href="mailto:hello@francescovigni.com">hello@francescovigni.com</a>. You also have the
        right to lodge a complaint with the Italian Data Protection Authority (Garante per la
        protezione dei dati personali).
</p> <h2>External links</h2> <p>
This site links to third-party services (for example Google Scholar, GitHub, LinkedIn,
        ORCID). When you follow such a link, the third party may receive your IP address and set
        its own cookies according to its own privacy policy.
</p> </div> </section> ` })}`;
}, "/Users/fra/Tech/new-home/src/pages/privacy.astro", void 0);

const $$file = "/Users/fra/Tech/new-home/src/pages/privacy.astro";
const $$url = "/privacy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
