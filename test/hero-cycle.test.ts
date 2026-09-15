import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Hero from "../src/components/Hero.astro";
import { hero } from "../src/data/home";

const SRC = join(import.meta.dirname, "..", "src");
const css = readFileSync(join(SRC, "styles", "global.css"), "utf8");
const container = await AstroContainer.create();
const render = (locale: "en" | "it") => container.renderToString(Hero, { props: { locale } });

describe("the cascade words", () => {
  it("climb detection, diagnosis, mechanism in English", () => {
    expect(hero.cycle.en).toEqual(["when", "why", "how"]);
  });

  it("say the same three things in Italian", () => {
    expect(hero.cycle.it).toEqual(["quando", "perché", "come"]);
  });

  it("start with the word the canonical headline already carries", () => {
    (["en", "it"] as const).forEach((locale) => {
      const word = hero.cycle[locale][0];
      expect(hero.title[locale], locale).toContain(word);
    });
  });
});

describe("the headline renders the slot", () => {
  it("wraps the hinge word rather than appending to the sentence", async () => {
    const html = await render("en");
    expect(html).toContain('<span class="word-cycle"');
    expect(html.match(/word-cycle-word/g) ?? []).toHaveLength(hero.cycle.en.length);
    // The word is replaced in place, not left standing next to the slot.
    expect(html).not.toMatch(/out when\s*<span class="word-cycle"/);
    expect(html).toMatch(/out\s*<span class="word-cycle"/);
  });

  it("carries all three words, in order", async () => {
    const html = await render("en");
    const words = [...html.matchAll(/word-cycle-word"[^>]*>([^<]+)</g)].map((m) => m[1]);
    expect(words).toEqual(["when", "why", "how"]);
  });

  it("matches an accented Italian word, which \\b would not", async () => {
    const html = await render("it");
    const words = [...html.matchAll(/word-cycle-word"[^>]*>([^<]+)</g)].map((m) => m[1]);
    expect(words).toEqual(["quando", "perché", "come"]);
    expect(html).toMatch(/Scopro\s*<span class="word-cycle"/);
  });

  it("reads the words from data rather than hardcoding them", () => {
    const source = readFileSync(join(SRC, "components", "Hero.astro"), "utf8");
    expect(source).toContain("hero.cycle");
    expect(source).not.toMatch(/"why"|"perché"/);
  });
});

describe("a screen reader hears one stable sentence", () => {
  it.each(["en", "it"] as const)(
    "leaves the canonical word on /%s as ordinary text and hides only the alternates",
    async (locale) => {
      const html = await render(locale);
      const words = [...html.matchAll(/<span class="word-cycle-word"([^>]*)>([^<]+)</g)];
      expect(words).toHaveLength(3);
      // First word: no aria-hidden, so it is what the accessible name uses.
      expect(words[0][1]).not.toContain("aria-hidden");
      expect(words[0][2]).toBe(hero.cycle[locale][0]);
      // The other two are decoration.
      expect(words[1][1]).toContain('aria-hidden="true"');
      expect(words[2][1]).toContain('aria-hidden="true"');
    },
  );

  it("never duplicates the hinge word, which a copied headline would show", async () => {
    const html = await render("en");
    expect(html.match(/>when</g) ?? []).toHaveLength(1);
    expect(html).not.toContain('class="sr-only"');
  });

  it("keeps the alternates out of the text selection", () => {
    expect(css).toMatch(/\.word-cycle-word \{[\s\S]*?user-select: none/);
    expect(css).toMatch(/\.word-cycle-word:first-child \{[\s\S]*?user-select: auto/);
  });

  it("still ships the canonical headline as server-rendered text", async () => {
    const html = await render("en");
    expect(html).toContain("I find out");
    expect(html).toContain("the model is");
    expect(html).toContain("when");
  });
});

describe("the typewriter holds still when asked to", () => {
  const cascade = css.slice(css.indexOf("/* --- Hero typewriter"));
  const block = cascade.slice(0, cascade.indexOf("/* Icons stay crisp"));
  const script = readFileSync(join(SRC, "components", "Hero.astro"), "utf8");

  it("shows the canonical word, unclipped, with nothing running by default", () => {
    // Every moving part is gated on [data-typing], which only the script sets.
    expect(block).toMatch(/\.word-cycle-word:first-child \{\s*opacity: 1;/);
    const moving = block.match(/(clip-path|animation):[^;]+;/g) ?? [];
    moving.forEach((rule) => {
      const at = block.indexOf(rule);
      const gate = block.lastIndexOf("[data-typing]", at);
      const keyframes = block.lastIndexOf("@keyframes", at);
      expect(Math.max(gate, keyframes), rule).toBeGreaterThan(-1);
    });
  });

  it("does not type at all for a visitor who asked for reduced motion", () => {
    expect(script).toContain('matchMedia("(prefers-reduced-motion: reduce)")');
    expect(script).toMatch(/if \(!still\.matches\)/);
  });

  it("runs one pass and hands the headline back to the static CSS", () => {
    // The word order ends on index 0, the canonical word and the resting state.
    expect(script).toMatch(/for \(const to of \[1, 2, 0\]\)/);
    expect(script).toContain("delete slot.dataset.typing");
  });

  it("ticks on rAF, not setTimeout, which a background tab throttles to ~1Hz", () => {
    expect(script).toContain("requestAnimationFrame(tick)");
    // Comments may name the timers they explain; the code must not call them.
    const code = script.replace(/^\s*\/\/.*$/gm, "");
    expect(code).not.toMatch(/setTimeout|setInterval/);
  });

  it("skips the pass entirely when the tab is not visible at load", () => {
    expect(script).toMatch(/if \(document\.visibilityState !== "visible"\) return;/);
  });

  it("loops nothing but the caret blink, which exists only while typing", () => {
    const wordRules = block.slice(0, block.indexOf("[data-typing]::after"));
    expect(wordRules).not.toMatch(/infinite/);
    expect(block).toMatch(/\[data-typing\]::after \{[\s\S]*?animation: caret-blink[^;]*infinite/);
  });

  it("measures glyph offsets rather than stepping in ch, the face being proportional", () => {
    expect(script).toContain("getBoundingClientRect().width");
    expect(script).toContain("await document.fonts?.ready");
    expect(block).not.toMatch(/steps\(\s*var\(/);
  });

  it("never rewrites the headline text, so selection and accname cannot move", () => {
    expect(script).not.toMatch(/\.textContent\s*=/);
    expect(script).not.toMatch(/innerHTML\s*=/);
    expect(block).toMatch(/clip-path: inset\(0 var\(--cut/);
  });

  it("sizes the slot to the longest word, so the line cannot shift", () => {
    expect(block).toMatch(/\.word-cycle \{[\s\S]*?display: inline-grid/);
    expect(block).toMatch(/\.word-cycle-word \{[\s\S]*?grid-area: word/);
    expect(block).toMatch(/\.word-cycle-word \{[\s\S]*?width: max-content/);
  });

  it("left-aligns the word, the caret taking up the slack", () => {
    expect(block).toMatch(/\.word-cycle \{[\s\S]*?justify-items: start/);
  });

  it("keeps the words on one line each", () => {
    expect(block).toMatch(/\.word-cycle-word \{[\s\S]*?white-space: nowrap/);
  });

  it("draws the accent underline after the typing has finished", () => {
    const delay = css.match(/animation: draw-underline [\d.]+s ease ([\d.]+)s/)?.[1];
    expect(Number(delay)).toBeGreaterThanOrEqual(2.4);
  });
});
