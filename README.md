# francescovigni.com

Personal website of **Francesco Vigni, PhD** — built with **Astro** + **Tailwind CSS**,
self-hosted as a Node container on k3s behind Caddy + Cloudflare.

Positioned as a versatile engineer-researcher across three capability pillars —
**AI/ML research · Robotics & edge · DevOps & infrastructure** — open to hire,
with research collaboration and select consulting as secondary paths.

## Highlights

- **Editorial / Swiss-minimal** design, ships ~zero client JS.
- **Bilingual (EN/IT)** with `hreflang`; **auto-Italian** for Italian IPs via
  Cloudflare's `CF-IPCountry` header, with a sticky manual toggle.
- **Lead capture:** a qualifier gates the CTA; qualified submissions create a
  Person + Opportunity in a self-hosted **Twenty CRM**, with a guaranteed
  log + email fallback so no lead is ever lost.

## Local development

```bash
npm install
npm run dev        # → http://localhost:4321  (/it/ for Italian)
```

## Build & preview

```bash
npm run build      # Astro node standalone server → ./dist
npm run preview    # serve the production build
npm test           # vitest unit tests (lead validation, CRM mapping)
```

## Structure

```
src/
  layouts/Base.astro         # <head>, SEO, hreflang, header, footer
  components/                # Hero, Pillars, Pedigree, WaysToWork,
                             #   Qualifier (island), Proof, Trust, Close, …
  data/                      # {en,it} content modules (home, projects)
  lib/                       # lead validation, Twenty CRM client, notify fallback
  pages/                     # EN routes + it/ tree + api/lead.ts
  middleware.ts              # CF-IPCountry auto-Italian redirect
  i18n.ts                    # locale core (pick, localePairs, ui)
Dockerfile                   # multi-stage, Node 22, non-root
deploy/                      # Helm chart + deploy/cutover docs
legacy/                      # previous Gatsby site (reference; superseded)
docs/superpowers/specs/      # design spec of record
```

See [`deploy/README.md`](deploy/README.md) for build, Helm install, runtime env,
and the Gatsby → Astro cutover.
