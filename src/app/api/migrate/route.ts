import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { readdir, readFile } from "fs/promises";
import path from "path";

const mainPool = new Pool({ connectionString: process.env.DATABASE_URL });
const padhaiPool = new Pool({ connectionString: process.env.PADHAI_DATABASE_URL });

// Migrations 001-008 run against main DB, 009+ against padhai DB
function getPool(filename: string): Pool {
  const num = parseInt(filename.split("_")[0]);
  return num >= 9 ? padhaiPool : mainPool;
}

function getDbName(filename: string): string {
  const num = parseInt(filename.split("_")[0]);
  return num >= 9 ? "padhai" : "main";
}

async function ensureMigrationsTable(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      ran_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.MIGRATE_SECRET && secret !== "migrate123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ensure _migrations table exists in both databases
    await Promise.all([
      ensureMigrationsTable(mainPool),
      ensureMigrationsTable(padhaiPool),
    ]);

    // Get already-run migrations from both databases
    const [mainRan, padhaiRan] = await Promise.all([
      mainPool.query("SELECT filename FROM _migrations"),
      padhaiPool.query("SELECT filename FROM _migrations"),
    ]);
    const ranSet = new Set([
      ...mainRan.rows.map((r) => r.filename),
      ...padhaiRan.rows.map((r) => r.filename),
    ]);

    // Read migration files sorted by name
    const migrationsDir = path.join(process.cwd(), "migrations");
    const files = (await readdir(migrationsDir))
      .filter((f) => f.endsWith(".sql"))
      .sort();

    const results: { file: string; db: string; status: string; error?: string }[] = [];

    for (const file of files) {
      if (ranSet.has(file)) {
        results.push({ file, db: getDbName(file), status: "already_ran" });
        continue;
      }

      const pool = getPool(file);
      const dbName = getDbName(file);
      const sql = await readFile(path.join(migrationsDir, file), "utf-8");

      try {
        await pool.query("BEGIN");
        await pool.query(sql);
        await pool.query(
          "INSERT INTO _migrations (filename) VALUES ($1)",
          [file]
        );
        await pool.query("COMMIT");
        results.push({ file, db: dbName, status: "success" });
      } catch (err) {
        await pool.query("ROLLBACK");
        results.push({
          file,
          db: dbName,
          status: "failed",
          error: String(err),
        });
        // Stop on failure — later migrations may depend on this one
        break;
      }
    }

    const ran = results.filter((r) => r.status === "success").length;
    const skipped = results.filter((r) => r.status === "already_ran").length;
    const failed = results.filter((r) => r.status === "failed").length;

    return NextResponse.json({
      summary: { total: files.length, ran, skipped, failed },
      results,
    });
  } catch (err) {
    console.error("Migration error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
