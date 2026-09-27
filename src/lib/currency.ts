import type { BusinessConfig } from "@/config/types";

export function formatPrice(amount: number, config: Pick<BusinessConfig, "locale" | "currency">): string {
  return new Intl.NumberFormat(config.locale, {
    style: "currency", currency: config.currency, currencyDisplay: "code", maximumFractionDigits: 0,
  }).format(amount);
}
