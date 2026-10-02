import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Italian guides: long answers to the questions an SME searches before hiring
// anyone. Markdown so the copy can be edited without touching components.
const guide = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/guide" }),
  schema: z.object({
    /** Page <h1>. */
    title: z.string(),
    /** <title> tag: the query the guide answers. */
    seoTitle: z.string(),
    description: z.string(),
    lede: z.string(),
    updated: z.coerce.date(),
    /** Position on the hub. */
    order: z.number(),
    /** Service page slugs this guide leads into. */
    services: z.array(z.string()).default([]),
    /** Shown above the closing call to action, e.g. "not legal advice". */
    note: z.string().optional(),
  }),
});

export const collections = { guide };
