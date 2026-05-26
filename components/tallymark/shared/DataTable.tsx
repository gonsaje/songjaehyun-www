export default function DataTable({
	headers,
	rows,
	empty,
}: {
	headers: string[];
	rows: React.ReactNode[][];
	empty: string;
}) {
	if (rows.length === 0) {
		return <p className="text-sm text-slate-600">{empty}</p>;
	}

	return (
		<div className="overflow-x-auto">
			<table className="w-full min-w-[620px] text-left text-sm">
				<thead className="border-b border-slate-200 text-xs uppercase tracking-[0.14em] text-slate-500">
					<tr>
						{headers.map((header) => (
							<th key={header} className="py-3 pr-4 font-semibold">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
					{rows.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((cell, cellIndex) => (
								<td key={cellIndex} className="py-3 pr-4 text-slate-700">
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}