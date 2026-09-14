import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Portrait from "../src/components/Portrait.astro";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");
const container = await AstroContainer.create();
const render = (props: Record<string, unknown> = {}) =>
  container.renderToString(Portrait, { props: { alt: "Francesco Vigni", ...props } });

describe("the headshot ships with the source", () => {
  // public/ is ignored wholesale, so an image left there never reaches CI or
  // the container image. src/images is tracked.
  it("lives in src/images", () => {
    expect(existsSync(join(SRC, "images", "francesco.png"))).toBe(true);
  });

  it("is the file Francesco supplied, not a placeholder", () => {
    expect(statSync(join(SRC, "images", "francesco.png")).size).toBeGreaterThan(50_000);
  });

  it("no longer points at the missing public/ path", () => {
    expect(read("components/Portrait.astro")).not.toContain("/francesco.jpg");
  });
});

describe("<Portrait />", () => {
  it("goes through the asset pipeline rather than a raw file path", async () => {
    const html = await render();
    // Dev serves /_image?href=…, the build emits /_astro/francesco.<hash>.webp;
    // both carry astro:assets' marker and the source file's name.
    expect(html).toContain('data-image-component="true"');
    expect(html).toMatch(/<img[^>]+src="[^"]*francesco[^"]*"/);
  });

  it("offers a 2x source for retina screens", async () => {
    expect(await render()).toMatch(/srcset="[^"]*2x"/);
  });

  it("serves webp, not the 180 kB png", async () => {
    expect(await render()).toMatch(/f=webp|\.webp/);
  });

  it("carries the alt text it is given", async () => {
    expect(await render({ alt: "Francesco Vigni" })).toContain('alt="Francesco Vigni"');
  });

  it("sets intrinsic dimensions, so the layout does not shift while it loads", async () => {
    const html = await render();
    expect(html).toMatch(/width="\d+"/);
    expect(html).toMatch(/height="\d+"/);
  });

  it("loads lazily by default and eagerly when asked", async () => {
    expect(await render()).toContain('loading="lazy"');
    expect(await render({ eager: true })).toContain('loading="eager"');
  });

  it("passes through the caller's classes", async () => {
    expect(await render({ class: "h-8 w-8 rounded-full" })).toContain("h-8 w-8 rounded-full");
  });

  it("keeps the monogram underneath as a fallback", async () => {
    expect(await render()).toContain("FV");
  });
});

describe("where the homepage shows it", () => {
  it("the story section renders a portrait", () => {
    expect(read("components/Story.astro")).toContain("<Portrait");
  });

  it("the header avatar renders one too", () => {
    expect(read("components/Header.astro")).toContain("<Portrait");
  });

  it("the header avatar loads eagerly, sitting above the fold", () => {
    expect(read("components/Header.astro")).toMatch(/<Portrait[^>]*eager/);
  });
});
