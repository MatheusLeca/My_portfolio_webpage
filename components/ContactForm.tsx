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

/**
 * Contact form endpoint. Uses Cloudflare Worker by default, falling back
 * to `/api/contact` for environments running a full Next.js server.
 */
const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/api/contact";

type FormStatus = "idle" | "sending" | "sent" | "error";

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
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-line bg-background p-8">
        <h3 className="font-display text-2xl font-bold text-foreground">
          {form.successTitle}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">
          {form.successBody}{" "}
          <a
            href={`mailto:${siteContent.contact.email}`}
            className="font-bold text-primary underline"
          >
            {siteContent.contact.email}
          </a>
        </p>
      </div>
    );
  }

  const errorEntries = Object.entries(errors) as [ContactField, string][];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const formData = new FormData(event.currentTarget);
    const input = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get(HONEYPOT_FIELD) ?? ""),
    };

    const validation = validateContact(input);
    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus("idle");
      setSubmissionError(null);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setSubmissionError(null);
    setStatus("sending");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validation.data, company: input.company }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setStatus("error");
        setSubmissionError(body?.error ?? form.failureBody);
        return;
      }
      setStatus("sent");
      formRef.current?.reset();
    } catch {
      setStatus("error");
      setSubmissionError(form.failureBody);
    }
  }

  const inputClass = (field: ContactField) =>
    `w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none ${
      errors[field] ? "border-red-400" : "border-line"
    }`;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label={form.title}>
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-400/60 bg-background p-5"
        >
          <h3 className="font-bold text-foreground">{form.failureTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {submissionError ?? form.failureBody}{" "}
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="font-bold text-primary underline"
            >
              {form.mailtoFallback}
            </a>
          </p>
        </div>
      )}

      <input
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="form-error-heading"
          className="mb-6 rounded-xl border border-red-400/60 bg-background p-5 focus:outline-none"
        >
          <h3 id="form-error-heading" className="font-bold text-foreground">
            {form.errorSummaryTitle}
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#contact-${field}`} className="underline">
                  {message}
                </a>
              </li>
            ))}
          </ul>
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

      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className="w-full cursor-pointer rounded-full bg-action px-6 py-4 text-[11px] font-bold tracking-[0.24em] text-on-action uppercase transition-colors hover:bg-action-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none disabled:cursor-wait disabled:opacity-70 xl:text-xs 2xl:py-5 2xl:text-[13px]"
      >
        {status === "sending" ? form.sending : form.submit}
      </button>
    </form>
  );
}
