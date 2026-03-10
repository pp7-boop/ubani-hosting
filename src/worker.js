import { getTursoClient } from "./lib/turso.js";
import { getAuthUserId, hashPassword, signJwt, verifyPassword } from "./lib/auth.js";
import { renderDesignerLanding, renderFrontend } from "./frontend.js";

const DEFAULT_PASSWORD_HASH_ITERATIONS = 15000;
const MIN_PASSWORD_HASH_ITERATIONS = 10000;
const MAX_PASSWORD_HASH_ITERATIONS = 50000;
const RATE_LIMIT_BUCKETS = new Map();
const BLOCKED_CRAWLER_SIGNATURES = [
  "gptbot",
  "chatgpt-user",
  "oai-searchbot",
  "claudebot",
  "anthropic-ai",
  "perplexitybot",
  "bytespider",
  "cohere-ai",
  "ccbot"
];
const SECURITY_HEADERS = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "geolocation=(), camera=(), microphone=()",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload"
};

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...SECURITY_HEADERS,
      ...(init.headers || {})
    }
  });
}

function buildCsp() {
  return [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    "img-src 'self' https: data:",
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
    "connect-src 'self' https://api.ubanihosting.co.za https://ubanihosting.co.za https://www.ubanihosting.co.za http://localhost:8787 https://localhost:8787 http://127.0.0.1:8787 https://cloudflareinsights.com https://*.cloudflareinsights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join("; ");
}

function html(content, init = {}) {
  return new Response(content, {
    ...init,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=120",
      ...SECURITY_HEADERS,
      "content-security-policy": buildCsp(),
      ...(init.headers || {})
    }
  });
}

function text(content, init = {}) {
  return new Response(content, {
    ...init,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      ...SECURITY_HEADERS,
      ...(init.headers || {})
    }
  });
}

