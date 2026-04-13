export default function IconFreelancer({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fg1" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#7db83a" />
          <stop offset="100%" stopColor="#3a6b2a" />
        </radialGradient>
      </defs>
      {/* Outer circle */}
      <circle cx="26" cy="26" r="24" fill="url(#fg1)" />
      {/* White drop shadow ring */}
      <circle cx="26" cy="26" r="24" fill="none" stroke="white" strokeWidth="3" />
      {/* Person head */}
      <circle cx="26" cy="20" r="7" fill="white" />
      {/* Person body */}
      <ellipse cx="26" cy="36" rx="12" ry="8" fill="white" />
      {/* Star badge */}
      <circle cx="43" cy="43" r="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x="43" y="47" textAnchor="middle" fontSize="10" fill="#1e293b">★</text>
    </svg>
  );
}
