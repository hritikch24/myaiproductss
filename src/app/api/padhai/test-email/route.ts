import { NextRequest, NextResponse } from "next/server";
import { sendEmail, buildReportEmail } from "@/lib/padhai/email";

// Send a test email to verify Postmark/Resend setup
// Usage: POST /api/padhai/test-email { "to": "your@email.com" }
export async function POST(req: NextRequest) {
  try {
    const { to } = await req.json();

    if (!to) {
      return NextResponse.json(
        { error: "Email address required. Send { \"to\": \"your@email.com\" }" },
        { status: 400 }
      );
    }

    // Build a sample report email
    const html = buildReportEmail({
      studentName: "Test Student",
      reportContent:
        "This is a test email from Padhai! 📚\n\nIf you're seeing this, your email setup is working correctly.\n\nThis is what a real weekly parent report will look like — with stats, progress updates, and tips.",
      parentTip: "Ask your child what they found most interesting today — it shows you care about their learning, not just their grades.",
      tasksDone: 7,
      totalTasks: 10,
      streak: 5,
      weekLabel: `Week of ${new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`,
    });

    const result = await sendEmail({
      to,
      subject: "✅ Padhai Test Email — Setup Verified!",
      html,
      tag: "test-email",
    });

    return NextResponse.json({
      success: result.success,
      provider: result.provider,
      messageId: result.messageId,
      error: result.error,
    });
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
