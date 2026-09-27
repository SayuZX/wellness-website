import { demoPromotions } from "@/data/promotions";
import { demoServiceAreas } from "@/data/service-areas";
import { demoTestimonials } from "@/data/testimonials";
import { demoTherapists } from "@/data/therapists";
import { demoTreatments } from "@/data/treatments";
import type { BusinessConfig } from "./types";

const showDemoReviews = process.env.NEXT_PUBLIC_ENABLE_DEMO_REVIEWS !== "false";

export function createBusinessConfig(mode: "demonstration" | "live" = "demonstration"): BusinessConfig {
  const demo = mode === "demonstration";
  return {
    brand: "Still at Home",
    currency: "IDR",
    locale: "en-US",
    timeZone: "Asia/Jakarta",
    timeZoneLabel: "Jakarta time · WIB (UTC+07:00)",
    pricingMode: mode,
    whatsappNumber: null,
    contactEmail: null,
    contactPhone: null,
    siteUrl: null,
    serviceAreas: demo ? demoServiceAreas : [],
    operatingHours: [],
    therapistPreferences: demo ? ["", "male", "female", "specific"] : [],
    treatments: demo ? demoTreatments : [],
    therapists: demo ? demoTherapists : [],
    testimonials: demo && showDemoReviews ? demoTestimonials : [],
    promotions: demo ? demoPromotions : [],
    policyLinks: [],
  };
}

export const businessConfig = createBusinessConfig();
