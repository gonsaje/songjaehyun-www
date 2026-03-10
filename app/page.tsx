import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Song Jaehyun
          </p>

          <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Interactive backend engineering demos across Java and Node.js.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            A React and TypeScript frontend showcasing systems-oriented Java demos
            and product-style Node.js API demos through one unified platform.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/demos"
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Explore Demos
            </Link>

            <Link
              href="/architecture"
              className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
              View Architecture
            </Link>
          </div>
        </div>
      </section>
       <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Java demos
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Systems and backend engineering
            </h2>
            <p className="mt-4 text-gray-600 leading-7">
              Stateful demos focused on data structures, concurrency, request
              control, and backend execution patterns.
            </p>
            <Link
              href="/demos/java"
              className="mt-6 inline-block text-sm font-medium text-black underline underline-offset-4"
            >
              Browse Java demos
            </Link>
          </div>

          <div className="rounded-3xl border border-gray-200 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Node demos
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Product APIs and OpenAPI workflows
            </h2>
            <p className="mt-4 text-gray-600 leading-7">
              TypeScript backend demos focused on validation, contracts,
              product-style REST APIs, and frontend integration.
            </p>
            <Link
              href="/demos/node"
              className="mt-6 inline-block text-sm font-medium text-black underline underline-offset-4"
            >
              Browse Node demos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}