import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email.toLowerCase().trim()]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // For demo purposes, we store password as plain text
    // In production, use bcrypt to hash passwords
    const { rows } = await pool.query(
      `INSERT INTO users (email, name, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, name`,
      [email.toLowerCase().trim(), name || email.split("@")[0], password]
    );

    // Track user registration
    try {
      await pool.query(
        `INSERT INTO site_stats (stat_type, page_path) VALUES ('user_register', $1)`,
        [email]
      );
    } catch (e) {
      console.error("Failed to track registration:", e);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: rows[0].id,
        email: rows[0].email,
        name: rows[0].name,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
