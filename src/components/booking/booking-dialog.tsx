"use client";

import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { Icon } from "@/components/ui/icon";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useBooking } from "./booking-context";
import { BookingForm } from "./booking-form";

export function BookingDialog({ triggerRef }: { triggerRef: RefObject<HTMLElement | null> }) {
  const { closeBooking } = useBooking();
  const { dictionary } = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const scrollY = window.scrollY;
    const original = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width, overflow: document.body.style.overflow };
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.querySelector<HTMLElement>(".booking-fields")?.focus({ preventScroll: true });
    const trigger = triggerRef.current;
    return () => {
      dialog.close();
      Object.assign(document.body.style, original);
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [triggerRef]);

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex="0"]')).filter((element) => element.getClientRects().length > 0);
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  return <dialog ref={dialogRef} className="booking-dialog" aria-labelledby="booking-title" aria-describedby="booking-intro" onCancel={(event) => { event.preventDefault(); closeBooking(); }} onClose={(event) => { if (!event.currentTarget.open) closeBooking(); }} onKeyDown={trapFocus}>
    <div className="dialog-heading"><div><p className="section-label">{dictionary.ui.demoBadge}</p><h2 id="booking-title">{dictionary.ui.bookingTitle}</h2></div><div className="dialog-heading-actions"><LanguageSwitcher compact /><button type="button" className="icon-button" onClick={closeBooking} aria-label={dictionary.ui.close}><Icon name="close" /></button></div></div>
    <div className="dialog-content"><p id="booking-intro" className="dialog-intro">{dictionary.ui.bookingSubtitle}</p><BookingForm /></div>
  </dialog>;
}
