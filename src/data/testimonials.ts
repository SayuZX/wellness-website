import type { Testimonial } from "@/config/types";

const demo = { isDemo: true, isVerified: false, dataSource: "demo" } as const;
export const demoTestimonials: readonly Testimonial[] = [
  { ...demo, id: "review-one", name: "Alex", rating: 5, treatment: "swedish-massage", date: "2026-09-14" },
  { ...demo, id: "review-two", name: "Nadia", rating: 5, treatment: "aromatherapy-massage", date: "2026-09-18" },
  { ...demo, id: "review-three", name: "Sam", rating: 4, treatment: "reflexology", date: "2026-09-21" },
];
