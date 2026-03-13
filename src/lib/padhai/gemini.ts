import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

function isRetryableError(error: unknown): boolean {
  const err = error as { status?: number; message?: string; code?: number };
  if (err.status === 429 || err.status === 503 || err.code === 429 || err.code === 503) return true;
  const msg = String(err.message || error || "").toLowerCase();
  return msg.includes("resource_exhausted") || msg.includes("rate limit") || msg.includes("429") || msg.includes("503") || msg.includes("overloaded");
}

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: unknown) {
      if (isRetryableError(error) && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 2000; // 2s, 4s, 8s
        console.log(`Gemini rate limited, retrying in ${delay}ms (attempt ${i + 2}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}

export async function generateQuizQuestions(
  chapterName: string,
  chapterId: string,
  studentClass: string,
  examTarget: string,
  numQuestions: number = 5
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    generationConfig: {
      temperature: 0.8,
      topP: 0.9,
      maxOutputTokens: 2048,
    },
  });

  const examLabel =
    examTarget === "JEE"
      ? "JEE Main/Advanced"
      : examTarget === "NEET"
        ? "NEET"
        : "CBSE Board Exam";

  const prompt = `You are a ${examLabel} question paper setter for Class ${studentClass}.

Generate exactly ${numQuestions} MCQ questions on the chapter "${chapterName}".

Rules:
- Mix difficulty: 2 easy, 2 medium, 1 hard (adjust proportionally)
- Each question must have exactly 4 options labeled A, B, C, D
- correct_answer must be one of "A", "B", "C", "D"
- Questions should test conceptual understanding, not just rote memory
- Keep questions concise (under 20 words)
- Options should be plausible (no obviously wrong answers)

Return ONLY valid JSON array, no markdown:
[{"question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"correct_answer":"A","difficulty":"easy"}]`;

  try {
    const result = await withRetry(() => model.generateContent(prompt));
    const response = result.response.text();

    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from Gemini");
    }

    const questions = JSON.parse(jsonMatch[0]);

    // Validate structure
    const validAnswers = ["A", "B", "C", "D"];
    const validated = questions
      .filter(
        (q: { question?: string; options?: string[]; correct_answer?: string }) =>
          q.question &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          q.correct_answer &&
          validAnswers.includes(q.correct_answer)
      )
      .slice(0, numQuestions);

    if (validated.length === 0) {
      throw new Error("No valid questions generated");
    }

    return validated.map((q: object) => ({
      ...q,
      chapterId,
      studentAnswer: null,
      timeTakenMs: null,
    }));
  } catch (error) {
    console.error("Quiz generation error:", error);
    throw error;
  }
}

export async function generateMoreQuestions(
  chapterName: string,
  chapterId: string,
  studentClass: string,
  examTarget: string,
  numQuestions: number = 3
) {
  return generateQuizQuestions(
    chapterName,
    chapterId,
    studentClass,
    examTarget,
    numQuestions
  );
}
