import Link from "next/link";
import { GhostSignature } from "@/components/ghostcat/GhostSignature";
import type { EmotionalVector } from "@/types/ghostcat";

const demos = [
  {
    eyebrow: "Java demo",
    title: "Expiring Key Value Store",
    description:
      "A session-isolated store with TTL-based expiration, snapshot export, and method-call logging.",
    href: "/demos/java/expiring-kv",
    live: true
  },
    {
    eyebrow: "Node demo",
    title: "Tallymark Operations Cockpit",
    description:
      "A SPA-style reconciliation console where operator actions call typed backend endpoints and update live workspace state.",
    href: "/demos/node/tallymark",
    live: true,
  },
  {
    eyebrow: "Node demo",
    title: "Product API Demo",
    description:
      "A TypeScript API focused on validation, contracts, product-style routes, and frontend integration.",
    href: "/demos/node/product-catalog",
    live: true,
  },
];

const ghostcatVector: EmotionalVector = {
  calm: 0.62,
  tension: 0.34,
  longing: 0.78,
  energy: 0.42,
  clarity: 0.58,
  tenderness: 0.7,
  solitude: 0.66,
  momentum: 0.38,
};


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
        <article className="overflow-hidden rounded-3xl border border-gray-200 bg-[#f7f4ee] md:col-span-2">
          <div className="grid items-center gap-8 p-8 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                AI/Python exploration
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950">
                ghostcat
              </h3>
              <p className="mt-4 max-w-2xl text-gray-600 leading-7">
                A private reflection space that parses natural language into
                mathematical emotional vectors, then renders those values as a
                public abstract signature. 
              </p>
              <Link
                href="/ghostcat"
                className="mt-6 inline-block text-sm font-medium text-black underline underline-offset-4"
              >
                Visit ghostcat
              </Link>
            </div>

            <div className="relative rounded-[2rem] border border-white bg-[#ebe6dc] p-4 shadow-[0_24px_70px_rgba(80,70,55,0.16)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ghostcat.png"
                alt=""
                width={96}
                height={96}
                className="absolute -right-2 -top-5 h-20 w-20 object-contain drop-shadow-[0_14px_24px_rgba(80,70,55,0.22)] sm:-right-4 sm:-top-6 sm:h-24 sm:w-24"
              />
              <GhostSignature vector={ghostcatVector} />
            </div>
          </div>
        </article>

        {demos.map((demo) => (
          <div key={demo.title} className="rounded-3xl border border-gray-200 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              {demo.eyebrow}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-gray-950">
              {demo.title}
            </h3>
            <p className="mt-4 text-gray-600 leading-7">{demo.description}</p>
            {demo.live &&

            <Link
              href={demo.href}
              className="mt-6 inline-block text-sm font-medium text-black underline underline-offset-4"
            >
              View demo
            </Link>}
          </div>
        ))}
      </div>
    </section>
  );
}
