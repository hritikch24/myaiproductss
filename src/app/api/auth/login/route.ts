import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const { rows } = await pool.query(
      "SELECT id, email, name, image, password FROM users WHERE email = $1",
      [email.toLowerCase().trim()]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // For demo: accept "demo123" as password OR check stored password
    if (password !== "demo123" && user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Track user login
    try {
      await pool.query(
        `INSERT INTO site_stats (stat_type, page_path) VALUES ('user_login', $1)`,
        [user.email]
      );
    } catch (e) {
      console.error("Failed to track login:", e);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}
