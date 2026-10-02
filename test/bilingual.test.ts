import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Header from "../src/components/Header.astro";
import { localePairs, ui } from "../src/i18n";

const container = await AstroContainer.create();
const render = (locale: "en" | "it", pathname: string) =>
  container.renderToString(Header, { props: { locale, pathname } });

describe("the Italian nav sells services", () => {
  it("offers Servizi to Italian readers instead of the English research", async () => {
    const html = await render("it", "/it/");
    expect(html).toContain('href="/it/servizi/"');
    expect(html).not.toContain('href="/research/"');
    expect(html).not.toMatch(/hreflang=/);
  });

  it("keeps the four English nav items unchanged", async () => {
    const html = await render("en", "/");
    ['href="/"', 'href="/work/"', 'href="/research/"', 'href="/contact/"'].forEach((href) =>
      expect(html).toContain(href),
    );
  });

  it("does not mark the English nav with a language hint", async () => {
    expect(await render("en", "/")).not.toMatch(/hreflang=/);
  });

  it("leaves /research/ unpaired, so the language toggle stays predictable", () => {
    expect(localePairs.some((pair) => pair.en === "/research/")).toBe(false);
  });

  it("labels the entries in the locale strings, not in the component", () => {
    expect(ui.it.nav.services).toBe("Servizi");
    expect(ui.en.nav.research).toBe("Research");
  });

  it("shows the entry in the small-screen nav as well", async () => {
    const html = await render("it", "/it/");
    expect(html.match(/href="\/it\/servizi\/"/g) ?? []).toHaveLength(2);
  });
});
