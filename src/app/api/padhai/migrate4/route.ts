import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    await pool.query(`
      ALTER TABLE padhai_students ADD COLUMN IF NOT EXISTS syllabus_progress JSONB DEFAULT '{}'
    `);

    return NextResponse.json({ success: true, message: 'Syllabus tracking enabled' });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
