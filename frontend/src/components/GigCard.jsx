import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CategoryIcon from './CategoryIcons.jsx';
import './GigCard.css';

function getFavorites() {
  try { return JSON.parse(localStorage.getItem('ql_favorites') || '[]'); } catch { return []; }
}

function saveFavorites(favs) {
  localStorage.setItem('ql_favorites', JSON.stringify(favs));
}

export default function GigCard({ gig }) {
  const startingPrice = gig.packages?.[0]?.price ?? 0;
  const [liked, setLiked] = useState(() => getFavorites().includes(gig.id));

  const toggleLike = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(prev => {
      const favs = getFavorites();
      const next = !prev;
      saveFavorites(next ? [...favs, gig.id] : favs.filter(id => id !== gig.id));
      return next;
    });
  }, [gig.id]);

  return (
    <Link to={`/gig/${gig.id}`} className="gig-card">
      {/* Image */}
      <div className="gig-card__image" style={{ background: gig.imageColor + '18' }}>
        {gig.photos?.[0]
          ? <img src={gig.photos[0]} alt={gig.title} className="gig-card__photo" />
          : <span className="gig-card__emoji"><CategoryIcon slug={gig.category} /></span>
        }

        {/* Heart button */}
        <button
          className={`gig-card__heart ${liked ? 'gig-card__heart--active' : ''}`}
          onClick={toggleLike}
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="gig-card__body">
        {/* Seller */}
        <div className="gig-card__seller">
          <div
            className="avatar"
            style={{ width: 26, height: 26, background: gig.seller?.avatarColor, fontSize: 11 }}
          >
            {gig.seller?.initials}
          </div>
          <span className="gig-card__seller-name">{gig.seller?.name}</span>
          {gig.seller?.level === 'Top Rated' && (
            <span className="badge badge-gold" style={{ fontSize: 10, padding: '2px 6px' }}>
              Top Rated
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="gig-card__title">{gig.title}</h3>

        {/* Rating */}
        <div className="stars gig-card__rating">
          <span>★</span>
          <span className="rating-value">{gig.rating?.toFixed(1)}</span>
          <span className="review-count">({gig.reviewCount?.toLocaleString()})</span>
        </div>
      </div>

      {/* Footer */}
      <div className="gig-card__footer">
        <span className="gig-card__starting">Starting at</span>
        <span className="gig-card__price">${startingPrice}</span>
      </div>
    </Link>
  );
}
