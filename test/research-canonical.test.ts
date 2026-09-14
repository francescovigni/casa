import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { research } from "../src/data/research";

const SRC = join(import.meta.dirname, "..", "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");

/** Every .astro/.ts file under src/, so invariants cannot be dodged by a new page. */
function sourceFiles(dir = SRC): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(astro|ts)$/.test(entry.name) ? [full] : [];
  });
}

describe("portfolio subdomain is referenced from one place", () => {
  // Prose may name the host ("ported from portfolio.francescovigni.com"); only a
  // linkable url — the one carrying the scheme — has to come from SITE.
  it("only src/data/site.ts hardcodes the subdomain url", () => {
    const offenders = sourceFiles()
      .filter((file) => !file.endsWith(join("data", "site.ts")))
      .filter((file) =>
        readFileSync(file, "utf8").includes("https://portfolio.francescovigni.com"),
      );
    expect(offenders).toEqual([]);
  });
});

describe("/research/ stays the canonical destination", () => {
  it("the work page sends readers to the internal research index", () => {
    expect(read("pages/work.astro")).toContain('href="/research/"');
  });

  it("research cards link to internal detail pages, never off-site", () => {
    const card = read("components/ResearchCard.astro");
    expect(card).toContain("`/research/${study.slug}/`");
    expect(card).not.toContain("portfolio.francescovigni.com");
  });

  it("every study has an internal detail page on disk", () => {
    const pages = readdirSync(join(SRC, "pages", "research"));
    research.forEach((study) => {
      expect(pages).toContain(`${study.slug}.astro`);
    });
  });

  it("detail pages point back to the internal index", () => {
    research.forEach((study) => {
      expect(read(`pages/research/${study.slug}.astro`)).toContain('href="/research/"');
    });
  });

  it("no page declares a cross-domain canonical", () => {
    sourceFiles()
      .filter((file) => file.endsWith(".astro"))
      .forEach((file) => {
        const html = readFileSync(file, "utf8");
        if (html.includes('rel="canonical"')) {
          expect(html).not.toContain("portfolio.francescovigni.com");
        }
      });
  });
});

describe("the portfolio reference is actually on the pages", () => {
  it("the research index carries the full note", () => {
    const page = read("pages/research/index.astro");
    expect(page).toContain("PortfolioNote");
    expect(page).toMatch(/<PortfolioNote\b(?![^>]*variant="inline")/);
  });

  it("the work page carries the inline note in its research section", () => {
    const page = read("pages/work.astro");
    expect(page).toContain("PortfolioNote");
    expect(page).toMatch(/<PortfolioNote[^>]*variant="inline"/);
    // Inside the research section, not stranded at the bottom of the page.
    const researchSection = page.slice(
      page.indexOf("Research, on public data"),
      page.indexOf("Deployment stories"),
    );
    expect(researchSection).toContain("PortfolioNote");
  });
});

describe("Person JSON-LD is emitted where search engines look for it", () => {
  it("both homepages render it", () => {
    expect(read("pages/index.astro")).toContain("PersonJsonLd");
    expect(read("pages/it/index.astro")).toContain("PersonJsonLd");
  });

  it("the research index renders it too, tying the subdomain to the entity", () => {
    expect(read("pages/research/index.astro")).toContain("PersonJsonLd");
  });

  it("it is injected into <head>, not the body", () => {
    ["pages/index.astro", "pages/it/index.astro", "pages/research/index.astro"].forEach((page) => {
      expect(read(page)).toMatch(/<PersonJsonLd[^>]*slot="head"/);
    });
  });
});
