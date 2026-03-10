import HeroBanner from "@/components/home/HeroBanner";
import ExploreSection from "@/components/home/ExploreSection";
import FeaturedDemos from "@/components/home/FeaturedDemos";
import TechnologiesSection from "@/components/home/TechnologiesSection";
import ArchitecturePreview from "@/components/home/ArchitecturePreview";
import AboutPreview from "@/components/home/AboutPreview";
import Contact from "@/components/layout/Contact";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <TechnologiesSection />
      <FeaturedDemos />
      <ArchitecturePreview />
      <AboutPreview />
      <Contact />
    </main>
  );
}