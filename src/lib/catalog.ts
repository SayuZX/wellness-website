import type { BusinessConfig, Language, ServiceArea, Treatment, TreatmentCategory } from "@/config/types";
import { en } from "@/locales/en";
import { id } from "@/locales/id";

const dictionaries = { en, id } as const;

export function getTreatment(config: BusinessConfig, id: string): Treatment | undefined {
  return config.treatments.find((treatment) => treatment.id === id);
}

export function getTreatmentOption(treatment: Treatment | undefined, minutes: string) {
  if (!/^\d+$/.test(minutes)) return undefined;
  const duration = Number(minutes);
  if (!Number.isSafeInteger(duration) || duration <= 0) return undefined;
  return treatment?.options.find((option) => option.minutes === duration && Number.isFinite(option.price) && option.price > 0);
}

export function filterTreatments(treatments: readonly Treatment[], category: TreatmentCategory | "all") {
  return category === "all" ? treatments : treatments.filter((treatment) => treatment.categories.includes(category));
}

export function searchTreatments(treatments: readonly Treatment[], category: TreatmentCategory | "all", query: string, language: Language) {
  const filtered = filterTreatments(treatments, category);
  const normalized = query.trim().toLocaleLowerCase(language === "id" ? "id" : "en");
  if (!normalized) return filtered;
  const dictionary = dictionaries[language];
  return filtered.filter((treatment) => {
    const copy = dictionary.treatments[treatment.id];
    const searchable = [
      copy.title,
      copy.description,
      copy.detail,
      copy.preparation,
      ...copy.benefits,
      ...copy.keywords,
      ...treatment.categories.map((tag) => dictionary.categories[tag]),
    ].join(" ").toLocaleLowerCase(language === "id" ? "id" : "en");
    return searchable.includes(normalized);
  });
}

export function searchServiceAreas(areas: readonly ServiceArea[], query: string, names?: Readonly<Record<string, string>>) {
  const normalized = query.trim().toLocaleLowerCase();
  return areas.filter((area) => (names?.[area.id] ?? area.name).toLocaleLowerCase().includes(normalized));
}
