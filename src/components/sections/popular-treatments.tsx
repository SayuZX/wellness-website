"use client";

import { useRef, useState } from "react";
import type { Treatment } from "@/config/types";
import { useBooking } from "@/components/booking/booking-context";
import { useLocale } from "@/components/providers/locale-provider";
import { usePreferences } from "@/components/providers/preferences-provider";
import { TreatmentCard } from "./treatment-card";
import { TreatmentDetails } from "./treatment-details";

export function PopularTreatments() {
  const { config } = useBooking();
  const { dictionary } = useLocale();
  const { remember } = usePreferences();
  const [detail, setDetail] = useState<{ treatment: Treatment; duration: string } | null>(null);
  const detailTriggerRef = useRef<HTMLElement | null>(null);
  const items = config.treatments.filter((item) => item.popular).slice(0, 3);
  if (!items.length) return null;
  return <><section className="section popular-section" aria-labelledby="popular-title"><div className="container"><div className="section-heading split-heading"><div><p className="section-label">{config.pricingMode === "demonstration" ? dictionary.ui.demoSelection : dictionary.ui.popularBadge}</p><h2 id="popular-title">{dictionary.ui.popularTitle}</h2></div><p>{dictionary.ui.popularText}</p></div><div className="treatment-grid popular-grid">{items.map((item) => <TreatmentCard key={item.id} treatment={item} config={config} onDetails={(treatment, duration, trigger) => { detailTriggerRef.current = trigger; remember(treatment.id); setDetail({ treatment, duration }); }} />)}</div><a href="#treatments" className="text-link popular-link">{dictionary.ui.allCatalog}<span aria-hidden="true">↓</span></a></div></section>{detail && <TreatmentDetails treatment={detail.treatment} initialDuration={detail.duration} config={config} triggerRef={detailTriggerRef} onClose={() => setDetail(null)} />}</>;
}
