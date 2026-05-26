export default function Metric({ label, value }: { label: string; value: React.ReactNode }) {
	return (
		<div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
			<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
				{label}
			</p>
			<p className="mt-2 text-2xl font-semibold">{value}</p>
		</div>
	);
}
