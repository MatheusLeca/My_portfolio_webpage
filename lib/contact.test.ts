import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, validateContact } from "./contact";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Role inquiry",
  message: "I would like to talk about a position.",
};

describe("validateContact", () => {
  it("accepts a valid payload and returns trimmed data", () => {
    const result = validateContact({
      ...valid,
      name: "  Ada Lovelace  ",
      email: "  ada@example.com  ",
    });
    expect(result).toEqual({ ok: true, data: valid });
  });

  it("requires every field", () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.errors).sort()).toEqual([
      "email",
      "message",
      "name",
      "subject",
    ]);
  });

  it("rejects malformed email addresses", () => {
    for (const email of ["not-an-email", "a@b", "a b@c.com", "@example.com"]) {
      const result = validateContact({ ...valid, email });
      expect(result.ok, `email: ${email}`).toBe(false);
      if (!result.ok) expect(result.errors.email).toBe("Enter a valid email address.");
    }
  });

  it("enforces length limits", () => {
    const overlong = (n: number) => "x".repeat(n);
    const cases: [keyof typeof valid, string][] = [
      ["name", overlong(CONTACT_LIMITS.name)],
      // Exactly at the 254-char email limit while staying a valid address.
      ["email", `${"a".repeat(CONTACT_LIMITS.email - "@example.com".length)}@example.com`],
      ["subject", overlong(CONTACT_LIMITS.subject)],
      ["message", overlong(CONTACT_LIMITS.message)],
    ];
    for (const [field, value] of cases) {
      const result = validateContact({ ...valid, [field]: value });
      expect(result.ok, `field: ${field}`).toBe(true);
      const over = validateContact({
        ...valid,
        [field]: `${value}x`,
      });
      expect(over.ok, `field over limit: ${field}`).toBe(false);
      if (!over.ok) expect(over.errors[field]).toBeDefined();
    }
  });

  it("treats non-string and non-object input as empty", () => {
    for (const input of [null, undefined, 42, "spam", ["a"]]) {
      const result = validateContact(input);
      expect(result.ok, `input: ${String(input)}`).toBe(false);
    }
  });
});