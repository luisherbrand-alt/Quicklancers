export default function IconTeam1({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="t1g" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#8ab83a" />
          <stop offset="100%" stopColor="#3a6b1a" />
        </radialGradient>
      </defs>
      <circle cx="28" cy="28" r="24" fill="url(#t1g)" />
      <circle cx="28" cy="28" r="24" fill="none" stroke="white" strokeWidth="3" />
      {/* Head */}
      <circle cx="28" cy="21" r="8" fill="white" />
      {/* Body */}
      <ellipse cx="28" cy="38" rx="13" ry="9" fill="white" />
    </svg>
  );
}
