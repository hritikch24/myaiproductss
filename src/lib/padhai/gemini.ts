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
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 4096,
    }
  }, { apiVersion: "v1" });

  const prompt = `Generate exactly ${numQuestions} MCQ questions for Class ${studentClass} ${examTarget} on chapter "${chapterName}". 
Return ONLY a JSON array, no other text.
Format: [{"question": "...", "options": ["A", "B", "C", "D"], "correct_answer": "A", "difficulty": "easy"}]
Keep questions short - rapid recall only. 60% easy, 40% medium.`;

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
