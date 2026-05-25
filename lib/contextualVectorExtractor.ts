import type { EmotionalVector } from "@/types/ghostcat";

type VectorApiResponse = {
  vector: EmotionalVector;
};

const vectorApiUrl = process.env.NEXT_PUBLIC_GHOSTCAT_VECTOR_API ?? "http://127.0.0.1:8000/vector";

const isVector = (value: unknown): value is EmotionalVector => {
  if (!value || typeof value !== "object") return false;

  return [
    "calm",
    "tension",
    "longing",
    "energy",
    "clarity",
    "tenderness",
    "solitude",
    "momentum",
  ].every((key) => {
    const vectorValue = (value as Record<string, unknown>)[key];
    return typeof vectorValue === "number" && vectorValue >= 0 && vectorValue <= 1;
  });
};

export async function extractContextualVector(rawText: string): Promise<EmotionalVector | null> {
  try {
    const response = await fetch(vectorApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: rawText }),
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as VectorApiResponse;
    return isVector(payload.vector) ? payload.vector : null;
  } catch {
    return null;
  }
}
