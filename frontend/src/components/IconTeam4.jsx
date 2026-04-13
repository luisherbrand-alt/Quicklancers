export default function IconTeam4({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="t4g1" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#8ab83a" />
          <stop offset="100%" stopColor="#3a6b1a" />
        </radialGradient>
        <radialGradient id="t4g2" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#e8f5a0" />
          <stop offset="100%" stopColor="#c0d840" />
        </radialGradient>
      </defs>
      {/* Dark green person (back-left) */}
      <circle cx="20" cy="22" r="18" fill="url(#t4g1)" />
      <circle cx="20" cy="22" r="18" fill="none" stroke="white" strokeWidth="3" />
      <circle cx="20" cy="16" r="7" fill="white" />
      <ellipse cx="20" cy="30" rx="12" ry="8" fill="white" />
      {/* Light yellow-green person (front-right) */}
      <circle cx="36" cy="34" r="18" fill="url(#t4g2)" />
      <circle cx="36" cy="34" r="18" fill="none" stroke="white" strokeWidth="3" />
      <circle cx="36" cy="28" r="7" fill="white" />
      <ellipse cx="36" cy="42" rx="12" ry="8" fill="white" />
    </svg>
  );
}
