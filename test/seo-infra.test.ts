import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import config from "../astro.config.mjs";
import { GET as robots } from "../src/pages/robots.txt";
import { SITE } from "../src/data/site";

const ROOT = join(import.meta.dirname, "..");
const gitignore = readFileSync(join(ROOT, ".gitignore"), "utf8");

describe("sitemap", () => {
  it("is generated, as it was on the Gatsby site", () => {
    const names = (config.integrations ?? []).flat().map((i) => (i as { name: string }).name);
    expect(names).toContain("@astrojs/sitemap");
  });
});

describe("robots.txt", () => {
  const body = () => robots({ site: new URL(SITE.url) } as never).text();

  it("points crawlers at the sitemap index", async () => {
    expect(await body()).toContain(`Sitemap: ${SITE.url}/sitemap-index.xml`);
  });

  it("allows everything", async () => {
    const text = await body();
    expect(text).toContain("User-agent: *");
    expect(text).toContain("Allow: /");
    expect(text).not.toContain("Disallow: /");
  });

  it("serves as plain text", async () => {
    const response = robots({ site: new URL(SITE.url) } as never);
    expect(response.headers.get("content-type")).toMatch(/text\/plain/);
  });
});

describe("assets the site references can reach a build", () => {
  // public/* is ignored wholesale; anything the pages link to has to be
  // un-ignored or it never reaches CI or the Docker image.
  it.each(["francesco.jpg", "Francesco-Vigni-CV.pdf", "og-default.jpg"])(
    "%s is exempt from the public/ ignore rule",
    (asset) => {
      expect(gitignore).toContain(`!public/${asset}`);
    },
  );

  it("still ignores the generated model and wasm payloads", () => {
    expect(gitignore).toContain("public/*");
    expect(gitignore).not.toContain("!public/models");
    expect(gitignore).not.toContain("!public/ort");
  });
});
