import { getTursoClient } from "./lib/turso.js";
import { getAuthUserId, hashPassword, signJwt, verifyPassword } from "./lib/auth.js";

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {})
    }
  });
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

async function register(request, env) {
  const body = await parseJson(request);
  if (!isValidEmail(body?.email) || typeof body?.password !== "string" || body.password.length < 8) {
    return json({ error: "Valid email and password (min 8 chars) are required" }, { status: 400 });
  }

  const db = getTursoClient(env);
  const id = crypto.randomUUID();
  const configuredIterations = Number(env.PASSWORD_HASH_ITERATIONS || "120000");
  const iterations = Number.isInteger(configuredIterations) && configuredIterations > 0
    ? configuredIterations
    : 120000;
  const passwordHash = await hashPassword(body.password, iterations);

  try {
    await db.execute({
      sql: `INSERT INTO users(id, email, password, credit, created_at)
            VALUES (?, ?, ?, 0, CURRENT_TIMESTAMP)`,
      args: [id, body.email.toLowerCase(), passwordHash]
    });
  } catch (error) {
    if (String(error.message || "").toLowerCase().includes("unique")) {
      return json({ error: "Email already registered" }, { status: 409 });
    }
    throw error;
  }

  const token = await signJwt({ sub: id, email: body.email.toLowerCase() }, env);
  return json({ user: { id, email: body.email.toLowerCase() }, token }, { status: 201 });
}

async function login(request, env) {
  const body = await parseJson(request);
  if (!isValidEmail(body?.email) || typeof body?.password !== "string") {
    return json({ error: "email and password are required" }, { status: 400 });
  }

  const db = getTursoClient(env);
  const result = await db.execute({
    sql: "SELECT id, email, password, credit FROM users WHERE email = ? LIMIT 1",
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
  return json({ user: { id: user.id, email: user.email, credit: user.credit }, token });
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

async function me(env, userId) {
  const db = getTursoClient(env);
  const result = await db.execute({
    sql: "SELECT id, email, credit, created_at FROM users WHERE id = ? LIMIT 1",
    args: [userId]
  });

  if (!result.rows.length) return json({ error: "User not found" }, { status: 404 });
  return json({ user: result.rows[0] });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (request.method === "GET" && url.pathname === "/") {
        return json({ message: "Ubani API", health: "/health" });
      }

      if (request.method === "GET" && url.pathname === "/favicon.ico") {
        return new Response(null, { status: 204 });
      }

      if (request.method === "POST" && url.pathname === "/api/register") return register(request, env);
      if (request.method === "POST" && url.pathname === "/api/login") return login(request, env);

      if (request.method === "GET" && url.pathname === "/health") return json({ ok: true });

      const authUserId = await getAuthUserId(request, env);
      if (!authUserId) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      if (request.method === "POST" && url.pathname === "/api/deploy") return deploy(request, env, authUserId);
      if (request.method === "POST" && url.pathname === "/api/invoice") return invoice(request, env, authUserId);
      if (request.method === "GET" && url.pathname === "/api/me") return me(env, authUserId);

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
