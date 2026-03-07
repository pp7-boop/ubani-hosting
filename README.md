# ubani-hosting

Ubani Hosting API scaffold using Cloudflare Workers + Turso (`libsql`) for persistent data, deployment file storage, and Yoco checkout billing.

## Security improvements

- Passwords are stored as PBKDF2-SHA256 hashes (never plaintext)
- JWT authentication (HS256) protects private endpoints
- User identity is taken from JWT `sub`, not request body

## Endpoints

Public:
- `GET /`
- `GET /health`
- `GET /portal`
- `POST /api/register`
- `POST /api/login`
- `POST /webhooks/yoco`

Protected (`Authorization: Bearer <token>`):
- `POST /api/deploy`
- `POST /api/invoice`
- `POST /api/invoice/checkout`
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
- `YOCO_SECRET_KEY`
- `YOCO_WEBHOOK_SECRET`
- `PAYMENT_SUCCESS_URL`
- `PAYMENT_CANCEL_URL`

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
wrangler secret put PASSWORD_HASH_ITERATIONS
wrangler secret put YOCO_SECRET_KEY
wrangler secret put YOCO_WEBHOOK_SECRET
wrangler secret put PAYMENT_SUCCESS_URL
wrangler secret put PAYMENT_CANCEL_URL
npm run deploy
```

## Billing flow

1. Client calls `POST /api/invoice/checkout` with `amount` (in cents).
2. Worker creates invoice and Yoco checkout.
3. Worker stores payment metadata in `payments`.
4. Yoco webhook calls `POST /webhooks/yoco`.
5. Worker updates invoice/payment status (`paid`, `failed`, `pending`).

## Portal

Open:

- `https://ubani-hosting-api.ubani-hosting.workers.dev/portal`

Portal supports register/login, deploying files, creating Yoco checkout sessions, and viewing projects/invoices.