function headFromResponse(response) {
  return new Response(null, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

function bytesFromBase64(base64) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

function base64FromBytes(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

async function hmacSha256Base64(keyBytes, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return base64FromBytes(new Uint8Array(signature));
}

async function parseJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request) {
  const fromCf = request.headers.get("cf-connecting-ip");
  if (fromCf) return fromCf.trim();
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function consumeRateLimit(key, limit, windowMs) {
  const now = Date.now();
  const existing = RATE_LIMIT_BUCKETS.get(key);
  if (!existing || now >= existing.resetAt) {
    RATE_LIMIT_BUCKETS.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }
  existing.count += 1;
  if (existing.count <= limit) {
    return {
      allowed: true,
      remaining: Math.max(limit - existing.count, 0),
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000)
    };
  }
  return {
    allowed: false,
    remaining: 0,
    retryAfterSeconds: Math.max(Math.ceil((existing.resetAt - now) / 1000), 1)
  };
}

function isBlockedCrawlerRequest(request, env) {
  if (String(env.ALLOW_AI_CRAWLERS || "").toLowerCase() === "true") return false;
  const ua = String(request.headers.get("user-agent") || "").toLowerCase();
  if (!ua) return false;
  return BLOCKED_CRAWLER_SIGNATURES.some((signature) => ua.includes(signature));
}

function isFrontendPath(pathname) {
  return (
    pathname === "/" ||
    pathname === "/pricing" ||
    pathname === "/hosting" ||
    pathname === "/contact" ||
    pathname === "/portal" ||
    pathname.startsWith("/portal/") ||
    pathname.startsWith("/admin/")
  );
}

function getRobotsTxt() {
  return [
    "User-agent: GPTBot",
    "Disallow: /",
    "",
    "User-agent: ChatGPT-User",
    "Disallow: /",
    "",
    "User-agent: OAI-SearchBot",
    "Disallow: /",
    "",
    "User-agent: ClaudeBot",
    "Disallow: /",
    "",
    "User-agent: PerplexityBot",
    "Disallow: /",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /admin/",
    "Disallow: /portal/"
  ].join("\n");
}

async function serveStaticAsset(request, env) {
  if (!env.ASSETS || typeof env.ASSETS.fetch !== "function") {
    return text("Asset binding unavailable", { status: 503, headers: { "cache-control": "no-store" } });
  }

  const response = await env.ASSETS.fetch(request);
  if (!response || response.status === 404) {
    return text("Not Found", { status: 404, headers: { "cache-control": "public, max-age=60" } });
  }

  const headers = new Headers(response.headers);
  headers.set("cache-control", "public, max-age=604800, immutable");
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

async function register(request, env) {
  const body = await parseJson(request);
  if (!isValidEmail(body?.email) || typeof body?.password !== "string" || body.password.length < 8) {
    return corsJson({ error: "Valid email and password (min 8 chars) are required" }, { status: 400 });
  }

  const db = getTursoClient(env);
  const id = crypto.randomUUID();
  const name = String(body?.name || "").trim().slice(0, 120);
  const configuredIterations = Number(env.PASSWORD_HASH_ITERATIONS || DEFAULT_PASSWORD_HASH_ITERATIONS);
  const iterations = Number.isInteger(configuredIterations)
    ? Math.min(Math.max(configuredIterations, MIN_PASSWORD_HASH_ITERATIONS), MAX_PASSWORD_HASH_ITERATIONS)
    : DEFAULT_PASSWORD_HASH_ITERATIONS;
  const passwordHash = await hashPassword(body.password, iterations);

  try {
    await db.execute({
      sql: `INSERT INTO users(id, email, password, name, plan, credit, created_at)
            VALUES (?, ?, ?, ?, 'free', 0, CURRENT_TIMESTAMP)`,
      args: [id, body.email.toLowerCase(), passwordHash, name]
    });
  } catch (error) {
    if (String(error.message || "").toLowerCase().includes("unique")) {
      return corsJson({ error: "Email already registered" }, { status: 409 });
    }
    throw error;
  }

  const token = await signJwt({ sub: id, email: body.email.toLowerCase() }, env);
  return corsJson({ user: { id, email: body.email.toLowerCase(), name, plan: "free" }, token }, { status: 201 });
}

async function updateProfile(request, env, userId) {
  const body = await parseJson(request);
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 120) : null;
  if (!name) return corsJson({ error: "name is required" }, { status: 400 });

  const db = getTursoClient(env);
  await db.execute({
    sql: "UPDATE users SET name = ? WHERE id = ?",
    args: [name, userId]
  });
  return corsJson({ ok: true, name });
}

async function login(request, env) {
  const body = await parseJson(request);
  if (!isValidEmail(body?.email) || typeof body?.password !== "string") {
    return corsJson({ error: "email and password are required" }, { status: 400 });
  }

  const db = getTursoClient(env);
  const result = await db.execute({
    sql: "SELECT id, email, password, name, plan, credit FROM users WHERE email = ? LIMIT 1",
    args: [body.email.toLowerCase()]
  });

  if (!result.rows.length) {
    return corsJson({ error: "Invalid credentials" }, { status: 401 });
  }

  const user = result.rows[0];
  const ok = await verifyPassword(body.password, String(user.password));
  if (!ok) {
    return corsJson({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signJwt({ sub: String(user.id), email: String(user.email) }, env);
  return corsJson({ user: { id: user.id, email: user.email, name: user.name, plan: user.plan, credit: user.credit }, token });
}



async function invoice(request, env, userId) {
  const body = await parseJson(request);
  if (typeof body?.amount !== "number") {
    return corsJson({ error: "numeric amount is required" }, { status: 400 });
  }

  const db = getTursoClient(env);
  const id = crypto.randomUUID();

  await db.execute({
    sql: `INSERT INTO invoices(id, user_id, amount, status)
          VALUES (?, ?, ?, ?)`,
    args: [id, userId, body.amount, "pending"]
  });

  return corsJson({ id, status: "pending" }, { status: 201 });
}

function getYocoSecret(env) {
  const key = env.YOCO_SECRET_KEY || env.YOCO_SECRET;
  if (!key) throw new Error("Missing YOCO_SECRET_KEY");
  return key;
}

function getCanonicalApiOrigin(request, env) {
  const configured = (env.PUBLIC_API_BASE_URL || env.API_BASE_URL || "").trim();
  if (!configured) return new URL(request.url).origin;

  try {
    return new URL(configured).origin;
  } catch {
    throw new Error("PUBLIC_API_BASE_URL must be a valid absolute URL");
  }
}

async function createYocoCheckout(amount, invoiceId, request, env) {
  const secret = getYocoSecret(env);
  const origin = getCanonicalApiOrigin(request, env);
  const successUrl = env.PAYMENT_SUCCESS_URL || `${origin}/portal`;
  const cancelUrl = env.PAYMENT_CANCEL_URL || `${origin}/portal`;

  const response = await fetch("https://payments.yoco.com/api/checkouts", {
    method: "POST",
    headers: {
      authorization: `Bearer ${secret}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      amount,
      currency: "ZAR",
      successUrl,
      cancelUrl,
      metadata: {
        invoiceId
      }
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof data?.message === "string" ? data.message : `Yoco checkout failed (${response.status})`;
    throw new Error(message);
  }

  return {
    checkoutId: data?.id || data?.checkoutId || crypto.randomUUID(),
    checkoutUrl: data?.redirectUrl || data?.url || data?.checkoutUrl || null,
    raw: data
  };
}

async function createInvoiceCheckout(request, env, userId) {
  const body = await parseJson(request);
  if (!Number.isInteger(body?.amount) || body.amount <= 0) {
    return corsJson({ error: "amount must be a positive integer in cents" }, { status: 400 });
  }

  const db = getTursoClient(env);
  const invoiceId = crypto.randomUUID();

  await db.execute({
    sql: `INSERT INTO invoices(id, user_id, amount, status)
          VALUES (?, ?, ?, ?)`,
    args: [invoiceId, userId, body.amount, "pending"]
  });

  const checkout = await createYocoCheckout(body.amount, invoiceId, request, env);

  await db.execute({
    sql: `INSERT INTO payments(
            id, invoice_id, user_id, provider, status, checkout_id, checkout_url, provider_reference, payload, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    args: [
      crypto.randomUUID(),
      invoiceId,
      userId,
      "yoco",
      "pending",
      checkout.checkoutId,
      checkout.checkoutUrl,
      null,
      JSON.stringify(checkout.raw)
    ]
  });

  return corsJson({
    invoiceId,
    amount: body.amount,
    status: "pending",
    checkoutUrl: checkout.checkoutUrl
  }, { status: 201 });
}

async function me(env, userId) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: "SELECT id, email, name, plan, credit, created_at FROM users WHERE id = ? LIMIT 1",
    args: [userId]
  });

  if (!result.rows.length) return corsJson({ error: "User not found" }, { status: 404 });
  return corsJson({ user: result.rows[0] });
}

async function listProjects(env, userId) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, domain, status, description, storage, cf_pages_url, cf_deployment_id, created_at
          FROM projects
          WHERE user_id = ?
          ORDER BY created_at DESC
          LIMIT 100`,
    args: [userId]
  });
  return corsJson({ projects: result.rows });
}

async function getProject(request, env, userId) {
  const projectId = new URL(request.url).pathname.split("/")[3];
  const db = getTursoClient(env);
  const [projResult, filesResult, deploysResult] = await Promise.all([
    db.execute({
      sql: `SELECT id, domain, status, description, storage, cf_pages_url, cf_pages_project, cf_deployment_id, created_at
            FROM projects WHERE id = ? AND user_id = ? LIMIT 1`,
      args: [projectId, userId]
    }),
    db.execute({
      sql: `SELECT id, filename, content_type, size_bytes, r2_key, uploaded_at
            FROM r2_files WHERE project_id = ? ORDER BY uploaded_at DESC LIMIT 50`,
      args: [projectId]
    }),
    db.execute({
      sql: `SELECT id, status, pages_url, triggered_at, completed_at, error_message
            FROM deployments WHERE project_id = ? ORDER BY triggered_at DESC LIMIT 10`,
      args: [projectId]
    })
  ]);
  if (!projResult.rows.length) return corsJson({ error: "Project not found" }, { status: 404 });
  return corsJson({
    project: projResult.rows[0],
    files: filesResult.rows,
    deployments: deploysResult.rows
  });
}

async function updateProject(request, env, userId) {
  const projectId = new URL(request.url).pathname.split("/")[3];
  const body = await parseJson(request);
  const db = getTursoClient(env);

  // Verify ownership
  const check = await db.execute({
    sql: "SELECT id FROM projects WHERE id = ? AND user_id = ? LIMIT 1",
    args: [projectId, userId]
  });
  if (!check.rows.length) return corsJson({ error: "Project not found" }, { status: 404 });

  const updates = [];
  const args = [];
  if (typeof body?.description === "string") { updates.push("description = ?"); args.push(body.description.slice(0, 500)); }
  if (typeof body?.domain === "string" && body.domain.trim()) { updates.push("domain = ?"); args.push(body.domain.trim()); }
  const allowedStatuses = ["draft", "live", "paused"];
  if (body?.status && allowedStatuses.includes(body.status)) { updates.push("status = ?"); args.push(body.status); }

  if (!updates.length) return corsJson({ error: "No valid fields to update" }, { status: 400 });
  args.push(projectId);

  await db.execute({ sql: `UPDATE projects SET ${updates.join(", ")} WHERE id = ?`, args });
  return corsJson({ ok: true });
}

// ── Phase 3: Project create (new) ─────────────────────────────
async function createProject(request, env, userId) {
  const body = await parseJson(request);
  const domain = String(body?.domain || "").trim();
  if (!domain) return corsJson({ error: "domain is required" }, { status: 400 });
  const db = getTursoClient(env);
  const projectId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO projects(id, user_id, domain, status, description, storage)
          VALUES (?, ?, ?, 'draft', ?, 0)`,
    args: [projectId, userId, domain, String(body?.description || "")]
  });
  return corsJson({ project: { id: projectId, domain, status: "draft" } }, { status: 201 });
}

// ── R2 File Upload ────────────────────────────────────────────
async function uploadFile(request, env, userId) {
  const projectId = new URL(request.url).pathname.split("/")[3];
  const db = getTursoClient(env);
  const projCheck = await db.execute({
    sql: "SELECT id FROM projects WHERE id = ? AND user_id = ? LIMIT 1",
    args: [projectId, userId]
  });
  if (!projCheck.rows.length) return corsJson({ error: "Project not found" }, { status: 404 });

  if (!env.FILES_BUCKET) {
    return corsJson({ error: "R2 bucket not configured — add FILES_BUCKET binding to wrangler.toml" }, { status: 503 });
  }

  const contentType  = request.headers.get("content-type") || "application/octet-stream";
  const filename     = decodeURIComponent(request.headers.get("x-filename") || `file-${Date.now()}`);
  const safeFilename = filename.replace(/[^a-zA-Z0-9._\-]/g, "_").slice(0, 200);
  const r2Key        = `projects/${projectId}/${safeFilename}`;

  const bodyBytes = await request.arrayBuffer();
  if (!bodyBytes.byteLength) return corsJson({ error: "Empty file body" }, { status: 400 });
  if (bodyBytes.byteLength > 25 * 1024 * 1024) return corsJson({ error: "File too large (25MB max)" }, { status: 413 });

  await env.FILES_BUCKET.put(r2Key, bodyBytes, {
    httpMetadata: { contentType },
    customMetadata: { projectId, userId, originalFilename: filename }
  });

  const fileId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT OR REPLACE INTO r2_files(id, project_id, user_id, r2_key, filename, content_type, size_bytes, uploaded_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    args: [fileId, projectId, userId, r2Key, safeFilename, contentType, bodyBytes.byteLength]
  });

  await db.execute({
    sql: `UPDATE projects
          SET storage = (SELECT COALESCE(SUM(size_bytes),0) FROM r2_files WHERE project_id = ?)
          WHERE id = ?`,
    args: [projectId, projectId]
  });

  return corsJson({ ok: true, fileId, r2Key, filename: safeFilename, size: bodyBytes.byteLength }, { status: 201 });
}

