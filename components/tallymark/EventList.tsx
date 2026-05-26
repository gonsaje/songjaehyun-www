import { IssueEvent } from "@/lib/tallymark/types";
import { formatDate } from "@/lib/tallymark/utils";

export default function EventList({
    events,
    compact,
}: {
    events: IssueEvent[];
    compact?: boolean;
}) {
    if (events.length === 0) {
        return <p className="text-sm text-slate-500">No events loaded.</p>;
    }

    return (
        <div className="space-y-3">
            {events.map((event) => (
                <div key={event.id} className="rounded-lg border border-slate-200 p-3">
                    <p className="text-sm font-semibold">
                        {event.type ?? event.message ?? "Issue event"}
                    </p>
                    {!compact && (
                        <p className="mt-1 text-sm text-slate-600">
                            {event.note ?? event.message ?? event.actor ?? event.id}
                        </p>
                    )}
                    <p className="mt-2 text-xs text-slate-500">
                        {formatDate(event.createdAt)}
                    </p>
                </div>
            ))}
        </div>
    );
}