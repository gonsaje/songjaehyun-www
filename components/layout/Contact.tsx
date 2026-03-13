import Link from "next/link";

export default function Contact() {
  return (
    <section className="mx-auto mt-24 border-t border-gray-200 pt-16">
      <div className="max-w-4xl">

        <h2 className="text-3xl font-semibold tracking-tight">
          Connect
        </h2>

        <p className="mt-4 max-w-xl text-gray-600 leading-relaxed">
          If you'd like to see more of my work or connect professionally,
          you can find me through the following channels.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">

          <a
            href="https://github.com/gonsaje"
            target="_blank"
            className="group flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 hover:border-gray-300 transition"
          >
            <span className="font-medium">GitHub</span>

            <img
              src="/github.svg"
              alt=""
              className="w-4 h-4 opacity-70 transition-transform group-hover:translate-x-1"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/jaesong2/"
            target="_blank"
            className="group flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 hover:border-gray-300 transition"
          >
            <span className="font-medium">LinkedIn</span>

            <img
              src="/linkedin.svg"
              alt=""
              className="w-4 h-4 opacity-70 transition-transform group-hover:translate-x-1"
            />
          </a>

          <a
            href="mailto:song.jaehyun@gmail.com"
            className="group flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 hover:border-gray-300 transition"
          >
            <span className="font-medium">Email</span>

            <img
              src="/envelope.svg"
              alt=""
              className="w-4 h-4 opacity-70 transition-transform group-hover:translate-x-1"
            />
          </a>

          <a
            href="/JaeHyunSongResume.pdf"
            target="_blank"
            className="group flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 hover:border-gray-300 transition"
          >
            <span className="font-medium">Resume</span>

            <img
              src="/file-earmark-binary.svg"
              alt=""
              className="w-4 h-4 opacity-70 transition-transform group-hover:translate-x-1"
            />
          </a>

        </div>
      </div>
    </section>
  );
}