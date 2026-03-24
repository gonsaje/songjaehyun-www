import Link from "next/link";

export default function HomeBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-14">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
          Jae Hyun Song · Backend-Focused Software Engineer
        </p>

        <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-6xl">
          Systems-minded engineering
          <br />
          across Java, Node.js, and AWS
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          This portfolio brings together interactive backend demos,
          production-style APIs, and architecture work designed to show how I
          build across the stack.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Spring Boot · Fastify · Next.js · TypeScript · AWS
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/demos"
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            View My Work
          </Link>

          <Link
            href="/architecture"
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
          >
            How It’s Built
          </Link>
        </div>
      </div>
    </section>
  );
}