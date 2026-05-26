export const TALLYMARK_API_BASE_URL = "https://node-api.songjaehyun.com";

export function getTallymarkApiBaseUrl() {
	return typeof window !== "undefined" &&
		window.location.hostname.includes("localhost")
		? "http://localhost:3001"
		: TALLYMARK_API_BASE_URL;
}

export type WorkspaceView =
	| "overview"
	| "investors"
	| "transactions"
	| "runs"
	| "issues"
	| "issue-detail";

export type ApiActivity = {
	id: string;
	method: string;
	path: string;
	status: number | null;
	ok: boolean;
	durationMs: number;
	timestamp: string;
};

export type Fund = {
	id: string;
	name: string;
	strategy?: string;
	vintageYear?: number;
	currency?: string;
	metadata?: Record<string, unknown>;
	createdAt?: string;
	updatedAt?: string;
	status?: string;
	commitmentTotal?: number;
	investorCount?: number;
	transactionCount?: number;
	latestRunStatus?: ReconciliationRunStatus;
};

export type TallymarkFundSummary = Fund & {
	reconciliationRunCount: number;
	reviewIssueCount: number;
	openReviewIssueCount: number;
	criticalReviewIssueCount: number;
	activeRunCount?: number;
	latestReconciliationRunStatus: ReconciliationRunStatus | null;
	latestReconciliationRunCreatedAt: string | null;
};

export type InvestorSummary = {
	id: string;
	fundId: string;
	fundName: string;
	name: string;
	commitmentAmount: string;
	metadata: Record<string, unknown>;
	createdAt: string;
	updatedAt: string;
	transactionCount: number;
	capitalCallCount: number;
	distributionCount: number;
	totalTransactionAmount: string;
	reviewIssueCount: number;
	openReviewIssueCount: number;
	criticalReviewIssueCount: number;
	latestTransactionDate: string | null;
};

export type Investor = {
	id: string;
	fundId?: string;
	name: string;
	displayName?: string;
	commitmentAmount?: number;
	status?: string;
};

export type Transaction = {
	id: string;
	fundId?: string;
	investorId?: string;
	investorName?: string;
	investor?: { id?: string; name?: string };
	reference?: string;
	expectedAmount?: number;
	variance?: number;
	transactionDate?: string;
	settlementDate?: string | null;
	type?: string;
	amount?: number;
	effectiveDate?: string;
	status?: string;
};

export type ReconciliationRunStatus =
	| "queued"
	| "processing"
	| "completed"
	| "failed"
	| "cancelled"
	| "scheduled";

export type ReconciliationRun = {
	id: string;
	fundId?: string;
	status: ReconciliationRunStatus;
	startedAt?: string;
	completedAt?: string;
	scheduledAt?: string;
	issueCount?: number;
	summary?: string;
};

export type ReviewIssueStatus = "open" | "resolved" | "dismissed";

export type ReviewIssue = {
	id: string;
	fundId?: string;
	reconciliationRunId?: string;
	investorId?: string;
	investorName?: string;
	transactionId?: string;
	transactionReference?: string;
	issueType?: string;
	severity?: "critical" | "high" | "medium" | "low";
	status: ReviewIssueStatus;
	title: string;
	description?: string;
	aiSummary?: string;
	metadata?: Record<string, unknown>;
	createdAt?: string;
	updatedAt?: string;
};

export type IssueEvent = {
	id: string;
	reviewIssueId?: string;
	type?: string;
	message?: string;
	note?: string;
	createdAt?: string;
	actor?: string;
};

export type HealthStatus = {
	status?: string;
	ok?: boolean;
	message?: string;
};

export type ReviewIssueActionResult = {
	issue?: ReviewIssue;
	transaction?: Transaction;
};

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

export function startBatchReconciliationRuns(fundIds: string[]) {
	return apiFetch<ReconciliationRun[]>("/api/tallymark/reconciliation-runs/batch", {
		method: "POST",
		body: JSON.stringify({ fundIds }),
	});
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
