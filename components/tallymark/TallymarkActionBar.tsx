import { Fund } from "@/lib/tallymark/types";
import { LoadingState } from "@/lib/tallymark/ui-types";

export default function TallymarkActionBar({
    selectedFund,
    loading,
    fundCount,
    selectedBatchFundCount,
    onRunAll,
}: {
    selectedFund: Fund | null;
    loading: LoadingState;
    fundCount: number;
    selectedBatchFundCount: number;
    onRunAll: () => void;
}) {
    const runLabel =
        selectedBatchFundCount === fundCount
            ? `Run All (${fundCount})`
            : `Run Selected (${selectedBatchFundCount})`;

    return (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
            <p className="text-sm text-slate-600">
                {loading.dashboard
                    ? "Loading fund summary and health checks..."
                    : selectedFund
                        ? "Reviewer workspace is focused on the selected fund."
                        : "Select the fund with the most open or critical issues."}
            </p>
            <button
                type="button"
                onClick={onRunAll}
                disabled={
                    loading.dashboard ||
                    loading.runAction ||
                    fundCount === 0 ||
                    selectedBatchFundCount === 0
                }
                className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
                {loading.runAction ? "Running..." : runLabel}
            </button>
        </div>
    );
}
