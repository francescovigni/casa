import { describe, it, expect } from "vitest";
import { personJsonLd } from "../src/data/person";
import { SITE } from "../src/data/site";

describe("Person JSON-LD", () => {
  it("is schema.org Person with a stable, locale-independent @id", () => {
    const en = personJsonLd("en");
    const it = personJsonLd("it");
    expect(en["@context"]).toBe("https://schema.org");
    expect(en["@type"]).toBe("Person");
    expect(en["@id"]).toBe(`${SITE.url}/#person`);
    expect(it["@id"]).toBe(en["@id"]);
  });

  it("lists the portfolio subdomain in sameAs", () => {
    expect(personJsonLd("en").sameAs).toContain(SITE.portfolio);
  });

  it("keeps every linked profile in sameAs", () => {
    const sameAs = personJsonLd("en").sameAs;
    Object.values(SITE.profiles).forEach((profile) => {
      expect(sameAs).toContain(profile);
    });
  });

  it("has no duplicate sameAs entries", () => {
    const sameAs = personJsonLd("en").sameAs;
    expect(new Set(sameAs).size).toBe(sameAs.length);
  });

  it("sameAs entries are absolute https urls", () => {
    personJsonLd("en").sameAs.forEach((url) => {
      expect(() => new URL(url)).not.toThrow();
      expect(url).toMatch(/^https:\/\//);
    });
  });

  it("never points sameAs back at the canonical site itself", () => {
    // sameAs is for *other* profiles of the same entity; self-reference is url.
    expect(personJsonLd("en").sameAs).not.toContain(SITE.url);
    expect(personJsonLd("en").url).toBe(SITE.url);
  });

  it("translates jobTitle per locale and leaves the name alone", () => {
    // Mirrors the rebuild's positioning (<title> on both homepages), not the
    // consultant framing the Gatsby site still carries.
    expect(personJsonLd("en").jobTitle).toBe("AI Researcher and Engineer");
    expect(personJsonLd("it").jobTitle).toBe("Ricercatore e Ingegnere AI");
    expect(personJsonLd("it").name).toBe("Francesco Vigni");
  });

  it("credits both alma maters as EducationalOrganization", () => {
    const alumni = personJsonLd("en").alumniOf;
    expect(alumni.map((a) => a.name)).toEqual([
      "University of Naples Federico II",
      "University of Siena",
    ]);
    alumni.forEach((a) => expect(a["@type"]).toBe("EducationalOrganization"));
  });

  it("serialises to JSON without cycles or undefined fields", () => {
    const json = JSON.stringify(personJsonLd("en"));
    expect(JSON.parse(json)).toEqual(personJsonLd("en"));
    expect(json).not.toContain("undefined");
  });
});
