/**
 * Contact-form validation shared by the client (instant feedback), the
 * Next.js route, and the Firebase callable (authoritative). Lives inside
 * `functions/` so the deployed Cloud Function bundles it without reaching
 * outside its source directory; `lib/contact` re-exports it for the app.
 * No secrets here — safe to import anywhere.
 */

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

/** Honeypot field: real visitors leave it empty; bots tend to fill it. */
export const HONEYPOT_FIELD = "company";

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** What the client submits: valid fields plus the honeypot. */
export type ContactPayload = ContactInput & { company?: string };

export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ContactErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function required(value: string, fieldName: string): string | null {
  return value.length > 0 ? null : `${fieldName} is required.`;
}

export function validateContact(input: unknown): ContactValidationResult {
  const source =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};
  const read = (key: ContactField): string => {
    const value = source[key];
    return typeof value === "string" ? value.trim() : "";
  };

  const data: ContactInput = {
    name: read("name"),
    email: read("email"),
    subject: read("subject"),
    message: read("message"),
  };
  const errors: ContactErrors = {};

  const nameError =
    required(data.name, "Name") ??
    (data.name.length > CONTACT_LIMITS.name
      ? `Name must be ${CONTACT_LIMITS.name} characters or fewer.`
      : null);
  if (nameError) errors.name = nameError;

  const emailError =
    required(data.email, "Email") ??
    (!EMAIL_PATTERN.test(data.email) ? "Enter a valid email address." : null) ??
    (data.email.length > CONTACT_LIMITS.email
      ? `Email must be ${CONTACT_LIMITS.email} characters or fewer.`
      : null);
  if (emailError) errors.email = emailError;

  const subjectError =
    required(data.subject, "Subject") ??
    (data.subject.length > CONTACT_LIMITS.subject
      ? `Subject must be ${CONTACT_LIMITS.subject} characters or fewer.`
      : null);
  if (subjectError) errors.subject = subjectError;

  const messageError =
    required(data.message, "Message") ??
    (data.message.length > CONTACT_LIMITS.message
      ? `Message must be ${CONTACT_LIMITS.message} characters or fewer.`
      : null);
  if (messageError) errors.message = messageError;

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}

/** Neutral message for provider failures — never leaks provider detail. */
export const CONTACT_SEND_FAILURE =
  "The message could not be sent. Please try again later.";