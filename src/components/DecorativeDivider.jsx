/**
 * Indian ornamental divider with a lotus/paisley motif center.
 * Used between sections to add cultural authenticity.
 */
export default function DecorativeDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
      <span className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold-400/30" />

      {/* Paisley / lotus motif SVG */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        className="text-gold-400/40"
        aria-hidden="true"
      >
        {/* Center lotus */}
        <ellipse cx="18" cy="18" rx="4" ry="6" fill="currentColor" opacity="0.6" />
        <ellipse cx="18" cy="18" rx="4" ry="6" fill="currentColor" opacity="0.3" transform="rotate(45 18 18)" />
        <ellipse cx="18" cy="18" rx="4" ry="6" fill="currentColor" opacity="0.2" transform="rotate(90 18 18)" />
        <ellipse cx="18" cy="18" rx="4" ry="6" fill="currentColor" opacity="0.15" transform="rotate(135 18 18)" />
        {/* Outer ring dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <circle
            key={deg}
            cx={18 + 13 * Math.cos((deg * Math.PI) / 180)}
            cy={18 + 13 * Math.sin((deg * Math.PI) / 180)}
            r="1.2"
            fill="currentColor"
            opacity="0.5"
          />
        ))}
      </svg>

      <span className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gold-400/30" />
    </div>
  );
}
