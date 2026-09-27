"use client";

import { useState } from "react";
import type { Testimonial } from "@/config/types";
import { useLocale } from "@/components/providers/locale-provider";
import { Icon } from "@/components/ui/icon";
import { formatBookingDate } from "@/lib/business-time";

export function Testimonials({ items }: { items: readonly Testimonial[] }) {
  const { language, dictionary } = useLocale();
  const [index, setIndex] = useState(0);
  if (!items.length) return null;
  const item = items[index];
  const demoOnly = items.every((entry) => entry.isDemo);
  return <section className="section testimonials-section" aria-labelledby="reviews-title"><div className="container review-layout"><div className="section-heading"><p className="section-label">{demoOnly ? dictionary.ui.demoReviews : dictionary.ui.review}</p><h2 id="reviews-title">{dictionary.ui.reviewsTitle}</h2>{demoOnly && <p>{dictionary.ui.reviewsText}</p>}</div><figure className="featured-review">{item.isDemo && <span className="demo-pill">{dictionary.ui.demoBadge}</span>}<div className="review-stars" aria-label={`${dictionary.ui.demoRating}: ${item.rating} / 5`}>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</div><blockquote>“{dictionary.reviews[item.id]}”</blockquote><figcaption>{item.name} · {dictionary.treatments[item.treatment].title} · {formatBookingDate(item.date, language)}</figcaption><div className="review-controls"><button type="button" aria-label={dictionary.ui.previous} onClick={() => setIndex((current) => (current - 1 + items.length) % items.length)}><Icon name="chevron" /></button><span>{index + 1} / {items.length}</span><button type="button" aria-label={dictionary.ui.nextReview} onClick={() => setIndex((current) => (current + 1) % items.length)}><Icon name="chevron" /></button></div></figure></div></section>;
}
