/**
 * Receives a brief from the contact form and emails it to the studio.
 *
 * Sending goes through Resend (https://resend.com). Set these in Vercel
 * (Project Settings > Environment Variables) and redeploy:
 *   RESEND_API_KEY       required - without it this endpoint answers 503 and
 *                        the contact page falls back to "Open in email"
 *   CONTACT_TO_EMAIL     optional - defaults to info@steadyhandstudios.co.za
 *   CONTACT_FROM_EMAIL   optional - defaults to Resend's shared test sender,
 *                        which only delivers to the Resend account owner.
 *                        Verify steadyhandstudios.co.za in Resend and use e.g.
 *                        "Steady Hand Studios <website@steadyhandstudios.co.za>"
 */

const DEFAULT_TO = "info@steadyhandstudios.co.za";
const DEFAULT_FROM = "Steady Hand Studios <onboarding@resend.dev>";

const MAX = { name: 120, email: 254, brief: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Answer as if it
  // worked so bots don't learn anything.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const brief = typeof data.brief === "string" ? data.brief.trim() : "";

  if (!name || !email || !brief) {
    return json({ error: "Please fill in your name, email and brief." }, 400);
  }
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    brief.length > MAX.brief
  ) {
    return json({ error: "That message is too long." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: "That email address doesn't look right." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ error: "not_configured" }, 503);
  }

  // Names go in the subject line, so keep them to one line.
  const subjectName = name.replace(/[\r\n]+/g, " ");

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [process.env.CONTACT_TO_EMAIL || DEFAULT_TO],
        reply_to: email,
        subject: `New brief from ${subjectName}`,
        text: `${brief}\n\n-\n${name}\n${email}\n\nSent from the website contact form.`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return json({ error: "Couldn't reach the mail service." }, 502);
  }

  if (!res.ok) {
    console.error("Contact form: Resend responded", res.status, await res.text());
    return json({ error: "Couldn't send your message." }, 502);
  }

  return json({ ok: true }, 200);
}
