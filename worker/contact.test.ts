import { beforeEach, describe, expect, it, vi } from "vitest";
import worker from "./contact";

const env = {
  RESEND_API_KEY: "re_test_key",
  CONTACT_TO: "inbox@example.com",
  CONTACT_FROM: "site@example.com",
};

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Role inquiry",
  message: "I would like to talk about a position.",
};

let ipSeq = 0;

function post(body: unknown, ip?: string): Request {
  return new Request("https://worker.example/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CF-Connecting-IP": ip ?? `10.1.${Math.floor(ipSeq++ / 250)}.${ipSeq % 250}`,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function okFetch() {
  return vi.fn(async () => ({ ok: true, status: 200 }) as Response);
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

describe("contact worker", () => {
  it("answers CORS preflight", async () => {
    const response = await worker.fetch(
      new Request("https://worker.example/contact", { method: "OPTIONS" }),
      env,
    );
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  it("rejects non-POST", async () => {
    const response = await worker.fetch(
      new Request("https://worker.example/contact", { method: "GET" }),
      env,
    );
    expect(response.status).toBe(405);
  });

  it("sends the Resend payload with secrets, reply_to and subject prefix", async () => {
    const fetchImpl = okFetch();
    vi.stubGlobal("fetch", fetchImpl);

    const response = await worker.fetch(post(validPayload), env);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer re_test_key",
    );
    expect(JSON.parse(String(init.body))).toMatchObject({
      from: "site@example.com",
      to: "inbox@example.com",
      reply_to: "ada@example.com",
      subject: "[Portfolio] Role inquiry",
      text: "From: Ada Lovelace <ada@example.com>\n\nI would like to talk about a position.",
    });
  });

  it("returns neutral success for honeypot without calling Resend", async () => {
    const fetchImpl = okFetch();
    vi.stubGlobal("fetch", fetchImpl);

    const response = await worker.fetch(
      post({ ...validPayload, company: "Bot Inc" }),
      env,
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("rejects invalid payloads with 400 and never calls Resend", async () => {
    const fetchImpl = okFetch();
    vi.stubGlobal("fetch", fetchImpl);

    for (const patch of [
      { name: "" },
      { email: "not-an-email" },
      { subject: "x".repeat(151) },
      { message: "x".repeat(5001) },
    ]) {
      const response = await worker.fetch(post({ ...validPayload, ...patch }), env);
      expect(response.status).toBe(400);
      const body = (await response.json()) as { ok: boolean; error: string };
      expect(body.ok).toBe(false);
      expect(body.error).toBeTruthy();
    }
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON with 400", async () => {
    const response = await worker.fetch(post("not json"), env);
    expect(response.status).toBe(400);
  });

  it("answers 503 when secrets are missing", async () => {
    const fetchImpl = okFetch();
    vi.stubGlobal("fetch", fetchImpl);
    const response = await worker.fetch(
      post(validPayload),
      { RESEND_API_KEY: "", CONTACT_TO: "", CONTACT_FROM: "" },
    );
    expect(response.status).toBe(503);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("maps Resend failure to 502 with safe generic error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 422 }) as Response),
    );
    const response = await worker.fetch(post(validPayload), env);
    expect(response.status).toBe(502);
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe("The message could not be sent. Please try again later.");
    expect(body.error).not.toContain("422");
  });

  it("maps network errors to 502 and leaks no secrets", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("Bearer re_test_key rejected");
      }),
    );
    const response = await worker.fetch(post(validPayload), env);
    expect(response.status).toBe(502);
    const body = (await response.json()) as { error: string };
    expect(body.error).not.toContain("re_test_key");
  });

  it("rate limits one IP with 429 while others pass", async () => {
    const fetchImpl = okFetch();
    vi.stubGlobal("fetch", fetchImpl);
    const limitedIp = "203.0.113.7";

    for (let i = 0; i < 5; i += 1) {
      const response = await worker.fetch(post(validPayload, limitedIp), env);
      expect(response.status).toBe(200);
    }
    const blocked = await worker.fetch(post(validPayload, limitedIp), env);
    expect(blocked.status).toBe(429);

    const other = await worker.fetch(post(validPayload, "203.0.113.8"), env);
    expect(other.status).toBe(200);
  });
});