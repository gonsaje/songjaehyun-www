import Link from "next/link";

export default function HomeBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-14">
      <div className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Jaehyun Song
        </p>

        <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-6xl">
          Backend engineering,
          <br />
          made interactive.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          A unified frontend for systems-oriented Java demos, product-style Node.js
          APIs, and the architecture behind them.
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
  );
}