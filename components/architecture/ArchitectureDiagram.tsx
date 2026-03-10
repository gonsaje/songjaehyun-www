export default function ArchitectureDiagram() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-8 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            User
          </p>
          <p className="mt-2 text-base font-semibold text-gray-900">
            Browser Visitor
          </p>
        </div>

        <div className="my-4 h-8 w-px bg-gray-300" />

        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            CDN / Edge
          </p>
          <p className="mt-2 text-base font-semibold text-gray-900">
            CloudFront
          </p>
        </div>

        <div className="my-4 h-8 w-px bg-gray-300" />

        <div className="rounded-2xl border border-gray-900 bg-gray-900 px-8 py-5 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
            Frontend
          </p>
          <p className="mt-2 text-lg font-semibold">
            React + TypeScript + Next.js
          </p>
          <p className="mt-2 text-sm text-gray-300">
            UI, routing, writeups, interactive controls
          </p>
        </div>

        <div className="mt-6 grid w-full max-w-4xl grid-cols-3 items-start gap-4">
          <div className="col-span-1 flex justify-center">
            <div className="h-10 w-px bg-gray-300" />
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="h-10 w-px bg-gray-300" />
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="h-10 w-px bg-gray-300" />
          </div>

          <div className="col-span-3 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Hosting
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                S3
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Static asset hosting for the frontend deployment.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Java API
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                ECS + Fargate
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Systems demos, stateful execution, algorithm behavior.
              </p>
              <p className="mt-3 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 inline-block">
                api.songjaehyun.com
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Node API
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                App Runner
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Product APIs, validation, OpenAPI, typed contracts.
              </p>
              <p className="mt-3 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 inline-block">
                node-api.songjaehyun.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}