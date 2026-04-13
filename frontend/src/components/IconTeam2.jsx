export default function IconTeam2({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="t2g" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#8ab83a" />
          <stop offset="100%" stopColor="#3a6b1a" />
        </radialGradient>
      </defs>
      {/* Left card (back) */}
      <rect x="2" y="10" width="28" height="36" rx="5" fill="#e8f0b8" stroke="white" strokeWidth="2" />
      {/* Right card (back) */}
      <rect x="26" y="10" width="28" height="36" rx="5" fill="#d1d5db" stroke="white" strokeWidth="2" />
      {/* Center card (front) */}
      <rect x="13" y="6" width="30" height="38" rx="5" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Person on center card */}
      <circle cx="28" cy="20" r="7" fill="url(#t2g)" />
      <circle cx="28" cy="20" r="7" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="28" cy="17" r="3" fill="white" />
      <ellipse cx="28" cy="24" rx="5" ry="3.5" fill="white" />
      {/* Lines */}
      <rect x="18" y="32" width="20" height="2.5" rx="1.5" fill="#e2e8f0" />
      <rect x="21" y="37" width="14" height="2.5" rx="1.5" fill="#e2e8f0" />
      {/* Dots at bottom */}
      <circle cx="23" cy="47" r="2" fill="#d1d5db" />
      <circle cx="28" cy="47" r="2" fill="#3a6b1a" />
      <circle cx="33" cy="47" r="2" fill="#d1d5db" />
    </svg>
  );
}
