"use client";

import type { ReactNode } from "react";
import type { BusinessConfig } from "@/config/types";
import { BookingProvider } from "@/components/booking/booking-provider";
import { LocaleProvider } from "./locale-provider";
import { PreferencesProvider } from "./preferences-provider";

export function AppProviders({ config, children }: { config: BusinessConfig; children: ReactNode }) {
  const treatmentIds = config.treatments.map((treatment) => treatment.id);
  return <LocaleProvider treatmentIds={treatmentIds}><PreferencesProvider><BookingProvider config={config}>{children}</BookingProvider></PreferencesProvider></LocaleProvider>;
}
