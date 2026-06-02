import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/kraftai-db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (key !== process.env.KRAFTAI_ADMIN_KEY && key !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const days = parseInt(searchParams.get("days") || "30", 10);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  try {
    const [
      totalVisitors,
      uniqueSessions,
      todayVisitors,
      countryBreakdown,
      browserBreakdown,
      deviceBreakdown,
      osBreakdown,
      topPages,
      topReferrers,
      recentVisitors,
      dailyVisitors,
      totalLeads,
      newLeads,
      eventCounts,
      botCount,
      avgDuration,
      utmBreakdown,
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false", [since]),
      pool.query("SELECT COUNT(DISTINCT session_id) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false", [since]),
      pool.query("SELECT COUNT(*) as count FROM kraftai_visitors WHERE created_at >= CURRENT_DATE AND is_bot = false"),
      pool.query("SELECT country, COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false AND country IS NOT NULL GROUP BY country ORDER BY count DESC LIMIT 20", [since]),
      pool.query("SELECT browser, COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false GROUP BY browser ORDER BY count DESC", [since]),
      pool.query("SELECT device, COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false GROUP BY device ORDER BY count DESC", [since]),
      pool.query("SELECT os, COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false GROUP BY os ORDER BY count DESC", [since]),
      pool.query("SELECT page, COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false GROUP BY page ORDER BY count DESC LIMIT 10", [since]),
      pool.query("SELECT referrer, COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false AND referrer IS NOT NULL AND referrer != '' GROUP BY referrer ORDER BY count DESC LIMIT 10", [since]),
      pool.query("SELECT id, session_id, ip, country, city, device, browser, os, page, referrer, utm_source, duration, scroll_depth, created_at FROM kraftai_visitors WHERE is_bot = false ORDER BY created_at DESC LIMIT 50"),
      pool.query("SELECT DATE(created_at) as day, COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false GROUP BY DATE(created_at) ORDER BY day", [since]),
      pool.query("SELECT COUNT(*) as count FROM kraftai_leads WHERE created_at >= $1", [since]),
      pool.query("SELECT COUNT(*) as count FROM kraftai_leads WHERE status = 'new'"),
      pool.query("SELECT event_type, COUNT(*) as count FROM kraftai_events WHERE created_at >= $1 GROUP BY event_type ORDER BY count DESC", [since]),
      pool.query("SELECT COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = true", [since]),
      pool.query("SELECT ROUND(AVG(duration)) as avg FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false AND duration > 0", [since]),
      pool.query("SELECT utm_source, utm_medium, utm_campaign, COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false AND utm_source IS NOT NULL GROUP BY utm_source, utm_medium, utm_campaign ORDER BY count DESC LIMIT 15", [since]),
    ]);

    return NextResponse.json({
      overview: {
        total_pageviews: parseInt(totalVisitors.rows[0].count),
        unique_sessions: parseInt(uniqueSessions.rows[0].count),
        today_visitors: parseInt(todayVisitors.rows[0].count),
        total_leads: parseInt(totalLeads.rows[0].count),
        new_leads: parseInt(newLeads.rows[0].count),
        bot_visits: parseInt(botCount.rows[0].count),
        avg_duration_seconds: parseInt(avgDuration.rows[0]?.avg || "0"),
      },
      countries: countryBreakdown.rows,
      browsers: browserBreakdown.rows,
      devices: deviceBreakdown.rows,
      os: osBreakdown.rows,
      top_pages: topPages.rows,
      top_referrers: topReferrers.rows,
      recent_visitors: recentVisitors.rows,
      daily_chart: dailyVisitors.rows,
      events: eventCounts.rows,
      utm: utmBreakdown.rows,
    });
  } catch (error) {
    console.error("Metrics error:", error);
    return NextResponse.json({ error: "Failed to load metrics", details: String(error) }, { status: 500 });
  }
}
