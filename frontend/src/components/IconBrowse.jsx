export default function IconBrowse({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ib1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3a6b1a" />
          <stop offset="100%" stopColor="#8ab83a" />
        </linearGradient>
      </defs>
      {/* Back card */}
      <rect x="8" y="4" width="38" height="24" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="12" y="9" width="10" height="8" rx="2" fill="#d1d5db" />
      <rect x="26" y="9" width="14" height="3" rx="1.5" fill="#d1d5db" />

      {/* Front card */}
      <rect x="2" y="16" width="42" height="26" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Yellow-green square */}
      <rect x="6" y="20" width="16" height="16" rx="2" fill="#d8e88a" />
      {/* Lines */}
      <rect x="26" y="22" width="14" height="3" rx="1.5" fill="#d1d5db" />
      <rect x="26" y="28" width="14" height="3" rx="1.5" fill="#d1d5db" />

      {/* Search pill badge */}
      <rect x="4" y="38" width="38" height="14" rx="7" fill="url(#ib1)" />
      <circle cx="14" cy="45" r="4" fill="none" stroke="white" strokeWidth="2" />
      <line x1="17" y1="48" x2="20" y2="51" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
