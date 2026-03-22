import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";

async function generateUniqueInviteCode(): Promise<string> {
  let code: string;
  let exists = true;
  while (exists) {
    code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const check = await pool.query(
      "SELECT id FROM padhai_students WHERE invite_code = $1",
      [code]
    );
    exists = check.rows.length > 0;
  }
  return code!;
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Please sign in first" },
        { status: 401 }
      );
    }

    const { name, class: studentClass, examTarget } = await req.json();

    if (!name || !studentClass || !examTarget) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Set subjects based on exam target
    let subjects: string[] = [];
    if (examTarget === "JEE") {
      subjects = ["Physics", "Chemistry", "Mathematics"];
    } else if (examTarget === "NEET") {
      subjects = ["Physics", "Chemistry", "Biology"];
    } else {
      subjects = ["Physics", "Chemistry", "Mathematics", "Biology"];
    }

    // Ensure columns exist (safe migration)
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'padhai_students' AND column_name = 'role'
        ) THEN
          ALTER TABLE padhai_students ADD COLUMN role TEXT DEFAULT 'student';
        END IF;
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'padhai_students' AND column_name = 'invite_code'
        ) THEN
          ALTER TABLE padhai_students ADD COLUMN invite_code VARCHAR(10) UNIQUE;
        END IF;
      END $$;
    `);

    // Check if student already exists
    const existing = await pool.query(
      "SELECT id, invite_code FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    let inviteCode: string;

    if (existing.rows.length > 0) {
      inviteCode = existing.rows[0].invite_code || (await generateUniqueInviteCode());
      await pool.query(
        `UPDATE padhai_students
         SET name = $1, class = $2, exam_target = $3, subjects = $4, role = 'student', invite_code = $5
         WHERE email = $6`,
        [name, studentClass, examTarget, JSON.stringify(subjects), inviteCode, session.user.email]
      );
    } else {
      inviteCode = await generateUniqueInviteCode();
      await pool.query(
        `INSERT INTO padhai_students (user_id, name, email, class, exam_target, subjects, role, invite_code)
         VALUES ($1, $2, $3, $4, $5, $6, 'student', $7)`,
        [session.user.id, name, session.user.email, studentClass, examTarget, JSON.stringify(subjects), inviteCode]
      );
    }

    return NextResponse.json({ success: true, inviteCode });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to setup profile" },
      { status: 500 }
    );
  }
}
