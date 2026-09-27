"use client";

import { useRef, useState } from "react";
import type { Treatment, TreatmentCategory } from "@/config/types";
import { treatmentCategories } from "@/data/categories";
import { useBooking } from "@/components/booking/booking-context";
import { useLocale } from "@/components/providers/locale-provider";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Icon } from "@/components/ui/icon";
import { searchTreatments } from "@/lib/catalog";
import { TreatmentCard } from "./treatment-card";
import { TreatmentDetails } from "./treatment-details";

export function Treatments() {
  const { config } = useBooking();
  const { language, dictionary } = useLocale();
  const { remember } = usePreferences();
  const [category, setCategory] = useState<TreatmentCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<{ treatment: Treatment; duration: string } | null>(null);
  const detailTriggerRef = useRef<HTMLElement | null>(null);
  const filtered = searchTreatments(config.treatments, category, query, language);
  function openDetails(treatment: Treatment, duration: string, trigger: HTMLElement) {
    detailTriggerRef.current = trigger;
    remember(treatment.id);
    setDetail({ treatment, duration });
  }
  return <>
    <section className="section treatments-section" id="treatments" aria-labelledby="treatments-title"><div className="container">
      <div className="section-heading split-heading"><div><p className="section-label">{dictionary.ui.browse}</p><h2 id="treatments-title">{dictionary.ui.catalogTitle}</h2></div><p>{dictionary.ui.catalogText}</p></div>
      <div className="catalog-toolbar"><div className="category-filters" role="group" aria-label={dictionary.ui.treatments}>{treatmentCategories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{dictionary.categories[item]}</button>)}</div><label className="catalog-search"><span className="visually-hidden">{dictionary.ui.searchTreatments}</span><Icon name="search" width="17" height="17" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={dictionary.ui.searchPlaceholder} /></label></div>
      <div className="catalog-meta"><p role="status">{filtered.length} {dictionary.ui.results}</p><p>{config.pricingMode === "demonstration" ? dictionary.ui.demoPricing : `${config.currency}`}</p></div>
      <div className="treatment-grid">{filtered.map((treatment) => <TreatmentCard key={treatment.id} treatment={treatment} config={config} onDetails={openDetails} />)}</div>
      {!filtered.length && <div className="empty-copy"><h3>{dictionary.ui.noTreatments}</h3><p>{dictionary.ui.noTreatmentsHelp}</p><button type="button" className="text-link" onClick={() => { setQuery(""); setCategory("all"); }}>{dictionary.ui.reset}</button></div>}
      <p className="catalog-disclaimer">{dictionary.ui.availabilityNote}</p>
    </div></section>
    {detail && <TreatmentDetails treatment={detail.treatment} initialDuration={detail.duration} config={config} triggerRef={detailTriggerRef} onClose={() => setDetail(null)} />}
  </>;
}
