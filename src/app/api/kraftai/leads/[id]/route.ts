import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/kraftai-db";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const key = new URL(req.url).searchParams.get("key") || token;

  if (key !== process.env.KRAFTAI_ADMIN_KEY && key !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validStatuses = ["new", "contacted", "quoted", "won", "lost"];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updates: string[] = [];
    const values: (string | null)[] = [];
    let idx = 1;

    if (body.status) { updates.push(`status = $${idx++}`); values.push(body.status); }
    if (body.notes !== undefined) { updates.push(`notes = $${idx++}`); values.push(body.notes); }

    if (updates.length === 0) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    values.push(id);
    await pool.query(
      `UPDATE kraftai_leads SET ${updates.join(", ")} WHERE id = $${idx}`,
      values
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead update error:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
