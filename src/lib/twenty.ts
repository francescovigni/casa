// Twenty CRM integration. Kept isolated so the exact field mapping can be
// finalized against the live workspace schema without touching the endpoint.
//
// Config comes from env (k8s Secret). While the token is unset or still the
// placeholder, isConfigured() is false and the caller falls back to email.
//
// Two rules shape the error handling here:
//
//   - Throw when the CRM record would be materially incomplete, because the
//     caller answers a throw by emailing the lead instead. The message text is
//     the thing that must never be lost.
//   - Recover, do not throw, when Twenty refuses a record it already holds.
//     Its duplicate detection rejects a create with 400; the useful answer is
//     to find the existing record and attach to it. A returning contact is a
//     warm lead, and it used to be exactly the one the CRM dropped.

export interface Lead {
  name: string;
  email: string;
  org?: string;
  message: string;
  intent: string; // hiring | collaboration | project
  locale: string;
}

const PLACEHOLDER = new Set(["", "changeme", "placeholder", "REPLACE_ME"]);

// Runtime secrets are read from process.env (injected by the k8s Secret at
// container start), NOT import.meta.env, which is inlined at build time.
export function isConfigured(): boolean {
  const url = process.env.TWENTY_API_URL;
  const token = process.env.TWENTY_API_TOKEN;
  return Boolean(url && token && !PLACEHOLDER.has(token));
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

type Reply =
  | { ok: true; data: any }
  | { ok: false; status: number; text: string };

async function send(method: "GET" | "POST", path: string, body?: unknown): Promise<Reply> {
  const base = (process.env.TWENTY_API_URL || "").replace(/\/$/, "");
  const res = await fetch(`${base}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.TWENTY_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  if (res.ok) return { ok: true, data: await res.json() };
  const text = await res.text().catch(() => "");
  return { ok: false, status: res.status, text };
}

function failure(path: string, reply: { status: number; text: string }): Error {
  return new Error(`Twenty ${path} -> ${reply.status} ${reply.text.slice(0, 300)}`);
}

async function post(path: string, body: unknown): Promise<any> {
  const reply = await send("POST", path, body);
  if (!reply.ok) throw failure(path, reply);
  return reply.data;
}

/** Twenty answers differently per endpoint and version; take whichever id is there. */
export function idOf(res: any): string | undefined {
  const data = res?.data ?? res;
  if (!data || typeof data !== "object") return undefined;
  if (typeof data.id === "string") return data.id;
  if (Array.isArray(data)) return idOf(data[0]);
  for (const value of Object.values(data)) {
    const found = idOf(value);
    if (found) return found;
  }
  return undefined;
}

/**
 * Twenty's duplicate detection answers a create with 400 and "A duplicate entry
 * was detected", which is a refusal rather than an outage: the record exists, or
 * something close enough to it does.
 */
function isDuplicate(reply: { status: number; text: string }): boolean {
  return (reply.status === 400 || reply.status === 409) && /duplicate/i.test(reply.text);
}

/** First matching record id, or undefined. A failed lookup is not fatal. */
async function findId(path: string): Promise<string | undefined> {
  const reply = await send("GET", path);
  return reply.ok ? idOf(reply.data) : undefined;
}

const byEmail = (email: string) =>
  `/rest/people?filter=emails.primaryEmail[eq]:${encodeURIComponent(email)}&limit=1&depth=0`;
const byCompanyName = (name: string) =>
  `/rest/companies?filter=name[eq]:${encodeURIComponent(name)}&limit=1&depth=0`;

/**
 * The lead's organisation as a Company. It used to be written to the Person's
 * jobTitle, which made "ACME" read as someone's job.
 *
 * Never throws: if the company cannot be resolved the lead still lands, and the
 * organisation is in the Note either way.
 */
async function resolveCompanyId(org: string): Promise<string | undefined> {
  const existing = await findId(byCompanyName(org));
  if (existing) return existing;

  const created = await send("POST", "/rest/companies", { name: org });
  if (created.ok) return idOf(created.data);
  if (isDuplicate(created)) return await findId(byCompanyName(org));
  return undefined;
}

/**
 * The Person, reusing the existing record when Twenty says it already has one.
 * Empty fields are omitted rather than sent blank: a `lastName: ""` is a value
 * that every single-name record in the workspace shares, which is the likeliest
 * reason a first-time lead was called a duplicate at all.
 */
async function resolvePersonId(lead: Lead, companyId?: string): Promise<string | undefined> {
  const { firstName, lastName } = splitName(lead.name);
  const payload: Record<string, unknown> = {
    name: lastName ? { firstName, lastName } : { firstName },
    emails: { primaryEmail: lead.email },
    ...(companyId ? { companyId } : {}),
  };

  const created = await send("POST", "/rest/people", payload);
  if (created.ok) return idOf(created.data);
  if (isDuplicate(created)) return await findId(byEmail(lead.email));
  throw failure("/rest/people", created);
}

/** The lead's own words, plus the context Person and Opportunity cannot hold. */
export function noteBody(lead: Lead): string {
  return [
    `**Email:** ${lead.email}`,
    `**Org:** ${lead.org || "-"}`,
    `**Intent:** ${lead.intent}`,
    `**Locale:** ${lead.locale}`,
    "",
    lead.message,
  ].join("\n");
}

/**
 * Create a Person and a linked Opportunity for a qualified lead, then store the
 * message itself as a Note targeted at both. Without the Note the inquiry text
 * is lost: no other record holds it. A failure there throws like any other, so
 * the caller's email fallback still carries the text.
 * Opportunity stage comes from TWENTY_LEAD_STAGE (default "NEW").
 */
export async function createLead(lead: Lead): Promise<void> {
  const stage = process.env.TWENTY_LEAD_STAGE || "NEW";

  const companyId = lead.org ? await resolveCompanyId(lead.org) : undefined;
  const personId = await resolvePersonId(lead, companyId);

  const opportunity = await post("/rest/opportunities", {
    name: `${lead.name} (${lead.intent})`,
    stage,
    ...(personId ? { pointOfContactId: personId } : {}),
    ...(companyId ? { companyId } : {}),
  });
  const opportunityId = idOf(opportunity);

  const note = await post("/rest/notes", {
    title: `Lead: ${lead.name} (${lead.intent})`,
    bodyV2: { markdown: noteBody(lead) },
  });
  const noteId = idOf(note);

  // One target row per record: Twenty shows the note on both timelines.
  await Promise.all([
    personId ? post("/rest/noteTargets", { noteId, targetPersonId: personId }) : null,
    opportunityId ? post("/rest/noteTargets", { noteId, targetOpportunityId: opportunityId }) : null,
  ]);
}
