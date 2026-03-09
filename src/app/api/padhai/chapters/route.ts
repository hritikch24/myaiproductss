import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    let studentClass = searchParams.get("class");
    let examTarget = searchParams.get("exam");
    let board = searchParams.get("board") || "CBSE";

    // If no parameters provided, fetch from student's record
    if (!studentClass || !examTarget) {
      console.log("Auto-detecting class/exam for:", session.user.email);
      const studentResult = await pool.query(
        "SELECT class, exam_target, board FROM padhai_students WHERE LOWER(email) = LOWER($1)",
        [session.user.email]
      );
      
      if (studentResult.rows.length === 0) {
        console.log("Student not found, using defaults for:", session.user.email);
        // Use default values if no student record
        studentClass = studentClass || "11";
        examTarget = examTarget || "JEE";
        board = board || "CBSE";
      } else {
        const student = studentResult.rows[0];
        console.log("Student record:", student);
        studentClass = studentClass || String(student.class || "11");
        examTarget = examTarget || student.exam_target || "JEE";
        board = student.board || board || "CBSE";
      }
      
      if (!studentClass || !examTarget) {
        studentClass = "11";
        examTarget = "JEE";
      }
    }

    // Get chapters grouped by subject
    const chaptersResult = await pool.query(
      `SELECT c.id, c.name, c.chapter_order, c.estimated_hours, s.name as subject_name 
       FROM padhai_chapters c
       JOIN padhai_subjects s ON c.subject_id = s.id
       WHERE c.class = $1 AND c.exam_type IN ('BOTH', $2) AND (c.board = 'BOTH' OR c.board = $3)
       ORDER BY s.name, c.chapter_order`,
      [studentClass, examTarget, board]
    );

    // Group chapters by subject
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chaptersBySubject: Record<string, any[]> = {};
    for (const chapter of chaptersResult.rows) {
      if (!chaptersBySubject[chapter.subject_name]) {
        chaptersBySubject[chapter.subject_name] = [];
      }
      chaptersBySubject[chapter.subject_name].push({
        id: chapter.id,
        name: chapter.name,
        chapter_order: chapter.chapter_order,
        estimated_hours: chapter.estimated_hours,
      });
    }

    return NextResponse.json({ 
      subjects: chaptersBySubject,
      examTarget,
      studentClass 
    });
  } catch (error) {
    console.error("Get chapters error:", error);
    return NextResponse.json({ error: "Failed to fetch chapters" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { completedChapters } = await req.json();

    await pool.query(
      "UPDATE padhai_students SET completed_chapters = $1 WHERE email = $2",
      [JSON.stringify(completedChapters || []), session.user.email]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update chapters error:", error);
    return NextResponse.json({ error: "Failed to update chapters" }, { status: 500 });
  }
}