async function deleteFile(request, env, userId) {
  const parts     = new URL(request.url).pathname.split("/");
  const projectId = parts[3];
  const fileId    = parts[5];
  const db = getTursoClient(env);
  const fileResult = await db.execute({
    sql: "SELECT r2_key FROM r2_files WHERE id = ? AND project_id = ? AND user_id = ? LIMIT 1",
    args: [fileId, projectId, userId]
  });
  if (!fileResult.rows.length) return corsJson({ error: "File not found" }, { status: 404 });
  const r2Key = String(fileResult.rows[0].r2_key);
  if (env.FILES_BUCKET) await env.FILES_BUCKET.delete(r2Key);
  await db.execute({ sql: "DELETE FROM r2_files WHERE id = ?", args: [fileId] });
  await db.execute({
    sql: `UPDATE projects SET storage = (SELECT COALESCE(SUM(size_bytes),0) FROM r2_files WHERE project_id = ?) WHERE id = ?`,
    args: [projectId, projectId]
  });
  return corsJson({ ok: true });
}

async function serveProjectFile(request, env) {
  const parts     = new URL(request.url).pathname.split("/").filter(Boolean);
  const projectId = parts[1];
  const filePath  = parts.slice(2).join("/");
  const r2Key     = `projects/${projectId}/${filePath}`;
  if (!env.FILES_BUCKET) return new Response("File storage unavailable", { status: 503 });
  const obj = await env.FILES_BUCKET.get(r2Key);
  if (!obj) return new Response("Not Found", { status: 404 });
  const headers = new Headers();
  headers.set("content-type", obj.httpMetadata?.contentType || "application/octet-stream");
  headers.set("cache-control", "public, max-age=3600");
  return new Response(obj.body, { headers });
}

