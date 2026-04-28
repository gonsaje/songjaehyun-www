import type { EmotionalVector } from "@/types/ghostcat";

export type Rgb = [number, number, number];

export const tracePalette = {
  calm: [76, 190, 176],
  tension: [238, 92, 92],
  longing: [176, 116, 236],
  energy: [246, 170, 72],
  clarity: [89, 165, 246],
  tenderness: [244, 132, 166],
  solitude: [104, 116, 216],
  momentum: [114, 202, 106],
} satisfies Record<keyof EmotionalVector, Rgb>;

export const rgb = (color: Rgb) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

export const rgba = (color: Rgb, alpha: number) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
