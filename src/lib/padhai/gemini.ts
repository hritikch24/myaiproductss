import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateQuizQuestions(
  chapterName: string,
  chapterId: string,
  studentClass: string,
  examTarget: string,
  numQuestions: number = 5
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Generate ${numQuestions} MCQ questions for a Class ${studentClass} ${examTarget} student on the chapter "${chapterName}". 
These are rapid-fire recall questions — test memorization and basic understanding, NOT complex problem-solving.
Each question should be answerable in 5-10 seconds by a student who has genuinely studied.
Return JSON format only (no other text):
[{"question": "...", "options": ["A", "B", "C", "D"], "correct_answer": "A", "difficulty": "easy"}]
Mix: 60% easy (direct recall), 40% medium (one-step thinking).
Do NOT include lengthy numerical problems.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Parse the JSON response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }
    
    const questions = JSON.parse(jsonMatch[0]);
    
    // Add chapterId to each question
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return questions.map((q: any) => ({
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
