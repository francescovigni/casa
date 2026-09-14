import { describe, it, expect } from "vitest";
import { SITE } from "../src/data/site";

describe("SITE constants", () => {
  it("canonical site url has no trailing slash", () => {
    expect(SITE.url).toBe("https://francescovigni.com");
  });

  it("names the standalone portfolio subdomain", () => {
    expect(SITE.portfolio).toBe("https://portfolio.francescovigni.com");
  });

  it("portfolio lives on a subdomain of the main site, not a path", () => {
    const main = new URL(SITE.url);
    const portfolio = new URL(SITE.portfolio);
    expect(portfolio.hostname.endsWith(`.${main.hostname}`)).toBe(true);
    expect(portfolio.pathname).toBe("/");
  });

  it("every url is https and free of a trailing slash", () => {
    const urls = [SITE.url, SITE.portfolio, ...Object.values(SITE.profiles)];
    urls.forEach((url) => {
      expect(url).toMatch(/^https:\/\//);
      expect(url).not.toMatch(/\/$/);
    });
  });

  it("profiles cover the four identities the footer links", () => {
    expect(Object.keys(SITE.profiles).sort()).toEqual([
      "github",
      "linkedin",
      "orcid",
      "scholar",
    ]);
  });

  it("contact email matches the domain", () => {
    expect(SITE.email).toBe("hello@francescovigni.com");
  });
});
