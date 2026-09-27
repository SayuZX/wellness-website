import type { BookingDraft, BookingErrors, BookingValidation, BusinessConfig } from "@/config/types";
import { getTreatment, getTreatmentOption } from "./catalog";
import { getBusinessNow, isCalendarDate, isTime, supportsBusinessTimeZone } from "./business-time";
import { isDemoSlotAvailable } from "./availability";

export function validateBooking(draft: BookingDraft, config: BusinessConfig, now: Date): BookingValidation {
  const errors: BookingErrors = {};
  const fullName = draft.fullName.trim();
  const address = draft.address.trim();
  const notes = draft.notes.trim();
  const treatment = getTreatment(config, draft.treatmentId);
  const option = getTreatmentOption(treatment, draft.durationMinutes);
  const city = config.serviceAreas.find((area) => area.id === draft.cityId);
  const therapist = config.therapists.find((item) => item.id === draft.therapistId);

  if (!fullName) errors.fullName = "nameRequired";
  else if (fullName.length > 100) errors.fullName = "nameLong";
  if (!address) errors.address = "addressRequired";
  else if (address.length > 500) errors.address = "addressLong";
  if (notes.length > 1000) errors.notes = "notesLong";
  if (!city) errors.cityId = "cityRequired";
  else if (city.status === "coming-soon" || city.status === "unavailable") errors.cityId = "cityUnavailable";
  if (!treatment) errors.treatmentId = "treatmentRequired";
  if (!option) errors.durationMinutes = "durationRequired";
  if (!draft.consent) errors.consent = "consentRequired";
  if (!config.therapistPreferences.includes(draft.therapistPreference)) errors.therapistPreference = "preferenceInvalid";
  if (draft.therapistPreference === "specific" && (!therapist || !treatment || !therapist.treatments.includes(treatment.id))) errors.therapistId = "therapistInvalid";
  if (!isCalendarDate(draft.date)) errors.date = "dateInvalid";
  if (!isTime(draft.time)) errors.time = "timeInvalid";

  if (!supportsBusinessTimeZone(config.timeZone) || !Number.isFinite(now.getTime())) {
    errors.date = "timezoneInvalid";
  } else {
    const current = getBusinessNow(now, config.timeZone);
    if (!errors.date && draft.date < current.date) errors.date = "datePast";
    if (!errors.date && !errors.time && draft.date === current.date && draft.time <= current.time) errors.time = "timePast";
    if (config.pricingMode === "demonstration" && !errors.date && !errors.time && !isDemoSlotAvailable(draft.date, draft.time, now, config.timeZone)) errors.time = "slotUnavailable";
  }

  if (Object.keys(errors).length || !treatment || !option || !city) return { valid: false, errors };
  return { valid: true, booking: { fullName, address, notes, treatment, option, city, date: draft.date, time: draft.time, therapistPreference: draft.therapistPreference, therapist: draft.therapistPreference === "specific" ? therapist : undefined, consent: true } };
}
