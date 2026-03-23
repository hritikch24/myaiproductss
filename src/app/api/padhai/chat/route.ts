import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

// --- Rate limiting (in-memory, per-process) ---
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_MESSAGES_PER_HOUR = 30; // 30 messages per hour per user/code
const MAX_MESSAGES_PER_DAY = 100; // 100 messages per day per user/code
const DAY_MS = 24 * 60 * 60 * 1000;

interface RateEntry {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateEntry>();

// Clean old entries every 10 minutes
setInterval(() => {
  const cutoff = Date.now() - DAY_MS;
  for (const [key, entry] of rateLimitMap) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) rateLimitMap.delete(key);
  }
}, 10 * 60 * 1000);

function checkRateLimit(key: string): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key) || { timestamps: [] };

  // Clean timestamps older than 24h
  entry.timestamps = entry.timestamps.filter((t) => t > now - DAY_MS);

  const hourTimestamps = entry.timestamps.filter((t) => t > now - RATE_LIMIT_WINDOW_MS);

  if (entry.timestamps.length >= MAX_MESSAGES_PER_DAY) {
    const oldest = entry.timestamps[0];
    return { allowed: false, retryAfterSec: Math.ceil((oldest + DAY_MS - now) / 1000) };
  }

  if (hourTimestamps.length >= MAX_MESSAGES_PER_HOUR) {
    const oldest = hourTimestamps[0];
    return { allowed: false, retryAfterSec: Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000) };
  }

  entry.timestamps.push(now);
  rateLimitMap.set(key, entry);
  return { allowed: true };
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Fetch all relevant student data for AI context
async function getStudentContext(studentId: string) {
  const student = await pool.query(
    `SELECT name, class, exam_target, subjects, streak_count, longest_streak,
            last_active_date, completed_chapters
     FROM padhai_students WHERE id = $1`,
    [studentId]
  );

  if (student.rows.length === 0) return null;
  const s = student.rows[0];

  // Chapters + progress
  const chapters = await pool.query(
    `SELECT c.id, c.name, c.estimated_hours, s.name as subject_name
     FROM padhai_chapters c
     JOIN padhai_subjects s ON c.subject_id = s.id
     WHERE c.class = $1 AND c.exam_type IN ('BOTH', $2)
     ORDER BY s.name, c.chapter_order`,
    [String(s.class), s.exam_target]
  );

  const completed = s.completed_chapters || [];
  const completedChapters = chapters.rows.filter((c: any) => completed.includes(c.id));
  const pendingChapters = chapters.rows.filter((c: any) => !completed.includes(c.id));

  const subjectProgress: Record<string, { done: number; total: number }> = {};
  for (const ch of chapters.rows) {
    if (!subjectProgress[ch.subject_name]) subjectProgress[ch.subject_name] = { done: 0, total: 0 };
    subjectProgress[ch.subject_name].total++;
    if (completed.includes(ch.id)) subjectProgress[ch.subject_name].done++;
  }

  // This week's goals
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  const weekStartStr = startOfWeek.toISOString().split("T")[0];

  const goals = await pool.query(
    `SELECT gt.task_description, gt.status, gt.quiz_score, c.name as chapter_name
     FROM padhai_weekly_goals wg
     JOIN padhai_goal_tasks gt ON gt.weekly_goal_id = wg.id
     LEFT JOIN padhai_chapters c ON gt.chapter_id = c.id
     WHERE wg.student_id = $1 AND wg.week_start_date = $2`,
    [studentId, weekStartStr]
  );

  const tasksDone = goals.rows.filter((t: any) => t.status === "done").length;

  // Recent quizzes
  const quizzes = await pool.query(
    `SELECT qa.score, qa.total_questions, qa.attempted_at, c.name as chapter_name
     FROM padhai_quiz_attempts qa
     LEFT JOIN padhai_chapters c ON qa.chapter_id = c.id
     WHERE qa.student_id = $1
     ORDER BY qa.attempted_at DESC LIMIT 10`,
    [studentId]
  );

  // Study photos count this week
  const photos = await pool.query(
    `SELECT COUNT(*) as count FROM padhai_study_photos
     WHERE student_id = $1 AND uploaded_at >= $2`,
    [studentId, startOfWeek.toISOString()]
  );

  return {
    name: s.name,
    class: s.class,
    examTarget: s.exam_target,
    subjects: s.subjects,
    streak: s.streak_count || 0,
    longestStreak: s.longest_streak || 0,
    lastActive: s.last_active_date,
    totalChapters: chapters.rows.length,
    completedCount: completedChapters.length,
    progressPercent: chapters.rows.length > 0
      ? Math.round((completedChapters.length / chapters.rows.length) * 100)
      : 0,
    subjectProgress,
    pendingChapters: pendingChapters.slice(0, 5).map((c: any) => `${c.subject_name}: ${c.name}`),
    thisWeek: {
      totalTasks: goals.rows.length,
      tasksDone,
      tasks: goals.rows.map((t: any) => ({
        name: t.chapter_name || t.task_description,
        status: t.status,
        quizScore: t.quiz_score,
      })),
    },
    recentQuizzes: quizzes.rows.map((q: any) => ({
      chapter: q.chapter_name,
      score: q.score,
      total: q.total_questions,
      date: q.attempted_at,
    })),
    photosThisWeek: Number(photos.rows[0]?.count || 0),
  };
}

