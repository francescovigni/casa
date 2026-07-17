// Pure, testable helpers for the lead endpoint: validation, honeypot, and a
// tiny in-memory per-IP rate limiter. No I/O here so unit tests stay simple.
import type { Lead } from "./twenty";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_INTENTS = new Set(["hiring", "collaboration", "project"]);

export type ValidateResult =
  | { ok: true; lead: Lead }
  | { ok: false; status: number; error: string };

export function validateLead(payload: Record<string, unknown>): ValidateResult {
  // Honeypot: real users never fill this. Treat as spam but look successful.
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
  if (name.length > 200 || email.length > 320 || message.length > 5000 || org.length > 200) {
    return { ok: false, status: 422, error: "field too long" };
  }

  return { ok: true, lead: { name, email, org: org || undefined, message, intent, locale } };
}

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

// Test hook.
export function _resetRateLimit(): void {
  hits.clear();
}
