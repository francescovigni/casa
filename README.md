# Personal Website

A static personal website built with **Gatsby** and **TailwindCSS**, containerized with **Docker**.

## Pages

- **Home** — Introduction, about section, and skills overview
- **Projects** — Portfolio grid with placeholder images
- **Blog** — Blog post listings with lorem ipsum content
- **Contact** — Contact info and a form

## Local Development

### Without Docker

```bash
npm install
npm run develop    # → http://localhost:8000
```

### With Docker

```bash
# Development (hot-reload)
docker compose up dev          # → http://localhost:8000

# Production (Nginx)
docker compose up production   # → http://localhost:80
```

## Build

```bash
npm run build      # outputs to ./public
npm run serve      # preview production build at http://localhost:9000
```

## Project Structure

```
├── src/
│   ├── components/    # Layout, Header, Footer, Seo
│   ├── pages/         # index, projects, blog, contact, 404
│   ├── styles/        # global.css (Tailwind directives)
│   └── images/        # static images
├── Dockerfile         # multi-stage: dev → build → nginx
├── docker-compose.yml # dev & production services
├── nginx.conf         # production Nginx config
├── gatsby-config.js
├── tailwind.config.js
└── postcss.config.js
```
