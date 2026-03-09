import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: unknown) {
      const err = error as { status?: number };
      if (err.status === 429 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000;
        console.log(`Rate limited, retrying in ${delay}ms...`);
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
  // Use smallest flash model for minimal tokens
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash-8b",
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 2048,
    }
  }, { apiVersion: "v1" });

  const prompt = `Generate exactly ${numQuestions} very short MCQ questions for Class ${studentClass} ${examTarget} on "${chapterName}". 
JSON only: [{"question": "Q?", "options": ["A","B","C","D"], "correct_answer": "A", "difficulty": "easy"}]
Keep questions under 10 words. Direct recall only.`;

  try {
    const result = await withRetry(() => model.generateContent(prompt));
    const response = result.response.text();
    
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }
    
    const questions = JSON.parse(jsonMatch[0]);
    
    return questions.slice(0, numQuestions).map((q: unknown) => ({
      ...q as object,
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
  // Generate fewer questions for background request
  return generateQuizQuestions(chapterName, chapterId, studentClass, examTarget, numQuestions);
}
