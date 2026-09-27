"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { Icon } from "@/components/ui/icon";

export function WhyChooseUs() {
  const { dictionary } = useLocale();
  const items = [["home", dictionary.ui.benefitOne, dictionary.ui.benefitOneText], ["clock", dictionary.ui.benefitTwo, dictionary.ui.benefitTwoText], ["message", dictionary.ui.benefitThree, dictionary.ui.benefitThreeText], ["check", dictionary.ui.benefitFour, dictionary.ui.benefitFourText]] as const;
  return <section className="section why-section editorial-dark" aria-labelledby="why-title"><div className="container why-layout"><div className="section-heading"><p className="section-label">{dictionary.ui.benefits}</p><h2 id="why-title">{dictionary.ui.benefitsTitle}</h2><p>{dictionary.ui.benefitsText}</p></div><div className="value-list">{items.map(([icon, title, text]) => <div key={title}><Icon name={icon} width="25" height="25" /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>;
}
