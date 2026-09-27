"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { Icon } from "@/components/ui/icon";

export function TrustStrip() {
  const { dictionary } = useLocale();
  const items = [["home", dictionary.ui.trustOne, dictionary.ui.trustOneText], ["check", dictionary.ui.trustTwo, dictionary.ui.trustTwoText], ["message", dictionary.ui.trustThree, dictionary.ui.trustThreeText]] as const;
  return <section className="trust-strip" aria-label={dictionary.ui.benefits}><div className="container">{items.map(([icon, title, text]) => <div key={title}><Icon name={icon} width="20" height="20" /><span><strong>{title}</strong><small>{text}</small></span></div>)}</div></section>;
}
