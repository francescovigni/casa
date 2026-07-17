import { defineMiddleware } from "astro:middleware";
import { localePairs, localeFromPath } from "./i18n";

// Bots/crawlers keep the English tree so both locales stay crawlable (no cloaking).
const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|slackbot|whatsapp|telegram|duckduckbot|googlebot|applebot|archive/i;

/**
 * Auto-Italian: on the first visit from an Italian IP (per Cloudflare's
 * CF-IPCountry header), redirect a paired English page to its Italian
 * counterpart. A `lang` cookie — set here or by the manual toggle — makes the
 * choice sticky and stops further redirects. Only paired routes are touched,
 * so headers are never read while prerendering unpaired/static pages.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, cookies, redirect } = context;
  const path = url.pathname;

  if (request.method !== "GET") return next();
  if (localeFromPath(path) === "it") return next(); // already Italian

  // Resolve the route pairing before touching cookies/headers, so unpaired
  // prerendered pages (e.g. 404) never read request state at build time.
  const normalized = path.endsWith("/") ? path : path + "/";
  const pair = localePairs.find((p) => p.en === normalized);
  if (!pair) return next(); // only redirect known EN pages

  if (cookies.has("lang")) return next(); // explicit choice wins

  const country = request.headers.get("cf-ipcountry");
  if (country !== "IT") return next();

  const ua = request.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) return next();

  cookies.set("lang", "it", { path: "/", maxAge: 31_536_000, sameSite: "lax" });
  return redirect(pair.it, 302);
});
