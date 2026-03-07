import { createClient } from "@libsql/client/web";

let cachedClient;

function normalizeTursoUrl(rawUrl) {
  if (!rawUrl) return rawUrl;
  if (rawUrl.startsWith("libsql://")) {
    // Force HTTP transport for Cloudflare Workers runtime.
    return `https://${rawUrl.slice("libsql://".length)}`;
  }
  return rawUrl;
}

export function getTursoClient(env) {
  if (cachedClient) return cachedClient;

  const rawUrl = env.TURSO_DATABASE_URL || env.TURSO_URL;
  const authToken = env.TURSO_AUTH_TOKEN || env.TURSO_TOKEN;
  const url = normalizeTursoUrl(rawUrl);

  if (!url) {
    throw new Error("Missing TURSO_DATABASE_URL (or TURSO_URL)");
  }

  if (!authToken) {
    throw new Error("Missing TURSO_AUTH_TOKEN (or TURSO_TOKEN)");
  }

  cachedClient = createClient({ url, authToken });
  return cachedClient;
}
