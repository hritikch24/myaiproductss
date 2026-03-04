-- Padhai Database Schema
-- Phase 1: Core tables for student tracking and parent accountability

-- Students table
CREATE TABLE IF NOT EXISTS padhai_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) REFERENCES users(id), -- Link to existing kraftai users
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    class VARCHAR(2) CHECK (class IN ('11', '12')),
    exam_target VARCHAR(20) CHECK (exam_target IN ('JEE', 'NEET', 'BOARDS_ONLY')),
    subjects JSONB DEFAULT '[]',
    streak_count INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_active_date DATE,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parents table
CREATE TABLE IF NOT EXISTS padhai_parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES padhai_students(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    whatsapp_number VARCHAR(20),
    report_frequency VARCHAR(10) DEFAULT 'weekly' CHECK (report_frequency IN ('weekly', 'daily')),
    language_preference VARCHAR(20) DEFAULT 'hinglish' CHECK (language_preference IN ('english', 'hindi', 'hinglish')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS padhai_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    exam_type VARCHAR(20) CHECK (exam_type IN ('JEE', 'NEET', 'BOTH')),
    UNIQUE(name, exam_type)
);

-- Chapters table
CREATE TABLE IF NOT EXISTS padhai_chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID REFERENCES padhai_subjects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    class VARCHAR(2) CHECK (class IN ('11', '12')),
    chapter_order INTEGER,
    estimated_hours INTEGER,
    exam_type VARCHAR(20) DEFAULT 'BOTH' CHECK (exam_type IN ('JEE', 'NEET', 'BOTH'))
);

-- Weekly goals table
CREATE TABLE IF NOT EXISTS padhai_weekly_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES padhai_students(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    week_end_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'missed')),
    completion_percentage FLOAT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, week_start_date)
);

-- Goal tasks table
CREATE TABLE IF NOT EXISTS padhai_goal_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    weekly_goal_id UUID REFERENCES padhai_weekly_goals(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES padhai_chapters(id) ON DELETE SET NULL,
    task_description TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'done', 'skipped')),
    marked_done_at TIMESTAMP WITH TIME ZONE,
    quiz_score FLOAT,
    quiz_taken BOOLEAN DEFAULT false
);

-- Study photos table
CREATE TABLE IF NOT EXISTS padhai_study_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES padhai_students(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    auto_delete_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days')
);

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
    verification_status VARCHAR(20) DEFAULT 'genuine' CHECK (verification_status IN ('genuine', 'partial', 'suspicious'))
);

-- Parent reports table
CREATE TABLE IF NOT EXISTS padhai_parent_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES padhai_students(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES padhai_parents(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    report_content TEXT,
    parent_tip TEXT,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivery_status VARCHAR(20) DEFAULT 'sent' CHECK (delivery_status IN ('sent', 'delivered', 'failed'))
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_padhai_students_email ON padhai_students(email);
CREATE INDEX IF NOT EXISTS idx_padhai_students_user_id ON padhai_students(user_id);
CREATE INDEX IF NOT EXISTS idx_padhai_parents_student_id ON padhai_parents(student_id);
CREATE INDEX IF NOT EXISTS idx_padhai_chapters_subject_id ON padhai_chapters(subject_id);
CREATE INDEX IF NOT EXISTS idx_padhai_weekly_goals_student_id ON padhai_weekly_goals(student_id);
CREATE INDEX IF NOT EXISTS idx_padhai_goal_tasks_weekly_goal_id ON padhai_goal_tasks(weekly_goal_id);
CREATE INDEX IF NOT EXISTS idx_padhai_study_photos_student_id ON padhai_study_photos(student_id);
CREATE INDEX IF NOT EXISTS idx_padhai_quiz_attempts_student_id ON padhai_quiz_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_padhai_parent_reports_student_id ON padhai_parent_reports(student_id);
