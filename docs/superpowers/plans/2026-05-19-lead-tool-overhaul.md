# Lead-Tool Overhaul Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert francescovigni.com from a showroom into a lead tool — "survives deployment" narrative, an 8-section homepage with an engagement ladder / fit-qualifier / trust block, 6 outcome-framed projects, and a bilingual Insights page.

**Architecture:** Builds on the simplified `src/data/` flat model. New data modules drive new focused Home-section components and a bilingual Insights page. No new Gatsby plugins; no markdown/CMS — Insights articles are structured `{en,it}` data rendered by a shared `Article` component.

**Tech Stack:** Gatsby 5, React 18, TailwindCSS. No test framework — verification is `gatsby build` succeeding plus served-page checks.

**Branch:** `simplify-website` (continuing on it).

**Note on Insights articles:** drafted as substantive real prose (EHDS readiness; clinical-AI validation) and clearly flagged for Francesco to finalize. Nothing goes public until the branch is merged and deployed.

---

## File map

- Create: `src/data/engagement.js`, `src/data/fit.js`, `src/data/trust.js`, `src/data/insights.js`, `src/components/PedigreeStrip.jsx`, `src/components/EngagementLadder.jsx`, `src/components/FitQualifier.jsx`, `src/components/TrustBlock.jsx`, `src/components/Insights.jsx`, `src/components/Article.jsx`, `src/pages/insights.jsx`, `src/pages/it/approfondimenti.jsx`, `src/pages/insights/ehds-readiness.jsx`, `src/pages/insights/clinical-ai-validation.jsx`, `src/pages/it/approfondimenti/ehds-readiness.jsx`, `src/pages/it/approfondimenti/clinical-ai-validation.jsx`
- Modify: `src/data/projects.js`, `src/data/homeStrings.js`, `src/data/workStrings.js`, `src/utils/i18n.js`, `src/components/Home.jsx`, `src/components/Work.jsx`, `src/components/Header.jsx`
- Recover from git history: 3 project markdown files + thumbnails (`roboception`, `tiago-wien`, `roomba-emotion`)

---

## Task 1: Recover and optimize new project assets

**Files:** new WebP files in `src/images/projects/`

- [ ] **Step 1:** Find the simplification commit that deleted the markdown/images:
  `git log --oneline --diff-filter=D -- data/projects` → note the commit (expected: `3c71d6a`).
- [ ] **Step 2:** Recover the 3 project markdown files for their content + `img` frontmatter:
  `git show 3c71d6a~1:data/projects/roboception.md`, `:data/projects/tiago-wien.md`,
  `:data/projects/roomba-emotion.md` — save the text for Task 2 copy.
- [ ] **Step 3:** Identify each project's `img` path from the recovered frontmatter, then
  recover those image files: `git show 3c71d6a~1:data/images/projects/<file> > /tmp/<file>`
  for each (e.g. `roboception.png`; resolve the actual filenames from frontmatter).
- [ ] **Step 4:** Optimize the 3 recovered images to WebP with the existing sharp approach
  (≤ 800px wide, quality 80) into `src/images/projects/` as `binpicking.webp`,
  `hri-tiago.webp`, `emotion-robot.webp`.
- [ ] **Step 5:** Commit: `chore: recover and optimize 3 project thumbnails`

## Task 2: Expand projects.js to 6 outcome-framed entries

**Files:** Modify `src/data/projects.js`

- [ ] **Step 1:** Extend each existing project (medical, jetson, scrubber) with the
  deployment-story fields: `context`, `constraints`, `whatIDid`, `outcome` — each an
  `{en,it}` object. Derive copy from existing blurbs + recovered markdown.
- [ ] **Step 2:** Add 3 new entries — `bin-picking-reliability`, `hri-interaction-engine`,
  `emotion-aware-robot` — same shape (`slug`, `title`, `category`, `img`, `tags`,
  `link?`, `blurb`, `context`, `constraints`, `whatIDid`, `outcome`), copy derived from
  the recovered markdown, framed against the "survives deployment" spine.
- [ ] **Step 3:** Order the 6 so the medical project is first (flagship).
- [ ] **Step 4:** Commit: `feat: expand projects to 6 outcome-framed entries`

## Task 3: New data modules — engagement, fit, trust

**Files:** Create `src/data/engagement.js`, `src/data/fit.js`, `src/data/trust.js`

- [ ] **Step 1:** `engagement.js` — array of 3: `{ key, name:{en,it}, summary:{en,it},
  youGet:{en,it}, suits:{en,it} }` for Pilot, Support, Transition (per spec §5).
- [ ] **Step 2:** `fit.js` — `{ good:{en:[],it:[]}, notFit:{en:[],it:[]} }` (per spec §6).
- [ ] **Step 3:** `trust.js` — array of compliance points `{ label:{en,it},
  detail:{en,it} }`: GDPR/DPA, EHDS readiness, NDA, registered engineer, data
  governance (per spec §7).
- [ ] **Step 4:** Commit: `feat: add engagement, fit, and trust data modules`

## Task 4: i18n and nav — add the Insights pair

**Files:** Modify `src/utils/i18n.js`, `src/components/Header.jsx`

- [ ] **Step 1:** `i18n.js` — add `{ en: "/insights/", it: "/it/approfondimenti/" }` to
  `localePairs`; add `insights` to `ui.en.nav` ("Insights") and `ui.it.nav`
  ("Approfondimenti").
