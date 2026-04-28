import type { Entry } from "@/types/ghostcat";
import { vectorKeys } from "@/types/ghostcat";

type PrivateEntriesProps = {
  entries: Entry[];
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function PrivateEntries({ entries }: PrivateEntriesProps) {
  return (
    <section className="space-y-5" aria-label="Private traces">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-sm font-normal uppercase tracking-[0.28em] text-hush">private traces</h2>
        <span className="text-xs text-hush/70">{entries.length}</span>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-[1.25rem] border border-white/9 bg-white/[0.032] p-4 shadow-hush"
          >
            <div className="mb-3 flex items-center justify-between gap-4 text-xs text-hush/70">
              <time dateTime={entry.createdAt}>{dateFormatter.format(new Date(entry.createdAt))}</time>
            </div>
            <p className="whitespace-pre-wrap text-[0.95rem] leading-7 text-mist/90">{entry.rawText}</p>
            <p className="mt-3 text-sm leading-6 text-hush">{entry.privateReflection}</p>
            <div className="mt-4 grid grid-cols-8 gap-1.5" aria-hidden="true">
              {vectorKeys.map((key) => (
                <span
                  key={key}
                  className="h-1.5 rounded-full bg-mist/20"
                  style={{
                    opacity: 0.18 + entry.emotionalVector[key] * 0.56,
                    transform: `scaleY(${0.7 + entry.emotionalVector[key] * 1.6})`,
                  }}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
