import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateParentReport(
  studentName: string,
  tasksDone: number,
  totalTasks: number,
  streak: number,
  subjects: string[],
  quizScores: Record<string, number>,
  weakAreas: string[],
  strongAreas: string[],
  language: string = "hinglish"
) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 2048,
    }
  }, { apiVersion: "v1" });

  const languageInstructions = {
    english: "Write in English",
    hindi: "Write in Hindi (हिंदी)",
    hinglish: "Write in a mix of Hindi and English (Hinglish)",
  };

  const prompt = `Generate a warm, supportive parent report email.

Student name: ${studentName}
This week: Completed ${tasksDone}/${totalTasks} tasks. Streak: ${streak} days.
Subjects covered: ${subjects.join(", ")}. 
Quiz performance: ${Object.entries(quizScores).map(([sub, score]) => `${sub}: ${score}%`).join(", ")}
Weak areas: ${weakAreas.join(", ") || "None identified"}
Strong areas: ${strongAreas.join(", ") || "None identified"}

TONE: Calm, encouraging, zero pressure. 
If student struggled: Include a specific parent tip on how to support without adding pressure. 
Example tips: suggest a walk together, ask 'what feels hard' instead of 'how much did you study', acknowledge effort not just results.
If student did well: Celebrate but don't raise expectations.
Language: ${languageInstructions[language as keyof typeof languageInstructions] || "Hinglish"}
Keep under 300 words. Use emojis sparingly (2-3 max).
End with one specific actionable suggestion.
Include a supportive closing message.`;

  try {
    const result = await model.generateContent(prompt);
    const report = result.response.text();
    
    // Extract parent tip from the report
    const tipMatch = report.match(/Tip:?\s*([^\n]+)/i);
    const parentTip = tipMatch ? tipMatch[1] : "Encourage your child to keep up the great effort!";
    
    return {
      report,
      parentTip,
    };
  } catch (error) {
    console.error("Report generation error:", error);
    
    // Fallback simple report
    return {
      report: `📚 Weekly Update for ${studentName}\n\nThis week: Completed ${tasksDone}/${totalTasks} tasks.\nStreak: ${streak} days 🔥\n\nKeep supporting their journey!`,
      parentTip: "Ask them about what they learned today!",
    };
  }
}
