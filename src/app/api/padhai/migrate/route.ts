import { NextResponse } from 'next/server';
import pool from '@/lib/padhai-db';

export async function GET() {
  try {
    // Create tables
    await pool.query(`
      -- Students table
      CREATE TABLE IF NOT EXISTS padhai_students (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id VARCHAR(255),
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          phone VARCHAR(20),
          class VARCHAR(2),
          exam_target VARCHAR(20),
          subjects JSONB DEFAULT '[]',
          streak_count INTEGER DEFAULT 0,
          longest_streak INTEGER DEFAULT 0,
          last_active_date DATE,
          is_premium BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await pool.query(`
      -- Parents table
      CREATE TABLE IF NOT EXISTS padhai_parents (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          student_id UUID REFERENCES padhai_students(id) ON DELETE CASCADE,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          whatsapp_number VARCHAR(20),
          report_frequency VARCHAR(10) DEFAULT 'weekly',
          language_preference VARCHAR(20) DEFAULT 'hinglish',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await pool.query(`
      -- Subjects table
      CREATE TABLE IF NOT EXISTS padhai_subjects (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(100) NOT NULL,
          exam_type VARCHAR(20),
          UNIQUE(name, exam_type)
      );
    `);

    await pool.query(`
      -- Chapters table
      CREATE TABLE IF NOT EXISTS padhai_chapters (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          subject_id UUID REFERENCES padhai_subjects(id) ON DELETE CASCADE,
          name VARCHAR(255) NOT NULL,
          class VARCHAR(2),
          chapter_order INTEGER,
          estimated_hours INTEGER,
          exam_type VARCHAR(20) DEFAULT 'BOTH'
      );
    `);

    await pool.query(`
      -- Weekly goals table
      CREATE TABLE IF NOT EXISTS padhai_weekly_goals (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          student_id UUID REFERENCES padhai_students(id) ON DELETE CASCADE,
          week_start_date DATE NOT NULL,
          week_end_date DATE NOT NULL,
          status VARCHAR(20) DEFAULT 'active',
          completion_percentage FLOAT DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(student_id, week_start_date)
      );
    `);

    await pool.query(`
      -- Goal tasks table
      CREATE TABLE IF NOT EXISTS padhai_goal_tasks (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          weekly_goal_id UUID REFERENCES padhai_weekly_goals(id) ON DELETE CASCADE,
          chapter_id UUID REFERENCES padhai_chapters(id) ON DELETE SET NULL,
          task_description TEXT,
          status VARCHAR(20) DEFAULT 'pending',
          marked_done_at TIMESTAMP WITH TIME ZONE,
          quiz_score FLOAT,
          quiz_taken BOOLEAN DEFAULT false
      );
    `);

    await pool.query(`
      -- Study photos table
      CREATE TABLE IF NOT EXISTS padhai_study_photos (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          student_id UUID REFERENCES padhai_students(id) ON DELETE CASCADE,
          photo_url TEXT NOT NULL,
          uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          auto_delete_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days')
      );
    `);

    await pool.query(`
      -- Quiz attempts table
      CREATE TABLE IF NOT EXISTS padhai_quiz_attempts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          student_id UUID REFERENCES padhai_students(id) ON DELETE CASCADE,
          chapter_id UUID REFERENCES padhai_chapters(id) ON DELETE SET NULL,
          questions JSONB NOT NULL,
          score FLOAT,
          total_questions INTEGER,
          time_limit_per_question_seconds INTEGER DEFAULT 10,
          attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          verification_status VARCHAR(20) DEFAULT 'genuine'
      );
    `);

    await pool.query(`
      -- Parent reports table
      CREATE TABLE IF NOT EXISTS padhai_parent_reports (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          student_id UUID REFERENCES padhai_students(id) ON DELETE CASCADE,
          parent_id UUID REFERENCES padhai_parents(id) ON DELETE CASCADE,
          week_start_date DATE NOT NULL,
          report_content TEXT,
          parent_tip TEXT,
          sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          delivery_status VARCHAR(20) DEFAULT 'sent'
      );
    `);

    // Create indexes
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_padhai_students_email ON padhai_students(email);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_padhai_students_user_id ON padhai_students(user_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_padhai_parents_student_id ON padhai_parents(student_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_padhai_chapters_subject_id ON padhai_chapters(subject_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_padhai_weekly_goals_student_id ON padhai_weekly_goals(student_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_padhai_goal_tasks_weekly_goal_id ON padhai_goal_tasks(weekly_goal_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_padhai_study_photos_student_id ON padhai_study_photos(student_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_padhai_quiz_attempts_student_id ON padhai_quiz_attempts(student_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_padhai_parent_reports_student_id ON padhai_parent_reports(student_id);`);

    return NextResponse.json({ success: true, message: 'Padhai tables created successfully' });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
