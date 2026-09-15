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
        body: init?.body ? JSON.parse(init.body) : undefined,
        auth: init.headers.Authorization,
      });
      return {
        ok: true,
        json: async () => ({ data: { id: "person-123" } }),
      } as unknown as Response;
    });
    vi.stubGlobal("fetch", fetchMock);

    await createLead(lead);

    const person = calls.find((c) => c.url.includes("/rest/people") && c.body);
    const opportunity = calls.find((c) => c.url.includes("/rest/opportunities"));
    // company lookup, person, opportunity, note, then one target per record
    expect(calls).toHaveLength(6);
    // trailing slash on base URL is normalized
    expect(person!.url).toBe("https://crm.example.com/rest/people");
    expect(opportunity!.url).toBe("https://crm.example.com/rest/opportunities");
    expect(person!.auth).toBe("Bearer real-token");
    expect(person!.body.name).toEqual({ firstName: "Jane", lastName: "Researcher" });
    expect(person!.body.emails.primaryEmail).toBe("jane@lab.eu");
    expect(opportunity!.body.stage).toBe("NEW");
    expect(opportunity!.body.name).toContain("hiring");
  });

  it("throws on a non-ok CRM response (so the caller can fall back)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 500, text: async () => "boom" }) as any),
    );
    await expect(createLead(lead)).rejects.toThrow(/Twenty/);
  });
});

describe("createLead — the inquiry text", () => {
  beforeEach(() => {
    process.env.TWENTY_API_URL = "https://crm.example.com";
    process.env.TWENTY_API_TOKEN = "real-token";
    process.env.TWENTY_LEAD_STAGE = "NEW";
  });
  afterEach(() => vi.restoreAllMocks());

  /** Mock that hands back a distinct id per endpoint, like the real API. */
  function mockCrm() {
    const calls: { url: string; body: any }[] = [];
    const idFor = (url: string) =>
      url.includes("/people")
        ? "person-1"
        : url.includes("/opportunities")
          ? "opp-1"
          : url.includes("/notes")
            ? "note-1"
            : url.includes("/companies")
              ? "company-1"
              : "target-1";
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: any) => {
        // Lookups are GETs and carry no body.
        calls.push({ url, body: init?.body ? JSON.parse(init.body) : undefined });
        return { ok: true, json: async () => ({ data: { id: idFor(url) } }) } as unknown as Response;
      }),
    );
    return calls;
  }

  it("stores the message as a Note instead of dropping it", async () => {
    const calls = mockCrm();
    await createLead(lead);

    const note = calls.find((c) => c.url.endsWith("/rest/notes"));
    expect(note, "a Note must be created").toBeDefined();
    expect(note!.body.bodyV2.markdown).toContain("We have a DevOps opening.");
  });

  it("records the context the Person and Opportunity records cannot hold", async () => {
    const calls = mockCrm();
    await createLead(lead);

    const markdown = calls.find((c) => c.url.endsWith("/rest/notes"))!.body.bodyV2.markdown;
    expect(markdown).toContain("jane@lab.eu");
    expect(markdown).toContain("CERN");
    expect(markdown).toContain("hiring");
    expect(markdown).toContain("en");
  });

  it("links the Note to both the Person and the Opportunity", async () => {
    const calls = mockCrm();
    await createLead(lead);

    const targets = calls.filter((c) => c.url.endsWith("/rest/noteTargets"));
    expect(targets).toHaveLength(2);
    expect(targets.every((t) => t.body.noteId === "note-1")).toBe(true);
    expect(targets.map((t) => t.body.targetPersonId).filter(Boolean)).toEqual(["person-1"]);
    expect(targets.map((t) => t.body.targetOpportunityId).filter(Boolean)).toEqual(["opp-1"]);
  });

  it("throws when the Note cannot be stored, so the email fallback keeps the text", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) =>
        url.endsWith("/rest/notes")
          ? ({ ok: false, status: 400, text: async () => "bad note" } as any)
          : ({ ok: true, json: async () => ({ data: { id: "x" } }) } as any),
      ),
    );
    await expect(createLead(lead)).rejects.toThrow(/Twenty/);
  });
});

