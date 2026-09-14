// Validation for SMTP_URL, kept separate from the sender so it can be tested.
// Every rule here corresponds to a mistake that fails at send time with an
// error that does not name the real cause.

/**
 * @param {string | undefined} raw
 * @returns {{ ok: boolean, problems: string[], summary?: string }}
 */
export function checkSmtpUrl(raw) {
  const problems = [];
  if (!raw || raw.trim() === "") {
    return { ok: false, problems: ["SMTP_URL is empty: leads would only reach the logs."] };
  }

  if (/^["']|["']$/.test(raw)) {
    problems.push(
      "Value is wrapped in quotes. `kubectl --from-env-file` keeps them literally: write it bare.",
    );
  }
  const value = raw.replace(/^["']|["']$/g, "");

  if (/\s/.test(value)) {
    problems.push("Value contains a space. App passwords are shown grouped; remove the spaces.");
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    return { ok: false, problems: [...problems, `Not a valid URL: ${value.slice(0, 24)}…`] };
  }

  if (!["smtp:", "smtps:"].includes(url.protocol)) {
    problems.push(`Protocol is ${url.protocol}; expected smtp: or smtps:.`);
  }
  if (!url.username) {
    problems.push("No username in the url.");
  }
  if (!url.password) problems.push("No password.");

  const isGmail = url.hostname.endsWith("gmail.com");
  if (isGmail) {
    if (!/^[a-z]{16}$/i.test(decodeURIComponent(url.password || ""))) {
      problems.push(
        "Gmail expects a 16-character app password, not the account password (2-Step Verification must be on).",
      );
    }
    if (!["465", "587", ""].includes(url.port)) {
      problems.push(`Gmail uses port 465 (smtps) or 587 (STARTTLS); got ${url.port}.`);
    }
  }

  return {
    ok: problems.length === 0,
    problems,
    summary: `${url.protocol}//${url.username}:***@${url.hostname}:${url.port || "default"}`,
  };
}

/**
 * Parse an env file the way `kubectl create secret --from-env-file` does:
 * literally. Node's --env-file strips surrounding quotes, kubectl keeps them,
 * so reading the file ourselves is the only way to see what the cluster will.
 *
 * @param {string} text
 * @returns {Record<string, string>}
 */
export function parseEnvFile(text) {
  /** @type {Record<string, string>} */
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    out[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1);
  }
  return out;
}
