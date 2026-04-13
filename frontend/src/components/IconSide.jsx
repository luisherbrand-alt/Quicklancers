export default function IconSide({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Card background */}
      <rect x="2" y="6" width="40" height="34" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Top dots */}
      <circle cx="10" cy="14" r="2" fill="#1e293b" />
      <circle cx="16" cy="14" r="2" fill="#1e293b" />
      <circle cx="22" cy="14" r="2" fill="#1e293b" />
      {/* Layout blocks */}
      <rect x="7"  y="20" width="10" height="16" rx="2" fill="#e2e8f0" />
      <rect x="20" y="20" width="7"  height="7"  rx="2" fill="#e2e8f0" />
      <rect x="20" y="29" width="7"  height="7"  rx="2" fill="#7a9a2a" />
      <rect x="30" y="20" width="7"  height="16" rx="2" fill="#e2e8f0" />
      {/* Clock badge */}
      <defs>
        <radialGradient id="clk" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#a0bc3a" />
          <stop offset="100%" stopColor="#5a8020" />
        </radialGradient>
      </defs>
      <circle cx="43" cy="12" r="10" fill="url(#clk)" stroke="white" strokeWidth="2" />
      <circle cx="43" cy="12" r="8" fill="url(#clk)" />
      {/* Clock face */}
      <circle cx="43" cy="12" r="6" fill="white" fillOpacity="0.2" />
      <line x1="43" y1="8"  x2="43" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="43" y1="12" x2="46" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="43" cy="12" r="1" fill="white" />
    </svg>
  );
}
