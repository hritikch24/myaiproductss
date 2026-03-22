import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";

// POST: Parent enters invite code → gets linked to student
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { inviteCode, parentName } = await req.json();

    if (!inviteCode || !parentName) {
      return NextResponse.json(
        { error: "Invite code and your name are required" },
        { status: 400 }
      );
    }

    // Find student by invite code
    const studentResult = await pool.query(
      "SELECT id, name, class, exam_target, subjects FROM padhai_students WHERE invite_code = $1",
      [inviteCode.trim()]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid code. Please check with your child and try again." },
        { status: 404 }
      );
    }

    const student = studentResult.rows[0];

    // Check if this parent is already linked to this student
    const existingLink = await pool.query(
      "SELECT id FROM padhai_parents WHERE student_id = $1 AND parent_user_id = $2",
      [student.id, session.user.id || session.user.email]
    );

    if (existingLink.rows.length > 0) {
      // Already linked — just update name
      await pool.query(
        "UPDATE padhai_parents SET name = $1, email = $2 WHERE student_id = $3 AND parent_user_id = $4",
        [parentName, session.user.email, student.id, session.user.id || session.user.email]
      );
    } else {
      // Check if another parent record exists (student may have added parent email manually)
      const existingParent = await pool.query(
        "SELECT id FROM padhai_parents WHERE student_id = $1",
        [student.id]
      );

      if (existingParent.rows.length > 0) {
        // Update existing record with parent's auth info
        await pool.query(
          "UPDATE padhai_parents SET name = $1, email = $2, parent_user_id = $3 WHERE student_id = $4",
          [parentName, session.user.email, session.user.id || session.user.email, student.id]
        );
      } else {
        // Create new parent link
        await pool.query(
          `INSERT INTO padhai_parents (student_id, name, email, parent_user_id)
           VALUES ($1, $2, $3, $4)`,
          [student.id, parentName, session.user.email, session.user.id || session.user.email]
        );
      }
    }

    // Create a padhai_students record for the parent user so they have a dashboard
    const parentStudentExists = await pool.query(
      "SELECT id FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (parentStudentExists.rows.length === 0) {
      // Generate invite code for the parent record (won't be used but keeps schema consistent)
      let code: string;
      let codeExists = true;
      while (codeExists) {
        code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const check = await pool.query(
          "SELECT id FROM padhai_students WHERE invite_code = $1",
          [code]
        );
        codeExists = check.rows.length > 0;
      }

      await pool.query(
        `INSERT INTO padhai_students (user_id, name, email, class, exam_target, subjects, role, invite_code)
         VALUES ($1, $2, $3, $4, $5, $6, 'parent', $7)`,
        [
          session.user.id,
          student.name, // Store child's name so dashboard can reference it
          session.user.email,
          student.class,
          student.exam_target,
          JSON.stringify(student.subjects || []),
          code!,
        ]
      );
    } else {
      // Update existing record to parent role and link to child's data
      await pool.query(
        `UPDATE padhai_students
         SET role = 'parent', name = $1, class = $2, exam_target = $3, subjects = $4
         WHERE email = $5`,
        [student.name, student.class, student.exam_target, JSON.stringify(student.subjects || []), session.user.email]
      );
    }

    return NextResponse.json({
      success: true,
      studentName: student.name,
      studentClass: student.class,
      examTarget: student.exam_target,
    });
  } catch (error) {
    console.error("Link parent error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
