import { ReviewIssue, ReconciliationRun, IssueEvent } from "@/lib/tallymark/types";
import EventList from "./EventList";
import { statusClass } from "@/lib/tallymark/utils";

export default function TallymarkCompanionPanel({
	reviewIssues,
	reconciliationRuns,
	issueEvents,
	onSelectIssue,
	onSelectRun,
}: {
	reviewIssues: ReviewIssue[];
	reconciliationRuns: ReconciliationRun[];
	issueEvents: IssueEvent[];
	onSelectIssue: (reviewIssueId: string) => void;
	onSelectRun: (reconciliationRunId: string) => void;
}) {
	const openIssues = reviewIssues.filter((issue) => issue.status === "open");
	const activeRuns = reconciliationRuns.filter((run) =>
		["queued", "processing", "scheduled"].includes(run.status),
	);

	return (
		<aside className="space-y-4">
			<Panel title="Open Issues">
				<div className="grid grid-cols-3 gap-2 text-center">
					{["critical", "high", "medium"].map((severity) => (
						<div key={severity} className="rounded-lg bg-slate-50 p-3">
							<p className="text-xl font-semibold">
								{openIssues.filter((issue) => issue.severity === severity).length}
							</p>
							<p className="text-xs capitalize text-slate-500">{severity}</p>
						</div>
					))}
				</div>
				<div className="mt-3 space-y-2">
					{openIssues.slice(0, 5).map((issue) => (
						<button
							key={issue.id}
							type="button"
							onClick={() => onSelectIssue(issue.id)}
							className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-sm hover:bg-slate-50"
						>
							{issue.title}
						</button>
					))}
				</div>
			</Panel>

			<Panel title="Processing Runs">
				<div className="space-y-2">
					{activeRuns.length === 0 && (
						<p className="text-sm text-slate-500">No active runs loaded.</p>
					)}
					{activeRuns.map((run) => (
						<button
							key={run.id}
							type="button"
							onClick={() => onSelectRun(run.id)}
							className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-left text-sm hover:bg-slate-50"
						>
							<span>Run {run.id}</span>
							<span className={`rounded-full border px-2 py-1 text-xs ${statusClass(run.status)}`}>
								{run.status}
							</span>
						</button>
					))}
				</div>
			</Panel>

			<Panel title="Recent Events">
				<EventList events={issueEvents.slice(0, 5)} compact />
			</Panel>
		</aside>
	);
}

function Panel({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="rounded-lg border border-slate-200 bg-white p-4">
			<h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
				{title}
			</h2>
			<div className="mt-4">{children}</div>
		</section>
	);
}
