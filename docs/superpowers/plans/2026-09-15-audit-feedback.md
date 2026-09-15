# Audit Feedback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the francescovigni.com audit brief (P0–P2) to the Astro site: broaden positioning from clinical AI to applied AI/ML, make the homepage evidence-driven, promote the research, concretise the engagement offer, and soften unsupported compliance claims.

**Architecture:** Copy lives in `src/data/*.ts` as `{ en, it }` fields resolved by `pick()`; components in `src/components/` render it; pages in `src/pages/` compose components. Almost every change in this plan is therefore a data edit plus a small render change, guarded by the existing vitest suite (`test/*.test.ts`), which asserts current copy verbatim in several places and must be updated in the same commit as the copy it guards.

**Tech Stack:** Astro 5 (hybrid: `output: "server"`, per-page `prerender`), Tailwind 3, TypeScript, vitest + `experimental_AstroContainer` for component rendering tests.

**Spec:** `docs/superpowers/specs/2026-09-15-audit-feedback-brief.md`

## Global Constraints

- No em dashes (`—`) anywhere in `src/` — `test/copy-hygiene.test.ts` fails the build. Page titles separate with `|`, not `—`. This overrides the spec's suggested title format (`Francesco Vigni, PhD — Applied AI / ML Engineer & Consultant`).
- Never invent or estimate metrics. Only these verified numbers exist in the repo and may be used as proof points: `5M+ frames` (projects.ts medical-ai-consulting), `+9% grasp reliability` (projects.ts bin-picking-reliability), `0.28°` and `7.04°` and `±18°` (research.ts fetal-cardiac-orientation), `0.961` / `0.859` / `0.891` (research.ts endoscopy-standardization), `52% to 100% re-detection` (fetal research page). Qualitative proxies allowed: "real-time on Jetson", "multi-machine ROS2", "production deployment", "cross-dataset evaluation".
- No claim of certification or clinical readiness. Banned strings, site-wide: `EHDS-ready`, `Pronto per l'EHDS`, `ready for clinical validation`, `clinical-ready`. Replacements: "designed with future EHDS requirements in mind" / "progettata pensando ai futuri requisiti EHDS", and "designed with a path toward clinical validation" / "progettata con un percorso verso la validazione clinica".
- Keep, unchanged in substance: hero kicker `Hi, I'm Francesco 👋 · High-Tech Artisan`, the headline `I find out when the model is wrong.`, the four-item nav (Home / Work / Research / Contact — no new top-level items), the Research page structure, the `Context / Constraints / What I did / Outcome` project structure.
- Accessibility fundamentals stay: semantic headings, skip link, alt text, click-to-load YouTube facades, `data-reveal` respecting reduced motion. New interactive elements need visible focus states. Make no performance claim that was not measured.
- `npm test` must pass at the end of every task. Commit per task.

---

### Task 1: Hero and machine-read positioning

Broadens the top of the funnel from "PhD engineer and researcher" to applied AI/ML engineer + consultant, and puts a literal job title next to the personality label. Spec §3, §4, §17, P0-1.

**Files:**
- Modify: `src/data/home.ts` (hero object)
- Modify: `src/components/Hero.astro`
- Modify: `src/data/person.ts` (JOB_TITLE)
- Modify: `src/pages/index.astro`, `src/pages/it/index.astro` (title + description)
- Test: `test/hero-tagline.test.ts` (existing assertions on the old strings), `test/homepage.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `hero.role: { en: string; it: string }` in `src/data/home.ts`, rendered by `Hero.astro` as a `<p class="kicker">`-styled role line. Later tasks do not depend on it.

- [ ] **Step 1: Update the tests that pin the old strings**

In `test/hero-tagline.test.ts`, replace the two `machine-read fields stay literal` expectations:

```ts
    expect(personJsonLd("en").jobTitle).toBe("Applied AI and ML Engineer");
    expect(personJsonLd("it").jobTitle).toBe("Ingegnere AI / ML applicata");
```

```ts
    expect(en).toContain('title="Francesco Vigni, PhD | Applied AI / ML Engineer & Consultant"');
    expect(it).toContain('title="Francesco Vigni, PhD | Ingegnere AI / ML e Consulente"');
```

Add to the `hero tagline` describe block:

```ts
  it("names a literal role next to the personality label", async () => {
    const en = visibleText(await render("en"));
    expect(en).toContain("Applied ML Engineer · AI Consultant");
    const it = visibleText(await render("it"));
    expect(it).toContain("Ingegnere ML · Consulente AI");
  });

  it("calls the research applied, in the lead", () => {
    expect(hero.lead.en).toMatch(/^PhD engineer and applied AI researcher\./);
    expect(hero.lead.it).toMatch(/^Ingegnere e ricercatore applicato/);
  });
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run test/hero-tagline.test.ts`
Expected: FAIL — `expected 'AI Researcher and Engineer' to be 'Applied AI and ML Engineer'`, plus the two new cases failing on missing role text.

- [ ] **Step 3: Add the role line to the hero data**

In `src/data/home.ts`, inside `hero`, after `tagline`:

```ts
  // Literal role words next to the memorable label: "High-Tech Artisan" is the
  // personality, this is what a hiring manager or client searches for.
  role: { en: "Applied ML Engineer · AI Consultant", it: "Ingegnere ML · Consulente AI" },
```

And replace `lead`:

```ts
  lead: {
    en: "PhD engineer and applied AI researcher. I take difficult models from research to systems that run: medical-imaging foundation models, robots on factory floors, and the infrastructure that keeps both in production. Whether it starts as a research question or a production problem, the work is the same.",
    it: "Ingegnere e ricercatore applicato in AI, con dottorato. Porto modelli difficili dalla ricerca a sistemi che funzionano: foundation model per l'imaging medico, robot in fabbrica e l'infrastruttura che li tiene in produzione. Che si parta da una domanda di ricerca o da un problema di produzione, il lavoro è lo stesso.",
  },
```

- [ ] **Step 4: Render it**

In `src/components/Hero.astro`, after the `<h1 ... />` and before the lead paragraph:

```astro
      <p class="mt-4 font-sans text-sm font-semibold tracking-tight text-accent">
        {pick(hero.role, locale)}
      </p>