// ── Cloudflare Pages Deployment ───────────────────────────────
async function deployToPages(request, env, userId) {
  const projectId = new URL(request.url).pathname.split("/")[3];
  const db = getTursoClient(env);

  const projResult = await db.execute({
    sql: "SELECT id, domain, cf_pages_project FROM projects WHERE id = ? AND user_id = ? LIMIT 1",
    args: [projectId, userId]
  });
  if (!projResult.rows.length) return corsJson({ error: "Project not found" }, { status: 404 });
  const project = projResult.rows[0];

  // Immediately mark as building
  await db.execute({ sql: "UPDATE projects SET status = 'building' WHERE id = ?", args: [projectId] });

  const cfAccountId = env.CF_ACCOUNT_ID;
  const cfApiToken  = env.CF_API_TOKEN;

  if (!cfAccountId || !cfApiToken) {
    await db.execute({ sql: "UPDATE projects SET status = 'live' WHERE id = ?", args: [projectId] });
    const deployId = crypto.randomUUID();
    await db.execute({
      sql: `INSERT INTO deployments(id, project_id, user_id, status, triggered_at, completed_at)
            VALUES (?, ?, ?, 'live', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      args: [deployId, projectId, userId]
    });
    return corsJson({
      ok: true, deployId, status: "live",
      note: "CF_ACCOUNT_ID / CF_API_TOKEN not set. Project marked live without real Pages deployment. Add credentials to wrangler secrets to enable full deployment."
    });
  }

  const filesResult = await db.execute({
    sql: "SELECT r2_key, filename, content_type FROM r2_files WHERE project_id = ? LIMIT 100",
    args: [projectId]
  });

  const domain           = String(project.domain || "project").replace(/[^a-z0-9]/gi, "-").toLowerCase().slice(0, 55);
  const pagesProjectName = String(project.cf_pages_project || `ubani-${domain}-${projectId.slice(0, 8)}`);

  // Ensure Pages project exists
  const checkRes = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/pages/projects/${pagesProjectName}`,
    { headers: { authorization: `Bearer ${cfApiToken}` } }
  );
  if (!checkRes.ok) {
    const createRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/pages/projects`,
      {
        method: "POST",
        headers: { authorization: `Bearer ${cfApiToken}`, "content-type": "application/json" },
        body: JSON.stringify({ name: pagesProjectName, production_branch: "main" })
      }
    );
    if (!createRes.ok) {
      const errData = await createRes.json().catch(() => ({}));
      const msg = errData?.errors?.[0]?.message || `CF Pages create failed (${createRes.status})`;
      await db.execute({ sql: "UPDATE projects SET status = 'draft' WHERE id = ?", args: [projectId] });
      return corsJson({ error: msg }, { status: 502 });
    }
  }

  // Build multipart upload
  const formData = new FormData();
  let fileCount = 0;

  for (const file of filesResult.rows) {
    try {
      const obj = await env.FILES_BUCKET.get(String(file.r2_key));
      if (obj) {
        const bytes = await obj.arrayBuffer();
        formData.append("file", new Blob([bytes], { type: String(file.content_type) }), String(file.filename));
        fileCount++;
      }
    } catch { /* skip */ }
  }

  if (fileCount === 0) {
    const html = `<!doctype html><html><head><meta charset="utf-8"/><title>${domain}</title><style>body{font-family:system-ui;background:#0a0c10;color:#e6edf3;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}h1{font-size:2rem}</style></head><body><h1>${domain}</h1><p>Deployed via Ubani Hosting.</p></body></html>`;
    formData.append("file", new Blob([html], { type: "text/html" }), "index.html");
  }

  const deployRes = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/pages/projects/${pagesProjectName}/deployments`,
    { method: "POST", headers: { authorization: `Bearer ${cfApiToken}` }, body: formData }
  );

  const deployData = await deployRes.json().catch(() => ({}));

  if (!deployRes.ok) {
    const msg = deployData?.errors?.[0]?.message || `Deployment failed (${deployRes.status})`;
    await db.execute({ sql: "UPDATE projects SET status = 'draft' WHERE id = ?", args: [projectId] });
    const deployId = crypto.randomUUID();
    await db.execute({
      sql: `INSERT INTO deployments(id, project_id, user_id, status, error_message, triggered_at, completed_at)
            VALUES (?, ?, ?, 'failed', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      args: [deployId, projectId, userId, msg]
    });
    return corsJson({ error: msg }, { status: 502 });
  }

  const cfDeployId = String(deployData?.result?.id || "");
  const pagesUrl   = String(deployData?.result?.url || `https://${pagesProjectName}.pages.dev`);

  await db.execute({
    sql: "UPDATE projects SET status = 'live', cf_pages_project = ?, cf_pages_url = ?, cf_deployment_id = ? WHERE id = ?",
    args: [pagesProjectName, pagesUrl, cfDeployId, projectId]
  });

  const deployId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO deployments(id, project_id, user_id, status, cf_deploy_id, pages_url, triggered_at, completed_at)
          VALUES (?, ?, ?, 'live', ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    args: [deployId, projectId, userId, cfDeployId, pagesUrl]
  });

  return corsJson({ ok: true, deployId, status: "live", pagesUrl, cfDeployId });
}

async function listDeployments(request, env, userId) {
  const projectId = new URL(request.url).pathname.split("/")[3];
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, status, pages_url, triggered_at, completed_at, error_message
          FROM deployments WHERE project_id = ? AND user_id = ?
          ORDER BY triggered_at DESC LIMIT 20`,
    args: [projectId, userId]
  });
  return corsJson({ deployments: result.rows });
}

// ── Admin: all projects ────────────────────────────────────────
async function adminProjects(env) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT p.id, p.domain, p.status, p.cf_pages_url, p.storage, p.created_at, u.email, u.name
          FROM projects p JOIN users u ON u.id = p.user_id
          ORDER BY p.created_at DESC LIMIT 200`
  });
  return corsJson({ projects: result.rows });
}

