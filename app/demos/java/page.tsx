import Link from "next/link";
import { demos } from "@/lib/demos";

export default function JavaDemosPage() {
  const javaDemos = demos.filter((demo) => demo.category === "java");

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Java track
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Java demos
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Systems-oriented demos focused on stateful backend behavior,
          algorithms, execution flow, and concurrency concepts.
        </p>
      </div>

      <div className="mt-12 grid gap-6">
        {javaDemos.map((demo) => (
          <Link
            key={demo.slug}
            href={demo.href}
            className="rounded-3xl border border-gray-200 p-6 transition hover:border-gray-300 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{demo.title}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                  {demo.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {demo.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}