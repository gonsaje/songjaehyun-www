"use client";

import { FormEvent, useMemo, useState } from "react";
import { JAVA_API_BASE_URL } from "@/lib/config";

type SnapshotEntry = {
	key: string;
	value: string;
	expiryMillis: number;
	ttlRemainingMillis: number;
};

type Snapshot = {
	nowMillis: number;
	entries: SnapshotEntry[];
};
type GetResponse = {
	key: string;
	value: string;
	ttlRemainingMillis: number;
};

type ErrorResponse = {
	message?: string;
};

type Mode = "put" | "putIfAbsent" | "get" | "delete";

export default function Page() {
	const [mode, setMode] = useState<Mode>("put");

	const [keyInput, setKeyInput] = useState("");
	const [valueInput, setValueInput] = useState("");
	const [ttlInput, setTtlInput] = useState("60000");

	const [loading, setLoading] = useState(false);
	const [snapshotLoading, setSnapshotLoading] = useState(false);

	const [statusMessage, setStatusMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [lastGetResult, setLastGetResult] = useState<GetResponse | null>(null);
	const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

	const basePath = `${JAVA_API_BASE_URL}/api/demos/expiring-kv`;

	const currentRequestPreview = useMemo(() => {
		const trimmedKey = keyInput.trim() || "{key}";

		if (mode === "put") {
			return `PUT /api/demos/expiring-kv/entries/${trimmedKey}`;
		}

		if (mode === "putIfAbsent") {
			return `PUT /api/demos/expiring-kv/entries/${trimmedKey}/if-absent`;
		}

		if (mode === "get") {
			return `GET /api/demos/expiring-kv/entries/${trimmedKey}`;
		}

		return `DELETE /api/demos/expiring-kv/entries/${trimmedKey}`;
	}, [keyInput, mode]);

	async function parseError(response: Response) {
		const body = (await response
			.json()
			.catch(() => null)) as ErrorResponse | null;
		return body?.message || `Request failed with status ${response.status}`;
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const key = keyInput.trim();

		if (!key) {
			setErrorMessage("Key is required.");
			setStatusMessage(null);
			return;
		}

		setLoading(true);
		setErrorMessage(null);
		setStatusMessage(null);
		setLastGetResult(null);

		try {
			if (mode === "put" || mode === "putIfAbsent") {
				const ttlMillis = Number(ttlInput);

				if (!valueInput.trim()) {
					throw new Error("Value is required for write operations.");
				}

				if (!Number.isFinite(ttlMillis) || ttlMillis <= 0) {
					throw new Error("TTL must be a positive number of milliseconds.");
				}

				const endpoint =
					mode === "put"
						? `${basePath}/entries/${encodeURIComponent(key)}`
						: `${basePath}/entries/${encodeURIComponent(key)}/if-absent`;

				const response = await fetch(endpoint, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						value: valueInput,
						ttlMillis,
					}),
					cache: "no-store",
				});

				if (!response.ok) {
					throw new Error(await parseError(response));
				}

				setStatusMessage(
					mode === "put"
						? `Stored "${key}" with TTL ${ttlMillis}ms.`
						: `Stored "${key}" only if absent with TTL ${ttlMillis}ms.`,
				);
			}

			if (mode === "get") {
				const response = await fetch(
					`${basePath}/entries/${encodeURIComponent(key)}`,
					{
						method: "GET",
						cache: "no-store",
					},
				);

				if (response.status === 404) {
					setStatusMessage(`Key "${key}" was not found or has expired.`);
					setLastGetResult(null);
					return;
				}

				if (!response.ok) {
					throw new Error(await parseError(response));
				}

				const data = (await response.json()) as GetResponse;
				setLastGetResult(data);
				setStatusMessage(`Fetched value for "${key}".`);
			}

			if (mode === "delete") {
				const response = await fetch(
					`${basePath}/entries/${encodeURIComponent(key)}`,
					{
						method: "DELETE",
						cache: "no-store",
					},
				);

				if (!response.ok) {
					throw new Error(await parseError(response));
				}

				setStatusMessage(`Removed "${key}" if it existed.`);
			}
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "Something went wrong.",
			);
		} finally {
			setLoading(false);
		}
	}

	async function loadSnapshot() {
		setSnapshotLoading(true);
		setErrorMessage(null);

		try {
			const response = await fetch(`${basePath}/snapshot`, {
				method: "GET",
				cache: "no-store",
			});

			if (!response.ok) {
				throw new Error(await parseError(response));
			}

			const data = (await response.json()) as Snapshot;
			setSnapshot(data);
			setStatusMessage("Loaded snapshot.");
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "Failed to load snapshot.",
			);
		} finally {
			setSnapshotLoading(false);
		}
	}

	const snapshotEntries = useMemo(() => {
		return snapshot?.entries ?? [];
	}, [snapshot]);

	return (
		<main className="min-h-screen bg-white text-slate-900">
			<section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
					<div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
							Java Backend Demo
						</p>

						<h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
							Expiring Key-Value Store
						</h1>

						<p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
							Interactive UI for a TTL-based key-value service. This demo lets
							you create entries, conditionally write if absent, fetch current
							values with remaining TTL, delete keys, and inspect a live
							snapshot of the store.
						</p>

						<a
							href="#developer-notes"
							className="mt-6 inline-flex items-center text-sm font-medium text-slate-900 transition hover:text-slate-600"
						>
							View developer notes ↓
						</a>

						<div className="mt-8 grid gap-4 sm:grid-cols-3">
							<div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									Endpoints
								</p>
								<p className="mt-2 text-lg font-semibold text-slate-950">
									PUT · GET · DELETE
								</p>
							</div>

							<div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									Core Behavior
								</p>
								<p className="mt-2 text-lg font-semibold text-slate-950">
									TTL · Expiration · Snapshot
								</p>
							</div>

							<div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									Stack
								</p>
								<p className="mt-2 text-lg font-semibold text-slate-950">
									Spring Boot · Java
								</p>
							</div>
						</div>
					</div>

					<aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
								API Base URL
							</p>
							<code className="mt-3 block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800">
								{JAVA_API_BASE_URL}
							</code>
						</div>

						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
								Current Request
							</p>
							<code className="mt-3 block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800">
								{currentRequestPreview}
							</code>
						</div>

						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
								Notes
							</p>
							<div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700">
								<p>Write operations return 204 No Content.</p>
								<p>Reads return current value and remaining TTL.</p>
								<p>Expired entries behave like missing keys.</p>
							</div>
						</div>
					</aside>
				</div>

				<div className="mt-8 grid gap-8 xl:grid-cols-[42%_58%]">
					<section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
									Request Builder
								</p>
								<h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
									Run store operations
								</h2>
							</div>

							<button
								type="button"
								onClick={() => {
									setKeyInput("");
									setValueInput("");
									setTtlInput("60000");
									setMode("put");
									setErrorMessage(null);
									setStatusMessage(null);
									setLastGetResult(null);
								}}
								className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
							>
								Reset form
							</button>
						</div>

						<div className="mt-8 flex flex-wrap gap-2">
							{(["put", "putIfAbsent", "get", "delete"] as const).map(
								(item) => {
									const isActive = mode === item;
									return (
										<button
											key={item}
											type="button"
											onClick={() => {
												setMode(item);
												setErrorMessage(null);
												setStatusMessage(null);
												setLastGetResult(null);
											}}
											className={[
												"rounded-full border px-4 py-2 text-sm font-medium transition",
												isActive
													? "border-slate-900 bg-slate-900 text-white"
													: "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950",
											].join(" ")}
										>
											{item === "putIfAbsent" ? "putIfAbsent" : item}
										</button>
									);
								},
							)}
						</div>

						<form onSubmit={handleSubmit} className="mt-8 space-y-5">
							<label className="flex flex-col gap-2">
								<span className="text-sm font-medium text-slate-700">Key</span>
								<input
									value={keyInput}
									onChange={(event) => setKeyInput(event.target.value)}
									placeholder="session:user:42"
									className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
								/>
							</label>

							{(mode === "put" || mode === "putIfAbsent") && (
								<>
									<label className="flex flex-col gap-2">
										<span className="text-sm font-medium text-slate-700">
											Value
										</span>
										<textarea
											value={valueInput}
											onChange={(event) => setValueInput(event.target.value)}
											placeholder="cached-profile-json"
											rows={4}
											className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
										/>
									</label>

									<label className="flex flex-col gap-2">
										<span className="text-sm font-medium text-slate-700">
											TTL (milliseconds)
										</span>
										<input
											value={ttlInput}
											onChange={(event) => setTtlInput(event.target.value)}
											inputMode="numeric"
											placeholder="60000"
											className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
										/>
									</label>
								</>
							)}

							<button
								type="submit"
								disabled={loading}
								className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{loading
									? "Running..."
									: mode === "put"
										? "Put Entry"
										: mode === "putIfAbsent"
											? "Put If Absent"
											: mode === "get"
												? "Get Entry"
												: "Delete Entry"}
							</button>
						</form>

						{statusMessage && (
							<div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
								{statusMessage}
							</div>
						)}

						{errorMessage && (
							<div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
								{errorMessage}
							</div>
						)}

						{lastGetResult && (
							<div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									Latest Read Result
								</p>

								<div className="mt-4 grid gap-3 sm:grid-cols-3">
									<div className="rounded-2xl border border-slate-200 bg-white p-4">
										<p className="text-xs uppercase tracking-[0.12em] text-slate-500">
											Key
										</p>
										<p className="mt-2 break-all font-medium text-slate-900">
											{lastGetResult.key}
										</p>
									</div>

									<div className="rounded-2xl border border-slate-200 bg-white p-4">
										<p className="text-xs uppercase tracking-[0.12em] text-slate-500">
											Value
										</p>
										<p className="mt-2 break-all font-medium text-slate-900">
											{lastGetResult.value}
										</p>
									</div>

									<div className="rounded-2xl border border-slate-200 bg-white p-4">
										<p className="text-xs uppercase tracking-[0.12em] text-slate-500">
											TTL Remaining
										</p>
										<p className="mt-2 font-medium text-slate-900">
											{lastGetResult.ttlRemainingMillis} ms
										</p>
									</div>
								</div>
							</div>
						)}
					</section>

					<section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
									Store Snapshot
								</p>
								<h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
									Inspect current entries
								</h2>
							</div>

							<button
								type="button"
								onClick={loadSnapshot}
								disabled={snapshotLoading}
								className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{snapshotLoading ? "Loading..." : "Refresh snapshot"}
							</button>
						</div>

						{!snapshot && (
							<div className="mt-8 rounded-3xl border border-dashed border-slate-300 px-6 py-12 text-center text-slate-500">
								Load the snapshot to inspect active store entries.
							</div>
						)}

						{snapshot && snapshotEntries.length === 0 && (
							<div className="mt-8 rounded-3xl border border-dashed border-slate-300 px-6 py-12 text-center text-slate-500">
								No active entries found.
							</div>
						)}

						{snapshot && snapshotEntries.length > 0 && (
							<div className="mt-8 space-y-4">
								{snapshotEntries.map((entry) => (
									<article
										key={entry.key}
										className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
									>
										<div className="flex flex-wrap items-start justify-between gap-3">
											<div className="min-w-0 flex-1">
												<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
													Key
												</p>
												<h3 className="mt-2 break-all text-lg font-semibold text-slate-950">
													{entry.key}
												</h3>
											</div>

											<span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-700">
												live
											</span>
										</div>

										<div className="mt-5 grid gap-3 sm:grid-cols-3">
											<div className="rounded-2xl border border-slate-200 bg-white p-4">
												<p className="text-xs uppercase tracking-[0.12em] text-slate-500">
													Value
												</p>
												<p className="mt-2 break-all font-medium text-slate-900">
													{entry.value}
												</p>
											</div>

											<div className="rounded-2xl border border-slate-200 bg-white p-4">
												<p className="text-xs uppercase tracking-[0.12em] text-slate-500">
													Expires At
												</p>
												<p className="mt-2 font-medium text-slate-900">
													{new Date(entry.expiryMillis).toLocaleString()}
												</p>
											</div>

											<div className="rounded-2xl border border-slate-200 bg-white p-4">
												<p className="text-xs uppercase tracking-[0.12em] text-slate-500">
													Remaining TTL
												</p>
												<p className="mt-2 font-medium text-slate-900">
													{entry.ttlRemainingMillis} ms
												</p>
											</div>
										</div>
									</article>
								))}
							</div>
						)}
					</section>

					<section
						id="developer-notes"
						className="xl:col-span-2 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm"
					>
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
							Developer Notes
						</p>

						<h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
							Expiring Key-Value Store Demo
						</h2>

						<p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
							This page demonstrates a backend-driven TTL store where key state
							lives entirely on the server. The UI is intentionally thin: it
							builds requests, renders results, and treats the Java service as
							the source of truth for expiration, conditional writes, and live
							snapshots.
						</p>

						<div className="mt-6 flex flex-wrap gap-3">
							<a
								href="https://github.com/yourname/songjaehyun-ui"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
							>
								UI Repository
							</a>

							<a
								href="https://github.com/yourname/songjaehyun-api"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
							>
								Java Backend Repository
							</a>
						</div>

						<div className="mt-10 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
							<div>
								<h3 className="text-lg font-semibold text-slate-950">
									Endpoints
								</h3>
								<ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
									<li>
										<code>PUT /entries/{`{key}`}</code> stores or overwrites a
										value with TTL.
									</li>
									<li>
										<code>PUT /entries/{`{key}`}/if-absent</code> writes only
										when the key does not exist.
									</li>
									<li>
										<code>GET /entries/{`{key}`}</code> returns the value and
										remaining TTL.
									</li>
									<li>
										<code>DELETE /entries/{`{key}`}</code> removes a key.
									</li>
									<li>
										<code>GET /snapshot</code> returns a point-in-time view of
										the store.
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-slate-950">
									Core Behaviors
								</h3>
								<ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
									<li>Time-to-live is set per entry in milliseconds.</li>
									<li>Expired keys behave as absent keys during reads.</li>
									<li>
										Conditional insert semantics support race-aware write flows.
									</li>
									<li>
										Snapshot inspection helps visualize server-side store state.
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-slate-950">
									UI Design Notes
								</h3>
								<ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
									<li>
										Request controls are grouped by operation to make endpoint
										behavior explicit.
									</li>
									<li>
										The request preview mirrors the exact route currently being
										targeted.
									</li>
									<li>
										The UI separates direct key operations from global store
										inspection.
									</li>
								</ul>
							</div>
						</div>
					</section>
				</div>
			</section>
		</main>
	);
}