```

- [ ] **Step 5: Update the JSON-LD job title**

In `src/data/person.ts`:

```ts
const JOB_TITLE: Record<Locale, string> = {
  en: "Applied AI and ML Engineer",
  it: "Ingegnere AI / ML applicata",
};
```

- [ ] **Step 6: Update both homepage titles and descriptions**

`src/pages/index.astro`:

```astro
  title="Francesco Vigni, PhD | Applied AI / ML Engineer & Consultant"
  description="Applied AI and ML engineer. I take difficult models from research to production: medical imaging, computer vision, edge AI and robotics, plus the ML infrastructure underneath, and the evidence that says when a model is wrong."
```

`src/pages/it/index.astro`:

```astro
  title="Francesco Vigni, PhD | Ingegnere AI / ML e Consulente"
  description="Ingegnere AI e ML applicata. Porto modelli difficili dalla ricerca alla produzione: imaging medico, computer vision, edge AI e robotica, con l'infrastruttura ML sotto e le prove che dicono quando un modello sbaglia."
```

- [ ] **Step 7: Run the full suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/data/home.ts src/data/person.ts src/components/Hero.astro src/pages/index.astro src/pages/it/index.astro test/hero-tagline.test.ts
git commit -m "feat(home): broaden the hero to applied AI/ML, name the role"
```

---

### Task 2: Three areas renamed

`DevOps & Infrastructure` reads as the product instead of supporting expertise. Spec §4, P0-3.

**Files:**
- Modify: `src/data/home.ts` (pillars)
- Test: `test/copy-hygiene.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: pillar `id` values stay `research` / `robotics` / `infra`, because `src/components/PillarIcon.astro` switches on them. Only `label` and `body` change.

- [ ] **Step 1: Write the failing test**

Add to `test/copy-hygiene.test.ts`, inside `describe("labels read as plain language")`:

```ts
  it("names the areas after the product, not the supporting craft", () => {
    expect(pillars.map((p) => p.label.en)).toEqual([
      "Applied AI / ML",
      "Robotics & Edge AI",
      "ML Infrastructure",
    ]);
    expect(pillars.map((p) => p.id)).toEqual(["research", "robotics", "infra"]);
  });

  it("does not sell DevOps as the headline of an area", () => {
    pillars.forEach((p) => expect(p.label.en).not.toMatch(/devops/i));
  });
```

Extend the existing import at the top of the file:

```ts
import { hero, pillars } from "../src/data/home";
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/copy-hygiene.test.ts`
Expected: FAIL — `expected [ 'AI / ML Research', 'Robotics & Edge', 'DevOps & Infrastructure' ] to equal [ 'Applied AI / ML', … ]`.

- [ ] **Step 3: Rewrite the pillars**

Replace the `pillars` array in `src/data/home.ts`:

```ts
export const pillars = [
  {
    id: "research",
    label: { en: "Applied AI / ML", it: "AI / ML applicata" },
    body: {
      en: "Foundation models, computer vision, self-supervised learning, and the model evaluation that says whether a result is real. Medical imaging is where most of it runs.",
      it: "Foundation model, computer vision, self-supervised learning e la valutazione che dice se un risultato è reale. L'imaging medico è dove tutto questo gira.",
    },
  },
  {
    id: "robotics",
    label: { en: "Robotics & Edge AI", it: "Robotica & Edge AI" },
    body: {
      en: "ROS2 navigation and perception, real-time inference on NVIDIA Jetson, embedded deployment, and industrial systems sold in several countries.",
      it: "Navigazione e percezione ROS2, inferenza in tempo reale su NVIDIA Jetson, deployment embedded e sistemi industriali venduti in diversi paesi.",
    },
  },
  {
    id: "infra",
    label: { en: "ML Infrastructure", it: "Infrastruttura ML" },
    body: {
      en: "Training infrastructure and MLOps: distributed runs, experiment tracking, reproducibility, and Kubernetes delivery that rolls back on its own.",
      it: "Infrastruttura di training e MLOps: run distribuiti, tracking degli esperimenti, riproducibilità e delivery su Kubernetes che fa rollback da sola.",
    },
  },
];
```

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/home.ts test/copy-hygiene.test.ts
git commit -m "feat(home): rename the three areas to Applied AI / Robotics & Edge / ML Infrastructure"
```

---

### Task 3: Compliance wording that does not over-claim

`EHDS-ready` and "a defined path from research to clinical validation" read as certification and completed readiness. Spec §11, acceptance criteria.

**Files:**
- Modify: `src/data/home.ts` (trust badges), `src/data/projects.ts` (medical-ai-consulting outcome), `src/data/qa.ts` (lines 71, 390), `src/data/home.ts` (pillar body already rewritten in Task 2 — verify no `clinical validation` claim remains)
- Test: `test/copy-hygiene.test.ts`

**Interfaces:**
- Consumes: the pillar bodies from Task 2.
- Produces: nothing other tasks read.

- [ ] **Step 1: Write the failing test**

Add a new describe block to `test/copy-hygiene.test.ts`:

```ts
describe("compliance copy claims no certification", () => {
  it("never says EHDS-ready or clinical-ready anywhere in src", () => {
    const offenders = sourceFiles()
      .filter((file) =>
        /EHDS-ready|pronto per l'EHDS|clinical-ready|ready for clinical validation/i.test(
          readFileSync(file, "utf8"),
        ),
      )
      .map(relative);
    expect(offenders).toEqual([]);
  });

  it("frames EHDS as a future requirement, where it is mentioned", () => {
    sourceFiles()
      .map((file) => readFileSync(file, "utf8"))
      .filter((source) => /EHDS/.test(source))
      .forEach((source) => {
        expect(source).toMatch(/future EHDS requirements|futuri requisiti EHDS|EHDS/);
        expect(source).not.toMatch(/EHDS.{0,12}(ready|compliant|certified)/i);
      });
  });

  it("keeps the trust badges to one compact line of five", () => {
    expect(trust.badges.map((b) => b.en)).toEqual([
      "EU-based",
      "GDPR-aware",
      "NDA-friendly",
      "Self-hosted capable",
      "Registered Engineer (Ordine degli Ingegneri #2988)",
    ]);
  });
});
```

Extend the imports:

```ts
import { hero, pillars, trust } from "../src/data/home";
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/copy-hygiene.test.ts`
Expected: FAIL — offenders list contains `data/home.ts`, `data/projects.ts`, `data/qa.ts`.

- [ ] **Step 3: Rewrite the trust badges**

In `src/data/home.ts`:

