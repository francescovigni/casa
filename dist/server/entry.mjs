import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C5etuCje.mjs';
import { manifest } from './manifest_cvmsv9FZ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/lead.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/it/contatti.astro.mjs');
const _page5 = () => import('./pages/it/lavoro.astro.mjs');
const _page6 = () => import('./pages/it/privacy.astro.mjs');
const _page7 = () => import('./pages/it.astro.mjs');
const _page8 = () => import('./pages/privacy.astro.mjs');
const _page9 = () => import('./pages/work.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/lead.ts", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/it/contatti.astro", _page4],
    ["src/pages/it/lavoro.astro", _page5],
    ["src/pages/it/privacy.astro", _page6],
    ["src/pages/it/index.astro", _page7],
    ["src/pages/privacy.astro", _page8],
    ["src/pages/work.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/fra/Tech/new-home/dist/client/",
    "server": "file:///Users/fra/Tech/new-home/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
