import { describe, it, expect } from "vitest";
import {
  bestEmbeddingMatch,
  makeFuse,
  fuseMatch,
  SIM_THRESHOLD,
  FUSE_CONFIDENT,
} from "../src/lib/retrieval";
import { qa } from "../src/data/qa";

describe("bestEmbeddingMatch", () => {
  const entries = [
    { id: "a", vectors: [[1, 0, 0], [0.9, 0.1, 0]] },
    { id: "b", vectors: [[0, 1, 0]] },
  ];

  it("picks the entry with the highest dot product", () => {
    const m = bestEmbeddingMatch([0.05, 0.99, 0], entries);
    expect(m?.id).toBe("b");
    expect(m!.score).toBeCloseTo(0.99, 2);
  });

  it("scans all vectors per entry", () => {
    const m = bestEmbeddingMatch([0.9, 0.12, 0], entries);
    expect(m?.id).toBe("a");
  });

  it("returns null on empty entries", () => {
    expect(bestEmbeddingMatch([1, 0, 0], [])).toBeNull();
  });
});

describe("fuse over real dataset", () => {
  const fuse = makeFuse(qa);

  it("near-verbatim question matches confidently", () => {
    const m = fuseMatch(fuse, "what is your healthcare ai work", FUSE_CONFIDENT);
    expect(m?.id).toBe("healthcare-ai");
  });

  it("gibberish does not match confidently", () => {
    expect(
      fuseMatch(fuse, "purple elephant quantum sandwich", FUSE_CONFIDENT),
    ).toBeNull();
  });
});

it("thresholds are sane", () => {
  expect(SIM_THRESHOLD).toBeGreaterThan(0.4);
  expect(SIM_THRESHOLD).toBeLessThan(0.8);
});
