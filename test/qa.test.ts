import { describe, it, expect } from "vitest";
import { qa } from "../src/data/qa";

describe("qa dataset", () => {
  it("has at least 35 entries", () => {
    expect(qa.length).toBeGreaterThanOrEqual(35);
  });

  it("ids are unique kebab-case", () => {
    const ids = qa.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it("every entry has question, >=2 aliases, non-empty answer", () => {
    qa.forEach((e) => {
      expect(e.question.length).toBeGreaterThan(5);
      expect(e.aliases.length).toBeGreaterThanOrEqual(2);
      expect(e.answer.length).toBeGreaterThan(40);
    });
  });

  it("has 4-6 chips", () => {
    const chips = qa.filter((e) => e.chip);
    expect(chips.length).toBeGreaterThanOrEqual(4);
    expect(chips.length).toBeLessThanOrEqual(6);
  });

  it("links are internal or known-external", () => {
    qa.flatMap((e) => e.links ?? []).forEach((l) =>
      expect(l.href).toMatch(
        /^(\/|https:\/\/(scholar\.google|www\.linkedin|github|orcid)\.)/,
      ),
    );
  });
});
