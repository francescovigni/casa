import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Header from "../src/components/Header.astro";
import { services, homeFaq } from "../src/data/services";

const SRC = join(import.meta.dirname, "..", "src");
const DIR = join(SRC, "content", "guide");
const container = await AstroContainer.create();

const guides = readdirSync(DIR)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const source = readFileSync(join(DIR, file), "utf8");
    const [, front, body] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
    const field = (name: string) => front?.match(new RegExp(`^${name}: "?(.*?)"?$`, "m"))?.[1];
    return { slug: file.replace(/\.md$/, ""), source, front, body, field };
  });

/** Every internal path the site actually serves under /it/. */
const routes = new Set([
  "/it/",
  "/it/servizi/",
  "/it/guide/",
  "/it/lavoro/",
  "/it/contatti/",
  "/it/privacy/",
  "/it/trasparenza/",
  "/research/",
  "/research/endoscopy-standardization/",
  "/research/fetal-cardiac-orientation/",
  ...services.map((s) => `/it/servizi/${s.slug}/`),
  ...guides.map((g) => `/it/guide/${g.slug}/`),
]);

describe("Italian guides", () => {
  it("cover the three questions an SME asks before a project", () => {
    expect(guides.map((g) => g.slug).sort()).toEqual([
      "ai-act-pmi",
      "bandi-contributi-intelligenza-artificiale-pmi",
      "quanto-costa-progetto-ai-pmi",
    ]);
  });

  it("carry every frontmatter field the template needs", () => {
    guides.forEach((g) => {
      ["title", "seoTitle", "description", "lede", "updated", "order"].forEach((name) =>
        expect(g.field(name), `${g.slug}.${name}`).toBeTruthy(),
      );
      expect(g.field("seoTitle"), g.slug).toMatch(/ \| Francesco Vigni$/);
      expect(g.field("updated"), g.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it("have no em dashes and no leftover drafting markers", () => {
    guides.forEach((g) => {
      expect(g.source, g.slug).not.toContain("—");
      expect(g.source, g.slug).not.toMatch(/<!--|TODO|TBD|\{\{/);
    });
  });

  it("link only to pages that exist", () => {
    guides.forEach((g) => {
      const links = [...g.body.matchAll(/\]\((\/[^)#\s]*)/g)].map((m) => m[1]);
      links.forEach((href) => expect(routes.has(href), `${g.slug} -> ${href}`).toBe(true));
    });
  });

  it("cite their external sources over https", () => {
    guides.forEach((g) => {
      const external = [...g.body.matchAll(/\]\((https?:[^)\s]+)/g)].map((m) => m[1]);
      external.forEach((href) => expect(href, g.slug).toMatch(/^https:\/\//));
    });
  });

  it("point their related services at real service pages", () => {
    guides.forEach((g) => {
      const slugs = [...(g.field("services") ?? "").matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
      slugs.forEach((slug) =>
        expect(services.some((s) => s.slug === slug), `${g.slug} -> ${slug}`).toBe(true),
      );
    });
  });

  it("are reached from the FAQs that raise the same question", () => {
    const faqLinks = [...homeFaq, ...services.flatMap((s) => s.faq)]
      .map((item) => item.more?.href)
      .filter((href): href is string => !!href && href.startsWith("/it/guide/"));
    expect(faqLinks.length).toBeGreaterThanOrEqual(3);
    faqLinks.forEach((href) => expect(routes.has(href), href).toBe(true));
  });

  it("are in the Italian nav", async () => {
    const html = await container.renderToString(Header, { props: { locale: "it", pathname: "/it/" } });
    expect(html).toContain('href="/it/guide/"');
  });

  it("render through one template with Article JSON-LD by the Person", () => {
    const page = readFileSync(join(SRC, "pages", "it", "guide", "[slug].astro"), "utf8");
    expect(page).toContain('getCollection("guide")');
    expect(page).toContain('"@type": "Article"');
    expect(page).toContain("/#person");
    expect(existsSync(join(SRC, "content.config.ts"))).toBe(true);
  });
});
