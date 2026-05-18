# Website Simplification Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce francescovigni.com to 6 real pages (Home/Work/Contact ×2 locales) with a flat content model, stripping the markdown/MDX/image build pipeline.

**Architecture:** All content becomes plain JS in `src/data/` with `{en,it}` fields. The Work page is one flat component reused by `/work/` and `/it/lavoro/`. No GraphQL content queries, no detail pages, ~7 Gatsby plugins removed. Images are pre-optimized static files served with plain `<img>`.

**Tech Stack:** Gatsby 5, React 18, TailwindCSS. No test framework — verification is `gatsby build` succeeding plus page checks via `gatsby develop`.

**Branch:** `simplify-website` (already created).

---

## File map

- Create: `src/data/projects.js`, `src/data/talks.js`, `src/data/workStrings.js`, `src/components/Work.jsx`, `src/pages/work.jsx`, `src/pages/it/lavoro.jsx`
- Modify: `src/components/Home.jsx`, `src/components/Header.jsx`, `src/components/Seo.jsx`, `src/pages/bc.jsx`, `src/data/experience.js`, `src/utils/i18n.js`, `gatsby-config.js`, `gatsby-node.js`, `gatsby-browser.js`, `package.json`, `nginx.conf`, `src/data/homeStrings.js`
- Delete: `src/pages/portfolio.jsx`, `publications.jsx`, `talks.jsx`, `blog.jsx`, `projects.jsx`, `src/templates/blog-post.jsx`, `src/templates/project.jsx`, `src/components/ShareButtons.jsx`, `data/projects/`, `data/blog/`, `data/images/`
- Kept: `data/publications.json`, `data/miscpubs.json`, `data/persons.json`

---

## Task 1: Optimize images

**Files:** `static/og-default.jpg`, `src/images/projects/{polip,edge_ai,scrubber}.png`, `src/images/me_square.jpg`

- [ ] **Step 1:** Compress `static/og-default.jpg` to 1200×630, quality ~80 (`sips` or `sharp`). Target < 150 KB.
- [ ] **Step 2:** Resize/compress the 3 project thumbnails to ≤ 800px wide WebP and `me_square.jpg` to ≤ 600px WebP. Place WebP copies in `src/images/projects/` and `src/images/`.
- [ ] **Step 3:** Delete the duplicate `data/images/` tree.
- [ ] **Step 4:** Commit: `chore: optimize images, drop duplicate image tree`

## Task 2: Migrate content to src/data/

**Files:** Create `src/data/projects.js`, `src/data/talks.js`, `src/data/workStrings.js`; modify `src/utils/i18n.js`

- [ ] **Step 1:** Create `src/data/projects.js` — 3 entries (`medical-ai-consulting`, `jetson-covid`, `industrial-floor-scrubber-navigation`). Each: `{ title, blurb:{en,it}, tags:[], link, img }`. Blurbs are 1–2 sentence summaries derived from each markdown's `subtitle` + intro paragraph; translate `it`.
- [ ] **Step 2:** Create `src/data/talks.js` — move the `talks` array from `src/pages/talks.jsx` verbatim.
- [ ] **Step 3:** Create `src/data/workStrings.js` — `{en,it}` section headings: intro, projects, experience, education, publications, talks, milestones, CTA.
- [ ] **Step 4:** Update `src/utils/i18n.js` `localePairs` to the 3 pairs: `/`↔`/it/`, `/work/`↔`/it/lavoro/`, `/contact/`↔`/it/contatti/`.
- [ ] **Step 5:** Commit: `feat: add work-page data modules`

## Task 3: Build the Work page

**Files:** Create `src/components/Work.jsx`, `src/pages/work.jsx`, `src/pages/it/lavoro.jsx`

- [ ] **Step 1:** Create `src/components/Work.jsx` accepting a `locale` prop. Sections in order: intro, projects (3 cards with plain `<img>`), experience timeline, education, publications (port the rendering/normalize logic from `publications.jsx`, keep `data/*.json` imports), talks (from `talks.js`), milestones, CTA to contact. Use `pick()`/i18n for headings.
- [ ] **Step 2:** Create `src/pages/work.jsx` — renders `<Work locale="en" />` inside `Layout`, with `<Seo title="Work" pathname="/work/" />` head.
- [ ] **Step 3:** Create `src/pages/it/lavoro.jsx` — `<Work locale="it" />`, `<Seo locale="it" pathname="/it/lavoro/" />`.
- [ ] **Step 4:** Run `npx gatsby build`. Expected: succeeds, `/work/` and `/it/lavoro/` generated.
- [ ] **Step 5:** Commit: `feat: add flat Work page (en + it)`

## Task 4: Trim the homepage

**Files:** Modify `src/components/Home.jsx`, `src/data/homeStrings.js`

- [ ] **Step 1:** Remove the `Typewriter` component/logic from `Home.jsx`; replace with a static hero headline.
- [ ] **Step 2:** Remove the milestones, featured-project, experience, and education sections from `Home.jsx`. Keep hero, a proof/capabilities block, and one CTA to `/contact/`.
- [ ] **Step 3:** Convert the portrait `GatsbyImage`/`StaticImage` to a plain `<img>` with `width`, `height`, `loading="lazy"` referencing the optimized image.
- [ ] **Step 4:** Trim now-unused keys from `homeStrings.js`.
- [ ] **Step 5:** Run `npx gatsby build`. Expected: succeeds.
- [ ] **Step 6:** Commit: `refactor: trim homepage to hero + proof + CTA`

