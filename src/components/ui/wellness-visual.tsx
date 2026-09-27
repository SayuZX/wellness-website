"use client";

import Image from "next/image";
import { assets, type AssetId } from "@/config/assets";
import { useLocale } from "@/components/providers/locale-provider";

export function WellnessVisual({ id, className = "", sizes = "(max-width: 767px) 100vw, 50vw", preload = false }: { id: AssetId; className?: string; sizes?: string; preload?: boolean }) {
  const { dictionary } = useLocale();
  const asset = assets[id];
  return <figure className={`wellness-visual ${className}`} data-status={asset.status}>
    <Image src={asset.src} alt={dictionary.visuals[id]} width={asset.width} height={asset.height} sizes={sizes} preload={preload} />
  </figure>;
}
