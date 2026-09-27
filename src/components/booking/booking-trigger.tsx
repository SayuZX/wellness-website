"use client";

import type { ButtonHTMLAttributes } from "react";
import type { BookingSelection } from "@/config/types";
import { useBooking } from "./booking-context";

export function BookingTrigger({ selection, children, className = "button button-primary", onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { selection?: BookingSelection }) {
  const { openBooking } = useBooking();
  return <button {...props} type="button" className={className} onClick={(event) => {
    onClick?.(event);
    if (!event.defaultPrevented) openBooking(selection, event.currentTarget);
  }}>{children}</button>;
}
