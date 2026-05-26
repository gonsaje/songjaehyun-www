"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    TALLYMARK_API_BASE_URL,
    addSettlementDateToReviewIssue,
    assignInvestorToReviewIssue,
    cancelReconciliationRun,
    classifyTransactionForReviewIssue,
    getDbHealth,
    getFund,
    getHealth,
    getReconciliationRun,
    getReviewIssue,
    listFundSummaries,
    listInvestorSummaries,
    listInvestorSummariesByFund,
    listIssueEventsByIssue,
    listReconciliationRunsByFund,
    listReviewIssuesByFund,
    listReviewIssuesByRun,
    listTransactionsByFund,
    scheduleReconciliationRun,
    startReconciliationRun,
    subscribeToTallymarkApiActivity,
    updateReviewIssueStatus,
    updateReferenceForReviewIssue,
} from "@/lib/tallymark/api";
import {
    ApiActivity,
    Fund,
    Investor,
    InvestorSummary,
    IssueEvent,
    ReconciliationRun,
    ReviewIssue,
    TallymarkFundSummary,
    Transaction,
    WorkspaceView
} from "@/lib/tallymark/types";

import { LoadingState, HealthSnapshot, IssueStatusFilter, DashboardTab, IssueFixAction } from "@/lib/tallymark/types";

import ApiActivityDrawer from "@/components/tallymark/ApiActivityDrawer";
import AggregateSummaryBar from "@/components/tallymark/AggregateSummaryBar";
import FundSelector from "@/components/tallymark/FundSelector";
import InvestorSummaryTable from "@/components/tallymark/InvestorSummaryTable";
import TallymarkActionBar from "@/components/tallymark/TallymarkActionBar";
import TallymarkCompanionPanel from "@/components/tallymark/TallymarkCompanionPanel";
import OperationsDashboard from "@/components/tallymark/OperationsDashboard";
import TallymarkWorkspace from "@/components/tallymark/TallymarkWorkspace";

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

