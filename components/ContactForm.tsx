"use client";

import { useRef, useState } from "react";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";
import { siteContent } from "@/lib/content";

type FormStatus = "idle" | "submitting" | "sent" | "failed";

const FIELDS: { key: ContactField; label: string; type: "text" | "email" | "textarea" }[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "subject", label: "Subject", type: "text" },
  { key: "message", label: "Message", type: "textarea" },
];

export default function ContactForm() {
  const { form } = siteContent.contact;
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-line bg-background p-8">
        <h3 className="font-display text-2xl font-bold text-foreground">
          {form.successTitle}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{form.successBody}</p>
      </div>
    );
  }

  const errorEntries = Object.entries(errors) as [ContactField, string][];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const input = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const validation = validateContact(input);
    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setServerError(null);
    setStatus("submitting");

    try {
      const endpoint =
        process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/api/contact";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validation.data,
          [HONEYPOT_FIELD]: String(formData.get(HONEYPOT_FIELD) ?? ""),
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        errors?: ContactErrors;
        error?: string;
      } | null;

      if (response.ok && payload?.ok) {
        setStatus("sent");
        formRef.current?.reset();
        return;
      }
      if (payload?.errors) setErrors(payload.errors);
      setServerError(payload?.error ?? form.failureBody);
      setStatus("failed");
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setServerError(form.failureBody);
      setStatus("failed");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const inputClass = (field: ContactField) =>
    `w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none ${
      errors[field] ? "border-red-400" : "border-line"
    }`;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label={form.title}>
      {(errorEntries.length > 0 || status === "failed") && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="form-error-heading"
          className="mb-6 rounded-xl border border-red-400/60 bg-background p-5 focus:outline-none"
        >
          <h3 id="form-error-heading" className="font-bold text-foreground">
            {status === "failed" && errorEntries.length === 0
              ? form.failureTitle
              : form.errorSummaryTitle}
          </h3>
          {status === "failed" && (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {serverError}{" "}
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="font-bold text-primary underline"
              >
                {form.mailtoFallback}
              </a>
            </p>
          )}
          {errorEntries.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <a href={`#contact-${field}`} className="underline">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {FIELDS.map((field) => {
        const id = `contact-${field.key}`;
        const errorId = `${id}-error`;
        const maxLength =
          CONTACT_LIMITS[field.key as keyof typeof CONTACT_LIMITS];
        return (
          <div key={field.key} className="mb-4">
            <label
              htmlFor={id}
              className="mb-2 block text-[11px] font-bold tracking-[0.2em] text-muted uppercase"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={id}
                name={field.key}
                rows={4}
                maxLength={maxLength}
                required
                aria-invalid={Boolean(errors[field.key])}
                aria-describedby={errors[field.key] ? errorId : undefined}
                placeholder={form.placeholders[field.key]}
                className={`${inputClass(field.key)} resize-y overflow-x-hidden`}
              />
            ) : (
              <input
                id={id}
                name={field.key}
                type={field.type}
                autoComplete={field.key === "email" ? "email" : field.key === "name" ? "name" : undefined}
                maxLength={maxLength}
                required
                aria-invalid={Boolean(errors[field.key])}
                aria-describedby={errors[field.key] ? errorId : undefined}
                placeholder={form.placeholders[field.key]}
                className={inputClass(field.key)}
              />
            )}
            {errors[field.key] ? (
              <p id={errorId} className="mt-2 text-sm text-red-400">
                {errors[field.key]}
              </p>
            ) : null}
          </div>
        );
      })}

      {/* Honeypot: hidden from sighted and screen-reader visitors alike. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden">
        <label>
          Company
          <input
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full cursor-pointer rounded-full bg-action px-6 py-4 text-[11px] font-bold tracking-[0.24em] text-on-action uppercase transition-colors hover:bg-action-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? form.sending : form.submit}
      </button>
    </form>
  );
}
