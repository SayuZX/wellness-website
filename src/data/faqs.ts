export const faqIds = ["request", "preparation", "coverage", "duration", "confirmation", "timezone", "demo", "privacy"] as const;
export type FaqId = (typeof faqIds)[number];