## Task 5: Simplify the Header

**Files:** Modify `src/components/Header.jsx`

- [ ] **Step 1:** Replace the "Insights" dropdown with flat nav links: Home, Work, Contact (localized labels). Remove dropdown state, timeout ref, click-outside handler, Escape handler, `role="menu"` markup.
- [ ] **Step 2:** Point nav links at `/`, `/work/`, `/contact/` (en) and `/it/`, `/it/lavoro/`, `/it/contatti/` (it). Keep the language toggle.
- [ ] **Step 3:** Run `npx gatsby build`. Expected: succeeds.
- [ ] **Step 4:** Commit: `refactor: flatten header navigation`

## Task 6: Audit fixes — Seo, bc, experience

**Files:** Modify `src/components/Seo.jsx`, `src/pages/bc.jsx`, `src/data/experience.js`, `src/pages/index.jsx`, `src/pages/it/index.jsx`

- [ ] **Step 1:** `Seo.jsx`: normalize trailing slashes in the `localePairs` hreflang lookup; add `og:image:width`/`height` (1200/630).
- [ ] **Step 2:** `bc.jsx`: add `noindex` to its head, give it a unique `<title>` (e.g. "Digital Card"), convert its image to plain `<img>`.
- [ ] **Step 3:** `experience.js`: remove `url: "/"` entries (render plain text) or set real URLs; sort entries reverse-chronologically; make `org` a `{en,it}` object for shape consistency.
- [ ] **Step 4:** Extract the duplicated `personJsonLd` from `index.jsx`/`it/index.jsx` into `src/data/` with a stable `"@id": "https://francescovigni.com/#person"`; import in both.
- [ ] **Step 5:** Run `npx gatsby build`. Expected: succeeds.
- [ ] **Step 6:** Commit: `fix: SEO/metadata audit fixes`

## Task 7: Delete old pages/templates + strip build pipeline

**Files:** Delete old pages/templates/component; modify `gatsby-config.js`, `gatsby-node.js`, `gatsby-browser.js`, `package.json`

- [ ] **Step 1:** Delete `src/pages/portfolio.jsx`, `publications.jsx`, `talks.jsx`, `blog.jsx`, `projects.jsx`, `src/templates/blog-post.jsx`, `src/templates/project.jsx`, `src/components/ShareButtons.jsx`, and the `data/projects/` + `data/blog/` directories.
- [ ] **Step 2:** `gatsby-node.js`: remove `createPages` content logic — leave an empty file or delete it.
- [ ] **Step 3:** `gatsby-config.js`: remove `gatsby-plugin-image`, `gatsby-plugin-sharp`, `gatsby-transformer-sharp`, `gatsby-transformer-remark` (with `gatsby-remark-images`), `gatsby-plugin-mdx` if present, and the `gatsby-source-filesystem` entries for projects/blog markdown. Keep postcss, sitemap, robots-txt. Add `/bc` and confirm exclusions are correct.
- [ ] **Step 4:** `package.json`: remove the dependencies for the plugins deleted in Step 3; run `npm install` to update the lockfile.
- [ ] **Step 5:** `gatsby-browser.js`: trim font imports to `@fontsource/inter` latin 400/500/700 and `@fontsource/jetbrains-mono` latin 400 only.
- [ ] **Step 6:** Run `npx gatsby clean && npx gatsby build`. Expected: succeeds with 6 real pages + privacy/404/bc, no markdown nodes.
- [ ] **Step 7:** Commit: `refactor: delete legacy pages and strip build pipeline`

## Task 8: nginx redirects

**Files:** Modify `nginx.conf`

- [ ] **Step 1:** Add `location` blocks issuing `301` redirects: `/portfolio`, `/publications`, `/talks`, `/blog`, `/projects` and their sub-paths → `/work/`.
- [ ] **Step 2:** Commit: `feat: 301 legacy URLs to /work/`

## Task 9: Final verification

- [ ] **Step 1:** `npx gatsby clean && npx gatsby build` — succeeds.
- [ ] **Step 2:** `npx gatsby serve` and spot-check `/`, `/work/`, `/contact/`, `/it/`, `/it/lavoro/`, `/it/contatti/`, `/bc/`, `/privacy/`: pages render, nav works, language toggle works, Work page shows 3 projects + all publications + all talks.
- [ ] **Step 3:** Verify built CSS size dropped and `og-default.jpg` in `public/` is small.
- [ ] **Step 4:** Final commit if any cleanup: `chore: simplification verification`

---

## Self-review notes

- Spec coverage: §1 structure → Tasks 3/7/8; §2 homepage → Task 4; §3 Work page → Tasks 2/3; §4 header → Task 5; §5 data/build → Tasks 2/7; §6 visual → Tasks 4/5; §7 audit fixes → Tasks 1/6/7. All covered.
- No test framework exists; verification is build + manual page checks, stated in each task.
- Image conversion to `<img>` happens in every component before its plugin is removed in Task 7 (Home T4, Work T3, bc T6) — no dangling `gatsby-plugin-image` imports at Task 7.
