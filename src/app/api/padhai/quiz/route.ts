import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";
import { generateQuizQuestions, generateMoreQuestions } from "@/lib/padhai/gemini";

export async function GET() {
  return NextResponse.json({ error: "Method not allowed. Use POST." }, { status: 405 });
}

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

    const studentResult = await pool.query(
      "SELECT id, class, exam_target FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const student = studentResult.rows[0];

    const chapterResult = await pool.query(
      "SELECT name FROM padhai_chapters WHERE id = $1",
      [chapterId]
    );

    if (chapterResult.rows.length === 0) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const chapterName = chapterResult.rows[0].name;

    const questions = await generateQuizQuestions(
      chapterName,
      chapterId,
      student.class,
      student.exam_target,
      5
    );

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

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quizId, chapterId, action } = await req.json();

    if (action === "generateMore") {
      const studentResult = await pool.query(
        "SELECT id, class, exam_target FROM padhai_students WHERE email = $1",
        [session.user.email]
      );

      if (studentResult.rows.length === 0) {
        return NextResponse.json({ error: "Student not found" }, { status: 404 });
      }

      const student = studentResult.rows[0];

      const chapterResult = await pool.query(
        "SELECT name FROM padhai_chapters WHERE id = $1",
        [chapterId]
      );

      if (chapterResult.rows.length === 0) {
        return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
      }

      const chapterName = chapterResult.rows[0].name;

      // Generate 3 more questions
      const moreQuestions = await generateMoreQuestions(
        chapterName,
        chapterId,
        student.class,
        student.exam_target,
        3
      );

      // Get existing questions
      const quizResult = await pool.query(
        "SELECT questions FROM padhai_quiz_attempts WHERE id = $1 AND student_id = $2",
        [quizId, student.id]
      );

      if (quizResult.rows.length === 0) {
        return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
      }

      const existingQuestions = quizResult.rows[0].questions || [];
      const allQuestions = [...existingQuestions, ...moreQuestions];

      // Update quiz with more questions
      await pool.query(
        "UPDATE padhai_quiz_attempts SET questions = $1, total_questions = $2 WHERE id = $3",
        [JSON.stringify(allQuestions), allQuestions.length, quizId]
      );

      return NextResponse.json({
        questions: moreQuestions,
        totalQuestions: allQuestions.length
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Quiz patch error:", error);
    return NextResponse.json({ error: "Failed to update quiz" }, { status: 500 });
  }
}
