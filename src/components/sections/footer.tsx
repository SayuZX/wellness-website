"use client";

import type { BusinessConfig } from "@/config/types";
import { useLocale } from "@/components/providers/locale-provider";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { localizeTimeZoneLabel } from "@/lib/time-zone-label";

export function Footer({ config }: { config: BusinessConfig }) {
  const { language, dictionary } = useLocale();
  return <footer className="site-footer"><div className="container"><div className="footer-grid"><div className="footer-brand"><a className="wordmark" href="#top"><span className="wordmark-symbol" aria-hidden="true">s.</span>{config.brand}</a><p>{dictionary.ui.footerText}</p><LanguageSwitcher /></div><nav aria-label={dictionary.ui.footerExplore}><h2>{dictionary.ui.footerExplore}</h2><a href="#treatments">{dictionary.ui.treatments}</a><a href="#how-it-works">{dictionary.ui.process}</a><a href="#service-areas">{dictionary.ui.areas}</a><a href="#about">{dictionary.ui.about}</a><a href="#faq">FAQ</a></nav><div><h2>{dictionary.ui.contact}</h2>{config.contactEmail && <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>}{config.contactPhone && <a href={`tel:${config.contactPhone}`}>{config.contactPhone}</a>}{!config.contactEmail && !config.contactPhone && <p>{dictionary.ui.contactMissing}</p>}</div><div><h2>{dictionary.ui.footerDetails}</h2>{config.operatingHours.length ? config.operatingHours.map((hours) => <p key={hours}>{hours}</p>) : <p>{dictionary.ui.hoursMissing}</p>}<span className="footer-timezone">{dictionary.ui.timezone}: {localizeTimeZoneLabel(config, language)}</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {config.brand}. {dictionary.ui.rights}</span><div>{config.policyLinks.map((link) => <a key={link.href} href={link.href}>{link.label[language]}</a>)}<a href="#top">{dictionary.ui.home} ↑</a></div></div><p className="demo-footer">{dictionary.ui.demoBanner} {dictionary.ui.privacyNote}</p></div></footer>;
}
