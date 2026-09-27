"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { useBooking } from "@/components/booking/booking-context";

export function DemoNotice() {
  const { config } = useBooking();
  const { dictionary } = useLocale();
  if (config.pricingMode !== "demonstration") return null;
  return <div className="demo-banner" role="note">{dictionary.ui.demoBanner}</div>;
}
