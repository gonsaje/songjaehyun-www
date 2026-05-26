import { Fund, HealthSnapshot, TallymarkFundSummary } from "@/lib/tallymark/types";
import HealthPill from "./shared/HealthPill";
import { formatReviewDate, statusClass } from "@/lib/tallymark/utils";

export default function FundSelector({
    funds,
    fundSummaries,
    selectedFundId,
    loading,
    healthSnapshot,
    onSelectFund,
}: {
    funds: Fund[];
    fundSummaries: Record<string, TallymarkFundSummary>;
    selectedFundId: string | null;
    loading?: boolean;
    healthSnapshot: HealthSnapshot;
    onSelectFund: (fundId: string) => void | Promise<void>;
}) {
    return (
        <div className="p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Funds
                </h2>
                <div className="flex flex-wrap gap-2 text-xs">
                    <HealthPill label="API" status={healthSnapshot.api} />
                    <HealthPill label="DB" status={healthSnapshot.db} />
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold text-slate-500">
                        {loading ? "Hydrating..." : `${funds.length} funds`}
                    </span>
                </div>
            </div>
            {funds.length === 0 ? (
                <p className="mt-4 text-sm text-slate-600">
                    Funds will appear here after the dashboard hydrates.
                </p>
            ) : (
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[1120px] text-left text-sm">
                        <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.14em] text-slate-500">
                            <tr>
                                <th className="py-3 pl-4 pr-4 font-semibold">Fund</th>
                                <th className="py-3 pr-4 font-semibold">Strategy</th>
                                <th className="py-3 pr-4 font-semibold">Vintage</th>
                                <th className="py-3 pr-4 font-semibold">Investors</th>
                                <th className="py-3 pr-4 font-semibold">Transactions</th>
                                <th className="py-3 pr-4 font-semibold">Open Issues</th>
                                <th className="py-3 pr-4 font-semibold">Critical</th>
                                <th className="py-3 pr-4 font-semibold">Latest Run</th>
                                <th className="py-3 pr-4 font-semibold">Run Created</th>
                                <th className="py-3 pr-4 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {funds.map((fund) => {
                                const selected = selectedFundId === fund.id;
                                const summary = fundSummaries[fund.id];

                                return (
                                    <tr
                                        key={fund.id}
                                        onClick={() => onSelectFund(fund.id)}
                                        className={[
                                            "cursor-pointer transition",
                                            selected
                                                ? "bg-slate-950 text-white"
                                                : "hover:bg-slate-50",
                                        ].join(" ")}
                                    >
                                        <td className="py-3 pl-4 pr-4">
                                            <p className="font-semibold">{fund.name}</p>
                                            <p
                                                className={[
                                                    "mt-1 font-mono text-xs",
                                                    selected ? "text-slate-200" : "text-slate-500",
                                                ].join(" ")}
                                            >
                                                {fund.id}
                                            </p>
                                        </td>
                                        <td className="py-3 pr-4">{summary?.strategy ?? "-"}</td>
                                        <td className="py-3 pr-4">{summary?.vintageYear ?? "-"}</td>
                                        <td className="py-3 pr-4">
                                            {summary?.investorCount ?? "-"}
                                        </td>
                                        <td className="py-3 pr-4">
                                            {summary?.transactionCount ?? "-"}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span
                                                className={[
                                                    "rounded-full border px-3 py-1 text-xs font-semibold",
                                                    (summary?.openReviewIssueCount ?? 0) > 0
                                                        ? "border-amber-200 bg-amber-50 text-amber-700"
                                                        : selected
                                                            ? "border-white/20 bg-white/10 text-white"
                                                            : "border-emerald-200 bg-emerald-50 text-emerald-700",
                                                ].join(" ")}
                                            >
                                                {summary?.openReviewIssueCount ?? 0}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span
                                                className={[
                                                    "rounded-full border px-3 py-1 text-xs font-semibold",
                                                    (summary?.criticalReviewIssueCount ?? 0) > 0
                                                        ? "border-rose-200 bg-rose-50 text-rose-700"
                                                        : selected
                                                            ? "border-white/20 bg-white/10 text-white"
                                                            : "border-slate-200 bg-slate-50 text-slate-600",
                                                ].join(" ")}
                                            >
                                                {summary?.criticalReviewIssueCount ?? 0}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span
                                                className={[
                                                    "rounded-full border px-3 py-1 text-xs font-semibold",
                                                    selected
                                                        ? "border-white/20 bg-white/10 text-white"
                                                        : statusClass(
                                                                summary?.latestReconciliationRunStatus ??
                                                                    undefined,
                                                            ),
                                                ].join(" ")}
                                            >
                                                {summary?.latestReconciliationRunStatus ?? "none"}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">
                                            {formatReviewDate(
                                                summary?.latestReconciliationRunCreatedAt ?? undefined,
                                            )}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    onSelectFund(fund.id);
                                                }}
                                                className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
