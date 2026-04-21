import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GigCard from '../components/GigCard.jsx';
import CategoryIcon from '../components/CategoryIcons.jsx';
import './Home.css';

const OPPORTUNITIES = {
  'programming-tech': [
    { title: 'Build a mobile app', type: 'Project based', rate: '$150–$240/hour', hours: '15–25 hours/week', desc: 'Build a mobile application from planning and development through testing and launch.' },
    { title: 'Develop AI applications', type: 'Project based', rate: '$160–$260/hour', hours: '15–25 hours/week', desc: 'In search of a developer who can turn AI use cases into production-ready applications.' },
    { title: 'Build a WordPress website', type: 'Project based', rate: '$160–$200/hour', hours: '12–18 hours/week', desc: 'Design and build a custom WordPress website with clean structure and performance in mind.' },
  ],
  'graphics-design': [
    { title: 'Design a brand identity', type: 'Project based', rate: '$80–$150/hour', hours: '10–20 hours/week', desc: 'Create a cohesive brand identity including logo, color palette, and typography guidelines.' },
    { title: 'UI/UX design for SaaS app', type: 'Project based', rate: '$90–$160/hour', hours: '15–25 hours/week', desc: 'Design intuitive user interfaces and experiences for a growing SaaS product.' },
    { title: 'Social media design package', type: 'Project based', rate: '$60–$100/hour', hours: '8–15 hours/week', desc: 'Produce consistent, on-brand visuals for social media campaigns across all platforms.' },
  ],
  'digital-marketing': [
    { title: 'Run Google Ads campaigns', type: 'Project based', rate: '$70–$130/hour', hours: '10–20 hours/week', desc: 'Set up and manage high-converting Google Ads campaigns to drive targeted traffic.' },
    { title: 'SEO strategy & execution', type: 'Project based', rate: '$80–$140/hour', hours: '12–20 hours/week', desc: 'Develop and implement a full SEO strategy to improve organic rankings and traffic.' },
    { title: 'Social media growth strategy', type: 'Project based', rate: '$60–$110/hour', hours: '10–15 hours/week', desc: 'Grow brand presence and engagement across key social media platforms.' },
  ],
  'writing-translation': [
    { title: 'Write SEO blog content', type: 'Project based', rate: '$40–$80/hour', hours: '8–15 hours/week', desc: 'Produce well-researched, SEO-optimised blog posts that rank and convert readers.' },
    { title: 'Translate website content', type: 'Project based', rate: '$50–$90/hour', hours: '10–20 hours/week', desc: 'Accurately translate website copy into multiple languages while preserving tone and context.' },
    { title: 'Write product descriptions', type: 'Project based', rate: '$35–$70/hour', hours: '5–12 hours/week', desc: 'Craft compelling product descriptions that drive e-commerce conversions.' },
  ],
  'video-animation': [
    { title: 'Create explainer video', type: 'Project based', rate: '$80–$150/hour', hours: '10–20 hours/week', desc: 'Produce a professional animated explainer video that clearly communicates your product value.' },
    { title: 'Edit YouTube videos', type: 'Project based', rate: '$50–$100/hour', hours: '8–15 hours/week', desc: 'Edit raw footage into polished YouTube content with graphics, captions, and sound design.' },
    { title: 'Motion graphics for ads', type: 'Project based', rate: '$90–$160/hour', hours: '12–18 hours/week', desc: 'Design eye-catching motion graphics for digital advertising campaigns.' },
  ],
  'music-audio': [
    { title: 'Compose background music', type: 'Project based', rate: '$60–$120/hour', hours: '8–15 hours/week', desc: 'Create original background music tracks tailored to brand tone and use case.' },
    { title: 'Record voice-over', type: 'Project based', rate: '$50–$90/hour', hours: '5–10 hours/week', desc: 'Deliver professional voice-over recordings for videos, ads, and e-learning content.' },
    { title: 'Mix and master a track', type: 'Project based', rate: '$70–$130/hour', hours: '10–18 hours/week', desc: 'Mix and master audio recordings to industry-standard quality for release.' },
  ],
  'business': [
    { title: 'Build a business strategy', type: 'Project based', rate: '$100–$200/hour', hours: '10–20 hours/week', desc: 'Develop a clear, actionable business strategy to guide growth and market positioning.' },
    { title: 'Financial modelling', type: 'Project based', rate: '$90–$180/hour', hours: '10–15 hours/week', desc: 'Build detailed financial models and forecasts to support decision-making and investor presentations.' },
    { title: 'Market research & analysis', type: 'Project based', rate: '$70–$140/hour', hours: '8–15 hours/week', desc: 'Conduct in-depth market research and competitive analysis to identify opportunities.' },
  ],
  'ai-services': [
    { title: 'Build an AI chatbot', type: 'Project based', rate: '$120–$220/hour', hours: '15–25 hours/week', desc: 'Develop a smart AI-powered chatbot integrated with your product or website.' },
    { title: 'Fine-tune a language model', type: 'Project based', rate: '$150–$260/hour', hours: '15–20 hours/week', desc: 'Fine-tune an LLM on custom data to improve performance for specific business use cases.' },
    { title: 'AI data pipeline setup', type: 'Project based', rate: '$130–$230/hour', hours: '12–20 hours/week', desc: 'Design and implement robust data pipelines to power AI models and analytics systems.' },
  ],
};

