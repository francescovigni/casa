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

Credentials live in an env file on the host and become a Secret you own, so
they never pass through Helm and never appear in `helm get values`.

```bash
# once: create the Secret from an env file
cp deploy/web.env.example /root/web.env && chmod 600 /root/web.env   # then edit it
kubectl create secret generic web-env --from-env-file=/root/web.env \
  --dry-run=client -o yaml | kubectl apply -f -

# every deploy
helm upgrade --install web ./deploy/helm \
  --atomic --timeout 2m \
  --set image.tag=<tag> \
  --set existingSecret=web-env
```

Create the Secret **before** the first install: with `existingSecret` set, the
pod cannot start without it, and `--atomic` will roll the release back.

After changing a value in the env file, re-apply it and restart the pods —
`envFrom` is read at container start, not watched:

```bash
kubectl create secret generic web-env --from-env-file=/root/web.env \
  --dry-run=client -o yaml | kubectl apply -f -
kubectl rollout restart deploy/web-francescovigni-web
```

Leaving `existingSecret` empty keeps the older behaviour: the chart renders the
Secret itself from `values.secrets`, which you then have to pass at install
time (`--set-string secrets.SMTP_URL=...`) or in a values file kept out of git.
Helm stores those values in the release, so prefer the env-file route.

`--atomic` rolls back automatically if the readiness probe never passes.
Pin `image.tag` to a digest in production for reproducible, reversible deploys.

## Runtime env

| Var | Where | Purpose |
|-----|-------|---------|
| `TWENTY_API_URL` | Secret | Twenty CRM REST base |
| `TWENTY_API_TOKEN` | Secret | Twenty CRM API token (placeholder → CRM skipped, email fallback used) |
| `TWENTY_LEAD_STAGE` | ConfigMap | Opportunity stage for new leads (default `NEW`) |
| `TWENTY_APP_URL` | ConfigMap | Optional. Origin of the Twenty web app, for record links in the notification email. Defaults to `TWENTY_API_URL`'s origin |
| `SMTP_URL` | Secret | Enables the notification email |
| `LEAD_FALLBACK_EMAIL` | ConfigMap | Where lead notifications are sent (default `hello@francescovigni.com`) |

## What happens to a lead

Every validated lead is **written to the CRM and emailed**, and always logged
first, before the mailer is touched. The CRM is where a lead is worked; the email
is how it gets noticed.

| Log tag | Meaning | Email subject |
|---------|---------|---------------|
| `[lead]` | In the CRM. Person, Opportunity, and a Note carrying the message, linked from the email | `New lead (<intent>): <name>` |
| `[lead-fallback]` | Not in the CRM. Needs adding by hand | `... [not in CRM]` |
| `[lead-mail] send failed` | The lead is filed and logged, but the email did not go out | none |

So `grep lead-fallback` still finds exactly the leads that need manual work.

A returning contact is not a failure: Twenty refuses the duplicate Person, the
app looks them up by email and attaches a fresh Opportunity to the record
already on file.

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
