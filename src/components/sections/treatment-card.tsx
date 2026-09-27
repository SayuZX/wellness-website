"use client";

import { useState } from "react";
import type { BusinessConfig, Treatment } from "@/config/types";
import { useLocale } from "@/components/providers/locale-provider";
import { usePreferences } from "@/components/providers/preferences-provider";
import { BookingTrigger } from "@/components/booking/booking-trigger";
import { Icon } from "@/components/ui/icon";
import { WellnessVisual } from "@/components/ui/wellness-visual";
import { getTreatmentOption } from "@/lib/catalog";
import { formatPrice } from "@/lib/currency";

export function TreatmentCard({ treatment, config, onDetails }: { treatment: Treatment; config: BusinessConfig; onDetails?: (treatment: Treatment, duration: string, trigger: HTMLElement) => void }) {
  const { language, dictionary } = useLocale();
  const { favorites, toggleFavorite } = usePreferences();
  const [duration, setDuration] = useState(String(treatment.options.find((item) => item.minutes === treatment.recommendedMinutes)?.minutes ?? treatment.options[0]?.minutes ?? ""));
  const option = getTreatmentOption(treatment, duration);
  const copy = dictionary.treatments[treatment.id];
  const saved = favorites.includes(treatment.id);
  return <article className="treatment-card" aria-labelledby={`title-${treatment.id}`}>
    <div className="treatment-image-wrap"><WellnessVisual id={treatment.visual} sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 33vw" /><span className="treatment-image-label">{dictionary.categories[treatment.category]}</span>{treatment.popular && <span className="popular-badge">{treatment.isDemo ? dictionary.ui.demoSelection : dictionary.ui.popularBadge}</span>}<button type="button" className="favorite-button" aria-pressed={saved} aria-label={saved ? dictionary.ui.remove : dictionary.ui.save} onClick={() => toggleFavorite(treatment.id)}><span aria-hidden="true">{saved ? "♥" : "♡"}</span></button></div>
    <div className="treatment-copy"><h3 id={`title-${treatment.id}`}>{copy.title}</h3><p>{copy.description}</p></div>
    <div className="treatment-options"><label htmlFor={`duration-${treatment.id}`} className="visually-hidden">{dictionary.ui.duration}: {copy.title}</label><div className="duration-control"><Icon name="clock" width="16" height="16" /><select id={`duration-${treatment.id}`} value={duration} onChange={(event) => setDuration(event.target.value)}>{treatment.options.map((item) => <option key={item.minutes} value={item.minutes}>{item.minutes} {dictionary.ui.minutes}</option>)}</select></div><strong aria-live="polite" aria-atomic="true">{option ? formatPrice(option.price, { ...config, locale: language === "id" ? "id-ID" : "en-ID" }) : dictionary.ui.unavailable}</strong></div>
    <div className="treatment-actions"><button type="button" className="treatment-details" onClick={(event) => onDetails?.(treatment, duration, event.currentTarget)}>{dictionary.ui.details}</button><BookingTrigger selection={{ treatmentId: treatment.id, durationMinutes: duration }} className="treatment-book" disabled={!option} aria-label={`${dictionary.ui.choose}: ${copy.title}`}>{dictionary.ui.choose}<Icon name="arrow" width="18" height="18" /></BookingTrigger></div>
  </article>;
}
