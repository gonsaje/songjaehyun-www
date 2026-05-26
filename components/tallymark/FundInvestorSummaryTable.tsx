import { InvestorSummary } from "@/lib/tallymark/types";
import { formatUsd, formatReviewDate } from "@/lib/tallymark/utils";

export default function FundInvestorSummaryTable({
	investors,
}: {
	investors: InvestorSummary[];
}) {
	if (investors.length === 0) {
		return <p className="text-sm text-slate-600">No investors found.</p>;
	}

	return (
		<div className="overflow-x-auto">
			<table className="w-full min-w-[980px] text-left text-sm">
				<thead className="border-b border-slate-200 text-xs uppercase tracking-[0.14em] text-slate-500">
					<tr>
						<th className="py-3 pr-4 font-semibold">Investor</th>
						<th className="py-3 pr-4 font-semibold">Commitment</th>
						<th className="py-3 pr-4 font-semibold">Transactions</th>
						<th className="py-3 pr-4 font-semibold">Total Activity</th>
						<th className="py-3 pr-4 font-semibold">Open Issues</th>
						<th className="py-3 pr-4 font-semibold">Critical Issues</th>
						<th className="py-3 pr-4 font-semibold">Latest Transaction</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
					{sortInvestorSummaries(investors).map((investor) => (
						<tr key={investor.id}>
							<td className="py-3 pr-4 font-semibold">{investor.name}</td>
							<td className="py-3 pr-4">{formatUsd(investor.commitmentAmount)}</td>
							<td className="py-3 pr-4">{investor.transactionCount}</td>
							<td className="py-3 pr-4">{formatUsd(investor.totalTransactionAmount)}</td>
							<td className="py-3 pr-4">
								<span className={`rounded-full border px-3 py-1 text-xs font-semibold ${investor.openReviewIssueCount > 0 ? "border-amber-200 bg-amber-50 text-amber-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
									{investor.openReviewIssueCount}
								</span>
							</td>
							<td className="py-3 pr-4">
								<span className={`rounded-full border px-3 py-1 text-xs font-semibold ${investor.criticalReviewIssueCount > 0 ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
									{investor.criticalReviewIssueCount}
								</span>
							</td>
							<td className="py-3 pr-4">
								{formatReviewDate(investor.latestTransactionDate ?? undefined, "No activity")}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function sortInvestorSummaries(summaries: InvestorSummary[]) {
	return [...summaries].sort((first, second) => {
		const attentionDelta =
			second.criticalReviewIssueCount - first.criticalReviewIssueCount ||
			second.openReviewIssueCount - first.openReviewIssueCount ||
			second.reviewIssueCount - first.reviewIssueCount;
		if (attentionDelta !== 0) return attentionDelta;
		return (second.latestTransactionDate ?? "").localeCompare(
			first.latestTransactionDate ?? "",
		);
	});
}
