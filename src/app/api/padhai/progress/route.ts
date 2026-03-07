import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentResult = await pool.query(
      "SELECT * FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const student = studentResult.rows[0];

    const chaptersResult = await pool.query(
      `SELECT c.id, c.name, c.estimated_hours, c.class, s.name as subject_name 
       FROM padhai_chapters c
       JOIN padhai_subjects s ON c.subject_id = s.id
       WHERE c.exam_type IN ('BOTH', $1)
       ORDER BY s.name, c.chapter_order`,
      [student.exam_target]
    );

    const completed = student.completed_chapters || [];
    const totalChapters = chaptersResult.rows.length;
    const completedCount = chaptersResult.rows.filter(c => completed.includes(c.id)).length;
    
    const totalHours = chaptersResult.rows.reduce((sum, c) => sum + (c.estimated_hours || 0), 0);
    const completedHours = chaptersResult.rows
      .filter(c => completed.includes(c.id))
      .reduce((sum, c) => sum + (c.estimated_hours || 0), 0);
    
    const remainingHours = totalHours - completedHours;
    
    const weeksActive = Math.max(1, student.streak_count || 1);
    const avgHoursPerWeek = Math.round(completedHours / weeksActive);
    const estimatedWeeksLeft = avgHoursPerWeek > 0 ? Math.ceil(remainingHours / avgHoursPerWeek) : remainingHours;

    const subjectProgress: Record<string, { completed: number; total: number; hoursLeft: number }> = {};
    for (const chapter of chaptersResult.rows) {
      if (!subjectProgress[chapter.subject_name]) {
        subjectProgress[chapter.subject_name] = { completed: 0, total: 0, hoursLeft: 0 };
      }
      subjectProgress[chapter.subject_name].total++;
      if (completed.includes(chapter.id)) {
        subjectProgress[chapter.subject_name].completed++;
      } else {
        subjectProgress[chapter.subject_name].hoursLeft += chapter.estimated_hours || 0;
      }
    }

    return NextResponse.json({
      totalChapters,
      completedChapters: completedCount,
      progressPercent: Math.round((completedCount / totalChapters) * 100),
      totalHours,
      completedHours,
      remainingHours,
      estimatedWeeksLeft,
      avgHoursPerWeek,
      subjectProgress,
    });
  } catch (error) {
    console.error("Get progress error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}
