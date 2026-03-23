// Email service — Postmark (primary), Resend (fallback)

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  textBody?: string;
  tag?: string; // for tracking in Postmark
}

interface EmailResult {
  success: boolean;
  provider: "postmark" | "resend";
  messageId?: string;
  error?: string;
}

const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY || "";
const POSTMARK_FROM = process.env.POSTMARK_FROM_EMAIL || "padhai@kraftai.in";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

// ─── Postmark ───
async function sendViaPostmark(opts: EmailOptions): Promise<EmailResult> {
  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": POSTMARK_API_KEY,
    },
    body: JSON.stringify({
      From: POSTMARK_FROM,
      To: opts.to,
      Subject: opts.subject,
      HtmlBody: opts.html,
      TextBody: opts.textBody || stripHtml(opts.html),
      Tag: opts.tag || "parent-report",
      TrackOpens: true,
      TrackLinks: "HtmlAndText",
      MessageStream: "outbound",
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Postmark ${res.status}: ${err.Message || JSON.stringify(err)}`);
  }

  const data = await res.json();
  return {
    success: true,
    provider: "postmark",
    messageId: data.MessageID,
  };
}

// ─── Resend (fallback) ───
async function sendViaResend(opts: EmailOptions): Promise<EmailResult> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Padhai <onboarding@resend.dev>",
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Resend ${res.status}: ${err.message || JSON.stringify(err)}`);
  }

  const data = await res.json();
  return {
    success: true,
    provider: "resend",
    messageId: data.id,
  };
}

// ─── Main send function (tries Postmark first) ───
export async function sendEmail(opts: EmailOptions): Promise<EmailResult> {
  if (POSTMARK_API_KEY) {
    try {
      return await sendViaPostmark(opts);
    } catch (err) {
      console.error("Postmark failed, trying Resend:", err);
    }
  }

  if (RESEND_API_KEY) {
    try {
      return await sendViaResend(opts);
    } catch (err) {
      console.error("Resend also failed:", err);
      return { success: false, provider: "resend", error: String(err) };
    }
  }

  return {
    success: false,
    provider: "postmark",
    error: "No email API key configured. Set POSTMARK_API_KEY or RESEND_API_KEY.",
  };
}

// ─── HTML email template for parent reports ───
export function buildReportEmail(params: {
  studentName: string;
  reportContent: string;
  parentTip: string;
  tasksDone: number;
  totalTasks: number;
  streak: number;
  weekLabel: string;
}): string {
  const { studentName, reportContent, parentTip, tasksDone, totalTasks, streak, weekLabel } = params;
  const taskPct = totalTasks > 0 ? Math.round((tasksDone / totalTasks) * 100) : 0;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weekly Update: ${studentName}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#10b981,#059669);padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:24px;font-weight:700;color:#ffffff;">📚 Padhai</span>
                    <br>
                    <span style="font-size:14px;color:rgba(255,255,255,0.85);margin-top:4px;display:inline-block;">Weekly Progress Report</span>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <span style="font-size:12px;color:rgba(255,255,255,0.7);">${weekLabel}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Student Name -->
          <tr>
            <td style="padding:24px 32px 0;">
              <h2 style="margin:0;font-size:20px;color:#1e293b;">${studentName}&apos;s Week</h2>
            </td>
          </tr>

          <!-- Stats Row -->
          <tr>
            <td style="padding:16px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="text-align:center;padding:12px;background:#f0fdf4;border-radius:8px;">
                    <div style="font-size:24px;font-weight:700;color:#059669;">${tasksDone}/${totalTasks}</div>
                    <div style="font-size:11px;color:#64748b;margin-top:2px;">Tasks Done</div>
                  </td>
                  <td width="4"></td>
                  <td width="33%" style="text-align:center;padding:12px;background:#fff7ed;border-radius:8px;">
                    <div style="font-size:24px;font-weight:700;color:#ea580c;">🔥 ${streak}</div>
                    <div style="font-size:11px;color:#64748b;margin-top:2px;">Day Streak</div>
                  </td>
                  <td width="4"></td>
                  <td width="33%" style="text-align:center;padding:12px;background:#f0f9ff;border-radius:8px;">
                    <div style="font-size:24px;font-weight:700;color:#0284c7;">${taskPct}%</div>
                    <div style="font-size:11px;color:#64748b;margin-top:2px;">Completion</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Progress Bar -->
          <tr>
            <td style="padding:0 32px 16px;">
              <div style="background:#e2e8f0;border-radius:4px;height:8px;overflow:hidden;">
                <div style="background:linear-gradient(90deg,#10b981,#059669);height:100%;width:${taskPct}%;border-radius:4px;"></div>
              </div>
            </td>
          </tr>

          <!-- Report Content -->
          <tr>
            <td style="padding:8px 32px 20px;">
              <div style="font-size:15px;line-height:1.7;color:#334155;">
                ${reportContent.replace(/\n/g, "<br>")}
              </div>
            </td>
          </tr>

          <!-- Parent Tip -->
          ${parentTip ? `
          <tr>
            <td style="padding:0 32px 24px;">
              <div style="background:#fefce8;border-left:4px solid #eab308;padding:14px 16px;border-radius:0 8px 8px 0;">
                <div style="font-size:12px;font-weight:600;color:#a16207;margin-bottom:4px;">💡 TIP FOR YOU</div>
                <div style="font-size:14px;color:#713f12;line-height:1.5;">${parentTip}</div>
              </div>
            </td>
          </tr>
          ` : ""}

          <!-- CTA -->
          <tr>
            <td style="padding:0 32px 24px;text-align:center;">
              <a href="https://kraftai.in/padhai/track" style="display:inline-block;background:linear-gradient(135deg,#10b981,#059669);color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">
                View Full Progress →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                Sent from <strong>Padhai</strong> — Building study habits that last 🌱
                <br>
                <a href="https://kraftai.in/padhai" style="color:#10b981;text-decoration:none;">kraftai.in/padhai</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Strip HTML to plain text (for Postmark TextBody)
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
