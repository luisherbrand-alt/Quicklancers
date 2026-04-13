export default function IconSpecific({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="is1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8ab83a" />
          <stop offset="100%" stopColor="#3a6b1a" />
        </linearGradient>
        <linearGradient id="is2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8e88a" />
          <stop offset="100%" stopColor="#a0bc3a" />
        </linearGradient>
      </defs>
      {/* Back card */}
      <rect x="10" y="4" width="36" height="22" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="14" y="9" width="10" height="8" rx="2" fill="#d1d5db" />
      <rect x="27" y="9" width="14" height="3" rx="1.5" fill="#d1d5db" />

      {/* Middle card */}
      <rect x="6" y="18" width="38" height="22" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="10" y="23" width="12" height="10" rx="2" fill="url(#is2)" />
      <rect x="26" y="23" width="14" height="3" rx="1.5" fill="#d1d5db" />
      <rect x="26" y="29" width="10" height="3" rx="1.5" fill="#d1d5db" />

      {/* Front card */}
      <rect x="2" y="32" width="42" height="22" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Green square with sun/star */}
      <rect x="6" y="36" width="16" height="14" rx="2" fill="url(#is1)" />
      {/* Sun star shape */}
      <path d="M14 40 L15 43 L18 43 L15.5 45 L16.5 48 L14 46 L11.5 48 L12.5 45 L10 43 L13 43 Z" fill="white" />
      {/* Lines */}
      <rect x="26" y="37" width="14" height="3" rx="1.5" fill="#d1d5db" />
      <rect x="26" y="43" width="10" height="3" rx="1.5" fill="#d1d5db" />
    </svg>
  );
}