```ts
export const trust = {
  kicker: { en: "Built to be trusted", it: "Fatto per essere affidabile" },
  badges: [
    { en: "EU-based", it: "Con base in UE" },
    { en: "GDPR-aware", it: "Attento al GDPR" },
    { en: "NDA-friendly", it: "Disponibile a NDA" },
    { en: "Self-hosted capable", it: "Self-hosted possibile" },
    {
      en: "Registered Engineer (Ordine degli Ingegneri #2988)",
      it: "Ingegnere iscritto (Ordine degli Ingegneri #2988)",
    },
  ],
};
```

- [ ] **Step 4: Rewrite the over-claiming outcome**

In `src/data/projects.ts`, the `medical-ai-consulting` `outcome`:

```ts
    outcome: {
      en: "A reproducible foundation-model pipeline over 5M+ frames, with data governance designed with future EHDS requirements in mind and a path toward clinical validation and edge inference.",
      it: "Una pipeline di foundation model riproducibile su oltre 5M di frame, con data governance progettata pensando ai futuri requisiti EHDS e un percorso verso la validazione clinica e l'inferenza edge.",
    },
```

- [ ] **Step 5: Rewrite the two chat answers**

In `src/data/qa.ts`, replace `EHDS-ready data governance` with `data governance designed with future EHDS requirements in mind` at both occurrences (the GDPR answer around line 71 and the "Do you know GDPR and the EHDS?" answer around line 390), leaving the rest of each answer intact.

Run to confirm both are gone: `grep -rn "EHDS-ready" src/`
Expected: no output.

- [ ] **Step 6: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/data/home.ts src/data/projects.ts src/data/qa.ts test/copy-hygiene.test.ts
git commit -m "fix(copy): stop claiming EHDS readiness and clinical readiness"
```

---

### Task 4: Proof points on the work cards

Every card carries one verified number and a link into the case study. Spec §4, §5, P0-4.

**Files:**
- Modify: `src/data/projects.ts` (add `proof` to the interface and to each project)
- Modify: `src/components/Proof.astro` (render the proof point + a case-study link)
- Modify: `src/components/ProjectStory.astro` (anchor id, so the link has a target)
- Test: `test/homepage.test.ts`, new `test/proof-points.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Project.proof: { value: Record<Locale, string>; label: Record<Locale, string> }` — `value` is the scannable number or technical proxy, `label` says what it measures. `ProjectStory.astro` renders `id={project.slug}` on its `<article>`; `Proof.astro` and later tasks link to `/work/#<slug>` (EN) and `/it/lavoro/#<slug>` (IT).

- [ ] **Step 1: Write the failing test**

Create `test/proof-points.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Proof from "../src/components/Proof.astro";
import ProjectStory from "../src/components/ProjectStory.astro";
import { projects } from "../src/data/projects";

const container = await AstroContainer.create();

describe("every project carries a proof point", () => {
  it("has a value and a label in both locales", () => {
    projects.forEach((project) => {
      expect(project.proof.value.en, project.slug).toBeTruthy();
      expect(project.proof.value.it, project.slug).toBeTruthy();
      expect(project.proof.label.en, project.slug).toBeTruthy();
      expect(project.proof.label.it, project.slug).toBeTruthy();
    });
  });

  it("uses only verified numbers or truthful technical proxies", () => {
    const allowed =
      /5M\+|9%|0\.28°|0\.961|real-time|tempo reale|multi-machine|multi-macchina|ROS2|production|produzione|k3s|Jetson/i;
    projects.forEach((project) => {
      expect(project.proof.value.en, project.slug).toMatch(allowed);
    });
  });
});

describe("the homepage cards earn the click", () => {
  it("shows the proof point and a link into the case study", async () => {
    const html = await container.renderToString(Proof, { props: { locale: "en" } });
    expect(html).toContain("5M+");
    expect(html).toMatch(/href="\/work\/#medical-ai-consulting"/);
  });

  it("sends Italian readers to the Italian case study anchor", async () => {
    const html = await container.renderToString(Proof, { props: { locale: "it" } });
    expect(html).toMatch(/href="\/it\/lavoro\/#medical-ai-consulting"/);
  });
});

describe("case studies are anchorable", () => {
  it("gives each story an id matching its slug", async () => {
    const html = await container.renderToString(ProjectStory, {
      props: { project: projects[0], locale: "en" },
    });
    expect(html).toContain(`id="${projects[0].slug}"`);
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/proof-points.test.ts`
Expected: FAIL — `Cannot read properties of undefined (reading 'value')`.

- [ ] **Step 3: Extend the Project interface and add the proof points**

In `src/data/projects.ts`, add to the interface after `tags`:

```ts
  /** One scannable proof point: a verified number, or a truthful technical proxy. */
  proof: { value: Record<Locale, string>; label: Record<Locale, string> };
```

Then add to each project, immediately after its `tags` line:

```ts
    // medical-ai-consulting
    proof: {
      value: { en: "5M+ frames", it: "5M+ frame" },
      label: { en: "gastrointestinal video, self-supervised pretraining", it: "video gastrointestinali, pretraining self-supervised" },
    },
```

```ts
    // edge-ai-occupancy
    proof: {
      value: { en: "Real-time on Jetson", it: "Tempo reale su Jetson" },
      label: { en: "on-device tracking and distance estimation, MQTT events", it: "tracking e stima distanze on-device, eventi MQTT" },
    },
```

```ts
    // industrial-floor-scrubber-navigation
    proof: {
      value: { en: "Production deployment", it: "Deployment in produzione" },
      label: { en: "ROS2 / Nav2 coverage navigation on a commercial scrubber", it: "navigazione a copertura ROS2 / Nav2 su una lavasciuga commerciale" },
    },
```

```ts
    // bin-picking-reliability
    proof: {
      value: { en: "+9% grasp reliability", it: "+9% affidabilità di presa" },
      label: { en: "industrial bin-picking, shipped in rc_visard and rc_cube", it: "bin-picking industriale, nei prodotti rc_visard e rc_cube" },
    },
```

```ts
    // self-hosted-infra
    proof: {
      value: { en: "12+ services on one k3s node", it: "12+ servizi su un nodo k3s" },
      label: { en: "health-gated, reversible Helm delivery with automatic rollback", it: "delivery Helm reversibile e health-gated con rollback automatico" },
    },
```

```ts
    // hri-interaction-engine
    proof: {
      value: { en: "Multi-machine ROS2 user study", it: "Studio utente ROS2 multi-macchina" },
      label: { en: "published in IEEE, bi-manual TIAGo with synchronised gaze", it: "pubblicato IEEE, TIAGo bi-manuale con sguardo sincronizzato" },
    },
```

