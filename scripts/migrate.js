import { createClient } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = process.env.TURSO_DATABASE_URL || process.env.TURSO_URL;
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.TURSO_TOKEN;

if (!url || !authToken) {
  console.error("Missing TURSO_DATABASE_URL/TURSO_AUTH_TOKEN env vars");
  process.exit(1);
}

const client = createClient({ url, authToken });

function splitSqlStatements(sql) {
  return sql
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function ensureMigrationsTable() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS migrations(
      id TEXT PRIMARY KEY,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function getAppliedMigrations() {
  const result = await client.execute("SELECT id FROM migrations");
  return new Set(result.rows.map((r) => String(r.id)));
}

async function applyMigration(id, sql) {
  const statements = splitSqlStatements(sql);

  for (const stmt of statements) {
    await client.execute(stmt);
  }

  await client.execute({
    sql: "INSERT INTO migrations(id) VALUES (?)",
    args: [id]
  });
}

async function main() {
  await ensureMigrationsTable();

  const migrationsDir = path.join(__dirname, "..", "database", "migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((name) => name.endsWith(".sql"))
    .sort();

  const applied = await getAppliedMigrations();

  for (const file of files) {
    if (applied.has(file)) continue;

    const fullPath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(fullPath, "utf8");
    console.log(`Applying ${file}...`);
    await applyMigration(file, sql);
    console.log(`Applied ${file}`);
  }

  console.log("Migrations complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
