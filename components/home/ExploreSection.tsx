import Link from "next/link";

const items = [
  {
    title: "Technologies",
    description: "The tools, frameworks, and infrastructure behind the platform.",
    href: "#technologies",
  },
  {
    title: "Demos",
    description: "Interactive backend demos across Java systems and Node APIs.",
    href: "#featured-demos",
  },
  {
    title: "Site Architecture",
    description: "How the frontend and backend services are structured and deployed.",
    href: "#architecture-preview",
  },
  {
    title: "Contact",
    description: "Reach out for engineering roles, collaboration, or conversation.",
    href: "#contact",
  },
];

export default function ExploreSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
          Explore
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950">
          Explore the site
        </h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          A guided look through the demos, technologies, and architecture behind
          this engineering platform.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-3xl border border-gray-200 p-6 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}