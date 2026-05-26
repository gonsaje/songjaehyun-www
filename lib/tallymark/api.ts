import { 
	ApiActivity, 
	Fund, 
	Investor, 
	InvestorSummary, 
	TallymarkFundSummary,
	ReviewIssue, 
	ReviewIssueActionResult, 
	ReconciliationRun, 
	Transaction, 
	HealthStatus,
	IssueEvent
} from "@/lib/tallymark/types";

export const TALLYMARK_API_BASE_URL = "https://node-api.songjaehyun.com";

export function getTallymarkApiBaseUrl() {
	return typeof window !== "undefined" &&
		window.location.hostname.includes("localhost")
		? "http://localhost:3001"
		: TALLYMARK_API_BASE_URL;
}

type ApiActivityListener = (activity: ApiActivity) => void;

const apiActivityListeners = new Set<ApiActivityListener>();

export function subscribeToTallymarkApiActivity(listener: ApiActivityListener) {
	apiActivityListeners.add(listener);
	return () => {
		apiActivityListeners.delete(listener);
	};
}

function emitApiActivity(activity: ApiActivity) {
	apiActivityListeners.forEach((listener) => listener(activity));
}

async function apiFetch<T>(
	path: string,
	init: RequestInit = {},
): Promise<T> {
	const method = init.method ?? "GET";
	const startedAt = performance.now();
	let status: number | null = null;
	let ok = false;

	try {
		const response = await fetch(`${getTallymarkApiBaseUrl()}${path}`, {
			...init,
			headers: {
				...(init.body ? { "Content-Type": "application/json" } : {}),
				...init.headers,
			},
			cache: "no-store",
		});

		status = response.status;
		ok = response.ok;

		if (!response.ok) {
			const body = await response.json().catch(() => null);
			throw new Error(
				body?.error?.message ??
					body?.message ??
					`Request failed with status ${response.status}`,
			);
		}

		if (response.status === 204) {
			return undefined as T;
		}

		return (await response.json()) as T;
	} finally {
		emitApiActivity({
			id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
			method,
			path,
			status,
			ok,
			durationMs: Math.round(performance.now() - startedAt),
			timestamp: new Date().toISOString(),
		});
	}
}

export function listFunds() {
	return apiFetch<Fund[]>("/api/tallymark/funds");
}

export function listFundSummaries() {
	return apiFetch<TallymarkFundSummary[]>("/api/tallymark/funds/summary");
}

export function listInvestorSummaries() {
	return apiFetch<InvestorSummary[]>("/api/tallymark/investors/summary");
}

export function listInvestorSummariesByFund(fundId: string) {
	return apiFetch<InvestorSummary[]>(
		`/api/tallymark/funds/${fundId}/investors/summary`,
	);
}

export function getHealth() {
	return apiFetch<HealthStatus>("/health");
}

export function getDbHealth() {
	return apiFetch<HealthStatus>("/health/db");
}

export function getFund(fundId: string) {
	return apiFetch<Fund>(`/api/tallymark/funds/${fundId}`);
}

export function listInvestorsByFund(fundId: string) {
	return apiFetch<Investor[]>(`/api/tallymark/funds/${fundId}/investors`);
}

export function getInvestor(investorId: string) {
	return apiFetch<Investor>(`/api/tallymark/investors/${investorId}`);
}

export function listTransactionsByInvestor(investorId: string) {
	return apiFetch<Transaction[]>(
		`/api/tallymark/investors/${investorId}/transactions`,
	);
}

export function listReviewIssuesByInvestor(investorId: string) {
	return apiFetch<ReviewIssue[]>(
		`/api/tallymark/investors/${investorId}/review-issues`,
	);
}

export function listTransactionsByFund(fundId: string) {
	return apiFetch<Transaction[]>(`/api/tallymark/funds/${fundId}/transactions`);
}

export function getTransaction(transactionId: string) {
	return apiFetch<Transaction>(`/api/tallymark/transactions/${transactionId}`);
}

export function listReviewIssuesByTransaction(transactionId: string) {
	return apiFetch<ReviewIssue[]>(
		`/api/tallymark/transactions/${transactionId}/review-issues`,
	);
}

