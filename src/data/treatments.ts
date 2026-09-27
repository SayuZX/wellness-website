import type { Treatment } from "@/config/types";

const demo = { isDemo: true, isVerified: false, dataSource: "demo" } as const;

export const demoTreatments: readonly Treatment[] = [
  { ...demo, id: "full-body-massage", category: "massage", categories: ["massage", "relaxation"], visual: "towels", recommendedMinutes: 90, popular: false, options: [{ minutes: 60, price: 250000 }, { minutes: 90, price: 350000 }, { minutes: 120, price: 450000 }] },
  { ...demo, id: "swedish-massage", category: "massage", categories: ["massage", "relaxation"], visual: "oil", recommendedMinutes: 90, popular: true, options: [{ minutes: 60, price: 180000 }, { minutes: 90, price: 250000 }, { minutes: 120, price: 320000 }] },
  { ...demo, id: "deep-tissue-massage", category: "massage", categories: ["massage", "recovery"], visual: "sculpture", recommendedMinutes: 90, popular: true, options: [{ minutes: 60, price: 220000 }, { minutes: 90, price: 300000 }, { minutes: 120, price: 380000 }] },
  { ...demo, id: "aromatherapy-massage", category: "massage", categories: ["massage", "relaxation"], visual: "diffuser", recommendedMinutes: 90, popular: true, options: [{ minutes: 60, price: 200000 }, { minutes: 90, price: 280000 }] },
  { ...demo, id: "reflexology", category: "reflexology", categories: ["reflexology", "relaxation"], visual: "stones", recommendedMinutes: 60, popular: false, options: [{ minutes: 30, price: 90000 }, { minutes: 60, price: 150000 }, { minutes: 90, price: 210000 }] },
  { ...demo, id: "hot-stone-massage", category: "massage", categories: ["massage", "relaxation"], visual: "stones", recommendedMinutes: 90, popular: false, options: [{ minutes: 90, price: 350000 }, { minutes: 120, price: 430000 }] },
  { ...demo, id: "sports-massage", category: "massage", categories: ["massage", "recovery"], visual: "pillow", recommendedMinutes: 90, popular: false, options: [{ minutes: 60, price: 250000 }, { minutes: 90, price: 330000 }] },
  { ...demo, id: "body-scrub", category: "body-care", categories: ["body-care", "relaxation"], visual: "scrub", recommendedMinutes: 60, popular: false, options: [{ minutes: 45, price: 180000 }, { minutes: 60, price: 220000 }] },
  { ...demo, id: "head-neck-shoulder", category: "massage", categories: ["massage", "recovery"], visual: "pillow", recommendedMinutes: 60, popular: false, options: [{ minutes: 30, price: 100000 }, { minutes: 60, price: 170000 }] },
  { ...demo, id: "couples-massage", category: "massage", categories: ["massage", "relaxation"], visual: "couples", recommendedMinutes: 90, popular: false, options: [{ minutes: 60, price: 390000 }, { minutes: 90, price: 520000 }] },
  { ...demo, id: "pregnancy-massage", category: "massage", categories: ["massage", "relaxation"], visual: "towels", recommendedMinutes: 60, popular: false, options: [{ minutes: 60, price: 230000 }, { minutes: 90, price: 300000 }] },
];