async function adminUpdateProjectStatus(request, env) {
  const projectId = new URL(request.url).pathname.split("/")[5];
  const body = await parseJson(request);
  const allowed = ["draft", "live", "paused", "building"];
  if (!body?.status || !allowed.includes(body.status)) {
    return corsJson({ error: `status must be one of: ${allowed.join(", ")}` }, { status: 400 });
  }
  const db = getTursoClient(env);
  await db.execute({ sql: "UPDATE projects SET status = ? WHERE id = ?", args: [body.status, projectId] });
  return corsJson({ ok: true });
}

// ── Legacy deploy (kept for backward compat) ──────────────────
async function deploy(request, env, userId) {
  const body   = await parseJson(request);
  const domain = String(body?.domain || "").trim();
  if (!domain) return corsJson({ error: "domain is required" }, { status: 400 });
  const db = getTursoClient(env);
  const projectId = crypto.randomUUID();
  await db.execute({
    sql: "INSERT INTO projects(id, user_id, domain, status, storage) VALUES (?, ?, ?, 'draft', 0)",
    args: [projectId, userId, domain]
  });
  return corsJson({ status: "draft", projectId }, { status: 201 });
}


async function listInvoices(env, userId) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, amount, status, created_at
          FROM invoices
          WHERE user_id = ?
          ORDER BY created_at DESC
          LIMIT 100`,
    args: [userId]
  });
  return corsJson({ invoices: result.rows });
}

async function createSupportTicket(request, env, userId) {
  const body = await parseJson(request);
  const subject = String(body?.subject || "").trim();
  const message = String(body?.message || "").trim();
  if (!subject) return corsJson({ error: "subject is required" }, { status: 400 });

  const db = getTursoClient(env);
  const ticketId = crypto.randomUUID();
  const messageId = crypto.randomUUID();

  await db.execute({
    sql: `INSERT INTO tickets(id, user_id, subject, message, status, created_at, updated_at)
          VALUES (?, ?, ?, ?, 'open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    args: [ticketId, userId, subject, message]
  });

  if (message) {
    await db.execute({
      sql: `INSERT INTO ticket_messages(id, ticket_id, author_id, author_role, body, created_at)
            VALUES (?, ?, ?, 'client', ?, CURRENT_TIMESTAMP)`,
      args: [messageId, ticketId, userId, message]
    });
  }

  // Notify admin of new ticket
  const userResult = await db.execute({
    sql: "SELECT email, name FROM users WHERE id = ? LIMIT 1",
    args: [userId]
  });
  const userEmail = String(userResult.rows[0]?.email || "");
  const userName  = String(userResult.rows[0]?.name || userEmail);

  await sendEmail(env, {
    to: env.ADMIN_EMAIL || "admin@ubanihosting.co.za",
    subject: `[New Ticket] ${subject}`,
    html: emailLayout({
      heading: "New Support Ticket",
      body: `
        <p>A client has submitted a support ticket.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:8px;color:#7d8590;font-size:13px;width:100px">Client</td><td style="padding:8px;font-size:13px">${escHtml(userName)} (${escHtml(userEmail)})</td></tr>
          <tr><td style="padding:8px;color:#7d8590;font-size:13px">Subject</td><td style="padding:8px;font-size:13px;font-weight:600">${escHtml(subject)}</td></tr>
          ${message ? `<tr><td style="padding:8px;color:#7d8590;font-size:13px;vertical-align:top">Message</td><td style="padding:8px;font-size:13px">${escHtml(message)}</td></tr>` : ""}
        </table>
        <p><a href="${env.PUBLIC_API_BASE_URL || ""}/admin/tickets" style="color:#f97316">View in admin panel →</a></p>
      `
    })
  }).catch(() => {}); // don't fail the request if email fails

  return corsJson({ ticket: { id: ticketId, subject, message, status: "open" } }, { status: 201 });
}

async function replyToTicket(request, env, userId) {
  const ticketId = new URL(request.url).pathname.split("/")[4]; // /api/support/tickets/:id/reply
  const body = await parseJson(request);
  const replyBody = String(body?.message || "").trim();
  if (!replyBody) return corsJson({ error: "message is required" }, { status: 400 });

  const db = getTursoClient(env);

  // Verify ticket belongs to user
  const ticketResult = await db.execute({
    sql: "SELECT id, subject FROM tickets WHERE id = ? AND user_id = ? LIMIT 1",
    args: [ticketId, userId]
  });
  if (!ticketResult.rows.length) return corsJson({ error: "Ticket not found" }, { status: 404 });

  const msgId = crypto.randomUUID();
  await db.execute({
    sql: `INSERT INTO ticket_messages(id, ticket_id, author_id, author_role, body, created_at)
          VALUES (?, ?, ?, 'client', ?, CURRENT_TIMESTAMP)`,
    args: [msgId, ticketId, userId, replyBody]
  });
  await db.execute({
    sql: "UPDATE tickets SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    args: [ticketId]
  });

  return corsJson({ ok: true, messageId: msgId });
}

async function getTicketThread(request, env, userId) {
  const ticketId = new URL(request.url).pathname.split("/")[4]; // /api/support/tickets/:id
  const db = getTursoClient(env);

  const ticketResult = await db.execute({
    sql: "SELECT id, subject, message, status, created_at FROM tickets WHERE id = ? AND user_id = ? LIMIT 1",
    args: [ticketId, userId]
  });
  if (!ticketResult.rows.length) return corsJson({ error: "Ticket not found" }, { status: 404 });

  const messagesResult = await db.execute({
    sql: "SELECT id, author_role, body, created_at FROM ticket_messages WHERE ticket_id = ? ORDER BY created_at ASC",
    args: [ticketId]
  });

  return corsJson({ ticket: ticketResult.rows[0], messages: messagesResult.rows });
}

