import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Please sign in first" },
        { status: 401 }
      );
    }

    const { name, class: studentClass, examTarget } = await req.json();

    if (!name || !studentClass || !examTarget) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Set subjects based on exam target
    let subjects: string[] = [];
    if (examTarget === "JEE") {
      subjects = ["Physics", "Chemistry", "Mathematics"];
    } else if (examTarget === "NEET") {
      subjects = ["Physics", "Chemistry", "Biology"];
    } else {
      subjects = ["Physics", "Chemistry", "Mathematics", "Biology"];
    }

    // Check if student already exists
    const existing = await pool.query(
      "SELECT id FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (existing.rows.length > 0) {
      // Update existing student
      await pool.query(
        `UPDATE padhai_students 
         SET name = $1, class = $2, exam_target = $3, subjects = $4
         WHERE email = $5`,
        [name, studentClass, examTarget, JSON.stringify(subjects), session.user.email]
      );
    } else {
      // Create new student
      await pool.query(
        `INSERT INTO padhai_students (user_id, name, email, class, exam_target, subjects)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [session.user.id, name, session.user.email, studentClass, examTarget, JSON.stringify(subjects)]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to setup profile" },
      { status: 500 }
    );
  }
}