- [ ] **Step 4: Render the proof point and the link**

In `src/components/Proof.astro`, replace the `<article>` body inside the map with:

```astro
        <article
          data-reveal
          style={`--reveal-delay:${i}`}
          class="flex flex-col rounded-lg border border-line bg-canvas p-6"
        >
          <p class="kicker mb-3 text-accent">{p.category}</p>
          <h3 class="font-serif text-lg leading-snug text-ink">{p.title}</h3>
          <p class="mt-3 flex-1 text-sm leading-relaxed text-muted">{pick(p.blurb, locale)}</p>
          <p class="mt-4 font-mono text-sm font-semibold text-ink">{pick(p.proof.value, locale)}</p>
          <p class="mt-1 text-xs leading-relaxed text-faint">{pick(p.proof.label, locale)}</p>
          <p class="mt-4 text-sm font-semibold">
            <a href={`${workHref}#${p.slug}`} class="text-accent underline-offset-4 hover:underline">
              {locale === "it" ? "Leggi il caso" : "Read the case study"} <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        </article>
```

(The tag list goes: the proof point replaces it, per spec §5 "outcomes over generic technology lists".)

- [ ] **Step 5: Give the case studies an anchor**

In `src/components/ProjectStory.astro`, change the opening tag:

```astro
<article id={project.slug} class="scroll-mt-24 border-t border-line py-10 first:border-t-0" data-reveal>
```

- [ ] **Step 6: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/data/projects.ts src/components/Proof.astro src/components/ProjectStory.astro test/proof-points.test.ts
git commit -m "feat(work): give every case study one verified proof point"
```

---

### Task 5: Research on the homepage

The two studies are the strongest differentiator and currently appear only on `/work/` and `/research/`. Spec §6, §7, §8, §20.5, P0-5.

**Files:**
- Create: `src/components/ResearchTeaser.astro`
- Modify: `src/pages/index.astro`, `src/pages/it/index.astro`
- Test: `test/homepage.test.ts`, new cases in `test/research-canonical.test.ts`

**Interfaces:**
- Consumes: `research` from `src/data/research.ts` (`slug`, `eyebrow`, `finding`, `stats[0]`), `Locale` from `../i18n`.
- Produces: `ResearchTeaser.astro` with `Props { locale: Locale }`. Renders a section with the headline "I don't just train models. I test what they're actually learning." and one compact row per study: headline stat, the finding, and a link to `/research/<slug>/`.

- [ ] **Step 1: Write the failing test**

In `test/homepage.test.ts`, update the composition expectation:

```ts
  it("runs seven sections, evidence and research before the ask", () => {
    HOMEPAGES.forEach((page) => {
      expect(sectionsOf(page)).toEqual([
        "Hero",
        "Pedigree",
        "Pillars",
        "Proof",
        "ResearchTeaser",
        "Story",
        "Qualifier",
      ]);
    });
  });
```

And add a new describe block:

```ts
describe("research teaser", () => {
  it("leads with the claim that the research is about testing, not training", async () => {
    const html = await render(ResearchTeaser, { locale: "en" });
    expect(html).toContain("test what they");
    expect(html).not.toMatch(/i just train/i);
  });

  it("carries both headline numbers and links into the studies", async () => {
    const html = await render(ResearchTeaser, { locale: "en" });
    expect(html).toContain("0.28°");
    expect(html).toContain("0.961");
    expect(html).toContain('href="/research/fetal-cardiac-orientation/"');
    expect(html).toContain('href="/research/endoscopy-standardization/"');
    expect(html).toContain('href="/research/"');
  });

  it("keeps the English research destination on the Italian homepage, labelled", async () => {
    const html = await render(ResearchTeaser, { locale: "it" });
    expect(html).toContain('href="/research/"');
    expect(html).toMatch(/in inglese/i);
  });
});
```

Add the import at the top of `test/homepage.test.ts`:

```ts
import ResearchTeaser from "../src/components/ResearchTeaser.astro";
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/homepage.test.ts`
Expected: FAIL — cannot resolve `../src/components/ResearchTeaser.astro`.

- [ ] **Step 3: Write the component**

Create `src/components/ResearchTeaser.astro`:

```astro
---
// Homepage research strip: the differentiator is not "I trained models", it is
// "I check what the model actually learned". Two studies, one number each, and
// the link into the argument. The full cards live on /research/.
import { type Locale } from "../i18n";
import { research } from "../data/research";

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const t =
  locale === "it"
    ? {
        kicker: "Ricerca",
        title: "Non mi limito ad addestrare modelli. Verifico cosa stanno davvero imparando.",
        lead: "Due studi recenti, su dati pubblici, con i risultati negativi lasciati dentro.",
        all: "Tutta la ricerca (in inglese)",
      }
    : {
        kicker: "Research",
        title: "I don't just train models. I test what they're actually learning.",
        lead: "Two recent studies, both on public data, both with the negative results left in.",
        all: "All research",
      };
---

<section class="border-t border-line bg-sand">
  <div class="wrap py-16 sm:py-20">
    <div class="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        <p class="kicker mb-3">{t.kicker}</p>
        <h2 class="display max-w-prose text-2xl sm:text-3xl">{t.title}</h2>
        <p class="lead mt-4 max-w-prose text-base">{t.lead}</p>
      </div>
      <p class="shrink-0 text-sm font-semibold">
        <a href="/research/" class="text-accent underline-offset-4 hover:underline">
          {t.all} <span aria-hidden="true">&rarr;</span>
        </a>
      </p>
    </div>

    <ul class="grid gap-4 md:grid-cols-2">
      {
        research.map((study, i) => (
          <li
            class="flex flex-col rounded-lg border border-line bg-canvas p-6"
            data-reveal
            style={`--reveal-delay:${i}`}
          >
            <p class="kicker mb-3 text-accent">{study.eyebrow}</p>
            <p class="font-mono text-2xl font-semibold text-ink">{study.stats[0].value}</p>
            <p class="mt-1 text-xs text-faint">{study.stats[0].label}</p>
            <p class="mt-4 flex-1 font-serif text-base leading-snug text-ink" set:html={study.finding} />
            <p class="mt-4 text-sm font-semibold">
              <a
                href={`/research/${study.slug}/`}
                class="text-accent underline-offset-4 hover:underline"
              >
                {study.cta} <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </li>
        ))
      }
    </ul>
  </div>
</section>
```

- [ ] **Step 4: Compose it into both homepages**

