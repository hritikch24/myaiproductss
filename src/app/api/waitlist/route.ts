import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/postgres-db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, city } = await req.json();

    if (!name || !email || !city) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await pool.query(
      `CREATE TABLE IF NOT EXISTS dineready_waitlist (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        city TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )`
    );

    await pool.query(
      `INSERT INTO dineready_waitlist (name, email, city) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET name = $1, city = $3`,
      [name, email, city]
    );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
