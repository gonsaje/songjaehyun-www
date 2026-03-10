import Link from "next/link";

export default function ArchitecturePreview() {
  return (
    <section id="architecture-preview" className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
            Architecture
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950">
            One frontend, separate backend tracks
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            The platform uses a unified React frontend with distinct backend paths:
            Java for systems-oriented demos and Node.js for product-style APIs.
          </p>

          <div className="mt-8 space-y-4 text-sm leading-7 text-gray-600">
            <p>• Real backend execution over frontend simulation</p>
            <p>• Thin API layers over isolated domain logic</p>
            <p>• Session-based demo instances for per-visitor isolation</p>
            <p>• Shared infrastructure for logging and platform behavior</p>
          </div>

          <Link
            href="/architecture"
            className="mt-8 inline-block rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
          >
            Read the architecture
          </Link>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
          <p className="text-sm font-medium text-gray-500">Platform flow</p>
          <div className="mt-6 space-y-4 text-sm text-gray-700">
            <div className="rounded-2xl bg-white p-4">Next.js Frontend</div>
            <div className="rounded-2xl bg-white p-4">Java Demo Service</div>
            <div className="rounded-2xl bg-white p-4">Node API Service</div>
            <div className="rounded-2xl bg-white p-4">AWS Deployment</div>
          </div>
        </div>
      </div>
    </section>
  );
}