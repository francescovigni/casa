# Lead-Tool Overhaul — Design

**Date:** 2026-05-19
**Site:** francescovigni.com (Gatsby 5 + TailwindCSS)
**Goal:** Convert the site from a showroom (a catalogue of accomplishments) into a
lead tool (a site that moves a referred prospect toward booking a call).

## Context

The site's job is the medical-AI consulting pipeline — the FATHOM / IRCCS Humanitas
endoscopy foundation-model engagement, plus local Forlì gastroenterology prospects,
mostly Italian institutions. The site's real role is to **close the loop**: when a
prospect is referred (e.g. via Prof. Hassan or a Forlì contact) and quietly checks
Francesco out, the site must make them confident enough to make contact.

This builds on the completed simplification (Home/Work/Contact, flat `src/data/`
model, no markdown/MDX pipeline, ~7 plugins removed). It reverses two over-cuts from
that work (homepage pedigree, the fit-qualifier) and adds the lead-tool content that
simplification did not create.

## Decisions (from brainstorming)

- **Scope:** full lead-tool — narrative + curated projects + engagement model + Trust
  & Compliance + authority layer.
- **Narrative spine:** "Survives deployment".
- **Projects:** 6 — Medical AI Consulting, Edge-AI Occupancy Monitoring, Industrial
  Floor Scrubber Navigation, Bin-Picking Reliability Uplift, HRI Interaction Engine
  (TIAGo), Emotion-Aware Mobile Robot.
- **Authority layer:** a real Insights page seeded with 2 cornerstone articles.
- **Localization:** full EN + IT parity for every page, including translated Insights
  articles.
- Engagement ladder and Trust & Compliance are **Home sections**, not separate pages.

## 1. Narrative spine — "Survives deployment"

Every page reinforces one throughline: *for a decade Francesco has worked the gap
between a model that works in a paper and a system that works in the field — first in
industrial and human-facing robotics, now in clinical AI imaging.*

Robotics is reframed as the **asset**: it is the hardest real-world deployment problem,
which is what makes him credible on the highest-stakes one (clinical AI). This converts
the career from a "pivot" narrative (which creates buyer doubt) into a "convergence"
narrative (which reads as a moat).

**Hero headline:** "I make AI survive contact with the real world."
**Convergence one-liner:** a single sentence stating the decade-long throughline and
the robotics → clinical AI progression.

## 2. Site structure

Four real pages plus privacy, 404, bc, each in EN and IT:

| EN | IT |
|----|----|
| `/` Home | `/it/` Home |
| `/work/` Work | `/it/lavoro/` Work |
| `/insights/` Insights | `/it/approfondimenti/` Insights |
| `/contact/` Contact | `/it/contatti/` Contact |

Insights articles live at `/insights/<slug>/` and `/it/approfondimenti/<slug>/`.
`localePairs` in `i18n.js` and the header nav both gain the Insights pair.

## 3. Home — the lead-tool page

Eight sections, each with a defined job. Order matters — it walks a prospect from
"who is this" to "I should book a call".

1. **Hero** — the deployment-spine headline + convergence one-liner. Primary CTA:
   book a call (Calendly); secondary CTA: "How I work" (anchors to §4).
2. **Who it's for** — names the buyer's pain, split for the two audiences:
   *IRCCS / hospitals* (first clinical AI, validation, EHDS/governance, procurement)
   and *medtech R&D teams* (imaging model performance, MLOps, time-to-deployment).
3. **Pedigree strip** — "Experience from": TU Munich · Disney Research · TU Wien ·
   Roboception · Università di Napoli Federico II. Restores homepage credibility.
4. **How I help — engagement ladder** — three cards, Pilot → Support → Transition
   (see §5). Tells a prospect what buying looks like.
5. **Fit-qualifier** — "We're a good fit if… / Probably not a fit if…" (see §6).
6. **Proof** — 2–3 flagship projects as one-line deployment stories, linking to Work
   for the full set.
7. **Trust & Compliance** — compact block (see §7).
8. **Closing CTA** — restate the call-to-action.

The `Resume` button is removed from the hero (it signals job-seeker). The CV PDF
stays linked from the Work page for the peer/referrer audience.

## 4. Work — proof told as the convergence

- A short prose **career arc** stating the convergence explicitly (robotics →
  clinical AI, framed as deployment credibility).
