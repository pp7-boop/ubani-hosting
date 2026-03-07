# ubani-hosting

Ubani Hosting API scaffold using Cloudflare Workers + Turso (`libsql`) for persistent data and deployment file storage.

## Security improvements

- Passwords are stored as PBKDF2-SHA256 hashes (never plaintext)
- JWT authentication (HS256) protects private endpoints
- User identity is taken from JWT `sub`, not request body

## Endpoints

Public:
- `POST /api/register`
- `POST /api/login`
- `GET /health`
- `GET /portal`

Protected (`Authorization: Bearer <token>`):
- `POST /api/deploy`
- `POST /api/invoice`
- `GET /api/me`
- `GET /api/projects`
- `GET /api/invoices`

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create local Worker vars:

```bash
cp .dev.vars.example .dev.vars
```

3. Set these values in `.dev.vars`:
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `JWT_SECRET`
- `PASSWORD_HASH_ITERATIONS` (default `15000`, allowed range `10000-50000`)

4. Run DB migrations against Turso:

```bash
export TURSO_DATABASE_URL="libsql://ubani-db-ubani.aws-eu-west-1.turso.io"
export TURSO_AUTH_TOKEN="<your-token>"
npm run migrate
```

5. Run Worker locally:

```bash
npm run dev
```

## Deploy

Set production secrets and deploy Worker:

```bash
wrangler secret put TURSO_DATABASE_URL
wrangler secret put TURSO_AUTH_TOKEN
wrangler secret put JWT_SECRET
npm run deploy
```

## Example auth flow

Register:

```json
{
  "email": "owner@company.co.za",
  "password": "StrongPassword123"
}
```

Login response contains `token`. Use it for protected routes:

```http
Authorization: Bearer <token>
```

## Example deploy payload (protected)

```json
{
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
