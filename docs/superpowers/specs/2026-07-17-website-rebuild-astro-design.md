# francescovigni.com — Astro Rebuild (research-first)

**Date:** 2026-07-17
**Branch:** `astro-rebuild` (Gatsby stays on `main` until cutover)
**Supersedes design of:** 2026-05-19 lead-tool overhaul (consulting-funnel framing)

## 1. Why

The site was overhauled in May 2026 into a freelance-consulting lead funnel
(Pilot → Support → Transition engagement ladder, leads-into-CRM). Francesco's
actual goal has shifted: he wants a **stable, salaried research role in
healthcare AI**, continuing the line of work started with the IRCCS Humanitas
foundation-model engagement, and is willing to wind down the P.IVA (freelance
registration). A consulting funnel works *against* that goal — a hiring PI or
research lab reads "freelancer selling engagements," not "researcher we could
hire."

Three drivers, from the user:
1. **Design feels dated/generic** — wants a genuinely striking, distinctive look.
2. **Lead capture is weak** — wants interested contacts actually captured, qualified, and routed.
3. **Fresh start** — rethink from scratch; drop Gatsby.

## 2. Goals / Non-goals

**Goals**
- Position Francesco as a **healthcare-AI researcher open to hire**, secondary paths for research collaboration and select consulting.
- Distinctive **editorial / Swiss-minimal** visual design (validated with the user in brainstorming).
- **Auto-Italian by visitor IP** with manual override and correct SEO.
- **Qualifier-gated lead capture** writing into the self-hosted Twenty CRM, with graceful email fallback.
- Fast, self-hostable on the existing k3s + Caddy + Cloudflare stack.

**Non-goals (now)**
- Calendar booking (form-only for launch; Cal.com can be added later).
- Blog/CMS (the two existing `/insights` articles may carry over as static pages, but no authoring system).
- The on-premise agentic-AI venture — **removed from the site entirely** (audience card, project, and any mention).
- App-like features (dashboards, auth).

## 3. Positioning & content changes

Francesco is actively applying to a **range** of roles, not one track: a
healthcare-AI research role, a **DevOps technician role at CERN**, a **project
officer role at JRC**, plus other technical positions. The site must support all
of them without diluting into "I do everything." Resolution: a **versatile
senior engineer-researcher** identity with **three visible capability pillars**,
healthcare AI as the flagship but infrastructure and robotics equally legible.

- **Identity:** "Engineer & researcher — machine learning that survives deployment, and the infrastructure to run it." Three pillars, each with real proof:
  1. **AI/ML research** — foundation models for medical imaging (the Humanitas/gastroenterology line), SSL/ViT, distributed training. *(healthcare research roles, JRC)*
  2. **Robotics & edge** — ROS2 navigation/perception, Jetson edge inference, industrial deployments. *(robotics/industrial roles)*
  3. **DevOps & infrastructure** — self-hosted single-node k3s, Helm charts, CI/CD, health-gated reversible delivery, live incident debugging. *(CERN DevOps and platform roles)* — promoted from a footnote to first-class proof.
- **Primary CTA:** "Let's talk" (routes to the qualifier/contact form). **Secondary CTA:** "Download CV" (PDF) — the most important conversion for hiring managers; make it prominent and available site-wide.
- **"Ways to work together"** replaces the engagement ladder: soft cards — **Full-time role** (primary; research / engineering / infrastructure), **Research collaboration**, **Select consulting**.
- Because targets differ, keep the copy role-neutral where possible ("teams," "organizations") rather than "clients," and let the three pillars + CV do the tailoring.
- **Drop** the P.IVA-centric and on-prem framing. Keep GDPR/EHDS trust content — it is a genuine differentiator for healthcare-data roles.
- Reuse and lightly reframe the existing deployment-story **projects** (`src/data/projects.js`), **pedigree** (Naples · TU Wien · TU Munich · Disney Research · Roboception · MSCA), **trust** content, and Google Scholar / ORCID links.
- Copy is drafted by Claude, **redlined by Francesco** at build time. Two items explicitly deferred to build time: the exact wording of the third "ways to work" emphasis and final accent color.

## 4. Architecture

**Stack:** Astro 5 + Tailwind CSS 3 + TypeScript. `@astrojs/node` adapter,
**hybrid** rendering: pages are prerendered static; a small set of routes run on
the server (middleware for geo, `/api/lead` for CRM). One interactive island
(the qualifier) — Astro ships zero client JS elsewhere.

**Runtime:** single Node 22 container, served behind Caddy (TLS edge) behind
Cloudflare, deployed to the single-node k3s cluster via a Helm chart, mirroring
Francesco's other self-hosted services.

**Directory shape (repo root, on branch):**
```
astro.config.mjs        # node adapter, i18n, output: 'hybrid'
tailwind.config.mjs     # editorial theme tokens
src/
  layouts/Base.astro    # <head>, SEO, hreflang, header, footer
  components/           # Hero, Pedigree, WaysToWork, Proof, Trust, Close, Header, Footer, Qualifier island
  data/                 # ported {en,it} content modules + i18n.ts (pick, localePairs, ui)
  pages/
    index.astro         # EN home
    work.astro
    contact.astro
    privacy.astro
    trasparenza.astro
    it/                 # index, lavoro, contatti, privacy — IT tree
    api/lead.ts         # POST endpoint (server)
  middleware.ts         # CF-IPCountry geo redirect
  styles/global.css
public/                 # static assets, CV PDF, og image, favicon
deploy/                 # Dockerfile, helm chart
```