describe("createLead — records Twenty already holds", () => {
  const DUPLICATE = JSON.stringify({
    statusCode: 400,
    error: "BadRequestException",
    messages: ["A duplicate entry was detected"],
  });

  beforeEach(() => {
    process.env.TWENTY_API_URL = "https://crm.example.com";
    process.env.TWENTY_API_TOKEN = "real-token";
    process.env.TWENTY_LEAD_STAGE = "NEW";
  });
  afterEach(() => vi.restoreAllMocks());

  /**
   * A CRM that refuses to create the records named in `duplicates` with the
   * 400 Twenty's duplicate detection actually returns, and answers lookups
   * (GETs) with `found`.
   */
  function mockCrm({
    duplicates = [] as string[],
    found = {} as Record<string, string | null>,
  }) {
    const calls: { url: string; method: string; body: any }[] = [];
    const idFor = (url: string) =>
      url.includes("/people")
        ? "person-1"
        : url.includes("/opportunities")
          ? "opp-1"
          : url.includes("/notes")
            ? "note-1"
            : url.includes("/companies")
              ? "company-1"
              : "target-1";
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: any) => {
        const method = init?.method ?? "GET";
        calls.push({ url, method, body: init?.body ? JSON.parse(init.body) : undefined });

        if (method === "GET") {
          const key = Object.keys(found).find((k) => url.includes(k));
          const id = key ? found[key] : null;
          // Twenty returns the collection under a plural key.
          const collection = url.includes("/people") ? "people" : "companies";
          return {
            ok: true,
            json: async () => ({ data: { [collection]: id ? [{ id }] : [] } }),
          } as unknown as Response;
        }

        if (duplicates.some((d) => url.includes(d))) {
          return { ok: false, status: 400, text: async () => DUPLICATE } as unknown as Response;
        }
        return { ok: true, json: async () => ({ data: { id: idFor(url) } }) } as unknown as Response;
      }),
    );
    return calls;
  }

  it("attaches to the existing Person instead of failing the whole lead", async () => {
    // The regression this fixes: a returning contact is always a duplicate, so
    // the warmest leads were the ones the CRM dropped.
    const calls = mockCrm({ duplicates: ["/rest/people"], found: { "/rest/people?": "person-9" } });

    await expect(createLead(lead)).resolves.toBeUndefined();

    const opportunity = calls.find((c) => c.url.includes("/rest/opportunities"));
    expect(opportunity!.body.pointOfContactId).toBe("person-9");
    const target = calls.find((c) => c.body?.targetPersonId);
    expect(target!.body.targetPersonId).toBe("person-9");
  });

  it("looks the person up by their email address", async () => {
    const calls = mockCrm({ duplicates: ["/rest/people"], found: { "/rest/people?": "person-9" } });
    await createLead(lead);

    const lookup = calls.find((c) => c.method === "GET" && c.url.includes("/rest/people"));
    expect(lookup!.url).toContain("emails.primaryEmail[eq]:jane%40lab.eu");
  });

  it("still lands the lead when the duplicate cannot be found afterwards", async () => {
    // No point of contact is worse than no record at all, and the Note carries
    // the email either way.
    const calls = mockCrm({ duplicates: ["/rest/people"], found: {} });

    await expect(createLead(lead)).resolves.toBeUndefined();

    const opportunity = calls.find((c) => c.url.includes("/rest/opportunities"));
    expect(opportunity!.body).not.toHaveProperty("pointOfContactId");
    const note = calls.find((c) => c.url.includes("/rest/notes"));
    expect(note!.body.bodyV2.markdown).toContain("jane@lab.eu");
  });

  it("throws on a real failure, so a duplicate is not confused with an outage", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: any) =>
        init?.method === "POST" && url.includes("/rest/people")
          ? ({ ok: false, status: 400, text: async () => "malformed payload" } as any)
          : ({ ok: true, json: async () => ({ data: { companies: [] } }) } as any),
      ),
    );
    await expect(createLead(lead)).rejects.toThrow(/Twenty \/rest\/people -> 400/);
  });
});

describe("createLead — the payload Twenty is given", () => {
  beforeEach(() => {
    process.env.TWENTY_API_URL = "https://crm.example.com";
    process.env.TWENTY_API_TOKEN = "real-token";
  });
  afterEach(() => vi.restoreAllMocks());

  function mockCrm() {
    const calls: { url: string; method: string; body: any }[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: any) => {
        calls.push({
          url,
          method: init?.method ?? "GET",
          body: init?.body ? JSON.parse(init.body) : undefined,
        });
        return { ok: true, json: async () => ({ data: { id: "x-1" } }) } as unknown as Response;
      }),
    );
    return calls;
  }

  it("omits the last name rather than sending it blank", async () => {
    // A blank lastName is a value every single-name record in the workspace
    // shares, which is the likeliest reason a first-time lead reads as a
    // duplicate at all.
    const calls = mockCrm();
    await createLead({ ...lead, name: "prova", org: undefined });

    const person = calls.find((c) => c.method === "POST" && c.url.includes("/rest/people"));
    expect(person!.body.name).toEqual({ firstName: "prova" });
    expect(person!.body.name).not.toHaveProperty("lastName");
  });

  it("does not write the organisation into the person's job title", async () => {
    const calls = mockCrm();
    await createLead({ ...lead, org: "try organization" });

    const person = calls.find((c) => c.method === "POST" && c.url.includes("/rest/people"));
    expect(person!.body).not.toHaveProperty("jobTitle");
  });

  it("resolves the organisation to a Company and links both records to it", async () => {
    const calls = mockCrm();
    await createLead({ ...lead, org: "CERN" });

    const lookup = calls.find((c) => c.method === "GET" && c.url.includes("/rest/companies"));
    expect(lookup!.url).toContain("name[eq]:CERN");
    const person = calls.find((c) => c.method === "POST" && c.url.includes("/rest/people"));
    const opportunity = calls.find((c) => c.url.includes("/rest/opportunities"));
    expect(person!.body.companyId).toBe("x-1");
    expect(opportunity!.body.companyId).toBe("x-1");
  });

  it("touches the companies endpoint at all only when an org was given", async () => {
    const calls = mockCrm();
    await createLead({ ...lead, org: undefined });
    expect(calls.some((c) => c.url.includes("/rest/companies"))).toBe(false);
  });

  it("lands the lead even when the company cannot be resolved", async () => {
    const calls: { url: string; method: string; body: any }[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: any) => {
        const method = init?.method ?? "GET";
        calls.push({ url, method, body: init?.body ? JSON.parse(init.body) : undefined });
        if (url.includes("/rest/companies")) {
          return { ok: false, status: 500, text: async () => "company boom" } as any;
        }
        return { ok: true, json: async () => ({ data: { id: "x-1" } }) } as any;
      }),
    );

    await expect(createLead(lead)).resolves.toBeUndefined();
    const person = calls.find((c) => c.method === "POST" && c.url.includes("/rest/people"));
    expect(person!.body).not.toHaveProperty("companyId");
  });
});
