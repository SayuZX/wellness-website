"use client";

import type { BusinessConfig } from "@/config/types";
import { useLocale } from "@/components/providers/locale-provider";
import { WellnessVisual } from "@/components/ui/wellness-visual";

export function About({ config }: { config: BusinessConfig }) {
  const { dictionary } = useLocale();
  return <section className="section about-section editorial-dark" id="about" aria-labelledby="about-title"><div className="container about-layout"><div className="about-image"><WellnessVisual id="sculpture" /></div><div className="about-copy"><p className="section-label">{dictionary.ui.aboutSub}</p><h2 id="about-title">{dictionary.ui.aboutTitle}</h2><p>{dictionary.ui.aboutText}</p><p>{dictionary.ui.aboutDetail}</p><p className="about-signature">{config.brand}<br />{dictionary.ui.closingNote}</p></div></div></section>;
}
