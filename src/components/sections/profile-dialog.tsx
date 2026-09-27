"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { BusinessConfig, TreatmentId } from "@/config/types";
import { demoFavoriteIds, demoVisits } from "@/data/customer";
import { useLocale } from "@/components/providers/locale-provider";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Icon } from "@/components/ui/icon";

const tabs = ["upcoming", "history", "favorites", "recent"] as const;
type Tab = (typeof tabs)[number];

export function ProfileDialog({ config, triggerRef, onClose }: { config: BusinessConfig; triggerRef: RefObject<HTMLElement | null>; onClose: () => void }) {
  const { dictionary } = useLocale();
  const { favorites, recent, reset, loadFavorites } = usePreferences();
  const [tab, setTab] = useState<Tab>("upcoming");
  const [notice, setNotice] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current; if (!dialog) return;
    const scrollY = window.scrollY; const original = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width, overflow: document.body.style.overflow };
    Object.assign(document.body.style, { position: "fixed", top: `-${scrollY}px`, width: "100%", overflow: "hidden" }); dialog.showModal(); dialog.querySelector<HTMLElement>(".profile-close")?.focus(); const trigger = triggerRef.current;
    return () => { dialog.close(); Object.assign(document.body.style, original); window.scrollTo({ top: scrollY, left: 0, behavior: "instant" }); trigger?.focus({ preventScroll: true }); };
  }, [triggerRef]);
  const ids = tab === "favorites" ? favorites : recent;
  const visits = demoVisits.filter((item) => item.group === tab);
  function treatmentName(id: string) { const item = config.treatments.find((entry) => entry.id === id); return item ? dictionary.treatments[item.id].title : id; }
  return <dialog ref={dialogRef} className="profile-dialog" aria-labelledby="profile-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClose={(event) => { if (!event.currentTarget.open) onClose(); }}><div className="dialog-heading"><div><p className="section-label">{dictionary.ui.demoProfile}</p><h2 id="profile-title">{dictionary.ui.profile}</h2></div><button type="button" className="icon-button profile-close" onClick={onClose} aria-label={dictionary.ui.close}><Icon name="close" /></button></div><div className="profile-content"><p>{dictionary.ui.profileText}</p><div className="profile-tabs" role="tablist">{tabs.map((item) => <button key={item} id={`profile-tab-${item}`} type="button" role="tab" aria-selected={tab === item} aria-controls="profile-panel" onClick={() => setTab(item)}>{dictionary.ui[item]}</button>)}</div><section id="profile-panel" role="tabpanel" aria-labelledby={`profile-tab-${tab}`}><p className="demo-inline">{tab === "upcoming" || tab === "history" ? dictionary.ui.demoHistory : dictionary.ui.localOnly}</p>{tab === "upcoming" || tab === "history" ? <div className="profile-list">{visits.length ? visits.map((visit) => <article key={visit.id}><span className="demo-pill">{dictionary.ui.sampleVisit}</span><h3>{treatmentName(visit.treatmentId)}</h3><p>{visit.duration} {dictionary.ui.minutes} · {visit.time}</p><small>{visit.dayOffset > 0 ? `+${visit.dayOffset}` : visit.dayOffset} {dictionary.ui.days} · {dictionary.ui.demoBadge}</small></article>) : <p className="area-empty">{dictionary.ui.noVisits}</p>}</div> : <div className="profile-list">{ids.length ? ids.map((id) => <article key={id}><h3>{treatmentName(id)}</h3><a href="#treatments" onClick={onClose} className="text-link">{dictionary.ui.requestAgain}</a></article>) : <div className="area-empty"><h3>{tab === "favorites" ? dictionary.ui.noFavorites : dictionary.ui.noRecent}</h3><p>{tab === "favorites" ? dictionary.ui.noFavoritesHelp : dictionary.ui.noRecentHelp}</p></div>}</div>}</section><div className="profile-actions">{tab === "favorites" && !favorites.length && <button type="button" className="button button-secondary" onClick={() => loadFavorites(demoFavoriteIds as readonly TreatmentId[])}>{dictionary.ui.sampleFavorites}</button>}<button type="button" className="text-link" onClick={() => { reset(); setNotice(dictionary.ui.resetDone); }}>{dictionary.ui.resetPreferences}</button></div>{notice && <p role="status">{notice}</p>}</div></dialog>;
}
