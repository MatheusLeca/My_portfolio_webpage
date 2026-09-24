import { beforeAll, describe, expect, it, vi } from "vitest";
import { HttpsError } from "firebase-functions/v2/https";
import { handleContact } from "../src/index";

// `defineSecret().value()` reads these from the environment at call time.
beforeAll(() => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.CONTACT_TO = "inbox@example.com";
  process.env.CONTACT_FROM = "site@example.com";
  delete process.env.FUNCTIONS_CONTROL_API;
});

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Role inquiry",
  message: "I would like to talk about a position.",
};

function okFetch() {
  return vi.fn(async () => ({ ok: true, status: 200 }) as Response);
}

function ip(counter: number) {
  // Distinct IPs keep the module-level rate-limit window isolated per test.
  return `10.0.${Math.floor(counter / 250)}.${counter % 250}`;
}

let ipSeq = 0;

async function expectHttpsError(
  promise: Promise<unknown>,
  code: string,
): Promise<HttpsError> {
  try {
    await promise;
  } catch (error) {
    expect(error).toBeInstanceOf(HttpsError);
    expect((error as HttpsError).code).toBe(code);
    return error as HttpsError;
  }
  throw new Error(`expected HttpsError "${code}" but the call resolved`);
}

describe("handleContact (callable request/response boundary)", () => {
  it("sends the Resend payload with secrets, reply_to and subject prefix", async () => {
    const fetchImpl = okFetch();
    const result = await handleContact(validPayload, {
      ip: ip(ipSeq++),
      fetchImpl,
    });
    expect(result).toEqual({ ok: true });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer re_test_key");

    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({
      from: "site@example.com",
      to: "inbox@example.com",
      reply_to: "ada@example.com",
      subject: "[Portfolio] Role inquiry",
      text: "From: Ada Lovelace <ada@example.com>\n\nI would like to talk about a position.",
    });
  });

  it("trims input before validating and sending", async () => {
    const fetchImpl = okFetch();
    await handleContact(
      { ...validPayload, name: "  Ada  ", message: "  Hello  " },
      { ip: ip(ipSeq++), fetchImpl },
    );
    const call = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    const body = JSON.parse(String(call[1].body));
    expect(body.text).toContain("From: Ada <ada@example.com>");
  });

  it("returns neutral success for honeypot without calling Resend", async () => {
    const fetchImpl = okFetch();
    const result = await handleContact(
      { ...validPayload, company: "Bot Inc" },
      { ip: ip(ipSeq++), fetchImpl },
    );
    expect(result).toEqual({ ok: true });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("rejects invalid payloads with invalid-argument and never calls Resend", async () => {
    const fetchImpl = okFetch();
    for (const patch of [
      { name: "" },
      { email: "not-an-email" },
      { subject: "x".repeat(151) },
      { message: "x".repeat(5001) },
      "not-an-object",
    ]) {
      const payload = typeof patch === "string" ? patch : { ...validPayload, ...patch };
      await expectHttpsError(
        handleContact(payload, { ip: ip(ipSeq++), fetchImpl }),
        "invalid-argument",
      );
    }
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("throws unavailable when Resend rejects and leaks no details", async () => {
    const fetchImpl = vi.fn(async () => ({ ok: false, status: 422 }) as Response);
    const error = await expectHttpsError(
      handleContact(validPayload, { ip: ip(ipSeq++), fetchImpl }),
      "unavailable",
    );
    expect(error.message).toBe("The message could not be sent. Please try again later.");
    expect(error.message).not.toContain("422");
  });

  it("throws unavailable when the Resend request itself fails", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("network down: secret-value-xyz");
    });
    const error = await expectHttpsError(
      handleContact(validPayload, { ip: ip(ipSeq++), fetchImpl }),
      "unavailable",
    );
    expect(error.message).not.toContain("secret-value-xyz");
  });

  it("rate limits repeated calls from one IP with resource-exhausted", async () => {
    const sharedIp = ip(ipSeq++);
    const fetchImpl = okFetch();
    for (let i = 0; i < 5; i += 1) {
      await handleContact(validPayload, { ip: sharedIp, fetchImpl });
    }
    await expectHttpsError(
      handleContact(validPayload, { ip: sharedIp, fetchImpl }),
      "resource-exhausted",
    );
    // Other IPs are unaffected.
    await expect(
      handleContact(validPayload, { ip: ip(ipSeq++), fetchImpl }),
    ).resolves.toEqual({ ok: true });
  });

  it("keeps secrets out of thrown errors", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("Bearer re_test_key rejected");
    });
    const error = await expectHttpsError(
      handleContact(validPayload, { ip: ip(ipSeq++), fetchImpl }),
      "unavailable",
    );
    expect(error.message).not.toContain("re_test_key");
  });
});