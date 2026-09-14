import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import { includeInSitemap } from "./src/lib/sitemap";
import tailwind from "@astrojs/tailwind";

// Hybrid: pages are static by default (`export const prerender = true`),
// the geo middleware + /api/lead run on the Node server.
export default defineConfig({
  site: "https://francescovigni.com",
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [tailwind({ applyBaseStyles: false }), sitemap({ filter: includeInSitemap })],
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false, // EN at /, IT at /it/
      redirectToDefaultLocale: false,
    },
  },
  prefetch: { prefetchAll: true },
  // /portfolio was a real path on the old site and is the obvious guess for
  // anyone who knows the portfolio subdomain; it lands on the canonical index.
  // Declared once: trailingSlash stays on Astro's default "ignore", so
  // /portfolio and /portfolio/ both match this route.
  redirects: {
    "/portfolio": { status: 301, destination: "/research/" },
  },
});
