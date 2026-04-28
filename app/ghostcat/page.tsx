"use client";

import { useMemo, useState } from "react";
import { GhostSignature } from "@/components/ghostcat/GhostSignature";
import { PrivateEntries } from "@/components/ghostcat/PrivateEntries";
import { ReflectionForm } from "@/components/ghostcat/ReflectionForm";
import { mockReflection } from "@/lib/mockReflections";
import { mockVectorExtractor } from "@/lib/mockVectorExtractor";
import { vectorAveraging } from "@/lib/vectorAveraging";
import type { Entry } from "@/types/ghostcat";

const mockCurrentUser = {
  id: "ghostcat-user-001",
  name: "ghostcat",
};

const seedTexts = [
  "night was quiet after the run. i felt alive, then suddenly very still.",
  "missed the train and almost got angry, but the walk home softened something.",
  "a warm hand on my shoulder. no big answer. just enough.",
  "realized i could continue without proving the whole thing tonight.",
];

const seedDates = [
  "2026-04-27T13:10:00.000Z",
  "2026-04-26T20:30:00.000Z",
  "2026-04-26T01:15:00.000Z",
  "2026-04-24T22:45:00.000Z",
];

const seededEntries: Entry[] = seedTexts.map((rawText, index) => {
  return {
    id: `seed-${index}`,
    rawText,
    createdAt: seedDates[index],
    emotionalVector: mockVectorExtractor(rawText),
    privateReflection: mockReflection(rawText),
    userId: mockCurrentUser.id,
  };
});

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>(seededEntries);
  const userEntries = entries.filter((entry) => entry.userId === mockCurrentUser.id);
  const ghostVector = useMemo(() => vectorAveraging(userEntries), [userEntries]);

  const handleCreateEntry = (rawText: string) => {
    const entry: Entry = {
      id: `entry-${Date.now()}`,
      rawText,
      createdAt: new Date().toISOString(),
      emotionalVector: mockVectorExtractor(rawText),
      privateReflection: mockReflection(rawText),
      userId: mockCurrentUser.id,
    };

    setEntries((currentEntries) => [entry, ...currentEntries]);
  };

  return (
    <main className="min-h-screen px-5 py-7 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.88fr)] lg:gap-14">
        <section className="flex min-h-[calc(100vh-3.5rem)] flex-col justify-between gap-12 py-6">
          <div className="space-y-16">
            <header className="flex items-center justify-between text-sm text-hush">
              <span className="text-mist">ghostcat</span>
              <span>seen, not explained</span>
            </header>

            <ReflectionForm onSubmit={handleCreateEntry} />
          </div>

          <PrivateEntries entries={userEntries} />
        </section>

        <aside className="lg:sticky lg:top-8 lg:flex lg:h-[calc(100vh-4rem)] lg:items-center" aria-label="Public ghost preview">
          <div className="w-full rounded-[2rem] border border-white/10 bg-dusk/55 p-5 shadow-hush backdrop-blur sm:p-8">
            <div className="mb-4 text-right text-sm text-hush">ghostcat</div>
            <GhostSignature vector={ghostVector} />
          </div>
        </aside>
      </div>
    </main>
  );
}
