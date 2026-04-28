import type { EmotionalVector } from "@/types/ghostcat";
import { vectorKeys } from "@/types/ghostcat";

const keywordHints: Record<keyof EmotionalVector, string[]> = {
  calm: ["quiet", "still", "peace", "soft", "breathe", "slow"],
  tension: ["heavy", "anxious", "tight", "angry", "restless", "pressure"],
  longing: ["miss", "want", "ache", "memory", "almost", "hope"],
  energy: ["run", "fast", "lift", "sweat", "fire", "alive"],
  clarity: ["clear", "realized", "understood", "honest", "truth"],
  tenderness: ["gentle", "kind", "warm", "love", "held", "soft"],
  solitude: ["alone", "silence", "night", "empty", "distance"],
  momentum: ["forward", "push", "continue", "move", "finish", "endure"],
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const stableHash = (input: string) => {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const hashUnit = (input: string, salt: string) => {
  const hash = stableHash(`${salt}:${input}`);
  return (hash % 1000) / 1000;
};

export function mockVectorExtractor(rawText: string): EmotionalVector {
  const normalized = rawText.toLowerCase();
  const words = normalized.match(/[a-z']+/g) ?? [];
  const textLength = rawText.trim().length;
  const sentenceCount = Math.max(1, rawText.split(/[.!?]+/).filter(Boolean).length);
  const exclamationCount = (rawText.match(/!/g) ?? []).length;
  const questionCount = (rawText.match(/\?/g) ?? []).length;

  return vectorKeys.reduce((vector, key) => {
    const matches = keywordHints[key].reduce((count, hint) => {
      return count + words.filter((word) => word.includes(hint)).length;
    }, 0);

    const keywordScore = Math.min(0.52, matches * 0.14);
    const lengthScore = clamp01(textLength / 420) * 0.12;
    const sentenceScore = clamp01(sentenceCount / 5) * 0.08;
    const variation = (hashUnit(normalized, key) - 0.5) * 0.16;

    let value = 0.24 + keywordScore + lengthScore + sentenceScore + variation;

    if (key === "tension") value += clamp01(exclamationCount / 3) * 0.18;
    if (key === "energy") value += clamp01(exclamationCount / 4) * 0.12;
    if (key === "clarity") value += clamp01(questionCount / 3) * 0.08;
    if (key === "solitude") value += normalized.includes(" i ") ? 0.04 : 0;
    if (key === "calm") value -= clamp01(exclamationCount / 3) * 0.08;

    vector[key] = Number(clamp01(value).toFixed(3));
    return vector;
  }, {} as EmotionalVector);
}
