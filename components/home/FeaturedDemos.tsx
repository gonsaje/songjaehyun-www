import Link from "next/link";

const demos = [
  {
    eyebrow: "Java demo",
    title: "Expiring Key Value Store",
    description:
      "A session-isolated store with TTL-based expiration, snapshot export, and method-call logging.",
    href: "/demos/java/expiring-kv",
  },
  {
    eyebrow: "Planned demo",
    title: "LRU Cache",
    description:
      "A visual backend demo focused on eviction policy, access patterns, and cache behavior.",
    href: "/demos/java",
  },
  {
    eyebrow: "Planned demo",
    title: "Sliding Window Rate Limiter",
    description:
      "An interactive demo showing request admission, time windows, and rate limiting behavior.",
    href: "/demos/java",
  },
  {
    eyebrow: "Node demo",
    title: "Product API Demo",
    description:
      "A TypeScript API focused on validation, contracts, product-style routes, and frontend integration.",
    href: "/demos/node",
  },
];

export default function FeaturedDemos() {
  return (
    <section id="featured-demos" className="mx-auto max-w-6xl px-6 py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
          Demos
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950">
          Featured demos
        </h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Interactive backend demos designed to make systems behavior, API design,
          and execution flow visible.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {demos.map((demo) => (
          <div key={demo.title} className="rounded-3xl border border-gray-200 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              {demo.eyebrow}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-gray-950">
              {demo.title}
            </h3>
            <p className="mt-4 text-gray-600 leading-7">{demo.description}</p>
            <Link
              href={demo.href}
              className="mt-6 inline-block text-sm font-medium text-black underline underline-offset-4"
            >
              View demo
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}