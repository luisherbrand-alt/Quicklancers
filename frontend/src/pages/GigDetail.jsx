import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App.jsx';
import { addOrderConversation } from '../store.js';
import OrderPopup from '../components/OrderPopup.jsx';
import './GigDetail.css';

export default function GigDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/gigs/${id}`)
      .then(r => r.json())
      .then(data => { setGig(data); setLoading(false); });
  }, [id]);

  function openOrderPopup() {
    if (!user) { navigate('/login'); return; }
    setShowOrderPopup(true);
  }

  function handleOrder() {
    const orderId = addOrderConversation(user, gig.seller, gig.title);
    setShowOrderPopup(false);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);

    fetch('/api/notify/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sellerUserId: gig.seller.id,
        buyerName: user.name,
        gigTitle: gig.title,
        orderId,
        packageName: pkg.name,
        price: pkg.price,
      }),
    }).catch(() => {});
  }

  function submitReview() {
    if (!reviewRating || !reviewText.trim()) return;
    const newReview = {
      id: Date.now(),
      buyerName: user?.name || 'Anonymous',
      buyerInitials: user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'AN',
      buyerColor: '#1dbf73',
      rating: reviewRating,
      comment: reviewText.trim(),
      date: new Date().toISOString().split('T')[0],
    };
    setGig(g => ({ ...g, reviews: [newReview, ...(g.reviews || [])] }));
    setReviewSubmitted(true);
    setShowReview(false);
    setReviewRating(0);
    setReviewText('');
    setTimeout(() => setReviewSubmitted(false), 4000);
  }

  if (loading) return <div className="page-loading"><div className="spinner" /></div>;
  if (!gig) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Gig not found.</div>;

  const pkg = gig.packages[selectedPackage];

  return (
    <div className="gig-detail">
      {showOrderPopup && (
        <OrderPopup
          gig={gig}
          pkg={pkg}
          buyer={user}
          onClose={() => setShowOrderPopup(false)}
        />
      )}
      <div className="container gig-detail__inner">
        {/* Left */}
        <div className="gig-detail__left">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/browse">Browse</Link>
            <span>›</span>
            <Link to={`/browse/${gig.category}`}>{gig.category.replace(/-/g, ' & ').replace(/\b\w/g, c => c.toUpperCase())}</Link>
          </nav>

          {/* Title */}
          <h1 className="gig-detail__title">{gig.title}</h1>

          {/* Seller row */}
          <div className="gig-seller-row">
            <div className="avatar" style={{ width: 44, height: 44, background: gig.seller.avatarColor, fontSize: 16 }}>
              {gig.seller.initials}
            </div>
            <div className="gig-seller-info">
              <strong>{gig.seller.name}</strong>
              <span className="gig-seller-level">@{gig.seller.username}</span>
            </div>
            <div className="stars gig-seller-rating" style={{ marginLeft: 'auto' }}>
              <span>★</span>
              <span className="rating-value">{gig.rating.toFixed(1)}</span>
              <span className="review-count">({(gig.reviews?.length || 0).toLocaleString()} reviews)</span>
            </div>
          </div>

          {/* Gig image / photo gallery */}
          {gig.photos && gig.photos.length > 0 ? (
            <div className="gig-gallery">
              <div className="gig-gallery__main">
                <img src={gig.photos[activePhoto]} alt={gig.title} />
              </div>
              {gig.photos.length > 1 && (
                <div className="gig-gallery__thumbs">
                  {gig.photos.map((src, i) => (
                    <button
                      key={i}
                      className={`gig-gallery__thumb ${activePhoto === i ? 'active' : ''}`}
                      onClick={() => setActivePhoto(i)}
                    >
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="gig-detail__image" style={{ background: gig.imageColor + '18' }}>
              <span className="gig-detail__image-emoji">{gig.imageEmoji}</span>
              <div className="gig-detail__image-bar" style={{ background: gig.imageColor }} />
            </div>
          )}

          {/* Description */}
          <div className="gig-detail__section">
            <h2 className="gig-detail__section-title">About This Gig</h2>
            <p className="gig-detail__desc">{gig.description}</p>
          </div>

          {/* Tags */}
          <div className="gig-detail__tags">
            {gig.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>

          <div className="divider" />

          {/* Seller Profile */}
          <div className="gig-detail__section">
            <h2 className="gig-detail__section-title">About The Seller</h2>
            <div className="seller-profile-card">
              <div className="seller-profile-top">
                <div className="avatar" style={{ width: 72, height: 72, background: gig.seller.avatarColor, fontSize: 26 }}>
                  {gig.seller.initials}
                </div>
                <div className="seller-profile-info">
                  <h3>{gig.seller.name}</h3>
                  <p>@{gig.seller.username}</p>
                  <div className="stars" style={{ fontSize: 14 }}>
                    <span>★</span>
                    <span className="rating-value">{gig.seller.rating.toFixed(1)}</span>
                    <span className="review-count">({(gig.reviews?.length || 0).toLocaleString()} reviews)</span>
                  </div>
                  {gig.seller.level === 'Top Rated' && (
                    <span className="badge badge-gold" style={{ marginTop: 6 }}>⭐ Top Rated Seller</span>
                  )}
                </div>
              </div>
              <p className="seller-bio">{gig.seller.bio}</p>
              <div className="seller-stats">
                <div className="seller-stat">
                  <span className="seller-stat__label">From</span>
                  <span className="seller-stat__value">{gig.seller.location}</span>
                </div>
                <div className="seller-stat">
                  <span className="seller-stat__label">Member since</span>
                  <span className="seller-stat__value">{gig.seller.memberSince}</span>
                </div>
                <div className="seller-stat">
                  <span className="seller-stat__label">Completed orders</span>
                  <span className="seller-stat__value">{gig.seller.completedOrders?.toLocaleString()}</span>
                </div>
                <div className="seller-stat">
                  <span className="seller-stat__label">Response time</span>
                  <span className="seller-stat__value">{gig.seller.responseTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* Reviews */}
          <div className="gig-detail__section">
            <h2 className="gig-detail__section-title">
              Reviews
              <span className="reviews-count"> ({gig.reviews?.length || 0})</span>
            </h2>
            {(!gig.reviews || gig.reviews.length === 0) && (
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>No reviews yet. Be the first to leave one!</p>
            )}
            {gig.reviews && gig.reviews.length > 0 && (
              <div className="reviews-list">
                {gig.reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="avatar" style={{ width: 36, height: 36, background: review.buyerColor, fontSize: 13 }}>
                        {review.buyerInitials}
                      </div>
                      <div className="review-meta">
                        <strong>{review.buyerName}</strong>
                        <span>{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="stars review-stars" style={{ marginLeft: 'auto' }}>
                        {Array.from({ length: review.rating }).map((_, i) => <span key={i}>★</span>)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right — sticky order card */}
        <div className="gig-detail__right">
          <div className="order-card">
            {/* Package tabs */}
            <div className="order-tabs">
              {gig.packages.map((p, i) => (
                <button
                  key={i}
                  className={`order-tab ${selectedPackage === i ? 'order-tab--active' : ''}`}
                  onClick={() => setSelectedPackage(i)}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Package details */}
            <div className="order-pkg">
              <div className="order-pkg__header">
                <span className="order-pkg__name">{pkg.name}</span>
                <span className="order-pkg__price">${pkg.price}</span>
              </div>
              <p className="order-pkg__desc">{pkg.description}</p>

              <div className="order-pkg__meta">
                <div className="order-meta-item">
                  <span>🕐</span>
                  <span>{pkg.delivery}-day delivery</span>
                </div>
                <div className="order-meta-item">
                  <span>🔄</span>
                  <span>{pkg.revisions === 999 ? 'Unlimited' : pkg.revisions} revision{pkg.revisions !== 1 ? 's' : ''}</span>
                </div>
              </div>

              <ul className="order-features">
                {pkg.features.map((f, i) => (
                  <li key={i} className="order-feature">
                    <span className="order-feature__check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {orderSuccess ? (
                <div className="order-success">
                  ✅ Order placed! We'll notify the seller.
                </div>
              ) : (
                <button className="btn btn-primary btn-lg order-cta" onClick={openOrderPopup}>
                  Continue (${pkg.price})
                </button>
              )}

              <button className="btn btn-outline btn-lg" style={{ width: '100%', marginTop: 10 }} onClick={() => navigate(`/contact-seller/${id}`)}>
                💬 Contact Seller
              </button>

              <button
                className="btn btn-outline btn-lg"
                style={{ width: '100%', marginTop: 10 }}
                onClick={() => { if (!user) { navigate('/login'); return; } setShowReview(r => !r); }}
              >
                ★ Leave a Review
              </button>

              {reviewSubmitted && (
                <div className="order-success" style={{ marginTop: 10 }}>
                  ✅ Thank you for your review!
                </div>
              )}

              {showReview && (
                <div className="review-form">
                  <p className="review-form__label">Your rating</p>
                  <div className="review-stars-input">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        className={`star-btn ${star <= (hoverRating || reviewRating) ? 'star-btn--active' : ''}`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setReviewRating(star)}
                      >★</button>
                    ))}
                  </div>
                  <textarea
                    className="input review-form__textarea"
                    placeholder="Share your experience with this seller..."
                    rows={3}
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: 8 }}
                    onClick={submitReview}
                    disabled={!reviewRating || !reviewText.trim()}
                  >
                    Submit Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
