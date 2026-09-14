import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import PersonJsonLd from "../src/components/PersonJsonLd.astro";
import { personJsonLd } from "../src/data/person";
import { SITE } from "../src/data/site";

const container = await AstroContainer.create();
const render = (props: Record<string, unknown> = {}) =>
  container.renderToString(PersonJsonLd, { props });

const payload = (html: string) =>
  JSON.parse(html.replace(/^[\s\S]*?<script[^>]*>/, "").replace(/<\/script>[\s\S]*$/, ""));

describe("<PersonJsonLd />", () => {
  it("emits a single ld+json script tag", async () => {
    const html = await render();
    expect(html.match(/<script\b/g)).toHaveLength(1);
    expect(html).toContain('type="application/ld+json"');
  });

  it("emits parseable JSON matching the data module", async () => {
    expect(payload(await render({ locale: "en" }))).toEqual(personJsonLd("en"));
  });

  it("honours the locale prop", async () => {
    expect(payload(await render({ locale: "it" })).jobTitle).toBe("Ricercatore e Ingegnere AI");
  });

  it("defaults to English", async () => {
    expect(payload(await render())).toEqual(personJsonLd("en"));
  });

  it("carries the portfolio subdomain through to the rendered markup", async () => {
    expect(payload(await render()).sameAs).toContain(SITE.portfolio);
  });

  it("escapes nothing that would break out of the script tag", async () => {
    const html = await render();
    const inner = html.slice(html.indexOf(">") + 1, html.lastIndexOf("</script>"));
    expect(inner).not.toContain("</script");
    expect(inner).not.toContain("<!--");
  });
});
