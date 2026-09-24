// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { callableMock } = vi.hoisted(() => ({ callableMock: vi.fn() }));

vi.mock("@/lib/firebase", () => ({
  initFirebaseAppCheck: vi.fn(),
  getContactSender: vi.fn(() => callableMock),
}));

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

beforeEach(() => {
  callableMock.mockReset();
});

describe("ContactForm", () => {
  it("shows an accessible error summary and does not call the function on invalid input", () => {
    render(<ContactForm />);
    submit();
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(callableMock).not.toHaveBeenCalled();
  });

  it("disables submit while sending, then shows the sent panel on success", async () => {
    let resolveCall!: (value: unknown) => void;
    callableMock.mockReturnValue(new Promise((resolve) => (resolveCall = resolve)));

    render(<ContactForm />);
    fillForm();
    submit();

    const sendingButton = await screen.findByRole("button", { name: /sending/i });
    expect(sendingButton.hasAttribute("disabled")).toBe(true);
    expect(sendingButton.getAttribute("aria-busy")).toBe("true");

    // Duplicate submission while in flight is ignored.
    submit();
    expect(callableMock).toHaveBeenCalledTimes(1);

    resolveCall({ data: { ok: true } });
    expect(await screen.findByRole("status")).toBeTruthy();
    expect(screen.getByText("Message sent.")).toBeTruthy();
  });

  it("sends all fields including the honeypot to the callable function", async () => {
    callableMock.mockResolvedValue({ data: { ok: true } });
    const { container } = render(<ContactForm />);
    fillForm();
    fireEvent.change(container.querySelector('input[name="company"]')!, {
      target: { value: "Acme Corp" },
    });
    submit();

    await screen.findByRole("status");
    expect(callableMock).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      subject: "Role inquiry",
      message: "I would like to talk about a position.",
      company: "Acme Corp",
    });
  });

  it("keeps entered values, shows the failure state and mailto fallback on server error", async () => {
    callableMock.mockRejectedValue(new Error("The message could not be sent. Please try again later."));
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
    callableMock.mockResolvedValue({ data: { ok: true } });
    submit();
    expect(await screen.findByRole("status")).toBeTruthy();
  });

  it("falls back to a plain message when the error carries no readable message", async () => {
    callableMock.mockRejectedValue({ code: "internal" });
    render(<ContactForm />);
    fillForm();
    submit();
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("The message could not be sent. Please try again later.");
    await waitFor(() => expect(screen.getByRole("link", { name: /email me directly/i })).toBeTruthy());
  });
});