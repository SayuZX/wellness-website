"use client";

import { useBooking } from "@/components/booking/booking-context";
import { BookingTrigger } from "@/components/booking/booking-trigger";
import { useLocale } from "@/components/providers/locale-provider";
import { Icon } from "@/components/ui/icon";
import { WellnessVisual } from "@/components/ui/wellness-visual";

export function BookingPreview() {
  const { config } = useBooking();
  const { dictionary } = useLocale();
  const promotion = config.promotions.find((item) => item.enabled);
  return <section className="section booking-preview-section" aria-labelledby="booking-preview-title"><div className="container booking-preview-layout"><div className="booking-preview-visual"><WellnessVisual id="oil" /><div><span>{dictionary.ui.step} 01–08</span><strong>{dictionary.ui.bookingTitle}</strong></div></div><div className="booking-preview-copy"><p className="section-label">{dictionary.ui.demoBadge}</p><h2 id="booking-preview-title">{dictionary.ui.previewTitle}</h2><p>{dictionary.ui.previewText}</p><BookingTrigger className="button button-primary">{dictionary.ui.previewAction}<Icon name="arrow" /></BookingTrigger>{promotion && <aside className="promotion-panel"><span>{promotion.percentage}%</span><div><strong>{dictionary.ui.promotionLabel}</strong><p>{dictionary.ui.promotionText}</p><small>{dictionary.ui.demoPromotion}</small></div></aside>}</div></div></section>;
}
