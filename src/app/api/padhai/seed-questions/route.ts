import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// This endpoint slowly generates questions for chapters that have fewer than 20 questions.
// Call it multiple times — it picks up where it left off.
// Rate-limited to 1 Gemini call per invocation to avoid 429s.

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SEED_SECRET && secret !== "seed123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const batchSize = parseInt(req.nextUrl.searchParams.get("batch") || "1");
  const safeSize = Math.min(batchSize, 3); // max 3 chapters per call

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
        const questions = await generateQuestionsForChapter(
          chapter.name,
          chapter.subject_name,
          chapter.class,
          chapter.exam_type,
          10 // generate 10 per batch
        );

        // Insert into question bank
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

        // Delay between chapters to avoid rate limits
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

    // Count total questions
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

async function generateQuestionsForChapter(
  chapterName: string,
  subjectName: string,
  studentClass: string,
  examType: string,
  count: number
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      maxOutputTokens: 4096,
    },
  });

  const examLabel = examType === "JEE" ? "JEE Main/Advanced" : examType === "NEET" ? "NEET" : "CBSE Board Exam";

  const prompt = `You are an expert ${examLabel} question paper setter for Class ${studentClass} ${subjectName}.

Generate exactly ${count} unique MCQ questions on the chapter "${chapterName}".

Requirements:
- 3 easy questions (basic recall/definitions)
- 4 medium questions (application/understanding)
- 3 hard questions (analysis/multi-step reasoning)
- Each question must have exactly 4 options
- correct_answer must be exactly one of: "A", "B", "C", "D"
- Options should NOT include the letter prefix (no "A)" or "A.")
- Questions should be diverse — cover different subtopics within the chapter
- Make wrong options plausible (common misconceptions)

Return ONLY a valid JSON array, no markdown fences:
[{"question":"What is...?","options":["Option 1","Option 2","Option 3","Option 4"],"correct_answer":"A","difficulty":"easy"}]`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  const jsonMatch = response.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("No JSON in response");

  const questions = JSON.parse(jsonMatch[0]);
  const validAnswers = ["A", "B", "C", "D"];

  return questions.filter(
    (q: { question?: string; options?: string[]; correct_answer?: string; difficulty?: string }) =>
      q.question &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      q.correct_answer &&
      validAnswers.includes(q.correct_answer) &&
      q.difficulty
  );
}