async function adminReplyToTicket(request, env) {
  const ticketId = new URL(request.url).pathname.split("/")[5]; // /api/admin/tickets/:id/reply
  const body = await parseJson(request);
  const replyBody = String(body?.message || "").trim();
  if (!replyBody) return corsJson({ error: "message is required" }, { status: 400 });

  const db = getTursoClient(env);

  const ticketResult = await db.execute({
    sql: `SELECT t.id, t.subject, t.user_id, u.email, u.name
          FROM tickets t
          JOIN users u ON u.id = t.user_id
          WHERE t.id = ? LIMIT 1`,
    args: [ticketId]
  });
  if (!ticketResult.rows.length) return corsJson({ error: "Ticket not found" }, { status: 404 });

  const ticket   = ticketResult.rows[0];
  const msgId    = crypto.randomUUID();

  await db.execute({
    sql: `INSERT INTO ticket_messages(id, ticket_id, author_id, author_role, body, created_at)
          VALUES (?, ?, 'admin', 'admin', ?, CURRENT_TIMESTAMP)`,
    args: [msgId, ticketId, replyBody]
  });
  await db.execute({
    sql: "UPDATE tickets SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    args: [ticketId]
  });

  // Email the client
  const clientEmail = String(ticket.email || "");
  const clientName  = String(ticket.name || clientEmail);
  if (clientEmail) {
    const notifId = crypto.randomUUID();
    const emailResult = await sendEmail(env, {
      to: clientEmail,
      subject: `Re: ${ticket.subject} — Ubani Hosting Support`,
      html: emailLayout({
        heading: "You have a reply from support",
        body: `
          <p>Hi ${escHtml(clientName)},</p>
          <p>Our team has responded to your support ticket <strong>${escHtml(String(ticket.subject || ""))}</strong>.</p>
          <div style="background:#161b24;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:16px;margin:16px 0">
            <p style="color:#7d8590;font-size:12px;margin-bottom:8px">FROM UBANI SUPPORT</p>
            <p style="font-size:14px;line-height:1.6">${escHtml(replyBody)}</p>
          </div>
          <p><a href="${env.PUBLIC_API_BASE_URL || ""}/portal/support" style="color:#f97316">View your ticket →</a></p>
        `
      })
    }).catch(err => ({ error: err.message }));

    await db.execute({
      sql: `INSERT INTO notifications(id, user_id, type, subject, status, error, sent_at)
            VALUES (?, ?, 'ticket_reply', ?, ?, ?, CURRENT_TIMESTAMP)`,
      args: [notifId, String(ticket.user_id), `Re: ${ticket.subject}`, emailResult?.error ? "failed" : "sent", emailResult?.error || null]
    });
  }

  return corsJson({ ok: true, messageId: msgId });
}

async function adminGetTicketThread(request, env) {
  const ticketId = new URL(request.url).pathname.split("/")[5]; // /api/admin/tickets/:id
  const db = getTursoClient(env);

  const ticketResult = await db.execute({
    sql: `SELECT t.id, t.subject, t.message, t.status, t.created_at, u.email, u.name
          FROM tickets t JOIN users u ON u.id = t.user_id
          WHERE t.id = ? LIMIT 1`,
    args: [ticketId]
  });
  if (!ticketResult.rows.length) return corsJson({ error: "Ticket not found" }, { status: 404 });

  const messagesResult = await db.execute({
    sql: "SELECT id, author_role, body, created_at FROM ticket_messages WHERE ticket_id = ? ORDER BY created_at ASC",
    args: [ticketId]
  });

  return corsJson({ ticket: ticketResult.rows[0], messages: messagesResult.rows });
}

async function adminCloseTicket(request, env) {
  const ticketId = new URL(request.url).pathname.split("/")[5]; // /api/admin/tickets/:id/close
  const db = getTursoClient(env);
  await db.execute({
    sql: "UPDATE tickets SET status = 'closed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    args: [ticketId]
  });
  return corsJson({ ok: true });
}

async function listSupportTickets(env, userId) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, subject, status, created_at, updated_at
          FROM tickets
          WHERE user_id = ?
          ORDER BY updated_at DESC
          LIMIT 100`,
    args: [userId]
  });
  return corsJson({ tickets: result.rows });
}

function requireAdmin(request, env) {
  const configured = String(env.ADMIN_API_KEY || "").trim();
  if (!configured) return corsJson({ error: "ADMIN_API_KEY is not configured" }, { status: 503 });

  const provided = String(request.headers.get("x-admin-key") || "").trim();
  if (!provided || !constantTimeEqual(configured, provided)) {
    return corsJson({ error: "Unauthorized admin request" }, { status: 401 });
  }
  return null;
}

async function adminSummary(env) {
  const db = getTursoClient(env);
  const [users, projects, invoices, paidRevenue] = await Promise.all([
    db.execute({ sql: "SELECT COUNT(*) AS count FROM users" }),
    db.execute({ sql: "SELECT COUNT(*) AS count FROM projects" }),
    db.execute({ sql: "SELECT COUNT(*) AS count FROM invoices" }),
    db.execute({ sql: "SELECT COALESCE(SUM(amount), 0) AS cents FROM invoices WHERE status = 'paid'" })
  ]);
  return corsJson({
    users: Number(users.rows[0]?.count || 0),
    projects: Number(projects.rows[0]?.count || 0),
    invoices: Number(invoices.rows[0]?.count || 0),
    paidRevenueCents: Number(paidRevenue.rows[0]?.cents || 0)
  });
}

async function adminUsers(env) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, email, credit, created_at
          FROM users
          ORDER BY created_at DESC
          LIMIT 200`
  });
  return corsJson({ users: result.rows });
}

async function adminRevenue(env) {
  const db = getTursoClient(env);
  const [byStatus, latestPaid] = await Promise.all([
    db.execute({
      sql: `SELECT status, COUNT(*) AS count, COALESCE(SUM(amount), 0) AS cents
            FROM invoices
            GROUP BY status
            ORDER BY status ASC`
    }),
    db.execute({
      sql: `SELECT id, user_id, amount, status, created_at
            FROM invoices
            WHERE status = 'paid'
            ORDER BY created_at DESC
            LIMIT 100`
    })
  ]);
  return corsJson({ totals: byStatus.rows, latestPaid: latestPaid.rows });
}

