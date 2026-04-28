export type EmotionalVector = {
  calm: number;
  tension: number;
  longing: number;
  energy: number;
  clarity: number;
  tenderness: number;
  solitude: number;
  momentum: number;
};

export type Entry = {
  id: string;
  rawText: string;
  createdAt: string;
  emotionalVector: EmotionalVector;
  privateReflection: string;
  userId: string;
};

export const vectorKeys = [
  "calm",
  "tension",
  "longing",
  "energy",
  "clarity",
  "tenderness",
  "solitude",
  "momentum",
] as const satisfies readonly (keyof EmotionalVector)[];
