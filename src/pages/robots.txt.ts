import type { APIRoute } from "astro";
import { SITE } from "../data/site";

// Served from source rather than public/, which is ignored wholesale, so the
// file reaches CI and the container without a binary asset having to be added.
export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL(SITE.url)).origin;
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${origin}/sitemap-index.xml`,
    `Host: ${origin}`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
};
