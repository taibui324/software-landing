const CONTACT_RECIPIENT = "taibui324@gmail.com";
const MAX_FIELD_LENGTH = 5000;

function sendJson(payload, status, headers = {}) {
  return Response.json(payload, {
    status,
    headers
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeField(value) {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

function normalizeId(value) {
  return typeof value === "string" ? value.trim().replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 96) : "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatSubmittedAt(date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC"
  }).format(date) + " UTC";
}

function buildTextEmail({ name, email, message, submittedAt }) {
  return [
    "New Orca project note",
    "",
    "A new lead submitted the contact form on the Orca landing page.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    message,
    "",
    "Suggested next step:",
    `Reply to ${email} with a short discovery note and proposed call time.`
  ].join("\n");
}

function buildHtmlEmail({ name, email, message, submittedAt }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const safeSubmittedAt = escapeHtml(submittedAt);
  const mailtoHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Re: Your Orca project note")}`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Orca project note</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f4f5; color:#18181b; font-family:Arial, Helvetica, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      New contact form submission from ${safeName}.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; background:#f4f4f5;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; max-width:640px; overflow:hidden; border:1px solid #e4e4e7; background:#ffffff;">
            <tr>
              <td style="padding:32px; background:#18181b; color:#fafafa;">
                <div style="display:inline-block; margin-bottom:22px; padding:8px 10px; background:#27272a; color:#fafafa; font-size:13px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">
                  Orca
                </div>
                <h1 style="margin:0; color:#fafafa; font-size:30px; line-height:1.2; font-weight:800;">
                  New project note
                </h1>
                <p style="margin:12px 0 0; color:#d4d4d8; font-size:15px; line-height:1.6;">
                  A new software or AI automation lead came through the Orca landing page.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 32px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:14px 0; width:132px; border-bottom:1px solid #e4e4e7; color:#71717a; font-size:13px; font-weight:700; text-transform:uppercase;">
                      Name
                    </td>
                    <td style="padding:14px 0; border-bottom:1px solid #e4e4e7; color:#18181b; font-size:16px; font-weight:700;">
                      ${safeName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0; width:132px; border-bottom:1px solid #e4e4e7; color:#71717a; font-size:13px; font-weight:700; text-transform:uppercase;">
                      Email
                    </td>
                    <td style="padding:14px 0; border-bottom:1px solid #e4e4e7; color:#18181b; font-size:16px; font-weight:700;">
                      <a href="${mailtoHref}" style="color:#18181b; text-decoration:underline;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0; width:132px; border-bottom:1px solid #e4e4e7; color:#71717a; font-size:13px; font-weight:700; text-transform:uppercase;">
                      Submitted
                    </td>
                    <td style="padding:14px 0; border-bottom:1px solid #e4e4e7; color:#18181b; font-size:16px; font-weight:700;">
                      ${safeSubmittedAt}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <p style="margin:0 0 10px; color:#71717a; font-size:13px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase;">
                  Message
                </p>
                <div style="padding:20px; border:1px solid #d4d4d8; background:#fafafa; color:#18181b; font-size:16px; line-height:1.65;">
                  ${safeMessage}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;">
                <a href="${mailtoHref}" style="display:inline-block; padding:14px 22px; background:#27272a; color:#fafafa; font-size:15px; font-weight:800; text-decoration:none;">
                  Reply to lead
                </a>
                <p style="margin:18px 0 0; color:#71717a; font-size:13px; line-height:1.6;">
                  Suggested next step: reply with a short discovery note and a proposed call time.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px; border-top:1px solid #e4e4e7; background:#f4f4f5; color:#71717a; font-size:12px; line-height:1.6;">
                Sent from the Orca landing page contact form. The submitter email is included for manual follow-up; no reply-to header was set.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function GET() {
  return sendJson({ error: "Method not allowed" }, 405, { Allow: "POST" });
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch (_) {
    return sendJson({ error: "Invalid request body" }, 400);
  }

  const name = normalizeField(body.name);
  const email = normalizeField(body.email);
  const message = normalizeField(body.message);
  const website = normalizeField(body.website);
  const submissionId = normalizeId(body.submissionId);

  if (website) {
    return sendJson({ ok: true }, 200);
  }

  if (!name || !email || !message) {
    return sendJson({ error: "Name, email, and message are required." }, 400);
  }

  if (!isValidEmail(email)) {
    return sendJson({ error: "Please enter a valid email address." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return sendJson({ error: "Email service is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL, then restart the server." }, 500);
  }

  const submittedAt = formatSubmittedAt(new Date());
  const subject = `New Orca lead: ${name}`;
  const text = buildTextEmail({ name, email, message, submittedAt });
  const html = buildHtmlEmail({ name, email, message, submittedAt });
  const idempotencyKey = `contact-form/${submissionId || crypto.randomUUID()}`;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Idempotency-Key": idempotencyKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [CONTACT_RECIPIENT],
        subject,
        text,
        html,
        tags: [
          {
            name: "source",
            value: "orca_contact_form"
          }
        ]
      })
    });

    const result = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error("Resend send failed", result);
      return sendJson({ error: "Email could not be sent." }, 502);
    }

    return sendJson({ ok: true, id: result.id }, 200);
  } catch (error) {
    console.error("Contact form send failed", error);
    return sendJson({ error: "Email could not be sent." }, 502);
  }
}
