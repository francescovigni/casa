import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { qa } from "../src/data/qa";

const data = JSON.parse(readFileSync("public/qa-embeddings.json", "utf8"));

describe("qa-embeddings.json", () => {
  it("is in sync with qa.ts (regenerate with `npm run embed`)", () => {
    const hash = createHash("sha256")
      .update(readFileSync("src/data/qa.ts"))
      .digest("hex");
    expect(data.qaHash).toBe(hash);
  });

  it("covers every qa id with 384-dim normalized vectors", () => {
    const ids = new Set(data.entries.map((e: { id: string }) => e.id));
    qa.forEach((e) => expect(ids.has(e.id)).toBe(true));
    for (const e of data.entries)
      for (const v of e.vectors) {
        expect(v.length).toBe(384);
        const norm = Math.hypot(...v);
        expect(norm).toBeGreaterThan(0.99);
        expect(norm).toBeLessThan(1.01);
      }
  });
});
