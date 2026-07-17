/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Twenty CRM REST base, e.g. https://crm.example.com/rest — placeholder until live */
  readonly TWENTY_API_URL: string;
  /** Twenty CRM API token — server-only secret, never committed */
  readonly TWENTY_API_TOKEN: string;
  /** Opportunity stage new leads land in */
  readonly TWENTY_LEAD_STAGE?: string;
  /** SMTP URL for the email fallback, e.g. smtp://user:pass@host:587 */
  readonly SMTP_URL?: string;
  /** Where lead-capture failures are emailed */
  readonly LEAD_FALLBACK_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
