import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import CareerArchive from "../src/components/CareerArchive.astro";

const SRC = join(import.meta.dirname, "..", "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");
const container = await AstroContainer.create();
const render = (locale: "en" | "it") =>
  container.renderToString(CareerArchive, { props: { locale } });

const WORK_PAGES = ["pages/work.astro", "pages/it/lavoro.astro"] as const;

describe("the work page leads with proof", () => {
  it("renders the deployment stories before the career archive", () => {
    WORK_PAGES.forEach((page) => {
      const source = read(page);
      expect(source.indexOf("ProjectStory"), page).toBeLessThan(source.indexOf("CareerArchive"));
    });
  });

  it("no longer runs publications, talks and story as top-level sections", () => {
    WORK_PAGES.forEach((page) => {
      const source = read(page);
      expect(source, page).not.toMatch(/^\s*<Publications\b/m);
      expect(source, page).not.toMatch(/^\s*<Talks\b/m);
      expect(source, page).not.toMatch(/^\s*<Story\b/m);
      expect(source, page).toContain("CareerArchive");
    });
  });
});

describe("career archive", () => {
  it("collapses the résumé material behind one disclosure", async () => {
    const html = await render("en");
    expect(html).toContain("<details");
    expect(html).toContain("<summary");
    expect(html).toMatch(/Career &amp; milestones/);
  });

  it("shows an open/closed affordance in place of the default marker", async () => {
    const html = await render("en");
    expect(html).toMatch(/group-open:rotate-90/);
    expect(html).toMatch(/details-marker\]:hidden/);
  });

  it("does not nest a .wrap inside a .wrap, which would indent the block", async () => {
    const source = readFileSync(join(SRC, "components", "CareerArchive.astro"), "utf8");
    const section = source.match(/<section class="([^"]*)"/)?.[1] ?? "";
    expect(section).not.toMatch(/\bwrap\b/);
    expect(source).toMatch(/<summary\s+class="wrap/);
  });

  it("still contains the publications, the talks and the story", async () => {
    const html = await render("en");
    expect(html).toMatch(/Peer-reviewed work/);
    expect(html).toMatch(/Talks and interviews/);
    expect(html).toMatch(/My story/);
  });

  it("keeps the portrait and the whole story, the work page having no hero", async () => {
    const html = await render("en");
    expect(html).toContain("<img");
    expect(html).toContain("Forlì");
  });

  it("labels the disclosure in Italian on the Italian page", async () => {
    const html = await render("it");
    expect(html).toMatch(/Percorso e tappe/);
    expect(html).toMatch(/Lavoro peer-reviewed/);
  });
});
