# francescovigni.com — "Ask me anything" chat page

**Date:** 2026-08-05
**Branch:** `astro-rebuild`
**Extends:** 2026-07-17 Astro rebuild design (does not change its goals)

## 1. Why

Francesco wants a ChatGPT-style interface where visitors ask questions about
him and his experience. Decision from brainstorming: it does **not** replace
the editorial site — hiring managers scan, and the current pages carry the
SEO and proof. It is added as a separate showcase page. For an AI researcher,
a well-crafted, honest, client-side semantic Q&A is itself a portfolio piece.

## 2. Decisions (from brainstorming)

- **Placement:** separate page at `/ask`, linked from the header nav and the
  homepage close section. Not a widget, not a homepage replacement.
- **Answer engine:** curated answers + client-side semantic retrieval
  (in-browser embeddings). No generative model — a small model hallucinating
  about Francesco's own CV in front of a hiring PI is the worst failure mode.
- **Fallback:** unmatched questions get a friendly miss message plus a
  contact CTA routing to the existing qualifier/contact flow. No server-side
  logging of questions.
- **Language:** English only at launch. The IT site's header links to the
  same EN page, with a one-line note on the page that answers are in English.
  An Italian answer set may come later.
- **Honesty:** a visible line under the page title states that answers are
  curated and matched semantically in the browser, with no live LLM and no
  data leaving the device. Pretending to be a live model would damage
  credibility with exactly the audience the site targets.

## 3. Page & UX

- ChatGPT-look: message thread, input pinned at the bottom, 4–6 suggested
  question chips shown at the start (e.g. "Your healthcare-AI work?",
  "Open to full-time roles?", "Infrastructure experience?"). Typing
  indicator, then the answer types out (simulated streaming).
- Styled entirely within the site's editorial Swiss-minimal system — same
  type scale, spacing, accent color, motion system. It must not read as a
  third-party bot widget.
- Answers are written in first person as Francesco and may embed links
  (CV PDF, `/work`, Google Scholar, contact).
- Miss state: short friendly message + "ask me directly" CTA to the
  qualifier/contact form.

## 4. Data & retrieval

- `src/data/qa.ts` — roughly 40 entries:
  `{ id, question, aliases: string[], answer (markdown, links allowed), chip? }`.
  Claude drafts from existing site content and the CV; Francesco redlines
  (same process as the site copy).
- `scripts/embed-qa.mjs` — build-time Node script using transformers.js with
  a quantized MiniLM-class embedding model (384-dim). Embeds each question
  and its aliases, writes `qa-embeddings.json` (~60 KB) into the build.
- **Model self-hosted** under `public/models/` (fetched during build,
  ~25 MB added to the Docker image). No Hugging Face CDN request at runtime,
  which keeps the "nothing leaves your device" claim true.
- Client: a vanilla-TS island (no UI framework, consistent with the site).
  Lazy-loads transformers.js + model on first input focus or chip click.
- Retrieval pipeline per question:
  1. normalize input;
  2. Fuse.js pre-pass over questions + aliases — a confident fuzzy match
     answers instantly (also covers the window while the model downloads);
  3. otherwise embed the question, cosine similarity against all vectors;
  4. above threshold (~0.6, tuned with a paraphrase test set) → answer;
     below → fallback CTA.
- No server changes, no API route. Static assets only; SSR pages untouched.

## 5. Edge cases & SEO

- **Model fails to load** (old browser, no WASM, network error): silently
  degrade to Fuse.js-only matching. Chips always work — a chip maps directly
  to its answer without any model.
- **No JS / crawlers:** the curated Q&A set is also rendered as a static FAQ
  list (visually hidden behind the chat UI, visible in `noscript`), plus
  `FAQPage` schema.org markup. The whole answer set becomes indexable
  content, offsetting the usual chat-page SEO weakness.
- **Slow connections:** chips are instant; free-text input shows a
  "warming up" state until the model is ready.
- Input guards: trim, cap length, ignore empty submissions. No rate limiting
  needed (fully client-side).

## 6. Testing

- Unit tests on the retrieval function with fixtures: paraphrases must hit
  the correct answer; off-topic questions must fall below the threshold.
- Component test: chip click renders its answer; nonsense input renders the
  fallback CTA.
- Build-time check: `qa-embeddings.json` must be in sync with `src/data/qa.ts`
  (regenerate in the build; CI fails on drift).
- Threshold tuning script reports hit/miss accuracy over the fixture set.

## 7. Non-goals

- No generative model, local or API — now or as silent fallback.
- No server-side question logging or analytics beyond what the site has.
- No Italian answer set at launch.
- No chat history persistence; a page reload starts fresh.
