import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import GigCard from '../components/GigCard.jsx';
import CategoryIcon from '../components/CategoryIcons.jsx';
import './Browse.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'Best Match' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

const CATEGORY_META = {
  'programming-tech':   { tagline: 'Turn your ideas into powerful software.' },
  'graphics-design':    { tagline: 'Impress with unique, standout designs.' },
  'digital-marketing':  { tagline: 'Grow your brand and reach more people.' },
  'writing-translation':{ tagline: 'Words that connect, inform and convert.' },
  'video-animation':    { tagline: 'Stories and visuals worth watching.' },
  'music-audio':        { tagline: 'Sound that sets the perfect mood.' },
  'business':           { tagline: 'Strategy and insight that drive results.' },
  'ai-services':        { tagline: 'Build smarter products with AI.' },
};

function CategoryBanner({ slug, name }) {
  const meta = CATEGORY_META[slug];
  if (!meta) return null;
  return (
    <div className="cat-banner">
      {/* Left decorations */}
      <svg className="cat-banner__deco cat-banner__deco--left" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* grid of squares */}
        {[0,1,2,3].map(row => [0,1,2,3].map(col => (
          <rect key={`${row}-${col}`} x={col*38+8} y={row*38+8} width="28" height="28"
            rx="3" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="none" />
        )))}
        {/* large arc bottom-left */}
        <circle cx="0" cy="260" r="130" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />
        <circle cx="0" cy="260" r="80" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
      </svg>

      {/* Right decorations */}
      <svg className="cat-banner__deco cat-banner__deco--right" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* diamond outline */}
        <rect x="155" y="18" width="42" height="42" rx="3" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" transform="rotate(45 176 39)" />
        <rect x="165" y="24" width="26" height="26" rx="2" stroke="rgba(255,255,255,0.10)" strokeWidth="1" fill="none" transform="rotate(45 178 37)" />
        {/* large arc bottom-right */}
        <circle cx="260" cy="260" r="140" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" fill="rgba(74,154,32,0.18)" />
        <circle cx="260" cy="260" r="90" stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="rgba(74,154,32,0.10)" />
        {/* small squares top-right */}
        <rect x="60" y="10" width="22" height="22" rx="2" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" />
        <rect x="90" y="20" width="14" height="14" rx="2" stroke="rgba(255,255,255,0.10)" strokeWidth="1" fill="none" />
      </svg>

      <div className="cat-banner__content">
        <h1 className="cat-banner__title">{name}</h1>
        <p className="cat-banner__tagline">{meta.tagline}</p>
        <a className="cat-banner__btn" href="/#how-it-works">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8"/>
            <polygon points="10,8 16,12 10,16" fill="currentColor"/>
          </svg>
          How Quicklancer Works
        </a>
      </div>
    </div>
  );
}

export default function Browse() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [gigs, setGigs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('default');
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [activeCategory, setActiveCategory] = useState(category || 'all');

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== 'all') params.set('category', activeCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (sort && sort !== 'default') params.set('sort', sort);

    fetch(`/api/gigs?${params}`)
      .then(r => r.json())
      .then(data => { setGigs(data); setLoading(false); });
  }, [activeCategory, searchQuery, sort]);

  useEffect(() => {
    if (category) setActiveCategory(category);
    else setActiveCategory('all');
  }, [category]);

  function handleSearch(e) {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (localSearch.trim()) next.set('search', localSearch.trim());
    else next.delete('search');
    setSearchParams(next);
  }

  function handleCategoryClick(slug) {
    setActiveCategory(slug);
    setSearchParams({});
  }

  const currentCat = categories.find(c => c.slug === activeCategory);
  const showBanner = activeCategory !== 'all' && !searchQuery && !!CATEGORY_META[activeCategory];

  return (
    <div className="browse">
      {/* Category banner */}
      {showBanner && (
        <CategoryBanner
          slug={activeCategory}
          name={currentCat?.name || ''}
        />
      )}

      {/* Plain header for All / search */}
      {!showBanner && (
        <div className="browse__header">
          <div className="container browse__header-inner">
            <div>
              <h1 className="browse__title">
                {searchQuery ? `Results for "${searchQuery}"` : 'Browse Services'}
              </h1>
              <p className="browse__sub">{gigs.length} services available</p>
            </div>
            <form className="browse__searchbar" onSubmit={handleSearch}>
              <input
                type="text"
                className="input"
                placeholder="Search services..."
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                style={{ borderRadius: '4px 0 0 4px' }}
              />
              <button type="submit" className="btn btn-primary" style={{ borderRadius: '0 4px 4px 0' }}>
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search bar below banner */}
      {showBanner && (
        <div className="browse__header browse__header--below-banner">
          <div className="container browse__header-inner">
            <p className="browse__sub">{loading ? '' : `${gigs.length} services available`}</p>
            <form className="browse__searchbar" onSubmit={handleSearch}>
              <input
                type="text"
                className="input"
                placeholder={`Search in ${currentCat?.name || 'this category'}...`}
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                style={{ borderRadius: '4px 0 0 4px' }}
              />
              <button type="submit" className="btn btn-primary" style={{ borderRadius: '0 4px 4px 0' }}>
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="container browse__body">
        {/* Sidebar */}
        <aside className="browse__sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Category</h3>
            <ul className="sidebar-list">
              <li>
                <button
                  className={`sidebar-item ${activeCategory === 'all' ? 'sidebar-item--active' : ''}`}
                  onClick={() => handleCategoryClick('all')}
                >
                  All Categories
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    className={`sidebar-item ${activeCategory === cat.slug ? 'sidebar-item--active' : ''}`}
                    onClick={() => handleCategoryClick(cat.slug)}
                  >
                    <span className="sidebar-item__icon"><CategoryIcon slug={cat.slug} /></span>
                    {cat.name}
                    <span className="sidebar-item__count">{cat.count.toLocaleString()}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <div className="browse__main">
          {/* Toolbar */}
          <div className="browse__toolbar">
            <span className="browse__count">
              {loading ? '...' : `${gigs.length} result${gigs.length !== 1 ? 's' : ''}`}
            </span>
            <div className="browse__sort">
              <label className="sort-label">Sort by</label>
              <select
                className="select"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="page-loading"><div className="spinner" /></div>
          ) : gigs.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
              <h3>No services found</h3>
              <p>Try adjusting your search or browse other categories</p>
              <Link to="/browse" className="btn btn-primary" style={{ marginTop: 20 }}>
                Browse all services
              </Link>
            </div>
          ) : (
            <div className="gig-grid">
              {gigs.map(gig => <GigCard key={gig.id} gig={gig} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
