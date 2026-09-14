// Verify the mail path before it is buried in a Kubernetes Secret.
//
//   node scripts/check-smtp.mjs /root/web.env
//
// Reads the file the way kubectl will (literally, quotes and all) rather than
// through node --env-file, which strips quotes and would hide a value that
// breaks in the cluster. The password is never printed or passed as an
// argument. Falls back to the environment when no path is given.
//
// Sends one message shaped exactly like a real lead notification: same From,
// To and Reply-To as src/lib/notify.ts, because the From header is what Gmail
// rejects when the address is not the authenticated account or a verified alias.
import { readFileSync } from "node:fs";
import { checkSmtpUrl, parseEnvFile } from "./smtp-url.mjs";

const path = process.argv[2];
const fromFile = path ? parseEnvFile(readFileSync(path, "utf8")) : {};
const smtp = fromFile.SMTP_URL ?? process.env.SMTP_URL;
const to =
  fromFile.LEAD_FALLBACK_EMAIL || process.env.LEAD_FALLBACK_EMAIL || "hello@francescovigni.com";

const check = checkSmtpUrl(smtp);
if (!check.ok) {
  console.error("SMTP_URL is not usable:\n");
  check.problems.forEach((p) => console.error(`  - ${p}`));
  console.error("\nNothing was sent.");
  process.exit(1);
}

console.log(`connection : ${check.summary}`);
console.log(`from / to  : ${to}`);

const nodemailer = await import("nodemailer");
const transport = nodemailer.createTransport(smtp.replace(/^['"]|['"]$/g, ""));

try {
  await transport.verify();
  console.log("handshake  : ok (server accepted the credentials)");
} catch (e) {
  console.error(`handshake  : FAILED — ${e.message}`);
  console.error(
    "\nInvalid login usually means the account password was used instead of an app password,\n" +
      "or 2-Step Verification is not enabled on the account.",
  );
  process.exit(1);
}

try {
  const info = await transport.sendMail({
    to,
    from: to,
    replyTo: "lead@example.com",
    subject: "New lead (hiring): SMTP check",
    text: "If this arrived, the lead fallback path works. Sent by scripts/check-smtp.mjs.",
  });
  console.log(`delivery   : accepted (${info.messageId})`);
  console.log(`\nCheck ${to}. If nothing arrives, the message was accepted but dropped downstream.`);
} catch (e) {
  console.error(`delivery   : FAILED — ${e.message}`);
  console.error(
    `\nGmail only sends as the authenticated account or a verified alias. Either add ${to}\n` +
      'under Gmail → Settings → Accounts → "Send mail as", or set LEAD_FALLBACK_EMAIL to the\n' +
      "Gmail address in deploy/helm/values.yaml.",
  );
  process.exit(1);
}
