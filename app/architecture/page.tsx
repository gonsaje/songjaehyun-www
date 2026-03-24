import Contact from "@/components/layout/Contact";

export default function ArchitecturePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Architecture
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          One platform. <br />
          Distinct backend responsibilities.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          songjaehyun.com is built as a single frontend experience backed by two
          separate API tracks. The frontend stays consistent, while each backend
          is designed around a different kind of engineering problem: Java for
          stateful systems and algorithm execution, and Node.js for product-style
          APIs, validation, and contract-driven workflows.
        </p>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 p-8 md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Frontend
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            React + TypeScript interface
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            The frontend is the unified surface of the platform. It handles
            navigation, demo views, controls, technical explanations, and data
            visualization while routing requests to the appropriate backend
            service behind the scenes.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Java backend
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Systems demo engine
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            The Java service runs real backend logic for interactive systems
            demos. It is built for stateful execution, per-session isolation,
            in-memory behavior, and educational transparency through structured
            method logging.
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
            The Node.js service supports demos centered on API design. It focuses
            on request validation, response contracts, filtering, pagination, and
            OpenAPI-style patterns that reflect practical product engineering.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Visual overview
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          How the platform is organized
        </h2>

  <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
    The platform is built as a unified frontend that communicates with two
    independent backend services. Each service focuses on a different category
    of engineering problems while remaining accessible through a single user
    interface.
  </p>

  <div className="mt-10 flex justify-center">
    <div className="max-w-4xl rounded-3xl border border-gray-200 bg-white p-6">
      <img
        src="/songjaehyunArchitecture.svg"
        alt="songjaehyun.com platform architecture diagram"
        className="w-full h-auto"
      />
    </div>
  </div>

  <p className="mt-4 text-center text-sm text-gray-500">
    The React frontend routes demo interactions to two backend services deployed
    independently on AWS.
  </p>

      </section>

      <section className="mt-16 rounded-3xl border border-gray-200 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Request lifecycle
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">1. Explore</p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              A visitor opens a demo, reads the context, and interacts with the
              UI through forms, controls, or preset scenarios.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">2. Route</p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              The frontend sends the request to the correct backend based on the
              type of demo being exercised.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">3. Execute</p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              The backend runs the demo logic, applies validation or state
              changes, and returns structured output for the UI.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">4. Explain</p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              The frontend renders the result as data, logs, state snapshots, or
              technical commentary so the system behavior is visible.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Separation of concerns
          </p>
          <p className="mt-4 leading-7 text-gray-600">
            Each service is scoped intentionally. The frontend provides one
            coherent product surface, while the backends stay specialized. That
            separation keeps the platform easier to reason about, extend, and
            deploy without blending unrelated responsibilities together.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Why two backend tracks
          </p>
          <p className="mt-4 leading-7 text-gray-600">
            Not every backend problem wants the same tools. Java is a better fit
            for demos centered on state, execution flow, and systems behavior.
            Node.js is a natural fit for product-facing APIs, schema validation,
            and fast iteration around contracts and endpoints.
          </p>
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-gray-200 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Project structure
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl bg-gray-950 p-6 text-sm text-gray-100">
          <pre className="whitespace-pre-wrap leading-7">
{`songjaehyun.com
│
├─ Frontend (Next.js + React + TypeScript)
│  ├─ Home
│  ├─ About
│  ├─ Architecture
│  └─ Demos
│     ├─ Java demos
│     │  ├─ Expiring Key Value Store
│     │  └─ Rate Limiter
│     └─ Node demos
│        ├─ Product Catalog API
│        └─ OpenAPI Playground
│
├─ api.songjaehyun.com
│  └─ Java backend for systems-oriented demos
│
└─ node-api.songjaehyun.com
   └─ Node backend for product-style API demos`}
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
    The platform is deployed using AWS infrastructure that separates the
    frontend from the backend services while keeping the system simple and
    modular. Each API runs in its own containerized service while the frontend
    is delivered globally through a CDN.
  </p>

  <div className="mt-12 grid gap-6 md:grid-cols-3">

    <div className="rounded-3xl border border-gray-200 p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
        Frontend delivery
      </p>

      <h3 className="mt-3 text-xl font-semibold">
        S3 + CloudFront
      </h3>

      <p className="mt-4 leading-7 text-gray-600">
        The React frontend is built as a static site and hosted in Amazon S3.
        CloudFront distributes the site globally through a CDN, providing low
        latency and clean separation between the user interface and backend
        services.
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
        The Java backend runs in Docker containers deployed on Amazon ECS using
        Fargate. This service powers the systems-oriented demos that require
        stateful execution and backend processing.
      </p>
    </div>

    <div className="rounded-3xl border border-gray-200 p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
        Node API
      </p>

      <h3 className="mt-3 text-xl font-semibold">
        ECS + Fargate
      </h3>

      <p className="mt-4 leading-7 text-gray-600">
        The Node.js API runs as a separate containerized service on ECS
        Fargate. It powers the product-style API demos focused on validation,
        request handling, and OpenAPI-driven workflows.
      </p>
    </div>

  </div>

  <div className="mt-12 rounded-3xl border border-gray-200 p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
      Networking
    </p>

    <p className="mt-4 text-lg leading-8 text-gray-600">
      Both backend services run behind an AWS Application Load Balancer and are
      exposed through separate subdomains. This keeps the services isolated
      while allowing the frontend to route requests to the appropriate API.
    </p>

    <div className="mt-6 overflow-x-auto rounded-2xl bg-gray-950 p-6 text-sm text-gray-100">
      <pre className="whitespace-pre-wrap leading-7">
{`songjaehyun.com          → React frontend (S3 + CloudFront)
api.songjaehyun.com      → Java backend (ECS / Fargate)
node-api.songjaehyun.com → Node API backend (ECS / Fargate)`}
      </pre>
    </div>
  </div>
</section>

      <section className="mt-16 rounded-3xl border border-gray-200 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Delivery pipeline
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          CI/CD with GitHub Actions + AWS OIDC
        </h2>

        <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-600">
          Frontend deployments are automated through GitHub Actions. On each push
          to the main branch, the workflow installs dependencies, builds the
          static site, and syncs assets to the S3 frontend bucket. Authentication
          is handled with OpenID Connect (OIDC), so no long-lived AWS access keys
          are stored in GitHub.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">
              1. Build in GitHub
            </p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              A push to main triggers the workflow, runs the project build, and
              prepares static output for deployment.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">
              2. Assume AWS role
            </p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              The workflow exchanges a GitHub OIDC token for a temporary IAM role
              session scoped to deployment permissions.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">
              3. Publish and refresh
            </p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Built files are synced to S3 and CloudFront can be invalidated so
              users receive updated content globally.
            </p>
          </div>
        </div>
      </section>
<Contact/>
    </main>
  );
}
