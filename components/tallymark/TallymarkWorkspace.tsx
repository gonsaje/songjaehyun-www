import { Fund, Investor, InvestorSummary, WorkspaceView, TallymarkFundSummary, ReconciliationRun, IssueFixAction, ReviewIssue, Transaction, IssueEvent, IssueStatusFilter } from "@/lib/tallymark/types";
import { LoadingState } from "@/lib/tallymark/ui-types";
import Metric from "./shared/Metric";
import MetadataRow from "./shared/MetadataRow";
import EventList from "./EventList";
import FilterSelect from "./shared/FilterSelect";
import DataTable from "./shared/DataTable";
import FundInvestorSummaryTable from "./FundInvestorSummaryTable";
import TransactionReviewTable from "./TransactionReviewTable";
import IssueFixPanel from "./IssueFixPanel";

import { statusClass, formatDate, formatReviewDate, formatMoney } from "@/lib/tallymark/utils";

export default function TallymarkWorkspace({
	activeView,
	selectedFund,
	selectedSummary,
	investors,
	fundInvestorSummaries,
	transactions,
	reconciliationRuns,
	reviewIssues,
	selectedIssue,
	selectedInvestorId,
	issueEvents,
	issueNote,
	actionSuccess,
	settlementDateInput,
	investorIdInput,
	referenceInput,
	transactionTypeInput,
	scheduledAt,
	loading,
	issueStatusFilter,
	issueSeverityFilter,
	issueTypeFilter,
	issueInvestorFilter,
	issueTransactionTypeFilter,
	onViewChange,
	onStartReconciliation,
	onSelectIssue,
	onSelectRun,
	onDismissIssue,
	onApplyIssueFix,
	onIssueNoteChange,
	onSettlementDateChange,
	onInvestorIdChange,
	onReferenceChange,
	onTransactionTypeChange,
	onScheduledAtChange,
	onScheduleRun,
	onCancelRun,
	onIssueStatusFilterChange,
	onIssueSeverityFilterChange,
	onIssueTypeFilterChange,
	onIssueInvestorFilterChange,
	onIssueTransactionTypeFilterChange,
}: {
	activeView: WorkspaceView;
	selectedFund: Fund | null;
	selectedSummary?: TallymarkFundSummary;
	investors: Investor[];
	fundInvestorSummaries: InvestorSummary[];
	transactions: Transaction[];
	reconciliationRuns: ReconciliationRun[];
	reviewIssues: ReviewIssue[];
	selectedIssue: ReviewIssue | null;
	selectedInvestorId: string | null;
	issueEvents: IssueEvent[];
	issueNote: string;
	actionSuccess: string | null;
	settlementDateInput: string;
	investorIdInput: string;
	referenceInput: string;
	transactionTypeInput: string;
	scheduledAt: string;
	loading: LoadingState;
	issueStatusFilter: IssueStatusFilter;
	issueSeverityFilter: string;
	issueTypeFilter: string;
	issueInvestorFilter: string;
	issueTransactionTypeFilter: string;
	onViewChange: (view: WorkspaceView) => void;
	onStartReconciliation: () => void;
	onSelectIssue: (reviewIssueId: string) => void;
	onSelectRun: (reconciliationRunId: string) => void;
	onDismissIssue: (note: string) => void;
	onApplyIssueFix: (action: IssueFixAction, note: string) => void;
	onIssueNoteChange: (value: string) => void;
	onSettlementDateChange: (value: string) => void;
	onInvestorIdChange: (value: string) => void;
	onReferenceChange: (value: string) => void;
	onTransactionTypeChange: (value: string) => void;
	onScheduledAtChange: (value: string) => void;
	onScheduleRun: (scheduledAt: string) => void;
	onCancelRun: (reconciliationRunId: string) => void;
	onIssueStatusFilterChange: (value: IssueStatusFilter) => void;
	onIssueSeverityFilterChange: (value: string) => void;
	onIssueTypeFilterChange: (value: string) => void;
	onIssueInvestorFilterChange: (value: string) => void;
	onIssueTransactionTypeFilterChange: (value: string) => void;
}) {
	const tabs: WorkspaceView[] = [
		"overview",
		"investors",
		"transactions",
		"issues",
		"runs",
	];
	const issueTypes = Array.from(new Set(reviewIssues.map(getIssueType))).sort();
	const transactionTypes = Array.from(
		new Set(transactions.map((transaction) => transaction.type).filter(Boolean)),
	).sort() as string[];
	const filteredIssues = reviewIssues.filter((issue) => {
		const investorFilterId =
			issueInvestorFilter !== "all" ? issueInvestorFilter : selectedInvestorId;
		const investorMatches =
			!investorFilterId || issue.investorId === investorFilterId;
		const statusMatches =
			issueStatusFilter === "all" || issue.status === issueStatusFilter;
		const severityMatches =
			issueSeverityFilter === "all" || issue.severity === issueSeverityFilter;
		const typeMatches =
			issueTypeFilter === "all" || getIssueType(issue) === issueTypeFilter;
		const transaction = issue.transactionId
			? transactions.find((item) => item.id === issue.transactionId)
			: null;
		const transactionTypeMatches =
			issueTransactionTypeFilter === "all" ||
			transaction?.type === issueTransactionTypeFilter;
		return (
			investorMatches &&
			statusMatches &&
			severityMatches &&
			typeMatches &&
			transactionTypeMatches
		);
	});
	const filteredTransactions = selectedInvestorId
		? transactions.filter(
				(transaction) => transaction.investorId === selectedInvestorId,
			)
		: transactions;
	const selectedIssueAction = selectedIssue
		? getIssuePrimaryAction(selectedIssue)
		: { action: null, label: "Review issue" };

	return (
		<section className="rounded-lg border border-slate-200 bg-white">
			<div className="border-b border-slate-200 p-5">
				<h2 className="text-2xl font-semibold">
					{selectedFund?.name ?? "Select a fund to begin"}
				</h2>
				<div className="mt-4 flex flex-wrap gap-2">
					{tabs.map((tab) => (
						<button
							key={tab}
							type="button"
							onClick={() => onViewChange(tab)}
							className={[
								"rounded-lg px-3 py-2 text-sm font-semibold capitalize transition",
								activeView === tab
									? "bg-slate-950 text-white"
									: "bg-slate-100 text-slate-700 hover:bg-slate-200",
							].join(" ")}
						>
							{tab.replace("-", " ")}
						</button>
					))}
				</div>
			</div>

			<div className="p-5">
				{activeView === "overview" && (
					<div className="space-y-5">
						<div className="grid gap-4 md:grid-cols-4">
							<Metric label="Strategy" value={selectedFund?.strategy ?? selectedSummary?.strategy ?? "-"} />
							<Metric label="Latest Run" value={selectedSummary?.latestReconciliationRunStatus ?? selectedFund?.latestRunStatus ?? "-"} />
							<Metric label="Open Issues" value={selectedSummary?.openReviewIssueCount ?? reviewIssues.filter((issue) => issue.status === "open").length} />
							<Metric label="Critical Issues" value={selectedSummary?.criticalReviewIssueCount ?? reviewIssues.filter((issue) => issue.severity === "critical").length} />
						</div>
						<div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
							<div>
								<p className="text-sm font-semibold text-slate-900">
									Most common issue types
								</p>
								<div className="mt-2 flex flex-wrap gap-2">
									{getIssueTypeCounts(reviewIssues).slice(0, 4).map((item) => (
										<span
											key={item.type}
											className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
										>
											{item.type}: {item.count}
										</span>
									))}
									{getIssueTypeCounts(reviewIssues).length === 0 && (
										<span className="text-sm text-slate-500">No open issue types</span>
									)}
								</div>
							</div>
							<button
								type="button"
								disabled={!selectedFund || loading.runAction}
								onClick={onStartReconciliation}
								className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-300"
							>
								{loading.runAction ? "Running..." : "Run reconciliation"}
							</button>
						</div>
						<div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
							<div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
								<h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
									Fund Metadata
								</h3>
								<dl className="mt-4 space-y-3 text-sm">
									<MetadataRow label="Currency" value={selectedFund?.currency ?? selectedSummary?.currency ?? "-"} />
									<MetadataRow label="Region" value={String((selectedFund?.metadata ?? selectedSummary?.metadata)?.region ?? "-")} />
									<MetadataRow label="Administrator" value={String((selectedFund?.metadata ?? selectedSummary?.metadata)?.administrator ?? "-")} />
									<MetadataRow label="Created" value={formatDate(selectedFund?.createdAt ?? selectedSummary?.createdAt)} />
								</dl>
							</div>
							<div>
								<h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
									Investors
								</h3>
								<div className="mt-3">
									<DataTable
										empty="No investors returned for this fund."
										headers={["Investor", "Commitment"]}
										rows={investors.map((investor) => [
											investor.displayName ?? investor.name,
											formatMoney(investor.commitmentAmount),
										])}
									/>
								</div>
							</div>
						</div>
					</div>
				)}

				{activeView === "investors" && (
					<FundInvestorSummaryTable investors={fundInvestorSummaries} />
				)}

				{activeView === "transactions" && (
					<TransactionReviewTable transactions={filteredTransactions} />
				)}

				{activeView === "runs" && (
					<div className="space-y-4">
						<div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-end">
							<label className="flex-1 text-sm font-semibold text-slate-700">
								Schedule timestamp
								<input
									type="datetime-local"
									value={scheduledAt}
									onChange={(event) => onScheduledAtChange(event.target.value)}
									className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
								/>
							</label>
							<button
								type="button"
								onClick={() => onScheduleRun(scheduledAt)}
								className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-100"
							>
								Schedule Run
							</button>
						</div>
						{reconciliationRuns.length === 0 && (
							<p className="text-sm text-slate-600">
								No reconciliation runs returned for this fund.
							</p>
						)}
						{reconciliationRuns.map((run) => (
							<div
								key={run.id}
								className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
							>
								<button
									type="button"
									onClick={() => onSelectRun(run.id)}
									className="text-left"
								>
									<p className="font-semibold">Run {run.id}</p>
									<p className="mt-1 text-sm text-slate-600">
										{formatDate(run.startedAt ?? run.scheduledAt)}
									</p>
								</button>
								<div className="flex flex-wrap items-center gap-2">
									<span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(run.status)}`}>
										{run.status}
									</span>
									<button
										type="button"
										disabled={!["queued", "scheduled"].includes(run.status) || loading.runAction}
										onClick={() => onCancelRun(run.id)}
										className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:text-slate-400"
									>
										Cancel Run
									</button>
								</div>
							</div>
						)).reverse()}
					</div>
				)}

				{activeView === "issues" && (
					<div className="space-y-4">
						<div className="flex flex-wrap gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
							<FilterSelect
								label="Status"
								value={issueStatusFilter}
								onChange={(value) =>
									onIssueStatusFilterChange(value as IssueStatusFilter)
								}
								options={["all", "open", "resolved", "dismissed"]}
							/>
							<FilterSelect
								label="Severity"
								value={issueSeverityFilter}
								onChange={onIssueSeverityFilterChange}
								options={["all", "critical", "high", "medium", "low"]}
							/>
							<FilterSelect
								label="Issue Type"
								value={issueTypeFilter}
								onChange={onIssueTypeFilterChange}
								options={["all", ...issueTypes]}
							/>
							<FilterSelect
								label="Investor"
								value={issueInvestorFilter}
								onChange={onIssueInvestorFilterChange}
								options={[
									"all",
									...fundInvestorSummaries.map((investor) => investor.id),
								]}
								labels={fundInvestorSummaries.reduce<Record<string, string>>(
									(accumulator, investor) => {
										accumulator[investor.id] = investor.name;
										return accumulator;
									},
									{},
								)}
							/>
							<FilterSelect
								label="Transaction Type"
								value={issueTransactionTypeFilter}
								onChange={onIssueTransactionTypeFilterChange}
								options={["all", ...transactionTypes]}
							/>
						</div>
						{filteredIssues.length === 0 && (
							<p className="text-sm text-slate-600">
								No review issues match the current filters.
							</p>
						)}
						{filteredIssues.length > 0 && (
							<div className="overflow-x-auto">
								<table className="w-full min-w-[980px] text-left text-sm">
									<thead className="border-b border-slate-200 text-xs uppercase tracking-[0.14em] text-slate-500">
										<tr>
											<th className="py-3 pr-4 font-semibold">Severity</th>
											<th className="py-3 pr-4 font-semibold">Issue Type</th>
											<th className="py-3 pr-4 font-semibold">Title</th>
											<th className="py-3 pr-4 font-semibold">Investor</th>
											<th className="py-3 pr-4 font-semibold">Transaction</th>
											<th className="py-3 pr-4 font-semibold">Status</th>
											<th className="py-3 pr-4 font-semibold">Created</th>
											<th className="py-3 pr-4 font-semibold">Next Action</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-100">
										{filteredIssues.map((issue) => (
											<tr
												key={issue.id}
												onClick={() => onSelectIssue(issue.id)}
												className="cursor-pointer hover:bg-slate-50"
											>
												<td className="py-3 pr-4">
													<span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(issue.severity)}`}>
														{issue.severity ?? "medium"}
													</span>
												</td>
												<td className="py-3 pr-4">{getIssueType(issue)}</td>
												<td className="py-3 pr-4 font-semibold">{issue.title}</td>
												<td className="py-3 pr-4">{displayValue(issue.investorName ?? issue.investorId, "No linked investor")}</td>
												<td className="py-3 pr-4">{displayValue(issue.transactionReference ?? issue.transactionId, "No linked transaction")}</td>
												<td className="py-3 pr-4">
													<span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(issue.status)}`}>
														{issue.status}
													</span>
												</td>
												<td className="py-3 pr-4">{formatReviewDate(issue.createdAt, "Not recorded")}</td>
												<td className="py-3 pr-4">{getIssuePrimaryAction(issue).label}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				)}

				{activeView === "issue-detail" && (
					<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
						<div>
							<h3 className="text-xl font-semibold">
								{selectedIssue?.title ?? "Loading issue..."}
							</h3>
							<div className="mt-3 flex flex-wrap gap-2">
								<span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(selectedIssue?.severity)}`}>
									{selectedIssue?.severity ?? "medium"}
								</span>
								<span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(selectedIssue?.status)}`}>
									{selectedIssue?.status ?? "-"}
								</span>
								<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
									{selectedIssue ? getIssueType(selectedIssue) : "-"}
								</span>
							</div>
							<p className="mt-3 text-sm leading-6 text-slate-600">
								{selectedIssue?.description ??
									"Select an issue to inspect its detail and events."}
							</p>
							<div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									Deterministic Reason
								</p>
								<p className="mt-2 text-sm leading-6 text-slate-700">
									{selectedIssue
										? getDeterministicReason(selectedIssue)
										: "No issue selected."}
								</p>
							</div>
							<div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
									AI Review Context
								</p>
								<p className="mt-2 text-sm leading-6 text-slate-700">
									{selectedIssue?.aiSummary ??
										"No AI summary was returned for this issue."}
								</p>
							</div>
							<dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
								<MetadataRow label="Linked Investor" value={displayValue(selectedIssue?.investorName ?? selectedIssue?.investorId, "No linked investor")} />
								<MetadataRow label="Linked Transaction" value={displayValue(selectedIssue?.transactionReference ?? selectedIssue?.transactionId, "No linked transaction")} />
								<MetadataRow label="Created" value={formatReviewDate(selectedIssue?.createdAt, "Not recorded")} />
								<MetadataRow label="Updated" value={formatReviewDate(selectedIssue?.updatedAt, "Not recorded")} />
							</dl>
							{selectedIssue?.metadata && (
								<pre className="mt-5 overflow-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-xs text-slate-100">
									{JSON.stringify(selectedIssue.metadata, null, 2)}
								</pre>
							)}
							{actionSuccess && (
								<div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
									{actionSuccess}
								</div>
							)}
							<IssueFixPanel
								issue={selectedIssue}
								investors={investors}
								action={selectedIssueAction.action}
								actionLabel={selectedIssueAction.label}
								note={issueNote}
								settlementDate={settlementDateInput}
								investorId={investorIdInput}
								reference={referenceInput}
								transactionType={transactionTypeInput}
								loading={loading.issueAction}
								onNoteChange={onIssueNoteChange}
								onSettlementDateChange={onSettlementDateChange}
								onInvestorIdChange={onInvestorIdChange}
								onReferenceChange={onReferenceChange}
								onTransactionTypeChange={onTransactionTypeChange}
								onApply={(action) => onApplyIssueFix(action, issueNote)}
								onDismiss={() => onDismissIssue(issueNote)}
							/>
						</div>
						<EventList events={issueEvents} />
					</div>
				)}
			</div>
		</section>
	);
}



function getIssueType(issue: ReviewIssue) {
	return issue.issueType ?? String(issue.metadata?.issueType ?? "exception");
}

function getIssuePrimaryAction(issue: ReviewIssue): {
    action: IssueFixAction | null;
    label: string;
} {
    switch (getIssueType(issue)) {
        case "missing_settlement_date":
            return { action: "add-settlement-date", label: "Add settlement date" };
        case "missing_investor":
        case "distribution_without_investor":
            return { action: "assign-investor", label: "Assign investor" };
        case "duplicate_transaction_reference":
            return { action: "update-reference", label: "Correct reference" };
        case "unknown_transaction_type":
            return { action: "classify-transaction", label: "Classify transaction" };
        default:
            return { action: null, label: "Review issue" };
    }
}
function getIssueTypeCounts(issues: ReviewIssue[]) {
    const counts = issues
        .filter((issue) => issue.status === "open")
        .reduce<Record<string, number>>((accumulator, issue) => {
            const type = getIssueType(issue);
            accumulator[type] = (accumulator[type] ?? 0) + 1;
            return accumulator;
        }, {});

    return Object.entries(counts)
        .map(([type, count]) => ({ type, count }))
        .sort((first, second) => second.count - first.count);
}

function getDeterministicReason(issue: ReviewIssue) {
    switch (getIssueType(issue)) {
        case "missing_settlement_date":
            return "The transaction is missing a settlement date required for operations review.";
        case "missing_investor":
        case "distribution_without_investor":
            return "The transaction cannot be reconciled because no investor is linked.";
        case "duplicate_transaction_reference":
            return "The transaction reference matches another transaction and must be unique.";
        case "unknown_transaction_type":
            return "The transaction type is not one of the supported reconciliation categories.";
        default:
            return issue.description ?? "A deterministic reconciliation check flagged this item for review.";
    }
}

function displayValue(value: unknown, fallback: string) {
	if (value === null || value === undefined || value === "") return fallback;
	return String(value);
}
