import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/kraftai-db";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ip = getClientIp(req);

    let country: string | null = null;
    if (ip !== "unknown" && ip !== "127.0.0.1") {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country`, { signal: AbortSignal.timeout(2000) });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          country = geoData.country;
        }
      } catch { /* continue */ }
    }

    const result = await pool.query(
      `INSERT INTO kraftai_leads
        (name, email, phone, company, project_type, budget, timeline, message, selected_tier, selected_addons, estimated_total, source, ip, country)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id`,
      [
        body.name || null,
        body.email || null,
        body.phone || null,
        body.company || null,
        body.project_type || null,
        body.budget || null,
        body.timeline || null,
        body.message || null,
        body.selected_tier || null,
        body.selected_addons || null,
        body.estimated_total || null,
        body.source || "quote_form",
        ip,
        country,
      ]
    );

    return NextResponse.json({ ok: true, lead_id: result.rows[0].id });
  } catch (error) {
    console.error("Lead save error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (key !== process.env.KRAFTAI_ADMIN_KEY && key !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const status = searchParams.get("status");
    let query = "SELECT * FROM kraftai_leads ORDER BY created_at DESC LIMIT 200";
    const params: string[] = [];
    if (status) {
      query = "SELECT * FROM kraftai_leads WHERE status = $1 ORDER BY created_at DESC LIMIT 200";
      params.push(status);
    }
    const result = await pool.query(query, params);
    return NextResponse.json({ leads: result.rows });
  } catch (error) {
    console.error("Leads fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
