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

export type LoadingState = {
  dashboard?: boolean;
  funds?: boolean;
  fund?: boolean;
  investors?: boolean;
  transactions?: boolean;
  runs?: boolean;
  issues?: boolean;
  issue?: boolean;
  events?: boolean;
  runAction?: boolean;
  issueAction?: boolean;
};

export type FundDashboardSummary = TallymarkFundSummary;

export type HealthSnapshot = {
  api: HealthStatus | null;
  db: HealthStatus | null;
};

export type IssueStatusFilter = "all" | "open" | "resolved" | "dismissed";

export type DashboardTab = "funds" | "investors";

export type IssueFixAction =
  | "add-settlement-date"
  | "assign-investor"
  | "update-reference"
  | "classify-transaction";