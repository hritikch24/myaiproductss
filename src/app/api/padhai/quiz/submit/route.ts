import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quizId, answers } = await req.json();

    if (!quizId || !answers) {
      return NextResponse.json({ error: "Quiz ID and answers required" }, { status: 400 });
    }

    // Get student
    const studentResult = await pool.query(
      "SELECT id FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const studentId = studentResult.rows[0].id;

    // Get quiz attempt
    const quizResult = await pool.query(
      "SELECT * FROM padhai_quiz_attempts WHERE id = $1 AND student_id = $2",
      [quizId, studentId]
    );

    if (quizResult.rows.length === 0) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const quiz = quizResult.rows[0];
    const questions = quiz.questions;

    // Calculate score
    let correctCount = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedQuestions = questions.map((q: any, index: number) => {
      const studentAnswer = answers[index];
      const isCorrect = studentAnswer === q.correct_answer;
      if (isCorrect) correctCount++;
      return {
        ...q,
        studentAnswer,
        isCorrect,
      };
    });

    const score = (correctCount / questions.length) * 100;
    
    // Determine verification status
    let verificationStatus: 'genuine' | 'partial' | 'suspicious';
    if (score >= 70) {
      verificationStatus = 'genuine';
    } else if (score >= 40) {
      verificationStatus = 'partial';
    } else {
      verificationStatus = 'suspicious';
    }

    // Update quiz with score
    await pool.query(
      `UPDATE padhai_quiz_attempts 
       SET questions = $1, score = $2, verification_status = $3
       WHERE id = $4`,
      [JSON.stringify(updatedQuestions), score, verificationStatus, quizId]
    );

    return NextResponse.json({
      score,
      correctCount,
      totalQuestions: questions.length,
      verificationStatus,
      questions: updatedQuestions,
    });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 });
  }
}
