// Sections of the old Gatsby site that Google still lists. Each lands on the
// page that now carries that material, with a 301 so the ranking follows.
const LEGACY: [RegExp, string][] = [
  [/^\/(blog|projects|publications|talks|news)(\/|$)/, "/work/"],
  [/^\/insights(\/|$)/, "/research/"],
  [/^\/it\/approfondimenti(\/|$)/, "/research/"],
];

/** Where a legacy path now lives, or null for anything that is not legacy. */
export function legacyRedirect(path: string): string | null {
  return LEGACY.find(([pattern]) => pattern.test(path))?.[1] ?? null;
}
