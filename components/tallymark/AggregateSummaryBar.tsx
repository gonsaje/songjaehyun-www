import { TallymarkFundSummary } from "@/lib/tallymark/types";
import Metric from "./shared/Metric";
import { formatDate } from "@/lib/tallymark/utils";

export default function AggregateSummaryBar({
    stats,
    loading,
}: {
    stats: {
        totalFunds: number;
        openIssues: number;
        criticalIssues: number;
        latestCompletedRun?: TallymarkFundSummary;
    };
    loading?: boolean;
}) {
    return (
        <section className="mt-5 grid gap-3 md:grid-cols-4">
            <Metric label="Funds" value={loading ? "..." : stats.totalFunds} />
            <Metric label="Open Issues" value={loading ? "..." : stats.openIssues} />
            <Metric label="Critical Issues" value={loading ? "..." : stats.criticalIssues} />
            <Metric
                label="Latest Completed"
                value={
                    stats.latestCompletedRun
                        ? formatDate(stats.latestCompletedRun.latestReconciliationRunCreatedAt ?? undefined)
                        : "-"
                }
            />
        </section>
    );
}