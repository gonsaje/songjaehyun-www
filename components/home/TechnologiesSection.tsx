
import TechCarousel from "./TechCarousel";

export default function TechnologiesSection() {
  return (
    <section id="technologies" className="mx-auto max-w-6xl px-6 py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
          Technologies
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950">
          Built across the stack
        </h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          The languages, frameworks, data systems, and infrastructure I use to
          design and deliver production software.
        </p>
      </div>

      <div className="mt-8">
        <TechCarousel />
      </div>
    </section>
  );
}
