import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { generateQuizQuestions } from "@/lib/padhai/gemini";

// This endpoint slowly generates questions for chapters that have fewer than 20 questions.
// Call it multiple times — it picks up where it left off.
// Rate-limited to 1-3 chapters per invocation to avoid 429s.

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SEED_SECRET && secret !== "seed123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const batchSize = parseInt(req.nextUrl.searchParams.get("batch") || "1");
  const safeSize = Math.min(batchSize, 3);

  try {
    // Find chapters with fewest questions (less than 20)
    const { rows: chapters } = await pool.query(`
      SELECT c.id, c.name, c.class, c.exam_type, s.name as subject_name,
             COUNT(qb.id)::int as question_count
      FROM padhai_chapters c
      JOIN padhai_subjects s ON s.id = c.subject_id
      LEFT JOIN padhai_question_bank qb ON qb.chapter_id = c.id
      GROUP BY c.id, c.name, c.class, c.exam_type, s.name
      HAVING COUNT(qb.id) < 20
      ORDER BY COUNT(qb.id) ASC, c.id ASC
      LIMIT $1
    `, [safeSize]);

    if (chapters.length === 0) {
      return NextResponse.json({ message: "All chapters have 20+ questions", done: true });
    }

    const results = [];

    for (const chapter of chapters) {
      try {
        const questions = await generateQuizQuestions(
          chapter.name,
          chapter.id,
          chapter.class,
          chapter.exam_type,
          10
        );

        for (const q of questions) {
          await pool.query(
            `INSERT INTO padhai_question_bank (chapter_id, question, options, correct_answer, difficulty, exam_target)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [chapter.id, q.question, JSON.stringify(q.options), q.correct_answer, q.difficulty, chapter.exam_type]
          );
        }

        results.push({
          chapter: chapter.name,
          class: chapter.class,
          existing: chapter.question_count,
          added: questions.length,
        });

        if (chapters.length > 1) {
          await new Promise(r => setTimeout(r, 2000));
        }
      } catch (err) {
        results.push({
          chapter: chapter.name,
          error: String(err),
        });
      }
    }

    const { rows: countRows } = await pool.query(
      "SELECT COUNT(*)::int as total FROM padhai_question_bank"
    );

    return NextResponse.json({
      results,
      totalQuestions: countRows[0].total,
    });
  } catch (err) {
    console.error("Seed questions error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
