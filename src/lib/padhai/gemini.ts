// Quiz question generation — tries Groq (free) first, then Gemini as fallback

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

function buildPrompt(
  chapterName: string,
  studentClass: string,
  examTarget: string,
  numQuestions: number
) {
  const examLabel =
    examTarget === "JEE"
      ? "JEE Main/Advanced"
      : examTarget === "NEET"
        ? "NEET"
        : "CBSE Board Exam";

  return `You are a ${examLabel} question paper setter for Class ${studentClass}.

Generate exactly ${numQuestions} MCQ questions on the chapter "${chapterName}".

Rules:
- Mix difficulty: 2 easy, 2 medium, 1 hard (adjust proportionally)
- Each question must have exactly 4 options
- correct_answer must be one of "A", "B", "C", "D"
- Questions should test conceptual understanding, not just rote memory
- Keep questions concise (under 20 words)
- Options should be plausible (no obviously wrong answers)
- Do NOT prefix options with "A)", "B)" etc — just the option text

Return ONLY valid JSON array, no markdown fences, no explanation:
[{"question":"...","options":["option1","option2","option3","option4"],"correct_answer":"A","difficulty":"easy"}]`;
}

function validateQuestions(raw: any[], chapterId: string, numQuestions: number) {
  const validAnswers = ["A", "B", "C", "D"];
  const validated = raw
    .filter(
      (q) =>
        q.question &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        q.correct_answer &&
        validAnswers.includes(q.correct_answer)
    )
    .slice(0, numQuestions);

  if (validated.length === 0) {
    throw new Error("No valid questions in response");
  }

  return validated.map((q: any) => ({
    ...q,
    chapterId,
    studentAnswer: null,
    timeTakenMs: null,
  }));
}

function parseJsonArray(text: string): any[] {
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("No JSON array in response");
  return JSON.parse(jsonMatch[0]);
}

// ─── Groq (free tier: 30 req/min, Llama 3.3 70B) ───
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
          content: "You are an expert exam question generator. Return only valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

// ─── Gemini fallback ───
async function generateWithGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error("No Gemini API key");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topP: 0.9,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export async function generateQuizQuestions(
  chapterName: string,
  chapterId: string,
  studentClass: string,
  examTarget: string,
  numQuestions: number = 5
) {
  const prompt = buildPrompt(chapterName, studentClass, examTarget, numQuestions);

  // Try Groq first (free, fast)
  if (GROQ_API_KEY) {
    try {
      const text = await generateWithGroq(prompt);
      const raw = parseJsonArray(text);
      return validateQuestions(raw, chapterId, numQuestions);
    } catch (err) {
      console.error("Groq failed, trying Gemini:", err);
    }
  }

  // Fallback to Gemini
  if (GEMINI_API_KEY) {
    try {
      const text = await generateWithGemini(prompt);
      const raw = parseJsonArray(text);
      return validateQuestions(raw, chapterId, numQuestions);
    } catch (err) {
      console.error("Gemini also failed:", err);
      throw err;
    }
  }

  throw new Error("No AI API key configured. Set GROQ_API_KEY (free) or GEMINI_API_KEY.");
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
