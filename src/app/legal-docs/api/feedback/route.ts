import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, email, pagePath } = body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (message.length > 1000) {
    return NextResponse.json(
      { error: "Message must be 1000 characters or less" },
      { status: 400 }
    );
  }

  let userId: number | null = null;
  try {
    const session = await auth();
    if (session?.user?.id) {
      userId = Number(session.user.id);
    }
  } catch {
    // Not logged in, that's fine
  }

  await pool.query(
    "INSERT INTO feedback (message, email, page_path, user_id) VALUES ($1, $2, $3, $4)",
    [message.trim(), email || null, pagePath || null, userId]
  );

  return NextResponse.json({ success: true });
}