async function adminTickets(env) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, user_id, subject, status, created_at
          FROM tickets
          ORDER BY created_at DESC
          LIMIT 200`
  });
  return corsJson({ tickets: result.rows });
}

function normalizePaymentStatus(value) {
  const status = String(value || "").toLowerCase();
  if (status === "successful" || status === "paid" || status === "completed") return "paid";
  if (status === "failed" || status === "cancelled" || status === "canceled") return "failed";
  return "pending";
}

async function verifyYocoWebhookSignature(request, rawBody, webhookSecret) {
  const webhookId = request.headers.get("webhook-id") || "";
  const webhookTimestamp = request.headers.get("webhook-timestamp") || "";
  const webhookSignature = request.headers.get("webhook-signature") || "";

  if (!webhookId || !webhookTimestamp || !webhookSignature) return false;

  const timestampSeconds = Number(webhookTimestamp);
  if (!Number.isFinite(timestampSeconds)) return false;

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - timestampSeconds) > 180) return false;

  const [prefix, ...parts] = webhookSecret.split("_");
  if (!prefix || parts.length === 0) return false;

  let secretBytes;
  try {
    secretBytes = bytesFromBase64(parts.join("_"));
  } catch {
    return false;
  }

  const signedContent = `${webhookId}.${webhookTimestamp}.${rawBody}`;
  const expectedSignature = await hmacSha256Base64(secretBytes, signedContent);

  const signatures = webhookSignature
    .split(/\s+/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const idx = entry.indexOf(",");
      if (idx === -1) return null;
      return { version: entry.slice(0, idx), signature: entry.slice(idx + 1) };
    })
    .filter(Boolean);

  return signatures.some((entry) => entry.version === "v1" && constantTimeEqual(entry.signature, expectedSignature));
}

async function yocoWebhook(request, env, rawBody) {
  const webhookSecret = env.YOCO_WEBHOOK_SECRET || "";
  if (webhookSecret) {
    const verified = await verifyYocoWebhookSignature(request, rawBody, webhookSecret);
    if (!verified) return corsJson({ error: "Invalid Yoco webhook signature" }, { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return corsJson({ error: "Invalid JSON body" }, { status: 400 });
  }

  const invoiceId =
    payload?.metadata?.invoiceId ||
    payload?.invoiceId ||
    payload?.reference ||
    payload?.checkoutId ||
    null;

  if (!invoiceId || typeof invoiceId !== "string") {
    return corsJson({ error: "Missing invoice reference in webhook payload" }, { status: 400 });
  }

  const status = normalizePaymentStatus(payload?.status || payload?.eventType);
  const providerRef = String(payload?.id || payload?.paymentId || payload?.checkoutId || "");
  const db = getTursoClient(env);

  await db.execute({
    sql: `UPDATE invoices
          SET status = ?
          WHERE id = ?`,
    args: [status, invoiceId]
  });

  await db.execute({
    sql: `UPDATE payments
          SET status = ?, provider_reference = ?, payload = ?, updated_at = CURRENT_TIMESTAMP
          WHERE invoice_id = ?`,
    args: [status, providerRef, JSON.stringify(payload), invoiceId]
  });

  return corsJson({ ok: true, invoiceId, status });
}

// ── Email via Resend ──────────────────────────────────────────
function escHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailLayout({ heading, body }) {
  return `<!doctype html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a0c10;font-family:'DM Sans',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0c10;padding:40px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0f1117;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;max-width:560px;width:100%">
        <tr><td style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.08)">
          <span style="font-size:15px;font-weight:700;color:#e6edf3">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f97316;margin-right:8px;vertical-align:middle"></span>
            Ubani Hosting
          </span>
        </td></tr>
        <tr><td style="padding:28px">
          <h1 style="font-size:20px;font-weight:700;color:#e6edf3;margin:0 0 16px;letter-spacing:-0.02em">${heading}</h1>
          <div style="font-size:14px;color:#7d8590;line-height:1.6">${body}</div>
        </td></tr>
        <tr><td style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#4a5568">
          Ubani Hosting · ubanihosting.co.za · Unsubscribe from transactional emails not available (account notifications)
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendEmail(env, { to, subject, html }) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured — email skipped");
    return { skipped: true };
  }

  const fromName  = env.EMAIL_FROM_NAME || "Ubani Hosting";
  const fromEmail = env.EMAIL_FROM || "noreply@ubanihosting.co.za";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      subject,
      html
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || `Resend error ${response.status}`);
  }
  return data;
}

const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, authorization, x-admin-key, x-filename",
  "access-control-max-age": "86400"
};

function corsJson(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...SECURITY_HEADERS,
      ...CORS_HEADERS,
      ...(init.headers || {})
    }
  });
}

