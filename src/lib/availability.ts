import { demoAdvanceDays, demoTimeSlots, demoUnavailableSlots } from "@/data/availability";
import { getBusinessNow, isCalendarDate } from "./business-time";

export type DemoSlot = Readonly<{ time: (typeof demoTimeSlots)[number]; available: boolean; reason: "available" | "past" | "simulated-unavailable" | "outside-demo-range" }>;

function utcDay(value: string): number | null {
  if (!isCalendarDate(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

export function getDemoSlots(date: string, now: Date, timeZone: string): readonly DemoSlot[] {
  let businessNow: ReturnType<typeof getBusinessNow>;
  try {
    businessNow = getBusinessNow(now, timeZone);
  } catch {
    return demoTimeSlots.map((time) => ({ time, available: false, reason: "outside-demo-range" }));
  }
  const selectedDay = utcDay(date);
  const today = utcDay(businessNow.date);
  const outsideRange = selectedDay === null || today === null || selectedDay < today || selectedDay > today + demoAdvanceDays * 86400000;
  return demoTimeSlots.map((time) => {
    if (outsideRange) return { time, available: false, reason: "outside-demo-range" };
    if (date === businessNow.date && time <= businessNow.time) return { time, available: false, reason: "past" };
    if (demoUnavailableSlots.includes(time)) return { time, available: false, reason: "simulated-unavailable" };
    return { time, available: true, reason: "available" };
  });
}

export function isDemoSlotAvailable(date: string, time: string, now: Date, timeZone: string): boolean {
  return getDemoSlots(date, now, timeZone).some((slot) => slot.time === time && slot.available);
}
