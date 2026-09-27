import { businessConfig } from "@/config/business";
import { AppProviders } from "@/components/providers/app-providers";
import { About } from "@/components/sections/about";
import { BookingPreview } from "@/components/sections/booking-preview";
import { ClosingCTA } from "@/components/sections/closing-cta";
import { DemoNotice } from "@/components/sections/demo-notice";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { MobileActionDock } from "@/components/sections/mobile-action-dock";
import { PopularTreatments } from "@/components/sections/popular-treatments";
import { ServiceAreas } from "@/components/sections/service-areas";
import { Therapists } from "@/components/sections/therapists";
import { Testimonials } from "@/components/sections/testimonials";
import { Treatments } from "@/components/sections/treatments";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { SkipLink } from "@/components/ui/skip-link";

export default function HomePage() {
  return <AppProviders config={businessConfig}><div id="top" /><SkipLink /><Header /><main id="main"><DemoNotice /><Hero /><TrustStrip /><PopularTreatments /><Treatments /><About config={businessConfig} /><HowItWorks /><Therapists /><WhyChooseUs /><ServiceAreas /><BookingPreview /><Testimonials items={businessConfig.testimonials} /><FAQ config={businessConfig} /><ClosingCTA /></main><Footer config={businessConfig} /><MobileActionDock /></AppProviders>;
}
