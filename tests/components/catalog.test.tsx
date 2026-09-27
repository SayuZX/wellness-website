import { beforeAll, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProviders } from "@/components/providers/app-providers";
import { Treatments } from "@/components/sections/treatments";
import { ServiceAreas } from "@/components/sections/service-areas";
import { Testimonials } from "@/components/sections/testimonials";
import { businessConfig } from "@/config/business";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
  window.scrollTo = () => undefined;
});

function renderApp(content: React.ReactNode, config = businessConfig) {
  return render(<AppProviders config={config}>{content}</AppProviders>);
}

describe("treatment catalog", () => {
  it("filters and searches localized treatment content", async () => {
    const user = userEvent.setup();
    renderApp(<Treatments />);
    expect(screen.getAllByRole("article")).toHaveLength(11);
    await user.click(screen.getByRole("button", { name: "Recovery" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
    await user.click(screen.getByRole("button", { name: "All treatments" }));
    await user.type(screen.getByPlaceholderText(/relaxation, shoulders/i), "aromatherapy");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Aromatherapy Massage" })).toBeInTheDocument();
  });
  it("updates price, favorite state, and details recency", async () => {
    const user = userEvent.setup();
    renderApp(<Treatments />);
    const card = screen.getByRole("article", { name: "Full Body Massage" });
    await user.selectOptions(within(card).getByLabelText(/Duration: Full Body Massage/), "120");
    expect(within(card).getByText(/450\.000/)).toBeInTheDocument();
    await user.click(within(card).getByRole("button", { name: "Save treatment" }));
    expect(within(card).getByRole("button", { name: "Remove from favorites" })).toHaveAttribute("aria-pressed", "true");
    await user.click(within(card).getByRole("button", { name: "View details" }));
    expect(screen.getByRole("dialog", { name: "Full Body Massage" })).toBeInTheDocument();
  });
});

describe("service areas", () => {
  it("shows demo statuses and blocks an unavailable area", async () => {
    const user = userEvent.setup();
    renderApp(<ServiceAreas />);
    await user.type(screen.getByLabelText("Find your area"), "Bali");
    expect(screen.getByText("Unavailable in demo")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Bali/ })).not.toBeInTheDocument();
  });
});

it("omits testimonials when demo reviews are disabled", () => {
  const { container } = renderApp(<Testimonials items={[]} />);
  expect(container).toBeEmptyDOMElement();
});
