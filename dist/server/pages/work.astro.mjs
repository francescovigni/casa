import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DHcPpfwo.mjs';
import 'piccolore';
import { $ as $$Base } from '../chunks/Base_Bwvt2ILF.mjs';
import { $ as $$ProjectStory } from '../chunks/ProjectStory_DTIfSIL1.mjs';
import { p as projects } from '../chunks/projects_Dddaukeh.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Work = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Work \u2014 Francesco Vigni, PhD", "description": "Selected engineering and research work, each told as a deployment story: context, constraints, what I did, and the outcome. Medical AI, robotics, and infrastructure." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="wrap pt-16 sm:pt-20"> <p class="kicker mb-4">Selected work</p> <h1 class="display max-w-prose text-4xl sm:text-5xl">Evidence, not slideware.</h1> <p class="lead mt-5 max-w-prose text-lg">
Each of these is a real system that had to work under real constraints — context, what
      made it hard, what I did, and what came of it.
</p> </section> <section class="wrap pb-8 pt-10"> ${projects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectStory", $$ProjectStory, { "project": project, "locale": "en" })}`)} </section> ` })}`;
}, "/Users/fra/Tech/new-home/src/pages/work.astro", void 0);

const $$file = "/Users/fra/Tech/new-home/src/pages/work.astro";
const $$url = "/work";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Work,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
