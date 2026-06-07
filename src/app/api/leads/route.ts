import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/kraftai-db";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUSPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, source } = body;
    const ip = getClientIp(req);

    // Validate required fields
    const missing: string[] = [];
    if (!name?.trim()) missing.push("name");
    if (!email?.trim()) missing.push("email");
    if (!phone?.trim()) missing.push("phone");
    if (!company?.trim()) missing.push("company");
    if (!source?.trim()) missing.push("source");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    if (!isValidEmail(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!isValidUSPhone(phone.trim())) {
      return NextResponse.json(
        { error: "Invalid US phone number. Expected 10-digit format, e.g. (555) 123-4567" },
        { status: 400 }
      );
    }

    // Geo lookup
    let country: string | null = null;
    if (ip !== "unknown" && ip !== "127.0.0.1") {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country`, {
          signal: AbortSignal.timeout(2000),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          country = geoData.country;
        }
      } catch {
        /* continue without geo */
      }
    }

    // Insert into the same kraftai_leads table — source column identifies the subdomain
    const result = await pool.query(
      `INSERT INTO kraftai_leads
        (name, email, phone, company, message, source, ip, country)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [
        name.trim(),
        email.trim(),
        phone.trim(),
        company.trim(),
        message?.trim() || null,
        source.trim(),
        ip,
        country,
      ]
    );

    // TODO: Send to CRM webhook
    // if (process.env.CRM_WEBHOOK_URL) {
    //   await fetch(process.env.CRM_WEBHOOK_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ id: result.rows[0].id, name, email, phone, company, message, source }),
    //   });
    // }

    return NextResponse.json(
      { ok: true, lead_id: result.rows[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead save error:", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const adminKey = process.env.KRAFTAI_ADMIN_KEY || "admin";

  if (key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const source = searchParams.get("source");

    let query: string;
    const params: string[] = [];

    if (source) {
      // Filter by source — supports both exact match (e.g. "homeservices-landing")
      // and prefix match (e.g. "homeservices" matches "homeservices-landing", "homeservices-phoenix", etc.)
      query = `SELECT * FROM kraftai_leads WHERE source LIKE $1 ORDER BY created_at DESC LIMIT 200`;
      params.push(`${source}%`);
    } else {
      query = `SELECT * FROM kraftai_leads ORDER BY created_at DESC LIMIT 200`;
    }

    const result = await pool.query(query, params);
    return NextResponse.json({ leads: result.rows, total: result.rows.length });
  } catch (error) {
    console.error("Leads fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
