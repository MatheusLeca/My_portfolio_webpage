// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ContactForm from "./ContactForm";

const validInput = {
  Name: "Ada Lovelace",
  Email: "ada@example.com",
  Subject: "Role inquiry",
  Message: "I would like to talk about a position.",
};

function fillForm(values: Partial<Record<keyof typeof validInput, string>> = validInput) {
  for (const [label, value] of Object.entries(values)) {
    if (value !== undefined) {
      fireEvent.change(screen.getByLabelText(label), { target: { value } });
    }
  }
}

function submit() {
  fireEvent.click(screen.getByRole("button", { name: /send message|sending/i }));
}

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function okResponse() {
  return { ok: true, json: async () => ({ ok: true }) };
}

function failResponse(error?: string) {
  return {
    ok: false,
    json: async () => (error ? { ok: false, error } : {}),
  };
}

describe("ContactForm", () => {
  it("shows an accessible error summary and does not fetch on invalid input", () => {
    render(<ContactForm />);
    submit();
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("disables submit while sending, then shows the sent panel on success", async () => {
    let resolveCall!: (value: unknown) => void;
    fetchMock.mockReturnValue(new Promise((resolve) => (resolveCall = resolve)));

    render(<ContactForm />);
    fillForm();
    submit();

    const sendingButton = await screen.findByRole("button", { name: /sending/i });
    expect(sendingButton.hasAttribute("disabled")).toBe(true);
    expect(sendingButton.getAttribute("aria-busy")).toBe("true");

    // Duplicate submission while in flight is ignored.
    submit();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveCall(okResponse());
    expect(await screen.findByRole("status")).toBeTruthy();
    expect(screen.getByText("Message sent.")).toBeTruthy();
  });

  it("posts all fields including the honeypot as JSON", async () => {
    fetchMock.mockResolvedValue(okResponse());
    const { container } = render(<ContactForm />);
    fillForm();
    fireEvent.change(container.querySelector('input[name="company"]')!, {
      target: { value: "Acme Corp" },
    });
    submit();

    await screen.findByRole("status");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe(
      "application/json",
    );
    expect(JSON.parse(String(init.body))).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      subject: "Role inquiry",
      message: "I would like to talk about a position.",
      company: "Acme Corp",
    });
  });

  it("keeps entered values, shows the failure state and mailto fallback on server error", async () => {
    fetchMock.mockResolvedValue(
      failResponse("The message could not be sent. Please try again later."),
    );
    render(<ContactForm />);
    fillForm();
    submit();

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("Message not sent.");
    expect(alert.textContent).toContain("The message could not be sent.");

    // Values retained for retry.
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe(validInput.Name);
    expect((screen.getByLabelText("Message") as HTMLInputElement).value).toBe(validInput.Message);
    expect(screen.getByRole("link", { name: /email me directly/i })).toBeTruthy();

    // Retry works after failure.
    fetchMock.mockResolvedValue(okResponse());
    submit();
    expect(await screen.findByRole("status")).toBeTruthy();
  });

  it("falls back to the content-seam failure copy on network errors and bad bodies", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    render(<ContactForm />);
    fillForm();
    submit();

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("The message could not be sent. Please try again later.");

    // Non-JSON error body also lands on the content-seam copy.
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error("no json");
      },
    });
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Retry Person" } });
    submit();
    const retryAlert = await screen.findByRole("alert");
    expect(retryAlert.textContent).toContain("The message could not be sent. Please try again later.");
    await waitFor(() => expect(screen.getByRole("link", { name: /email me directly/i })).toBeTruthy());
  });
});