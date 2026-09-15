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
    // The audit is explicit: never invent or estimate a value. Every proof
    // point here is either a number already stated in a case study, or a
    // qualitative claim about the deployment that is true as written.
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

  it("shows a proof point on every card, not just the first", async () => {
    const html = await container.renderToString(Proof, { props: { locale: "en" } });
    expect(html.match(/data-proof/g) ?? []).toHaveLength(3);
  });
});

describe("the homepage picks the three hardest numbers", () => {
  it("features the foundation model, the edge deployment and the grasp uplift", async () => {
    const html = await container.renderToString(Proof, { props: { locale: "en" } });
    ["medical-ai-consulting", "edge-ai-occupancy", "bin-picking-reliability"].forEach((slug) =>
      expect(html, slug).toContain(`#${slug}`),
    );
    expect(html).toContain("+9% grasp reliability");
  });
});

describe("case studies are anchorable", () => {
  it("gives each story an id matching its slug", async () => {
    const html = await container.renderToString(ProjectStory, {
      props: { project: projects[0], locale: "en" },
    });
    expect(html).toContain(`id="${projects[0].slug}"`);
  });

  it("offsets the anchor so the sticky header does not cover the heading", async () => {
    const html = await container.renderToString(ProjectStory, {
      props: { project: projects[0], locale: "en" },
    });
    expect(html).toContain("scroll-mt-24");
  });

  it("states the proof point next to the outcome", async () => {
    const html = await container.renderToString(ProjectStory, {
      props: { project: projects[0], locale: "en" },
    });
    expect(html).toContain("5M+ frames");
  });
});
