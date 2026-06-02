import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/kraftai-db";

function isAuthorized(req: NextRequest): boolean {
  const adminKey = process.env.KRAFTAI_ADMIN_KEY || "admin";
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const [scheme, token] = authHeader.split(" ");
    if (scheme === "Bearer" && token === adminKey) return true;
  }
  const key = new URL(req.url).searchParams.get("key");
  return key === adminKey;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const hoursParam = searchParams.get("hours");
  const daysParam = parseInt(searchParams.get("days") || "30", 10);
  const totalHours = hoursParam
    ? Math.min(Math.max(1, parseInt(hoursParam, 10)), 8760)
    : Math.min(Math.max(1, daysParam), 365) * 24;
  const days = totalHours / 24;
  const since = new Date(Date.now() - totalHours * 60 * 60 * 1000).toISOString();

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
      ipBreakdown,
      recentVisitors,
      dailyVisitors,
      totalLeads,
      newLeads,
      leadsByStatus,
      leadsByTier,
      leadsByCountry,
      leadsBySource,
      dailyLeads,
      recentLeads,
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
      pool.query("SELECT ip, COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false GROUP BY ip ORDER BY count DESC LIMIT 20", [since]),
      pool.query("SELECT id, session_id, ip, country, city, device, browser, os, page, referrer, utm_source, duration, scroll_depth, created_at FROM kraftai_visitors WHERE is_bot = false ORDER BY created_at DESC LIMIT 50"),
      pool.query("SELECT DATE(created_at) as date, COUNT(*) as views FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false GROUP BY DATE(created_at) ORDER BY date", [since]),
      pool.query("SELECT COUNT(*) as count FROM kraftai_leads WHERE created_at >= $1", [since]),
      pool.query("SELECT COUNT(*) as count FROM kraftai_leads WHERE status = 'new'"),
      pool.query("SELECT status, COUNT(*)::int as count FROM kraftai_leads WHERE created_at >= $1 GROUP BY status ORDER BY count DESC", [since]),
      pool.query("SELECT COALESCE(selected_tier, 'Not specified') as tier, COUNT(*)::int as count FROM kraftai_leads WHERE created_at >= $1 GROUP BY selected_tier ORDER BY count DESC", [since]),
      pool.query("SELECT COALESCE(country, 'Unknown') as country, COUNT(*)::int as count FROM kraftai_leads WHERE created_at >= $1 GROUP BY country ORDER BY count DESC LIMIT 15", [since]),
      pool.query("SELECT COALESCE(source, 'direct') as source, COUNT(*)::int as count FROM kraftai_leads WHERE created_at >= $1 GROUP BY source ORDER BY count DESC", [since]),
      pool.query("SELECT DATE(created_at) as date, COUNT(*)::int as count FROM kraftai_leads WHERE created_at >= $1 GROUP BY DATE(created_at) ORDER BY date", [since]),
      pool.query("SELECT * FROM kraftai_leads WHERE created_at >= $1 ORDER BY created_at DESC LIMIT 50", [since]),
      pool.query("SELECT event_type, COUNT(*)::int as count FROM kraftai_events WHERE created_at >= $1 GROUP BY event_type ORDER BY count DESC", [since]),
      pool.query("SELECT COUNT(*) as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = true", [since]),
      pool.query("SELECT ROUND(AVG(duration)) as avg FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false AND duration > 0", [since]),
      pool.query("SELECT utm_source, utm_medium, utm_campaign, COUNT(*)::int as count FROM kraftai_visitors WHERE created_at >= $1 AND is_bot = false AND utm_source IS NOT NULL GROUP BY utm_source, utm_medium, utm_campaign ORDER BY count DESC LIMIT 15", [since]),
    ]);

    const uSessions = parseInt(uniqueSessions.rows[0].count);
    const tLeads = parseInt(totalLeads.rows[0].count);
    const tViews = parseInt(totalVisitors.rows[0].count);

    return NextResponse.json({
      period: { days, since },
      overview: {
        total_pageviews: tViews,
        unique_sessions: uSessions,
        today_visitors: parseInt(todayVisitors.rows[0].count),
        total_leads: tLeads,
        new_leads: parseInt(newLeads.rows[0].count),
        bot_visits: parseInt(botCount.rows[0].count),
        avg_duration_seconds: parseInt(avgDuration.rows[0]?.avg || "0"),
        conversion_rate: uSessions > 0 ? ((tLeads / uSessions) * 100).toFixed(1) : "0",
        pages_per_session: uSessions > 0 ? (tViews / uSessions).toFixed(1) : "0",
      },
      traffic: {
        countries: countryBreakdown.rows,
        browsers: browserBreakdown.rows,
        devices: deviceBreakdown.rows,
        os: osBreakdown.rows,
        top_pages: topPages.rows,
        top_referrers: topReferrers.rows,
        ips: ipBreakdown.rows,
        daily: dailyVisitors.rows,
        recent: recentVisitors.rows,
        utm: utmBreakdown.rows,
      },
      leads: {
        by_status: leadsByStatus.rows,
        by_tier: leadsByTier.rows,
        by_country: leadsByCountry.rows,
        by_source: leadsBySource.rows,
        daily: dailyLeads.rows,
        recent: recentLeads.rows,
      },
      events: eventCounts.rows,
    });
  } catch (error) {
    console.error("Metrics error:", error);
    return NextResponse.json({ error: "Failed to load metrics", details: String(error) }, { status: 500 });
  }
}
