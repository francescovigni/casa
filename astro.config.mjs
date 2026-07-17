import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

// Hybrid: pages are static by default (`export const prerender = true`),
// the geo middleware + /api/lead run on the Node server.
export default defineConfig({
  site: "https://francescovigni.com",
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [tailwind({ applyBaseStyles: false })],
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false, // EN at /, IT at /it/
      redirectToDefaultLocale: false,
    },
  },
  prefetch: { prefetchAll: true },
});
