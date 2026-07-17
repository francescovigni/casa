import type { APIRoute } from "astro";
import { validateLead, rateLimited } from "../../lib/lead";
import { createLead, isConfigured } from "../../lib/twenty";
import { notifyFallback } from "../../lib/notify";

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

  // Try the CRM; on any failure (or when unconfigured) fall back so no lead
  // is ever lost. The visitor always sees success once past validation.
  if (isConfigured()) {
    try {
      await createLead(lead);
      return json(200, { ok: true });
    } catch (e) {
      await notifyFallback(lead, `crm-error: ${(e as Error).message}`);
      return json(200, { ok: true });
    }
  }

  await notifyFallback(lead, "crm-not-configured");
  return json(200, { ok: true });
};
