// Lead notification. Every validated lead is logged and, when SMTP is set,
// emailed, whether or not the CRM took it. The CRM is where a lead is worked;
// the email is how it gets noticed today, and it says which of the two you are
// looking at so a rescue is never mistaken for business as usual.
//
// The log line comes first and cannot fail: it is the guaranteed capture path,
// and it has to survive a dead mail host.
import type { CrmResult, Lead } from "./twenty";

/** What became of the CRM write, for the log line and the email's status. */
export type Outcome = { ok: true; crm: CrmResult } | { ok: false; reason: string };

const FALLBACK_TO = () => process.env.LEAD_FALLBACK_EMAIL || "hello@francescovigni.com";

/**
 * Origin of the Twenty web app, for links to the records just created.
 * Defaults to the API host, which is the same deployment; TWENTY_APP_URL
 * overrides it when the app is served from somewhere else.
 */
function appOrigin(): string | undefined {
  const base = process.env.TWENTY_APP_URL || process.env.TWENTY_API_URL;
  if (!base) return undefined;
  try {
    return new URL(base).origin;
  } catch {
    return undefined;
  }
}

function recordLinks(crm: CrmResult): string[] {
  const origin = appOrigin();
  if (!origin) return [];
  const links: string[] = [];
  if (crm.personId) links.push(`Person: ${origin}/object/person/${crm.personId}`);
  if (crm.opportunityId) {
    links.push(`Opportunity: ${origin}/object/opportunity/${crm.opportunityId}`);
  }
  return links;
}

export async function notifyLead(lead: Lead, outcome: Outcome): Promise<void> {
  const record = JSON.stringify({
    reason: outcome.ok ? "crm-ok" : outcome.reason,
    lead,
    ...(outcome.ok ? { crm: outcome.crm } : {}),
    at: new Date().toISOString(),
  });
  // Two tags on purpose: [lead-fallback] stays the string to grep for when
  // something needs doing by hand.
  if (outcome.ok) console.log("[lead]", record);
  else console.error("[lead-fallback]", record);

  const smtp = process.env.SMTP_URL;
  if (!smtp) return; // logging is enough when no mailer is configured

  try {
    // Dynamic import so nodemailer is only needed when SMTP is actually set.
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport(smtp);
    const status = outcome.ok
      ? ["In CRM: yes", ...recordLinks(outcome.crm)]
      : [`In CRM: NO (${outcome.reason})`, "This one needs adding by hand."];
    await transport.sendMail({
      to: FALLBACK_TO(),
      from: FALLBACK_TO(),
      // Reply goes to the lead, so answering is one keystroke from the inbox.
      replyTo: lead.email,
      subject: `New lead (${lead.intent}): ${lead.name}${outcome.ok ? "" : " [not in CRM]"}`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Org: ${lead.org || "-"}`,
        `Intent: ${lead.intent}`,
        `Locale: ${lead.locale}`,
        ...status,
        "",
        lead.message,
      ].join("\n"),
    });
  } catch (e) {
    // The lead is already in the log, and in the CRM if the write succeeded.
    console.error("[lead-mail] send failed", e);
  }
}
