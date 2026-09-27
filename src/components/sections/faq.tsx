"use client";

import { useState } from "react";
import type { BusinessConfig } from "@/config/types";
import { faqIds } from "@/data/faqs";
import { useLocale } from "@/components/providers/locale-provider";
import { Icon } from "@/components/ui/icon";
import { localizeTimeZoneLabel } from "@/lib/time-zone-label";

export function FAQ({ config }: { config: BusinessConfig }) {
  const { language, dictionary } = useLocale();
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase(language);
  const entries = faqIds.filter((key) => !normalized || `${dictionary.faqs[key].question} ${dictionary.faqs[key].answer}`.toLocaleLowerCase(language).includes(normalized));
  return <section className="section faq-section" id="faq" aria-labelledby="faq-title"><div className="container faq-layout"><div className="section-heading"><p className="section-label">{dictionary.ui.faqText}</p><h2 id="faq-title">{dictionary.ui.faqTitle}</h2><label className="faq-search"><span className="visually-hidden">{dictionary.ui.searchFaq}</span><Icon name="search" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={dictionary.ui.searchFaqPlaceholder} /></label><p className="faq-timezone">{dictionary.ui.timezone}: {localizeTimeZoneLabel(config, language)}</p></div><div className="faq-list">{entries.map((key) => <details key={key}><summary>{dictionary.faqs[key].question}<Icon name="plus" /></summary><p>{dictionary.faqs[key].answer}</p></details>)}{!entries.length && <div className="area-empty"><h3>{dictionary.ui.noFaq}</h3><button type="button" className="text-link" onClick={() => setQuery("")}>{dictionary.ui.clear}</button></div>}</div></div></section>;
}
