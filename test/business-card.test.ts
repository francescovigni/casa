import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Base from "../src/layouts/Base.astro";
import { includeInSitemap } from "../src/lib/sitemap";
import { SITE } from "../src/data/site";
import { pedigree, hero } from "../src/data/home";
import { personJsonLd } from "../src/data/person";

const SRC = join(import.meta.dirname, "..", "src");
const page = readFileSync(join(SRC, "pages", "bc.astro"), "utf8");
const container = await AstroContainer.create();

describe("the QR destination", () => {
  // The URL is printed on physical cards: it cannot move.
  it("lives at /bc", () => {
    expect(page.length).toBeGreaterThan(0);
  });

  it("is prerendered, so it survives without the SSR server", () => {
    expect(page).toMatch(/export const prerender = true/);
  });

  it("is left out of the sitemap, as it was on the Gatsby site", () => {
    expect(includeInSitemap(`${SITE.url}/bc/`)).toBe(false);
    expect(includeInSitemap(`${SITE.url}/bc`)).toBe(false);
  });

  it("keeps every other page in the sitemap", () => {
    ["/", "/work/", "/research/", "/contact/", "/it/", "/privacy/"].forEach((path) =>
      expect(includeInSitemap(`${SITE.url}${path}`)).toBe(true),
    );
  });
});

describe("the card is not indexed", () => {
  it("asks robots to stay away", () => {
    expect(page).toMatch(/noindex/);
  });

  it("the layout emits a robots meta when asked", async () => {
    const html = await container.renderToString(Base, {
      props: { title: "T", description: "D", noindex: true },
      slots: { default: "x" },
    });
    expect(html).toMatch(/<meta name="robots" content="noindex, follow">/);
  });

  it("and leaves it off every other page", async () => {
    const html = await container.renderToString(Base, {
      props: { title: "T", description: "D" },
      slots: { default: "x" },
    });
    expect(html).not.toContain('name="robots"');
  });
});

describe("the card stands alone", () => {
  it("renders without the site header and footer", () => {
    expect(page).toMatch(/bare/);
  });

  it("the layout can drop its chrome", async () => {
    const bare = await container.renderToString(Base, {
      props: { title: "T", description: "D", bare: true },
      slots: { default: "card" },
    });
    expect(bare).not.toContain("<header");
    expect(bare).not.toContain("<footer");
    expect(bare).toContain("card");
  });

  it("keeps the chrome everywhere else", async () => {
    const normal = await container.renderToString(Base, {
      props: { title: "T", description: "D" },
      slots: { default: "page" },
    });
    expect(normal).toContain("<header");
    expect(normal).toContain("<footer");
  });
});

describe("the card says what the rest of the site says", () => {
  it("carries the current role, not the retired consultant title", () => {
    expect(page).not.toMatch(/Medical AI Consultant/);
    // Read from the shared source rather than retyped, so it cannot drift.
    expect(page).toContain("personJsonLd");
    expect(personJsonLd("en").jobTitle).toBe("Applied AI and ML Engineer");
  });

  it("shows the tagline from the hero", () => {
    expect(page).toContain("hero.tagline");
    expect(hero.tagline.en).toBe("High-Tech Artisan");
  });

  it("reads its institutions from the shared pedigree list", () => {
    expect(page).toContain("pedigree");
    expect(pedigree).toContain("Disney Research");
  });

  it("reads its contact links from SITE", () => {
    expect(page).toContain("SITE");
    expect(page).not.toContain("https://www.linkedin.com");
    expect(page).not.toContain("mailto:hello@");
  });

  it("links back to the site it belongs to", () => {
    expect(page).toMatch(/href="\/"/);
  });
});

describe("the portrait ships", () => {
  // public/ is ignored, so the card sources its image from src/images, which is
  // tracked, and lets astro:assets fingerprint it.
  it("imports the tracked portrait rather than a public/ path", () => {
    expect(page).toMatch(/from "\.\.\/images\/bc_portrait\.webp"/);
    expect(page).not.toContain("/francesco.jpg");
  });

  it("uses astro:assets so the file is optimised and hashed", () => {
    expect(page).toMatch(/from "astro:assets"/);
  });
});
