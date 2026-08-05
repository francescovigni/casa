// Build-time: self-host the MiniLM model + ORT wasm under public/, then embed
// every qa question+alias into public/qa-embeddings.json. Idempotent; network
// only on first run (or after deleting public/models).
import {
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
  copyFileSync,
  readdirSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";

const MODEL_ID = "Xenova/all-MiniLM-L6-v2";
const MODEL_DIR = `public/models/${MODEL_ID}`;
const FILES = [
  "config.json",
  "tokenizer.json",
  "tokenizer_config.json",
  "onnx/model_quantized.onnx",
];

for (const f of FILES) {
  const dest = join(MODEL_DIR, f);
  if (existsSync(dest)) continue;
  const url = `https://huggingface.co/${MODEL_ID}/resolve/main/${f}`;
  console.log("fetch", url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

// Self-host onnxruntime-web wasm so the browser never hits a CDN.
const ortNested =
  "node_modules/@huggingface/transformers/node_modules/onnxruntime-web/dist";
const ortSrc = existsSync(ortNested) ? ortNested : "node_modules/onnxruntime-web/dist";
mkdirSync("public/ort", { recursive: true });
// Only the runtime-fetched loader pairs — the ort*.mjs API bundles ship
// inside the Vite chunk already.
for (const f of readdirSync(ortSrc).filter((f) =>
  f.startsWith("ort-wasm-simd-threaded"),
))
  copyFileSync(join(ortSrc, f), join("public/ort", f));

const { pipeline, env } = await import("@huggingface/transformers");
env.localModelPath = "public/models";
env.allowRemoteModels = false;
const extractor = await pipeline("feature-extraction", MODEL_ID, { dtype: "q8" });

const { qa } = await import("../src/data/qa.ts");
const entries = [];
for (const e of qa) {
  const texts = [e.question, ...e.aliases];
  const out = await extractor(texts, { pooling: "mean", normalize: true });
  const [n, dim] = out.dims;
  const flat = Array.from(out.data);
  entries.push({
    id: e.id,
    vectors: Array.from({ length: n }, (_, i) =>
      flat.slice(i * dim, (i + 1) * dim).map((x) => +x.toFixed(6)),
    ),
  });
}

const qaHash = createHash("sha256")
  .update(readFileSync("src/data/qa.ts"))
  .digest("hex");
writeFileSync(
  "public/qa-embeddings.json",
  JSON.stringify({ modelId: MODEL_ID, dim: 384, qaHash, entries }),
);
console.log(`embedded ${entries.length} entries`);
