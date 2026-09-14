import { describe, it, expect } from "vitest";
import config from "../astro.config.mjs";

// `/portfolio` was a real path on the old Gatsby site and is the obvious guess
// for anyone who knows the portfolio subdomain. Both must land on the canonical
// research index rather than 404.
describe("legacy /portfolio redirect", () => {
  const redirects = (config.redirects ?? {}) as Record<
    string,
    { status: number; destination: string } | string
  >;

  it("redirects /portfolio to the canonical research index", () => {
    expect(redirects["/portfolio"]).toEqual({
      status: 301,
      destination: "/research/",
    });
  });

  it("declares the route once — a trailing-slash twin collides in the router", () => {
    expect(redirects["/portfolio/"]).toBeUndefined();
  });

  it("leaves trailing-slash matching on ignore, so /portfolio/ resolves too", () => {
    expect(config.trailingSlash ?? "ignore").toBe("ignore");
  });

  it("redirects permanently, never to the subdomain", () => {
    Object.values(redirects).forEach((target) => {
      const entry = typeof target === "string" ? { status: 301, destination: target } : target;
      expect(entry.status).toBe(301);
      expect(entry.destination).toMatch(/^\//);
    });
  });

  it("keeps the site canonical origin unchanged", () => {
    expect(config.site).toBe("https://francescovigni.com");
  });
});
