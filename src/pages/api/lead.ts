import type { APIRoute } from "astro";
import { validateLead, rateLimited } from "../../lib/lead";
import { createLead, isConfigured, type CrmResult } from "../../lib/twenty";
import { notifyLead, type Outcome } from "../../lib/notify";

// Server-rendered (never prerender an API route).
export const prerender = false;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: "invalid JSON" });
  }

  const ip = clientAddress || "unknown";
  if (rateLimited(ip)) return json(429, { error: "too many requests" });

  const result = validateLead(payload);
  if (!result.ok) {
    // Honeypot returns 200 so bots don't learn they were caught.
    return json(result.status, result.status === 200 ? { ok: true } : { error: result.error });
  }

  const { lead } = result;

  // Write to the CRM, then notify either way: the CRM is where a lead is
  // worked, the email is how it gets noticed. On any CRM failure (or when
  // unconfigured) the email carries the lead instead, so none is ever lost.
  let crm: CrmResult | undefined;
  let reason: string | undefined;
  if (isConfigured()) {
    try {
      crm = await createLead(lead);
    } catch (e) {
      reason = `crm-error: ${(e as Error).message}`;
    }
  } else {
    reason = "crm-not-configured";
  }

  const outcome: Outcome = reason ? { ok: false, reason } : { ok: true, crm: crm ?? {} };
  try {
    await notifyLead(lead, outcome);
  } catch (e) {
    // Never fail the visitor over the notification: by here the lead is
    // already in the CRM, or about to be chased through the logs.
    console.error("[lead] notify threw", e);
  }

  // The visitor always sees success once past validation.
  return json(200, { ok: true });
};
