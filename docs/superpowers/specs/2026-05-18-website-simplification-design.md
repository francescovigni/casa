# Website Simplification — Design

**Date:** 2026-05-18
**Site:** francescovigni.com (Gatsby 5 + TailwindCSS)
**Goal:** Simplify the site as much as possible across structure, content, code, and visual design — without migrating off Gatsby or redoing the visual style.

## Context

The site's job is the consulting pipeline: the FATHOM / IRCCS Humanitas endoscopy
foundation-model engagement plus emerging local Forlì gastroenterology prospects —
mostly Italian institutions. SP2 (partial Italian localization) is already done. This
work is structural simplification; the SP1 English content rewrite remains a separate
effort. Existing copy is kept where the surrounding page survives.

A prior audit (SEO, performance, code quality) found bugs that are folded into this
work because the same files are being touched anyway (see §7).

## Decisions (from brainstorming)

- Simplify all four dimensions: site structure, content volume, codebase, visual design.
- Page count: **Home + Work + Contact** as the three real pages, plus privacy, 404, bc.
- The Work page is **flat** — no per-item detail pages.
- Full Italian parity: `/it/`, `/it/lavoro/`, `/it/contatti/`.
- Homepage trimmed to a lean **hero → proof → CTA**.
- Image/build pipeline: **Approach A** — drop all image/markdown plugins, use
  pre-optimized static images with plain `<img>`.
- Work page content: **all** publications and **all** talks; **3** projects only —
  `medical-ai-consulting`, `jetson-covid` (Edge AI Occupancy / Jetson Nano),
  `industrial-floor-scrubber-navigation`.

## 1. Final site structure

Six real pages plus privacy, 404, bc:

| EN | IT |
|----|----|
| `/` — Home | `/it/` — Home |
| `/work/` — Work | `/it/lavoro/` — Work |
| `/contact/` — Contact | `/it/contatti/` — Contact |

`/bc/` kept (set `noindex`), `/privacy/` kept, `/404` kept.

**Deleted pages/templates:** `src/pages/portfolio.jsx`, `publications.jsx`,
`talks.jsx`, `blog.jsx`, `projects.jsx` (redirect), `src/templates/blog-post.jsx`,
`src/templates/project.jsx`.

**Deleted content:** all `data/projects/*.md`, all `data/blog/*.md`, the duplicate
`src/images/` ⁄ `data/images/` trees. The blog is removed entirely.

**Deleted components:** `ShareButtons.jsx` (only used by the two deleted templates).

**Old URLs preserved:** `nginx.conf` gains 301 redirects so no SEO/link equity is lost:
- `/portfolio/` and `/portfolio/*` → `/work/`
- `/publications/` → `/work/`
- `/talks/` → `/work/`
- `/blog/` and `/blog/*` → `/work/`
- `/projects/` and `/projects/*` → `/work/`

## 2. Homepage (`Home.jsx`)

Trimmed to roughly one screen: **static hero → proof/capabilities block → one CTA.**

- The typewriter animation is removed (this also eliminates the uncleared-`setTimeout`
  leak the audit found).
- Milestones, the featured-project section, and the experience/education timelines are
  removed from the homepage — they live on the Work page.
- `/it/index.jsx` continues to reuse the `Home` component with `locale="it"`.

## 3. Work page (new `Work.jsx`)

A single flat scrolling page, no detail pages. Reused by `/work/` and `/it/lavoro/` via
a `locale` prop. Section order:

1. Short intro line.
2. **Projects** — exactly 3 cards: `medical-ai-consulting`, `jetson-covid`,
   `industrial-floor-scrubber-navigation`. Each card: title, 1–2 sentence blurb, tags,
   external link. Blurbs are derived from the existing markdown frontmatter/intro of
   those three files; the full markdown bodies are dropped.
3. **Experience** — condensed timeline (from `experience.js`).
4. **Education** — short list (from `education.js`).
5. **Publications** — the **full** list, rendering logic migrated from the deleted
   `publications.jsx` (still backed by `data/publications.json`, `data/miscpubs.json`,
   `data/persons.json`, which are kept).
