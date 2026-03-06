import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { parentName, parentEmail, whatsappNumber, language } = await req.json();

    if (!parentName || !parentEmail) {
      return NextResponse.json({ error: "Parent name and email required" }, { status: 400 });
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

    // Check if parent already exists
    const existingParent = await pool.query(
      "SELECT id FROM padhai_parents WHERE student_id = $1",
      [studentId]
    );

    if (existingParent.rows.length > 0) {
      // Update existing parent
      await pool.query(
        `UPDATE padhai_parents 
         SET name = $1, email = $2, whatsapp_number = $3, language_preference = $4
         WHERE student_id = $5`,
        [parentName, parentEmail, whatsappNumber || null, language || 'hinglish', studentId]
      );
    } else {
      // Create new parent
      await pool.query(
        `INSERT INTO padhai_parents (student_id, name, email, whatsapp_number, language_preference)
         VALUES ($1, $2, $3, $4, $5)`,
        [studentId, parentName, parentEmail, whatsappNumber || null, language || 'hinglish']
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Parent setup error:", error);
    return NextResponse.json({ error: "Failed to setup parent" }, { status: 500 });
  }
}

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
      return NextResponse.json({ parent: null });
    }

    const studentId = studentResult.rows[0].id;

    // Get parent info
    const parentResult = await pool.query(
      "SELECT * FROM padhai_parents WHERE student_id = $1",
      [studentId]
    );

    return NextResponse.json({ parent: parentResult.rows[0] || null });
  } catch (error) {
    console.error("Get parent error:", error);
    return NextResponse.json({ error: "Failed to get parent" }, { status: 500 });
  }
}
