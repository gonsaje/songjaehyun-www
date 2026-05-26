import { ApiActivity } from "@/lib/tallymark/types";

export default function ApiActivityDrawer({
    activity,
    open,
    onToggle,
}: {
    activity: ApiActivity[];
    open: boolean;
    onToggle: () => void;
}) {
    return (
        <section className="mt-5 rounded-lg border border-slate-200 bg-white">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    API Activity
                </span>
                <span className="text-sm font-semibold text-slate-700">
                    {open ? "Collapse" : "Expand"}
                </span>
            </button>
            {open && (
                <div className="max-h-72 overflow-auto border-t border-slate-200">
                    {activity.length === 0 && (
                        <p className="px-4 py-5 text-sm text-slate-500">
                            No API calls yet. Click an operation button to record activity.
                        </p>
                    )}
                    {activity.map((item) => (
                        <div
                            key={item.id}
                            className="grid gap-2 border-b border-slate-100 px-4 py-3 text-sm md:grid-cols-[80px_minmax(0,1fr)_120px_100px]"
                        >
                            <span className="font-semibold">{item.method}</span>
                            <code className="truncate text-slate-700">{item.path}</code>
                            <span className={item.ok ? "text-emerald-700" : "text-rose-700"}>
                                {item.status ? `${item.status} ${item.ok ? "OK" : "ERR"}` : "Network"}
                            </span>
                            <span className="text-slate-500">{item.durationMs}ms</span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
