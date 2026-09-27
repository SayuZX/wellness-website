import type { Language } from "@/config/types";

export const preferencesStorageKey = "still-at-home-preferences";

export type Preferences = Readonly<{ language: Language; favorites: readonly string[]; recent: readonly string[] }>;

type StoredPreferences = { version?: unknown; language?: unknown; favorites?: unknown; recent?: unknown };

export const defaultPreferences: Preferences = { language: "en", favorites: [], recent: [] };

function knownUnique(value: unknown, knownIds: ReadonlySet<string>, maximum?: number) {
  if (!Array.isArray(value)) return [];
  const result: string[] = [];
  for (const item of value) {
    if (typeof item === "string" && knownIds.has(item) && !result.includes(item)) result.push(item);
    if (maximum && result.length === maximum) break;
  }
  return result;
}

export function decodePreferences(serialized: string | null, knownTreatmentIds: readonly string[]): Preferences {
  if (!serialized) return defaultPreferences;
  try {
    const parsed = JSON.parse(serialized) as StoredPreferences;
    if (!parsed || typeof parsed !== "object" || parsed.version !== 1) return defaultPreferences;
    const knownIds = new Set(knownTreatmentIds);
    return {
      language: parsed.language === "id" ? "id" : "en",
      favorites: knownUnique(parsed.favorites, knownIds),
      recent: knownUnique(parsed.recent, knownIds, 4),
    };
  } catch {
    return defaultPreferences;
  }
}

export function encodePreferences(preferences: Preferences): string {
  return JSON.stringify({ version: 1, language: preferences.language, favorites: preferences.favorites, recent: preferences.recent });
}

export function rememberTreatment(currentIds: readonly string[], treatmentId: string): string[] {
  return [treatmentId, ...currentIds.filter((id) => id !== treatmentId)].slice(0, 4);
}

export function toggleFavorite(currentIds: readonly string[], treatmentId: string): string[] {
  return currentIds.includes(treatmentId) ? currentIds.filter((id) => id !== treatmentId) : [...currentIds, treatmentId];
}
