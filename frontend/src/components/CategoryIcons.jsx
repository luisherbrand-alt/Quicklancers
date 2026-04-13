function IconWrapper({ children }) {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="72" height="72" rx="18" fill="#e8f5d0" />
      {children}
    </svg>
  );
}

const stroke = { stroke: '#4a9a20', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };
const strokeThin = { stroke: '#4a9a20', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };

export function IconGraphicsDesign() {
  return (
    <IconWrapper>
      {/* Bounding box with corner handles */}
      <rect x="18" y="18" width="36" height="36" rx="2" {...stroke} />
      {/* Corner squares */}
      <rect x="13" y="13" width="8" height="8" rx="1" fill="#4a9a20" />
      <rect x="51" y="13" width="8" height="8" rx="1" fill="#4a9a20" />
      <rect x="13" y="51" width="8" height="8" rx="1" fill="#4a9a20" />
      <rect x="51" y="51" width="8" height="8" rx="1" fill="#4a9a20" />
      {/* Flower / design mark in center */}
      <path d="M36 28 C36 28 40 32 36 36 C32 32 36 28 36 28Z" fill="#4a9a20" />
      <path d="M36 44 C36 44 32 40 36 36 C40 40 36 44 36 44Z" fill="#4a9a20" />
      <path d="M28 36 C28 36 32 32 36 36 C32 40 28 36 28 36Z" fill="#4a9a20" />
      <path d="M44 36 C44 36 40 40 36 36 C40 32 44 36 44 36Z" fill="#4a9a20" />
      <circle cx="36" cy="36" r="3" fill="#4a9a20" />
    </IconWrapper>
  );
}

export function IconProgrammingTech() {
  return (
    <IconWrapper>
      {/* Monitor screen */}
      <rect x="14" y="16" width="44" height="30" rx="4" {...stroke} />
      {/* Stand */}
      <path d="M29 46 L27 56 M43 46 L45 56" {...strokeThin} />
      <line x1="24" y1="56" x2="48" y2="56" {...stroke} />
      {/* Lines on screen */}
      <line x1="22" y1="26" x2="40" y2="26" {...stroke} />
      <line x1="22" y1="33" x2="38" y2="33" {...stroke} />
      <line x1="22" y1="40" x2="34" y2="40" {...stroke} />
    </IconWrapper>
  );
}

export function IconDigitalMarketing() {
  return (
    <IconWrapper>
      {/* Back speech bubble */}
      <rect x="8" y="10" width="42" height="34" rx="9" {...stroke} />
      <path d="M16 44 L13 54 L28 46" {...stroke} />
      {/* Front speech bubble - semi-transparent so back shows through */}
      <rect x="22" y="26" width="36" height="28" rx="8" fill="rgba(232,245,208,0.7)" {...stroke} />
      <path d="M30 54 L27 62 L42 56" {...stroke} />
      {/* Location pin inside front bubble */}
      <circle cx="40" cy="37" r="5" {...stroke} />
      <path d="M40 42 L40 48" {...stroke} />
    </IconWrapper>
  );
}

export function IconWritingTranslation() {
  return (
    <IconWrapper>
      {/* Back bubble */}
      <rect x="6" y="8" width="38" height="32" rx="8" {...stroke} />
      <path d="M14 40 L10 50 L26 42" {...stroke} />
      {/* Source text lines inside back bubble */}
      <line x1="13" y1="18" x2="30" y2="18" {...stroke} />
      <line x1="22" y1="18" x2="22" y2="30" {...stroke} />
      <line x1="13" y1="25" x2="30" y2="25" {...stroke} />
      {/* Front bubble - semi-transparent, closer overlap */}
      <rect x="26" y="28" width="38" height="32" rx="8" fill="rgba(232,245,208,0.7)" {...stroke} />
      <path d="M34 60 L30 68 L46 62" {...stroke} />
      {/* Big A inside front bubble */}
      <path d="M45 35 L41 53 M45 35 L49 53 M42.5 46 L47.5 46" {...stroke} />
    </IconWrapper>
  );
}

