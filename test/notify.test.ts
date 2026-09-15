import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { notifyLead } from "../src/lib/notify";
import type { Lead } from "../src/lib/twenty";

const sent: any[] = [];
const sendMail = vi.fn(async (message: any) => {
  sent.push(message);
  return { messageId: "1" };
});
vi.mock("nodemailer", () => ({
  default: { createTransport: () => ({ sendMail }) },
  createTransport: () => ({ sendMail }),
}));

const lead: Lead = {
  name: "Jane Researcher",
  email: "jane@lab.eu",
  org: "CERN",
  message: "We have a DevOps opening.",
  intent: "hiring",
  locale: "en",
};

const crm = { personId: "person-1", opportunityId: "opp-1", noteId: "note-1" };

const saved = { ...process.env };

beforeEach(() => {
  sent.length = 0;
  sendMail.mockClear();
  process.env.SMTP_URL = "smtp://user:pass@mail.example.com:587";
  process.env.LEAD_FALLBACK_EMAIL = "hello@francescovigni.com";
  process.env.TWENTY_API_URL = "https://crm.example.com";
  delete process.env.TWENTY_APP_URL;
});
afterEach(() => {
  process.env = { ...saved };
  vi.restoreAllMocks();
});

describe("every lead is both filed and announced", () => {
  it("emails on the happy path, not only when the CRM refused", async () => {
    await notifyLead(lead, { ok: true, crm });

    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sent[0].to).toBe("hello@francescovigni.com");
    expect(sent[0].subject).toBe("New lead (hiring): Jane Researcher");
    expect(sent[0].text).toContain("We have a DevOps opening.");
  });

  it("says the lead is in the CRM, and links the records", async () => {
    await notifyLead(lead, { ok: true, crm });

    expect(sent[0].text).toContain("In CRM: yes");
    expect(sent[0].text).toContain("https://crm.example.com/object/person/person-1");
    expect(sent[0].text).toContain("https://crm.example.com/object/opportunity/opp-1");
  });

  it("marks a rescue in the subject, so the inbox can be triaged at a glance", async () => {
    await notifyLead(lead, { ok: false, reason: "crm-error: Twenty /rest/people -> 500 boom" });

    expect(sent[0].subject).toBe("New lead (hiring): Jane Researcher [not in CRM]");
    expect(sent[0].text).toContain("In CRM: NO (crm-error: Twenty /rest/people -> 500 boom)");
    expect(sent[0].text).toContain("needs adding by hand");
  });

  it("replies to the lead, not to the mailbox it came from", async () => {
    await notifyLead(lead, { ok: true, crm });
    expect(sent[0].replyTo).toBe("jane@lab.eu");
  });

  it("carries the whole lead either way", async () => {
    for (const outcome of [
      { ok: true as const, crm },
      { ok: false as const, reason: "crm-not-configured" },
    ]) {
      sent.length = 0;
      await notifyLead(lead, outcome);
      const text = sent[0].text;
      ["Jane Researcher", "jane@lab.eu", "CERN", "hiring", "en", lead.message].forEach((part) =>
        expect(text, JSON.stringify(outcome)).toContain(part),
      );
    }
  });
});

describe("the log line is the guaranteed capture", () => {
  it("tags a filed lead [lead] and never [lead-fallback]", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    await notifyLead(lead, { ok: true, crm });

    expect(log).toHaveBeenCalledWith("[lead]", expect.stringContaining('"reason":"crm-ok"'));
    expect(log.mock.calls[0][1]).toContain("person-1");
    expect(error).not.toHaveBeenCalled();
  });

  it("keeps [lead-fallback] as the string to grep for work to do by hand", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    await notifyLead(lead, { ok: false, reason: "crm-not-configured" });

    expect(error).toHaveBeenCalledWith(
      "[lead-fallback]",
      expect.stringContaining('"reason":"crm-not-configured"'),
    );
  });

  it("logs before the mailer is attempted, so a dead host loses nothing", async () => {
    const order: string[] = [];
    vi.spyOn(console, "log").mockImplementation(() => {
      order.push("log");
    });
    sendMail.mockImplementationOnce(async () => {
      order.push("mail");
      throw new Error("connection refused");
    });
    vi.spyOn(console, "error").mockImplementation(() => {});

    await notifyLead(lead, { ok: true, crm });

    expect(order).toEqual(["log", "mail"]);
  });

  it("does not reject when the mail fails, the CRM write having already landed", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
    sendMail.mockImplementationOnce(async () => {
      throw new Error("connection refused");
    });

    await expect(notifyLead(lead, { ok: true, crm })).resolves.toBeUndefined();
  });
});

describe("configuration", () => {
  it("logs and sends nothing when SMTP is unset", async () => {
    delete process.env.SMTP_URL;
    const log = vi.spyOn(console, "log").mockImplementation(() => {});

    await notifyLead(lead, { ok: true, crm });

    expect(log).toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("prefers TWENTY_APP_URL for the links when the app is served elsewhere", async () => {
    process.env.TWENTY_APP_URL = "https://twenty.francescovigni.com/some/path";
    await notifyLead(lead, { ok: true, crm });
    expect(sent[0].text).toContain("https://twenty.francescovigni.com/object/person/person-1");
  });

  it("omits the links rather than inventing them when no url is known", async () => {
    delete process.env.TWENTY_API_URL;
    delete process.env.TWENTY_APP_URL;
    await notifyLead(lead, { ok: true, crm });
    expect(sent[0].text).toContain("In CRM: yes");
    expect(sent[0].text).not.toContain("/object/person/");
  });

  it("still reports the lead as filed when the ids came back empty", async () => {
    // Twenty took the records but answered in a shape we could not read.
    await notifyLead(lead, { ok: true, crm: {} });
    expect(sent[0].subject).not.toContain("[not in CRM]");
    expect(sent[0].text).toContain("In CRM: yes");
  });
});
