import { beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProviders } from "@/components/providers/app-providers";
import { BookingTrigger } from "@/components/booking/booking-trigger";
import { businessConfig } from "@/config/business";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
  window.scrollTo = () => undefined;
});

function TestBooking() {
  return <AppProviders config={businessConfig}><BookingTrigger>Book a session</BookingTrigger><BookingTrigger selection={{ treatmentId: "hot-stone-massage", durationMinutes: "120" }}>Choose stones</BookingTrigger></AppProviders>;
}

describe("guided booking", () => {
  it("opens on treatment selection and preserves a valid trigger preselection", async () => {
    const user = userEvent.setup();
    render(<TestBooking />);
    await user.click(screen.getByRole("button", { name: "Choose stones" }));
    expect(screen.getByRole("button", { name: /Hot Stone Massage/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Step 1 of 8")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Continue/ }));
    expect(screen.getByRole("button", { name: /120 min/ })).toHaveAttribute("aria-pressed", "true");
  });
  it("can complete the demo flow without a WhatsApp recipient", async () => {
    const user = userEvent.setup();
    render(<TestBooking />);
    await user.click(screen.getByRole("button", { name: "Book a session" }));
    await user.click(screen.getByRole("button", { name: /Swedish Relaxation Massage/ }));
    await user.click(screen.getByRole("button", { name: /Continue/ }));
    await user.click(screen.getByRole("button", { name: /90 min/ }));
    await user.click(screen.getByRole("button", { name: /Continue/ }));
    await user.click(screen.getByRole("button", { name: /South Jakarta/ }));
    await user.click(screen.getByRole("button", { name: /Continue/ }));
    expect(screen.getByText(/Simulated schedule/)).toBeInTheDocument();
    expect(screen.queryByText(/WhatsApp recipient has not been configured/)).not.toBeInTheDocument();
  });
  it("switches language without discarding the open flow", async () => {
    const user = userEvent.setup();
    render(<TestBooking />);
    await user.click(screen.getByRole("button", { name: "Book a session" }));
    await user.click(screen.getByRole("button", { name: "ID" }));
    expect(screen.getByText("Langkah 1 dari 8")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Luangkan waktu untuk Anda." })).toBeInTheDocument();
  });
});