export async function POST(req: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "AI chatbot not configured" },
        { status: 503 }
      );
    }

    const { messages, inviteCode } = (await req.json()) as {
      messages: ChatMessage[];
      inviteCode?: string;
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    // Validate message length
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.content && lastMsg.content.length > 500) {
      return NextResponse.json(
        { error: "Message too long. Keep it under 500 characters." },
        { status: 400 }
      );
    }

    // Determine student — either via auth session or invite code
    let studentId: string | null = null;
    let isParent = false;

    if (inviteCode) {
      // Public parent access via invite code
      const result = await pool.query(
        `SELECT id FROM padhai_students
         WHERE invite_code = $1 AND (role = 'student' OR role IS NULL)`,
        [inviteCode.trim()]
      );
      if (result.rows.length > 0) {
        studentId = result.rows[0].id;
        isParent = true;
      }
    } else {
      // Authenticated student access
      const session = await auth();
      if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const result = await pool.query(
        "SELECT id FROM padhai_students WHERE email = $1",
        [session.user.email]
      );
      if (result.rows.length > 0) {
        studentId = result.rows[0].id;
      }
    }

    if (!studentId) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Rate limit check
    const rateLimitKey = inviteCode ? `invite:${inviteCode.trim()}` : `student:${studentId}`;
    const rateCheck = checkRateLimit(rateLimitKey);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `You've reached the message limit. Try again in ${Math.ceil((rateCheck.retryAfterSec || 60) / 60)} minutes.` },
        { status: 429 }
      );
    }

    // Fetch student context
    const ctx = await getStudentContext(studentId);
    if (!ctx) {
      return NextResponse.json({ error: "Could not load data" }, { status: 500 });
    }

    // Build system prompt with student data
    const subjectLines = Object.entries(ctx.subjectProgress)
      .map(([sub, d]) => `  ${sub}: ${d.done}/${d.total} chapters done`)
      .join("\n");

    const quizLines = ctx.recentQuizzes.length > 0
      ? ctx.recentQuizzes
          .map((q) => `  ${q.chapter}: ${q.score}/${q.total}`)
          .join("\n")
      : "  No quizzes taken recently";

    const taskLines = ctx.thisWeek.tasks.length > 0
      ? ctx.thisWeek.tasks
          .map((t) => `  ${t.name}: ${t.status}${t.quizScore != null ? ` (quiz: ${t.quizScore})` : ""}`)
          .join("\n")
      : "  No goals set this week";

    const persona = isParent
      ? `You are Padhai AI, a warm and supportive assistant helping a parent understand their child ${ctx.name}'s study progress. Speak in a reassuring, calm tone. Never pressure. Address the user as the parent.`
      : `You are Padhai AI, a friendly study buddy for ${ctx.name}. You're encouraging, practical, and help with study planning. Speak casually but helpfully. Use Hinglish naturally if the student does.`;

    const systemPrompt = `${persona}

STUDENT DATA:
Name: ${ctx.name}
Class: ${ctx.class} | Target: ${ctx.examTarget}
Subjects: ${(ctx.subjects || []).join(", ")}
Current Streak: ${ctx.streak} days (Best: ${ctx.longestStreak})
Last Active: ${ctx.lastActive || "Unknown"}

SYLLABUS PROGRESS: ${ctx.progressPercent}% complete (${ctx.completedCount}/${ctx.totalChapters} chapters)
${subjectLines}

THIS WEEK: ${ctx.thisWeek.tasksDone}/${ctx.thisWeek.totalTasks} tasks done | ${ctx.photosThisWeek} study photos uploaded
${taskLines}

RECENT QUIZZES:
${quizLines}

NEXT CHAPTERS TO STUDY:
${ctx.pendingChapters.length > 0 ? ctx.pendingChapters.map(c => `  ${c}`).join("\n") : "  All chapters completed!"}

RULES:
- Answer based on the data above. Be specific with numbers.
- Keep responses short (2-4 sentences max unless asked for detail).
- If asked about something not in the data, say you don't have that info.
- ${isParent ? "Be reassuring. Focus on effort, not just scores. Suggest how to support without pressure." : "Be motivating. Suggest next steps. Help plan study sessions."}
- Never make up data. Only reference what's in the context above.
- You can use 1-2 emojis per message.`;

    // Call Groq
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-10), // last 10 messages for context
          ],
          temperature: 0.7,
          max_tokens: 512,
        }),
      }
    );

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error("Groq chat error:", err);
      return NextResponse.json(
        { error: "AI is temporarily unavailable. Please try again." },
        { status: 503 }
      );
    }

    const groqData = await groqRes.json();
    const reply = groqData.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
