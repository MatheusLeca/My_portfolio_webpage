import {
  CONTACT_SEND_FAILURE,
  HONEYPOT_FIELD,
  validateContact,
} from "../functions/src/contact";

/**
 * Contact form submission handler for Cloudflare Workers.
 * Accepts POST requests with contact form payloads and delivers emails via Resend.
 * Required environment secrets: RESEND_API_KEY, CONTACT_TO, CONTACT_FROM.
 */
type Env = {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM: string;
};

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

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const contactWorker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== "POST") {
      return json({ ok: false, error: "Method not allowed." }, 405);
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return json({ ok: false, error: "Invalid request." }, 400);
    }

    const source =
      typeof raw === "object" && raw !== null
        ? (raw as Record<string, unknown>)
        : {};

    // Hidden field filled by bots: neutral success, nothing sent.
    const honeypot = source[HONEYPOT_FIELD];
    if (typeof honeypot === "string" && honeypot.length > 0) {
      return json({ ok: true }, 200);
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    if (isRateLimited(ip)) {
      return json(
        {
          ok: false,
          error: "Too many messages sent. Please wait a while and try again.",
        },
        429,
      );
    }

    const validation = validateContact(source);
    if (!validation.ok) {
      return json(
        {
          ok: false,
          error: "Please provide a valid name, email, subject, and message.",
        },
        400,
      );
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
      console.error("contact: secrets not configured");
      return json(
        { ok: false, error: "Email delivery is not configured yet." },
        503,
      );
    }

    const { name, email, subject, message } = validation.data;
    let delivered = false;
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM,
          to: env.CONTACT_TO,
          reply_to: email,
          subject: `[Portfolio] ${subject}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });
      delivered = response.ok;
      if (!delivered) console.error("contact: resend status", response.status);
    } catch (error) {
      // Log the failure object; never echo provider detail to the caller.
      console.error("contact: resend request failed", error);
    }

    if (!delivered) {
      return json({ ok: false, error: CONTACT_SEND_FAILURE }, 502);
    }
    return json({ ok: true }, 200);
  },
};

export default contactWorker;