**Content model (ported as-is):** the existing `{ en, it }` field shape and
`pick(field, locale)` helper are framework-agnostic plain JS → move to
`src/data/*.ts`. Projects are already told as Context → Constraints → What I did
→ Outcome. No GraphQL layer (the main simplification over Gatsby).

## 5. i18n + geo auto-Italian

- Routes: EN at `/`, IT under `/it/` (`/it/lavoro/`, `/it/contatti/`), paired via `localePairs` (already exists) for the language toggle and `hreflang`.
- **Middleware** (`src/middleware.ts`): on a request to an EN path where the `lang` cookie is unset and `request.headers.get('cf-ipcountry') === 'IT'`, 302-redirect to the IT counterpart. Set `lang` cookie on any explicit toggle so the choice sticks. Never redirect when a cookie is present, when the path is already localized, for `/api/*`, or for known bot user-agents (avoid cloaking; keep both trees crawlable).
- Both locales emit `hreflang` alternate + `x-default` (→ EN). `CF-IPCountry` requires Cloudflare proxy (orange-cloud) — verify against live domain; fallback behavior with the header absent is "serve English," which is safe.

## 6. Lead capture

**Flow:** Qualifier island asks intent → **Hiring for a role · Research collaboration · Project/consulting · Just exploring**.
- The first three ("qualified") reveal a short contact form (name, email, org, message; intent prefilled).
- "Just exploring" gets a lighter path: links to CV, Google Scholar, and `hello@francescovigni.com` — no CRM write pressure.

**`POST /api/lead` (server endpoint):**
1. Reject if honeypot field is filled; basic per-IP rate limit; validate email.
2. Create/upsert a **Person** in Twenty CRM (name, email, org), and an
   **Opportunity** tagged by intent (stage configurable; qualifier answers +
   message stored as a Note or custom fields). CRM field mapping finalized in
   implementation against the live Twenty schema.
3. On any CRM error, **fall back** to emailing `hello@francescovigni.com` with
   the submission, and still return success to the user (never lose a lead).

**Secrets:** `TWENTY_API_URL`, `TWENTY_API_TOKEN` read from env (k8s Secret) —
**placeholders in the repo/chart**, never committed. SMTP creds for the fallback
likewise env-only.

## 7. Visual design system (editorial / Swiss-minimal)

- Off-white canvas (`#faf8f4`), near-black ink (`#1a1a1a`), one restrained accent (terracotta `#b1471f`, revisit at build). Serif display headings (system serif / a licensed serif TBD), sans body (Inter), mono for small technical labels.
- Generous whitespace, hairline dividers, uppercase let-spaced kickers, large numeric stats. Motion kept minimal and tasteful. Fully responsive; light theme only (editorial look commits to one).
- Accessibility: WCAG AA contrast, semantic landmarks, keyboard-navigable qualifier, `prefers-reduced-motion` respected.

## 8. Homepage sections (final order)

1. **Hero** — identity + "Let's talk" / "Download CV".
2. **What I do** — the three capability pillars (AI/ML research · Robotics & edge · DevOps & infrastructure), healthcare AI flagged as the flagship.
3. **Pedigree** — institutions strip.
4. **Ways to work together** — Full-time role (primary) · Collaboration · Consulting.
5. **Qualifier** (island) — intent routing → gated form.
6. **Proof** — selected work (Context→Constraints→What I did→Outcome).
7. **Trust & compliance** — GDPR / EHDS / Ordine #2988 / EU-stack.
8. **Close** — contact + CV.

## 9. Deployment

- **Dockerfile:** multi-stage, Node 22 LTS, `astro build` → `node ./dist/server/entry.mjs`, non-root, healthcheck.
- **Helm chart** (`deploy/helm`): Deployment, Service (loopback NodePort per existing pattern), ConfigMap (public config), Secret (CRM/SMTP placeholders), readiness/liveness probes. Caddy remains TLS edge; old Gatsby URLs 301 to their new equivalents.
- **Cutover:** build passes + manual smoke on staging → point Caddy at the new container → keep `main`/Gatsby recoverable until confirmed.

## 10. Testing

- `astro build` in CI + a Lighthouse budget (performance/SEO/a11y ≥ 95).
- **Geo middleware** unit test: mock `cf-ipcountry` = IT/US/absent and cookie present/absent → assert redirect vs pass-through.
- **`/api/lead`** test: mock the Twenty client (no live writes); assert honeypot rejection, validation, CRM-success path, and CRM-failure → email-fallback path.
- Manual: language toggle round-trips, hreflang correctness, qualifier keyboard flow.

## 11. Open items (deferred to build, non-blocking)

- Third "ways to work" card emphasis wording; final accent color; final CTA copy — Claude drafts, Francesco redlines.
- Live Twenty CRM token + Opportunity stage + field mapping (placeholders until then).
- Headshot / OG image / favicon (proceed with placeholders).
- Whether to carry over the two `/insights` articles as static pages.
