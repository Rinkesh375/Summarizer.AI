import BgGradient from "@/components/common/BgGradient";
import CTASection from "@/components/home/cta-section";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowWorks from "@/components/home/how-works";
import PricingSection from "@/components/home/pricing-section";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowWorks/>
        <PricingSection/>
        <CTASection/>
      </div>
    </div>
  );
}
