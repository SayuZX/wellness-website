import type { Language } from "@/config/types";
import { en } from "./en";
import { id } from "./id";

export const dictionaries = { en, id } as const;
export function getDictionary(language: Language) {
  return dictionaries[language];
}
