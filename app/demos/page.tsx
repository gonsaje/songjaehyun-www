import Link from "next/link";

export default function DemosPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Demo platform
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Explore demos by backend track.
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          This platform is divided into two backend categories: Java for
          systems-oriented demos and Node.js for product-style API demos.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Link
          href="/demos/java"
          className="rounded-3xl border border-gray-200 p-8 transition hover:border-gray-300 hover:shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Java
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Systems demos
          </h2>
          <p className="mt-4 leading-7 text-gray-600">
            Interactive backend demos around state, execution flow, algorithms,
            and systems-style design.
          </p>
        </Link>

        <Link
          href="/demos/node"
          className="rounded-3xl border border-gray-200 p-8 transition hover:border-gray-300 hover:shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Node
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Product API demos
          </h2>
          <p className="mt-4 leading-7 text-gray-600">
            TypeScript API demos around validation, OpenAPI contracts, and
            real-world product backend patterns.
          </p>
        </Link>
      </div>
    </main>
  );
}