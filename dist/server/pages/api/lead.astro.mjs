export { renderers } from '../../renderers.mjs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_INTENTS = /* @__PURE__ */ new Set(["hiring", "collaboration", "project"]);
function validateLead(payload) {
  if (typeof payload.company_website === "string" && payload.company_website.trim() !== "") {
    return { ok: false, status: 200, error: "honeypot" };
  }
  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const org = String(payload.org ?? "").trim();
  const intent = String(payload.intent ?? "").trim();
  const locale = payload.locale === "it" ? "it" : "en";
  if (name.length < 2) return { ok: false, status: 422, error: "name required" };
  if (!EMAIL_RE.test(email)) return { ok: false, status: 422, error: "valid email required" };
  if (message.length < 3) return { ok: false, status: 422, error: "message required" };
  if (!VALID_INTENTS.has(intent)) return { ok: false, status: 422, error: "invalid intent" };
  if (name.length > 200 || email.length > 320 || message.length > 5e3 || org.length > 200) {
    return { ok: false, status: 422, error: "field too long" };
  }
  return { ok: true, lead: { name, email, org: org || void 0, message, intent, locale } };
}
const WINDOW_MS = 6e4;
const MAX_PER_WINDOW = 5;
const hits = /* @__PURE__ */ new Map();
function rateLimited(ip, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const PLACEHOLDER = /* @__PURE__ */ new Set(["", "changeme", "placeholder", "REPLACE_ME"]);
function isConfigured() {
  const url = process.env.TWENTY_API_URL;
  const token = process.env.TWENTY_API_TOKEN;
  return Boolean(url && token && !PLACEHOLDER.has(token));
}
function splitName(full) {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}
async function post(path, body) {
  const base = (process.env.TWENTY_API_URL || "").replace(/\/$/, "");
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TWENTY_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Twenty ${path} -> ${res.status} ${text.slice(0, 300)}`);
  }
  return res.json();
}
async function createLead(lead) {
  const { firstName, lastName } = splitName(lead.name);
  const stage = process.env.TWENTY_LEAD_STAGE || "NEW";
  const person = await post("/rest/people", {
    name: { firstName, lastName },
    emails: { primaryEmail: lead.email },
    jobTitle: lead.org || void 0
  });
  const personId = person?.data?.createPerson?.id ?? person?.data?.id ?? person?.id;
  await post("/rest/opportunities", {
    name: `${lead.name} — ${lead.intent}`,
    stage,
    pointOfContactId: personId,
    // Store the qualifier context somewhere queryable. If a custom field
    // isn't present yet, Twenty ignores unknown keys or errors — finalize live.
    ...personId ? {} : {}
  });
}

const FALLBACK_TO = () => process.env.LEAD_FALLBACK_EMAIL || "hello@francescovigni.com";
async function notifyFallback(lead, reason) {
  console.error(
    "[lead-fallback]",
    JSON.stringify({ reason, lead, at: (/* @__PURE__ */ new Date()).toISOString() })
  );
  const smtp = process.env.SMTP_URL;
  if (!smtp) return;
  try {
    const nodemailer = await import('nodemailer');
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
        lead.message
      ].join("\n")
    });
  } catch (e) {
    console.error("[lead-fallback] email failed", e);
  }
}

const prerender = false;
const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json" }
});
const POST = async ({ request, clientAddress }) => {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: "invalid JSON" });
  }
  const ip = clientAddress || "unknown";
  if (rateLimited(ip)) return json(429, { error: "too many requests" });
  const result = validateLead(payload);
  if (!result.ok) {
    return json(result.status, result.status === 200 ? { ok: true } : { error: result.error });
  }
  const { lead } = result;
  if (isConfigured()) {
    try {
      await createLead(lead);
      return json(200, { ok: true });
    } catch (e) {
      await notifyFallback(lead, `crm-error: ${e.message}`);
      return json(200, { ok: true });
    }
  }
  await notifyFallback(lead, "crm-not-configured");
  return json(200, { ok: true });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
