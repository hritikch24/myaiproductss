import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";
import { generateQuizQuestions } from "@/lib/padhai/gemini";

export async function GET() {
  return NextResponse.json({ error: "Method not allowed. Use POST." }, { status: 405 });
}

// Pick random questions from the question bank for a chapter
async function getQuestionsFromBank(chapterId: string, count: number, examTarget: string) {
  const { rows } = await pool.query(
    `SELECT question, options, correct_answer, difficulty
     FROM padhai_question_bank
     WHERE chapter_id = $1 AND (exam_target = $2 OR exam_target = 'BOTH')
     ORDER BY RANDOM()
     LIMIT $3`,
    [chapterId, examTarget, count]
  );
  return rows.map((r) => ({
    question: r.question,
    options: typeof r.options === "string" ? JSON.parse(r.options) : r.options,
    correct_answer: r.correct_answer,
    difficulty: r.difficulty,
    chapterId,
    studentAnswer: null,
    timeTakenMs: null,
  }));
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

    // Try question bank first (instant, no API call)
    let questions = await getQuestionsFromBank(chapterId, 5, student.exam_target);

    // Fallback to Gemini if question bank is empty
    if (questions.length < 3) {
      try {
        questions = await generateQuizQuestions(
          chapterName,
          chapterId,
          student.class,
          student.exam_target,
          5
        );
      } catch (err) {
        console.error("Gemini fallback failed:", err);
        if (questions.length > 0) {
          // Use whatever we got from the bank
        } else {
          return NextResponse.json(
            { error: "Quiz questions are being prepared for this chapter. Please try another chapter or try again later." },
            { status: 503 }
          );
        }
      }
    }

    const quizResult = await pool.query(
      `INSERT INTO padhai_quiz_attempts (student_id, chapter_id, questions, total_questions, time_limit_per_question_seconds)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [student.id, chapterId, JSON.stringify(questions), questions.length, 10]
    );

    return NextResponse.json({
      quizId: quizResult.rows[0].id,
      questions,
      chapterName,
      taskId,
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

      // Get existing question texts to avoid duplicates
      const quizResult = await pool.query(
        "SELECT questions FROM padhai_quiz_attempts WHERE id = $1 AND student_id = $2",
        [quizId, student.id]
      );

      if (quizResult.rows.length === 0) {
        return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
      }

      const existingQuestions = quizResult.rows[0].questions || [];
      const existingTexts = new Set(existingQuestions.map((q: { question: string }) => q.question));

      // Get more from bank, excluding already-asked questions
      let moreQuestions = await getQuestionsFromBank(chapterId, 8, student.exam_target);
      moreQuestions = moreQuestions.filter((q) => !existingTexts.has(q.question)).slice(0, 3);

      // Fallback to Gemini if bank doesn't have enough unique questions
      if (moreQuestions.length < 2) {
        try {
          const chapterResult = await pool.query("SELECT name FROM padhai_chapters WHERE id = $1", [chapterId]);
          const chapterName = chapterResult.rows[0]?.name || "";
          const generated = await generateQuizQuestions(chapterName, chapterId, student.class, student.exam_target, 3);
          moreQuestions = generated.filter((q: { question: string }) => !existingTexts.has(q.question));
        } catch {
          // If Gemini fails too, return what we have
        }
      }

      if (moreQuestions.length === 0) {
        return NextResponse.json({ error: "No more unique questions available for this chapter" }, { status: 404 });
      }

      const allQuestions = [...existingQuestions, ...moreQuestions];

      await pool.query(
        "UPDATE padhai_quiz_attempts SET questions = $1, total_questions = $2 WHERE id = $3",
        [JSON.stringify(allQuestions), allQuestions.length, quizId]
      );

      return NextResponse.json({
        questions: moreQuestions,
        totalQuestions: allQuestions.length,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Quiz patch error:", error);
    return NextResponse.json({ error: "Failed to update quiz" }, { status: 500 });
  }
}