// ─────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const clientIp = getClientIp(request);
    const isHead = request.method === "HEAD";
    const host = url.hostname.toLowerCase();

    // Handle CORS preflight immediately — before any auth or rate limiting
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    try {
      if ((request.method === "GET" || isHead) && url.pathname.startsWith("/assets/")) {
        const assetResponse = await serveStaticAsset(request, env);
        return isHead ? headFromResponse(assetResponse) : assetResponse;
      }

      if (request.method === "GET" && url.pathname === "/robots.txt") {
        return text(getRobotsTxt(), { headers: { "cache-control": "public, max-age=1800" } });
      }

      if (request.method === "GET" && isFrontendPath(url.pathname) && isBlockedCrawlerRequest(request, env)) {
        return text("Forbidden", { status: 403, headers: { "cache-control": "no-store" } });
      }

      if (request.method === "GET" && url.pathname === "/") {
        const apiOrigin = getCanonicalApiOrigin(request, env);
        const homepage = host === "www.ubanihosting.co.za"
          ? renderDesignerLanding(apiOrigin)
          : renderFrontend(url.pathname, apiOrigin);
        const response = html(homepage);
        return isHead ? headFromResponse(response) : response;
      }

      if (request.method === "GET" || isHead) {
        const apiOrigin = getCanonicalApiOrigin(request, env);
        const frontend = renderFrontend(url.pathname, apiOrigin);
        if (frontend) {
          const response = html(frontend);
          return isHead ? headFromResponse(response) : response;
        }
      }

      if (request.method === "GET" && url.pathname === "/favicon.ico") {
        return new Response(null, { status: 204 });
      }

      if (request.method === "POST" && url.pathname === "/api/register") {
        const rl = consumeRateLimit(`register:${clientIp}`, 20, 10 * 60 * 1000);
        if (!rl.allowed) return corsJson({ error: "Too many registration attempts" }, { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } });
        return await register(request, env);
      }
      if (request.method === "POST" && url.pathname === "/api/login") {
        const rl = consumeRateLimit(`login:${clientIp}`, 30, 10 * 60 * 1000);
        if (!rl.allowed) return corsJson({ error: "Too many login attempts" }, { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } });
        return await login(request, env);
      }
      if (request.method === "GET" && url.pathname === "/api") return corsJson({ message: "Ubani API", health: "/health" });
      if (request.method === "POST" && url.pathname === "/webhooks/yoco") {
        const rl = consumeRateLimit(`webhook:${clientIp}`, 180, 60 * 1000);
        if (!rl.allowed) return corsJson({ error: "Too many webhook requests" }, { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } });
        const rawBody = await request.text();
        return await yocoWebhook(request, env, rawBody);
      }

      if (request.method === "GET" && url.pathname === "/health") return corsJson({ ok: true });
      if (isHead && url.pathname === "/health") {
        const response = json({ ok: true });
        return headFromResponse(response);
      }

      if (request.method === "GET" && url.pathname === "/api/admin/summary") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminSummary(env);
      }
      if (request.method === "GET" && url.pathname === "/api/admin/users") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminUsers(env);
      }
      if (request.method === "GET" && url.pathname === "/api/admin/revenue") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminRevenue(env);
      }
      if (request.method === "GET" && url.pathname === "/api/admin/tickets") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminTickets(env);
      }

      if (request.method === "GET" && url.pathname === "/api/admin/tickets") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminTickets(env);
      }
      if (request.method === "GET" && /^\/api\/admin\/tickets\/[^/]+$/.test(url.pathname)) {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminGetTicketThread(request, env);
      }
      if (request.method === "POST" && /^\/api\/admin\/tickets\/[^/]+\/reply$/.test(url.pathname)) {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminReplyToTicket(request, env);
      }
      if (request.method === "POST" && /^\/api\/admin\/tickets\/[^/]+\/close$/.test(url.pathname)) {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminCloseTicket(request, env);
      }

      // ── Admin: projects
      if (request.method === "GET" && url.pathname === "/api/admin/projects") {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminProjects(env);
      }
      if (request.method === "POST" && /^\/api\/admin\/projects\/[^/]+\/status$/.test(url.pathname)) {
        const adminError = requireAdmin(request, env);
        if (adminError) return adminError;
        return await adminUpdateProjectStatus(request, env);
      }

      const authUserId = await getAuthUserId(request, env);
      if (!authUserId) {
        return corsJson({ error: "Unauthorized" }, { status: 401 });
      }

      // ── Public file serving (R2)
      if (request.method === "GET" && url.pathname.startsWith("/files/")) {
        return await serveProjectFile(request, env);
      }

      // ── Project CRUD + deployment
      if (request.method === "POST" && url.pathname === "/api/projects") return await createProject(request, env, authUserId);
      if (request.method === "GET"  && url.pathname === "/api/projects") return await listProjects(env, authUserId);
      if (request.method === "GET"  && /^\/api\/projects\/[^/]+$/.test(url.pathname)) return await getProject(request, env, authUserId);
      if (request.method === "PATCH"  && /^\/api\/projects\/[^/]+$/.test(url.pathname)) return await updateProject(request, env, authUserId);
      if (request.method === "POST" && /^\/api\/projects\/[^/]+\/files$/.test(url.pathname)) return await uploadFile(request, env, authUserId);
      if (request.method === "DELETE" && /^\/api\/projects\/[^/]+\/files\/[^/]+$/.test(url.pathname)) return await deleteFile(request, env, authUserId);
      if (request.method === "POST" && /^\/api\/projects\/[^/]+\/deploy$/.test(url.pathname)) return await deployToPages(request, env, authUserId);
      if (request.method === "GET"  && /^\/api\/projects\/[^/]+\/deployments$/.test(url.pathname)) return await listDeployments(request, env, authUserId);

      if (request.method === "POST" && url.pathname === "/api/deploy") return await deploy(request, env, authUserId); // legacy
      if (request.method === "POST" && url.pathname === "/api/invoice") return await invoice(request, env, authUserId);
      if (request.method === "POST" && url.pathname === "/api/invoice/checkout") return await createInvoiceCheckout(request, env, authUserId);

      // Support tickets
      if (request.method === "POST" && url.pathname === "/api/support/tickets") return await createSupportTicket(request, env, authUserId);
      if (request.method === "GET"  && url.pathname === "/api/support/tickets") return await listSupportTickets(env, authUserId);
      if (request.method === "GET"  && /^\/api\/support\/tickets\/[^/]+$/.test(url.pathname)) return await getTicketThread(request, env, authUserId);
      if (request.method === "POST" && /^\/api\/support\/tickets\/[^/]+\/reply$/.test(url.pathname)) return await replyToTicket(request, env, authUserId);

      // User profile
      if (request.method === "GET"   && url.pathname === "/api/me") return await me(env, authUserId);
      if (request.method === "PATCH" && url.pathname === "/api/me") return await updateProfile(request, env, authUserId);

      if (request.method === "GET" && url.pathname === "/api/invoices") return await listInvoices(env, authUserId);

      return corsJson({ message: "Ubani API" });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Unexpected error";
      return corsJson({ error: message }, { status: 500 });
    }
  }
};