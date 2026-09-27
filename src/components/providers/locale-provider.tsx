"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Language } from "@/config/types";
import type { Dictionary } from "@/locales/en";
import { dictionaries } from "@/locales";
import { decodePreferences, defaultPreferences, encodePreferences, preferencesStorageKey, type Preferences } from "@/lib/preferences";

export type LocaleContextValue = Readonly<{
  language: Language;
  dictionary: Dictionary;
  setLanguage: (language: Language) => void;
  hydrated: boolean;
  preferences: Preferences;
  setPreferences: (value: Preferences | ((current: Preferences) => Preferences)) => void;
}>;

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ treatmentIds, children }: { treatmentIds: readonly string[]; children: ReactNode }) {
  const [preferences, setPreferencesState] = useState<Preferences>(defaultPreferences);
  const [hydrated, setHydrated] = useState(false);
  const hasReadStorage = useRef(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        setPreferencesState(decodePreferences(window.localStorage.getItem(preferencesStorageKey), treatmentIds));
      } catch {
        setPreferencesState(defaultPreferences);
      }
      hasReadStorage.current = true;
      setHydrated(true);
    });
    return () => { active = false; };
  }, [treatmentIds]);

  useEffect(() => {
    if (!hasReadStorage.current) return;
    try {
      window.localStorage.setItem(preferencesStorageKey, encodePreferences(preferences));
    } catch {
      return;
    }
  }, [preferences]);

  useEffect(() => {
    document.documentElement.lang = preferences.language;
    document.title = `${dictionaries[preferences.language].meta.title} | Still at Home`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = dictionaries[preferences.language].meta.description;
  }, [preferences.language]);

  const setLanguage = useCallback((language: Language) => {
    setPreferencesState((current) => ({ ...current, language }));
  }, []);

  const setPreferences = useCallback((value: Preferences | ((current: Preferences) => Preferences)) => {
    setPreferencesState(value);
  }, []);

  const value = useMemo<LocaleContextValue>(() => ({ language: preferences.language, dictionary: dictionaries[preferences.language], setLanguage, hydrated, preferences, setPreferences }), [preferences, setLanguage, hydrated, setPreferences]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("Localized components require LocaleProvider.");
  return context;
}
