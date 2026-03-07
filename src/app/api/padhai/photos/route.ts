import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { photoUrl } = await req.json();

    if (!photoUrl) {
      return NextResponse.json({ error: "Photo URL required" }, { status: 400 });
    }

    const studentResult = await pool.query(
      "SELECT id FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const studentId = studentResult.rows[0].id;

    const autoDeleteAt = new Date();
    autoDeleteAt.setDate(autoDeleteAt.getDate() + 7);

    await pool.query(
      `INSERT INTO padhai_study_photos (student_id, photo_url, auto_delete_at)
       VALUES ($1, $2, $3)`,
      [studentId, photoUrl, autoDeleteAt]
    );

    const today = new Date().toISOString().split('T')[0];
    
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

    return NextResponse.json({ 
      success: true,
      streak: newStreak
    });
  } catch (error) {
    console.error("Photo upload error:", error);
    return NextResponse.json({ error: "Failed to upload photo" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentResult = await pool.query(
      "SELECT id, streak_count FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const studentId = studentResult.rows[0].id;
    const streak = studentResult.rows[0].streak_count || 0;

    const today = new Date().toISOString().split('T')[0];

    const photoResult = await pool.query(
      `SELECT * FROM padhai_study_photos 
       WHERE student_id = $1 AND DATE(uploaded_at::timestamptz AT TIME ZONE 'Asia/Kolkata') = $2
       LIMIT 1`,
      [studentId, today]
    );

    return NextResponse.json({ 
      uploadedToday: photoResult.rows.length > 0,
      streak
    });
  } catch (error) {
    console.error("Get status error:", error);
    return NextResponse.json({ error: "Failed to get status" }, { status: 500 });
  }
}
