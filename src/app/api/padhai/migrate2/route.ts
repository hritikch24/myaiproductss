import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Add completed_chapters column if not exists
    await pool.query(`
      ALTER TABLE padhai_students ADD COLUMN IF NOT EXISTS completed_chapters JSONB DEFAULT '[]'
    `);

    return NextResponse.json({ success: true, message: 'Column added' });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
