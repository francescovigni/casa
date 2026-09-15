import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Qualifier from "../src/components/Qualifier.astro";

const container = await AstroContainer.create();
const render = (locale: "en" | "it", variant?: "section" | "page") =>
  container.renderToString(Qualifier, { props: { locale, variant } });

describe("the closing ask is about difficult AI, not clinical AI", () => {
  it("asks the broad question in English", async () => {
    const html = await render("en");
    expect(html).toContain("Have a difficult AI problem?");
    expect(html).toContain("Medical imaging, computer vision, edge AI and intelligent systems.");
    expect(html).not.toMatch(/clinical-ai problem/i);
  });

  it("asks it in Italian too", async () => {
    const html = await render("it");
    expect(html).toContain("Hai un problema di AI difficile?");
    expect(html).toContain("Imaging medico, computer vision, edge AI e sistemi intelligenti.");
  });

  it("says what to write, so the first message arrives useful", async () => {
    const html = await render("en");
    expect(html).toMatch(/what you are trying to build/);
    expect(html).toMatch(/constraints/);
  });

  it("names the engagement shape as supporting metadata", async () => {
    // Rendered html escapes the ampersand.
    expect(await render("en")).toContain("Freelance · Consulting · R&amp;D · Remote");
    expect(await render("it")).toContain("Freelance · Consulenza · R&amp;D · Remoto");
  });

  it("keeps the intent selector, the honeypot and the lead form intact", async () => {
    const html = await render("en");
    ["hiring", "collaboration", "project", "exploring"].forEach((intent) =>
      expect(html).toContain(`data-intent="${intent}"`),
    );
    expect(html).toContain('name="company_website"');
    expect(html).toContain('data-step="form"');
    expect(html).toContain('data-step="explore"');
  });

  it("reads on both the dark homepage panel and the light contact page", async () => {
    expect(await render("en", "section")).toContain("bg-ink");
    expect(await render("en", "page")).toContain("border-line");
  });
});
