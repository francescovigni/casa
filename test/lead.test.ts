import { describe, it, expect, beforeEach } from "vitest";
import { validateLead, rateLimited, _resetRateLimit } from "../src/lib/lead";

describe("validateLead", () => {
  const good = {
    name: "Jane Researcher",
    email: "jane@lab.eu",
    org: "CERN",
    message: "We have a DevOps opening.",
    intent: "hiring",
    locale: "en",
  };

  it("accepts a well-formed qualified lead", () => {
    const r = validateLead(good);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.lead.email).toBe("jane@lab.eu");
      expect(r.lead.intent).toBe("hiring");
    }
  });

  it("treats a filled honeypot as spam but returns 200", () => {
    const r = validateLead({ ...good, company_website: "http://spam.example" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(200);
  });

  it("rejects an invalid email", () => {
    const r = validateLead({ ...good, email: "not-an-email" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(422);
  });

  it("rejects a missing name", () => {
    const r = validateLead({ ...good, name: "" });
    expect(r.ok).toBe(false);
  });

  it("rejects an unknown intent", () => {
    const r = validateLead({ ...good, intent: "exploring" });
    expect(r.ok).toBe(false);
  });

  it("rejects over-long fields", () => {
    const r = validateLead({ ...good, message: "x".repeat(6000) });
    expect(r.ok).toBe(false);
  });

  it("defaults locale to en when not it", () => {
    const r = validateLead({ ...good, locale: "fr" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.lead.locale).toBe("en");
  });
});

describe("rateLimited", () => {
  beforeEach(() => _resetRateLimit());

  it("allows up to the limit then blocks within the window", () => {
    const ip = "1.2.3.4";
    const now = 1_000_000;
    // 5 allowed
    for (let i = 0; i < 5; i++) expect(rateLimited(ip, now + i)).toBe(false);
    // 6th within window is blocked
    expect(rateLimited(ip, now + 6)).toBe(true);
  });

  it("resets after the window elapses", () => {
    const ip = "5.6.7.8";
    for (let i = 0; i < 5; i++) rateLimited(ip, 0 + i);
    expect(rateLimited(ip, 61_000)).toBe(false);
  });

  it("tracks IPs independently", () => {
    for (let i = 0; i < 6; i++) rateLimited("a", i);
    expect(rateLimited("b", 0)).toBe(false);
  });
});
