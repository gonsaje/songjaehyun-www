import type {
  HealthStatus,
} from "@/lib/tallymark/types";

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