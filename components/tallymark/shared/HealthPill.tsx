import { HealthStatus } from "@/lib/tallymark/types";

export default function HealthPill({
    label,
    status,
}: {
    label: string;
    status: HealthStatus | null;
}) {
    const healthy =
        status?.ok === true ||
        status?.status === "ok" ||
        status?.status === "healthy" ||
        status?.status === "up";

    return (
        <span
            className={[
                "rounded-full border px-3 py-1 font-semibold",
                healthy
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-500",
            ].join(" ")}
        >
            {label}: {healthy ? "healthy" : "unknown"}
        </span>
    );
}
