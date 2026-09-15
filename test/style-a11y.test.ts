import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Header from "../src/components/Header.astro";
import ResearchCard from "../src/components/ResearchCard.astro";
import { research } from "../src/data/research";
import config from "../tailwind.config.mjs";

const SRC = join(import.meta.dirname, "..", "src");
const container = await AstroContainer.create();
const colors = (config.theme?.extend?.colors ?? {}) as Record<string, string | Record<string, string>>;

const channel = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => channel(parseInt(h.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

function sourceFiles(dir = SRC): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(astro|css)$/.test(entry.name) ? [full] : [];
  });
}

describe("colour tokens meet WCAG AA", () => {
  const canvas = colors.canvas as string;

  it.each([
    ["ink", 4.5],
    ["muted", 4.5],
    // Kickers, captions and the pedigree strip are all text, so 4.5 applies.
    ["faint", 4.5],
  ])("%s reaches %s:1 on canvas", (token, minimum) => {
    expect(contrast(colors[token] as string, canvas)).toBeGreaterThanOrEqual(minimum);
  });

  it("both accent shades are readable as text on canvas", () => {
    const accent = colors.accent as Record<string, string>;
    expect(contrast(accent.DEFAULT, canvas)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(accent.soft, canvas)).toBeGreaterThanOrEqual(4.5);
  });

  it("the canvas stays readable behind inverted buttons", () => {
    expect(contrast(canvas, colors.ink as string)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("no colours outside the token set", () => {
  it("nothing hardcodes a hex value in arbitrary-value syntax", () => {
    const offenders = sourceFiles()
      .filter((file) => /(?:bg|text|border)-\[#[0-9a-f]{3,8}\]/i.test(readFileSync(file, "utf8")))
      .map((file) => file.replace(`${SRC}/`, ""));
    expect(offenders).toEqual([]);
  });
});

describe("header navigation", () => {
  const render = (locale: "en" | "it", pathname = "/") =>
    container.renderToString(Header, { props: { locale, pathname } });

  it("keeps every destination reachable at phone width", async () => {
    const html = await render("en");
    // The links used to be `hidden sm:inline` with no menu button behind them.
    const navLinks = html.match(/<a[^>]*href="\/(work|contact)\/"[^>]*>/g) ?? [];
    expect(navLinks.length).toBeGreaterThan(0);
    navLinks.forEach((link) => expect(link).not.toMatch(/\bhidden\b(?![^"]*\bflex\b)/));
  });

  it("offers a labelled disclosure control for the small-screen menu", async () => {
    const html = await render("en");
    expect(html).toMatch(/<button[^>]*aria-expanded="false"/);
    expect(html).toMatch(/<button[^>]*aria-controls="([^"]+)"/);
    const id = html.match(/aria-controls="([^"]+)"/)?.[1];
    expect(html).toContain(`id="${id}"`);
    expect(html).toMatch(/<button[^>]*aria-label="[^"]+"/);
  });

  it("localises the menu control label", async () => {
    expect(await render("it")).toMatch(/aria-label="(Apri|Chiudi)[^"]*"/);
  });

  it("puts research in the English nav", async () => {
    expect(await render("en")).toContain('href="/research/"');
  });

  it("keeps research in the Italian nav too, labelled as English", async () => {
    // The pages stay English-only; hiding the entry hid the strongest part of
    // the site from Italian readers instead of setting their expectation.
    const html = await render("it");
    expect(html).toContain('href="/research/"');
    expect(html).toMatch(/Research \(EN\)/);
    expect(html).toMatch(/hreflang="en"/);
  });
});

describe("research card headings", () => {
  const study = research[0];
  const render = (props: Record<string, unknown>) =>
    container.renderToString(ResearchCard, { props: { study, ...props } });

  it("puts the finding in the heading, not the category", async () => {
    const html = await render({});
    const heading = html.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/)?.[1] ?? "";
    expect(heading).not.toContain(study.eyebrow);
    expect(heading.replace(/<[^>]*>/g, "")).toContain("96%");
  });

  it("keeps the category as an eyebrow paragraph", async () => {
    const html = await render({});
    expect(html).toMatch(new RegExp(`<p[^>]*research-eyebrow[^>]*>\\s*${study.eyebrow}`));
  });

  it("defaults to h2 and drops to h3 under a section heading", async () => {
    expect(await render({})).toMatch(/<h2\b/);
    expect(await render({ level: 3 })).toMatch(/<h3\b/);
    expect(await render({ level: 3 })).not.toMatch(/<h2\b/);
  });

  it("the work page nests its cards a level down", () => {
    expect(readFileSync(join(SRC, "pages", "work.astro"), "utf8")).toMatch(
      /<ResearchCard[^>]*level=\{3\}/,
    );
  });
});
