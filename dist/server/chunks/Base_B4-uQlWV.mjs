import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, l as renderScript, n as renderSlot, o as renderHead, k as renderComponent } from './astro/server_DHcPpfwo.mjs';
import 'piccolore';
/* empty css                           */
import 'clsx';
import { u as ui, g as getCounterpart, l as localeFromPath } from './i18n_ClCD8eWO.mjs';

const $$Astro$2 = createAstro("https://francescovigni.com");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const { locale, pathname } = Astro2.props;
  const t = ui[locale];
  const base = locale === "it" ? "/it" : "";
  const nav = [
    { href: `${base}/`, label: t.nav.home },
    { href: locale === "it" ? "/it/lavoro/" : "/work/", label: t.nav.work },
    { href: locale === "it" ? "/it/contatti/" : "/contact/", label: t.nav.contact }
  ];
  const toggleHref = getCounterpart(pathname, locale === "it" ? "en" : "it");
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur"> <div class="wrap flex h-16 items-center justify-between"> <a${addAttribute(`${base}/`, "href")} class="font-serif text-lg font-medium tracking-tight text-ink">
Francesco&nbsp;Vigni
</a> <nav class="flex items-center gap-6" aria-label="Primary"> ${nav.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="link-underline hidden text-sm font-medium text-muted transition-colors hover:text-ink sm:inline"> ${item.label} </a>`)} <a${addAttribute(toggleHref, "href")}${addAttribute(locale === "it" ? "en" : "it", "data-lang-set")}${addAttribute(t.toggle.aria, "aria-label")} class="rounded-full border border-line px-3 py-1 text-xs font-semibold text-faint transition-colors hover:border-ink hover:text-ink"> ${t.toggle.code} </a> </nav> </div> </header> ${renderScript($$result, "/Users/fra/Tech/new-home/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/fra/Tech/new-home/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro("https://francescovigni.com");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const { locale } = Astro2.props;
  const year = 2026;
  const privacyHref = locale === "it" ? "/it/privacy/" : "/privacy/";
  const links = [
    { href: "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en", label: "Google Scholar" },
    { href: "https://www.linkedin.com/in/francesco-vigni/", label: "LinkedIn" },
    { href: "https://github.com/francescovigni", label: "GitHub" },
    { href: "https://orcid.org/0000-0001-9918-8485", label: "ORCID" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="mt-24 border-t border-line"> <div class="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between"> <div class="text-sm text-faint"> <p class="font-serif text-base text-ink">Francesco Vigni, PhD</p> <p class="mt-1">
© ${year} ·
<a${addAttribute(privacyHref, "href")} class="underline-offset-2 hover:underline"> ${locale === "it" ? "Privacy" : "Privacy"} </a>
·
<a href="mailto:hello@francescovigni.com" class="underline-offset-2 hover:underline">hello@francescovigni.com</a> </p> </div> <nav class="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Elsewhere"> ${links.map((l) => renderTemplate`<a${addAttribute(l.href, "href")} rel="me noopener" target="_blank" class="link-underline text-muted transition-colors hover:text-ink"> ${l.label} </a>`)} </nav> </div> </footer>`;
}, "/Users/fra/Tech/new-home/src/components/Footer.astro", void 0);

const $$Motion = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/fra/Tech/new-home/src/components/Motion.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/fra/Tech/new-home/src/components/Motion.astro", void 0);

const $$Astro = createAstro("https://francescovigni.com");
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const { title, description, ogImage = "/og-default.jpg" } = Astro2.props;
  const pathname = Astro2.url.pathname;
  const locale = localeFromPath(pathname);
  const canonical = new URL(pathname, Astro2.site).href;
  const enHref = new URL(locale === "en" ? pathname : getCounterpart(pathname, "en"), Astro2.site).href;
  const itHref = new URL(locale === "it" ? pathname : getCounterpart(pathname, "it"), Astro2.site).href;
  return renderTemplate`<html${addAttribute(locale, "lang")} class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><link rel="alternate" hreflang="en"${addAttribute(enHref, "href")}><link rel="alternate" hreflang="it"${addAttribute(itHref, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(enHref, "href")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:image"${addAttribute(new URL(ogImage, Astro2.site).href, "content")}><meta property="og:locale"${addAttribute(locale === "it" ? "it_IT" : "en_US", "content")}><meta name="twitter:card" content="summary_large_image">${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body> <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas">Skip to content</a> ${renderComponent($$result, "Header", $$Header, { "locale": locale, "pathname": pathname })} <main id="main"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "locale": locale })} ${renderComponent($$result, "Motion", $$Motion, {})} </body></html>`;
}, "/Users/fra/Tech/new-home/src/layouts/Base.astro", void 0);

export { $$Base as $ };
