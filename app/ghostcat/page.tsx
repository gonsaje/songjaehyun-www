"use client";

import { useMemo, useState } from "react";
import { GhostSignature } from "@/components/ghostcat/GhostSignature";
import { PrivateEntries } from "@/components/ghostcat/PrivateEntries";
import { ReflectionForm } from "@/components/ghostcat/ReflectionForm";
import { extractContextualVector } from "@/lib/contextualVectorExtractor";
import { mockReflection } from "@/lib/mockReflections";
import { mockVectorExtractor } from "@/lib/mockVectorExtractor";
import { vectorAveraging } from "@/lib/vectorAveraging";
import type { Entry } from "@/types/ghostcat";
import { vectorKeys } from "@/types/ghostcat";

type DemoProfile = {
  id: string;
  name: string;
  note: string;
  seedTexts: string[];
};

const seedDates = [
  "2026-04-27T13:10:00.000Z",
  "2026-04-26T20:30:00.000Z",
  "2026-04-26T01:15:00.000Z",
  "2026-04-24T22:45:00.000Z",
  "2026-04-23T18:20:00.000Z",
];

const demoProfiles = [
  {
    id: "runner",
    name: "night runner",
    note: "alive, restless, moving forward",
    seedTexts: [
      "night was quiet after the run. i felt alive, then suddenly very still.",
      "sweat cooling on my neck. fast thoughts, fire in my chest, then a softer walk home.",
      "i kept moving forward even when the pressure got tight.",
      "finished the hill and understood i was not angry anymore.",
    ],
  },
  {
    id: "letter",
    name: "unsent letter",
    note: "warm, aching, held back",
    seedTexts: [
      "a warm hand on my shoulder. no big answer. just enough.",
      "i miss the old kitchen light and the soft way we almost said everything.",
      "there was love in the silence, gentle but unfinished.",
      "i wanted to call, but hope felt kinder when held quietly.",
    ],
  },
  {
    id: "clearer",
    name: "clearer morning",
    note: "calm, honest, newly understood",
    seedTexts: [
      "realized i could continue without proving the whole thing tonight.",
      "the morning was slow and clear. i understood what had been heavy.",
      "honest words came easier after breathing for a while.",
      "i felt steady enough to finish one small true thing.",
    ],
  },
  {
    id: "yours",
    name: "empty room",
    note: "start with your own traces",
    seedTexts: [],
  },
] as const satisfies readonly DemoProfile[];

const createEntriesForProfile = (profile: DemoProfile): Entry[] => {
  return profile.seedTexts.map((rawText, index) => {
    return {
      id: `${profile.id}-seed-${index}`,
      rawText,
      createdAt: seedDates[index],
      emotionalVector: mockVectorExtractor(rawText),
      privateReflection: mockReflection(rawText),
      userId: profile.id,
    };
  });
};

const initialEntriesByProfile = demoProfiles.reduce<Record<string, Entry[]>>((profiles, profile) => {
  profiles[profile.id] = createEntriesForProfile(profile);
  return profiles;
}, {});

export default function Home() {
  const [activeProfileId, setActiveProfileId] = useState<string>(demoProfiles[0].id);
  const [entriesByProfile, setEntriesByProfile] = useState(initialEntriesByProfile);
  const activeProfile = demoProfiles.find((profile) => profile.id === activeProfileId) ?? demoProfiles[0];
  const userEntries = entriesByProfile[activeProfile.id] ?? [];
  const ghostVector = useMemo(() => vectorAveraging(userEntries), [userEntries]);
  const topTraces = useMemo(() => {
    return [...vectorKeys]
      .sort((left, right) => ghostVector[right] - ghostVector[left])
      .slice(0, 3);
  }, [ghostVector]);

  const handleCreateEntry = async (rawText: string) => {
    const contextualVector = await extractContextualVector(rawText);

    const entry: Entry = {
      id: `entry-${Date.now()}`,
      rawText,
      createdAt: new Date().toISOString(),
      emotionalVector: contextualVector ?? mockVectorExtractor(rawText),
      privateReflection: mockReflection(rawText),
      userId: activeProfile.id,
    };

    setEntriesByProfile((currentEntriesByProfile) => {
      return {
        ...currentEntriesByProfile,
        [activeProfile.id]: [entry, ...(currentEntriesByProfile[activeProfile.id] ?? [])],
      };
    });
  };

  return (
    <main
      data-ghostcat-theme
      className="ghostcat-theme min-h-screen bg-[#020203] px-5 py-7 text-[#f4f0e8] sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.88fr)] lg:gap-14">
        <section className="flex min-h-[calc(100vh-3.5rem)] flex-col justify-between gap-12 py-6">
          <div className="space-y-16">
            <header className="flex flex-col gap-5 text-sm text-hush sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ghostcat.png"
                  alt=""
                  width={52}
                  height={52}
                  className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                />
                <span className="ghostcat-wordmark text-mist">ghostcat</span>
              </div>
              <p className="max-w-[15rem] border-l border-ember/35 pl-4 text-left text-[0.7rem] uppercase leading-5 tracking-[0.24em] sm:border-l-0 sm:border-r sm:pl-0 sm:pr-4 sm:text-right">
                <span className="block text-mist/90">beautiful things</span>
                <span className="block text-hush">do not ask for attention</span>
              </p>
            </header>

            <section className="space-y-3" aria-label="Demo profiles">
              <div className="flex flex-wrap gap-2">
                {demoProfiles.map((profile) => {
                  const isActive = profile.id === activeProfile.id;

                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setActiveProfileId(profile.id)}
                      className={[
                        "rounded-full border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-ember/30",
                        isActive
                          ? "border-ember/45 bg-ember/15 text-mist"
                          : "border-white/10 bg-white/[0.025] text-hush hover:border-white/20 hover:text-mist",
                      ].join(" ")}
                    >
                      {profile.name}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm leading-6 text-hush">{activeProfile.note}</p>
            </section>

            <ReflectionForm onSubmit={handleCreateEntry} />
          </div>

          <PrivateEntries entries={userEntries} />
        </section>

        <aside className="lg:sticky lg:top-8 lg:flex lg:h-[calc(100vh-4rem)] lg:items-center" aria-label="Public ghost preview">
          <div className="w-full rounded-[2rem] border border-white/10 bg-dusk/55 p-5 shadow-hush backdrop-blur sm:p-8">
            <div className="mb-4 flex items-center justify-between gap-4 text-sm">
              <span className="text-mist">{activeProfile.name}</span>
              <span className="text-hush">{userEntries.length} traces</span>
            </div>
            <GhostSignature vector={ghostVector} />
            <section className="mt-7 border-t border-white/10 pt-6" aria-label="Trace breakdown">
              <p className="text-sm leading-6 text-hush">
                {userEntries.length > 0 ? (
                  <>
                    your traces consist mostly of <span className="text-mist">{topTraces.join(", ")}</span>.
                  </>
                ) : (
                  <>your traces will appear here as you leave entries.</>
                )}
              </p>

              <div className="mt-5 space-y-3">
                {vectorKeys.map((key) => {
                  const percentage = Math.round(ghostVector[key] * 100);

                  return (
                    <div key={key} className="grid grid-cols-[5.75rem_minmax(0,1fr)_2.5rem] items-center gap-3">
                      <span className="text-xs uppercase tracking-[0.18em] text-hush">{key}</span>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                        <div
                          className="h-full rounded-full bg-mist/75"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-right text-xs tabular-nums text-hush">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
}
