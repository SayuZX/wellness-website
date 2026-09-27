import type { Promotion } from "@/config/types";

export const demoPromotions: readonly Promotion[] = [
  { id: "welcome", percentage: 15, enabled: true, isDemo: true, isVerified: false, dataSource: "demo" },
];
