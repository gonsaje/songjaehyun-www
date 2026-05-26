export function formatDate(value?: string) {
	if (!value) return "-";
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	}).format(new Date(value));
}

export function formatReviewDate(value?: string, fallback = "Not scheduled") {
	return value ? formatDate(value) : fallback;
}

export function formatMoney(value?: number) {
	if (typeof value !== "number") return "-";
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);
}

export function formatUsd(value?: number | string | null) {
	if (value === null || value === undefined || value === "") return "-";
	const numericValue =
		typeof value === "number" ? value : Number.parseFloat(value);
	if (!Number.isFinite(numericValue)) return "-";
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(numericValue);
}

export function statusClass(status?: string) {
	if (status === "completed" || status === "resolved") {
		return "border-emerald-200 bg-emerald-50 text-emerald-700";
	}

	if (status === "failed" || status === "critical") {
		return "border-rose-200 bg-rose-50 text-rose-700";
	}

	if (status === "processing" || status === "high") {
		return "border-amber-200 bg-amber-50 text-amber-700";
	}

	return "border-slate-200 bg-slate-50 text-slate-700";
}