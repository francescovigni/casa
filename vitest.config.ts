/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

// Astro's own Vite config, so tests can import and render `.astro` components
// through the container API. CSS is left unprocessed: nothing under test styles.
export default getViteConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
