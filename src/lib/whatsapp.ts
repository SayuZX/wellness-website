import type { BusinessConfig, Language, ValidatedBooking } from "@/config/types";
import { getDictionary } from "@/locales";
import { formatPrice } from "./currency";
import { localizeTimeZoneLabel } from "./time-zone-label";

export function normalizeWhatsAppNumber(number: string | null): string | null {
  if (!number || !/^\+?[1-9][\d\s()-]+$/.test(number.trim())) return null;
  const digits = number.replace(/[\s()+-]/g, "");
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : null;
}

export function buildWhatsAppMessage(booking: ValidatedBooking, config: BusinessConfig, language: Language = "en"): string {
  const dictionary = getDictionary(language);
  const copy = dictionary.whatsapp;
  const preference = booking.therapist ? booking.therapist.name : booking.therapistPreference ? dictionary.ui[booking.therapistPreference] : dictionary.ui.noPreference;
  return [
    `${copy.heading} ${config.brand}`,
    ...(config.pricingMode === "demonstration" ? [copy.demo, ""] : [""]),
    `${copy.name}: ${booking.fullName}`,
    `${copy.city}: ${dictionary.areas[booking.city.id as keyof typeof dictionary.areas] ?? booking.city.name}`,
    `${copy.treatment}: ${dictionary.treatments[booking.treatment.id].title}`,
    `${copy.duration}: ${booking.option.minutes} ${copy.minutes}`,
    `${copy.date}: ${booking.date}`,
    `${copy.time}: ${booking.time}`,
    `${copy.zone}: ${localizeTimeZoneLabel(config, language)}; ${config.timeZone}`,
    `${copy.address}: ${booking.address}`,
    ...(booking.therapistPreference ? [`${copy.preference}: ${preference}`] : []),
    ...(booking.notes ? [`${copy.notes}: ${booking.notes}`] : []),
    `${config.pricingMode === "demonstration" ? copy.estimate : copy.liveEstimate}: ${formatPrice(booking.option.price, { ...config, locale: language === "id" ? "id-ID" : "en-ID" })}`,
    "",
    copy.consent,
    copy.disclaimer,
  ].join("\n");
}

export function buildWhatsAppUrl(booking: ValidatedBooking, config: BusinessConfig, language: Language = "en"): { ok: true; url: string } | { ok: false; error: string } {
  const number = normalizeWhatsAppNumber(config.whatsappNumber);
  if (!number) return { ok: false, error: getDictionary(language).ui.contactMissing };
  return { ok: true, url: `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(booking, config, language))}` };
}
