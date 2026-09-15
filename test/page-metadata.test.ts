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

  it("every page that renders Base has a description", () => {
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

  it("link to the case study the method came out of, where there is one", () => {
    expect(read("pages/research/endoscopy-standardization.astro")).toContain(
      "/work/#medical-ai-consulting",
    );
  });

  it("the research index routes to contact too", () => {
    expect(read("pages/research/index.astro")).toContain('href="/contact/"');
  });
});
