import type { EmotionalVector } from "@/types/ghostcat";

type GhostSignatureProps = {
  vector: EmotionalVector;
};

type Point = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const createSmoothPath = (points: Point[]) => {
  const first = points[0];
  let path = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;

  points.forEach((point, index) => {
    const next = points[(index + 1) % points.length];
    const midpoint = {
      x: (point.x + next.x) / 2,
      y: (point.y + next.y) / 2,
    };

    path += ` Q ${point.x.toFixed(2)} ${point.y.toFixed(2)} ${midpoint.x.toFixed(2)} ${midpoint.y.toFixed(2)}`;
  });

  return `${path} Z`;
};

export function GhostSignature({ vector }: GhostSignatureProps) {
  const pointCount = 24;
  const center = 150;
  const baseRadius = 58 + vector.energy * 22;
  const distortion = 5 + vector.tension * 28;
  const smoothness = 1 - vector.clarity * 0.62;
  const directionalPull = vector.momentum * 22;
  const hush = clamp((vector.solitude + vector.longing) / 2, 0, 1);
  const warmth = clamp((vector.calm + vector.tenderness) / 2, 0, 1);
  const opacity = clamp(0.52 + vector.tenderness * 0.38, 0.45, 0.95);
  const animationSeconds = `${12 - vector.energy * 4}s`;

  // The visual mapping keeps the public artifact abstract: clarity reduces
  // wobble, tension roughens the edge, momentum pulls the form off-center,
  // and tenderness/calm alter opacity and glow rather than exposing meaning.
  const points = Array.from({ length: pointCount }, (_, index) => {
    const angle = (Math.PI * 2 * index) / pointCount;
    const waveOne = Math.sin(angle * (2.1 + vector.longing * 1.4) + vector.solitude * 2.8);
    const waveTwo = Math.cos(angle * (3.2 + vector.energy * 1.8) + vector.tension * 3.6);
    const waveThree = Math.sin(angle * 5 + vector.clarity * Math.PI);
    const radius = baseRadius + (waveOne * 0.55 + waveTwo * 0.35 + waveThree * 0.1) * distortion * smoothness;
    const pullX = Math.cos(angle) * directionalPull * 0.32 + directionalPull * 0.42;
    const pullY = Math.sin(angle * 2) * vector.longing * 6 - vector.solitude * 8;

    return {
      x: center + Math.cos(angle) * radius + pullX,
      y: center + Math.sin(angle) * radius + pullY,
    };
  });

  const path = createSmoothPath(points);
  const amber = Math.round(132 + warmth * 82);
  const blue = Math.round(150 + vector.clarity * 52 - hush * 42);
  const violet = Math.round(116 + vector.longing * 44 - vector.calm * 18);
  const edge = `rgb(${Math.round(88 + warmth * 50)}, ${Math.round(91 + vector.clarity * 35)}, ${Math.round(104 + hush * 18)})`;
  const core = `rgb(${amber}, ${Math.round(126 + warmth * 42)}, ${blue})`;
  const shadow = `rgb(${Math.round(42 + warmth * 32)}, ${Math.round(40 + vector.clarity * 28)}, ${violet})`;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[28rem]" aria-label="ghost signature">
      <svg viewBox="0 0 300 300" role="img" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="ghost-gradient" cx={`${44 + vector.momentum * 12}%`} cy={`${38 + vector.clarity * 10}%`}>
            <stop offset="0%" stopColor={core} stopOpacity={opacity} />
            <stop offset="54%" stopColor={shadow} stopOpacity={0.62 + warmth * 0.18} />
            <stop offset="100%" stopColor={edge} stopOpacity={0.32 + hush * 0.16} />
          </radialGradient>
          <filter id="ghost-softness" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={3 + vector.tenderness * 5} />
          </filter>
          <filter id="ghost-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation={10 + warmth * 10} result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 0.82 0 0 0  0 0 0.65 0 0  0 0 0 0.48 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={path}
          fill="url(#ghost-gradient)"
          filter="url(#ghost-glow)"
          className="origin-center"
          style={{
            animation: `ghost-breathe ${animationSeconds} ease-in-out infinite`,
          }}
        />
        <path d={path} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" filter="url(#ghost-softness)" />
      </svg>
    </div>
  );
}
