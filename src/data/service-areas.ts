import type { ServiceArea } from "@/config/types";

const demo = { isDemo: true, isVerified: false, dataSource: "demo" } as const;

export const demoServiceAreas: readonly ServiceArea[] = [
  { ...demo, id: "jakarta", name: "Jakarta", status: "available" },
  { ...demo, id: "south-jakarta", name: "South Jakarta", parentId: "jakarta", status: "available" },
  { ...demo, id: "central-jakarta", name: "Central Jakarta", parentId: "jakarta", status: "available" },
  { ...demo, id: "west-jakarta", name: "West Jakarta", parentId: "jakarta", status: "limited" },
  { ...demo, id: "east-jakarta", name: "East Jakarta", parentId: "jakarta", status: "limited" },
  { ...demo, id: "north-jakarta", name: "North Jakarta", parentId: "jakarta", status: "available" },
  { ...demo, id: "tangerang", name: "Tangerang", status: "available" },
  { ...demo, id: "south-tangerang", name: "South Tangerang", status: "available" },
  { ...demo, id: "bekasi", name: "Bekasi", status: "limited" },
  { ...demo, id: "depok", name: "Depok", status: "limited" },
  { ...demo, id: "bandung", name: "Bandung", status: "available" },
  { ...demo, id: "surabaya", name: "Surabaya", status: "limited" },
  { ...demo, id: "semarang", name: "Semarang", status: "coming-soon" },
  { ...demo, id: "yogyakarta", name: "Yogyakarta", status: "coming-soon" },
  { ...demo, id: "bali", name: "Bali", status: "unavailable" },
];
