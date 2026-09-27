"use client";

import { useEffect, useRef, useState } from "react";
import { useBooking } from "@/components/booking/booking-context";
import { BookingTrigger } from "@/components/booking/booking-trigger";
import { useLocale } from "@/components/providers/locale-provider";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Icon } from "@/components/ui/icon";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ProfileDialog } from "./profile-dialog";

export function Header() {
  const { config, openBooking } = useBooking();
  const { dictionary } = useLocale();
  const { favorites } = usePreferences();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);
  const links = [{ href: "#treatments", label: dictionary.ui.treatments }, { href: "#how-it-works", label: dictionary.ui.process }, { href: "#therapists", label: dictionary.ui.therapists }, { href: "#service-areas", label: dictionary.ui.areas }, { href: "#about", label: dictionary.ui.about }];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape" && menuOpen) { setMenuOpen(false); toggleRef.current?.focus(); } };
    const media = window.matchMedia("(min-width: 960px)");
    const onResize = () => { if (media.matches) setMenuOpen(false); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); document.addEventListener("keydown", onKey); media.addEventListener("change", onResize);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("keydown", onKey); media.removeEventListener("change", onResize); };
  }, [menuOpen]);

  return <><header className={`site-header${scrolled ? " is-scrolled" : ""}`}><div className="container header-inner"><a href="#top" className="wordmark" aria-label={`${config.brand} ${dictionary.ui.home}`}><span className="wordmark-symbol" aria-hidden="true">s.</span>{config.brand}</a><nav className="desktop-nav" aria-label={dictionary.ui.navigation}>{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</nav><div className="header-actions"><LanguageSwitcher compact /><button ref={profileRef} type="button" className="profile-button" onClick={() => setProfileOpen(true)} aria-label={`${dictionary.ui.profile}; ${favorites.length} ${dictionary.ui.favorites}`}><Icon name="home" width="17" height="17" /><span>{favorites.length}</span></button><BookingTrigger className="button button-primary header-book" onClick={() => setMenuOpen(false)}>{dictionary.ui.book}</BookingTrigger><button ref={toggleRef} type="button" className="icon-button mobile-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? dictionary.ui.closeMenu : dictionary.ui.menu} onClick={() => setMenuOpen((value) => !value)}><Icon name={menuOpen ? "close" : "menu"} /></button></div></div><nav id="mobile-navigation" className="mobile-nav container" aria-label={dictionary.ui.navigation} hidden={!menuOpen}>{links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<Icon name="chevron" width="16" height="16" /></a>)}<button type="button" className="text-link" onClick={() => { setMenuOpen(false); setProfileOpen(true); }}>{dictionary.ui.profile} · {favorites.length}</button><button type="button" className="button button-primary" onClick={() => { setMenuOpen(false); openBooking(undefined, toggleRef.current ?? undefined); }}>{dictionary.ui.book}</button></nav></header>{profileOpen && <ProfileDialog config={config} triggerRef={profileRef} onClose={() => setProfileOpen(false)} />}</>;
}
