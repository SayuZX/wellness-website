import type { Therapist } from "@/config/types";

const demo = { isDemo: true, isVerified: false, dataSource: "demo" } as const;

export const demoTherapists: readonly Therapist[] = [
  { ...demo, id: "maya", name: "Maya", visual: "portrait-maya", experience: 5, rating: 4.9, sessions: 428, treatments: ["full-body-massage", "swedish-massage", "couples-massage"], status: "request" },
  { ...demo, id: "sarah", name: "Sarah", visual: "portrait-sarah", experience: 7, rating: 4.8, sessions: 361, treatments: ["deep-tissue-massage", "sports-massage", "head-neck-shoulder"], status: "limited" },
  { ...demo, id: "dina", name: "Dina", visual: "portrait-dina", experience: 4, rating: 4.9, sessions: 295, treatments: ["reflexology", "body-scrub", "head-neck-shoulder"], status: "request" },
  { ...demo, id: "rina", name: "Rina", visual: "portrait-rina", experience: 6, rating: 4.8, sessions: 334, treatments: ["aromatherapy-massage", "hot-stone-massage", "pregnancy-massage"], status: "request" },
];
