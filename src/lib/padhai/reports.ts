// Parent report generation — uses Groq (free) or Gemini as fallback

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

function buildReportPrompt(
  studentName: string,
  tasksDone: number,
  totalTasks: number,
  streak: number,
  subjects: string[],
  quizScores: Record<string, number>,
  weakAreas: string[],
  strongAreas: string[],
  language: string
): string {
  const languageInstructions: Record<string, string> = {
    english: "Write in English",
    hindi: "Write in Hindi (हिंदी)",
    hinglish: "Write in a mix of Hindi and English (Hinglish)",
  };

  return `Generate a warm, supportive parent report email.

Student name: ${studentName}
This week: Completed ${tasksDone}/${totalTasks} tasks. Streak: ${streak} days.
Subjects covered: ${subjects.join(", ")}.
Quiz performance: ${Object.entries(quizScores).map(([sub, score]) => `${sub}: ${score}%`).join(", ") || "No quizzes this week"}
Weak areas: ${weakAreas.join(", ") || "None identified"}
Strong areas: ${strongAreas.join(", ") || "None identified"}

TONE: Calm, encouraging, zero pressure.
If student struggled: Include a specific parent tip on how to support without adding pressure.
Example tips: suggest a walk together, ask 'what feels hard' instead of 'how much did you study', acknowledge effort not just results.
If student did well: Celebrate but don't raise expectations.
Language: ${languageInstructions[language] || "Hinglish"}
Keep under 300 words. Use emojis sparingly (2-3 max).
End with one specific actionable suggestion.
Include a supportive closing message.

IMPORTANT: On the LAST line of your response, write "TIP: " followed by ONE short actionable tip for the parent (max 20 words). This line will be extracted separately.`;
}

async function generateWithGroq(prompt: string): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a warm, encouraging education assistant who writes parent reports.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

async function generateWithGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error("No Gemini key");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

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
): Promise<{ report: string; parentTip: string }> {
  const prompt = buildReportPrompt(
    studentName, tasksDone, totalTasks, streak,
    subjects, quizScores, weakAreas, strongAreas, language
  );

  let text = "";

  // Try Groq first
  if (GROQ_API_KEY) {
    try {
      text = await generateWithGroq(prompt);
    } catch (err) {
      console.error("Groq report failed:", err);
    }
  }

  // Fallback to Gemini
  if (!text && GEMINI_API_KEY) {
    try {
      text = await generateWithGemini(prompt);
    } catch (err) {
      console.error("Gemini report failed:", err);
    }
  }

  // If both fail, use static fallback
  if (!text) {
    return {
      report: `📚 Weekly Update for ${studentName}\n\nThis week: Completed ${tasksDone}/${totalTasks} tasks.\nStreak: ${streak} days 🔥\n\nKeep supporting their journey! Every small step counts.`,
      parentTip: "Ask them about what they found interesting today!",
    };
  }

  // Extract tip from last line
  const tipMatch = text.match(/TIP:\s*(.+)/i);
  const parentTip = tipMatch
    ? tipMatch[1].trim()
    : "Encourage your child to keep up the great effort!";

  // Remove the TIP line from the main report
  const report = text.replace(/\n?TIP:\s*.+/i, "").trim();

  return { report, parentTip };
}
