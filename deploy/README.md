# Deploy

The site is an Astro **node standalone** server (SSR for the paired English
pages so the geo middleware can redirect; everything else prerendered). It ships
as a single container and runs on the existing single-node k3s cluster behind
Caddy (TLS edge) behind Cloudflare.

## Build the image

```bash
docker build -t ghcr.io/francescovigni/website:<tag> .
docker push ghcr.io/francescovigni/website:<tag>
```

## Install / upgrade (Helm)

Secrets are **placeholders** in `values.yaml` — pass the real values at install
time and keep them out of git:

```bash
helm upgrade --install web ./deploy/helm \
  --atomic --timeout 2m \
  --set image.tag=<tag> \
  --set-string secrets.TWENTY_API_URL=https://crm.francescovigni.com \
  --set-string secrets.TWENTY_API_TOKEN=<token> \
  --set-string secrets.SMTP_URL=smtp://user:pass@host:587 \
  --set config.TWENTY_LEAD_STAGE=NEW
```

`--atomic` rolls back automatically if the readiness probe never passes.
Pin `image.tag` to a digest in production for reproducible, reversible deploys.

## Runtime env

| Var | Where | Purpose |
|-----|-------|---------|
| `TWENTY_API_URL` | Secret | Twenty CRM REST base |
| `TWENTY_API_TOKEN` | Secret | Twenty CRM API token (placeholder → CRM skipped, email fallback used) |
| `TWENTY_LEAD_STAGE` | ConfigMap | Opportunity stage for new leads (default `NEW`) |
| `SMTP_URL` | Secret | Enables the email fallback for leads |
| `LEAD_FALLBACK_EMAIL` | ConfigMap | Where lead fallbacks are emailed (default `hello@francescovigni.com`) |

Until `TWENTY_API_TOKEN` is real, leads are **logged and emailed** (never lost),
so the site is safe to deploy before the CRM wiring is finalized.

## Cloudflare / Caddy

- Cloudflare must be **proxied** (orange-cloud) so the `CF-IPCountry` header
  reaches the app — that header drives the auto-Italian redirect.
- Caddy stays the TLS edge and reverse-proxies to the Service NodePort
  (loopback-scoped), matching the other self-hosted services.

## Cutover from Gatsby

1. Deploy this container to a staging host; smoke-test EN/IT, the language
   toggle, the qualifier form, and `/api/lead`.
2. Point Caddy at the new Service; 301 any old Gatsby-only URLs to their new
   equivalents.
3. Keep `main` (Gatsby) recoverable until the new site is confirmed live.
