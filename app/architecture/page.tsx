import ArchitectureDiagram from "../../components/architecture/ArchitectureDiagram";
export default function ArchitecturePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Architecture
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          One frontend. <br/>
          Two backend tracks.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          This platform is designed as a single React and TypeScript frontend
          that presents demos powered by two backend services. Java is used for
          systems-oriented demos that involve stateful execution and backend
          behavior. Node.js is used for product-style API demos focused on
          validation, contracts, and OpenAPI workflows.
        </p>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 p-8 md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Frontend
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            React + TypeScript
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            The frontend acts as the single entry point for the portfolio. It provides
            navigation, demo pages, interactive controls, technical writeups, and a
            unified experience across both backend tracks.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Java backend
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Systems demo service
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            The Java service powers demos focused on execution flow, in-memory state,
            algorithms, and backend engineering concepts like rate limiting and TTL
            storage.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Node backend
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Product API service
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            The Node.js service powers product-style demos focused on API contracts,
            validation, request/response schemas, and OpenAPI-first design patterns.
          </p>
        </div>

      </section>
      <section className="mt-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Visual overview
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Platform architecture at a glance
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          The frontend provides a unified experience while routing demo interactions
          to separate backend services based on the type of system being showcased.
        </p>

        <div className="mt-10">
          <ArchitectureDiagram />
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-gray-200 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Platform flow
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">1. User interface</p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              A visitor navigates the site, selects a demo, and interacts with
              controls from the frontend.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">2. Frontend request</p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              The React frontend sends requests to the correct backend service
              depending on the selected demo.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">3. Backend execution</p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              The backend processes the request, applies business or demo logic,
              and returns structured data to the frontend.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">4. Demo output</p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              The frontend renders the result as state views, API responses,
              timelines, or technical explanations.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Service boundaries
          </p>
          <p className="mt-4 leading-7 text-gray-600">
            Each backend is intentionally separated by responsibility. The frontend
            remains consistent, but the implementation details of each backend are
            allowed to reflect the strengths of that stack instead of forcing one
            language to solve every problem.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Deployment shape
          </p>
          <p className="mt-4 leading-7 text-gray-600">
            The frontend can be deployed independently from the APIs, while the
            Java and Node services are hosted separately behind their own domains
            or subdomains. This keeps the platform modular and makes each service
            easier to evolve on its own.
          </p>
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-gray-200 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Planned structure
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl bg-gray-950 p-6 text-sm text-gray-100">
          <pre className="whitespace-pre-wrap leading-7">
{`songjaehyun.com
│
├─ Frontend (React + TypeScript + Next.js)
│  ├─ Home
│  ├─ About
│  ├─ Architecture
│  └─ Demos
│     ├─ Java
│     │  ├─ Expiring KV Store
│     │  └─ Rate Limiter
│     └─ Node
│        ├─ Product Catalog API
│        └─ OpenAPI Playground
│
├─ api.songjaehyun.com
│  └─ Java backend for systems demos
│
└─ node-api.songjaehyun.com
   └─ Node.js backend for product-style API demos`}
          </pre>
        </div>
      </section>
      <section className="mt-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Infrastructure
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          AWS deployment architecture
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          The platform is deployed using AWS services that separate the frontend,
          backend APIs, and networking layers. This allows each component of the
          system to scale and evolve independently while maintaining a clean service
          boundary between frontend and backend workloads.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-gray-200 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Static frontend
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              S3 + CloudFront
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              The React frontend is deployed as a static site hosted in Amazon S3 and
              distributed globally through CloudFront. This provides low latency,
              CDN caching, and a clean separation between UI and backend services.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Java service
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              ECS + Fargate
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              The Java backend runs inside Docker containers deployed on Amazon ECS
              using Fargate. This allows the demo services to run without managing
              servers while supporting scalable backend execution.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Node API
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              App Runner
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              The Node.js backend is deployed as a separate service using AWS App
              Runner. This simplifies container deployment and automatically manages
              scaling, networking, and HTTPS for API endpoints.
            </p>
          </div>

        </div>

        <div className="mt-12 rounded-3xl border border-gray-200 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Networking layer
          </p>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Each backend service is exposed through its own subdomain. This allows
            the frontend to communicate with both services independently while
            keeping the architecture modular.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl bg-gray-950 p-6 text-sm text-gray-100">
            <pre className="whitespace-pre-wrap leading-7">
        {`          songjaehyun.com             → React frontend
          api.songjaehyun.com         → Java backend (ECS / Fargate)
          node-api.songjaehyun.com    → Node.js backend (App Runner)`}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}