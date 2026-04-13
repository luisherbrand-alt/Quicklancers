export default function IconPersonal({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Phone body */}
      <rect x="8" y="4" width="26" height="44" rx="5" fill="#e8f0b8" stroke="#d4e080" strokeWidth="1.5" />
      {/* Camera dot */}
      <circle cx="21" cy="10" r="1.5" fill="white" fillOpacity="0.7" />
      {/* Bottom line / home indicator */}
      <rect x="15" y="42" width="12" height="2" rx="1" fill="white" fillOpacity="0.7" />
      {/* Person badge */}
      <defs>
        <radialGradient id="pg" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#7db83a" />
          <stop offset="100%" stopColor="#3a6b1a" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="38" r="13" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="40" cy="38" r="11" fill="url(#pg)" />
      {/* Person head */}
      <circle cx="40" cy="33" r="4" fill="white" />
      {/* Person body */}
      <ellipse cx="40" cy="44" rx="7" ry="5" fill="white" />
    </svg>
  );
}
