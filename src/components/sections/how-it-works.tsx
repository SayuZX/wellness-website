"use client";

import { useLocale } from "@/components/providers/locale-provider";

export function HowItWorks() {
  const { dictionary } = useLocale();
  const steps = [[dictionary.ui.processOne, dictionary.ui.processOneText], [dictionary.ui.processTwo, dictionary.ui.processTwoText], [dictionary.ui.processThree, dictionary.ui.processThreeText]];
  return <section className="section how-section" id="how-it-works" aria-labelledby="how-title"><div className="container"><div className="section-heading split-heading"><div><p className="section-label">{dictionary.ui.process}</p><h2 id="how-title">{dictionary.ui.processTitle}</h2></div><p>{dictionary.ui.processText}</p></div><ol className="steps-grid">{steps.map(([title, text], index) => <li key={title}><span className="step-number" aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><p className="process-note">{dictionary.ui.closingNote}</p></div></section>;
}
