import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function reportOnlyPolicy(): string {
  const raw = readFileSync(resolve(process.cwd(), "firebase.json"), "utf-8");
  const config = JSON.parse(raw) as {
    hosting?: {
      headers?: { source: string; headers: { key: string; value: string }[] }[];
    };
  };
  const entry = (config.hosting?.headers ?? []).find((h) =>
    h.headers.some((x) => x.key === "Content-Security-Policy"),
  );
  expect(entry, "hosting headers cover /** with enforced CSP").toBeDefined();
  return entry!.headers.find((x) => x.key === "Content-Security-Policy")!.value;
}

describe("enforced CSP (slices 1-3)", () => {
  it("serves a self-first policy with no eval", () => {
    const policy = reportOnlyPolicy();
    for (const directive of [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ]) {
      expect(policy).toContain(directive);
    }
    expect(policy).not.toContain("unsafe-eval");
  });
});

describe("third-party allowlist (slice 2)", () => {
  it("permits analytics, bot protection, and contact backends", () => {
    const policy = reportOnlyPolicy();
    for (const host of [
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://firebaseinstallations.googleapis.com",
      "https://firebase.googleapis.com",
      "https://www.google.com",
      "https://www.gstatic.com",
      "https://www.recaptcha.net",
      "https://us-central1-my-portfolio-874e7.cloudfunctions.net",
    ]) {
      expect(policy).toContain(host);
    }
    expect(policy).toContain("frame-src");
  });
});
