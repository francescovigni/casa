/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Runtime secrets are read via process.env (injected by the k8s Secret at
// container start), so they are NOT declared on ImportMetaEnv here — that would
// wrongly inline them at build time. See src/lib/twenty.ts and src/lib/notify.ts.
//
//   TWENTY_API_URL     Twenty CRM REST base, e.g. https://crm.example.com
//   TWENTY_API_TOKEN   Twenty CRM API token (secret)
//   TWENTY_LEAD_STAGE  Opportunity stage for new leads (default "NEW")
//   SMTP_URL           smtp://user:pass@host:587 for the email fallback
//   LEAD_FALLBACK_EMAIL  where lead-capture fallbacks are emailed
