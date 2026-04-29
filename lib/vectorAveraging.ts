import type { Entry, EmotionalVector } from "@/types/ghostcat";
import { vectorKeys } from "@/types/ghostcat";

const emptyVector: EmotionalVector = {
  calm: 0.5,
  tension: 0.5,
  longing: 0.5,
  energy: 0.5,
  clarity: 0.5,
  tenderness: 0.5,
  solitude: 0.5,
  momentum: 0.5,
};

export function vectorAveraging(entries: Entry[]): EmotionalVector {
  const recentEntries = [...entries]
    .sort((left, right) => {
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    })
    .slice(0, 20);

  if (recentEntries.length === 0) return emptyVector;

  const totals = { ...emptyVector };
  let totalWeight = 0;

  vectorKeys.forEach((key) => {
    totals[key] = 0;
  });

  recentEntries.forEach((entry, index) => {
    const weight = Math.exp(-index * 0.18);
    totalWeight += weight;

    vectorKeys.forEach((key) => {
      totals[key] += entry.emotionalVector[key] * weight;
    });
  });

  return vectorKeys.reduce((average, key) => {
    average[key] = Number((totals[key] / totalWeight).toFixed(3));
    return average;
  }, {} as EmotionalVector);
}
