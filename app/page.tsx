import HeroBanner from "@/components/home/HeroBanner";
import TechnologiesSection from "@/components/home/TechnologiesSection";
import AboutPreview from "@/components/home/AboutPreview";
import SelectedWork from "@/components/home/SelectedWork";
import Contact from "@/components/layout/Contact";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <SelectedWork />
      <AboutPreview />
      <TechnologiesSection />
      <div className="mx-auto max-w-6xl px-6 py-16"> 
        <Contact />
      </div>
    </main>
  );
}