In `src/pages/index.astro` and `src/pages/it/index.astro`, import `ResearchTeaser` and place `<ResearchTeaser locale="en" />` (resp. `"it"`) between `<Proof … />` and `<Story … />`.

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ResearchTeaser.astro src/pages/index.astro src/pages/it/index.astro test/homepage.test.ts
git commit -m "feat(home): feature the two research studies on the homepage"
```

---

### Task 6: The final CTA asks a broader question

`Is this a fit? / Tell me what brings you here.` is a router, not an ask, and the surrounding copy reads clinical. Spec §3, §10, §20.8, P0-2.

**Files:**
- Modify: `src/components/Qualifier.astro` (the `t` copy object for both locales)
- Test: new `test/qualifier-cta.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: no new exports. The intent chips, form, honeypot, and `/api/lead` POST stay exactly as they are; only headline, lead, and a new metadata line change.

- [ ] **Step 1: Write the failing test**

Create `test/qualifier-cta.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Qualifier from "../src/components/Qualifier.astro";

const container = await AstroContainer.create();
const render = (locale: "en" | "it", variant?: "section" | "page") =>
  container.renderToString(Qualifier, { props: { locale, variant } });

describe("the closing ask is about difficult AI, not clinical AI", () => {
  it("asks the broad question in English", async () => {
    const html = await render("en");
    expect(html).toContain("Have a difficult AI problem?");
    expect(html).toContain("Medical imaging, computer vision, edge AI and intelligent systems.");
    expect(html).not.toMatch(/clinical-ai problem/i);
  });

  it("asks it in Italian too", async () => {
    const html = await render("it");
    expect(html).toContain("Hai un problema di AI difficile?");
  });

  it("names the engagement shape as supporting metadata", async () => {
    const html = await render("en");
    expect(html).toContain("Freelance · Consulting · R&D · Remote");
  });

  it("keeps the intent selector and the lead form intact", async () => {
    const html = await render("en");
    ["hiring", "collaboration", "project", "exploring"].forEach((intent) =>
      expect(html).toContain(`data-intent="${intent}"`),
    );
    expect(html).toContain('name="company_website"');
    expect(html).toContain('data-step="form"');
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/qualifier-cta.test.ts`
Expected: FAIL — `expected … to contain 'Have a difficult AI problem?'`.

- [ ] **Step 3: Rewrite the headline copy**

In `src/components/Qualifier.astro`, in the `en` branch of `t`:

```ts
    kicker: "Let's talk",
    title: "Have a difficult AI problem?",
    lead: "Medical imaging, computer vision, edge AI and intelligent systems.",
    meta: "Freelance · Consulting · R&D · Remote",
    ask: "Tell me what you are trying to build, what is not working, and what constraints you are dealing with. One tap routes you to the right next step.",
```

and in the `it` branch:

```ts
    kicker: "Parliamone",
    title: "Hai un problema di AI difficile?",
    lead: "Imaging medico, computer vision, edge AI e sistemi intelligenti.",
    meta: "Freelance · Consulenza · R&D · Remoto",
    ask: "Dimmi cosa stai cercando di costruire, cosa non funziona e con quali vincoli. Un tap ti indirizza al passo giusto.",
```

- [ ] **Step 4: Render the new lines**

Replace the three heading paragraphs at the top of the panel:

```astro
    <p class:list={["kicker mb-3", dark ? "text-canvas/60" : ""]}>{t.kicker}</p>
    <h2 class:list={["display text-2xl sm:text-3xl", dark ? "text-canvas" : ""]}>{t.title}</h2>
    <p class:list={["mt-3 text-base", dark ? "text-canvas/80" : "text-ink"]}>{t.lead}</p>
    <p class:list={["mt-3 max-w-prose text-sm", dark ? "text-canvas/70" : "text-muted"]}>{t.ask}</p>
    <p class:list={["mt-4 font-mono text-xs", dark ? "text-canvas/50" : "text-faint"]}>{t.meta}</p>
```

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS. If `test/copy-hygiene.test.ts` fails on the "does not repeat the hero's button label as the contact headline" case, note that it asserts on `pages/contact.astro`, not this component, so it should still pass; if it does not, the contact `<h1>` in Task 8 is the place to resolve it.

- [ ] **Step 6: Commit**

```bash
git add src/components/Qualifier.astro test/qualifier-cta.test.ts
git commit -m "feat(cta): close with 'Have a difficult AI problem?'"
```

---

### Task 7: Work page keeps the proof, demotes the résumé

Projects, publications, talks, and the personal story compete on one page. Spec §5, §22, acceptance criteria.

**Files:**
- Modify: `src/pages/work.astro`, `src/pages/it/lavoro.astro`
- Create: `src/components/CareerArchive.astro`
- Test: `test/homepage.test.ts` (Story assertions), new `test/work-page.test.ts`

**Interfaces:**
- Consumes: `Publications.astro`, `Talks.astro`, `Story.astro` (all unchanged), `Locale`.
- Produces: `CareerArchive.astro` with `Props { locale: Locale }`: a `<details>` disclosure titled "Career & milestones" / "Percorso e tappe" whose open panel contains `<Publications>`, `<Talks>`, and `<Story>` in that order. The `<summary>` is keyboard focusable by default; give it a visible focus ring.

- [ ] **Step 1: Write the failing test**

Create `test/work-page.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import CareerArchive from "../src/components/CareerArchive.astro";

const SRC = join(import.meta.dirname, "..", "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");
const container = await AstroContainer.create();

describe("the work page leads with proof", () => {
  it("renders the deployment stories before the career archive", () => {
    (["pages/work.astro", "pages/it/lavoro.astro"] as const).forEach((page) => {
      const source = read(page);
      expect(source.indexOf("ProjectStory")).toBeLessThan(source.indexOf("CareerArchive"));
    });
  });

  it("no longer places publications, talks and story as top-level sections", () => {
    (["pages/work.astro", "pages/it/lavoro.astro"] as const).forEach((page) => {
      const source = read(page);
      expect(source).not.toMatch(/^\s*<Publications\b/m);
      expect(source).not.toMatch(/^\s*<Talks\b/m);
      expect(source).not.toMatch(/^\s*<Story\b/m);
      expect(source).toContain("CareerArchive");
    });
  });
});

describe("career archive", () => {
  it("collapses the résumé material behind one disclosure", async () => {
    const html = await container.renderToString(CareerArchive, { props: { locale: "en" } });
    expect(html).toContain("<details");
    expect(html).toContain("<summary");
    expect(html).toMatch(/Career & milestones/);
  });

  it("still contains the publications, the talks and the story", async () => {
    const html = await container.renderToString(CareerArchive, { props: { locale: "en" } });
    expect(html).toMatch(/Peer-reviewed work/);
    expect(html).toMatch(/Talks and interviews/);
    expect(html).toMatch(/My story/);
  });

  it("labels the disclosure in Italian on the Italian page", async () => {
    const html = await container.renderToString(CareerArchive, { props: { locale: "it" } });
    expect(html).toMatch(/Percorso e tappe/);
  });
});
```

