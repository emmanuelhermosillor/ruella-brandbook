export function RingMark({ size = 40, variant = "dot" }: { size?: number; variant?: "dot" | "line" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" role="img" aria-label="Ruella">
      <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1" />
      {variant === "dot"
        ? <circle cx="40" cy="40" r="4.5" fill="#7B8A6F" />
        : <line x1="24" y1="40" x2="56" y2="40" stroke="#7B8A6F" strokeWidth="1" />}
    </svg>
  );
}
