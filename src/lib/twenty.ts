// Twenty CRM integration. Kept isolated so the exact field mapping can be
// finalized against the live workspace schema without touching the endpoint.
//
// Config comes from env (k8s Secret). While the token is unset or still the
// placeholder, isConfigured() is false and the caller falls back to email.

export interface Lead {
  name: string;
  email: string;
  org?: string;
  message: string;
  intent: string; // hiring | collaboration | project
  locale: string;
}

const PLACEHOLDER = new Set(["", "changeme", "placeholder", "REPLACE_ME"]);

export function isConfigured(): boolean {
  const url = import.meta.env.TWENTY_API_URL;
  const token = import.meta.env.TWENTY_API_TOKEN;
  return Boolean(url && token && !PLACEHOLDER.has(token));
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

async function post(path: string, body: unknown): Promise<any> {
  const base = import.meta.env.TWENTY_API_URL.replace(/\/$/, "");
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.TWENTY_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Twenty ${path} -> ${res.status} ${text.slice(0, 300)}`);
  }
  return res.json();
}

/**
 * Create a Person and a linked Opportunity for a qualified lead.
 * Opportunity stage comes from TWENTY_LEAD_STAGE (default "NEW").
 * Field names follow Twenty's REST convention; adjust to the live schema.
 */
export async function createLead(lead: Lead): Promise<void> {
  const { firstName, lastName } = splitName(lead.name);
  const stage = import.meta.env.TWENTY_LEAD_STAGE || "NEW";

  const person = await post("/rest/people", {
    name: { firstName, lastName },
    emails: { primaryEmail: lead.email },
    jobTitle: lead.org || undefined,
  });
  const personId = person?.data?.createPerson?.id ?? person?.data?.id ?? person?.id;

  await post("/rest/opportunities", {
    name: `${lead.name} — ${lead.intent}`,
    stage,
    pointOfContactId: personId,
    // Store the qualifier context somewhere queryable. If a custom field
    // isn't present yet, Twenty ignores unknown keys or errors — finalize live.
    ...(personId ? {} : {}),
  });
}
