import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { completedChapters } = await req.json();

    // Get student
    const studentResult = await pool.query(
      "SELECT id FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    await pool.query(
      "UPDATE padhai_students SET completed_chapters = $1 WHERE email = $2",
      [JSON.stringify(completedChapters), session.user.email]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update chapters error:", error);
    return NextResponse.json({ error: "Failed to update chapters" }, { status: 500 });
  }
}
