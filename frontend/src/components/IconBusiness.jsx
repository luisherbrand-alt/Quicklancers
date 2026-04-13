export default function IconBusiness({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Card background */}
      <rect x="2" y="6" width="40" height="34" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Top dots */}
      <circle cx="10" cy="14" r="2" fill="#1e293b" />
      <circle cx="16" cy="14" r="2" fill="#1e293b" />
      <circle cx="22" cy="14" r="2" fill="#1e293b" />
      {/* Bar chart */}
      <defs>
        <linearGradient id="bar1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8fb83a" />
          <stop offset="100%" stopColor="#4a7a1e" />
        </linearGradient>
      </defs>
      <rect x="7"  y="22" width="7" height="14" rx="2" fill="url(#bar1)" />
      <rect x="17" y="18" width="7" height="18" rx="2" fill="url(#bar1)" />
      <rect x="27" y="26" width="7" height="10" rx="2" fill="url(#bar1)" />
      {/* Star badge */}
      <circle cx="43" cy="12" r="10" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="43" y="17" textAnchor="middle" fontSize="13" fill="#1e293b">★</text>
    </svg>
  );
}
