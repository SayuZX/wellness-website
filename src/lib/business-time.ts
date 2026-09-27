export function getBusinessNow(now: Date, timeZone: string): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return { date: `${value("year")}-${value("month")}-${value("day")}`, time: `${value("hour")}:${value("minute")}` };
}

export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (year < 1000 || month < 1 || month > 12 || day < 1) return false;
  return day <= new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function isTime(value: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function formatBookingDate(value: string, language: "en" | "id" = "en", fallback?: string): string {
  if (!isCalendarDate(value)) return fallback ?? (language === "id" ? "Pilih tanggal" : "Choose a date");
  return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}

export function supportsBusinessTimeZone(timeZone: string): boolean {
  return ["Asia/Jakarta", "Asia/Pontianak", "Asia/Makassar", "Asia/Jayapura", "UTC"].includes(timeZone);
}
