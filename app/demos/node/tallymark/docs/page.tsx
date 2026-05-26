import Link from "next/link";

export default function TallymarkDocsPage() {
	const stack = [
		"TypeScript",
		"Node.js",
		"Fastify",
		"Postgres / Supabase",
		"Trigger.dev",
		"React",
		"Next.js",
		"TailwindCSS",
		"OpenAI API",
	];

	const checks = [
		"Missing investors",
		"Duplicate transaction references",
		"Capital call underpayments",
		"Capital call overpayments",
		"Missing settlement dates",
		"Distributions without investor attribution",
		"Amounts exceeding remaining commitment",
		"Unknown transaction types",
	];

	const qualities = [
		{
			title: "Deterministic first",
			description:
				"Financial correctness comes from explicit reconciliation checks, not AI guesses.",
		},
		{
			title: "Actionable",
			description:
				"Issues include concrete next steps such as assigning an investor, adding a settlement date, correcting a reference, or classifying a transaction.",
		},
		{
			title: "Auditable",
			description:
				"Status changes and corrective actions write issue events so operators can see what happened and why.",
		},
		{
			title: "Human-in-the-loop",
			description:
				"Tallymark surfaces and explains exceptions, but a human resolves or dismisses them.",
		},
		{
			title: "Focused",
			description:
				"The product solves a narrow fund operations workflow instead of trying to become a full accounting platform.",
		},
		{
			title: "Trust-preserving",
			description:
				"AI summarizes context, while deterministic checks and human review own final correctness.",
		},
	];

	const domainEntities = [
		"Funds",
		"Investors",
		"Transactions",
		"Reconciliation runs",
		"Review issues",
		"Issue events",
	];

	const flow = [
		{
			step: "01",
			title: "Find risk",
			description:
				"Summary endpoints show which funds and investors have open or critical reconciliation issues.",
		},
		{
			step: "02",
			title: "Understand the issue",
			description:
				"Each review issue links to the affected fund, investor, transaction, run, and summarized context.",
		},
		{
			step: "03",
			title: "Apply a fix",
			description:
				"Issue-specific actions update the underlying data instead of only changing issue status.",
		},
		{
			step: "04",
			title: "Verify resolution",
			description:
				"After a fix, the issue resolves, related data refreshes, and dashboards reflect the new state.",
		},
		{
			step: "05",
			title: "Preserve audit trail",
			description:
				"Every resolution, dismissal, or corrective action creates event history for review.",
		},
	];

	const endpoints = [
		{
			group: "Dashboard summaries",
			items: [
				"GET /api/tallymark/funds/summary",
				"GET /api/tallymark/investors/summary",
				"GET /api/tallymark/funds/:fundId/investors/summary",
			],
		},
		{
			group: "Reconciliation runs",
			items: [
				"POST /api/tallymark/funds/:fundId/reconciliation-runs",
				"GET /api/tallymark/reconciliation-runs/:reconciliationRunId",
				"GET /api/tallymark/funds/:fundId/reconciliation-runs",
			],
		},
		{
			group: "Review queues",
			items: [
				"GET /api/tallymark/funds/:fundId/review-issues",
				"GET /api/tallymark/reconciliation-runs/:runId/review-issues",
				"GET /api/tallymark/investors/:investorId/review-issues",
				"GET /api/tallymark/transactions/:transactionId/review-issues",
			],
		},
		{
			group: "Corrective actions",
			items: [
				"PATCH /api/tallymark/review-issues/:id/actions/add-settlement-date",
				"PATCH /api/tallymark/review-issues/:id/actions/assign-investor",
				"PATCH /api/tallymark/review-issues/:id/actions/update-reference",
				"PATCH /api/tallymark/review-issues/:id/actions/classify-transaction",
				"PATCH /api/tallymark/review-issues/:id/status",
			],
		},
		{
			group: "Audit trail",
			items: ["GET /api/tallymark/review-issues/:id/issue-events"],
		},
	];

	const actionMap = [
		{
			issue: "missing_settlement_date",
			action: "Add settlement date",
			endpoint: "PATCH /review-issues/:id/actions/add-settlement-date",
		},
		{
			issue: "missing_investor",
			action: "Assign investor",
			endpoint: "PATCH /review-issues/:id/actions/assign-investor",
		},
		{
			issue: "distribution_without_investor",
			action: "Assign investor",
			endpoint: "PATCH /review-issues/:id/actions/assign-investor",
		},
		{
			issue: "duplicate_transaction_reference",
			action: "Correct reference",
			endpoint: "PATCH /review-issues/:id/actions/update-reference",
		},
		{
			issue: "unknown_transaction_type",
			action: "Classify transaction",
			endpoint: "PATCH /review-issues/:id/actions/classify-transaction",
		},
	];

	return (
		<main className="min-h-screen bg-brand-cream text-slate-950">
			<section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
				<div className="relative rounded-3xl border border-brand-blue/15 bg-white/70 p-6 shadow-[0_24px_80px_rgba(44,78,115,0.10)] backdrop-blur sm:p-8">
					<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
						<div>
                            <div className="mb-6 flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
                                    Tallymark Documentation
                                </p>
                                <Link
                                    href="/demos/node/tallymark"
                                    className="absolute right-6 top-6 rounded-full border border-brand-blue/15 bg-white px-4 py-2 text-sm font-medium text-brand-blue shadow-sm transition hover:bg-brand-blue hover:text-white sm:right-8 sm:top-8"
                                >
                                    Open demo
                                </Link>
                            </div>
							<h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
								Exception-resolution workspace for private markets fund operations.
							</h1>
							<p className="mt-5 max-w-3xl text-base leading-7 text-slate-700">
								Tallymark helps fund operations teams find, fix, and audit reconciliation exceptions before they become reporting problems.
							</p>
						</div>

						<div className="rounded-2xl border border-brand-blue/15 bg-brand-blue/5 p-4 text-sm text-brand-blue lg:max-w-sm">
							<p className="font-medium text-brand-blue">Product stance</p>
							<p className="mt-2 leading-6">
								Not a general ledger. Not a fund admin platform. Not an AI copilot. Tallymark is a focused review console for reconciliation exceptions.
							</p>
						</div>
					</div>

					<div className="mt-8 flex flex-wrap gap-2">
						{stack.map((item) => (
							<span
								key={item}
								className="rounded-full border border-brand-blue/15 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700"
							>
								{item}
							</span>
						))}
					</div>
				</div>

				<div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
					<section className="rounded-3xl border border-brand-blue/15 bg-white/60 p-6 shadow-[0_18px_60px_rgba(44,78,115,0.07)]">
						<h2 className="text-xl font-semibold text-slate-950">Baseline problem</h2>
						<p className="mt-4 leading-7 text-slate-700">
							Fund operations teams review messy transaction data across funds, investors, bank files, and administrator records. Small exceptions like missing settlement dates, duplicate references, unmatched investors, or capital call variances are easy to miss, but they create reporting risk and manual follow-up work.
						</p>
						<div className="mt-5 rounded-2xl border border-brand-blue/15 bg-brand-cream/80 p-4">
							<p className="text-sm font-medium text-slate-800">Core product problem</p>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Fund ops teams need a reliable way to find, explain, fix, and audit reconciliation exceptions.
							</p>
						</div>
					</section>

					<section className="rounded-3xl border border-brand-blue/15 bg-white/60 p-6 shadow-[0_18px_60px_rgba(44,78,115,0.07)]">
						<h2 className="text-xl font-semibold text-slate-950">Supported checks</h2>
						<p className="mt-3 text-sm leading-6 text-slate-600">
							Tallymark uses deterministic reconciliation checks to inspect fund, investor, and transaction data for known operational issues.
						</p>
						<div className="mt-5 grid gap-3 sm:grid-cols-2">
							{checks.map((check) => (
								<div
									key={check}
									className="rounded-2xl border border-brand-blue/15 bg-white/70 px-4 py-3 text-sm text-slate-700"
								>
									{check}
								</div>
							))}
						</div>
					</section>
				</div>

				<section className="mt-8 rounded-3xl border border-brand-blue/15 bg-white/60 p-6 shadow-[0_18px_60px_rgba(44,78,115,0.07)]">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<h2 className="text-xl font-semibold text-slate-950">Operating workflow</h2>
							<p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
								The frontend should behave like an exception-resolution console, guiding the user from risk discovery to audited resolution.
							</p>
						</div>
						<code className="rounded-xl border border-brand-blue/15 bg-brand-blue/5 px-3 py-2 text-xs text-brand-blue">
							Find risk → understand issue → apply fix → verify resolution → preserve audit trail
						</code>
					</div>

					<div className="mt-6 grid gap-4 md:grid-cols-5">
						{flow.map((item) => (
							<div
								key={item.step}
								className="rounded-2xl border border-brand-blue/15 bg-white/70 p-4"
							>
								<p className="text-xs font-semibold text-brand-blue">{item.step}</p>
								<h3 className="mt-3 font-semibold text-slate-950">{item.title}</h3>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</section>

				<section className="mt-8 grid gap-6 lg:grid-cols-3">
					<div className="rounded-3xl border border-brand-blue/15 bg-white/60 p-6 shadow-[0_18px_60px_rgba(44,78,115,0.07)] lg:col-span-1">
						<h2 className="text-xl font-semibold text-slate-950">Domain model</h2>
						<p className="mt-3 text-sm leading-6 text-slate-600">
							The backend gives the frontend a real operational model instead of static demo data.
						</p>
						<div className="mt-5 space-y-2">
							{domainEntities.map((entity) => (
								<div
									key={entity}
									className="rounded-xl border border-brand-blue/15 bg-white/70 px-4 py-3 text-sm text-slate-700"
								>
									{entity}
								</div>
							))}
						</div>
					</div>

					<div className="rounded-3xl border border-brand-blue/15 bg-white/60 p-6 shadow-[0_18px_60px_rgba(44,78,115,0.07)] lg:col-span-2">
						<h2 className="text-xl font-semibold text-slate-950">System qualities</h2>
						<div className="mt-5 grid gap-4 sm:grid-cols-2">
							{qualities.map((quality) => (
								<div
									key={quality.title}
									className="rounded-2xl border border-brand-blue/15 bg-white/70 p-4"
								>
									<h3 className="font-semibold text-slate-950">{quality.title}</h3>
									<p className="mt-2 text-sm leading-6 text-slate-600">
										{quality.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="mt-8 rounded-3xl border border-brand-blue/15 bg-white/60 p-6 shadow-[0_18px_60px_rgba(44,78,115,0.07)]">
					<h2 className="text-xl font-semibold text-slate-950">API surface</h2>
					<p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
						The backend stores fund operations data, runs deterministic checks, turns exceptions into review issues, supports data-fixing workflows, and records audit history.
					</p>

					<div className="mt-6 grid gap-4 lg:grid-cols-2">
						{endpoints.map((section) => (
							<div
								key={section.group}
								className="rounded-2xl border border-brand-blue/15 bg-white/70 p-4"
							>
								<h3 className="font-semibold text-slate-950">{section.group}</h3>
								<div className="mt-3 space-y-2">
									{section.items.map((endpoint) => (
										<code
											key={endpoint}
											className="block overflow-x-auto rounded-xl border border-brand-blue/15 bg-brand-blue/5 px-3 py-2 text-xs text-brand-blue"
										>
											{endpoint}
										</code>
									))}
								</div>
							</div>
						))}
					</div>
				</section>

				<section className="mt-8 rounded-3xl border border-brand-blue/15 bg-white/60 p-6 shadow-[0_18px_60px_rgba(44,78,115,0.07)]">
					<h2 className="text-xl font-semibold text-slate-950">Issue action mapping</h2>
					<p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
						Every open issue should show a recommended action. When possible, actions update the underlying transaction data and resolve the issue.
					</p>

					<div className="mt-6 overflow-hidden rounded-2xl border border-brand-blue/15 bg-white/60">
						<table className="w-full min-w-[760px] border-collapse text-left text-sm">
							<thead className="bg-brand-blue/10 text-xs uppercase tracking-[0.16em] text-brand-blue">
								<tr>
									<th className="px-4 py-3 font-semibold">Issue type</th>
									<th className="px-4 py-3 font-semibold">Primary action</th>
									<th className="px-4 py-3 font-semibold">Endpoint</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-brand-blue/10 bg-white/50">
								{actionMap.map((item) => (
									<tr key={item.issue}>
										<td className="px-4 py-3 font-mono text-xs text-brand-blue">
											{item.issue}
										</td>
										<td className="px-4 py-3 text-slate-800">{item.action}</td>
										<td className="px-4 py-3 font-mono text-xs text-slate-600">
											{item.endpoint}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			</section>
		</main>
	);
}