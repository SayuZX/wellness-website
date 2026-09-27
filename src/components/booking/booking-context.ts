"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { BookingDraft, BookingSelection, BusinessConfig } from "@/config/types";

type BookingContextValue = {
  config: BusinessConfig;
  draft: BookingDraft;
  setDraft: Dispatch<SetStateAction<BookingDraft>>;
  openBooking: (selection?: BookingSelection, trigger?: HTMLElement) => void;
  closeBooking: () => void;
};

export const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) throw new Error("Booking components require a BookingProvider.");
  return context;
}
