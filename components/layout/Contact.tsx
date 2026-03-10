import Link from "next/link";

export default function Contact() {
	return (
		<section id="contact" className="mx-auto max-w-6xl px-6 pt-14 pb-24">
			<div className="rounded-3xl border border-gray-200 p-8 sm:p-10">
				<p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
					Contact
				</p>
				<h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950">
					Let’s connect
				</h2>
				<p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
					Open to backend, full-stack, and systems-oriented engineering roles,
					as well as thoughtful technical collaboration.
				</p>

				<div className="mt-8 flex flex-wrap gap-4">
					<Link
						href="mailto:you@example.com"
						className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
					>
						Email Me
					</Link>
					<Link
						href="/about"
						className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
					>
						Learn More
					</Link>
				</div>
			</div>
		</section>
	);
}
