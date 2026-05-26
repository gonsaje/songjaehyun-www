import { InvestorSummary } from "@/lib/tallymark/types";
import { formatReviewDate, formatUsd } from "@/lib/tallymark/utils";
export default function InvestorSummaryTable({
    investors,
    loading,
    error,
    onSelectInvestor,
}: {
    investors: InvestorSummary[];
    loading?: boolean;
    error: string | null;
    onSelectInvestor: (summary: InvestorSummary) => void | Promise<void>;
}) {
    return (
        <div className="p-4">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Investors
                </h2>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                    {loading ? "Loading..." : `${investors.length} investors`}
                </span>
            </div>
            <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[1180px] text-left text-sm">
                    <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.14em] text-slate-500">
                        <tr>
                            <th className="py-3 pr-4 font-semibold">Investor</th>
                            <th className="py-3 pr-4 font-semibold">Fund</th>
                            <th className="py-3 pr-4 font-semibold">Commitment</th>
                            <th className="py-3 pr-4 font-semibold">Transactions</th>
                            <th className="py-3 pr-4 font-semibold">Capital Calls</th>
                            <th className="py-3 pr-4 font-semibold">Distributions</th>
                            <th className="py-3 pr-4 font-semibold">Total Activity</th>
                            <th className="py-3 pr-4 font-semibold">Open Issues</th>
                            <th className="py-3 pr-4 font-semibold">Critical Issues</th>
                            <th className="py-3 pr-4 font-semibold">Latest Transaction</th>
                            <th className="py-3 pr-4 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {error && (
                            <tr>
                                <td className="py-4 text-rose-700" colSpan={11}>
                                    {error}
                                </td>
                            </tr>
                        )}
                        {!error && loading && investors.length === 0 && (
                            <tr>
                                <td className="py-4 text-slate-500" colSpan={11}>
                                    Loading investor summaries...
                                </td>
                            </tr>
                        )}
                        {!error && !loading && investors.length === 0 && (
                            <tr>
                                <td className="py-4 text-slate-500" colSpan={11}>
                                    No investors found.
                                </td>
                            </tr>
                        )}
                        {investors.map((investor) => (
                            <tr
                                key={investor.id}
                                onClick={() => onSelectInvestor(investor)}
                                className="cursor-pointer hover:bg-slate-50"
                            >
                                <td className="py-3 pr-4 font-semibold">{investor.name}</td>
                                <td className="py-3 pr-4">{investor.fundName}</td>
                                <td className="py-3 pr-4">{formatUsd(investor.commitmentAmount)}</td>
                                <td className="py-3 pr-4">{investor.transactionCount}</td>
                                <td className="py-3 pr-4">{investor.capitalCallCount}</td>
                                <td className="py-3 pr-4">{investor.distributionCount}</td>
                                <td className="py-3 pr-4">{formatUsd(investor.totalTransactionAmount)}</td>
                                <td className="py-3 pr-4">
                                    <span
                                        className={[
                                            "rounded-full border px-3 py-1 text-xs font-semibold",
                                            investor.openReviewIssueCount > 0
                                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                                : "border-emerald-200 bg-emerald-50 text-emerald-700",
                                        ].join(" ")}
                                    >
                                        {investor.openReviewIssueCount}
                                    </span>
                                </td>
                                <td className="py-3 pr-4">
                                    <span
                                        className={[
                                            "rounded-full border px-3 py-1 text-xs font-semibold",
                                            investor.criticalReviewIssueCount > 0
                                                ? "border-rose-200 bg-rose-50 text-rose-700"
                                                : "border-slate-200 bg-slate-50 text-slate-600",
                                        ].join(" ")}
                                    >
                                        {investor.criticalReviewIssueCount}
                                    </span>
                                </td>
                                <td className="py-3 pr-4">
                                    {formatReviewDate(investor.latestTransactionDate ?? undefined, "No activity")}
                                </td>
                                <td className="py-3 pr-4">
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onSelectInvestor(investor);
                                        }}
                                        className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                                    >
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