In `test/homepage.test.ts`, the three Story cases that read `pages/work.astro` / `pages/it/lavoro.astro` now need to look inside the archive instead. Replace them with:

```ts
  it("keeps the portrait and the full story on the work pages, inside the archive", () => {
    const archive = readFileSync(join(SRC, "components", "CareerArchive.astro"), "utf8");
    expect(archive).toMatch(/<Story\b/);
    expect(archive).not.toMatch(/<Story[^>]*limit=/);
    expect(archive).not.toMatch(/<Story[^>]*portrait=/);
  });
```

and delete the two superseded cases ("keeps the portrait on the work pages, which have no hero" and "is limited on the homepage and complete on the work pages"), keeping the homepage half of the latter as:

```ts
  it("is limited on the homepage", () => {
    HOMEPAGES.forEach((page) => expect(read(page)).toMatch(/<Story[^>]*limit=\{2\}/));
  });
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/work-page.test.ts`
Expected: FAIL — cannot resolve `../src/components/CareerArchive.astro`.

- [ ] **Step 3: Write the component**

Create `src/components/CareerArchive.astro`:

```astro
---
// Publications, talks and the personal story, collapsed. They are credibility,
// not the argument: the work page leads with the deployment stories and their
// proof points, and a reader who wants the résumé opens this.
import { type Locale } from "../i18n";
import Publications from "./Publications.astro";
import Talks from "./Talks.astro";
import Story from "./Story.astro";

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const t =
  locale === "it"
    ? { title: "Percorso e tappe", hint: "Pubblicazioni, talk e la storia personale." }
    : { title: "Career & milestones", hint: "Publications, talks, and the personal story." };
---

<section class="wrap pb-12 pt-4">
  <details class="border-t border-line pt-7">
    <summary
      class="cursor-pointer rounded font-serif text-2xl text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {t.title}
      <span class="mt-1 block font-sans text-sm font-normal text-muted">{t.hint}</span>
    </summary>

    <Publications locale={locale} />
    <Talks locale={locale} />
    <Story locale={locale} />
  </details>
</section>
```

- [ ] **Step 4: Recompose both work pages**

In `src/pages/work.astro`, replace the trailing `<Publications … /> <Talks … /> <Story … />` with `<CareerArchive locale="en" />`, updating the imports. Same in `src/pages/it/lavoro.astro` with `locale="it"`.

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/CareerArchive.astro src/pages/work.astro src/pages/it/lavoro.astro test/work-page.test.ts test/homepage.test.ts
git commit -m "feat(work): collapse publications, talks and story into a career archive"
```

---

### Task 8: Engagement formats on the contact pages

"Technical audit / Proof of concept / Ongoing technical support" is concrete where the current page is not. Spec §9, §20.7, P1-6.

**Files:**
- Create: `src/components/Engagement.astro`
- Modify: `src/pages/contact.astro`, `src/pages/it/contatti.astro`
- Test: new `test/engagement.test.ts`

**Interfaces:**
- Consumes: `Locale`.
- Produces: `Engagement.astro` with `Props { locale: Locale }`: three named formats, each with a one-line "for" list. Durations are included only if the decision recorded at the top of the implementation session says they match real offers; otherwise the duration line is omitted entirely rather than softened.

- [ ] **Step 1: Write the failing test**

Create `test/engagement.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Engagement from "../src/components/Engagement.astro";

const SRC = join(import.meta.dirname, "..", "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");
const container = await AstroContainer.create();

