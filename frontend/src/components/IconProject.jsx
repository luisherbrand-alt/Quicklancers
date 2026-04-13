export default function IconProject({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ip1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7db83a" />
          <stop offset="100%" stopColor="#3a6b1a" />
        </linearGradient>
      </defs>
      {/* Folder tab */}
      <path d="M4 16 Q4 12 8 12 L22 12 L26 16 L50 16 Q52 16 52 18 L52 48 Q52 50 50 50 L6 50 Q4 50 4 48 Z" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Green image area */}
      <rect x="9" y="22" width="16" height="14" rx="2" fill="url(#ip1)" />
      {/* Heart */}
      <path d="M17 27 C17 25.5 15.5 24 14 25 C12.5 26 12.5 28 14 29.5 L17 32 L20 29.5 C21.5 28 21.5 26 20 25 C18.5 24 17 25.5 17 27 Z" fill="white" />
      {/* Grey block top right */}
      <rect x="29" y="22" width="14" height="8" rx="2" fill="#d1d5db" />
      {/* Yellow-green block bottom right */}
      <rect x="29" y="33" width="14" height="8" rx="2" fill="#d8e88a" />
      {/* Lines */}
      <rect x="9" y="40" width="34" height="2.5" rx="1.5" fill="#e2e8f0" />
      <rect x="9" y="45" width="22" height="2.5" rx="1.5" fill="#e2e8f0" />
      {/* Plus badge */}
      <circle cx="46" cy="16" r="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1="46" y1="12" x2="46" y2="20" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="16" x2="50" y2="16" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
