-- Site stats table for tracking visits and user logins
CREATE TABLE IF NOT EXISTS site_stats (
  id SERIAL PRIMARY KEY,
  stat_type VARCHAR(50) NOT NULL, -- 'page_view', 'user_login', 'document_created'
  page_path VARCHAR(255),
  source VARCHAR(255), -- referrer/source
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_stats_type ON site_stats(stat_type);
CREATE INDEX IF NOT EXISTS idx_site_stats_created ON site_stats(created_at);

-- Function to track a stat
CREATE OR REPLACE FUNCTION track_stat(p_stat_type VARCHAR, p_page_path VARCHAR DEFAULT NULL, p_source VARCHAR DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
  INSERT INTO site_stats (stat_type, page_path, source)
  VALUES (p_stat_type, p_page_path, p_source);
END;
$$ LANGUAGE plpgsql;
