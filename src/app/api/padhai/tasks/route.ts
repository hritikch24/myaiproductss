import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { taskId, status, quizScore, quizTaken } = body;

    // Get student
    const studentResult = await pool.query(
      "SELECT id FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const studentId = studentResult.rows[0].id;

    // Update task
    if (taskId) {
      const markedDoneAt = status === 'done' ? new Date() : null;
      
      await pool.query(
        `UPDATE padhai_goal_tasks 
         SET status = $1, marked_done_at = $2, quiz_score = $3, quiz_taken = $4
         WHERE id = $5 AND weekly_goal_id IN (
           SELECT id FROM padhai_weekly_goals WHERE student_id = $6
         )`,
        [status, markedDoneAt, quizScore, quizTaken, taskId, studentId]
      );
    }

    // Update streak if task is marked as done
    if (status === 'done') {
      const today = new Date().toISOString().split('T')[0];
      
      // Update streak
      const student = await pool.query(
        "SELECT streak_count, longest_streak, last_active_date FROM padhai_students WHERE id = $1",
        [studentId]
      );

      const currentStreak = student.rows[0]?.streak_count || 0;
      const lastActive = student.rows[0]?.last_active_date;
      const longestStreak = student.rows[0]?.longest_streak || 0;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = currentStreak;
      
      if (lastActive === yesterdayStr) {
        newStreak = currentStreak + 1;
      } else if (lastActive !== today) {
        newStreak = 1;
      }

      const newLongest = Math.max(longestStreak, newStreak);

      await pool.query(
        `UPDATE padhai_students 
         SET streak_count = $1, longest_streak = $2, last_active_date = $3
         WHERE id = $4`,
        [newStreak, newLongest, today, studentId]
      );

      // Update weekly goal completion percentage
      await pool.query(
        `UPDATE padhai_weekly_goals wg
         SET completion_percentage = (
           SELECT (COUNT(*) * 100.0 / NULLIF(COUNT(*), 0))
           FROM padhai_goal_tasks gt
           WHERE gt.weekly_goal_id = wg.id AND gt.status = 'done'
         )
         WHERE wg.student_id = $1
         AND wg.week_start_date <= $2
         AND wg.week_end_date >= $2`,
        [studentId, today]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update task error:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
