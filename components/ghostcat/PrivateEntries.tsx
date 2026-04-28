import type { Entry } from "@/types/ghostcat";
import { vectorKeys } from "@/types/ghostcat";
import { rgba, tracePalette } from "@/lib/ghostcatPalette";

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
            <div className="mt-4 grid grid-cols-8 gap-1.5" aria-label="Emotional trace weights">
              {vectorKeys.map((key) => {
                const strength = entry.emotionalVector[key];
                const color = tracePalette[key];

                return (
                  <span
                    key={key}
                    className="group relative flex h-6 items-center"
                    aria-label={`${key}: ${Math.round(strength * 100)}%`}
                  >
                    <span
                      className="block h-1.5 w-full rounded-full border transition duration-200 group-hover:opacity-100"
                      style={{
                        backgroundColor: rgba(color, 0.1 + strength * 0.32),
                        borderColor: rgba(color, 0.12 + strength * 0.22),
                        boxShadow: `0 0 ${4 + strength * 12}px ${rgba(color, 0.04 + strength * 0.12)}`,
                        opacity: 0.34 + strength * 0.5,
                        transform: `scaleY(${0.7 + strength * 1.6})`,
                      }}
                    />
                    <span
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[0.35rem] border px-2 py-1 text-[0.62rem] uppercase tracking-[0.14em] opacity-0 shadow-hush transition duration-150 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{
                        backgroundColor: rgba(color, 0.18),
                        borderColor: rgba(color, 0.36),
                        color: rgba(color, 0.95),
                      }}
                    >
                      {key}
                    </span>
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
