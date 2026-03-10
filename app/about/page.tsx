export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          About
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Full-Stack Engineer<br/>
          Focused on backend systems.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          I build software with an emphasis on clean architecture, systems thinking, and practical product design.

          This portfolio showcases interactive demos and projects that reflect how I approach APIs, services, and real backend execution.
        </p>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            What this site is
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            A portfolio platform, not just a static site
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            This site is built as an interactive platform that showcases different
            categories of backend work. The frontend is built with React and
            TypeScript, while the demos are powered by separate backend services
            chosen for different strengths.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Engineering approach
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Choosing the right tool for the right problem
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            I like building systems with clear boundaries and intentional tradeoffs.
            Java is used here for systems-oriented demos involving state,
            execution flow, and backend structure. Node.js and TypeScript are used
            for product-style APIs, validation, and contract-driven workflows.
          </p>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Java
          </p>
          <p className="mt-3 leading-7 text-gray-600">
            Systems demos focused on stateful backend behavior, algorithmic
            thinking, and service design.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Node.js
          </p>
          <p className="mt-3 leading-7 text-gray-600">
            Product-style API demos focused on validation, OpenAPI, request and
            response contracts, and practical integration patterns.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Frontend
          </p>
          <p className="mt-3 leading-7 text-gray-600">
            A React and TypeScript interface that ties everything together into a
            cohesive experience with interactive demos and technical writeups.
          </p>
        </div>
      </section>

      <section className="mt-16 max-w-4xl rounded-3xl border border-gray-200 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Why I built it this way
        </p>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          I wanted this portfolio to show more than screenshots or static project
          summaries. I wanted it to demonstrate how I structure code, separate
          concerns, design APIs, and think about engineering tradeoffs across
          different backend stacks.
        </p>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          The result is a platform where each demo is both a working project and
          a technical artifact. The goal is to make my engineering style visible,
          not just describe it.
        </p>
      </section>
    </main>
  );
}