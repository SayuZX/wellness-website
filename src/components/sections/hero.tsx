"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { BookingTrigger } from "@/components/booking/booking-trigger";
import { useBooking } from "@/components/booking/booking-context";
import { Icon } from "@/components/ui/icon";
import { WellnessVisual } from "@/components/ui/wellness-visual";

export function Hero() {
  const { config } = useBooking();
  const { dictionary } = useLocale();
  return <section className="hero container" aria-labelledby="hero-title"><div className="hero-copy"><p className="hero-kicker"><span />{dictionary.ui.heroLabel}</p><h1 id="hero-title">{dictionary.ui.heroTitle}</h1><p className="hero-description">{dictionary.ui.heroText}</p><div className="hero-actions"><BookingTrigger>{dictionary.ui.book}<Icon name="arrow" /></BookingTrigger><a href="#treatments" className="text-link">{dictionary.ui.heroSecondary}<Icon name="chevron" width="14" height="14" /></a></div><div className="hero-footnote"><Icon name="home" width="17" height="17" /><span>{dictionary.ui.heroFootnote}</span></div>{config.pricingMode === "demonstration" && <p className="hero-availability"><span aria-hidden="true" />{dictionary.ui.demoCoverage}</p>}</div><div className="hero-visual"><WellnessVisual id="hero" className="hero-image" preload /><div className="image-caption"><span>{dictionary.ui.heroVisualTitle}</span><span>{dictionary.ui.heroVisualCaption}</span></div></div></section>;
}
