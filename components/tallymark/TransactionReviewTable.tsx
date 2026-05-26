import { Transaction } from "@/lib/tallymark/types";
import { formatReviewDate, formatMoney } from "@/lib/tallymark/utils";

export default function TransactionReviewTable({
	transactions,
}: {
	transactions: Transaction[];
}) {
	const referenceCounts = transactions.reduce<Record<string, number>>(
		(accumulator, transaction) => {
			const reference = getTransactionReference(transaction);
			accumulator[reference] = (accumulator[reference] ?? 0) + 1;
			return accumulator;
		},
		{},
	);

	if (transactions.length === 0) {
		return <p className="text-sm text-slate-600">No transactions returned for this fund.</p>;
	}

	return (
		<div className="overflow-x-auto">
			<table className="w-full min-w-[1080px] text-left text-sm">
				<thead className="border-b border-slate-200 text-xs uppercase tracking-[0.14em] text-slate-500">
					<tr>
						<th className="py-3 pr-4 font-semibold">Type</th>
						<th className="py-3 pr-4 font-semibold">Reference</th>
						<th className="py-3 pr-4 font-semibold">Investor</th>
						<th className="py-3 pr-4 font-semibold">Amount</th>
						<th className="py-3 pr-4 font-semibold">Expected</th>
						<th className="py-3 pr-4 font-semibold">Variance</th>
						<th className="py-3 pr-4 font-semibold">Transaction Date</th>
						<th className="py-3 pr-4 font-semibold">Settlement Date</th>
						<th className="py-3 pr-4 font-semibold">Checks</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
					{transactions.map((transaction) => {
						const reference = getTransactionReference(transaction);
						const variance = getTransactionVariance(transaction);
						const flags = [
							!transaction.settlementDate ? "missing settlement" : null,
							!getTransactionInvestor(transaction) ? "no investor" : null,
							typeof variance === "number" && variance !== 0
								? "variance"
								: null,
							referenceCounts[reference] > 1 ? "duplicate ref" : null,
						].filter(Boolean);

						return (
							<tr
								key={transaction.id}
								className={flags.length > 0 ? "bg-amber-50/60" : undefined}
							>
								<td className="py-3 pr-4">{transaction.type ?? "-"}</td>
								<td className="py-3 pr-4 font-mono text-xs">{reference}</td>
								<td className="py-3 pr-4">{getTransactionInvestor(transaction) ?? "No linked investor"}</td>
								<td className="py-3 pr-4">{formatMoney(transaction.amount)}</td>
								<td className="py-3 pr-4">{formatMoney(transaction.expectedAmount)}</td>
								<td className="py-3 pr-4">{formatMoney(variance)}</td>
								<td className="py-3 pr-4">{formatReviewDate(getTransactionDate(transaction), "Not recorded")}</td>
								<td className="py-3 pr-4">{formatReviewDate(transaction.settlementDate ?? undefined, "Pending settlement")}</td>
								<td className="py-3 pr-4">
									<div className="flex flex-wrap gap-1">
										{flags.length === 0 ? (
											<span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
												clear
											</span>
										) : (
											flags.map((flag) => (
												<span
													key={flag}
													className="rounded-full border border-amber-200 bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800"
												>
													{flag}
												</span>
											))
										)}
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

function getTransactionReference(transaction: Transaction) {
    return transaction.reference ?? transaction.id;
}

function getTransactionDate(transaction: Transaction) {
    return transaction.transactionDate ?? transaction.effectiveDate;
}

function getTransactionInvestor(transaction: Transaction) {
    return transaction.investorName ?? transaction.investor?.name ?? transaction.investorId;
}

function getTransactionVariance(transaction: Transaction) {
    if (typeof transaction.variance === "number") return transaction.variance;
    if (
        typeof transaction.amount === "number" &&
        typeof transaction.expectedAmount === "number"
    ) {
        return transaction.amount - transaction.expectedAmount;
    }
    return undefined;
}