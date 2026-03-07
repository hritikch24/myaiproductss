import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { generateParentReport } from "@/lib/padhai/reports";

export async function POST(req: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      return NextResponse.json({ error: "Resend API key not configured" }, { status: 500 });
    }

    // Get all students with parents
    const studentsResult = await pool.query(
      `SELECT s.*, p.name as parent_name, p.email as parent_email, p.language_preference 
       FROM padhai_students s
       JOIN padhai_parents p ON s.id = p.student_id`
    );

    const reports = [];
    const failed = [];

    for (const student of studentsResult.rows) {
      try {
        // Get this week's stats
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + 1);

        // Get weekly tasks
        const goalsResult = await pool.query(
          `SELECT * FROM padhai_weekly_goals 
           WHERE student_id = $1 AND week_start_date = $2`,
          [student.id, startOfWeek.toISOString().split('T')[0]]
        );

        let tasksDone = 0;
        let totalTasks = 0;
        
        if (goalsResult.rows[0]) {
          const tasksResult = await pool.query(
            "SELECT status FROM padhai_goal_tasks WHERE weekly_goal_id = $1",
            [goalsResult.rows[0].id]
          );
          totalTasks = tasksResult.rows.length;
          tasksDone = tasksResult.rows.filter(t => t.status === 'done').length;
        }

        // Get quiz scores
        const quizResult = await pool.query(
          `SELECT q.score, c.name as chapter_name
           FROM padhai_quiz_attempts q
           JOIN padhai_chapters c ON q.chapter_id = c.id
           WHERE q.student_id = $1 AND q.attempted_at >= $2`,
          [student.id, startOfWeek.toISOString()]
        );

        const quizScores: Record<string, number> = {};
        for (const quiz of quizResult.rows) {
          if (quiz.chapter_name && quiz.score !== null) {
            // Extract subject from chapter name (simplified)
            const subject = quiz.chapter_name;
            if (!quizScores[subject] || quiz.score > quizScores[subject]) {
              quizScores[subject] = quiz.score;
            }
          }
        }

        // Determine weak/strong areas
        const weakAreas = Object.entries(quizScores)
          .filter(([_, score]) => score < 60)
          .map(([sub]) => sub);
        
        const strongAreas = Object.entries(quizScores)
          .filter(([_, score]) => score >= 70)
          .map(([sub]) => sub);

        // Generate report using Gemini
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

        // Send email via Resend
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Padhai <onboarding@resend.dev>",
            to: [student.parent_email],
            subject: `📚 Weekly Update: ${student.name}'s Progress This Week`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                  <h1 style="color: white; margin: 0;">📚 Weekly Update</h1>
                </div>
                <div style="background: #f8fafc; padding: 20px; border-radius: 10px;">
                  ${report.replace(/\n/g, '<br>')}
                </div>
                <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
                  Sent from Padhai — Building study habits that last 🌱
                </p>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json();
          console.error("Resend error:", errorData);
          failed.push({ student: student.name, error: errorData.message });
        } else {
          // Log the report
          await pool.query(
            `INSERT INTO padhai_parent_reports (student_id, parent_id, week_start_date, report_content, parent_tip, delivery_status)
             VALUES ($1, (SELECT id FROM padhai_parents WHERE student_id = $1), $2, $3, $4, 'sent')`,
            [student.id, startOfWeek.toISOString().split('T')[0], report, parentTip]
          );
          reports.push(student.name);
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
    return NextResponse.json({ error: "Failed to send reports" }, { status: 500 });
  }
}
