import { NextResponse } from "next/server";
import pool from "@/lib/padhai-db";

export async function GET() {
  try {
    // Add invite_code column to padhai_students
    await pool.query(`
      ALTER TABLE padhai_students
      ADD COLUMN IF NOT EXISTS invite_code VARCHAR(10) UNIQUE;
    `);

    // Add role column if not exists
    await pool.query(`
      ALTER TABLE padhai_students
      ADD COLUMN IF NOT EXISTS role VARCHAR(10) DEFAULT 'student';
    `);

    // Add parent_user_id to padhai_parents (links parent's auth account)
    await pool.query(`
      ALTER TABLE padhai_parents
      ADD COLUMN IF NOT EXISTS parent_user_id VARCHAR(255);
    `);

    // Generate invite codes for existing students that don't have one
    const students = await pool.query(
      "SELECT id FROM padhai_students WHERE invite_code IS NULL"
    );

    for (const student of students.rows) {
      let code: string;
      let exists = true;
      // Generate unique 10-digit code
      while (exists) {
        code = Math.floor(
          1000000000 + Math.random() * 9000000000
        ).toString();
        const check = await pool.query(
          "SELECT id FROM padhai_students WHERE invite_code = $1",
          [code]
        );
        exists = check.rows.length > 0;
      }
      await pool.query(
        "UPDATE padhai_students SET invite_code = $1 WHERE id = $2",
        [code!, student.id]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Migration 8 complete: invite_code, role, parent_user_id added",
    });
  } catch (error) {
    console.error("Migration 8 error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
