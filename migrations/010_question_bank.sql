-- Pre-generated question bank to avoid Gemini rate limits
CREATE TABLE IF NOT EXISTS padhai_question_bank (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  chapter_id UUID REFERENCES padhai_chapters(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- ["A) ...", "B) ...", "C) ...", "D) ..."]
  correct_answer TEXT NOT NULL, -- "A", "B", "C", or "D"
  difficulty TEXT NOT NULL DEFAULT 'medium', -- easy, medium, hard
  exam_target TEXT NOT NULL DEFAULT 'BOTH', -- JEE, NEET, BOTH, BOARDS_ONLY
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_question_bank_chapter ON padhai_question_bank(chapter_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_difficulty ON padhai_question_bank(chapter_id, difficulty);
