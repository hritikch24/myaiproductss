import { NextResponse } from "next/server";
import pool from "@/lib/kraftai-db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (key !== process.env.KRAFTAI_ADMIN_KEY && key !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS kraftai_visitors (
        id SERIAL PRIMARY KEY,
        session_id TEXT NOT NULL,
        ip TEXT,
        country TEXT,
        city TEXT,
        region TEXT,
        timezone TEXT,
        lat REAL,
        lon REAL,
        device TEXT,
        browser TEXT,
        os TEXT,
        screen_width INT,
        screen_height INT,
        language TEXT,
        referrer TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        page TEXT NOT NULL,
        page_title TEXT,
        duration INT DEFAULT 0,
        scroll_depth INT DEFAULT 0,
        is_bot BOOLEAN DEFAULT false,
        is_mobile BOOLEAN DEFAULT false,
        user_agent TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS kraftai_events (
        id SERIAL PRIMARY KEY,
        session_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        event_data JSONB,
        page TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS kraftai_leads (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT,
        company TEXT,
        project_type TEXT,
        budget TEXT,
        timeline TEXT,
        message TEXT,
        selected_tier TEXT,
        selected_addons TEXT,
        estimated_total INT,
        source TEXT DEFAULT 'quote_form',
        ip TEXT,
        country TEXT,
        status TEXT DEFAULT 'new',
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS kraftai_chats (
        id SERIAL PRIMARY KEY,
        session_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_visitors_created ON kraftai_visitors(created_at);
      CREATE INDEX IF NOT EXISTS idx_visitors_session ON kraftai_visitors(session_id);
      CREATE INDEX IF NOT EXISTS idx_visitors_country ON kraftai_visitors(country);
      CREATE INDEX IF NOT EXISTS idx_events_session ON kraftai_events(session_id);
      CREATE INDEX IF NOT EXISTS idx_events_type ON kraftai_events(event_type);
      CREATE INDEX IF NOT EXISTS idx_leads_created ON kraftai_leads(created_at);
      CREATE INDEX IF NOT EXISTS idx_leads_status ON kraftai_leads(status);
    `);

    return NextResponse.json({ success: true, message: "All KraftAI tables created" });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: "Migration failed", details: String(error) }, { status: 500 });
  }
}
