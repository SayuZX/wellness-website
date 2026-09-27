"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { Icon } from "@/components/ui/icon";
import { formatBookingDate } from "@/lib/business-time";
import { getTreatment, getTreatmentOption } from "@/lib/catalog";
import { formatPrice } from "@/lib/currency";
import { localizeTimeZoneLabel } from "@/lib/time-zone-label";
import { useBooking } from "./booking-context";

export function BookingSummary() {
  const summaryRef = useRef<HTMLDetailsElement>(null);
  const { config, draft } = useBooking();
  const { language, dictionary } = useLocale();
  const treatment = getTreatment(config, draft.treatmentId);
  const option = getTreatmentOption(treatment, draft.durationMinutes);
  const city = config.serviceAreas.find((area) => area.id === draft.cityId);
  const therapist = config.therapists.find((item) => item.id === draft.therapistId);
  const preference = therapist?.name ?? (draft.therapistPreference ? dictionary.ui[draft.therapistPreference] : dictionary.ui.noPreference);
  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => { if (summaryRef.current) summaryRef.current.open = media.matches; };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return <details ref={summaryRef} className="booking-summary" open onToggle={(event) => { if (!event.currentTarget.open && window.matchMedia?.("(min-width: 768px)").matches) event.currentTarget.open = true; }}>
    <summary><span><Icon name="home" width="22" height="22" />{dictionary.ui.summary}</span><Icon name="chevron" width="16" height="16" /></summary>
    <dl>
      <div><dt>{dictionary.ui.treatment}</dt><dd>{treatment ? dictionary.treatments[treatment.id].title : dictionary.ui.missingChoice}</dd></div>
      <div><dt>{dictionary.ui.duration}</dt><dd>{option ? `${option.minutes} ${dictionary.ui.minutes}` : dictionary.ui.missingChoice}</dd></div>
      <div><dt>{dictionary.ui.location}</dt><dd>{city ? dictionary.areas[city.id as keyof typeof dictionary.areas] ?? city.name : dictionary.ui.missingChoice}</dd></div>
      <div><dt>{dictionary.ui.date}</dt><dd>{formatBookingDate(draft.date, language, dictionary.ui.chooseDate)}</dd></div>
      <div><dt>{dictionary.ui.time}</dt><dd>{draft.time || dictionary.ui.missingChoice}</dd></div>
      <div><dt>{dictionary.ui.preference}</dt><dd>{preference}</dd></div>
    </dl>
    <p className="summary-timezone">{localizeTimeZoneLabel(config, language)}</p>
    <div className="summary-total" aria-live="polite" aria-atomic="true"><span>{config.pricingMode === "demonstration" ? dictionary.ui.estimatedTotal : dictionary.ui.liveEstimate}</span><strong>{option ? formatPrice(option.price, { ...config, locale: language === "id" ? "id-ID" : "en-ID" }) : dictionary.ui.unavailable}</strong></div>
    {treatment?.id === "couples-massage" && <p className="summary-couples">{dictionary.ui.couplesTotal}</p>}
    <p className="small-copy">{dictionary.ui.priceNote}</p>
  </details>;
}
