import { NextResponse } from 'next/server';
import pool from '@/lib/padhai-db';

export async function GET() {
  try {
    // Create users table for authentication
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        image VARCHAR(500),
        google_id VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Add password_hash column to padhai_students if it doesn't exist
    await pool.query(`
      ALTER TABLE padhai_students 
      ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
    `);

    // Add user_id column if not exists  
    await pool.query(`
      ALTER TABLE padhai_students
      ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id);
    `);

    // Add profile_image column
    await pool.query(`
      ALTER TABLE padhai_students
      ADD COLUMN IF NOT EXISTS profile_image TEXT;
    `);

    // Add completed_chapters column
    await pool.query(`
      ALTER TABLE padhai_students
      ADD COLUMN IF NOT EXISTS completed_chapters JSONB DEFAULT '[]';
    `);

    return NextResponse.json({ success: true, message: 'Auth tables created' });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
