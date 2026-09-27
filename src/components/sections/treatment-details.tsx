"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import type { BusinessConfig, Treatment } from "@/config/types";
import { useLocale } from "@/components/providers/locale-provider";
import { usePreferences } from "@/components/providers/preferences-provider";
import { BookingTrigger } from "@/components/booking/booking-trigger";
import { Icon } from "@/components/ui/icon";
import { WellnessVisual } from "@/components/ui/wellness-visual";
import { getTreatmentOption } from "@/lib/catalog";
import { formatPrice } from "@/lib/currency";

export function TreatmentDetails({ treatment, initialDuration, config, triggerRef, onClose }: { treatment: Treatment; initialDuration: string; config: BusinessConfig; triggerRef: RefObject<HTMLElement | null>; onClose: () => void }) {
  const { language, dictionary } = useLocale();
  const { favorites, toggleFavorite } = usePreferences();
  const [duration, setDuration] = useState(initialDuration);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const copy = dictionary.treatments[treatment.id];
  const option = getTreatmentOption(treatment, duration);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const scrollY = window.scrollY;
    const original = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width, overflow: document.body.style.overflow };
    Object.assign(document.body.style, { position: "fixed", top: `-${scrollY}px`, width: "100%", overflow: "hidden" });
    dialog.showModal();
    dialog.querySelector<HTMLElement>(".detail-close")?.focus();
    const trigger = triggerRef.current;
    return () => { dialog.close(); Object.assign(document.body.style, original); window.scrollTo({ top: scrollY, left: 0, behavior: "instant" }); if (trigger?.isConnected) trigger.focus({ preventScroll: true }); };
  }, [triggerRef]);
  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), select:not([disabled]), a[href]')).filter((element) => element.getClientRects().length > 0);
    const first = elements[0]; const last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  return <dialog ref={dialogRef} className="detail-dialog" aria-labelledby="detail-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClose={(event) => { if (!event.currentTarget.open) onClose(); }} onKeyDown={trapFocus}>
    <div className="detail-visual"><WellnessVisual id={treatment.visual} /></div>
    <div className="detail-content"><button type="button" className="icon-button detail-close" aria-label={dictionary.ui.close} onClick={onClose}><Icon name="close" /></button><p className="section-label">{dictionary.categories[treatment.category]}{treatment.isDemo ? ` · ${dictionary.ui.demoBadge}` : ""}</p><h2 id="detail-title">{copy.title}</h2><p className="detail-description">{copy.detail}</p><div className="detail-section"><h3>{dictionary.ui.benefits}</h3><ul>{copy.benefits.map((benefit) => <li key={benefit}><Icon name="check" width="17" height="17" />{benefit}</li>)}</ul></div><div className="detail-section"><h3>{dictionary.ui.preparation}</h3><p>{copy.preparation}</p></div><div className="detail-pricing"><label htmlFor="detail-duration">{dictionary.ui.duration}</label><select id="detail-duration" value={duration} onChange={(event) => setDuration(event.target.value)}>{treatment.options.map((item) => <option key={item.minutes} value={item.minutes}>{item.minutes} {dictionary.ui.minutes}{item.minutes === treatment.recommendedMinutes ? ` · ${dictionary.ui.recommended}` : ""}</option>)}</select><strong>{option ? formatPrice(option.price, { ...config, locale: language === "id" ? "id-ID" : "en-ID" }) : dictionary.ui.unavailable}</strong></div><p className="detail-availability"><span aria-hidden="true" />{dictionary.ui.availability}: {config.pricingMode === "demonstration" ? dictionary.ui.demoSchedule : dictionary.ui.liveTimeHelp}</p><p className="small-copy">{dictionary.ui.availabilityNote}</p><div className="detail-actions"><button type="button" className="button button-secondary" onClick={() => toggleFavorite(treatment.id)}>{favorites.includes(treatment.id) ? dictionary.ui.remove : dictionary.ui.save}</button><BookingTrigger selection={{ treatmentId: treatment.id, durationMinutes: duration }} className="button button-primary" onClick={onClose}>{dictionary.ui.book}<Icon name="arrow" /></BookingTrigger></div></div>
  </dialog>;
}
