/**
 * Decorative mandala SVG overlay — adds Indian authenticity
 * to the hero and other featured sections.
 */
export default function MandalaSVG({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g opacity="0.5">
        {/* Outer ring */}
        <circle cx="200" cy="200" r="195" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.3" />

        {/* Petal ring - 12 petals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <g key={i} transform={`rotate(${i * 30} 200 200)`}>
              <ellipse cx="200" cy="80" rx="18" ry="50" stroke="currentColor" strokeWidth="0.6" fill="none" />
              <ellipse cx="200" cy="95" rx="10" ry="30" stroke="currentColor" strokeWidth="0.3" fill="none" />
            </g>
          );
        })}

        {/* Inner petal ring - 8 petals */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`inner-${i}`} transform={`rotate(${i * 45} 200 200)`}>
            <ellipse cx="200" cy="135" rx="12" ry="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </g>
        ))}

        {/* Center mandala */}
        <circle cx="200" cy="200" r="55" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="200" cy="200" r="18" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.08" />
        <circle cx="200" cy="200" r="5" fill="currentColor" opacity="0.3" />

        {/* Decorative dots on rings */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          return (
            <circle
              key={`dot-outer-${i}`}
              cx={200 + 160 * Math.cos(angle)}
              cy={200 + 160 * Math.sin(angle)}
              r="1.5"
              fill="currentColor"
              opacity="0.4"
            />
          );
        })}

        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          return (
            <circle
              key={`dot-mid-${i}`}
              cx={200 + 70 * Math.cos(angle)}
              cy={200 + 70 * Math.sin(angle)}
              r="1"
              fill="currentColor"
              opacity="0.3"
            />
          );
        })}

        {/* Paisley teardrop shapes around the mandala */}
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={`paisley-${i}`} transform={`rotate(${i * 60} 200 200)`}>
            <path
              d="M200 25 C215 55, 215 85, 200 110 C185 85, 185 55, 200 25Z"
              stroke="currentColor"
              strokeWidth="0.4"
              fill="none"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
