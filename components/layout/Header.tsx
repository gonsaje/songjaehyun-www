"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const javaDemos = [
	{ name: "Expiring KV Store", href: "/demos/java/expiring-kv" },
];

const nodeDemos = [
	{ name: "Tallymark", href: "/demos/node/tallymark" },
	{ name: "Product Catalog API", href: "/demos/node/product-catalog" },
];

const aiDemos = [
	{ name: "ghostcat", href: "/ghostcat" },
];

export default function Header() {
	const [demosOpen, setDemosOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [hoveringBrand, setHoveringBrand] = useState(false);

	useEffect(() => {
		const timer = window.setTimeout(() => {
			setCollapsed(true);
		}, 5000);

		return () => window.clearTimeout(timer);
	}, []);

	const showWordmark = !collapsed || hoveringBrand || mobileMenuOpen;

	return (
		<header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur shadow-[0_2px_6px_rgba(0,0,0,0.04),0_10px_24px_rgba(59,130,246,0.06)]">
			<div className="relative mx-auto max-w-6xl px-6">
				<div
					className={[
						"pointer-events-none absolute inset-x-6 top-[36px] h-px bg-gradient-to-r from-black/0 via-black/10 to-black/0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
						mobileMenuOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-50",
					].join(" ")}
				/>

				<div className="relative flex items-center justify-between py-4">
					<Link
						href="/"
						className="group"
						onMouseEnter={() => setHoveringBrand(true)}
						onMouseLeave={() => setHoveringBrand(false)}
						aria-label="Go to homepage"
					>
						<div className="relative flex h-10 items-center overflow-hidden">
							<div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
								<Image
									src="/logos/musicnote.svg"
									alt="Song Jaehyun logo"
									width={28}
									height={28}
									className="h-7 w-7 object-contain"
									priority
								/>
							</div>

							<span
								className={[
									"ml-2 inline-block whitespace-nowrap text-lg font-semibold tracking-tight text-black",
									"transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
									showWordmark
										? "max-w-[220px] translate-x-0 opacity-100"
										: "max-w-0 -translate-x-3 opacity-0",
								].join(" ")}
							>
								songjaehyun
							</span>
						</div>
					</Link>

					<nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
						<Link href="/" className="transition hover:text-black">
							Home
						</Link>

						<Link href="/about" className="transition hover:text-black">
							About
						</Link>

						<Link href="/architecture" className="transition hover:text-black">
							Architecture
						</Link>

						<div
							className="relative"
							onMouseEnter={() => setDemosOpen(true)}
							onMouseLeave={() => setDemosOpen(false)}
						>
							<button type="button" className="transition hover:text-black">
								Demos
							</button>

							{demosOpen && (
								<div className="absolute right-0 top-full pt-2">
									<div className="w-[320px] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
										<div className="space-y-4">
											<div>
												<p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
													Java
												</p>
												<div className="flex flex-col gap-1">
													{javaDemos.map((demo) => (
														<Link
															key={demo.href}
															href={demo.href}
															className="rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
														>
															{demo.name}
														</Link>
													))}
												</div>
											</div>

											<div>
												<p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
													Node
												</p>
												<div className="flex flex-col gap-1">
													{nodeDemos.map((demo) => (
														<Link
															key={demo.href}
															href={demo.href}
															className="rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
														>
															{demo.name}
														</Link>
													))}
												</div>
											</div>

											<div>
												<p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
													AI/Python
												</p>
												<div className="flex flex-col gap-1">
													{aiDemos.map((demo) => (
														<Link
															key={demo.href}
															href={demo.href}
															className="rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
														>
															{demo.name}
														</Link>
													))}
												</div>
											</div>
										</div>

										<div className="mt-4 border-t border-gray-100 pt-3">
											<Link
												href="/demos"
												className="text-sm font-medium text-gray-900 hover:underline"
											>
												View all demos
											</Link>
										</div>
									</div>
								</div>
							)}
						</div>
					</nav>

					<button
						type="button"
						aria-label="Toggle menu"
						aria-expanded={mobileMenuOpen}
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						className="relative flex h-10 w-14 items-center justify-end md:hidden"
					>
						<span
							className={[
								"absolute h-[1.5px] rounded-full bg-black transition-all duration-300 ease-out",
								mobileMenuOpen
									? "w-10 translate-y-0"
									: "w-6 -translate-y-[6px]",
							].join(" ")}
						/>
						<span
							className={[
								"absolute h-[1.5px] rounded-full bg-black transition-all duration-300 ease-out",
								mobileMenuOpen ? "w-10 translate-y-0" : "w-10 translate-y-0",
							].join(" ")}
						/>
						<span
							className={[
								"absolute h-[1.5px] rounded-full bg-black transition-all duration-300 ease-out",
								mobileMenuOpen ? "w-10 translate-y-0" : "w-4 translate-y-[6px]",
							].join(" ")}
						/>
					</button>
				</div>

				<div
					className={[
						"fixed inset-x-0 top-[73px] bottom-0 z-40 md:hidden",
						"transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
						mobileMenuOpen
							? "pointer-events-auto opacity-100"
							: "pointer-events-none opacity-0",
					].join(" ")}
				>
					<div
						className={[
							"absolute inset-0 bg-white/70 backdrop-blur-sm transition-opacity duration-300",
							mobileMenuOpen ? "opacity-100" : "opacity-0",
						].join(" ")}
						onClick={() => setMobileMenuOpen(false)}
					/>

					<div
						className={[
							"absolute inset-x-0 top-0 mx-auto max-w-6xl px-6 pt-4 pb-8",
							"transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
							mobileMenuOpen
								? "translate-y-0 opacity-100"
								: "-translate-y-4 opacity-0",
						].join(" ")}
					>
						<div className="rounded-3xl border border-gray-200 bg-white/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
							<div className="flex flex-col gap-5 text-base font-medium text-gray-900">
								<Link href="/" onClick={() => setMobileMenuOpen(false)}>
									Home
								</Link>
								<Link href="/about" onClick={() => setMobileMenuOpen(false)}>
									About
								</Link>
								<Link
									href="/architecture"
									onClick={() => setMobileMenuOpen(false)}
								>
									Architecture
								</Link>
								<Link href="/demos" onClick={() => setMobileMenuOpen(false)}>
									Demos
								</Link>
								<Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
									Contact
								</Link>
							</div>

							<div className="mt-8 grid gap-6">
								<div>
									<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
										Java demos
									</p>
									<div className="flex flex-col gap-3">
										{javaDemos.map((demo) => (
											<Link
												key={demo.href}
												href={demo.href}
												onClick={() => setMobileMenuOpen(false)}
												className="text-sm text-gray-600 transition hover:text-black"
											>
												{demo.name}
											</Link>
										))}
									</div>
								</div>

								<div>
									<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
										Node demos
									</p>
									<div className="flex flex-col gap-3">
										{nodeDemos.map((demo) => (
											<Link
												key={demo.href}
												href={demo.href}
												onClick={() => setMobileMenuOpen(false)}
												className="text-sm text-gray-600 transition hover:text-black"
											>
												{demo.name}
											</Link>
										))}
									</div>
								</div>
								<div>
									<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
										AI/Python
									</p>
									<div className="flex flex-col gap-3">
										{aiDemos.map((demo) => (
											<Link
												key={demo.href}
												href={demo.href}
												onClick={() => setMobileMenuOpen(false)}
												className="text-sm text-gray-600 transition hover:text-black"
											>
												{demo.name}
											</Link>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
