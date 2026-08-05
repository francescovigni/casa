// Pure retrieval logic for the /ask page. Kept framework-free so it unit-tests
// in Node and bundles into the browser island unchanged.
import Fuse from "fuse.js";
import type { QAEntry } from "../data/qa";

export const SIM_THRESHOLD = 0.6;
export const FUSE_CONFIDENT = 0.25;
export const FUSE_WEAK = 0.45;

export function bestEmbeddingMatch(
  query: number[],
  entries: { id: string; vectors: number[][] }[],
): { id: string; score: number } | null {
  let best: { id: string; score: number } | null = null;
  for (const e of entries) {
    for (const v of e.vectors) {
      let dot = 0;
      for (let i = 0; i < v.length; i++) dot += v[i] * query[i];
      if (!best || dot > best.score) best = { id: e.id, score: dot };
    }
  }
  return best;
}

export function makeFuse(entries: QAEntry[]): Fuse<QAEntry> {
  return new Fuse(entries, {
    keys: ["question", "aliases"],
    includeScore: true,
    ignoreLocation: true,
    threshold: 0.6,
  });
}

export function fuseMatch(
  fuse: Fuse<QAEntry>,
  query: string,
  maxScore: number,
): { id: string; score: number } | null {
  const hit = fuse.search(query)[0];
  if (!hit || hit.score === undefined || hit.score > maxScore) return null;
  return { id: hit.item.id, score: hit.score };
}
