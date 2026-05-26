import { ReviewIssue, Investor, IssueFixAction } from "@/lib/tallymark/types";

export default function IssueFixPanel({
	issue,
	investors,
	action,
	actionLabel,
	note,
	settlementDate,
	investorId,
	reference,
	transactionType,
	loading,
	onNoteChange,
	onSettlementDateChange,
	onInvestorIdChange,
	onReferenceChange,
	onTransactionTypeChange,
	onApply,
	onDismiss,
}: {
	issue: ReviewIssue | null;
	investors: Investor[];
	action: IssueFixAction | null;
	actionLabel: string;
	note: string;
	settlementDate: string;
	investorId: string;
	reference: string;
	transactionType: string;
	loading?: boolean;
	onNoteChange: (value: string) => void;
	onSettlementDateChange: (value: string) => void;
	onInvestorIdChange: (value: string) => void;
	onReferenceChange: (value: string) => void;
	onTransactionTypeChange: (value: string) => void;
	onApply: (action: IssueFixAction) => void;
	onDismiss: () => void;
}) {
	return (
		<section className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
			<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
				Fix Underlying Data
			</p>
			{!issue && (
				<p className="mt-3 text-sm text-slate-600">
					Select an issue to see the available fix action.
				</p>
			)}
			{issue && !action && (
				<p className="mt-3 text-sm text-slate-600">
					This issue type does not have an automated data fix. Dismiss it if it is not a data issue.
				</p>
			)}
			{issue && action && (
				<div className="mt-4 space-y-4">
					{action === "add-settlement-date" && (
						<label className="block text-sm font-semibold text-slate-700">
							Settlement date
							<input
								type="date"
								value={settlementDate}
								onChange={(event) => onSettlementDateChange(event.target.value)}
								className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
							/>
						</label>
					)}
					{action === "assign-investor" && (
						<label className="block text-sm font-semibold text-slate-700">
							Investor
							<select
								value={investorId}
								onChange={(event) => onInvestorIdChange(event.target.value)}
								className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
							>
								<option value="">Select investor</option>
								{investors.map((investor) => (
									<option key={investor.id} value={investor.id}>
										{investor.displayName ?? investor.name}
									</option>
								))}
							</select>
						</label>
					)}
					{action === "update-reference" && (
						<label className="block text-sm font-semibold text-slate-700">
							Correct reference
							<input
								type="text"
								value={reference}
								onChange={(event) => onReferenceChange(event.target.value)}
								className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
							/>
						</label>
					)}
					{action === "classify-transaction" && (
						<label className="block text-sm font-semibold text-slate-700">
							Transaction type
							<select
								value={transactionType}
								onChange={(event) => onTransactionTypeChange(event.target.value)}
								className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
							>
								{[
									"capital_call",
									"distribution",
									"management_fee",
									"expense",
									"investment_wire",
								].map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
						</label>
					)}
				</div>
			)}
			<label className="mt-4 block text-sm font-semibold text-slate-700">
				Audit note
				<textarea
					value={note}
					onChange={(event) => onNoteChange(event.target.value)}
					placeholder="Explain the data fix or why this is not a data issue."
					className="mt-2 min-h-24 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
				/>
			</label>
			<div className="mt-3 flex flex-wrap gap-2">
				{action && (
					<button
						type="button"
						disabled={loading}
						onClick={() => onApply(action)}
						className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-300"
					>
						{loading ? "Applying..." : actionLabel}
					</button>
				)}
				<button
					type="button"
					disabled={loading}
					onClick={onDismiss}
					className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 disabled:text-slate-400"
				>
					Dismiss: not a data issue
				</button>
			</div>
		</section>
	);
}