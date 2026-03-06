# ubani-hosting

Ubani Hosting API scaffold using Cloudflare Workers + Turso (`libsql`) for persistent data and deployment file storage.

## What changed

R2 storage was replaced with Turso-backed SQL storage:
- Old pattern: `env.SITES.put(...)` to an R2 bucket
- New pattern: files are inserted into `site_files` in Turso via `@libsql/client/web`

## Endpoints

- `POST /api/register`
- `POST /api/login`
- `POST /api/deploy`
- `POST /api/invoice`
- `GET /health`

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create local Worker vars:

```bash
cp .dev.vars.example .dev.vars
```

3. Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in `.dev.vars`.

4. Apply schema from `database/schema.sql` to your Turso database.

5. Run locally:

```bash
npm run dev
```

## Deploy

Set production secrets and deploy Worker:

```bash
wrangler secret put TURSO_DATABASE_URL
wrangler secret put TURSO_AUTH_TOKEN
npm run deploy
```

## Example deploy payload

```json
{
  "userId": "user_123",
  "domain": "example.co.za",
  "files": [
    {
      "name": "index.html",
      "contentType": "text/html",
      "content": "<h1>Hello Ubani</h1>"
    }
  ]
}
```