const HOW_ICONS = [
  /* 1 — Find Your Service: magnifying glass over document */
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* document */}
    <rect x="22" y="14" width="36" height="44" rx="4" fill="#1e3a5f" />
    <rect x="22" y="14" width="36" height="44" rx="4" stroke="#152d4a" strokeWidth="1.5"/>
    {/* green bar */}
    <rect x="29" y="25" width="20" height="5" rx="2.5" fill="#4a9a20"/>
    <rect x="29" y="25" width="20" height="5" rx="2.5" fill="url(#g1)"/>
    {/* teal bars */}
    <rect x="29" y="34" width="16" height="4" rx="2" fill="#6bbfb0" opacity="0.7"/>
    <rect x="29" y="42" width="12" height="4" rx="2" fill="#6bbfb0" opacity="0.45"/>
    {/* dots */}
    <circle cx="26" cy="34" r="2" fill="#4a9a20"/>
    <circle cx="26" cy="42" r="2" fill="#4a9a20" opacity="0.6"/>
    {/* magnifying glass handle */}
    <line x1="23" y1="49" x2="16" y2="57" stroke="#1e3a5f" strokeWidth="4" strokeLinecap="round"/>
    {/* magnifying glass circle */}
    <circle cx="28" cy="43" r="11" fill="white" stroke="#1e3a5f" strokeWidth="3"/>
    <circle cx="28" cy="43" r="7" fill="#e8f5d0" opacity="0.6"/>
    <defs>
      <linearGradient id="g1" x1="29" y1="25" x2="49" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5aba28"/>
        <stop offset="1" stopColor="#3d8a14"/>
      </linearGradient>
    </defs>
  </svg>,

  /* 2 — Work Together: two speech bubbles */
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* back green bubble */}
    <path d="M22 32 Q22 18 38 18 Q54 18 54 30 Q54 42 38 42 L32 50 L34 42 Q22 42 22 32Z" fill="#4a9a20"/>
    {/* front white bubble */}
    <path d="M14 26 Q14 14 28 14 Q42 14 42 26 Q42 38 28 38 L22 46 L24 38 Q14 38 14 26Z" fill="white" stroke="#d0d0d0" strokeWidth="1.5"/>
    {/* dots inside white bubble */}
    <circle cx="24" cy="26" r="2.5" fill="#3d8a14"/>
    <circle cx="29" cy="26" r="2.5" fill="#3d8a14"/>
    <circle cx="34" cy="26" r="2.5" fill="#3d8a14"/>
  </svg>,

  /* 3 — Get It Done: clipboard with green checkmark badge */
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* clipboard body */}
    <rect x="14" y="18" width="38" height="46" rx="4" fill="white" stroke="#1e3a5f" strokeWidth="2.5"/>
    {/* clipboard top clip */}
    <rect x="23" y="12" width="20" height="12" rx="3" fill="#1e3a5f"/>
    <rect x="27" y="10" width="12" height="7" rx="3.5" fill="#2a4a7f"/>
    {/* check rows */}
    <rect x="25" y="32" width="16" height="3.5" rx="1.75" fill="#6bbfb0" opacity="0.6"/>
    <rect x="25" y="40" width="12" height="3.5" rx="1.75" fill="#6bbfb0" opacity="0.45"/>
    <polyline points="20,33.5 22.5,36 27,31" stroke="#4a9a20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <polyline points="20,41.5 22.5,44 27,39" stroke="#4a9a20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {/* green checkmark badge */}
    <circle cx="46" cy="52" r="14" fill="#4a9a20"/>
    <circle cx="46" cy="52" r="13" fill="url(#g2)"/>
    <polyline points="40,52 44,56 52,47" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <defs>
      <linearGradient id="g2" x1="36" y1="40" x2="56" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5aba28"/>
        <stop offset="1" stopColor="#3a8010"/>
      </linearGradient>
    </defs>
  </svg>,
];

const HOW_STEPS = [
  { title: 'Find Your Service', desc: 'Browse thousands of professional services or search for what you need.' },
  { title: 'Work Together', desc: 'Chat with freelancers, share details, and place your order securely.' },
  { title: 'Get It Done', desc: 'Receive your deliverables and approve when satisfied. Pay safely.' },
];

