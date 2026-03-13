import Contact from "@/components/layout/Contact";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">

      {/* HERO */}

      <section className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          About
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Backend-focused software engineer
          <br />
          building reliable systems.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          Software engineer with experience designing backend services,
          leading enterprise platform migrations, and building systems that
          prioritize reliability, clarity, and long-term maintainability.
        </p>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
          My work spans backend architecture, cloud delivery, caching strategy,
          and full-stack implementation. I enjoy building systems where
          correctness, performance, and developer clarity matter.
        </p>
      </section>


      {/* SKILLS */}

      <section className="mt-16 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-gray-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Backend
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Java, concurrency, REST APIs, SQL, Spring Boot, JVM fundamentals,
            caching strategies, stateful backend services.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Platform
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Docker, Linux, CI/CD pipelines, distributed deployment, Apache
            HTTP Server, CDN caching and invalidation strategies.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Frontend
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            React, TypeScript, JavaScript (ES6+), HTML, CSS, accessibility,
            web performance, developer-facing UI.
          </p>
        </div>

      </section>


      {/* SWE EXPERIENCE */}

      <section className="mt-16">

        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Experience
        </p>

        <div className="mt-6 rounded-3xl border border-gray-200 p-10">

          <h2 className="text-2xl font-semibold">
            Software Engineer
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            PiSrc — New York
          </p>

          <div className="mt-6 space-y-4 text-gray-600 leading-7">

            <p>
              Built and maintained Java-based backend services supporting
              correctness-sensitive workflows, cache consistency, and
              user-specific state across authentication and session transitions.
            </p>

            <p>
              Led migration of enterprise platform infrastructure from
              on-premise deployment to a cloud-native architecture, refactoring
              over 40 backend services while preserving transactional integrity
              and zero-downtime releases.
            </p>

            <p>
              Designed multi-layer caching and invalidation strategies across
              Apache, Dispatcher, and CDN layers to reduce origin load and
              improve global response latency.
            </p>

            <p>
              Served as a technical lead for enterprise clients, translating
              product requirements into backend architecture, frontend
              implementation, and infrastructure decisions while remaining
              hands-on in development and production support.
            </p>

            <p>
              Partnered with security and QA teams to remediate critical
              vulnerabilities through safer serialization patterns, stricter
              validation, and hardened runtime configurations.
            </p>

          </div>

        </div>

      </section>


      {/* SECOND ROW EXPERIENCE */}

      <section className="mt-16 grid gap-6 md:grid-cols-2">

        <div className="rounded-3xl border border-gray-200 p-8">

          <h2 className="text-xl font-semibold">
            Technical Instructor
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            App Academy — New York
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Taught JavaScript fundamentals and software engineering concepts to
            aspiring developers preparing for selective coding bootcamps.
            Provided code reviews, debugging guidance, and mentorship focused
            on algorithmic thinking and clean coding practices.
          </p>

        </div>

        <div className="rounded-3xl border border-gray-200 p-8">

          <h2 className="text-xl font-semibold">
            Technical Writer
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Croud — Freelance
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            Authored technical documentation for NoSQL databases in collaboration
            with international editorial teams, focusing on clear explanations of
            complex technical concepts and developer-facing documentation.
          </p>

        </div>

      </section>


      {/* ENGINEERING PRINCIPLES */}

      <section className="mt-16 rounded-3xl border border-gray-200 p-8">

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Engineering principles
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Clear systems
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Systems should be easy to reason about. I value strong service
              boundaries and architecture that remains understandable as it
              evolves.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Reliability first
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Correctness and predictability matter. I prioritize designs that
              behave deterministically and handle failure modes gracefully.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Practical engineering
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Architecture should serve the product. I favor pragmatic systems
              that balance design quality with real operational constraints.
            </p>
          </div>

        </div>

      </section>


      {/* ABOUT THE SITE */}

      <section className="mt-16 max-w-4xl rounded-3xl border border-gray-200 p-8">

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          About this site
        </p>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          I built this portfolio as an interactive engineering platform rather
          than a static showcase. The demos are backed by real backend services
          and infrastructure so visitors can explore system behavior, API
          design, and architecture decisions directly.
        </p>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          The goal is simple: make my engineering approach visible in running
          systems, not just descriptions.
        </p>

      </section>


      <Contact/>
    </main>
  );
}