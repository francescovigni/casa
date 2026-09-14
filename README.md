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
  data/                      # {en,it} content modules (home, projects, research)
  lib/                       # lead validation, Twenty CRM client, notify fallback
  pages/                     # EN routes + it/ tree + api/lead.ts
  pages/research/            # research case studies (EN only, unpaired)
  middleware.ts              # CF-IPCountry auto-Italian redirect
  i18n.ts                    # locale core (pick, localePairs, ui)
Dockerfile                   # multi-stage, Node 22, non-root
deploy/                      # Helm chart + deploy/cutover docs
legacy/                      # previous Gatsby site (reference; superseded)
docs/superpowers/specs/      # design spec of record
```

## Research pages

`/research/` absorbs what used to be the standalone `portfolio.francescovigni.com`
site. Two levels, each with one job. The **index** shows every study as a card —
a finding, three numbers, one figure — so a reader comparing them never scrolls
one past the other. A **detail page** carries the argument: the tables, the
method, the negative result, the limitations. It is deliberately longer than the
card and deliberately shorter than the repository's article, which stays the
source of record.

Figures are **copied into `public/research/figures/` with the date in the
filename**, never hot-linked. A regenerated figure in a source repo cannot then
silently change this page, and how stale a card is stays visible.

These routes are **English only and unpaired** in `i18n.ts`, so the geo
middleware never touches them and they prerender fully static.

### Adding a study

Add an entry to `src/data/research.ts` and copy a detail page in
`src/pages/research/`. A card has to earn its place — before adding one, the
project needs:

- [ ] a public repository
- [ ] a README carrying real numbers
- [ ] at least one figure legible at thumbnail size
- [ ] a stated limitation

The card's figure is a **thumbnail cut from a detail figure**, cropped at a
whitespace gutter and downscaled. A chart illegible at card width does not
belong on the index. **Order by strongest finding, not by recency.**

Detail pages are hand-written `.astro`. Move them to a content collection when
this passes roughly six studies, or the first time the markup starts repeating
in a way a template should own — not before.

Still to do at cutover: 301 `portfolio.francescovigni.com/*` to the matching
`/research/*` path in Caddy, and retitle `apps.francescovigni.com` (its `<title>`
still claims "Portfolio").

See [`deploy/README.md`](deploy/README.md) for build, Helm install, runtime env,
and the Gatsby → Astro cutover.
