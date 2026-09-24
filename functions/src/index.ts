import { createHash } from "node:crypto";
import { logger } from "firebase-functions";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import {
  CONTACT_SEND_FAILURE,
  HONEYPOT_FIELD,
  validateContact,
} from "./contact";

const RESEND_API_KEY = defineSecret("RESEND_API_KEY");
const CONTACT_TO = defineSecret("CONTACT_TO");
const CONTACT_FROM = defineSecret("CONTACT_FROM");

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

/** Raw callable payload: every field arrives untrusted (possibly non-string). */
type RawPayload = Record<string, unknown>;

type RawRequest = {
  ip?: string;
  headers: Record<string, string | string[] | undefined>;
};

type ResendConfig = {
  apiKey: string;
  to: string;
  from: string;
};

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getClientIp(request: RawRequest): string {
  const forwarded = request.headers["x-forwarded-for"];
  const firstForwarded = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded?.split(",")[0];
  const realIp = request.headers["x-real-ip"];
  return (
    firstForwarded?.trim() ||
    (typeof realIp === "string" ? realIp : undefined) ||
    request.ip ||
    "unknown"
  );
}

/**
 * Best-effort per-IP sliding window. Instances do not share memory, so this
 * complements — never replaces — App Check enforcement (the real defense).
 */
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

function loadConfig(): ResendConfig {
  return {
    apiKey: RESEND_API_KEY.value(),
    to: CONTACT_TO.value(),
    from: CONTACT_FROM.value(),
  };
}

type ContactContext = {
  ip: string;
  /** Injectable for tests; production uses the global `fetch`. */
  fetchImpl?: typeof fetch;
};

/**
 * Request/response boundary of the callable function. Throws `HttpsError`
 * on every failure path; resolves `{ ok: true }` only when Resend accepts
 * the message (or the caller was a honeypot bot).
 */
export async function handleContact(
  payload: unknown,
  context: ContactContext,
): Promise<{ ok: true }> {
  const data: RawPayload =
    typeof payload === "object" && payload !== null
      ? (payload as RawPayload)
      : {};

  // Hidden field filled by bots: return a neutral response without sending.
  if (readString(data[HONEYPOT_FIELD]).length > 0) return { ok: true };

  const ipHash = createHash("sha256").update(context.ip).digest("hex");
  if (isRateLimited(ipHash)) {
    throw new HttpsError(
      "resource-exhausted",
      "Too many messages sent. Please wait a while and try again.",
    );
  }

  // Non-object payloads become {} inside validateContact; one error covers all.
  const validation = validateContact(data);
  if (!validation.ok) {
    throw new HttpsError(
      "invalid-argument",
      "Please provide a valid name, email, subject, and message.",
    );
  }
  const valid = validation.data;
  const config = loadConfig();
  const fetchImpl = context.fetchImpl ?? fetch;

  let response: Response;
  try {
    response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        reply_to: valid.email,
        subject: `[Portfolio] ${valid.subject}`,
        text: `From: ${valid.name} <${valid.email}>\n\n${valid.message}`,
      }),
    });
  } catch (error) {
    logger.error("Resend request failed", error);
    throw new HttpsError("unavailable", CONTACT_SEND_FAILURE);
  }

  if (!response.ok) {
    logger.error("Resend rejected the contact message", {
      status: response.status,
    });
    throw new HttpsError("unavailable", CONTACT_SEND_FAILURE);
  }

  return { ok: true };
}

export const sendContactMessage = onCall(
  {
    region: "us-central1",
    enforceAppCheck: true,
    consumeAppCheckToken: true,
    secrets: [RESEND_API_KEY, CONTACT_TO, CONTACT_FROM],
  },
  async (request) =>
    handleContact(request.data, {
      ip: getClientIp(request.rawRequest as RawRequest),
    }),
);
