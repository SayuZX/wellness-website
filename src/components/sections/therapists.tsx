"use client";

import { useBooking } from "@/components/booking/booking-context";
import { BookingTrigger } from "@/components/booking/booking-trigger";
import { useLocale } from "@/components/providers/locale-provider";
import { WellnessVisual } from "@/components/ui/wellness-visual";

export function Therapists() {
  const { config } = useBooking();
  const { dictionary } = useLocale();
  if (!config.therapists.length) return null;
  return <section className="section therapist-section" id="therapists" aria-labelledby="therapist-title"><div className="container"><div className="section-heading split-heading"><div><p className="section-label">{config.pricingMode === "demonstration" ? dictionary.ui.demoBadge : dictionary.ui.therapists}</p><h2 id="therapist-title">{dictionary.ui.therapistTitle}</h2></div><p>{dictionary.ui.therapistText}</p></div><div className="therapist-grid">{config.therapists.map((therapist) => <article key={therapist.id} className="therapist-card"><WellnessVisual id={therapist.visual} /><div className="therapist-copy">{therapist.isDemo && <span className="demo-pill">{dictionary.ui.demoBadge}</span>}<h3>{therapist.name}</h3><p className="therapist-specialty">{dictionary.therapists[therapist.id].specialty}</p><p>{dictionary.therapists[therapist.id].intro}</p><p className="therapist-services">{therapist.treatments.slice(0, 2).map((id) => dictionary.treatments[id].title).join(" · ")}</p><p className="therapist-status"><span aria-hidden="true" />{therapist.status === "limited" ? dictionary.ui.limitedPreference : dictionary.ui.preferenceRequest}</p><dl><div><dt>{dictionary.ui.years}</dt><dd>{therapist.experience}</dd></div><div><dt>{dictionary.ui.demoRating}</dt><dd>{therapist.rating}</dd></div><div><dt>{dictionary.ui.sessions}</dt><dd>{therapist.sessions}</dd></div></dl><BookingTrigger selection={{ treatmentId: therapist.treatments[0], therapistPreference: "specific", therapistId: therapist.id }} className="text-link">{dictionary.ui.requestTherapist}<span aria-hidden="true">↗</span></BookingTrigger></div></article>)}</div>{config.pricingMode === "demonstration" && <p className="catalog-disclaimer">{dictionary.ui.demoProfiles}</p>}</div></section>;
}
