export default function MetadataRow({
	label,
	value,
}: {
	label: string;
	value: React.ReactNode;
}) {
	return (
		<div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
			<dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
				{label}
			</dt>
			<dd className="mt-1 font-medium text-slate-800">{value}</dd>
		</div>
	);
}