# Project Guidelines

## Architecture

Gatsby 5 personal website — static pages + markdown-driven dynamic routes. Two distinct data patterns coexist:

- **Markdown + GraphQL** — blog posts (`data/blog/*.md`) and projects (`data/projects/*.md`) are sourced via `gatsby-source-filesystem`, transformed by `gatsby-transformer-remark`, and queried with `allMarkdownRemark`. Dynamic pages created in `gatsby-node.js`.
- **Inline JS objects** — publications, CV entries, and persons are defined as plain arrays directly in page files (`src/pages/publications.jsx`, `src/pages/index.jsx`). Do not attempt to source these via GraphQL.

Templates live in `src/templates/` (one per dynamic content type). Static pages live in `src/pages/`.

## Build and Dev

```bash
npm run develop   # dev server at http://localhost:8000
npm run build     # production build → ./public
npm run serve     # preview prod build at http://localhost:9000
npm run clean     # clear Gatsby cache + public/
```

Docker alternatives: `docker compose up dev` (dev) or `docker compose up production` (Nginx on port 80).

## Code Style

- **Styling**: TailwindCSS utility classes inline — no CSS modules or styled-components. Custom color palette: `primary` (blue shades). Fonts: `sans: Inter`, `mono: JetBrains Mono`.
- **Components**: PascalCase `.jsx` files. No external UI library — all components are custom-built in `src/components/`.
- **SEO**: Use the `Head` export pattern (not deprecated query approach). `<Seo>` component handles all meta/OG tags — pass props, don't add raw `<meta>` tags to pages.
- **Images**: `StaticImage` for hardcoded paths; `getImage` + `GatsbyImage` for GraphQL-sourced images (e.g., frontmatter `img` field).
- **Markdown rendering**: Use `dangerouslySetInnerHTML={{ __html: html }}` in templates for remark output. Wrap in `prose prose-gray` (Tailwind Typography) for styling.

## Conventions

- Markdown frontmatter keys are **kebab-case** (`date-start`, `date-end`, `img`).
- GraphQL queries on pages use `fileAbsolutePath: { regex: "/data/blog/" }` to scope `allMarkdownRemark` to the right content type.
- GDPR consent and Google Analytics consent state are managed in `gatsby-browser.js` — do not add GA consent logic elsewhere.
- The typewriter effect on the homepage is a custom React state machine in `src/pages/index.jsx` — not a library.
- No MDX-to-JSX pattern is used; the `gatsby-plugin-mdx` is installed but not actively leveraged.

## Key Files

| File | What it exemplifies |
|------|---------------------|
| [src/pages/index.jsx](../src/pages/index.jsx) | `useStaticQuery`, inline CV data, custom hook, `StaticImage` |
| [src/templates/blog-post.jsx](../src/templates/blog-post.jsx) | Template pattern, GraphQL page query, prose rendering, `Head` export |
| [gatsby-node.js](../gatsby-node.js) | Dynamic page creation, slug derivation for blog and projects |
| [src/components/Seo.jsx](../src/components/Seo.jsx) | Centralized SEO via `Head` export, OG tags pattern |
