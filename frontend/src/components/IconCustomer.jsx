export default function IconCustomer({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cg1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7db83a" />
          <stop offset="100%" stopColor="#3a6b2a" />
        </linearGradient>
      </defs>
      {/* Back card (grey) */}
      <rect x="4" y="10" width="32" height="40" rx="4" fill="#d1d5db" />
      {/* Front card (white) */}
      <rect x="9" y="5" width="32" height="40" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      {/* Green image area */}
      <rect x="9" y="5" width="32" height="24" rx="4" fill="url(#cg1)" />
      <rect x="9" y="21" width="32" height="8" fill="url(#cg1)" />
      {/* Magnifying glass */}
      <circle cx="25" cy="16" r="6" stroke="white" strokeWidth="2.5" fill="none" />
      <line x1="29.2" y1="20.2" x2="34" y2="25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Text lines */}
      <rect x="13" y="33" width="20" height="3" rx="1.5" fill="#d1d5db" />
      <rect x="13" y="39" width="14" height="3" rx="1.5" fill="#d1d5db" />
      {/* Star badge */}
      <circle cx="43" cy="43" r="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x="43" y="47" textAnchor="middle" fontSize="10" fill="#1e293b">★</text>
    </svg>
  );
}