export default function TallymarkDemoClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pollingRef = useRef<number | null>(null);
    const initialFundIdRef = useRef(searchParams.get("fundId"));
    const didBootstrapRef = useRef(false);

    const [funds, setFunds] = useState<Fund[]>([]);
    const [fundSummaries, setFundSummaries] = useState<
        Record<string, TallymarkFundSummary>
    >({});
    const [investorSummaries, setInvestorSummaries] = useState<InvestorSummary[]>(
        [],
    );
    const [investorSummaryError, setInvestorSummaryError] = useState<string | null>(
        null,
    );
    const [dashboardTab, setDashboardTab] = useState<DashboardTab>("funds");
    const [healthSnapshot, setHealthSnapshot] = useState<HealthSnapshot>({
        api: null,
        db: null,
    });
    const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
    const [selectedFundId, setSelectedFundId] = useState<string | null>(
        searchParams.get("fundId"),
    );
    const [selectedInvestorId, setSelectedInvestorId] = useState<string | null>(
        null,
    );
    const [fundInvestorSummaries, setFundInvestorSummaries] = useState<
        InvestorSummary[]
    >([]);
    const [investors, setInvestors] = useState<Investor[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [reconciliationRuns, setReconciliationRuns] = useState<
        ReconciliationRun[]
    >([]);
    const [reviewIssues, setReviewIssues] = useState<ReviewIssue[]>([]);
    const [selectedRun, setSelectedRun] = useState<ReconciliationRun | null>(null);
    const [selectedRunId, setSelectedRunId] = useState<string | null>(
        searchParams.get("runId"),
    );
    const [selectedIssue, setSelectedIssue] = useState<ReviewIssue | null>(null);
    const [selectedIssueId, setSelectedIssueId] = useState<string | null>(
        searchParams.get("issueId"),
    );
    const [issueEvents, setIssueEvents] = useState<IssueEvent[]>([]);
    const [activeView, setActiveView] = useState<WorkspaceView>(
        (searchParams.get("view") as WorkspaceView | null) ?? "overview",
    );
    const [loading, setLoading] = useState<LoadingState>({});
    const [error, setError] = useState<string | null>(null);
    const [apiActivity, setApiActivity] = useState<ApiActivity[]>([]);
    const [apiDrawerOpen, setApiDrawerOpen] = useState(true);
    const [scheduledAt, setScheduledAt] = useState("");
    const [issueNote, setIssueNote] = useState("");
    const [issueStatusFilter, setIssueStatusFilter] =
        useState<IssueStatusFilter>("open");
    const [issueSeverityFilter, setIssueSeverityFilter] = useState("all");
    const [issueTypeFilter, setIssueTypeFilter] = useState("all");
    const [issueInvestorFilter, setIssueInvestorFilter] = useState("all");
    const [issueTransactionTypeFilter, setIssueTransactionTypeFilter] =
        useState("all");
    const [actionSuccess, setActionSuccess] = useState<string | null>(null);
    const [settlementDateInput, setSettlementDateInput] = useState("");
    const [investorIdInput, setInvestorIdInput] = useState("");
    const [referenceInput, setReferenceInput] = useState("");
    const [transactionTypeInput, setTransactionTypeInput] =
        useState("capital_call");

    useEffect(() => {
        return subscribeToTallymarkApiActivity((activity) => {
            setApiActivity((current) => [activity, ...current].slice(0, 20));
        });
    }, []);

    useEffect(() => {
        return () => {
            if (pollingRef.current) {
                window.clearInterval(pollingRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (didBootstrapRef.current) return;

        didBootstrapRef.current = true;
        let cancelled = false;
        hydrateDashboard({ cancelled: () => cancelled });

        return () => {
            cancelled = true;
        };
        // hydrateDashboard intentionally runs once on mount; subsequent changes are handled by explicit UI events.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function setLoadingKey(key: keyof LoadingState, value: boolean) {
        setLoading((current) => ({ ...current, [key]: value }));
    }

    async function hydrateDashboard(options?: { cancelled?: () => boolean }) {
        setLoading((current) => ({
            ...current,
            dashboard: true,
            funds: true,
        }));
        setError(null);

        try {
            const [healthResult, dbHealthResult, summariesResult, investorSummariesResult] =
                await Promise.allSettled([
                    getHealth(),
                    getDbHealth(),
                    listFundSummaries(),
                    listInvestorSummaries(),
                ]);
            if (options?.cancelled?.()) return;

            setHealthSnapshot({
                api: healthResult.status === "fulfilled" ? healthResult.value : null,
                db: dbHealthResult.status === "fulfilled" ? dbHealthResult.value : null,
            });

            if (summariesResult.status === "rejected") {
                throw summariesResult.reason;
            }

            const summaries = summariesResult.value;
            const nextInvestorSummaries =
                investorSummariesResult.status === "fulfilled"
                    ? investorSummariesResult.value
                    : [];
            setInvestorSummaryError(
                investorSummariesResult.status === "rejected"
                    ? "Investor summaries could not be loaded."
                    : null,
            );

            const nextFundSummaries = summaries.reduce<
                Record<string, TallymarkFundSummary>
            >(
                (accumulator, result) => {
                    accumulator[result.id] = result;
                    return accumulator;
                },
                {},
            );

            setFunds(summaries);
            setFundSummaries(nextFundSummaries);
            setInvestorSummaries(sortInvestorSummaries(nextInvestorSummaries));

            if (initialFundIdRef.current) {
                await handleSelectFund(initialFundIdRef.current);
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to hydrate Tallymark dashboard.",
            );
        } finally {
            if (!options?.cancelled?.()) {
                setLoading((current) => ({
                    ...current,
                    dashboard: false,
                    funds: false,
                }));
            }
        }
    }

    async function refreshFundSummaries() {
        const summaries = await listFundSummaries().catch(() => null);
        if (!summaries) return;

        setFunds(summaries);
        setFundSummaries(
            summaries.reduce<Record<string, TallymarkFundSummary>>(
                (accumulator, summary) => {
                    accumulator[summary.id] = summary;
                    return accumulator;
                },
                {},
            ),
        );
    }

    async function refreshInvestorSummaries() {
        const summaries = await listInvestorSummaries().catch(() => null);
        if (!summaries) {
            setInvestorSummaryError("Investor summaries could not be loaded.");
            return;
        }
        setInvestorSummaryError(null);
        setInvestorSummaries(sortInvestorSummaries(summaries));
    }

    function syncUrl(next: {
        fundId?: string | null;
        runId?: string | null;
        issueId?: string | null;
        view?: WorkspaceView;
    }) {
        const params = new URLSearchParams(searchParams.toString());
        const fundId = next.fundId === undefined ? selectedFundId : next.fundId;
        const runId = next.runId === undefined ? selectedRunId : next.runId;
        const issueId =
            next.issueId === undefined ? selectedIssueId : next.issueId;
        const view = next.view ?? activeView;

        if (fundId) params.set("fundId", fundId);
        else params.delete("fundId");
        if (runId) params.set("runId", runId);
        else params.delete("runId");
        if (issueId) params.set("issueId", issueId);
        else params.delete("issueId");
        params.set("view", view);

        router.replace(`/demos/node/tallymark?${params.toString()}`, {
            scroll: false,
        });
    }

    async function runAction<T>(
        loadingKey: keyof LoadingState,
        action: () => Promise<T>,
    ) {
        setLoadingKey(loadingKey, true);
        setError(null);

        try {
            return await action();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
            return null;
        } finally {
            setLoadingKey(loadingKey, false);
        }
    }

    async function handleSelectFund(fundId: string) {
        setSelectedInvestorId(null);
        setLoading((current) => ({
            ...current,
            fund: true,
            investors: true,
            transactions: true,
            runs: true,
            issues: true,
        }));
        setError(null);

        try {
            const [fund, fundInvestors, fundTransactions, runs, issues] = await Promise.all([
                getFund(fundId),
                listInvestorSummariesByFund(fundId),
                listTransactionsByFund(fundId),
                listReconciliationRunsByFund(fundId),
                listReviewIssuesByFund(fundId),
            ]);

            setSelectedFund(fund);
            setSelectedFundId(fundId);
            setFundInvestorSummaries(fundInvestors);
            setInvestors(
                fundInvestors.map((investor) => ({
                    id: investor.id,
                    fundId: investor.fundId,
                    name: investor.name,
                    commitmentAmount: Number(investor.commitmentAmount),
                })),
            );
            setTransactions(fundTransactions);
            setReconciliationRuns(runs);
            setReviewIssues(issues);
            setSelectedRun(null);
            setSelectedRunId(null);
            setSelectedIssue(null);
            setSelectedIssueId(null);
            setIssueEvents([]);
            setIssueNote("");
            setSettlementDateInput("");
            setInvestorIdInput("");
            setReferenceInput("");
            setTransactionTypeInput("capital_call");
            setIssueInvestorFilter("all");
            setIssueTransactionTypeFilter("all");
            setActionSuccess(null);
            setActiveView("overview");
            syncUrl({ fundId, runId: null, issueId: null, view: "overview" });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load fund.");
        } finally {
            setLoading((current) => ({
                ...current,
                fund: false,
                investors: false,
                transactions: false,
                runs: false,
                issues: false,
            }));
        }
    }

    async function handleSelectInvestorSummary(summary: InvestorSummary) {
        await handleSelectFund(summary.fundId);
        setSelectedInvestorId(summary.id);
        setIssueInvestorFilter(summary.id);
        setDashboardTab("funds");
        setActiveView("transactions");
        syncUrl({ fundId: summary.fundId, view: "transactions" });
    }

    async function handleViewChange(view: WorkspaceView) {
        if (view === "investors" && selectedFundId && investors.length === 0) {
            const data = await runAction("investors", () =>
                listInvestorSummariesByFund(selectedFundId),
            );
            if (data) {
                setFundInvestorSummaries(data);
                setInvestors(
                    data.map((investor) => ({
                        id: investor.id,
                        fundId: investor.fundId,
                        name: investor.name,
                        commitmentAmount: Number(investor.commitmentAmount),
                    })),
                );
            }
        }

        if (
            view === "transactions" &&
            selectedFundId &&
            transactions.length === 0
        ) {
            const data = await runAction("transactions", () =>
                listTransactionsByFund(selectedFundId),
            );
            if (data) setTransactions(data);
        }

        setActiveView(view);
        syncUrl({ view });
    }

    function beginPollingRun(reconciliationRunId: string) {
        if (pollingRef.current) {
            window.clearInterval(pollingRef.current);
        }

        pollingRef.current = window.setInterval(async () => {
            const run = await getReconciliationRun(reconciliationRunId).catch(() => null);
            if (!run) return;

            setSelectedRun(run);
            setReconciliationRuns((current) =>
                current.map((item) => (item.id === run.id ? run : item)),
            );

            if (!["queued", "processing"].includes(run.status)) {
                if (pollingRef.current) window.clearInterval(pollingRef.current);
                pollingRef.current = null;

                if (run.status === "completed" || run.status === "failed") {
                    const issues = await listReviewIssuesByRun(run.id).catch(() => []);
                    setReviewIssues(issues);
                    await refreshFundSummaries();
                    await refreshInvestorSummaries();
                    setActiveView("issues");
                    syncUrl({ runId: run.id, view: "issues" });
                }
            }
        }, 2500);
    }

    async function handleStartReconciliation() {
        if (!selectedFundId) {
            setError("Select a fund before starting reconciliation.");
            return;
        }

        const run = await runAction("runAction", () =>
            startReconciliationRun(selectedFundId),
        );
        if (!run) return;

        setReconciliationRuns((current) => [run, ...current]);
        await refreshFundSummaries();
        await refreshInvestorSummaries();
        setSelectedRun(run);
        setSelectedRunId(run.id);
        setActiveView("runs");
        syncUrl({ runId: run.id, view: "runs" });

        if (["queued", "processing"].includes(run.status)) {
            beginPollingRun(run.id);
        }
    }

    async function handleScheduleRun(nextScheduledAt: string) {
        if (!selectedFundId) {
            setError("Select a fund before scheduling a run.");
            return;
        }

        if (!nextScheduledAt) {
            setError("Choose a schedule timestamp before scheduling a run.");
            return;
        }

        const run = await runAction("runAction", () =>
            scheduleReconciliationRun(
                selectedFundId,
                new Date(nextScheduledAt).toISOString(),
            ),
        );
        if (!run) return;

        setReconciliationRuns((current) => [run, ...current]);
        await refreshFundSummaries();
        setSelectedRun(run);
        setSelectedRunId(run.id);
        setActiveView("runs");
        syncUrl({ runId: run.id, view: "runs" });
    }

    async function handleCancelRun(reconciliationRunId: string) {
        const cancelled = await runAction("runAction", () =>
            cancelReconciliationRun(reconciliationRunId),
        );
        if (!cancelled) return;

        const refreshed = await getReconciliationRun(reconciliationRunId).catch(
            () => cancelled,
        );
        setSelectedRun(refreshed);
        setSelectedRunId(refreshed.id);

        if (selectedFundId) {
            const runs = await listReconciliationRunsByFund(selectedFundId).catch(
                () => null,
            );
            if (runs) {
                setReconciliationRuns(runs);
            }
            await refreshFundSummaries();
            await refreshInvestorSummaries();
        }
    }

    async function handleSelectRun(reconciliationRunId: string) {
        const run = await runAction("runs", () =>
            getReconciliationRun(reconciliationRunId),
        );
        if (!run) return;

        setSelectedRun(run);
        setSelectedRunId(run.id);
        setActiveView("runs");
        syncUrl({ runId: run.id, view: "runs" });

        if (["queued", "processing"].includes(run.status)) beginPollingRun(run.id);
    }

    async function handleSelectIssue(reviewIssueId: string) {
        setLoadingKey("issue", true);
        setLoadingKey("events", true);
        setError(null);

        try {
            const [issue, events] = await Promise.all([
                getReviewIssue(reviewIssueId),
                listIssueEventsByIssue(reviewIssueId),
            ]);
            setSelectedIssue(issue);
            setSelectedIssueId(issue.id);
            setIssueEvents(events);
            setIssueNote("");
            setSettlementDateInput("");
            setInvestorIdInput(issue.investorId ?? "");
            setReferenceInput(issue.transactionReference ?? "");
            setTransactionTypeInput("capital_call");
            setActiveView("issue-detail");
            syncUrl({ issueId: issue.id, view: "issue-detail" });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load issue.");
        } finally {
            setLoadingKey("issue", false);
            setLoadingKey("events", false);
        }
    }

    async function handleUpdateIssueStatus(
        status: "resolved" | "dismissed",
        note: string,
    ) {
        if (!selectedIssueId) {
            setError("Select an issue before updating its status.");
            return;
        }

        if (!note.trim()) {
            setError("Add a note before resolving or dismissing the issue.");
            return;
        }
        setActionSuccess(null);

        const updated = await runAction("issueAction", () =>
            updateReviewIssueStatus(selectedIssueId, { status, note: note.trim() }),
        );
        if (!updated) return;

        const [issue, events, fundIssues] = await Promise.all([
            getReviewIssue(selectedIssueId).catch(() => updated),
            listIssueEventsByIssue(selectedIssueId).catch(() => []),
            selectedFundId
                ? listReviewIssuesByFund(selectedFundId).catch(() => null)
                : Promise.resolve(null),
        ]);

        setSelectedIssue(issue);
        setIssueEvents(events);
        if (fundIssues) {
            setReviewIssues(fundIssues);
            await refreshFundSummaries();
            await refreshInvestorSummaries();
        }
        setIssueNote("");
        setActionSuccess(
            status === "resolved"
                ? "Issue resolved. Audit trail updated."
                : "Issue dismissed as not a data issue. Audit trail updated.",
        );
    }

    async function refreshSelectedIssueAfterAction(reviewIssueId: string) {
        const [issue, events, fundIssues, fundTransactions] = await Promise.all([
            getReviewIssue(reviewIssueId).catch(() => null),
            listIssueEventsByIssue(reviewIssueId).catch(() => []),
            selectedFundId
                ? listReviewIssuesByFund(selectedFundId).catch(() => null)
                : Promise.resolve(null),
            selectedFundId
                ? listTransactionsByFund(selectedFundId).catch(() => null)
                : Promise.resolve(null),
        ]);

        if (issue) setSelectedIssue(issue);
        setIssueEvents(events);
        if (fundIssues) setReviewIssues(fundIssues);
        if (fundTransactions) setTransactions(fundTransactions);
        await refreshFundSummaries();
        await refreshInvestorSummaries();
    }

    async function handleApplyIssueFix(action: IssueFixAction, note: string) {
        if (!selectedIssueId || !selectedIssue) {
            setError("Select an issue before applying a fix.");
            return;
        }

        if (!note.trim()) {
            setError("Add an audit note before applying the fix.");
            return;
        }
        setActionSuccess(null);

        const trimmedNote = note.trim();
        const result = await runAction("issueAction", async () => {
            if (action === "add-settlement-date") {
                if (!settlementDateInput) {
                    throw new Error("Settlement date is required.");
                }
                return addSettlementDateToReviewIssue(selectedIssueId, {
                    settlementDate: new Date(settlementDateInput).toISOString(),
                    note: trimmedNote,
                });
            }

            if (action === "assign-investor") {
                if (!investorIdInput) {
                    throw new Error("Investor selection is required.");
                }
                return assignInvestorToReviewIssue(selectedIssueId, {
                    investorId: investorIdInput,
                    note: trimmedNote,
                });
            }

            if (action === "update-reference") {
                if (!referenceInput.trim()) {
                    throw new Error("Corrected reference is required.");
                }
                return updateReferenceForReviewIssue(selectedIssueId, {
                    reference: referenceInput.trim(),
                    note: trimmedNote,
                });
            }

            return classifyTransactionForReviewIssue(selectedIssueId, {
                transactionType: transactionTypeInput,
                note: trimmedNote,
            });
        });

        if (!result) return;

        if (result.transaction) {
            setTransactions((current) =>
                current.map((transaction) =>
                    transaction.id === result.transaction?.id
                        ? result.transaction
                        : transaction,
                ),
            );
        }

        if (result.issue) {
            setSelectedIssue(result.issue);
        }

        await refreshSelectedIssueAfterAction(selectedIssueId);
        setIssueNote("");
        setActionSuccess(`${getIssuePrimaryAction(selectedIssue).label}. Issue resolved.`);
    }

    const summaries = Object.values(fundSummaries);
    const aggregateStats = {
        totalFunds: funds.length,
        openIssues: summaries.reduce(
            (total, summary) => total + summary.openReviewIssueCount,
            0,
        ),
        criticalIssues: summaries.reduce(
            (total, summary) => total + summary.criticalReviewIssueCount,
            0,
        ),
        latestCompletedRun: summaries
            .filter(
                (summary) => summary.latestReconciliationRunStatus === "completed",
            )
            .sort((first, second) =>
                (second.latestReconciliationRunCreatedAt ?? "").localeCompare(
                    first.latestReconciliationRunCreatedAt ?? "",
                ),
            )[0],
    };

    return (
        <main className="min-h-screen bg-slate-100 text-slate-950">
            <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
                <div className="border-b border-slate-200 pb-4">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Node Backend Demo
                        </p>
                        <Link
                            href="/demos/node/tallymark/docs"
                            className="rounded-full border border-brand-blue/15 bg-white px-4 py-2 text-sm font-medium text-brand-blue shadow-sm transition hover:bg-brand-blue hover:text-white"
                        >
                            View docs
                        </Link>
                    </div>

                    <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight">
                                Tallymark Operations Cockpit
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">
                                Tallymark / Funds / {selectedFund?.name ?? "No fund selected"} /{" "}
                                {selectedRun ? `Run ${selectedRun.id}` : "Latest Run"}
                            </p>
                        </div>
                        <code className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700">
                            {TALLYMARK_API_BASE_URL}/api/tallymark
                        </code>
                    </div>
                </div>

                <TallymarkActionBar
                    selectedFund={selectedFund}
                    loading={loading}
                />

                <AggregateSummaryBar stats={aggregateStats} loading={loading.dashboard} />

                {error && (
                    <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </div>
                )}

                <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="space-y-5">
                        <OperationsDashboard
                            activeTab={dashboardTab}
                            onTabChange={setDashboardTab}
                            funds={
                                <FundSelector
                                    funds={funds}
                                    fundSummaries={fundSummaries}
                                    selectedFundId={selectedFundId}
                                    loading={loading.funds}
                                    healthSnapshot={healthSnapshot}
                                    onSelectFund={handleSelectFund}
                                />
                            }
                            investors={
                                <InvestorSummaryTable
                                    investors={investorSummaries}
                                    loading={loading.dashboard}
                                    error={investorSummaryError}
                                    onSelectInvestor={handleSelectInvestorSummary}
                                />
                            }
                        />

                        <TallymarkWorkspace
                            activeView={activeView}
                            selectedFund={selectedFund}
                            selectedSummary={
                                selectedFundId ? fundSummaries[selectedFundId] : undefined
                            }
                            investors={investors}
                            fundInvestorSummaries={fundInvestorSummaries}
                            transactions={transactions}
                            reconciliationRuns={reconciliationRuns}
                            reviewIssues={reviewIssues}
                            selectedIssue={selectedIssue}
                            selectedInvestorId={selectedInvestorId}
                            issueEvents={issueEvents}
                            issueNote={issueNote}
                            actionSuccess={actionSuccess}
                            settlementDateInput={settlementDateInput}
                            investorIdInput={investorIdInput}
                            referenceInput={referenceInput}
                            transactionTypeInput={transactionTypeInput}
                            scheduledAt={scheduledAt}
                            loading={loading}
                            issueStatusFilter={issueStatusFilter}
                            issueSeverityFilter={issueSeverityFilter}
                            issueTypeFilter={issueTypeFilter}
                            issueInvestorFilter={issueInvestorFilter}
                            issueTransactionTypeFilter={issueTransactionTypeFilter}
                            onViewChange={handleViewChange}
                            onStartReconciliation={handleStartReconciliation}
                            onSelectIssue={handleSelectIssue}
                            onSelectRun={handleSelectRun}
                            onDismissIssue={(note) =>
                                handleUpdateIssueStatus("dismissed", note)
                            }
                            onApplyIssueFix={handleApplyIssueFix}
                            onIssueNoteChange={setIssueNote}
                            onSettlementDateChange={setSettlementDateInput}
                            onInvestorIdChange={setInvestorIdInput}
                            onReferenceChange={setReferenceInput}
                            onTransactionTypeChange={setTransactionTypeInput}
                            onScheduledAtChange={setScheduledAt}
                            onScheduleRun={handleScheduleRun}
                            onCancelRun={handleCancelRun}
                            onIssueStatusFilterChange={setIssueStatusFilter}
                            onIssueSeverityFilterChange={setIssueSeverityFilter}
                            onIssueTypeFilterChange={setIssueTypeFilter}
                            onIssueInvestorFilterChange={setIssueInvestorFilter}
                            onIssueTransactionTypeFilterChange={
                                setIssueTransactionTypeFilter
                            }
                        />
                    </div>

                    <TallymarkCompanionPanel
                        reviewIssues={reviewIssues}
                        reconciliationRuns={reconciliationRuns}
                        issueEvents={issueEvents}
                        onSelectIssue={handleSelectIssue}
                        onSelectRun={handleSelectRun}
                    />
                </div>

                <ApiActivityDrawer
                    activity={apiActivity}
                    open={apiDrawerOpen}
                    onToggle={() => setApiDrawerOpen((current) => !current)}
                />
            </section>
        </main>
    );
}

