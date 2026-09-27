"use client";

import { useState } from "react";
import { useBooking } from "@/components/booking/booking-context";
import { BookingTrigger } from "@/components/booking/booking-trigger";
import { useLocale } from "@/components/providers/locale-provider";
import { Icon } from "@/components/ui/icon";
import { WhatsAppMark } from "@/components/ui/whatsapp-mark";
import { normalizeWhatsAppNumber } from "@/lib/whatsapp";

export function MobileActionDock() {
  const { config } = useBooking();
  const { dictionary } = useLocale();
  const [notice, setNotice] = useState("");
  const number = normalizeWhatsAppNumber(config.whatsappNumber);
  return <><aside className="mobile-action-dock" aria-label={dictionary.ui.contact}><BookingTrigger><Icon name="plus" />{dictionary.ui.book}</BookingTrigger>{number ? <a className="whatsapp-action" href={`https://wa.me/${number}`} target="_blank" rel="noreferrer"><WhatsAppMark className="whatsapp-mark" />{dictionary.ui.whatsapp}</a> : <button type="button" className="whatsapp-action" onClick={() => setNotice((current) => current ? "" : dictionary.ui.contactMissing)}><WhatsAppMark className="whatsapp-mark" />{dictionary.ui.whatsapp}</button>}</aside>{notice && <div className="mobile-contact-notice" role="status"><p>{notice}</p><button type="button" onClick={() => setNotice("")} aria-label={dictionary.ui.close}><Icon name="close" /></button></div>}</>;
}
