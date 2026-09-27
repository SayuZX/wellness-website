"use client";

import { useLocale } from "@/components/providers/locale-provider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, dictionary } = useLocale();
  return <div className={`language-switcher${compact ? " is-compact" : ""}`} role="group" aria-label={dictionary.ui.changeLanguage}>
    <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")} lang="en">EN</button>
    <button type="button" aria-pressed={language === "id"} onClick={() => setLanguage("id")} lang="id">ID</button>
  </div>;
}
