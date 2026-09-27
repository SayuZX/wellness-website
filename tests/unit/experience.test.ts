import { describe, expect, it } from "vitest";
import { businessConfig, createBusinessConfig } from "@/config/business";
import { en } from "@/locales/en";
import { id } from "@/locales/id";
import { searchTreatments } from "@/lib/catalog";
import { decodePreferences, rememberTreatment } from "@/lib/preferences";
import { getDemoSlots } from "@/lib/availability";

const now = new Date("2026-09-27T05:00:00Z");

describe("bilingual discovery", () => {
  it("finds treatments through translated benefits and category tags", () => {
    expect(searchTreatments(businessConfig.treatments, "relaxation", "aroma", "id").map((item) => item.id)).toContain("aromatherapy-massage");
    expect(searchTreatments(businessConfig.treatments, "recovery", "sports", "en").map((item) => item.id)).toEqual(["sports-massage"]);
    expect(searchTreatments(businessConfig.treatments, "all", "nothing matches this", "en")).toEqual([]);
  });
  it("provides equivalent interface and catalog keys in both languages", () => {
    expect(Object.keys(id.ui).sort()).toEqual(Object.keys(en.ui).sort());
    expect(Object.keys(id.treatments).sort()).toEqual(Object.keys(en.treatments).sort());
    expect(Object.keys(id.errors).sort()).toEqual(Object.keys(en.errors).sort());
    expect(id.ui.requestReady).toBe("Permintaan Anda siap dikirim melalui WhatsApp.");
  });
  it("never fills live configuration with demonstration records", () => {
    const live = createBusinessConfig("live");
    expect(live.treatments).toEqual([]);
    expect(live.serviceAreas).toEqual([]);
    expect(live.therapists).toEqual([]);
    expect(live.testimonials).toEqual([]);
    expect(live.whatsappNumber).toBeNull();
  });
});

describe("local preferences", () => {
  it("rejects corrupt storage and unknown treatment IDs", () => {
    expect(decodePreferences("broken", ["reflexology"])).toEqual({ language: "en", favorites: [], recent: [] });
    expect(decodePreferences(JSON.stringify({ version: 1, language: "id", favorites: ["reflexology", "unknown", "reflexology"], recent: [], address: "never retain" }), ["reflexology"])).toEqual({ language: "id", favorites: ["reflexology"], recent: [] });
  });
  it("deduplicates recent items and caps them at four", () => {
    expect(rememberTreatment(["a", "b", "c", "d"], "c")).toEqual(["c", "a", "b", "d"]);
    expect(rememberTreatment(["a", "b", "c", "d"], "e")).toEqual(["e", "a", "b", "c"]);
  });
});

describe("demo schedule", () => {
  it("disables elapsed slots in business time, not visitor time", () => {
    const slots = getDemoSlots("2026-09-27", now, "Asia/Jakarta");
    expect(slots.find((slot) => slot.time === "10:30")?.available).toBe(false);
    expect(slots.find((slot) => slot.time === "13:30")?.available).toBe(true);
    expect(getDemoSlots("2026-09-26", now, "Asia/Jakarta").every((slot) => !slot.available)).toBe(true);
  });
});
