import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Services from "../src/components/Services.astro";
import Footer from "../src/components/Footer.astro";
import { services, homeFaq } from "../src/data/services";
import { projects } from "../src/data/projects";
import { legacyRedirect } from "../src/lib/legacy";
import { SITE } from "../src/data/site";

const SRC = join(import.meta.dirname, "..", "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");
const container = await AstroContainer.create();

describe("Italian service pages", () => {
  it("have unique, url-safe slugs", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9-]+$/));
  });

  it("cite only proof the work page already verifies", () => {
    services.forEach((s) => {
      expect(s.proof.length, s.slug).toBeGreaterThan(0);
      s.proof.forEach((slug) =>
        expect(projects.some((p) => p.slug === slug), `${s.slug} -> ${slug}`).toBe(true),
      );
    });
  });

  it("carry a searchable <title> with a pipe, and a description", () => {
    services.forEach((s) => {
      expect(s.seoTitle, s.slug).toMatch(/ \| Francesco Vigni$/);
      expect(s.seoTitle, s.slug).not.toMatch(/[—–]/);
      expect(s.description.length, s.slug).toBeGreaterThan(80);
    });
  });

  it("each walk three steps and answer at least three questions", () => {
    services.forEach((s) => {
      expect(s.steps, s.slug).toHaveLength(3);
      expect(s.faq.length, s.slug).toBeGreaterThanOrEqual(3);
      expect(s.forWho.length, s.slug).toBeGreaterThanOrEqual(3);
    });
  });

  it("publish no duration and no price, none being a real offer yet", () => {
    const copy = JSON.stringify([services, homeFaq]);
    expect(copy).not.toMatch(/settimane|€|euro\b/i);
  });

  it("claim no compliance certification", () => {
    const copy = JSON.stringify([services, homeFaq]);
    expect(copy).not.toMatch(/certificat[oi] (AI Act|GDPR)|conforme all'AI Act/i);
  });

  it("are rendered from one template, with Service JSON-LD tied to the Person", () => {
    const page = read("pages/it/servizi/[slug].astro");
    expect(page).toContain("getStaticPaths");
    expect(page).toContain('"@type": "Service"');
    expect(page).toContain("/#person");
    expect(page).toContain("<PersonJsonLd");
  });

  it("are all linked from the card grid the homepage and the hub share", async () => {
    const html = await container.renderToString(Services);
    services.forEach((s) => expect(html).toContain(`href="/it/servizi/${s.slug}/"`));
    expect(read("pages/it/index.astro")).toContain("<Services />");
    expect(read("pages/it/servizi/index.astro")).toContain("<Services heading={false} />");
  });
});

describe("legacy urls", () => {
  it.each([
    ["/blog/webdatasets/", "/work/"],
    ["/blog/", "/work/"],
    ["/blog", "/work/"],
    ["/projects/ring-alarm-google-sheets-monitor/", "/work/"],
    ["/publications/icra-handshake/", "/work/"],
    ["/talks/", "/work/"],
    ["/news/", "/work/"],
    ["/insights/ehds-readiness/", "/research/"],
    ["/it/approfondimenti/", "/research/"],
  ])("%s lands on %s", (from, to) => {
    expect(legacyRedirect(from)).toBe(to);
  });

  it.each(["/", "/work/", "/research/", "/it/", "/it/servizi/", "/blogger/", "/newsletter/"])(
    "leaves %s alone",
    (path) => {
      expect(legacyRedirect(path)).toBeNull();
    },
  );

  it("redirects permanently from the middleware, before the GET-only guard", () => {
    const middleware = read("middleware.ts");
    expect(middleware).toContain("redirect(legacy, 301)");
    expect(middleware.indexOf("legacyRedirect(path)")).toBeLessThan(
      middleware.indexOf('request.method !== "GET"'),
    );
  });
});

describe("Italian legal notices", () => {
  it("shows the VAT number and the funding disclosure in every footer", async () => {
    for (const locale of ["en", "it"] as const) {
      const html = await container.renderToString(Footer, { props: { locale } });
      expect(html, locale).toContain(`P.IVA ${SITE.vat}`);
      expect(html, locale).toContain('href="/it/trasparenza/"');
    }
  });

  it("keeps the L. 124/2017 disclosure with its grant identifiers", () => {
    const page = read("pages/it/trasparenza.astro");
    expect(page).toContain("legge 4 agosto 2017, n. 124");
    expect(page).toContain("C66I26001050001");
    expect(page).toContain("26000994");
    expect(page).toContain("Cofinanziato dall'Unione europea");
  });
});

describe("geography", () => {
  // Regional and national reach: no city in any <title>, so the pages compete
  // outside Forlì; the region and "tutta Italia" live in the descriptions.
  it("keeps the city out of the Italian titles", () => {
    ["pages/it/index.astro", "pages/it/contatti.astro", "pages/it/servizi/index.astro"].forEach(
      (page) => expect(read(page).match(/title="[^"]*"/)?.[0], page).not.toMatch(/Forlì/),
    );
    services.forEach((s) => expect(s.seoTitle, s.slug).not.toMatch(/Forlì/));
  });

  it("names the region and the whole country wherever it says where", () => {
    services.forEach((s) =>
      expect(s.description, s.slug).toMatch(/Emilia-Romagna e in tutta Italia\.$/),
    );
    expect(read("pages/it/index.astro")).toMatch(/Emilia-Romagna, da remoto in tutta Italia/);
  });
});
