import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_NDlSKi_g.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Dwa56JRY.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/fra/Tech/new-home/","cacheDir":"file:///Users/fra/Tech/new-home/node_modules/.astro/","outDir":"file:///Users/fra/Tech/new-home/dist/","srcDir":"file:///Users/fra/Tech/new-home/src/","publicDir":"file:///Users/fra/Tech/new-home/public/","buildClientDir":"file:///Users/fra/Tech/new-home/dist/client/","buildServerDir":"file:///Users/fra/Tech/new-home/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"it/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CKXzLlL8.css"}],"routeData":{"route":"/it","isIndex":true,"type":"page","pattern":"^\\/it\\/?$","segments":[[{"content":"it","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/it/index.astro","pathname":"/it","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CKXzLlL8.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.B1D-nYk3.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}}],"site":"https://francescovigni.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/fra/Tech/new-home/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/fra/Tech/new-home/src/pages/it/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/it/index@_@astro":"pages/it.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DYKLWIo5.mjs","/Users/fra/Tech/new-home/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BMV0c_p4.mjs","/Users/fra/Tech/new-home/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/fra/Tech/new-home/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.C7LeLtuz.js","astro:scripts/page.js":"_astro/page.B1D-nYk3.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/fra/Tech/new-home/src/components/Header.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(\"[data-lang-set]\").forEach(t=>{t.addEventListener(\"click\",()=>{const a=t.getAttribute(\"data-lang-set\");document.cookie=`lang=${a}; path=/; max-age=31536000; samesite=lax`})});"]],"assets":["/_astro/inter-cyrillic-ext-400-normal.BQZuk6qB.woff2","/_astro/inter-greek-400-normal.B4URO6DV.woff2","/_astro/inter-greek-ext-400-normal.DGGRlc-M.woff2","/_astro/inter-cyrillic-400-normal.obahsSVq.woff2","/_astro/inter-cyrillic-ext-500-normal.B0yAr1jD.woff2","/_astro/inter-vietnamese-400-normal.DMkecbls.woff2","/_astro/inter-latin-ext-400-normal.C1nco2VV.woff2","/_astro/inter-cyrillic-500-normal.BasfLYem.woff2","/_astro/inter-greek-ext-500-normal.C4iEst2y.woff2","/_astro/inter-vietnamese-500-normal.DOriooB6.woff2","/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_astro/inter-latin-ext-500-normal.CV4jyFjo.woff2","/_astro/inter-cyrillic-ext-600-normal.Dfes3d0z.woff2","/_astro/inter-greek-500-normal.BIZE56-Y.woff2","/_astro/inter-cyrillic-600-normal.CWCymEST.woff2","/_astro/inter-latin-500-normal.Cerq10X2.woff2","/_astro/inter-greek-ext-600-normal.DRtmH8MT.woff2","/_astro/inter-greek-600-normal.plRanbMR.woff2","/_astro/inter-vietnamese-600-normal.Cc8MFFhd.woff2","/_astro/inter-latin-600-normal.LgqL8muc.woff2","/_astro/jetbrains-mono-greek-400-normal.C190GLew.woff2","/_astro/inter-latin-ext-600-normal.D2bJ5OIk.woff2","/_astro/jetbrains-mono-cyrillic-400-normal.BEIGL1Tu.woff2","/_astro/jetbrains-mono-latin-ext-400-normal.Bc8Ftmh3.woff2","/_astro/jetbrains-mono-latin-400-normal.V6pRDFza.woff2","/_astro/jetbrains-mono-cyrillic-500-normal.DmUKJPL_.woff2","/_astro/jetbrains-mono-greek-500-normal.JpySY46c.woff2","/_astro/jetbrains-mono-latin-ext-500-normal.Cut-4mMH.woff2","/_astro/newsreader-latin-ext-400-normal.svq1FPys.woff2","/_astro/newsreader-vietnamese-400-normal.DdKr49mV.woff2","/_astro/jetbrains-mono-latin-500-normal.BWZEU5yA.woff2","/_astro/newsreader-latin-ext-500-normal.BNHmvKvI.woff2","/_astro/newsreader-vietnamese-400-italic.bZegYFuM.woff2","/_astro/newsreader-vietnamese-500-normal.CL6a8tp2.woff2","/_astro/newsreader-latin-ext-400-italic.BMTE_bNQ.woff2","/_astro/newsreader-latin-500-normal.B66TYsaK.woff2","/_astro/newsreader-latin-400-normal.BFBkh4jY.woff2","/_astro/newsreader-latin-400-italic.CEihAR-f.woff2","/_astro/inter-greek-ext-400-normal.KugGGMne.woff","/_astro/inter-cyrillic-ext-400-normal.DQukG94-.woff","/_astro/inter-greek-400-normal.q2sYcFCs.woff","/_astro/inter-cyrillic-400-normal.HOLc17fK.woff","/_astro/inter-vietnamese-400-normal.Bbgyi5SW.woff","/_astro/inter-cyrillic-ext-500-normal.BmqWE9Dz.woff","/_astro/inter-latin-ext-400-normal.77YHD8bZ.woff","/_astro/inter-cyrillic-500-normal.CxZf_p3X.woff","/_astro/inter-greek-ext-500-normal.2j5mBUwD.woff","/_astro/inter-vietnamese-500-normal.mJboJaSs.woff","/_astro/inter-latin-ext-500-normal.BxGbmqWO.woff","/_astro/inter-cyrillic-ext-600-normal.Bcila6Z-.woff","/_astro/inter-greek-500-normal.Xzm54t5V.woff","/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_astro/inter-cyrillic-600-normal.4D_pXhcN.woff","/_astro/inter-latin-500-normal.BL9OpVg8.woff","/_astro/inter-vietnamese-600-normal.BuLX-rYi.woff","/_astro/inter-latin-600-normal.CiBQ2DWP.woff","/_astro/inter-greek-ext-600-normal.B8X0CLgF.woff","/_astro/inter-greek-600-normal.BZpKdvQh.woff","/_astro/jetbrains-mono-greek-400-normal.B9oWc5Lo.woff","/_astro/inter-latin-ext-600-normal.CIVaiw4L.woff","/_astro/jetbrains-mono-cyrillic-400-normal.ugxPyKxw.woff","/_astro/jetbrains-mono-latin-400-normal.6-qcROiO.woff","/_astro/jetbrains-mono-vietnamese-500-normal.DNRqzVM1.woff","/_astro/jetbrains-mono-cyrillic-500-normal.DJqRU3vO.woff","/_astro/jetbrains-mono-latin-ext-400-normal.fXTG6kC5.woff","/_astro/jetbrains-mono-vietnamese-400-normal.CqNFfHCs.woff","/_astro/newsreader-latin-ext-400-normal.DYA1XoQK.woff","/_astro/jetbrains-mono-greek-500-normal.D7SFKleX.woff","/_astro/jetbrains-mono-latin-ext-500-normal.ckzbgY84.woff","/_astro/newsreader-vietnamese-400-normal.BekUZro8.woff","/_astro/newsreader-latin-ext-500-normal.CZruMFou.woff","/_astro/newsreader-vietnamese-400-italic.QbB8kb5s.woff","/_astro/jetbrains-mono-latin-500-normal.CJOVTJB7.woff","/_astro/newsreader-vietnamese-500-normal.BEAbKU8A.woff","/_astro/newsreader-latin-500-normal.DFwuUcdu.woff","/_astro/newsreader-latin-400-italic.CNZoH1hn.woff","/_astro/newsreader-latin-400-normal.gRTjlS2D.woff","/_astro/newsreader-latin-ext-400-italic.qdgKLcPG.woff","/_astro/index.CKXzLlL8.css","/favicon.svg","/_astro/page.B1D-nYk3.js","/_astro/page.B1D-nYk3.js","/it/index.html","/index.html"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["en","it"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"eAmh3gUH/osF6FYV7iVQ/BxLtTOoAyOGJQTO1/eOpp4=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/fra/Tech/new-home/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
