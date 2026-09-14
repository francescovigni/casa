import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import PortfolioNote from "../src/components/PortfolioNote.astro";
import Footer from "../src/components/Footer.astro";
import { SITE } from "../src/data/site";

const container = await AstroContainer.create();
const render = (Component: Parameters<typeof container.renderToString>[0], props = {}) =>
  container.renderToString(Component, { props });

/** Every `<a href="...">` in a fragment, with its whole tag, for attribute checks. */
const anchors = (html: string): string[] => html.match(/<a\b[^>]*>/g) ?? [];
const anchorFor = (html: string, href: string): string | undefined =>
  anchors(html).find((a) => a.includes(`href="${href}"`));

/** What a reader actually sees: tags removed, whitespace collapsed as a browser would. */
const visibleText = (html: string): string =>
  html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

/** Visible text of the link to `href`, whitespace collapsed. */
const linkText = (html: string, href: string): string => {
  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(new RegExp(`<a[^>]*href="${escaped}"[^>]*>([\\s\\S]*?)</a>`));
  return (match?.[1] ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
};

describe("PortfolioNote", () => {
  it("links the portfolio subdomain", async () => {
    const html = await render(PortfolioNote);
    expect(anchorFor(html, SITE.portfolio)).toBeDefined();
  });

  it("shows the bare hostname as the link text, so the destination is readable", async () => {
    const html = await render(PortfolioNote);
    expect(html).toContain("portfolio.francescovigni.com");
    expect(html).not.toContain("https://portfolio.francescovigni.com<");
  });

  it("marks the subdomain as the same person with rel=me", async () => {
    const anchor = anchorFor(await render(PortfolioNote), SITE.portfolio);
    expect(anchor).toMatch(/rel="[^"]*\bme\b[^"]*"/);
  });

  it("carries noopener whenever it opens a new tab", async () => {
    const anchor = anchorFor(await render(PortfolioNote), SITE.portfolio) ?? "";
    if (anchor.includes('target="_blank"')) {
      expect(anchor).toMatch(/rel="[^"]*\bnoopener\b[^"]*"/);
    }
  });

  it("says the repositories remain the source of record in the full variant", async () => {
    const html = await render(PortfolioNote, { variant: "full" });
    expect(html.toLowerCase()).toContain("source of record");
  });

  it("inline variant is a single short sentence, no heading", async () => {
    const html = await render(PortfolioNote, { variant: "inline" });
    expect(html).not.toMatch(/<h[1-6]\b/);
    expect(visibleText(html).length).toBeLessThanOrEqual(90);
  });

  it("full variant stays compact — two sentences at most", async () => {
    const html = await render(PortfolioNote, { variant: "full" });
    const text = visibleText(html);
    expect(text.length).toBeLessThanOrEqual(220);
    expect(text.split(/\.\s/).length).toBeLessThanOrEqual(2);
  });

  it("defaults to the full variant", async () => {
    expect(await render(PortfolioNote)).toBe(await render(PortfolioNote, { variant: "full" }));
  });

  it("keeps punctuation tight against the link, with no stray space", async () => {
    // The link sits mid-sentence: a newline after </a> would render as "com . The".
    const full = visibleText(await render(PortfolioNote, { variant: "full" }));
    const inline = visibleText(await render(PortfolioNote, { variant: "inline" }));
    expect(full).not.toMatch(/\s[.,]/);
    expect(inline).not.toMatch(/\s[.,]/);
    expect(full).toContain("portfolio.francescovigni.com.");
  });

  it("never claims the subdomain is canonical", async () => {
    const html = (await render(PortfolioNote, { variant: "full" })).toLowerCase();
    expect(html).not.toContain("canonical");
    expect(html).not.toContain('rel="canonical"');
  });
});

describe("Footer", () => {
  it("links the portfolio alongside the other identities", async () => {
    const html = await render(Footer, { locale: "en" });
    expect(anchorFor(html, SITE.portfolio)).toBeDefined();
    expect(linkText(html, SITE.portfolio)).toBe("Portfolio");
  });

  it("keeps every existing profile link", async () => {
    const html = await render(Footer, { locale: "en" });
    Object.values(SITE.profiles).forEach((profile) => {
      expect(anchorFor(html, profile)).toBeDefined();
    });
  });

  it("opens external identities in a new tab with rel=me noopener", async () => {
    const html = await render(Footer, { locale: "en" });
    [SITE.portfolio, ...Object.values(SITE.profiles)].forEach((href) => {
      const anchor = anchorFor(html, href) ?? "";
      expect(anchor).toContain('target="_blank"');
      expect(anchor).toMatch(/rel="[^"]*\bme\b[^"]*"/);
      expect(anchor).toMatch(/rel="[^"]*\bnoopener\b[^"]*"/);
    });
  });

  it("uses the same label in both locales — it is a proper noun", async () => {
    const en = await render(Footer, { locale: "en" });
    const it = await render(Footer, { locale: "it" });
    expect(linkText(en, SITE.portfolio)).toBe("Portfolio");
    expect(linkText(it, SITE.portfolio)).toBe("Portfolio");
  });

  it("still points privacy at the locale-correct page", async () => {
    expect(await render(Footer, { locale: "en" })).toContain('href="/privacy/"');
    expect(await render(Footer, { locale: "it" })).toContain('href="/it/privacy/"');
  });
});
