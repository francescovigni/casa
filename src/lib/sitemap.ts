// Which URLs belong in the sitemap. Kept out of astro.config.mjs so the rule
// can be tested directly.
//
// /bc is the digital business card: the URL is printed on physical cards, so
// it has to keep working, but it is not a page search engines should surface.
const EXCLUDED = [/^\/bc\/?$/];

export function includeInSitemap(url: string): boolean {
  const path = new URL(url).pathname;
  return !EXCLUDED.some((pattern) => pattern.test(path));
}
