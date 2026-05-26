export default function FilterSelect({
	label,
	value,
	options,
	labels,
	onChange,
}: {
	label: string;
	value: string;
	options: string[];
	labels?: Record<string, string>;
	onChange: (value: string) => void;
}) {
	return (
		<label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
			{label}
			<select
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="mt-1 block rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm normal-case tracking-normal text-slate-800"
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{labels?.[option] ?? option}
					</option>
				))}
			</select>
		</label>
	);
}