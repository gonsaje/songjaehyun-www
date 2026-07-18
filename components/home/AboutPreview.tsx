import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-3xl">

        <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
          About
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950">
          Systems-minded. Product-aware.
        </h2>

        <p className="mt-5 text-base leading-8 text-gray-600">
          I&apos;m a software engineer focused on backend systems, product architecture,
          and reliable delivery. Through DontSweat.Tech, I work across client
          launches and products including Vye, Farero, and Jumun, alongside years
          of enterprise platform, AEM, accessibility, and cloud migration work.
        </p>

        <div className="mt-6">
          <Link
            href="/about"
            className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 transition"
          >
            Read more about my background
            <span className="ml-2">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