export function listReconciliationRunsByFund(fundId: string) {
	return apiFetch<ReconciliationRun[]>(
		`/api/tallymark/funds/${fundId}/reconciliation-runs`,
	);
}

export function getReconciliationRun(reconciliationRunId: string) {
	return apiFetch<ReconciliationRun>(
		`/api/tallymark/reconciliation-runs/${reconciliationRunId}`,
	);
}

export function startReconciliationRun(fundId: string) {
	return apiFetch<ReconciliationRun>(
		`/api/tallymark/funds/${fundId}/reconciliation-runs`,
		{ method: "POST" },
	);
}

export async function startBatchReconciliationRuns(fundIds: string[]) {
	const response = await apiFetch<{ runs: ReconciliationRun[] }>("/api/tallymark/reconciliation-runs/batch", {
		method: "POST",
		body: JSON.stringify({ fundIds }),
	});

	return response.runs;
}

export function scheduleReconciliationRun(
	fundId: string,
	scheduledAt: string,
) {
	return apiFetch<ReconciliationRun>(
		`/api/tallymark/funds/${fundId}/reconciliation-runs/schedule`,
		{
			method: "POST",
			body: JSON.stringify({ scheduledAt }),
		},
	);
}

export function cancelReconciliationRun(reconciliationRunId: string) {
	return apiFetch<ReconciliationRun>(
		`/api/tallymark/reconciliation-runs/${reconciliationRunId}/cancel`,
		{ method: "PATCH" },
	);
}

export function listReviewIssuesByRun(reconciliationRunId: string) {
	return apiFetch<ReviewIssue[]>(
		`/api/tallymark/reconciliation-runs/${reconciliationRunId}/review-issues`,
	);
}

export function listReviewIssuesByFund(fundId: string) {
	return apiFetch<ReviewIssue[]>(
		`/api/tallymark/funds/${fundId}/review-issues`,
	);
}

export function getReviewIssue(reviewIssueId: string) {
	return apiFetch<ReviewIssue>(`/api/tallymark/review-issues/${reviewIssueId}`);
}

export function updateReviewIssueStatus(
	reviewIssueId: string,
	input: { status: "resolved" | "dismissed"; note: string },
) {
	return apiFetch<ReviewIssue>(
		`/api/tallymark/review-issues/${reviewIssueId}/status`,
		{
			method: "PATCH",
			body: JSON.stringify(input),
		},
	);
}

export function addSettlementDateToReviewIssue(
	reviewIssueId: string,
	input: { settlementDate: string; note: string },
) {
	return apiFetch<ReviewIssueActionResult>(
		`/api/tallymark/review-issues/${reviewIssueId}/actions/add-settlement-date`,
		{
			method: "PATCH",
			body: JSON.stringify(input),
		},
	);
}

export function assignInvestorToReviewIssue(
	reviewIssueId: string,
	input: { investorId: string; note: string },
) {
	return apiFetch<ReviewIssueActionResult>(
		`/api/tallymark/review-issues/${reviewIssueId}/actions/assign-investor`,
		{
			method: "PATCH",
			body: JSON.stringify(input),
		},
	);
}

export function updateReferenceForReviewIssue(
	reviewIssueId: string,
	input: { reference: string; note: string },
) {
	return apiFetch<ReviewIssueActionResult>(
		`/api/tallymark/review-issues/${reviewIssueId}/actions/update-reference`,
		{
			method: "PATCH",
			body: JSON.stringify(input),
		},
	);
}

export function classifyTransactionForReviewIssue(
	reviewIssueId: string,
	input: { transactionType: string; note: string },
) {
	return apiFetch<ReviewIssueActionResult>(
		`/api/tallymark/review-issues/${reviewIssueId}/actions/classify-transaction`,
		{
			method: "PATCH",
			body: JSON.stringify(input),
		},
	);
}

export function listIssueEventsByIssue(reviewIssueId: string) {
	return apiFetch<IssueEvent[]>(
		`/api/tallymark/review-issues/${reviewIssueId}/issue-events`,
	);
}

export function getIssueEvent(issueEventId: string) {
	return apiFetch<IssueEvent>(`/api/tallymark/issue-events/${issueEventId}`);
}
