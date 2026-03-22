import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";

// Public API — no auth required. Parent enters invite code to see child's progress.
export async function POST(req: NextRequest) {
  try {
    const { inviteCode } = await req.json();

    if (!inviteCode || inviteCode.trim().length < 5) {
      return NextResponse.json(
        { error: "Please enter a valid invite code" },
        { status: 400 }
      );
    }

    // Find student by invite code
    const studentResult = await pool.query(
      `SELECT id, name, class, exam_target, subjects, streak_count, longest_streak,
              last_active_date, completed_chapters, created_at
       FROM padhai_students
       WHERE invite_code = $1 AND (role = 'student' OR role IS NULL)`,
      [inviteCode.trim()]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid code. Please check with your child and try again." },
        { status: 404 }
      );
    }

    const student = studentResult.rows[0];
    const studentId = student.id;
    const completed = student.completed_chapters || [];

    // --- Overall Progress ---
    const chaptersResult = await pool.query(
      `SELECT c.id, c.name, c.estimated_hours, c.class, s.name as subject_name
       FROM padhai_chapters c
       JOIN padhai_subjects s ON c.subject_id = s.id
       WHERE c.class = $1 AND c.exam_type IN ('BOTH', $2)
       ORDER BY s.name, c.chapter_order`,
      [String(student.class), student.exam_target]
    );

    const totalChapters = chaptersResult.rows.length;
    const completedCount = chaptersResult.rows.filter((c: any) =>
      completed.includes(c.id)
    ).length;
    const totalHours = chaptersResult.rows.reduce(
      (sum: number, c: any) => sum + (c.estimated_hours || 0),
      0
    );
    const completedHours = chaptersResult.rows
      .filter((c: any) => completed.includes(c.id))
      .reduce((sum: number, c: any) => sum + (c.estimated_hours || 0), 0);

    const subjectProgress: Record<
      string,
      { completed: number; total: number }
    > = {};
    for (const chapter of chaptersResult.rows) {
      if (!subjectProgress[chapter.subject_name]) {
        subjectProgress[chapter.subject_name] = { completed: 0, total: 0 };
      }
      subjectProgress[chapter.subject_name].total++;
      if (completed.includes(chapter.id)) {
        subjectProgress[chapter.subject_name].completed++;
      }
    }

    // --- This Week's Goals ---
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    const weekStartStr = startOfWeek.toISOString().split("T")[0];

    const weekGoalResult = await pool.query(
      `SELECT * FROM padhai_weekly_goals
       WHERE student_id = $1 AND week_start_date = $2`,
      [studentId, weekStartStr]
    );

    let weeklyTasks: any[] = [];
    let weeklyGoal = weekGoalResult.rows[0] || null;

    if (weeklyGoal) {
      const tasksResult = await pool.query(
        `SELECT gt.status, gt.task_description, gt.quiz_score, c.name as chapter_name
         FROM padhai_goal_tasks gt
         LEFT JOIN padhai_chapters c ON gt.chapter_id = c.id
         WHERE gt.weekly_goal_id = $1
         ORDER BY c.chapter_order`,
        [weeklyGoal.id]
      );
      weeklyTasks = tasksResult.rows;
    }

    // --- Last 4 Weeks (Monthly view) ---
    const fourWeeksAgo = new Date(today);
    fourWeeksAgo.setDate(today.getDate() - 28);

    const monthGoalsResult = await pool.query(
      `SELECT wg.week_start_date, wg.completion_percentage, wg.status,
              COUNT(gt.id) as total_tasks,
              COUNT(CASE WHEN gt.status = 'done' THEN 1 END) as done_tasks
       FROM padhai_weekly_goals wg
       LEFT JOIN padhai_goal_tasks gt ON gt.weekly_goal_id = wg.id
       WHERE wg.student_id = $1 AND wg.week_start_date >= $2
       GROUP BY wg.id
       ORDER BY wg.week_start_date DESC`,
      [studentId, fourWeeksAgo.toISOString().split("T")[0]]
    );

    // --- Recent Quiz Attempts ---
    const quizResult = await pool.query(
      `SELECT qa.score, qa.total_questions, qa.attempted_at, c.name as chapter_name
       FROM padhai_quiz_attempts qa
       LEFT JOIN padhai_chapters c ON qa.chapter_id = c.id
       WHERE qa.student_id = $1
       ORDER BY qa.attempted_at DESC
       LIMIT 10`,
      [studentId]
    );

    // --- Recent Study Photos (last 7 days) ---
    const photosResult = await pool.query(
      `SELECT photo_url, uploaded_at
       FROM padhai_study_photos
       WHERE student_id = $1 AND uploaded_at >= NOW() - INTERVAL '7 days'
       ORDER BY uploaded_at DESC
       LIMIT 20`,
      [studentId]
    );

    // --- Activity: photos per day for last 30 days ---
    const activityResult = await pool.query(
      `SELECT DATE(uploaded_at AT TIME ZONE 'Asia/Kolkata') as day, COUNT(*) as count
       FROM padhai_study_photos
       WHERE student_id = $1 AND uploaded_at >= NOW() - INTERVAL '30 days'
       GROUP BY day
       ORDER BY day DESC`,
      [studentId]
    );

    return NextResponse.json({
      student: {
        name: student.name,
        class: student.class,
        examTarget: student.exam_target,
        subjects: student.subjects,
        streakCount: student.streak_count || 0,
        longestStreak: student.longest_streak || 0,
        lastActive: student.last_active_date,
        memberSince: student.created_at,
      },
      overall: {
        totalChapters,
        completedChapters: completedCount,
        progressPercent:
          totalChapters > 0
            ? Math.round((completedCount / totalChapters) * 100)
            : 0,
        totalHours,
        completedHours,
        remainingHours: totalHours - completedHours,
        subjectProgress,
      },
      thisWeek: {
        goal: weeklyGoal
          ? {
              completionPercent: weeklyGoal.completion_percentage || 0,
              status: weeklyGoal.status,
            }
          : null,
        tasks: weeklyTasks,
      },
      monthly: monthGoalsResult.rows.map((r: any) => ({
        weekStart: r.week_start_date,
        completionPercent: r.completion_percentage || 0,
        status: r.status,
        totalTasks: Number(r.total_tasks),
        doneTasks: Number(r.done_tasks),
      })),
      quizzes: quizResult.rows.map((q: any) => ({
        chapter: q.chapter_name,
        score: q.score,
        total: q.total_questions,
        date: q.attempted_at,
      })),
      photos: photosResult.rows.map((p: any) => ({
        url: p.photo_url,
        date: p.uploaded_at,
      })),
      activity: activityResult.rows.map((a: any) => ({
        day: a.day,
        count: Number(a.count),
      })),
    });
  } catch (error) {
    console.error("Track API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
