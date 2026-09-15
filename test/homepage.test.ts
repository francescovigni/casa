import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Hero from "../src/components/Hero.astro";
import Story from "../src/components/Story.astro";
import Proof from "../src/components/Proof.astro";
import ResearchTeaser from "../src/components/ResearchTeaser.astro";
import { story } from "../src/data/home";

const SRC = join(import.meta.dirname, "..", "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");
const container = await AstroContainer.create();
const render = (Component: Parameters<typeof container.renderToString>[0], props = {}) =>
  container.renderToString(Component, { props });

/** Section components rendered by a page, in document order. */
const sectionsOf = (page: string): string[] =>
  [...read(page).matchAll(/^\s*<([A-Z][A-Za-z]*)\s[^>]*\/>/gm)]
    .map((m) => m[1])
    .filter((name) => name !== "PersonJsonLd");

const HOMEPAGES = ["pages/index.astro", "pages/it/index.astro"];

describe("homepage composition", () => {
  it("runs seven sections, evidence and research before the ask", () => {
    HOMEPAGES.forEach((page) => {
      expect(sectionsOf(page)).toEqual([
        "Hero",
        "Pedigree",
        "Pillars",
        "Proof",
        "ResearchTeaser",
        "Story",
        "Qualifier",
      ]);
    });
  });

  it("drops the sections that duplicated the qualifier", () => {
    HOMEPAGES.forEach((page) => {
      const source = read(page);
      expect(source).not.toContain("WaysToWork");
      expect(source).not.toContain("Close");
      expect(source).not.toContain("Trust");
    });
  });

  it("deletes the components nothing renders any more", () => {
    ["WaysToWork", "Close"].forEach((name) => {
      expect(existsSync(join(SRC, "components", `${name}.astro`))).toBe(false);
    });
  });

  it("keeps the trust badges, on the contact pages where a form is about to be filled", () => {
    ["pages/contact.astro", "pages/it/contatti.astro"].forEach((page) => {
      expect(read(page)).toContain("Trust");
    });
  });
});

describe("hero", () => {
  it("has no counter strip", async () => {
    const html = await render(Hero, { locale: "en" });
    expect(html).not.toContain("data-count");
    expect(html).not.toMatch(/peer-reviewed|papers|countries/i);
  });

  it("does not narrow the page to a job hunt", async () => {
    // Double funnel: a company with a problem and a recruiter should both see
    // themselves here, so the hero pitches neither.
    const en = (await render(Hero, { locale: "en" })).toLowerCase();
    const it = (await render(Hero, { locale: "it" })).toLowerCase();
    expect(en).not.toMatch(/looking for a (full-time |stable )?role/);
    expect(it).not.toMatch(/cerco un ruolo/);
  });

  it("speaks to research and production in the same breath", async () => {
    const en = (await render(Hero, { locale: "en" })).toLowerCase();
    expect(en).toContain("research");
    expect(en).toContain("production");
  });

  it("shows the headshot above the fold, eagerly", async () => {
    const html = await render(Hero, { locale: "en" });
    expect(html).toContain("<img");
    expect(html).toMatch(/<img[^>]+src="[^"]*francesco[^"]*"/);
    expect(html).toContain('loading="eager"');
  });

  it("gives the portrait a two-column layout to sit in", async () => {
    expect(await render(Hero, { locale: "en" })).toMatch(/lg:grid-cols-/);
  });

  it("keeps both calls to action", async () => {
    const html = await render(Hero, { locale: "en" });
    expect(html).toContain('href="/contact/"');
    expect(html).toContain("Francesco-Vigni-CV.pdf");
  });
});

describe("story", () => {
  it("drops its portrait where the hero already shows one", () => {
    HOMEPAGES.forEach((page) => expect(read(page)).toMatch(/<Story[^>]*portrait=\{false\}/));
  });

  it("keeps the portrait on the work pages, which have no hero", () => {
    ["pages/work.astro", "pages/it/lavoro.astro"].forEach((page) =>
      expect(read(page)).not.toMatch(/<Story[^>]*portrait=/),
    );
  });

  it("renders the portrait by default and omits it on request", async () => {
    expect(await render(Story, { locale: "en" })).toContain("<img");
    expect(await render(Story, { locale: "en", portrait: false })).not.toContain("<img");
  });

  it("renders every paragraph by default", async () => {
    const html = await render(Story, { locale: "en" });
    expect(html.match(/<p class="text-\[15px\]/g)).toHaveLength(story.paragraphs.en.length);
  });

  it("honours a limit, so the homepage can run short without forking the copy", async () => {
    const html = await render(Story, { locale: "en", limit: 2 });
    expect(html.match(/<p class="text-\[15px\]/g)).toHaveLength(2);
  });

  it("keeps the first paragraphs rather than an arbitrary slice", async () => {
    const html = await render(Story, { locale: "en", limit: 2 });
    expect(html).toContain("Siena");
    expect(html).not.toContain("Forlì");
  });

  it("is limited on the homepage and complete on the work pages", () => {
    HOMEPAGES.forEach((page) => expect(read(page)).toMatch(/<Story[^>]*limit=\{2\}/));
    ["pages/work.astro", "pages/it/lavoro.astro"].forEach((page) => {
      expect(read(page)).toMatch(/<Story\b/);
      expect(read(page)).not.toMatch(/<Story[^>]*limit=/);
    });
  });
});

describe("research teaser", () => {
  it("leads with testing what a model learned, not with training it", async () => {
    const html = await render(ResearchTeaser, { locale: "en" });
    expect(html).toContain("test what they");
  });

  it("carries both headline numbers and links into the studies", async () => {
    const html = await render(ResearchTeaser, { locale: "en" });
    expect(html).toContain("0.28°");
    expect(html).toContain("0.961");
    expect(html).toContain('href="/research/fetal-cardiac-orientation/"');
    expect(html).toContain('href="/research/endoscopy-standardization/"');
    expect(html).toContain('href="/research/"');
  });

  it("tells Italian readers the research is in English rather than hiding it", async () => {
    const html = await render(ResearchTeaser, { locale: "it" });
    expect(html).toContain('href="/research/"');
    expect(html).toMatch(/in inglese/i);
  });
});

describe("proof", () => {
  it("links the research index as well as the work page", async () => {
    const html = await render(Proof, { locale: "en" });
    expect(html).toContain('href="/work/"');
    expect(html).toContain('href="/research/"');
  });

  it("links Italian readers to the Italian work page, research staying English", async () => {
    const html = await render(Proof, { locale: "it" });
    expect(html).toContain('href="/it/lavoro/"');
    expect(html).toContain('href="/research/"');
  });
});
