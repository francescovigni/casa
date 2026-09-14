import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Hero from "../src/components/Hero.astro";
import { hero } from "../src/data/home";
import { personJsonLd } from "../src/data/person";

const SRC = join(import.meta.dirname, "..", "src");
const container = await AstroContainer.create();
const render = (locale: "en" | "it") => container.renderToString(Hero, { props: { locale } });
/** Rendered text as a reader sees it: tags stripped, entities decoded, space collapsed. */
const visibleText = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

function sourceFiles(dir = SRC): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(astro|ts)$/.test(entry.name) ? [full] : [];
  });
}

describe("hero tagline", () => {
  it("is localised data, not a string baked into the component", () => {
    expect(hero.tagline).toEqual({ en: "High-Tech Artisan", it: "Artigiano hi-tech" });
  });

  it("renders after the greeting, separated by a middle dot", async () => {
    expect(visibleText(await render("en"))).toContain(
      "Hi, I'm Francesco 👋 · High-Tech Artisan",
    );
  });

  it("renders the Italian tagline on the Italian page", async () => {
    const text = visibleText(await render("it"));
    expect(text).toContain("Ciao, sono Francesco 👋 · Artigiano hi-tech");
    // The old component hardcoded the English role, so /it/ showed English here.
    expect(text).not.toContain("Researcher");
    expect(text).not.toContain("Engineer");
  });

  it("replaces the old role line rather than appending to it", async () => {
    expect(await render("en")).not.toContain("AI Researcher");
  });

  it("uses the hyphenated English spelling everywhere in src", () => {
    const offenders = sourceFiles().filter((file) =>
      /Hightech|HighTech|high tech/i.test(readFileSync(file, "utf8")),
    );
    expect(offenders).toEqual([]);
  });
});

describe("machine-read fields stay literal", () => {
  it("keeps the schema.org jobTitle free of the tagline", () => {
    (["en", "it"] as const).forEach((locale) => {
      const json = JSON.stringify(personJsonLd(locale));
      expect(json).not.toMatch(/artisan|artigiano/i);
    });
    expect(personJsonLd("en").jobTitle).toBe("AI Researcher and Engineer");
    expect(personJsonLd("it").jobTitle).toBe("Ricercatore e Ingegnere AI");
  });

  it("keeps the homepage <title> tags on the searchable role words", () => {
    const en = readFileSync(join(SRC, "pages", "index.astro"), "utf8");
    const it = readFileSync(join(SRC, "pages", "it", "index.astro"), "utf8");
    expect(en).toContain('title="Francesco Vigni, PhD | AI Researcher & Engineer"');
    expect(it).toContain('title="Francesco Vigni, PhD | Ricercatore e Ingegnere AI"');
  });

  it("never puts the tagline in a title or meta description", () => {
    sourceFiles()
      .filter((file) => file.endsWith(".astro"))
      .forEach((file) => {
        const source = readFileSync(file, "utf8");
        const metaLines = source
          .split("\n")
          .filter((line) => /title=|description=|<title>/.test(line));
        metaLines.forEach((line) => expect(line).not.toMatch(/artisan|artigiano/i));
      });
  });
});
