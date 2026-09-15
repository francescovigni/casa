import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Engagement from "../src/components/Engagement.astro";

const SRC = join(import.meta.dirname, "..", "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");
const container = await AstroContainer.create();
const render = (locale: "en" | "it") =>
  container.renderToString(Engagement, { props: { locale } });

describe("engagement formats", () => {
  it("names three concrete ways to start, in English", async () => {
    const html = await render("en");
    expect(html).toContain("Technical audit");
    expect(html).toContain("Proof of concept");
    expect(html).toContain("Ongoing technical support");
  });

  it("names them in Italian", async () => {
    const html = await render("it");
    expect(html).toContain("Audit tecnico");
    expect(html).toContain("Proof of concept");
    expect(html).toContain("Supporto tecnico continuativo");
  });

  it("drops the generic pilot / transition labels", async () => {
    const html = await render("en");
    expect(html).not.toMatch(/\bPilot\b/);
    expect(html).not.toMatch(/\bTransition\b/);
  });

  it("promises no duration, none being published as a real offer", async () => {
    const html = await render("en");
    expect(html).not.toMatch(/\d\s*(-|–|to)\s*\d\s*(weeks|settimane)/i);
    expect(html).not.toMatch(/weeks/i);
  });

  it("appears on both contact pages, above the trust badges", () => {
    (["pages/contact.astro", "pages/it/contatti.astro"] as const).forEach((page) => {
      const source = read(page);
      expect(source, page).toContain("Engagement");
      expect(source.indexOf("<Engagement"), page).toBeLessThan(source.indexOf("<Trust"));
    });
  });
});
