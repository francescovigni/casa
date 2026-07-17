import { e as defineMiddleware, s as sequence } from './chunks/render-context_CUBBeGVL.mjs';
import { l as localeFromPath, a as localePairs } from './chunks/i18n_ClCD8eWO.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_BVPt_jzs.mjs';
import 'piccolore';
import './chunks/astro/server_DHcPpfwo.mjs';
import 'clsx';

const BOT_RE = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|slackbot|whatsapp|telegram|duckduckbot|googlebot|applebot|archive/i;
const onRequest$1 = defineMiddleware(async (context, next) => {
  const { request, url, cookies, redirect } = context;
  const path = url.pathname;
  if (request.method !== "GET") return next();
  if (localeFromPath(path) === "it") return next();
  const normalized = path.endsWith("/") ? path : path + "/";
  const pair = localePairs.find((p) => p.en === normalized);
  if (!pair) return next();
  if (cookies.has("lang")) return next();
  const country = request.headers.get("cf-ipcountry");
  if (country !== "IT") return next();
  const ua = request.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) return next();
  cookies.set("lang", "it", { path: "/", maxAge: 31536e3, sameSite: "lax" });
  return redirect(pair.it, 302);
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
