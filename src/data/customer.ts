import type { Provenance, TreatmentId } from "@/config/types";

export type DemoVisit = Provenance & Readonly<{ id: string; treatmentId: TreatmentId; duration: number; dayOffset: number; time: string; group: "upcoming" | "history" }>;
export const demoVisits: readonly DemoVisit[] = [
  { id: "sample-upcoming", treatmentId: "swedish-massage", duration: 90, dayOffset: 3, time: "13:30", group: "upcoming", isDemo: true, isVerified: false, dataSource: "demo" },
  { id: "sample-history", treatmentId: "reflexology", duration: 60, dayOffset: -7, time: "10:30", group: "history", isDemo: true, isVerified: false, dataSource: "demo" },
];
export const demoFavoriteIds: readonly TreatmentId[] = ["swedish-massage", "aromatherapy-massage"];
