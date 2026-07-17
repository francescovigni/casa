import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { isConfigured, createLead, type Lead } from "../src/lib/twenty";

const lead: Lead = {
  name: "Jane Researcher",
  email: "jane@lab.eu",
  org: "CERN",
  message: "We have a DevOps opening.",
  intent: "hiring",
  locale: "en",
};

describe("isConfigured", () => {
  const saved = { ...process.env };
  afterEach(() => {
    process.env = { ...saved };
  });

  it("is false when the token is missing", () => {
    delete process.env.TWENTY_API_URL;
    delete process.env.TWENTY_API_TOKEN;
    expect(isConfigured()).toBe(false);
  });

  it("is false for a placeholder token", () => {
    process.env.TWENTY_API_URL = "https://crm.example.com";
    process.env.TWENTY_API_TOKEN = "changeme";
    expect(isConfigured()).toBe(false);
  });

  it("is true with real-looking config", () => {
    process.env.TWENTY_API_URL = "https://crm.example.com";
    process.env.TWENTY_API_TOKEN = "eyJhbGciOi-real-token";
    expect(isConfigured()).toBe(true);
  });
});

describe("createLead", () => {
  beforeEach(() => {
    process.env.TWENTY_API_URL = "https://crm.example.com/";
    process.env.TWENTY_API_TOKEN = "real-token";
    process.env.TWENTY_LEAD_STAGE = "NEW";
  });
  afterEach(() => vi.restoreAllMocks());

  it("creates a Person then an Opportunity with the bearer token", async () => {
    const calls: { url: string; body: any; auth: string }[] = [];
    const fetchMock = vi.fn(async (url: string, init: any) => {
      calls.push({
        url,
        body: JSON.parse(init.body),
        auth: init.headers.Authorization,
      });
      return {
        ok: true,
        json: async () => ({ data: { id: "person-123" } }),
      } as unknown as Response;
    });
    vi.stubGlobal("fetch", fetchMock);

    await createLead(lead);

    expect(calls).toHaveLength(2);
    // trailing slash on base URL is normalized
    expect(calls[0].url).toBe("https://crm.example.com/rest/people");
    expect(calls[1].url).toBe("https://crm.example.com/rest/opportunities");
    expect(calls[0].auth).toBe("Bearer real-token");
    expect(calls[0].body.name).toEqual({ firstName: "Jane", lastName: "Researcher" });
    expect(calls[0].body.emails.primaryEmail).toBe("jane@lab.eu");
    expect(calls[1].body.stage).toBe("NEW");
    expect(calls[1].body.name).toContain("hiring");
  });

  it("throws on a non-ok CRM response (so the caller can fall back)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 500, text: async () => "boom" }) as any),
    );
    await expect(createLead(lead)).rejects.toThrow(/Twenty/);
  });
});
