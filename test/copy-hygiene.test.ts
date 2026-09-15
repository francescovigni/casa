import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Pillars from "../src/components/Pillars.astro";
import { ui } from "../src/i18n";
import { SITE } from "../src/data/site";
import { hero, pillars } from "../src/data/home";

const SRC = join(import.meta.dirname, "..", "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");
const container = await AstroContainer.create();

function sourceFiles(dir = SRC): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(astro|ts)$/.test(entry.name) ? [full] : [];
  });
}
const relative = (file: string) => file.replace(`${SRC}/`, "");

describe("em dashes stay out", () => {
  // Removed site-wide on main in 54acc80 ("remove long dashes and AI-ish
  // phrasing"); the rebuild reintroduced 122 of them.
  it("no source file contains one", () => {
    const offenders = sourceFiles()
      .filter((file) => readFileSync(file, "utf8").includes("—"))
      .map(relative);
    expect(offenders).toEqual([]);
  });

  it("page titles separate with a pipe, the separator the live site uses", () => {
    sourceFiles()
      .filter((file) => file.includes("/pages/"))
      .forEach((file) => {
        const titles = readFileSync(file, "utf8").match(/title="[^"]*"/g) ?? [];
        titles.forEach((title) => expect(title).not.toMatch(/[—–]/));
      });
  });
});

describe("no internal notes facing visitors", () => {
  it("nothing is marked draft", () => {
    const offenders = sourceFiles()
      .filter((file) => /DRAFT COPY|redlines/i.test(readFileSync(file, "utf8")))
      .map(relative);
    expect(offenders).toEqual([]);
  });

  it("the 404 does not mention the site's rebuild", () => {
    expect(read("pages/404.astro").toLowerCase()).not.toContain("rebuild");
  });

  it("the 404 answers in the visitor's language", () => {
    const page = read("pages/404.astro");
    expect(page).toContain("localeFromPath");
    expect(page).toContain("/it/lavoro/");
  });
});

describe("dead strings are gone", () => {
  it("carries no cookie-banner copy, there being no analytics and no banner", () => {
    expect(ui.en).not.toHaveProperty("cookie");
    expect(ui.it).not.toHaveProperty("cookie");
    const offenders = sourceFiles()
      .filter((file) => /cookie banner|banner dei cookie/i.test(readFileSync(file, "utf8")))
      .map(relative);
    expect(offenders).toEqual([]);
  });

  it("ships no analytics script while the privacy page says there is none", () => {
    const offenders = sourceFiles()
      .filter((file) =>
        /<script[^>]+src=["'][^"']*(umami|googletagmanager|recorder\.js)|gtag\(/i.test(
          readFileSync(file, "utf8"),
        ),
      )
      .map(relative);
    expect(offenders).toEqual([]);
  });
});

describe("labels read as plain language", () => {
  it("names the areas after the product, not the supporting craft", () => {
    expect(pillars.map((p) => p.label.en)).toEqual([
      "Applied AI / ML",
      "Robotics & Edge AI",
      "ML Infrastructure",
    ]);
    expect(pillars.map((p) => p.id)).toEqual(["research", "robotics", "infra"]);
  });

  it("does not sell DevOps as the headline of an area", () => {
    pillars.forEach((p) => expect(p.label.en).not.toMatch(/devops/i));
  });

  it("drops the flagship badge from the pillars", async () => {
    const en = await container.renderToString(Pillars, { props: { locale: "en" } });
    const it = await container.renderToString(Pillars, { props: { locale: "it" } });
    expect(en).not.toMatch(/flagship/i);
    expect(it).not.toMatch(/punta di diamante/i);
  });
});

describe("one phrase, one place", () => {
  it("promises a personal reply once per contact page", () => {
    (["pages/contact.astro", "pages/it/contatti.astro"] as const).forEach((page) => {
      const source = read(page);
      const count = (source.match(/reply personally|rispondo personalmente/g) ?? []).length;
      expect(count).toBeLessThanOrEqual(1);
    });
  });

  it("does not repeat the hero's button label as the contact headline", () => {
    expect(read("pages/contact.astro")).not.toMatch(/<h1[^>]*>\s*Let's talk/);
    expect(read("pages/it/contatti.astro")).not.toMatch(/<h1[^>]*>\s*Parliamone/);
  });
});

describe("identity links come from SITE", () => {
  it("the contact pages stop hardcoding profile urls", () => {
    (["pages/contact.astro", "pages/it/contatti.astro"] as const).forEach((page) => {
      const source = read(page);
      expect(source).toContain("SITE");
      expect(source).not.toContain("https://www.linkedin.com");
      expect(source).not.toContain("https://github.com/francescovigni");
    });
  });

  it("SITE still holds the urls those pages need", () => {
    expect(SITE.profiles.linkedin).toMatch(/linkedin\.com/);
    expect(SITE.profiles.github).toMatch(/github\.com/);
    expect(SITE.profiles.scholar).toMatch(/scholar\.google\.com/);
  });
});

describe("the headline claims evidence, not survival", () => {
  // "Survives deployment" only lands for a reader who has already had an ML
  // project fail in production. It reads as craft jargon to the other funnel.
  it("states the claim in the first person, in both locales", () => {
    expect(hero.title.en).toMatch(/^I find out when the model is/);
    expect(hero.title.it).toMatch(/^Scopro quando il modello/);
  });

  it("is short enough to land as a headline", () => {
    [hero.title.en, hero.title.it].forEach((title) => {
      const words = title.replace(/<[^>]*>/g, "").trim().split(/\s+/);
      expect(words.length).toBeLessThanOrEqual(8);
    });
  });

  it("marks one word for the accent-draw animation", () => {
    [hero.title.en, hero.title.it].forEach((title) => {
      expect(title).toMatch(/<em class="accent-draw">[\w' ]+<\/em>/);
    });
  });

  it("retires the survival phrasing everywhere it echoed", () => {
    const offenders = sourceFiles()
      .filter((file) =>
        /survives deployment|survive deployment|sopravvive al deployment|evidence it holds up|prove che regge/i.test(
          readFileSync(file, "utf8"),
        ),
      )
      .map(relative);
    expect(offenders).toEqual([]);
  });
});
