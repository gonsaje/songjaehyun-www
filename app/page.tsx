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
      <div className="mx-auto max-w-6xl px-6 py-16"> 
      <Contact />
      </div>
    </main>
  );
}