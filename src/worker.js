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

function html(content, init = {}) {
  return new Response(content, {
    ...init,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=120",
      ...SECURITY_HEADERS,
      "content-security-policy": "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' https:; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://api.ubanihosting.co.za https://cloudflareinsights.com https://*.cloudflareinsights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
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
    return json({ error: "Valid email and password (min 8 chars) are required" }, { status: 400 });
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
      return json({ error: "Email already registered" }, { status: 409 });
    }
    throw error;
  }

  const token = await signJwt({ sub: id, email: body.email.toLowerCase() }, env);
  return json({ user: { id, email: body.email.toLowerCase(), name, plan: "free" }, token }, { status: 201 });
}

async function updateProfile(request, env, userId) {
  const body = await parseJson(request);
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 120) : null;
  if (!name) return json({ error: "name is required" }, { status: 400 });

  const db = getTursoClient(env);
  await db.execute({
    sql: "UPDATE users SET name = ? WHERE id = ?",
    args: [name, userId]
  });
  return json({ ok: true, name });
}

async function login(request, env) {
  const body = await parseJson(request);
  if (!isValidEmail(body?.email) || typeof body?.password !== "string") {
    return json({ error: "email and password are required" }, { status: 400 });
  }

  const db = getTursoClient(env);
  const result = await db.execute({
    sql: "SELECT id, email, password, name, plan, credit FROM users WHERE email = ? LIMIT 1",
    args: [body.email.toLowerCase()]
  });

  if (!result.rows.length) {
    return json({ error: "Invalid credentials" }, { status: 401 });
  }

  const user = result.rows[0];
  const ok = await verifyPassword(body.password, String(user.password));
  if (!ok) {
    return json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signJwt({ sub: String(user.id), email: String(user.email) }, env);
  return json({ user: { id: user.id, email: user.email, name: user.name, plan: user.plan, credit: user.credit }, token });
}

async function deploy(request, env, userId) {
  const body = await parseJson(request);
  const domain = body?.domain;
  const files = Array.isArray(body?.files) ? body.files : [];

  if (typeof domain !== "string" || !domain || files.length === 0) {
    return json({ error: "domain and at least one file are required" }, { status: 400 });
  }

  const db = getTursoClient(env);
  const projectId = crypto.randomUUID();

  await db.execute({
    sql: `INSERT INTO projects(id, user_id, domain, storage)
          VALUES (?, ?, ?, 0)`,
    args: [projectId, userId, domain]
  });

  let totalBytes = 0;
  for (const file of files) {
    const path = file?.name || file?.path;
    const content = typeof file?.content === "string" ? file.content : "";
    const contentType = file?.contentType || "text/plain";

    if (!path || typeof path !== "string") continue;

    const size = new TextEncoder().encode(content).byteLength;
    totalBytes += size;

    await db.execute({
      sql: `INSERT INTO site_files(id, project_id, user_id, path, content, content_type, size, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      args: [crypto.randomUUID(), projectId, userId, path, content, contentType, size]
    });
  }

  await db.execute({
    sql: "UPDATE projects SET storage = ? WHERE id = ?",
    args: [totalBytes, projectId]
  });

  return json({ status: "live", projectId, bytesStored: totalBytes });
}

async function invoice(request, env, userId) {
  const body = await parseJson(request);
  if (typeof body?.amount !== "number") {
    return json({ error: "numeric amount is required" }, { status: 400 });
  }

  const db = getTursoClient(env);
  const id = crypto.randomUUID();

  await db.execute({
    sql: `INSERT INTO invoices(id, user_id, amount, status)
          VALUES (?, ?, ?, ?)`,
    args: [id, userId, body.amount, "pending"]
  });

  return json({ id, status: "pending" }, { status: 201 });
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
    return json({ error: "amount must be a positive integer in cents" }, { status: 400 });
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

  return json({
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

  if (!result.rows.length) return json({ error: "User not found" }, { status: 404 });
  return json({ user: result.rows[0] });
}

async function listProjects(env, userId) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, domain, storage, created_at
          FROM projects
          WHERE user_id = ?
          ORDER BY created_at DESC
          LIMIT 100`,
    args: [userId]
  });
  return json({ projects: result.rows });
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
  return json({ invoices: result.rows });
}

async function createSupportTicket(request, env, userId) {
  const body = await parseJson(request);
  const subject = String(body?.subject || "").trim();
  const message = String(body?.message || "").trim();
  if (!subject) return json({ error: "subject is required" }, { status: 400 });

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

  return json({ ticket: { id: ticketId, subject, message, status: "open" } }, { status: 201 });
}

async function replyToTicket(request, env, userId) {
  const ticketId = new URL(request.url).pathname.split("/")[4]; // /api/support/tickets/:id/reply
  const body = await parseJson(request);
  const replyBody = String(body?.message || "").trim();
  if (!replyBody) return json({ error: "message is required" }, { status: 400 });

  const db = getTursoClient(env);

  // Verify ticket belongs to user
  const ticketResult = await db.execute({
    sql: "SELECT id, subject FROM tickets WHERE id = ? AND user_id = ? LIMIT 1",
    args: [ticketId, userId]
  });
  if (!ticketResult.rows.length) return json({ error: "Ticket not found" }, { status: 404 });

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

  return json({ ok: true, messageId: msgId });
}

async function getTicketThread(request, env, userId) {
  const ticketId = new URL(request.url).pathname.split("/")[4]; // /api/support/tickets/:id
  const db = getTursoClient(env);

  const ticketResult = await db.execute({
    sql: "SELECT id, subject, message, status, created_at FROM tickets WHERE id = ? AND user_id = ? LIMIT 1",
    args: [ticketId, userId]
  });
  if (!ticketResult.rows.length) return json({ error: "Ticket not found" }, { status: 404 });

  const messagesResult = await db.execute({
    sql: "SELECT id, author_role, body, created_at FROM ticket_messages WHERE ticket_id = ? ORDER BY created_at ASC",
    args: [ticketId]
  });

  return json({ ticket: ticketResult.rows[0], messages: messagesResult.rows });
}

async function adminReplyToTicket(request, env) {
  const ticketId = new URL(request.url).pathname.split("/")[5]; // /api/admin/tickets/:id/reply
  const body = await parseJson(request);
  const replyBody = String(body?.message || "").trim();
  if (!replyBody) return json({ error: "message is required" }, { status: 400 });

  const db = getTursoClient(env);

  const ticketResult = await db.execute({
    sql: `SELECT t.id, t.subject, t.user_id, u.email, u.name
          FROM tickets t
          JOIN users u ON u.id = t.user_id
          WHERE t.id = ? LIMIT 1`,
    args: [ticketId]
  });
  if (!ticketResult.rows.length) return json({ error: "Ticket not found" }, { status: 404 });

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

  return json({ ok: true, messageId: msgId });
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
  if (!ticketResult.rows.length) return json({ error: "Ticket not found" }, { status: 404 });

  const messagesResult = await db.execute({
    sql: "SELECT id, author_role, body, created_at FROM ticket_messages WHERE ticket_id = ? ORDER BY created_at ASC",
    args: [ticketId]
  });

  return json({ ticket: ticketResult.rows[0], messages: messagesResult.rows });
}

async function adminCloseTicket(request, env) {
  const ticketId = new URL(request.url).pathname.split("/")[5]; // /api/admin/tickets/:id/close
  const db = getTursoClient(env);
  await db.execute({
    sql: "UPDATE tickets SET status = 'closed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    args: [ticketId]
  });
  return json({ ok: true });
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
  return json({ tickets: result.rows });
}

function requireAdmin(request, env) {
  const configured = String(env.ADMIN_API_KEY || "").trim();
  if (!configured) return json({ error: "ADMIN_API_KEY is not configured" }, { status: 503 });

  const provided = String(request.headers.get("x-admin-key") || "").trim();
  if (!provided || !constantTimeEqual(configured, provided)) {
    return json({ error: "Unauthorized admin request" }, { status: 401 });
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
  return json({
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
  return json({ users: result.rows });
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
  return json({ totals: byStatus.rows, latestPaid: latestPaid.rows });
}

async function adminTickets(env) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: `SELECT id, user_id, subject, status, created_at
          FROM tickets
          ORDER BY created_at DESC
          LIMIT 200`
  });
  return json({ tickets: result.rows });
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
    if (!verified) return json({ error: "Invalid Yoco webhook signature" }, { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const invoiceId =
    payload?.metadata?.invoiceId ||
    payload?.invoiceId ||
    payload?.reference ||
    payload?.checkoutId ||
    null;

  if (!invoiceId || typeof invoiceId !== "string") {
    return json({ error: "Missing invoice reference in webhook payload" }, { status: 400 });
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

  return json({ ok: true, invoiceId, status });
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

// ─────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const clientIp = getClientIp(request);
    const isHead = request.method === "HEAD";
    const host = url.hostname.toLowerCase();

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
        const homepage = host === "www.ubanihosting.co.za"
          ? renderDesignerLanding(getCanonicalApiOrigin(request, env))
          : renderFrontend(url.pathname, getCanonicalApiOrigin(request, env));
        const response = html(homepage);
        return isHead ? headFromResponse(response) : response;
      }

      if (request.method === "GET" || isHead) {
        const frontend = renderFrontend(url.pathname, getCanonicalApiOrigin(request, env));
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
        if (!rl.allowed) return json({ error: "Too many registration attempts" }, { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } });
        return await register(request, env);
      }
      if (request.method === "POST" && url.pathname === "/api/login") {
        const rl = consumeRateLimit(`login:${clientIp}`, 30, 10 * 60 * 1000);
        if (!rl.allowed) return json({ error: "Too many login attempts" }, { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } });
        return await login(request, env);
      }
      if (request.method === "GET" && url.pathname === "/api") return json({ message: "Ubani API", health: "/health" });
      if (request.method === "POST" && url.pathname === "/webhooks/yoco") {
        const rl = consumeRateLimit(`webhook:${clientIp}`, 180, 60 * 1000);
        if (!rl.allowed) return json({ error: "Too many webhook requests" }, { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } });
        const rawBody = await request.text();
        return await yocoWebhook(request, env, rawBody);
      }

      if (request.method === "GET" && url.pathname === "/health") return json({ ok: true });
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

      const authUserId = await getAuthUserId(request, env);
      if (!authUserId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      if (request.method === "POST" && url.pathname === "/api/deploy") return await deploy(request, env, authUserId);
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

      if (request.method === "GET" && url.pathname === "/api/projects") return await listProjects(env, authUserId);
      if (request.method === "GET" && url.pathname === "/api/invoices") return await listInvoices(env, authUserId);

      return json({ message: "Ubani API" });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Unexpected error";
      return json({ error: message }, { status: 500 });
    }
  }
};