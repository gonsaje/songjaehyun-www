import type { Metadata } from "next";
import Contact from "@/components/layout/Contact";
import { workItems } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work | Jae Hyun Song",
  description:
    "Selected client, product, and enterprise software engineering work by Jae Hyun Song.",
};

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Work
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Product engineering from first architecture to production operations.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          I build software across backend systems, product interfaces, cloud delivery,
          and the operational details that decide whether a launch actually holds up.
          The work below spans my independent practice, client delivery, product
          development, and enterprise platforms.
        </p>
      </section>

      <section className="mt-16 space-y-8" aria-label="Selected work">
        {workItems.map((item, index) => (
          <article
            key={item.title}
            className="rounded-3xl border border-gray-200 p-8 sm:p-10"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  {String(index + 1).padStart(2, "0")} · {item.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950">
                  {item.title}
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">{item.summary}</p>

                {item.href && item.linkLabel ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900"
                  >
                    {item.linkLabel} ↗
                  </a>
                ) : null}
              </div>

              <div>
                <p className="leading-7 text-gray-600">{item.details}</p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-gray-700">
                  {item.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2">
                  {item.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-16 rounded-3xl bg-gray-950 p-8 text-white sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          How I work
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {[
            ["Clarify", "Map the real workflow, constraints, dependencies, and definition of done."],
            ["Build", "Stay hands-on across contracts, interfaces, data, infrastructure, and delivery."],
            ["Stabilize", "Make ownership, observability, rollout choices, and future changes easier to reason about."],
          ].map(([title, description]) => (
            <div key={title}>
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
