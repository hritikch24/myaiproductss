import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await pool.query(
      "SELECT * FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ student: null });
    }

    const student = result.rows[0];
    
    // Get parent info if exists
    const parentResult = await pool.query(
      "SELECT * FROM padhai_parents WHERE student_id = $1",
      [student.id]
    );

    return NextResponse.json({ 
      student: {
        ...student,
        parent: parentResult.rows[0] || null,
      }
    });
  } catch (error) {
    console.error("Get student error:", error);
    return NextResponse.json({ error: "Failed to fetch student" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await req.json();
    
    // Build update query dynamically
    const allowedFields = ['name', 'class', 'exam_target', 'board', 'subjects'];
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = $${paramIndex}`);
        updateValues.push(value);
        paramIndex++;
      }
    }

    if (updateFields.length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    updateValues.push(session.user.email);

    const result = await pool.query(
      `UPDATE padhai_students SET ${updateFields.join(', ')} WHERE email = $${paramIndex} RETURNING *`,
      updateValues
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ student: result.rows[0] });
  } catch (error) {
    console.error("Update student error:", error);
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 });
  }
}