const TESTIMONIALS = [
  { name: 'Rachel K.', role: 'Startup Founder', text: 'Quicklancer helped me find an amazing developer in 2 hours. The quality was outstanding and the whole process was super smooth.', rating: 5, avatarColor: '#6366f1', initials: 'RK' },
  { name: 'Marcus T.', role: 'Marketing Director', text: 'We\'ve hired 20+ freelancers through Quicklancer. Consistent quality, great communication, and the platform makes billing effortless.', rating: 5, avatarColor: '#10b981', initials: 'MT' },
  { name: 'Anya S.', role: 'Small Business Owner', text: 'Got my logo, website copy, and social media kit done through Quicklancer. Saved me thousands compared to agencies!', rating: 5, avatarColor: '#f59e0b', initials: 'AS' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [featuredGigs, setFeaturedGigs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeOppCategory, setActiveOppCategory] = useState('programming-tech');
  const navigate = useNavigate();

  const OPP_CATEGORIES = [
    { slug: 'programming-tech', name: 'Programming & Tech' },
    { slug: 'graphics-design', name: 'Graphics & Design' },
    { slug: 'digital-marketing', name: 'Digital Marketing' },
    { slug: 'writing-translation', name: 'Writing & Translation' },
    { slug: 'video-animation', name: 'Video & Animation' },
    { slug: 'music-audio', name: 'Music & Audio' },
    { slug: 'business', name: 'Business' },
    { slug: 'ai-services', name: 'AI Services' },
  ];

  useEffect(() => {
    if (window.location.hash === '#how-it-works') {
      const el = document.getElementById('how-it-works');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, []);

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/gigs').then(r => r.json()),
      fetch('/api/stats').then(r => r.json()),
    ]).then(([cats, gigs, s]) => {
      setCategories(cats);
      setFeaturedGigs(gigs.slice(0, 8));
      setStats(s);
      setLoading(false);
    });
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
  }

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__content container">
          <h1 className="hero__title">
            Find the perfect <span className="hero__accent">freelance</span><br />
            services for your business
          </h1>
          <div className="hero__guarantee">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            100% Cashback Guarantee — Not happy? Get your money back.
          </div>
          <p className="hero__sub">
            Trusted by 70,000+ businesses. Top talent, on demand.
          </p>
          <form className="hero__search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for any service… e.g. logo design, React developer"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="hero__search-input"
            />
            <button type="submit" className="hero__search-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Search
            </button>
          </form>
          <div className="hero__popular">
            <span>Popular:</span>
            {['Logo Design', 'Website', 'SEO', 'React Developer', 'Video Editing'].map(t => (
              <button key={t} className="hero__tag" onClick={() => navigate(`/browse?search=${encodeURIComponent(t)}`)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="hero__overlay" />
      </section>


      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore Categories</h2>
            <Link to="/browse" className="btn btn-outline btn-sm">View all</Link>
          </div>
          {loading ? (
            <div className="spinner" />
          ) : (
            <div className="category-grid">
              {categories.map(cat => (
                <Link key={cat.id} to={`/browse/${cat.slug}`} className="category-card">
                  <span className="category-card__icon"><CategoryIcon slug={cat.slug} /></span>
                  <span className="category-card__name">{cat.name}</span>
                  <span className="category-card__count">{cat.count.toLocaleString()} services</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Gigs */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Services</h2>
            <Link to="/browse" className="btn btn-outline btn-sm">Browse all</Link>
          </div>
          {loading ? (
            <div className="spinner" />
          ) : (
            <div className="gig-grid">
              {featuredGigs.map(gig => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Opportunities */}
      <section className="section opportunities-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 8 }}>
            <div>
              <h2 className="section-title">Opportunities for every expert.</h2>
              <p className="opp-subtitle">Find yours.</p>
            </div>
          </div>
          <div className="opp-tabs">
            {OPP_CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                className={`opp-tab ${activeOppCategory === cat.slug ? 'opp-tab--active' : ''}`}
                onClick={() => setActiveOppCategory(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="opp-cards">
            {(OPPORTUNITIES[activeOppCategory] || []).map((opp, i) => (
              <div key={i} className="opp-card">
                <span className="opp-card__type">{opp.type}</span>
                <h3 className="opp-card__title">{opp.title}</h3>
                <p className="opp-card__desc">{opp.desc}</p>
                <div className="opp-card__meta">
                  <span className="opp-card__rate">{opp.rate}</span>
                  <span className="opp-card__hours">{opp.hours}</span>
                </div>
                <button
                  className="btn btn-outline btn-sm opp-card__btn"
                  onClick={() => navigate(`/browse/${activeOppCategory}`)}
                >
                  Browse similar services →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section how-it-works">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>
            How Quicklancer Works
          </h2>
          <div className="how-grid">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="how-card">
                <div className="how-card__icon">{HOW_ICONS[i]}</div>
                <div className="how-card__step">0{i + 1}</div>
                <h3 className="how-card__title">{step.title}</h3>
                <p className="how-card__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by banner */}
      <section className="trusted-banner">
        <div className="container">
          <p className="trusted-banner__label">Trusted by leading companies</p>
          <div className="trusted-banner__logos">
            {['Google', 'Spotify', 'Shopify', 'Netflix', 'Airbnb', 'Stripe'].map(co => (
              <span key={co} className="trusted-logo">{co}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>
            What Our Clients Say
          </h2>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="avatar" style={{ width: 40, height: 40, background: t.avatarColor }}>
                    {t.initials}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-inner">
          <h2 className="cta-title">Ready to get started?</h2>
          <p className="cta-sub">Join over 70,000 businesses growing with Quicklancer</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">Start For Free</Link>
            <Link to="/browse" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
