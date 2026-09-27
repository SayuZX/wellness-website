"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import type { TreatmentId } from "@/config/types";
import { rememberTreatment, toggleFavorite } from "@/lib/preferences";
import { useLocale } from "./locale-provider";

export type PreferencesContextValue = Readonly<{
  favorites: readonly string[];
  recent: readonly string[];
  toggleFavorite: (id: TreatmentId) => void;
  remember: (id: TreatmentId) => void;
  reset: () => void;
  loadFavorites: (ids: readonly TreatmentId[]) => void;
}>;

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const { preferences, setPreferences } = useLocale();
  const toggle = useCallback((id: TreatmentId) => setPreferences((current) => ({ ...current, favorites: toggleFavorite(current.favorites, id) })), [setPreferences]);
  const remember = useCallback((id: TreatmentId) => setPreferences((current) => ({ ...current, recent: rememberTreatment(current.recent, id) })), [setPreferences]);
  const reset = useCallback(() => setPreferences((current) => ({ ...current, favorites: [], recent: [] })), [setPreferences]);
  const loadFavorites = useCallback((ids: readonly TreatmentId[]) => setPreferences((current) => ({ ...current, favorites: [...new Set(ids)] })), [setPreferences]);
  const value = useMemo(() => ({ favorites: preferences.favorites, recent: preferences.recent, toggleFavorite: toggle, remember, reset, loadFavorites }), [preferences.favorites, preferences.recent, toggle, remember, reset, loadFavorites]);
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("Preference components require PreferencesProvider.");
  return context;
}