describe("engagement formats", () => {
  it("names three concrete ways to start, in English", async () => {
    const html = await container.renderToString(Engagement, { props: { locale: "en" } });
    expect(html).toContain("Technical audit");
    expect(html).toContain("Proof of concept");
    expect(html).toContain("Ongoing technical support");
  });

  it("names them in Italian", async () => {
    const html = await container.renderToString(Engagement, { props: { locale: "it" } });
    expect(html).toContain("Audit tecnico");
    expect(html).toContain("Proof of concept");
    expect(html).toContain("Supporto tecnico continuativo");
  });

  it("drops the generic pilot / support / transition labels", async () => {
    const html = await container.renderToString(Engagement, { props: { locale: "en" } });
    expect(html).not.toMatch(/\bPilot\b/);
    expect(html).not.toMatch(/\bTransition\b/);
  });

  it("appears on both contact pages, above the trust badges", () => {
    (["pages/contact.astro", "pages/it/contatti.astro"] as const).forEach((page) => {
      const source = read(page);
      expect(source).toContain("Engagement");
      expect(source.indexOf("<Engagement")).toBeLessThan(source.indexOf("<Trust"));
    });
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/engagement.test.ts`
Expected: FAIL — cannot resolve `../src/components/Engagement.astro`.

- [ ] **Step 3: Write the component**

Create `src/components/Engagement.astro`:

```astro
---
// Three named ways to start, in ascending commitment. Named after what the
// client gets, not after a phase of a methodology.
import { type Locale } from "../i18n";

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const t =
  locale === "it"
    ? {
        kicker: "Come si comincia",
        title: "Tre modi di lavorare insieme.",
        formats: [
          {
            name: "Audit tecnico",
            body: "Domande di fattibilità, pipeline ML esistenti, indagini su modelli che sbagliano, review di architettura, disegno della valutazione.",
          },
          {
            name: "Proof of concept",
            body: "Prototipazione di modelli, computer vision, imaging medico, edge AI, validazione dalla ricerca al prodotto.",
          },
          {
            name: "Supporto tecnico continuativo",
            body: "Competenza ML senior frazionaria, guida sull'architettura, supporto ricerca/ingegneria, passaggio in produzione.",
          },
        ],
      }
    : {
        kicker: "How this starts",
        title: "Three ways to work together.",
        formats: [
          {
            name: "Technical audit",
            body: "Feasibility questions, existing ML pipelines, model failure investigation, architecture review, evaluation design.",
          },
          {
            name: "Proof of concept",
            body: "Model prototyping, computer vision, medical imaging, edge AI, research-to-product validation.",
          },
          {
            name: "Ongoing technical support",
            body: "Fractional senior ML expertise, architecture guidance, research and engineering support, production transition.",
          },
        ],
      };
---

<section class="wrap pb-8">
  <p class="kicker mb-3">{t.kicker}</p>
  <h2 class="display mb-8 max-w-prose text-2xl">{t.title}</h2>
  <ol class="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
    {
      t.formats.map((format, i) => (
        <li class="bg-canvas p-6" data-reveal style={`--reveal-delay:${i}`}>
          <h3 class="font-sans text-base font-semibold text-ink">{format.name}</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted">{format.body}</p>
        </li>
      ))
    }
  </ol>
</section>
```

- [ ] **Step 4: Compose it into both contact pages**

In `src/pages/contact.astro`, import `Engagement` and render `<Engagement locale="en" />` between the closing `</section>` of the intro grid and `<Trust locale="en" />`. Same in `src/pages/it/contatti.astro` with `locale="it"`.

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Engagement.astro src/pages/contact.astro src/pages/it/contatti.astro test/engagement.test.ts
git commit -m "feat(contact): name three concrete engagement formats"
```

---

### Task 9: Bilingual expectations made explicit

Italian readers currently get no Research entry at all, and no explanation. Spec §12, P1-7, acceptance criteria.

**Files:**
- Modify: `src/components/Header.astro` (nav construction), `src/i18n.ts` (`ui.it.nav`)
- Test: new cases in `test/site.test.ts`, or a new `test/bilingual.test.ts`

**Interfaces:**
- Consumes: `ui`, `localePairs` from `src/i18n.ts`.
- Produces: the Italian nav gains a fourth item pointing at `/research/` whose label carries an explicit English-language marker, and whose anchor carries `hreflang="en"`. `localePairs` stays unchanged: `/research/` remains deliberately unpaired, so the geo middleware and the hreflang tags keep their current behaviour.

- [ ] **Step 1: Write the failing test**

Create `test/bilingual.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Header from "../src/components/Header.astro";
import { localePairs, ui } from "../src/i18n";

const container = await AstroContainer.create();
const render = (locale: "en" | "it", pathname: string) =>
  container.renderToString(Header, { props: { locale, pathname } });

describe("the Italian nav is intentional, not short", () => {
  it("offers Research to Italian readers, marked as English", async () => {
    const html = await render("it", "/it/");
    expect(html).toContain('href="/research/"');
    expect(html).toMatch(/hreflang="en"/);
    expect(html).toMatch(/Research\s*\(EN\)/);
  });

  it("keeps the four English nav items unchanged", async () => {
    const html = await render("en", "/");
    ['href="/"', 'href="/work/"', 'href="/research/"', 'href="/contact/"'].forEach((href) =>
      expect(html).toContain(href),
    );
  });

  it("leaves /research/ unpaired, so the language toggle stays predictable", () => {
    expect(localePairs.some((pair) => pair.en === "/research/")).toBe(false);
  });

  it("labels the Italian research entry in the locale strings, not in the component", () => {
    expect(ui.it.nav.research).toBe("Research (EN)");
    expect(ui.en.nav.research).toBe("Research");
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/bilingual.test.ts`
Expected: FAIL — the Italian header renders no `/research/` link.

- [ ] **Step 3: Label the Italian entry**

In `src/i18n.ts`, in `ui.it.nav`:

```ts
    nav: { home: "Home", work: "Lavoro", research: "Research (EN)", contact: "Contatti" },
```

- [ ] **Step 4: Put it in the nav for both locales**

In `src/components/Header.astro`, replace the conditional research entry:

```ts
const nav = [
  { href: `${base}/`, label: t.nav.home },
  { href: locale === "it" ? "/it/lavoro/" : "/work/", label: t.nav.work },
  // Research is deliberately English-only (see i18n.ts localePairs). Italian
  // readers still get the entry, labelled, rather than a nav that hides the
  // strongest part of the site.
  { href: "/research/", label: t.nav.research, hreflang: locale === "it" ? "en" : undefined },
  { href: locale === "it" ? "/it/contatti/" : "/contact/", label: t.nav.contact },
];
```

and pass the attribute through in both the desktop and the mobile list:

```astro
            <a
              href={item.href}
              hreflang={item.hreflang}
              class="link-underline text-sm font-medium text-muted transition-colors hover:text-ink"
            >
```

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/i18n.ts src/components/Header.astro test/bilingual.test.ts
git commit -m "feat(i18n): give Italian readers the research nav entry, marked English"
```

---

### Task 10: Page titles, descriptions, and research cross-links

Titles carry the searchable role words, and every research page routes onward to work and contact. Spec §17, §18, P2-12, acceptance criteria.

**Files:**
- Modify: `src/pages/work.astro`, `src/pages/it/lavoro.astro`, `src/pages/contact.astro`, `src/pages/it/contatti.astro`, `src/pages/research/index.astro`, `src/pages/research/fetal-cardiac-orientation.astro`, `src/pages/research/endoscopy-standardization.astro`
- Test: new `test/page-metadata.test.ts`

**Interfaces:**
- Consumes: the anchors from Task 4 (`/work/#medical-ai-consulting`).
- Produces: nothing other tasks read.

- [ ] **Step 1: Write the failing test**

Create `test/page-metadata.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SRC = join(import.meta.dirname, "..", "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");

function pageFiles(dir = join(SRC, "pages")): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return pageFiles(full);
    return entry.name.endsWith(".astro") ? [full] : [];
  });
}

describe("titles carry the searchable role words", () => {
  const expected: Record<string, string> = {
    "pages/work.astro": "Applied AI & Computer Vision Projects | Francesco Vigni, PhD",
    "pages/it/lavoro.astro": "Progetti di AI applicata e computer vision | Francesco Vigni, PhD",
    "pages/research/index.astro":
      "AI / ML Research | Medical Imaging, Evaluation & Failure Analysis",
    "pages/research/fetal-cardiac-orientation.astro":
      "Fetal Cardiac Orientation with Computer Vision | AI Research",
    "pages/research/endoscopy-standardization.astro":
      "Endoscopy Domain Shift & Dataset Bias | AI Research",
    "pages/contact.astro": "Contact | Applied AI / ML Engineer & Consultant",
    "pages/it/contatti.astro": "Contatti | Ingegnere AI / ML e Consulente",
  };

  Object.entries(expected).forEach(([page, title]) => {
    it(`${page} is titled for what it is about`, () => {
      expect(read(page)).toContain(`title="${title}"`);
    });
  });

  it("every page has a description", () => {
    pageFiles().forEach((file) => {
      const source = readFileSync(file, "utf8");
      if (!source.includes("<Base")) return;
      expect(source, file).toMatch(/description=/);
    });
  });
});

describe("research pages route onward", () => {
  const pages = [
    "pages/research/fetal-cardiac-orientation.astro",
    "pages/research/endoscopy-standardization.astro",
  ] as const;

  it("link to work and to contact, not just to email", () => {
    pages.forEach((page) => {
      const source = read(page);
      expect(source, page).toContain('href="/work/"');
      expect(source, page).toContain('href="/contact/"');
    });
  });

  it("link to the case study the method came out of", () => {
    expect(read("pages/research/endoscopy-standardization.astro")).toContain(
      '/work/#medical-ai-consulting',
    );
  });

  it("the research index routes to contact too", () => {
    expect(read("pages/research/index.astro")).toContain('href="/contact/"');
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/page-metadata.test.ts`
Expected: FAIL on every title case and on the missing `/contact/` links.

- [ ] **Step 3: Rewrite the titles and descriptions**

`src/pages/work.astro`:

```astro
  title="Applied AI & Computer Vision Projects | Francesco Vigni, PhD"
  description="Selected applied AI, computer vision, edge AI and robotics work, each told as a deployment story with one verified proof point: context, constraints, what I did, and the outcome."
```

`src/pages/it/lavoro.astro`:

```astro
  title="Progetti di AI applicata e computer vision | Francesco Vigni, PhD"
  description="Lavori selezionati di AI applicata, computer vision, edge AI e robotica, ciascuno raccontato come una storia di deployment con una prova verificata: contesto, vincoli, cosa ho fatto e il risultato."
```

`src/pages/research/index.astro`:

```astro
  title="AI / ML Research | Medical Imaging, Evaluation & Failure Analysis"
  description="Self-supervised learning, dataset bias and model evaluation in medical imaging. Recent studies on public data, with the negative results left in."
```

`src/pages/research/fetal-cardiac-orientation.astro`:

```astro
  title="Fetal Cardiac Orientation with Computer Vision | AI Research"
```

`src/pages/research/endoscopy-standardization.astro`:

```astro
  title="Endoscopy Domain Shift & Dataset Bias | AI Research"
```

`src/pages/contact.astro`:

```astro
  title="Contact | Applied AI / ML Engineer & Consultant"
  description="Start a conversation about a difficult AI problem: a technical audit, a proof of concept, or ongoing ML support. Medical imaging, computer vision, edge AI and robotics."
```

`src/pages/it/contatti.astro`:

```astro
  title="Contatti | Ingegnere AI / ML e Consulente"
  description="Parliamo di un problema di AI difficile: audit tecnico, proof of concept o supporto ML continuativo. Imaging medico, computer vision, edge AI e robotica."
```

Leave each research page's existing `description` as written if it already reads well; only add one where the test reports it missing.

- [ ] **Step 4: Add the onward links**

In both research detail pages, in the `<p class="contact">` block inside `<div class="tail">`, add a contact link (and, on the endoscopy page, the case-study link):

```astro
        <p class="contact">
          <a href="/work/">Full background</a>
          <a href="/work/#medical-ai-consulting">The case study this came out of</a>
          <a href="/contact/">Start a conversation</a>
          <a href="https://github.com/francescovigni">GitHub</a>
        </p>
```

On the fetal page, omit the case-study line (no client project corresponds to it) and keep the other three.

In `src/pages/research/index.astro`, in the trailing links paragraph, add:

```astro
        <a class="link-underline mr-6 text-ink" href="/contact/">Start a conversation</a>
```

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages test/page-metadata.test.ts
git commit -m "feat(seo): title pages for the positioning, link research onward to work and contact"
```

---

### Task 11: Verify the build, the a11y fundamentals, and the acceptance criteria

Nothing in this plan is done until the site builds and the fundamentals the spec says to preserve still hold. Spec §19, §24, P2-13.

**Files:**
- Modify: none expected. Fix whatever the checks surface.

**Interfaces:**
- Consumes: every prior task.
- Produces: a written check of the spec's acceptance criteria, and an honest statement of what was measured versus what was only reviewed.

- [ ] **Step 1: Run the whole suite**

Run: `npm test`
Expected: PASS, every file.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: exit 0, no unresolved imports, no missing-asset warnings for `/research/figures/*` or the CV.

- [ ] **Step 3: Check the headings and focus states by hand in the built output**

Run: `npx astro preview` and walk `/`, `/work/`, `/research/`, `/contact/`, `/it/` with the keyboard only: Tab reaches the nav, the language toggle, the `<summary>` of the career archive, the intent chips, and the form fields, and each shows a visible focus ring. The `<details>` opens on Enter.

- [ ] **Step 4: Check the acceptance criteria in the spec §24 one by one**

For each of the thirteen criteria, name the task that satisfies it or record it as out of repo scope (CV file, GitHub pinned repos, secondary portfolio site, legacy Gatsby URLs).

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: build and accessibility follow-ups from the audit pass"
```

---

## Out of repo scope

These spec items cannot be done from this repository and need Francesco, not code. Report them, do not fake them:

- **§14 CV alignment (P1-8).** `public/Francesco-Vigni-CV.pdf` does not exist in the repo at all, while `hero.cvHref` and the Qualifier explore links point at it. The top third needs to say "Applied ML / AI Engineer" and the medical AI, computer vision, edge AI, robotics, ML infrastructure story. Blocked on the file.
- **§13 legacy URLs (P1-9).** `/blog/phd/`, `/publications/...` and the old PDF assets live on the deployed Gatsby site, not here (`legacy/` holds only the old build config). Preserving those URLs and adding navigation back is a deploy-time redirect question.
- **§15 secondary portfolio (P2-11).** Repositioning the apps/demos site as "Experiments & Live Demos" is a change to that site. Note that `SITE.portfolio` in this repo points at `portfolio.francescovigni.com`, the standalone research site, which is a different property from the apps site the spec describes.
- **§16 GitHub pinned repositories (P2-10).** Account settings.
- **§19 Core Web Vitals / Lighthouse.** Needs a real browser run against a deployed build. Do not write a performance claim into the site copy without one.
