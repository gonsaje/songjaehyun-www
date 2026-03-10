export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Song Jaehyun
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Backend systems, product APIs, and interactive engineering demos.
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-gray-600">
          A portfolio platform built with React and TypeScript on the frontend,
          showcasing Java systems demos and Node.js API demos through a unified UI.
        </p>
      </section>
    </main>
  );
}