import type { Metadata, Viewport } from "next";
import { businessConfig } from "@/config/business";
import { en } from "@/locales/en";
import "./globals.css";
import "./experience.css";

export const metadata: Metadata = {
  title: `${en.meta.title} | ${businessConfig.brand}`,
  description: en.meta.description,
  ...(businessConfig.siteUrl ? { metadataBase: new URL(businessConfig.siteUrl), alternates: { canonical: "/" } } : {}),
  openGraph: { title: `${en.meta.title} | ${businessConfig.brand}`, description: en.meta.description, type: "website", locale: "en_ID", siteName: businessConfig.brand, ...(businessConfig.siteUrl ? { url: businessConfig.siteUrl, images: [{ url: "/share-image", width: 1200, height: 630, alt: `${businessConfig.brand}: ${en.meta.title}` }] } : {}) },
  robots: businessConfig.pricingMode === "demonstration" ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#1F3B2E", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
