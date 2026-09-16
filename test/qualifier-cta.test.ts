import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Qualifier from "../src/components/Qualifier.astro";

const container = await AstroContainer.create();
const render = (locale: "en" | "it", variant?: "section" | "page") =>
  container.renderToString(Qualifier, { props: { locale, variant } });

describe("the closing ask is a heading and a form, nothing else", () => {
  it("heads the panel in English", async () => {
    const html = await render("en");
    expect(html).toMatch(/<h2[^>]*>Let&#39;s talk<\/h2>/);
  });

  it("heads it in Italian too", async () => {
    expect(await render("it")).toMatch(/<h2[^>]*>Parliamone<\/h2>/);
  });

  it("says what to write, so the first message arrives useful", async () => {
    const html = await render("en");
    expect(html).toMatch(/what you are trying to build/);
    expect(html).toMatch(/constraints/);
  });

  it("carries no pitch above the form, in either language", async () => {
    for (const [locale, gone] of [
      ["en", ["Have a difficult AI problem?", "Medical imaging, computer vision", "Freelance · Consulting"]],
      ["it", ["Hai un problema di AI difficile?", "Imaging medico, computer vision", "Freelance · Consulenza"]],
    ] as const) {
      const html = await render(locale);
      gone.forEach((copy) => expect(html, locale).not.toContain(copy));
    }
  });

  it("puts the form in front of the visitor with nothing to choose first", async () => {
    const html = await render("en");
    expect(html).toContain('data-step="form"');
    expect(html).toContain('name="company_website"');
    // The form is not hidden behind a step: its own class list carries no
    // `hidden`, so it renders on load.
    expect(html).toMatch(/<form class="mt-6"/);
    ["hiring", "collaboration", "project", "exploring"].forEach((intent) =>
      expect(html).not.toContain(`data-intent="${intent}"`),
    );
    expect(html).not.toContain('data-step="explore"');
    expect(html).not.toContain('name="intent"');
  });

  it("asks for only the four fields a first message needs", async () => {
    const html = await render("en");
    ["name", "email", "org", "message"].forEach((field) =>
      expect(html).toContain(`name="${field}"`),
    );
  });

  it("reads on both the dark homepage panel and the light contact page", async () => {
    expect(await render("en", "section")).toContain("bg-ink");
    expect(await render("en", "page")).toContain("border-line");
  });
});
