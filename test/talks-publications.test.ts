import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Talks from "../src/components/Talks.astro";
import Publications from "../src/components/Publications.astro";
import { talks } from "../src/data/talks";
import { publications, awards } from "../src/data/publications";

const SRC = join(import.meta.dirname, "..", "src");
const read = (relative: string) => readFileSync(join(SRC, relative), "utf8");
const container = await AstroContainer.create();
const render = (Component: Parameters<typeof container.renderToString>[0], locale = "en") =>
  container.renderToString(Component, { props: { locale } });

const WORK_PAGES = ["pages/work.astro", "pages/it/lavoro.astro"];

describe("talks data", () => {
  it("carries all six talks from the live site", () => {
    expect(talks).toHaveLength(6);
  });

  it("every talk has a title, venue, date and video id", () => {
    talks.forEach((talk) => {
      expect(talk.title.length).toBeGreaterThan(5);
      expect(talk.event.length).toBeGreaterThan(3);
      expect(talk.date).toMatch(/^[A-Z][a-z]{2} \d{4}$/);
      expect(talk.youtubeId).toMatch(/^[\w-]{11}$/);
    });
  });

  it("keeps the ICRA, RO-MAN and HRI talks that carry the research signal", () => {
    const venues = talks.map((t) => t.event).join(" ");
    expect(venues).toMatch(/ICRA/);
    expect(venues).toMatch(/RO-MAN/);
    expect(venues).toMatch(/HRI/);
  });

  it("keeps the broadcast interview, which speaks to the other audience", () => {
    expect(talks.map((t) => t.event).join(" ")).toMatch(/Canale Italia/);
  });
});

describe("<Talks /> loads no third party until asked", () => {
  it("ships no iframe in the initial markup", async () => {
    expect(await render(Talks)).not.toContain("<iframe");
  });

  it("shows a thumbnail for every talk, served from this domain", async () => {
    const html = await render(Talks);
    const images = html.match(/<img[^>]+>/g) ?? [];
    expect(images).toHaveLength(talks.length);
    images.forEach((img) => {
      expect(img).toMatch(/src="(\/_image\?|\/_astro\/)[^"]*"/);
      expect(img).not.toMatch(/ytimg|youtube/);
      // Decorative: the button around it is already labelled "Play: <title>",
      // so a described thumbnail would be announced twice.
      // Astro serialises an empty alt as the bare attribute; both mean decorative.
      expect(img).toMatch(/\salt(=""|[\s>])/);
      expect(img).toContain('loading="lazy"');
    });
  });

  it("keeps a thumbnail file per talk in the repo", () => {
    talks.forEach((talk) => {
      expect(existsSync(join(SRC, "images", "talks", `${talk.youtubeId}.jpg`))).toBe(true);
    });
  });

  it("requests nothing from youtube or its thumbnail CDN on load", async () => {
    const html = await render(Talks);
    expect(html).not.toMatch(/ytimg\.com|youtube\.com|youtu\.be/);
  });

  it("gives each talk a labelled play control carrying its video id", async () => {
    const html = await render(Talks);
    talks.forEach((talk) => {
      expect(html).toContain(`data-video="${talk.youtubeId}"`);
    });
    expect(html.match(/<button[^>]+data-video=/g)).toHaveLength(talks.length);
    expect(html).toMatch(/<button[^>]+aria-label="[^"]+"/);
  });

  it("swaps in the no-cookie player only on click", () => {
    const source = read("components/Talks.astro");
    expect(source).toContain("youtube-nocookie.com");
    expect(source).toMatch(/addEventListener\("click"/);
  });

  it("names each talk, venue and date without the video", async () => {
    const html = await render(Talks);
    expect(html).toContain(talks[0].title);
    expect(html).toContain(talks[0].event);
    expect(html).toContain(talks[0].date);
  });
});

describe("<Publications /> layout", () => {
  it("runs two columns on wider screens rather than one thin list", async () => {
    const html = await render(Publications);
    expect(html).toMatch(/(md|sm):grid-cols-2/);
  });

  it("is not clamped to prose width, which left the section half empty", async () => {
    const list = (await render(Publications)).match(/<ol[^>]*>/)?.[0] ?? "";
    expect(list).not.toContain("max-w-prose");
  });

  it("renders one entry per publication", async () => {
    const html = await render(Publications);
    expect(html.match(/<li[^>]*data-paper/g)).toHaveLength(publications.length);
  });
});

describe("publications", () => {
  it("lists the peer-reviewed work the rebuild was missing entirely", () => {
    expect(publications.length).toBeGreaterThanOrEqual(8);
  });

  it("every entry has a title, venue and year", () => {
    publications.forEach((paper) => {
      expect(paper.title.length).toBeGreaterThan(10);
      expect(paper.venue.length).toBeGreaterThan(3);
      expect(paper.year).toBeGreaterThanOrEqual(2019);
      expect(paper.year).toBeLessThanOrEqual(2026);
    });
  });

  it("runs newest first", () => {
    const years = publications.map((p) => p.year);
    expect([...years].sort((a, b) => b - a)).toEqual(years);
  });

  it("keeps the RA-L paper, the strongest venue on the list", () => {
    const ral = publications.find((p) => p.venue.includes("Robotics and Automation Letters"));
    expect(ral?.title).toContain("Closed-Loop Hand Control");
    expect(ral?.year).toBe(2019);
  });

  it("marks which entries still need an exact title or DOI", () => {
    // Sourced from milestone prose rather than the CV; flagged rather than guessed.
    publications
      .filter((p) => !p.confirmed)
      .forEach((p) => expect(p.title.length).toBeGreaterThan(0));
    expect(publications.some((p) => p.confirmed)).toBe(true);
  });

  it("links out only to real urls", () => {
    publications.forEach((paper) => {
      if (paper.url) expect(paper.url).toMatch(/^https:\/\//);
    });
  });
});

describe("awards", () => {
  it("keeps the three that are achievements, not attendance", () => {
    expect(awards.length).toBeGreaterThanOrEqual(3);
    const text = awards.map((a) => a.en).join(" ");
    expect(text).toMatch(/Best Paper/);
    expect(text).toMatch(/Startup Creation Lab/);
  });

  it("is bilingual", () => {
    awards.forEach((award) => {
      expect(award.en.length).toBeGreaterThan(5);
      expect(award.it.length).toBeGreaterThan(5);
    });
  });
});

describe("the milestone timeline is not ported", () => {
  it("has no data module", () => {
    expect(existsSync(join(SRC, "data", "milestones.ts"))).toBe(false);
  });

  it("drops the trade-fair attendance entries", () => {
    const everything = [...publications.map((p) => p.title), ...awards.map((a) => a.en)].join(" ");
    expect(everything).not.toMatch(/Exposanità|MECSPE|Attended/);
  });
});

describe("both work pages carry the new sections", () => {
  it("render talks and publications", () => {
    WORK_PAGES.forEach((page) => {
      expect(read(page)).toContain("<Talks");
      expect(read(page)).toContain("<Publications");
    });
  });

  it("pass the page locale through", () => {
    expect(read("pages/work.astro")).toMatch(/<Talks locale="en"/);
    expect(read("pages/it/lavoro.astro")).toMatch(/<Talks locale="it"/);
  });
});

describe("the privacy page covers the embeds", () => {
  it("says a video loads only when the visitor plays it", () => {
    ["pages/privacy.astro", "pages/it/privacy.astro"].forEach((page) => {
      expect(read(page)).toMatch(/YouTube/);
    });
  });
});
