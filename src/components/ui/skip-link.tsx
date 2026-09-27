"use client";

import { useLocale } from "@/components/providers/locale-provider";

export function SkipLink() {
  const { dictionary } = useLocale();
  return <a href="#main" className="skip-link">{dictionary.ui.skip}</a>;
}
