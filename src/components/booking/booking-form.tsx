"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import type { BookingDraft, BookingErrors, TherapistPreference } from "@/config/types";
import { useLocale } from "@/components/providers/locale-provider";
import { Icon } from "@/components/ui/icon";
import { getDemoSlots } from "@/lib/availability";
import { formatBookingDate, getBusinessNow, supportsBusinessTimeZone } from "@/lib/business-time";
import { validateBooking } from "@/lib/booking-validation";
import { getTreatment, getTreatmentOption } from "@/lib/catalog";
import { localizeTimeZoneLabel } from "@/lib/time-zone-label";
import { buildWhatsAppMessage, buildWhatsAppUrl, normalizeWhatsAppNumber } from "@/lib/whatsapp";
import { useBooking } from "./booking-context";
import { BookingSummary } from "./booking-summary";
import { FormField } from "./form-field";

const stepFields: readonly (readonly (keyof BookingDraft)[])[] = [
  ["treatmentId"], ["durationMinutes"], ["cityId"], ["date", "time"], ["therapistPreference", "therapistId"], ["fullName", "address", "notes", "consent"], [], [],
];

export function BookingForm() {
  const { config, draft, setDraft } = useBooking();
  const { language, dictionary } = useLocale();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [notice, setNotice] = useState("");
  const [minimumDate, setMinimumDate] = useState(() => supportsBusinessTimeZone(config.timeZone) ? getBusinessNow(new Date(), config.timeZone).date : "");
  const fieldsRef = useRef<HTMLDivElement>(null);
  const treatment = getTreatment(config, draft.treatmentId);
  const option = getTreatmentOption(treatment, draft.durationMinutes);
  const area = config.serviceAreas.find((item) => item.id === draft.cityId);
  const therapist = config.therapists.find((item) => item.id === draft.therapistId);
  const hasContact = Boolean(normalizeWhatsAppNumber(config.whatsappNumber));
  const fullResult = useMemo(() => validateBooking(draft, config, new Date()), [draft, config]);
  const preview = fullResult.valid ? buildWhatsAppMessage(fullResult.booking, config, language) : "";
  const slots = draft.date && supportsBusinessTimeZone(config.timeZone) ? getDemoSlots(draft.date, new Date(), config.timeZone) : [];
  const compatibleTherapists = treatment ? config.therapists.filter((item) => item.treatments.includes(treatment.id)) : [];

  function message(error: BookingErrors[keyof BookingErrors]) {
    return error ? dictionary.errors[error] : undefined;
  }

  function update<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setNotice("");
  }

  function selectTreatment(id: string) {
    const next = getTreatment(config, id);
    setDraft((current) => ({ ...current, treatmentId: id, durationMinutes: next?.options.some((item) => String(item.minutes) === current.durationMinutes) ? current.durationMinutes : String(next?.options[0]?.minutes ?? ""), therapistId: "", therapistPreference: current.therapistPreference === "specific" ? "" : current.therapistPreference }));
    setErrors({});
  }

  function collectErrors(fields: readonly (keyof BookingDraft)[]) {
    const result = validateBooking(draft, config, new Date());
    if (result.valid) return {};
    return Object.fromEntries(fields.flatMap((field) => result.errors[field] ? [[field, result.errors[field]]] : [])) as BookingErrors;
  }

  function focusFirst(nextErrors: BookingErrors) {
    requestAnimationFrame(() => {
      const selector = Object.keys(nextErrors).map((name) => `[name="${name}"]`).join(",");
      if (selector) fieldsRef.current?.querySelector<HTMLElement>(selector)?.focus();
      else fieldsRef.current?.querySelector<HTMLElement>("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])")?.focus();
    });
  }

  function advance() {
    const nextErrors = collectErrors(stepFields[step]);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      focusFirst(nextErrors);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, 7));
    setNotice("");
    requestAnimationFrame(() => fieldsRef.current?.focus());
  }

  function back() {
    setStep((current) => Math.max(current - 1, 0));
    setNotice("");
  }

  function prepare(event: FormEvent) {
    event.preventDefault();
    const now = new Date();
    if (supportsBusinessTimeZone(config.timeZone)) setMinimumDate(getBusinessNow(now, config.timeZone).date);
    const result = validateBooking(draft, config, now);
    if (!result.valid) {
      setErrors(result.errors);
      const firstInvalid = stepFields.findIndex((fields) => fields.some((field) => result.errors[field]));
      setStep(firstInvalid < 0 ? 0 : firstInvalid);
      setNotice(dictionary.ui.scheduleChanged);
      focusFirst(result.errors);
      return;
    }
    setErrors({});
    setStep(7);
  }

  async function copyMessage() {
    if (!preview) return;
    try {
      await navigator.clipboard.writeText(preview);
      setNotice(dictionary.ui.copied);
    } catch {
      setNotice(dictionary.ui.copyFallback);
      document.querySelector<HTMLTextAreaElement>("#message-preview")?.select();
    }
  }

  function continueToWhatsApp() {
    const result = validateBooking(draft, config, new Date());
    if (!result.valid) {
      setErrors(result.errors);
      setStep(6);
      setNotice(dictionary.ui.scheduleChanged);
      return;
    }
    const link = buildWhatsAppUrl(result.booking, config, language);
    if (!link.ok) {
      setNotice(link.error);
      return;
    }
    window.location.assign(link.url);
  }

  return <form onSubmit={prepare} noValidate className="booking-layout guided-booking">
    <div className="booking-fields" ref={fieldsRef} tabIndex={-1}>
      <div className="booking-progress" aria-label={dictionary.ui.bookingSteps}>
        <span>{dictionary.ui.step} {step + 1} {dictionary.ui.of} 8</span>
        <div aria-hidden="true"><i style={{ width: `${((step + 1) / 8) * 100}%` }} /></div>
        <strong>{dictionary.steps[step]}</strong>
      </div>
      {notice && <p role="status" className="booking-notice">{notice}</p>}
      {step === 0 && <fieldset className="booking-step"><legend>{dictionary.ui.treatmentHelp}</legend><div className="booking-choice-grid treatment-choice-grid">{config.treatments.map((item) => <button key={item.id} name="treatmentId" value={item.id} type="button" className="booking-choice" aria-pressed={draft.treatmentId === item.id} onClick={() => selectTreatment(item.id)}><span>{dictionary.treatments[item.id].title}</span><small>{dictionary.treatments[item.id].description}</small></button>)}</div>{errors.treatmentId && <p className="field-error" role="alert">{message(errors.treatmentId)}</p>}</fieldset>}
      {step === 1 && <fieldset className="booking-step"><legend>{dictionary.ui.chooseDuration}</legend><p>{dictionary.ui.durationHelp}</p><div className="duration-options">{treatment?.options.map((item) => <button key={item.minutes} name="durationMinutes" value={item.minutes} type="button" aria-pressed={draft.durationMinutes === String(item.minutes)} onClick={() => update("durationMinutes", String(item.minutes))}><strong>{item.minutes} {dictionary.ui.minutes}</strong><span>{new Intl.NumberFormat(language === "id" ? "id-ID" : "en-ID", { style: "currency", currency: config.currency, maximumFractionDigits: 0 }).format(item.price)}</span></button>)}</div>{errors.durationMinutes && <p className="field-error" role="alert">{message(errors.durationMinutes)}</p>}</fieldset>}
      {step === 2 && <fieldset className="booking-step"><legend>{dictionary.ui.chooseLocation}</legend><p className="demo-inline">{dictionary.ui.demoCoverage}</p><div className="area-choice-grid">{config.serviceAreas.map((item) => { const blocked = item.status === "coming-soon" || item.status === "unavailable"; return <button key={item.id} name="cityId" value={item.id} type="button" disabled={blocked} className="booking-choice" aria-pressed={draft.cityId === item.id} onClick={() => update("cityId", item.id)}><span>{dictionary.areas[item.id as keyof typeof dictionary.areas] ?? item.name}</span><small>{dictionary.coverage[item.status]}</small></button>; })}</div>{errors.cityId && <p className="field-error" role="alert">{message(errors.cityId)}</p>}</fieldset>}
      {step === 3 && <fieldset className="booking-step"><legend>{dictionary.ui.chooseDate} & {dictionary.ui.chooseTime.toLocaleLowerCase(language)}</legend><p>{dictionary.ui.dateHelp} {localizeTimeZoneLabel(config, language)}</p><FormField name="date" label={dictionary.ui.date} error={message(errors.date)}><input id="booking-date" name="date" type="date" min={minimumDate} value={draft.date} onFocus={() => supportsBusinessTimeZone(config.timeZone) && setMinimumDate(getBusinessNow(new Date(), config.timeZone).date)} onChange={(event) => { update("date", event.target.value); update("time", ""); }} /></FormField>{draft.date && <div className="slot-grid" role="group" aria-label={dictionary.ui.chooseTime}>{slots.map((slot) => <button key={slot.time} name="time" value={slot.time} type="button" disabled={!slot.available} aria-pressed={draft.time === slot.time} onClick={() => update("time", slot.time)}>{slot.time}<small>{slot.available ? dictionary.ui.available : dictionary.ui.unavailable}</small></button>)}</div>}{errors.time && <p className="field-error" role="alert">{message(errors.time)}</p>}<p className="demo-inline">{dictionary.ui.demoSchedule} {dictionary.ui.demoDateRange}</p></fieldset>}
      {step === 4 && <fieldset className="booking-step"><legend>{dictionary.ui.choosePreference}</legend><p>{dictionary.ui.preferenceHelp}</p><div className="preference-grid">{(["", "male", "female", "specific"] as const).map((value) => <button key={value || "none"} name="therapistPreference" value={value} type="button" aria-pressed={draft.therapistPreference === value} onClick={() => { update("therapistPreference", value as TherapistPreference); if (value !== "specific") update("therapistId", ""); }}>{value ? dictionary.ui[value] : dictionary.ui.noPreference}</button>)}</div>{draft.therapistPreference === "specific" && <div className="therapist-choice-grid">{compatibleTherapists.map((item) => <button key={item.id} name="therapistId" value={item.id} type="button" className="booking-choice" aria-pressed={draft.therapistId === item.id} onClick={() => update("therapistId", item.id)}><span>{item.name}</span><small>{dictionary.therapists[item.id].specialty} · {dictionary.ui.demoBadge}</small></button>)}</div>}{errors.therapistPreference && <p className="field-error" role="alert">{message(errors.therapistPreference)}</p>}{errors.therapistId && <p className="field-error" role="alert">{message(errors.therapistId)}</p>}</fieldset>}
      {step === 5 && <fieldset className="booking-step"><legend>{dictionary.steps[5]}</legend><p>{dictionary.ui.customerHelp}</p><div className="form-grid"><FormField name="fullName" label={dictionary.ui.fullName} error={message(errors.fullName)}><input id="booking-fullName" name="fullName" autoComplete="name" maxLength={100} value={draft.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder={dictionary.ui.namePlaceholder} /></FormField><FormField name="address" label={dictionary.ui.address} error={message(errors.address)} className="full-width"><textarea id="booking-address" name="address" autoComplete="street-address" rows={3} maxLength={500} value={draft.address} onChange={(event) => update("address", event.target.value)} placeholder={dictionary.ui.addressPlaceholder} /></FormField><FormField name="notes" label={`${dictionary.ui.notes} (${dictionary.ui.optional})`} error={message(errors.notes)} className="full-width"><textarea id="booking-notes" name="notes" rows={3} maxLength={1000} value={draft.notes} onChange={(event) => update("notes", event.target.value)} placeholder={dictionary.ui.notesPlaceholder} /></FormField></div><div className="consent-field"><label htmlFor="booking-consent"><input id="booking-consent" name="consent" type="checkbox" checked={draft.consent} onChange={(event) => update("consent", event.target.checked)} /><span>{dictionary.ui.consent}</span></label>{errors.consent && <p className="field-error" role="alert">{message(errors.consent)}</p>}<p>{dictionary.ui.consentHelp}</p></div></fieldset>}
      {step === 6 && <section className="booking-step review-step" aria-labelledby="review-heading"><h3 id="review-heading">{dictionary.ui.reviewRequest}</h3><p>{dictionary.ui.reviewHelp}</p><dl><div><dt>{dictionary.ui.treatment}</dt><dd>{treatment ? dictionary.treatments[treatment.id].title : dictionary.ui.missingChoice}<button type="button" onClick={() => setStep(0)}>{dictionary.ui.edit}</button></dd></div><div><dt>{dictionary.ui.duration}</dt><dd>{option ? `${option.minutes} ${dictionary.ui.minutes}` : dictionary.ui.missingChoice}<button type="button" onClick={() => setStep(1)}>{dictionary.ui.edit}</button></dd></div><div><dt>{dictionary.ui.location}</dt><dd>{area ? dictionary.areas[area.id as keyof typeof dictionary.areas] ?? area.name : dictionary.ui.missingChoice}<button type="button" onClick={() => setStep(2)}>{dictionary.ui.edit}</button></dd></div><div><dt>{dictionary.ui.date}</dt><dd>{formatBookingDate(draft.date, language, dictionary.ui.missingChoice)} · {draft.time || dictionary.ui.missingChoice}<button type="button" onClick={() => setStep(3)}>{dictionary.ui.edit}</button></dd></div><div><dt>{dictionary.ui.preference}</dt><dd>{therapist?.name ?? (draft.therapistPreference ? dictionary.ui[draft.therapistPreference] : dictionary.ui.noPreference)}<button type="button" onClick={() => setStep(4)}>{dictionary.ui.edit}</button></dd></div><div><dt>{dictionary.ui.fullName}</dt><dd>{draft.fullName || dictionary.ui.missingChoice}<button type="button" onClick={() => setStep(5)}>{dictionary.ui.edit}</button></dd></div></dl>{!fullResult.valid && <p className="field-error" role="alert">{dictionary.ui.errorSummary}</p>}</section>}
      {step === 7 && <section className="booking-step ready-step" aria-labelledby="ready-heading"><span className="request-ready-mark" aria-hidden="true"><Icon name="check" /></span><h3 id="ready-heading">{dictionary.ui.requestReady}</h3><p>{dictionary.ui.readyHelp}</p><label htmlFor="message-preview">{dictionary.ui.messagePreview}</label><textarea id="message-preview" readOnly rows={12} value={preview} /><div className="ready-actions"><button type="button" className="button button-secondary" onClick={copyMessage}>{dictionary.ui.copy}</button><button type="button" className="button button-primary" onClick={continueToWhatsApp} disabled={!hasContact}>{hasContact ? dictionary.ui.send : dictionary.ui.sendUnavailable}<Icon name="arrow" /></button></div>{!hasContact && <div className="configuration-notice"><strong>{dictionary.ui.sendUnavailable}</strong><p>{dictionary.ui.contactMissing}</p></div>}<p className="small-copy">{dictionary.ui.contactPrivacy}</p></section>}
      <div className="booking-navigation">{step > 0 && <button type="button" className="button button-secondary" onClick={back}>{dictionary.ui.back}</button>}{step < 6 && <button type="button" className="button button-primary" onClick={advance}>{dictionary.ui.next}<Icon name="arrow" /></button>}{step === 6 && <button type="submit" className="button button-primary">{dictionary.ui.prepare}<Icon name="arrow" /></button>}</div>
    </div>
    <BookingSummary />
  </form>;
}