6. **Talks** — the **full** list, migrated from the array currently inline in
   `talks.jsx` into `src/data/talks.js`.
7. **Milestones** timeline (from `milestones.js`).
8. CTA to `/contact/`.

Publications and talks remain English-only content (proper nouns, paper titles), as on
the current site; only the section headings are localized.

## 4. Header & components

- **Header:** nav becomes **Home / Work / Contact** + the language toggle. The "Insights"
  dropdown is deleted entirely — removing its open state, timeout ref, `role="menu"`
  ARIA wiring, click-outside handler, and Escape handling.
- **Kept:** `Layout`, `Footer`, `CookieBanner` (GDPR — unchanged behavior), `Seo`,
  `ContactBody`, `bc`.
- **New:** `Work.jsx`.
- **Deleted:** `ShareButtons.jsx`, the `Typewriter` logic inside `Home.jsx`.

## 5. Data & build pipeline (Approach A)

All content lives as plain JS in `src/data/` with `{en, it}` fields where localized:

- New: `projects.js` (3 entries), `talks.js` (migrated from `talks.jsx`),
  `workStrings.js` (Work page section headings).
- Kept & fixed: `experience.js`, `education.js`, `milestones.js`, `homeStrings.js`,
  `contactStrings.js`.
- Kept as-is: `data/publications.json`, `data/miscpubs.json`, `data/persons.json`.
- `i18n.js`: `localePairs` updated to the three EN↔IT page pairs.

No GraphQL content queries and no markdown remain.

- `gatsby-node.js` — emptied or deleted (no `createPages` for content).
- `gatsby-config.js` — drop `gatsby-plugin-mdx`, `gatsby-transformer-remark`,
  `gatsby-remark-images`, `gatsby-plugin-image`, `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`, and the `gatsby-source-filesystem` entries for the
  `projects`/`blog` markdown. Keep `gatsby-plugin-sitemap`, `gatsby-plugin-robots-txt`,
  `gatsby-plugin-postcss`. Remove the matching dependencies from `package.json`.
- **Images:** the ~8 surviving images (portrait, 3 project thumbnails, og image, any
  icons) are pre-optimized once — resized and compressed to WebP — and served with
  plain `<img width height loading="lazy">`. Images live in `static/` (or `src/images/`
  imported directly).

## 6. Visual simplification

Same Tailwind look and palette — fewer moving parts: no typewriter animation, fewer
homepage sections, a flat (dropdown-free) header. No restyle from scratch.

## 7. Audit fixes folded in

Because these files are being rewritten anyway:

- Compress `static/og-default.jpg` from 2.3 MB to ~100 KB (1200×630, q80).
- Trim font imports in `gatsby-browser.js` to `inter` latin 400/500/700 +
  `jetbrains-mono` latin 400 — this resolves the 561 KB inlined-CSS bloat.
- `Seo.jsx`: pass a real `pathname` per page so canonicals are correct; fix the
  trailing-slash-fragile hreflang lookup; emit hreflang for the three EN↔IT pairs;
  add `og:image:width`/`height`.
- `bc.jsx`: set `noindex`; give it a unique `<title>`.
- Extract `personJsonLd` to shared data with a stable `"@id"`; localize `jobTitle`.
- `experience.js`: remove the dead `url: "/"` links; sort entries reverse-chronologically.

## 8. Out of scope

- No migration off Gatsby.
- No from-scratch visual redesign.
- The SP1 English content rewrite stays a separate effort.

## Success criteria

- Site builds and serves with six real pages (+ privacy, 404, bc) in both locales.
- No markdown, MDX, or GraphQL content queries remain; ~7 plugins removed.
- Old URLs (`/portfolio/`, `/publications/`, `/talks/`, `/blog/`, `/projects/`) 301 to
  `/work/`.
- The Work page shows all publications, all talks, and the 3 named projects.
- The audit fixes in §7 are verifiably applied.
