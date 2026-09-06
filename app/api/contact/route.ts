import { NextResponse } from "next/server";
import { HONEYPOT_FIELD, validateContact } from "@/lib/contact";

/**
 * POST /api/contact — server side of the email-delivery seam.
 *
 * Validation runs here authoritatively (the client mirrors it for instant
 * feedback). Abuse is curbed with a honeypot field plus best-effort
 * in-memory rate limiting, appropriate for portfolio-scale traffic.
 * Delivery goes through the Resend API using server-only configuration;
 * nothing secret ever reaches the client.
 */

// Best-effort per-IP sliding window. Serverless instances do not share
// memory, so this complements — not replaces — provider-side protections.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { message: "Invalid request." } },
      { status: 400 },
    );
  }

  // Bots that fill the honeypot get a fake success so they learn nothing.
  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as Record<string, unknown>)[HONEYPOT_FIELD] === "string" &&
    ((body as Record<string, unknown>)[HONEYPOT_FIELD] as string).length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages sent. Please wait a while and try again." },
      { status: 429 },
    );
  }

  const validation = validateContact(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured yet." },
      { status: 503 },
    );
  }

  const { name, email, subject, message } = validation.data;
  let providerOk = false;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    providerOk = response.ok;
  } catch {
    providerOk = false;
  }

  if (!providerOk) {
    return NextResponse.json(
      { ok: false, error: "The message could not be sent. Please try again later." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
