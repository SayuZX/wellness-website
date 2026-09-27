import { describe, expect, it } from "vitest";
import { businessConfig } from "@/config/business";
import { filterTreatments, getTreatment, getTreatmentOption, searchServiceAreas } from "@/lib/catalog";
import { getBusinessNow, isCalendarDate } from "@/lib/business-time";
import { validateBooking } from "@/lib/booking-validation";
import { buildWhatsAppMessage, buildWhatsAppUrl, normalizeWhatsAppNumber } from "@/lib/whatsapp";
import type { BookingDraft, BusinessConfig } from "@/config/types";

const configuredBusiness: BusinessConfig = { ...businessConfig, whatsappNumber: "+1 202 555 0143", serviceAreas: [{ id: "test-city", name: "Test city", status: "available", isDemo: true, isVerified: false, dataSource: "demo" }] };
const now = new Date("2026-09-27T17:30:00Z");
const validDraft: BookingDraft = { fullName: "  Renée  ", cityId: "test-city", treatmentId: "full-body-massage", durationMinutes: "90", date: "2026-09-29", time: "10:30", address: "A&B + Café\nFloor 2", therapistPreference: "", therapistId: "", notes: "入口 by the lift", consent: true };

describe("catalog", () => {
  it("uses exact configured treatment durations and prices", () => {
    const treatment = getTreatment(businessConfig, "full-body-massage");
    expect(getTreatmentOption(treatment, "90")?.price).toBe(350000);
    expect(getTreatmentOption(treatment, "75")).toBeUndefined();
    expect(getTreatmentOption(treatment, "90abc")).toBeUndefined();
  });
  it.each([0, -1, Infinity, NaN, 1.5])("rejects an invalid configured duration %s", (minutes) => {
    const treatment = { ...businessConfig.treatments[0], options: [{ minutes, price: 250000 }] };
    expect(getTreatmentOption(treatment, String(minutes))).toBeUndefined();
  });
  it("has eleven unique demo treatments with finite positive options", () => {
    expect(businessConfig.treatments).toHaveLength(11);
    expect(new Set(businessConfig.treatments.map((item) => item.id)).size).toBe(11);
    for (const treatment of businessConfig.treatments) for (const option of treatment.options) {
      expect(Number.isFinite(option.minutes)).toBe(true);
      expect(option.minutes).toBeGreaterThan(0);
      expect(Number.isFinite(option.price)).toBe(true);
      expect(option.price).toBeGreaterThan(0);
    }
  });
  it("filters overlapping categories", () => {
    expect(filterTreatments(businessConfig.treatments, "massage")).toHaveLength(9);
    expect(filterTreatments(businessConfig.treatments, "recovery").map((item) => item.id)).toEqual(["deep-tissue-massage", "sports-massage", "head-neck-shoulder"]);
  });
  it("searches supplied areas without inventing matches", () => {
    expect(searchServiceAreas(configuredBusiness.serviceAreas, " TEST ")).toHaveLength(1);
    expect(searchServiceAreas([], "Jakarta")).toEqual([]);
  });
});

describe("business time and validation", () => {
  it("uses Jakarta's date rather than the visitor's UTC date", () => {
    expect(getBusinessNow(now, "Asia/Jakarta")).toEqual({ date: "2026-09-28", time: "00:30" });
  });
  it("rejects impossible calendar dates", () => {
    expect(isCalendarDate("2027-02-29")).toBe(false);
    expect(isCalendarDate("2028-02-29")).toBe(true);
    expect(isCalendarDate("2026-04-31")).toBe(false);
  });
  it("accepts and trims international names", () => {
    const result = validateBooking(validDraft, configuredBusiness, now);
    expect(result.valid).toBe(true);
    if (result.valid) expect(result.booking.fullName).toBe("Renée");
  });
  it.each([["fullName", "   "], ["address", ""], ["cityId", "unknown"], ["treatmentId", "unknown"], ["durationMinutes", "75"], ["date", "2026-09-27"], ["time", "24:00"], ["therapistPreference", "unsupported"]])("rejects invalid %s", (field, value) => {
    expect(validateBooking({ ...validDraft, [field]: value }, configuredBusiness, now).valid).toBe(false);
  });
  it("rejects unavailable demo coverage and explicit therapist incompatibility", () => {
    const blocked = { ...configuredBusiness, serviceAreas: [{ ...configuredBusiness.serviceAreas[0], status: "coming-soon" as const }] };
    expect(validateBooking(validDraft, blocked, now).valid).toBe(false);
    expect(validateBooking({ ...validDraft, therapistPreference: "specific", therapistId: "maya", treatmentId: "sports-massage", durationMinutes: "60" }, configuredBusiness, now).valid).toBe(false);
  });
  it("requires consent and a future business-local time", () => {
    expect(validateBooking({ ...validDraft, consent: false }, configuredBusiness, now).valid).toBe(false);
    const result = validateBooking({ ...validDraft, date: "2026-09-28", time: "00:29" }, configuredBusiness, now);
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.errors.time).toBe("timePast");
  });
  it("fails safely for unsupported business timezones", () => {
    expect(validateBooking(validDraft, { ...configuredBusiness, timeZone: "America/New_York" }, now).valid).toBe(false);
  });
});

describe("WhatsApp request", () => {
  it.each([null, "", "08123456789", "javascript:123", "123", "+1 202 555 0143?x=y"])("rejects invalid recipient %s", (number) => expect(normalizeWhatsAppNumber(number)).toBeNull());
  it("normalizes an international number without guessing a prefix", () => expect(normalizeWhatsAppNumber("+1 (202) 555-0143")).toBe("12025550143"));
  it("preserves Unicode and labels an unconfirmed demonstration request", () => {
    const validation = validateBooking(validDraft, configuredBusiness, now);
    if (!validation.valid) throw new Error("Fixture must be valid");
    const result = buildWhatsAppUrl(validation.booking, configuredBusiness, "id");
    if (!result.ok) throw new Error("Fixture must produce a URL");
    const url = new URL(result.url);
    expect(url.pathname).toBe("/12025550143");
    expect(url.searchParams.get("text")).toBe(buildWhatsAppMessage(validation.booking, configuredBusiness, "id"));
    expect(url.searchParams.get("text")).toContain("A&B + Café\nFloor 2");
    expect(url.searchParams.get("text")).toContain("入口 by the lift");
    expect(url.searchParams.get("text")).toContain("PERMINTAAN DEMONSTRASI");
    expect(buildWhatsAppUrl(validation.booking, businessConfig).ok).toBe(false);
  });
});
