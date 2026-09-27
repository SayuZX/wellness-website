"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { BookingTrigger } from "@/components/booking/booking-trigger";
import { Icon } from "@/components/ui/icon";
import { WellnessVisual } from "@/components/ui/wellness-visual";

export function ClosingCTA() {
  const { dictionary } = useLocale();
  return <section className="closing-section editorial-dark" aria-labelledby="closing-title"><div className="closing-art" aria-hidden="true"><WellnessVisual id="stones" /></div><div className="container"><p className="section-label">{dictionary.ui.heroLabel}</p><h2 id="closing-title">{dictionary.ui.closingTitle}</h2><p>{dictionary.ui.closingText}</p><BookingTrigger>{dictionary.ui.book}<Icon name="arrow" /></BookingTrigger><span className="closing-note">{dictionary.ui.closingNote}</span></div></section>;
}
