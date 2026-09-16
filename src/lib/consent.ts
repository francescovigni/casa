// Consent for session replay. Pageviews are cookieless and load for everyone;
// only the Umami recorder waits for a yes. Pure helpers, no DOM, so the rules
// are unit-tested and the component script stays a thin shell.

export const CONSENT_COOKIE = "consent";

/** About six months: the Garante's floor before asking again after a refusal. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;

export type Consent = "replay" | "none";

/** The stored answer, or null when the visitor has not chosen yet. */
export function readConsent(cookie: string): Consent | null {
  const value = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  return value === "replay" || value === "none" ? value : null;
}

/** A string for `document.cookie` that stores `choice`. */
export function consentCookie(choice: Consent): string {
  return `${CONSENT_COOKIE}=${choice}; path=/; max-age=${CONSENT_MAX_AGE}; samesite=lax`;
}
