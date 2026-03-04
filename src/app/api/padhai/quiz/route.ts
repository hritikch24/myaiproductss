import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { auth } from "@/lib/auth";
import { generateQuizQuestions } from "@/lib/padhai/gemini";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chapterId, taskId } = await req.json();

    if (!chapterId) {
      return NextResponse.json({ error: "Chapter ID required" }, { status: 400 });
    }

    // Get student
    const studentResult = await pool.query(
      "SELECT id, class, exam_target FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const student = studentResult.rows[0];

    // Get chapter info
    const chapterResult = await pool.query(
      "SELECT name FROM padhai_chapters WHERE id = $1",
      [chapterId]
    );

    if (chapterResult.rows.length === 0) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const chapterName = chapterResult.rows[0].name;

    // Generate quiz questions using Gemini
    const questions = await generateQuizQuestions(
      chapterName,
      chapterId,
      student.class,
      student.exam_target,
      5 // 5 questions for free tier
    );

    // Store quiz attempt (pending)
    const quizResult = await pool.query(
      `INSERT INTO padhai_quiz_attempts (student_id, chapter_id, questions, total_questions, time_limit_per_question_seconds)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [student.id, chapterId, JSON.stringify(questions), questions.length, 10]
    );

    return NextResponse.json({
      quizId: quizResult.rows[0].id,
      questions,
      chapterName,
      taskId
    });
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}
