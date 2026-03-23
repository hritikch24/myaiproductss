import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { generateParentReport } from "@/lib/padhai/reports";
import { sendEmail, buildReportEmail } from "@/lib/padhai/email";

export async function GET() {
  return NextResponse.json({ error: "Method not allowed. Use POST." }, { status: 405 });
}

export async function POST(req: NextRequest) {
  try {
    // Optional: verify cron secret for Vercel cron jobs
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // Allow if no secret is set (dev mode) or if secret matches
      if (cronSecret && authHeader) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Get all students with linked parents
    const studentsResult = await pool.query(
      `SELECT s.id, s.name, s.streak_count, s.subjects,
              p.id as parent_id, p.name as parent_name, p.email as parent_email,
              p.language_preference
       FROM padhai_students s
       JOIN padhai_parents p ON s.id = p.student_id
       WHERE p.email IS NOT NULL AND p.email != ''
         AND s.role IS DISTINCT FROM 'parent'`
    );

    if (studentsResult.rows.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No students with linked parents found",
        reportsSent: 0,
      });
    }

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    const weekStartStr = startOfWeek.toISOString().split("T")[0];

    const weekLabel = `Week of ${startOfWeek.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;

    const reports: string[] = [];
    const failed: { student: string; error: string }[] = [];

    for (const student of studentsResult.rows) {
      try {
        // ─── Collect weekly stats ───

        // Weekly tasks
        const goalsResult = await pool.query(
          `SELECT id FROM padhai_weekly_goals
           WHERE student_id = $1 AND week_start_date = $2`,
          [student.id, weekStartStr]
        );

        let tasksDone = 0;
        let totalTasks = 0;

        if (goalsResult.rows[0]) {
          const tasksResult = await pool.query(
            "SELECT status FROM padhai_goal_tasks WHERE weekly_goal_id = $1",
            [goalsResult.rows[0].id]
          );
          totalTasks = tasksResult.rows.length;
          tasksDone = tasksResult.rows.filter(
            (t: any) => t.status === "done"
          ).length;
        }

        // Quiz scores this week
        const quizResult = await pool.query(
          `SELECT q.score, q.total_questions, c.name as chapter_name
           FROM padhai_quiz_attempts q
           LEFT JOIN padhai_chapters c ON q.chapter_id = c.id
           WHERE q.student_id = $1 AND q.attempted_at >= $2`,
          [student.id, startOfWeek.toISOString()]
        );

        const quizScores: Record<string, number> = {};
        for (const quiz of quizResult.rows) {
          if (quiz.chapter_name && quiz.score !== null && quiz.total_questions) {
            const pct = Math.round((quiz.score / quiz.total_questions) * 100);
            if (!quizScores[quiz.chapter_name] || pct > quizScores[quiz.chapter_name]) {
              quizScores[quiz.chapter_name] = pct;
            }
          }
        }

        const weakAreas = Object.entries(quizScores)
          .filter(([, score]) => score < 60)
          .map(([sub]) => sub);

        const strongAreas = Object.entries(quizScores)
          .filter(([, score]) => score >= 70)
          .map(([sub]) => sub);

        // ─── Generate AI report ───
        const { report, parentTip } = await generateParentReport(
          student.name,
          tasksDone,
          totalTasks,
          student.streak_count || 0,
          student.subjects || [],
          quizScores,
          weakAreas,
          strongAreas,
          student.language_preference || "hinglish"
        );

        // ─── Build HTML email ───
        const html = buildReportEmail({
          studentName: student.name,
          reportContent: report,
          parentTip,
          tasksDone,
          totalTasks,
          streak: student.streak_count || 0,
          weekLabel,
        });

        // ─── Send email ───
        const emailResult = await sendEmail({
          to: student.parent_email,
          subject: `📚 Weekly Update: ${student.name}'s Progress This Week`,
          html,
          tag: "weekly-parent-report",
        });

        // ─── Log report ───
        await pool.query(
          `INSERT INTO padhai_parent_reports
            (student_id, parent_id, week_start_date, report_content, parent_tip, delivery_status)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            student.id,
            student.parent_id,
            weekStartStr,
            report,
            parentTip,
            emailResult.success ? "sent" : "failed",
          ]
        );

        if (emailResult.success) {
          reports.push(student.name);
        } else {
          failed.push({
            student: student.name,
            error: emailResult.error || "Unknown error",
          });
        }
      } catch (err) {
        console.error(`Error for student ${student.name}:`, err);
        failed.push({ student: student.name, error: String(err) });
      }
    }

    return NextResponse.json({
      success: true,
      reportsSent: reports.length,
      failed: failed.length,
      details: { reports, failed },
    });
  } catch (error) {
    console.error("Weekly reports error:", error);
    return NextResponse.json(
      { error: "Failed to send reports" },
      { status: 500 }
    );
  }
}
