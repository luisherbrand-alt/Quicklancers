export default function IconTeam3({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="t3g1" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#8ab83a" />
          <stop offset="100%" stopColor="#3a6b1a" />
        </radialGradient>
        <radialGradient id="t3g2" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#d8e88a" />
          <stop offset="100%" stopColor="#a0bc3a" />
        </radialGradient>
      </defs>
      {/* Building / house */}
      {/* Roof */}
      <path d="M28 4 L50 20 L6 20 Z" fill="white" stroke="#e2e8f0" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Main building body */}
      <rect x="8" y="19" width="40" height="28" rx="2" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Small annex left */}
      <rect x="2" y="28" width="10" height="19" rx="2" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Windows on building */}
      <rect x="15" y="24" width="8" height="3" rx="1" fill="#e2e8f0" />
      <rect x="15" y="30" width="8" height="3" rx="1" fill="#e2e8f0" />
      <rect x="15" y="36" width="8" height="3" rx="1" fill="#e2e8f0" />
      <rect x="27" y="24" width="8" height="3" rx="1" fill="#e2e8f0" />
      <rect x="27" y="30" width="8" height="3" rx="1" fill="#e2e8f0" />
      <rect x="27" y="36" width="8" height="3" rx="1" fill="#e2e8f0" />
      {/* People badge pill */}
      <rect x="14" y="40" width="28" height="16" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Person 1 - dark green */}
      <circle cx="24" cy="48" r="6" fill="url(#t3g1)" />
      <circle cx="24" cy="48" r="6" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx="24" cy="45.5" r="2.2" fill="white" />
      <ellipse cx="24" cy="51" rx="3.5" ry="2.5" fill="white" />
      {/* Person 2 - light green */}
      <circle cx="33" cy="48" r="6" fill="url(#t3g2)" />
      <circle cx="33" cy="48" r="6" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx="33" cy="45.5" r="2.2" fill="white" />
      <ellipse cx="33" cy="51" rx="3.5" ry="2.5" fill="white" />
    </svg>
  );
}
