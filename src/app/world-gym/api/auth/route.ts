import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { currentPin, newPin } = await req.json();
    
    if (!currentPin || !newPin) {
      return NextResponse.json({ error: "PINs required" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update PIN" }, { status: 500 });
  }
}
