const reflections = [
  "something quiet remained after the noise passed.",
  "you did not need to explain it for it to be real.",
  "the moment left a shape, not an answer.",
  "it mattered without becoming a performance.",
  "there was a small truth inside it.",
  "what passed through still changed the room.",
  "you held the day without forcing it to mean more.",
  "some things become clear only after they soften.",
];

const stableHash = (input: string) => {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = Math.imul(31, hash) + input.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
};

export function mockReflection(rawText: string) {
  const trimmed = rawText.trim().toLowerCase();
  if (!trimmed) return "nothing had to be made larger than it was.";

  return reflections[stableHash(trimmed) % reflections.length];
}
