---
title: "Pasty: Ephemeral Text Sharing API"
subtitle: FastAPI clipboard service with auto-expiring text IDs
date: 2025-10-01
skills: ["FastAPI", "Python", "SQLite", "Docker", "WebDev"]
category: "Tools"
link: "https://github.com/francescovigni/pasty"
---

<a  class="btn btn-primary m-3" href="https://apps.francescovigni.com/pasty/" target="_blank" rel="noopener">open app</a>

Pasty is a simple online clipboard to move text between two Internet‑connected machines. When you save text you get a unique identifier; retrieve the text later using that ID. It’s a minimal FastAPI app with SQLite that demonstrates clean CRUD, background expiry, and a lightweight deployment story.

[Repository](https://github.com/francescovigni/pasty)

### Features

- Store Text: Submit text via web form or JSON API.
- Retrieve Text: Fetch content by unique ID.
- Expiration Handling: Entries expire after a configurable period; expired rows are deleted in a background task.
- Concurrency: Supports simultaneous submissions and ensures unique ID generation.

### Requirements

- Python 3.7+
- FastAPI
- SQLite
- python-dotenv

### Setup

Clone and enter the project:

```bash
git clone https://github.com/francescovigni/pasty.git
cd pasty
```

Create and activate a virtual environment:

```bash
python3 -m venv venv_ntrol
source venv_ntrol/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Environment variables (create `.env` in repo root):

```env
EXPIRATION_HOURS=12
DATABASE_URL=sqlite:///store.db
```

### Usage (Local Development)

Run the FastAPI app locally:

```bash
uvicorn main:app --reload --port 6001
```

Open the web UI: http://localhost:6001

### Docker

Build and run with Docker:

```bash
docker build -t pasty .
docker run -p 6001:6001 pasty
```

### Netlify

Serverless functions live under `api/`. See `netlify.toml` for configuration.

### API Endpoints

- POST `/save` — Save text, returns unique ID
- GET `/get/{id}` — Retrieve text by ID
- GET `/api/count` — Get current row count

### Testing

Run tests with coverage:

```bash
pytest --cov=.
```

### Deployment

- Docker: See `Dockerfile` and `docker-compose.yml`.
- Netlify: See `netlify.toml` for serverless deployment.
- Other: Any platform supporting FastAPI + SQLite works fine.

### Notes

- Clipboard writes in browsers require a user gesture; UI exposes explicit Copy buttons.
- Expiration runs in a background task; tune via `EXPIRATION_HOURS`.

---

MIT License — see `LICENSE.md`.
