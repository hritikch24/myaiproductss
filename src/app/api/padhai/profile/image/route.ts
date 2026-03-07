import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image required" }, { status: 400 });
    }

    await pool.query(
      "UPDATE padhai_students SET profile_image = $1 WHERE email = $2",
      [image, session.user.email]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile image error:", error);
    return NextResponse.json({ error: "Failed to save image" }, { status: 500 });
  }
}