- **6 projects**, each reframed as a deployment story with a consistent shape:
  *Context → Constraints → What I did → Outcome.* Outcomes are concrete and, where
  NDA-bound, framed as anonymized results.
- **Experience** timeline, annotated to the spine.
- **Education**, **Talks**, **Milestones** — kept.
- **Publications** — medical/applied-relevant items surfaced; the robotics/HRI papers
  collapsed into a single "research background" line linking to Google Scholar, so the
  page reads consultant-first, not researcher-first.
- CV PDF linked here.

## 5. Engagement ladder (Home §4)

Three engagement types, mirroring the CRM opportunity stages:

- **Pilot** — a fixed-scope engagement to prove feasibility: e.g. an EHDS-ready data
  pipeline plus a baseline model, with a clear expected result.
- **Support** — an ongoing embedded technical-partner engagement through development,
  validation, and iteration.
- **Transition** — a hand-off engagement: productionize, document, train the in-house
  team, exit cleanly.

Each card: name, one-line description, what the client gets, who it suits. Data lives
in `src/data/engagement.js` with `{en, it}` fields.

## 6. Fit-qualifier (Home §5)

Restored and sharpened from the live portfolio page.

- **Good fit:** clear expected results; a technical counterpart on the client side;
  ready beyond proof-of-concept.
- **Not a fit:** no-code-only expectations; expecting full production with no
  validation; unable to allocate a technical counterpart.

Data in `src/data/fit.js` with `{en, it}` fields.

## 7. Trust & Compliance (Home §7)

A compact, scannable block — a buying factor for Italian public-health buyers:
GDPR / DPA compliance, EHDS readiness, comfortable working under NDA, registered
engineer (Ordine degli Ingegneri di Forlì-Cesena), data governance and anonymization.
Data in `src/data/trust.js` with `{en, it}` fields.

## 8. Insights — the authority layer

A real Writing/Insights page (EN + IT), seeded with **2 cornerstone articles**:

1. *"EHDS readiness for hospital AI projects — a practical checklist."*
2. *"Why clinical-AI pilots fail validation, and how to design for it."*

These are buyer-magnet topics that demonstrate expertise and attract qualified organic
search. During implementation, full article **outlines** are drafted for Francesco to
finalize into prose; placeholder prose is acceptable in the spec/plan but the page
ships only once real prose exists.

**Implementation:** no CMS/markdown pipeline is revived. Each article is structured
content in a data module (`{en, it}` bodies) rendered by a shared `Article` component;
the Insights index lists articles from that data. This stays within the simplified
build. Revisit a content pipeline only if the article count grows past ~5.

## 9. Build & data model

Rides on the existing simplified `src/data/` model. New/changed modules (all `{en,it}`
where localized):

- `src/data/engagement.js` — the three engagement types.
- `src/data/fit.js` — good-fit / not-a-fit lists.
- `src/data/trust.js` — compliance points.
- `src/data/projects.js` — expanded to 6 entries with richer fields
  (`context`, `constraints`, `whatIDid`, `outcome`, plus existing `tags`, `img`).
- `src/data/insights.js` — article metadata + `{en,it}` bodies.
- `src/data/homeStrings.js`, `workStrings.js` — new section copy.
- `src/utils/i18n.js` — `localePairs` + nav gain the Insights pair.

New components: `Insights` index, `Article`, plus Home sections (`EngagementLadder`,
`FitQualifier`, `TrustBlock`, `PedigreeStrip`) — small focused components, not one
giant Home file. No new Gatsby plugins. Three new project thumbnails
(Bin-Picking, TIAGo HRI, Emotion-Aware Robot) are pre-optimized to WebP.

## 10. Out of scope

- Visual restyle — the existing Tailwind look and palette are kept; this is content
  and structure.
- GA conversion tracking (Calendly/contact click events) — strongly recommended as a
  fast follow, but a separate small task.
- Any content pipeline / CMS for Insights beyond the data-module approach in §8.

## Success criteria

- Four real pages (+ privacy/404/bc) in EN and IT; Insights and its articles exist in
  both locales.
- The homepage carries all eight sections; the engagement ladder, fit-qualifier, and
  Trust block are present and populated.
- Every project on Work follows the Context → Constraints → What I did → Outcome shape.
- Publications read consultant-first (robotics collapsed to a Scholar link).
- The site builds with no new plugins and serves correctly.
