import { ImageResponse } from "next/og";
import { businessConfig } from "@/config/business";

export function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", background: "#E7EDE8", color: "#1F3B2E", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 30, color: "#2F6048" }}>{businessConfig.brand}</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 85, letterSpacing: "-4px", lineHeight: 1.1 }}><span>Your moment of calm.</span><span>Delivered.</span></div>
      <div style={{ fontSize: 25, color: "#56655A" }}>Massage and wellness, in the comfort of home.</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
