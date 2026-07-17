// Lead fallback: a lead must never be lost. We always log a structured record
// (captured by container logs) and, if SMTP is configured, email it too.
import type { Lead } from "./twenty";

const FALLBACK_TO = () => import.meta.env.LEAD_FALLBACK_EMAIL || "hello@francescovigni.com";

export async function notifyFallback(lead: Lead, reason: string): Promise<void> {
  // Always log — this is the guaranteed capture path.
  console.error(
    "[lead-fallback]",
    JSON.stringify({ reason, lead, at: new Date().toISOString() }),
  );

  const smtp = import.meta.env.SMTP_URL;
  if (!smtp) return; // logging is enough when no mailer is configured

  try {
    // Dynamic import so nodemailer is only needed when SMTP is actually set.
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport(smtp);
    await transport.sendMail({
      to: FALLBACK_TO(),
      from: FALLBACK_TO(),
      replyTo: lead.email,
      subject: `New lead (${lead.intent}) — ${lead.name}`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Org: ${lead.org || "-"}`,
        `Intent: ${lead.intent}`,
        `Locale: ${lead.locale}`,
        `Reason for fallback: ${reason}`,
        "",
        lead.message,
      ].join("\n"),
    });
  } catch (e) {
    console.error("[lead-fallback] email failed", e);
  }
}
