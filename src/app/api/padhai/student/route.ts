import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await pool.query(
      "SELECT * FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ student: null });
    }

    const student = result.rows[0];
    
    // Get parent info if exists
    const parentResult = await pool.query(
      "SELECT * FROM padhai_parents WHERE student_id = $1",
      [student.id]
    );

    return NextResponse.json({ 
      student: {
        ...student,
        parent: parentResult.rows[0] || null,
      }
    });
  } catch (error) {
    console.error("Get student error:", error);
    return NextResponse.json({ error: "Failed to fetch student" }, { status: 500 });
  }
}