- [ ] **Step 2:** `Header.jsx` — add the Insights entry to `navLinks` between Work and
  Contact: `{ key: "insights", en: "/insights/", it: "/it/approfondimenti/" }`.
- [ ] **Step 3:** Run `npx gatsby build`. Expected: succeeds.
- [ ] **Step 4:** Commit: `feat: add Insights to nav and locale pairs`

## Task 5: Lead-tool homepage

**Files:** Create `src/components/PedigreeStrip.jsx`, `EngagementLadder.jsx`,
`FitQualifier.jsx`, `TrustBlock.jsx`; modify `src/components/Home.jsx`,
`src/data/homeStrings.js`

- [ ] **Step 1:** `homeStrings.js` — add `{en,it}` copy for all 8 sections: hero
  headline + convergence one-liner, "who it's for" (two audiences), pedigree heading,
  engagement heading, fit heading, proof heading, trust heading, closing CTA.
- [ ] **Step 2:** Create `PedigreeStrip.jsx` — "Experience from" + institution chips
  (TU Munich, Disney Research, TU Wien, Roboception, Federico II).
- [ ] **Step 3:** Create `EngagementLadder.jsx` — renders `engagement.js` as 3 cards,
  `locale` prop, uses `pick()`.
- [ ] **Step 4:** Create `FitQualifier.jsx` — two columns (good fit / not a fit) from
  `fit.js`.
- [ ] **Step 5:** Create `TrustBlock.jsx` — compact grid from `trust.js`.
- [ ] **Step 6:** Rewrite `Home.jsx` to the 8-section structure (hero → who it's for →
  pedigree → engagement → fit → proof → trust → CTA). Proof section shows the first 2-3
  `projects.js` entries linking to `/work/`. Remove the Resume button from the hero.
- [ ] **Step 7:** Run `npx gatsby build`. Expected: succeeds.
- [ ] **Step 8:** Commit: `feat: rebuild homepage as 8-section lead tool`

## Task 6: Work page — deployment-story projects

**Files:** Modify `src/components/Work.jsx`, `src/data/workStrings.js`

- [ ] **Step 1:** `workStrings.js` — add `{en,it}` career-arc prose (the convergence
  statement) and a "research background" label.
- [ ] **Step 2:** `Work.jsx` — add the career-arc prose block at the top; render each of
  the 6 projects with the Context → Constraints → What I did → Outcome structure.
- [ ] **Step 3:** `Work.jsx` — collapse the publications section: keep medical/applied
  items, replace the robotics/HRI list with a single "research background" line linking
  to Google Scholar. Add the CV PDF link near education.
- [ ] **Step 4:** Run `npx gatsby build`. Expected: succeeds.
- [ ] **Step 5:** Commit: `feat: reframe Work projects as deployment stories`

## Task 7: Insights page and articles

**Files:** Create `src/data/insights.js`, `src/components/Insights.jsx`,
`src/components/Article.jsx`, `src/pages/insights.jsx`,
`src/pages/it/approfondimenti.jsx`, and 4 article page files

- [ ] **Step 1:** `insights.js` — array of 2 articles: `{ slug, title:{en,it},
  date, summary:{en,it}, body:{en,it} }`. `body` is structured (array of
  `{type:"h2"|"p"|"ul", content}` blocks) so `Article` can render without markdown.
  Write substantive draft prose for "EHDS readiness for hospital AI projects" and
  "Why clinical-AI pilots fail validation".
- [ ] **Step 2:** Create `Article.jsx` — renders one article's structured body for a
  `locale`; includes title, date, back-link to the Insights index.
- [ ] **Step 3:** Create `Insights.jsx` — index listing articles from `insights.js`
  (title, date, summary, link), `locale` prop.
- [ ] **Step 4:** Create `src/pages/insights.jsx` and `src/pages/it/approfondimenti.jsx`
  — wrap `Insights` in `Layout`, with `Seo` (`pathname` `/insights/` and
  `/it/approfondimenti/`).
- [ ] **Step 5:** Create the 4 article pages — `src/pages/insights/ehds-readiness.jsx`,
  `insights/clinical-ai-validation.jsx`, and the `it/approfondimenti/` pair — each
  wrapping `Article` with the right `slug`/`locale` and a `Seo` head.
- [ ] **Step 6:** Run `npx gatsby build`. Expected: succeeds; `/insights/`,
  `/it/approfondimenti/`, and 4 article routes generated.
- [ ] **Step 7:** Commit: `feat: add bilingual Insights page with 2 cornerstone articles`

## Task 8: Final verification

- [ ] **Step 1:** `npx gatsby clean && npx gatsby build` — succeeds.
- [ ] **Step 2:** `npx gatsby serve` and spot-check `/`, `/work/`, `/insights/`,
  `/contact/` and the IT equivalents: homepage shows all 8 sections; Work shows 6
  projects in the deployment-story shape; Insights lists 2 articles and they open;
  hreflang pairs and canonicals are correct on the new pages.
- [ ] **Step 3:** Commit any cleanup: `chore: lead-tool overhaul verification`

---

## Self-review notes

- Spec coverage: §1 narrative → Tasks 2/5/6; §2 structure → Tasks 4/7; §3 homepage →
  Task 5; §4 Work → Task 6; §5 engagement → Tasks 3/5; §6 fit → Tasks 3/5; §7 trust →
  Tasks 3/5; §8 Insights → Task 7; §9 build/data → Tasks 1-7. All covered.
- No test framework; verification is build + served-page checks, per task.
- Insights articles are drafted as real prose flagged for the user; the branch is not
  deployed, so review happens before anything is public.