export function IconVideoAnimation() {
  return (
    <IconWrapper>
      {/* Back frame */}
      <rect x="6" y="10" width="42" height="34" rx="6" {...stroke} />
      {/* Front frame - semi-transparent, closer overlap */}
      <rect x="18" y="24" width="46" height="36" rx="6" fill="rgba(232,245,208,0.7)" {...stroke} />
      {/* Play triangle centered in front frame */}
      <path d="M34 34 L34 52 L50 43 Z" fill="#4a9a20" />
    </IconWrapper>
  );
}

export function IconMusicAudio() {
  return (
    <IconWrapper>
      {/* Rounded square background card */}
      <rect x="12" y="12" width="48" height="48" rx="10" {...stroke} />
      {/* Three lines (playlist) */}
      <line x1="20" y1="28" x2="36" y2="28" {...stroke} />
      <line x1="20" y1="36" x2="34" y2="36" {...stroke} />
      <line x1="20" y1="44" x2="32" y2="44" {...stroke} />
      {/* Music note */}
      <path d="M44 22 L44 40" {...stroke} />
      <path d="M44 22 L54 20 L54 34" {...stroke} />
      <circle cx="44" cy="42" r="4" {...stroke} />
      <circle cx="54" cy="36" r="4" {...stroke} />
    </IconWrapper>
  );
}

export function IconBusiness() {
  return (
    <IconWrapper>
      {/* Rounded card background */}
      <rect x="10" y="10" width="52" height="52" rx="14" {...stroke} />
      {/* Center person (bigger) */}
      <circle cx="36" cy="26" r="9" {...stroke} />
      {/* Left person (smaller) */}
      <circle cx="18" cy="30" r="6" {...stroke} />
      {/* Right person (smaller) */}
      <circle cx="54" cy="30" r="6" {...stroke} />
      {/* Body / shoulder curve */}
      <path d="M8 58 Q36 46 64 58" {...stroke} />
    </IconWrapper>
  );
}

export function IconAIServices() {
  return (
    <IconWrapper>
      {/* Image frame */}
      <rect x="12" y="18" width="44" height="36" rx="6" {...stroke} />
      {/* Mountain / landscape inside */}
      <path d="M18 46 L28 32 L36 40 L42 34 L54 46" {...stroke} />
      {/* Sun circle */}
      <circle cx="44" cy="28" r="5" {...stroke} />
      {/* Asterisk / snowflake badge top right */}
      <circle cx="54" cy="18" r="8" fill="#e8f5d0" stroke="#4a9a20" strokeWidth="2" />
      <line x1="54" y1="13" x2="54" y2="23" stroke="#4a9a20" strokeWidth="2" strokeLinecap="round" />
      <line x1="49" y1="18" x2="59" y2="18" stroke="#4a9a20" strokeWidth="2" strokeLinecap="round" />
      <line x1="51" y1="15" x2="57" y2="21" stroke="#4a9a20" strokeWidth="2" strokeLinecap="round" />
      <line x1="57" y1="15" x2="51" y2="21" stroke="#4a9a20" strokeWidth="2" strokeLinecap="round" />
    </IconWrapper>
  );
}

const CATEGORY_ICONS = {
  'graphics-design': IconGraphicsDesign,
  'programming-tech': IconProgrammingTech,
  'digital-marketing': IconDigitalMarketing,
  'writing-translation': IconWritingTranslation,
  'video-animation': IconVideoAnimation,
  'music-audio': IconMusicAudio,
  'business': IconBusiness,
  'ai-services': IconAIServices,
};

export default function CategoryIcon({ slug }) {
  const Icon = CATEGORY_ICONS[slug];
  if (!Icon) return <span style={{ fontSize: 36 }}>📁</span>;
  return <Icon />;
}
