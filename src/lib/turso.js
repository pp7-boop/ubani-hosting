import { createClient } from "@libsql/client/web";

let cachedClient;

export function getTursoClient(env) {
  if (cachedClient) return cachedClient;

  const url = env.TURSO_DATABASE_URL || env.TURSO_URL;
  const authToken = env.TURSO_AUTH_TOKEN || env.TURSO_TOKEN;

  if (!url) {
    throw new Error("Missing TURSO_DATABASE_URL (or TURSO_URL)");
  }

  if (!authToken) {
    throw new Error("Missing TURSO_AUTH_TOKEN (or TURSO_TOKEN)");
  }

  cachedClient = createClient({ url, authToken });
  return cachedClient;
}
