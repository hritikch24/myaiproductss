import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get student
    const studentResult = await pool.query(
      "SELECT id FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const studentId = studentResult.rows[0].id;

    // Get current week's goals
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const goalsResult = await pool.query(
      `SELECT * FROM padhai_weekly_goals 
       WHERE student_id = $1 AND week_start_date = $2`,
      [studentId, startOfWeek.toISOString().split('T')[0]]
    );

    let weeklyGoal = goalsResult.rows[0];
    let tasks: any[] = [];

    if (weeklyGoal) {
      const tasksResult = await pool.query(
        `SELECT gt.*, c.name as chapter_name, c.chapter_order 
         FROM padhai_goal_tasks gt
         LEFT JOIN padhai_chapters c ON gt.chapter_id = c.id
         WHERE gt.weekly_goal_id = $1
         ORDER BY c.chapter_order`,
        [weeklyGoal.id]
      );
      tasks = tasksResult.rows;
    }

    // Get upcoming chapters (not yet completed) for suggestions
    const studentInfo = await pool.query(
      "SELECT class, exam_target, completed_chapters FROM padhai_students WHERE id = $1",
      [studentId]
    );

    const student = studentInfo.rows[0];
    const completedChapters = student.completed_chapters || [];

    const chaptersResult = await pool.query(
      `SELECT c.id, c.name, c.chapter_order, s.name as subject_name
       FROM padhai_chapters c
       JOIN padhai_subjects s ON c.subject_id = s.id
       WHERE c.class = $1 AND c.exam_type IN ('BOTH', $2)
       AND c.id NOT IN (SELECT unnest($3::uuid[]))
       ORDER BY c.chapter_order
       LIMIT 10`,
      [student.class, student.exam_target, completedChapters]
    );

    const suggestedChapters = chaptersResult.rows;

    return NextResponse.json({ 
      weeklyGoal,
      tasks,
      suggestedChapters,
      weekStart: startOfWeek.toISOString().split('T')[0],
      weekEnd: endOfWeek.toISOString().split('T')[0],
    });
  } catch (error) {
    console.error("Get goals error:", error);
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tasks, weekStart } = await req.json();

    // Get student
    const studentResult = await pool.query(
      "SELECT id FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const studentId = studentResult.rows[0].id;

    // Calculate week end
    const startDate = new Date(weekStart);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    // Check if goal exists for this week
    const existingGoal = await pool.query(
      "SELECT id FROM padhai_weekly_goals WHERE student_id = $1 AND week_start_date = $2",
      [studentId, weekStart]
    );

    let goalId;

    if (existingGoal.rows.length > 0) {
      // Update existing goal
      goalId = existingGoal.rows[0].id;
      await pool.query(
        "DELETE FROM padhai_goal_tasks WHERE weekly_goal_id = $1",
        [goalId]
      );
    } else {
      // Create new goal
      const newGoal = await pool.query(
        `INSERT INTO padhai_weekly_goals (student_id, week_start_date, week_end_date, status)
         VALUES ($1, $2, $3, 'active') RETURNING id`,
        [studentId, weekStart, endDate.toISOString().split('T')[0]]
      );
      goalId = newGoal.rows[0].id;
    }

    // Create tasks
    for (const task of tasks) {
      await pool.query(
        `INSERT INTO padhai_goal_tasks (weekly_goal_id, chapter_id, task_description, status)
         VALUES ($1, $2, $3, 'pending')`,
        [goalId, task.chapterId, task.description]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Create goals error:", error);
    return NextResponse.json({ error: "Failed to create goals" }, { status: 500 });
  }
}
