import Link from "next/link";
import { workItems } from "@/lib/work";

const featuredTitles = new Set([
  "Vye Coconut Water",
  "Farero",
  "Jumun",
  "Enterprise platform delivery",
]);

export default function SelectedWork() {
  const featuredWork = workItems.filter((item) => featuredTitles.has(item.title));

  return (
    <section id="selected-work" className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
            Client &amp; product work
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950">
            Software built for real operating constraints.
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Through{" "}
            <a
              href="https://dontsweat.tech/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
            >
              DontSweat.Tech
            </a>
            , I work across client launches, SaaS products, commerce systems, and
            enterprise platforms—from architecture through production delivery.
          </p>
        </div>

        <Link
          href="/work"
          className="shrink-0 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900"
        >
          See all work →
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {featuredWork.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-3xl border border-gray-200 p-8 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              {item.eyebrow}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-gray-950">
              {item.title}
            </h3>
            <p className="mt-4 flex-1 leading-7 text-gray-600">{item.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.stack.slice(0, 4).map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                >
                  {technology}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
