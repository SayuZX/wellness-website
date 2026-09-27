"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import type { BookingDraft, BookingSelection, BusinessConfig } from "@/config/types";
import { getTreatment, getTreatmentOption } from "@/lib/catalog";
import { BookingContext } from "./booking-context";
import { BookingDialog } from "./booking-dialog";

export function BookingProvider({ config, children }: { config: BusinessConfig; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [draft, setDraft] = useState<BookingDraft>(() => ({
    fullName: "", cityId: "", treatmentId: config.treatments[0]?.id ?? "",
    durationMinutes: String(config.treatments[0]?.options[0]?.minutes ?? ""),
    date: "", time: "", address: "", therapistPreference: "", therapistId: "", notes: "", consent: false,
  }));

  const openBooking = useCallback((selection?: BookingSelection, trigger?: HTMLElement) => {
    triggerRef.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setDraft((current) => {
      const treatmentId = selection?.treatmentId ?? (selection ? current.treatmentId : config.treatments[0]?.id ?? "");
      const treatment = getTreatment(config, treatmentId);
      const requestedDuration = selection?.durationMinutes ?? (selection ? current.durationMinutes : String(treatment?.options[0]?.minutes ?? ""));
      return {
        ...current, ...selection, treatmentId,
        durationMinutes: getTreatmentOption(treatment, requestedDuration) ? requestedDuration : String(treatment?.options[0]?.minutes ?? ""),
      };
    });
    setIsOpen(true);
  }, [config]);

  const closeBooking = useCallback(() => setIsOpen(false), []);

  return <BookingContext.Provider value={{ config, draft, setDraft, openBooking, closeBooking }}>
    {children}
    {isOpen && <BookingDialog triggerRef={triggerRef} />}
  </BookingContext.Provider>;
}
