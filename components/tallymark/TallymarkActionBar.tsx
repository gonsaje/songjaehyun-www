import { Fund } from "@/lib/tallymark/types";
import { LoadingState } from "@/lib/tallymark/ui-types";

export default function TallymarkActionBar({
    selectedFund,
    loading,
}: {
    selectedFund: Fund | null;
    loading: LoadingState;
}) {
    return (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
            <p className="text-sm text-slate-600">
                {loading.dashboard
                    ? "Loading fund summary and health checks..."
                    : selectedFund
                        ? "Reviewer workspace is focused on the selected fund."
                        : "Select the fund with the most open or critical issues."}
            </p>
        </div>
    );
}
