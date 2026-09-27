export type AssetId = "hero" | "stones" | "towels" | "oil" | "diffuser" | "scrub" | "pillow" | "couples" | "sculpture" | "portrait-maya" | "portrait-sarah" | "portrait-dina" | "portrait-rina";
export type VisualAsset = Readonly<{ src: string; width: number; height: number; status: "original-render" | "licensed-photo" }>;

export const assets: Record<AssetId, VisualAsset> = {
  hero: { src: "/images/hero-botanical.webp", width: 1600, height: 900, status: "original-render" },
  stones: { src: "/images/stones-botanical.webp", width: 960, height: 960, status: "original-render" },
  towels: { src: "/images/towels-diffuser-botanical.webp", width: 960, height: 960, status: "original-render" },
  oil: { src: "/images/hero-botanical.webp", width: 1600, height: 900, status: "original-render" },
  diffuser: { src: "/images/towels-diffuser-botanical.webp", width: 960, height: 960, status: "original-render" },
  scrub: { src: "/images/scrub-botanical.webp", width: 960, height: 960, status: "original-render" },
  pillow: { src: "/images/towels-diffuser-botanical.webp", width: 960, height: 960, status: "original-render" },
  couples: { src: "/images/hero-botanical.webp", width: 1600, height: 900, status: "original-render" },
  sculpture: { src: "/images/scrub-botanical.webp", width: 960, height: 960, status: "original-render" },
  "portrait-maya": { src: "/images/therapist-maya.webp", width: 640, height: 640, status: "original-render" },
  "portrait-sarah": { src: "/images/therapist-sarah.webp", width: 640, height: 640, status: "original-render" },
  "portrait-dina": { src: "/images/therapist-dina.webp", width: 640, height: 640, status: "original-render" },
  "portrait-rina": { src: "/images/therapist-rina.webp", width: 640, height: 640, status: "original-render" },
};
