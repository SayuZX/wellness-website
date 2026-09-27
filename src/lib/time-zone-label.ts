import type { BusinessConfig, Language } from "@/config/types";

export function localizeTimeZoneLabel(config: BusinessConfig, language: Language) {
  if (language === "id" && config.timeZone === "Asia/Jakarta") return "Waktu Jakarta · WIB (UTC+07:00)";
  return config.timeZoneLabel;
}
