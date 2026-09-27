"use client";

import { useState } from "react";
import { useBooking } from "@/components/booking/booking-context";
import { BookingTrigger } from "@/components/booking/booking-trigger";
import { useLocale } from "@/components/providers/locale-provider";
import { Icon } from "@/components/ui/icon";
import { searchServiceAreas } from "@/lib/catalog";

export function ServiceAreas() {
  const { config } = useBooking();
  const { dictionary } = useLocale();
  const [query, setQuery] = useState("");
  const results = searchServiceAreas(config.serviceAreas, query, dictionary.areas);
  return <section className="section areas-section" id="service-areas" aria-labelledby="areas-title"><div className="container areas-layout"><div className="section-heading"><p className="section-label">{dictionary.ui.demoCoverage}</p><h2 id="areas-title">{dictionary.ui.areasTitle}</h2><p>{dictionary.ui.areasText}</p></div><div className="area-finder"><label htmlFor="area-search">{dictionary.ui.searchAreas}</label><div className="search-input"><Icon name="search" /><input id="area-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={dictionary.ui.searchAreas} autoComplete="off" /></div><div className="area-results" aria-live="polite">{!results.length ? <div className="area-empty"><Icon name="pin" width="28" height="28" /><h3>{dictionary.ui.noAreas}</h3><p>{dictionary.ui.noAreasHelp}</p><button type="button" className="text-link" onClick={() => setQuery("")}>{dictionary.ui.clear}</button></div> : <ul className="area-list">{results.map((area) => { const blocked = area.status === "coming-soon" || area.status === "unavailable"; const label = dictionary.areas[area.id as keyof typeof dictionary.areas] ?? area.name; return <li key={area.id}><div className="area-row"><span><strong>{label}</strong><small>{dictionary.coverage[area.status]}</small></span>{blocked ? <span className="area-blocked">{dictionary.ui.unavailable}</span> : <BookingTrigger selection={{ cityId: area.id }} className="area-button" aria-label={`${dictionary.ui.book}: ${label}`}><span>{dictionary.ui.areaChoose}</span><Icon name="arrow" /></BookingTrigger>}</div></li>; })}</ul>}</div><p className="small-copy">{dictionary.ui.demoCoverage}</p></div></div></section>;
}
