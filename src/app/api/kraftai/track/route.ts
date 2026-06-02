import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/kraftai-db";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function detectBot(ua: string): boolean {
  return /bot|crawl|spider|slurp|baiduspider|yandex|sogou|exabot|facebookexternalhit|facebot|ia_archiver|linkedinbot|twitterbot|whatsapp|telegrambot|googlebot|bingbot/i.test(ua);
}

function parseUA(ua: string) {
  let browser = "Unknown";
  let os = "Unknown";

  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) browser = "Opera";
  else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) browser = "Chrome";
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";

  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Macintosh|Mac OS/i.test(ua)) os = "macOS";
  else if (/Linux/i.test(ua) && !/Android/i.test(ua)) os = "Linux";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";

  const isMobile = /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|Opera Mini|IEMobile/i.test(ua);
  const device = isMobile ? "Mobile" : /Tablet|iPad/i.test(ua) ? "Tablet" : "Desktop";

  return { browser, os, isMobile, device };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ua = req.headers.get("user-agent") || "";
    const ip = getClientIp(req);
    const isBot = detectBot(ua);
    const { browser, os, isMobile, device } = parseUA(ua);

    const url = new URL(body.page || "/", "https://kraftai.in");
    const utmSource = url.searchParams.get("utm_source") || body.utm_source || null;
    const utmMedium = url.searchParams.get("utm_medium") || body.utm_medium || null;
    const utmCampaign = url.searchParams.get("utm_campaign") || body.utm_campaign || null;

    // Geo lookup via free API (ip-api.com) - non-blocking
    let geo = { country: null as string | null, city: null as string | null, region: null as string | null, timezone: null as string | null, lat: null as number | null, lon: null as number | null };
    if (ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1" && !isBot) {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country,city,regionName,timezone,lat,lon`, { signal: AbortSignal.timeout(2000) });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          geo = { country: geoData.country, city: geoData.city, region: geoData.regionName, timezone: geoData.timezone, lat: geoData.lat, lon: geoData.lon };
        }
      } catch { /* geo lookup failed, continue without it */ }
    }

    await pool.query(
      `INSERT INTO kraftai_visitors
        (session_id, ip, country, city, region, timezone, lat, lon, device, browser, os, screen_width, screen_height, language, referrer, utm_source, utm_medium, utm_campaign, page, page_title, duration, scroll_depth, is_bot, is_mobile, user_agent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)`,
      [
        body.session_id, ip, geo.country, geo.city, geo.region, geo.timezone, geo.lat, geo.lon,
        device, browser, os, body.screen_width || null, body.screen_height || null,
        body.language || null, body.referrer || null,
        utmSource, utmMedium, utmCampaign,
        body.page || "/", body.page_title || null,
        body.duration || 0, body.scroll_depth || 0,
        isBot, isMobile, ua,
      ]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ error: "Track failed" }, { status: 500 });
  }
}

// Event tracking (clicks, scroll milestones, quote interactions, etc.)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    await pool.query(
      `INSERT INTO kraftai_events (session_id, event_type, event_data, page) VALUES ($1, $2, $3, $4)`,
      [body.session_id, body.event_type, JSON.stringify(body.event_data || {}), body.page || "/"]
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Event track error:", error);
    return NextResponse.json({ error: "Event track failed" }, { status: 500 });
  }
}
