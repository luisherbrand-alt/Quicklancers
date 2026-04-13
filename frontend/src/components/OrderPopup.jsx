import { useState } from 'react';
import './OrderPopup.css';

const FIXED_EXTRAS = [
  {
    id: 'extra-revision',
    title: 'Extra Revision + 1 Day',
    desc: 'One additional revision round with 1 extra day of delivery time.',
    price: 5.99,
  },
  {
    id: 'extra-review',
    title: 'Add an additional review',
    desc: 'Add an additional review for your seller after delivery.',
    price: 8.99,
  },
];

export default function OrderPopup({ gig, pkg, buyer, onClose }) {
  const sellerExtras = (gig.extras || []).map((e, i) => ({
    id: `seller-${i}`,
    title: e.title,
    desc: '',
    price: parseFloat(e.price) || 0,
  }));

  const allExtras = [...FIXED_EXTRAS, ...sellerExtras];
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function toggle(id) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const selectedExtras = allExtras.filter(e => selected.has(e.id));
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const total = pkg.price + extrasTotal;

  async function handleCheckout() {
    setLoading(true);
    setError('');

    const lineItems = [
      { name: `${gig.title} — ${pkg.name}`, price: pkg.price, quantity: 1 },
      ...selectedExtras.map(e => ({ name: e.title, price: e.price, quantity: 1 })),
    ];

    // Pass order data through so the success page can complete the order
    const successData = {
      buyerId: buyer.id,
      sellerId: gig.seller.id,
      gigTitle: gig.title,
      packageName: pkg.name,
      price: pkg.price,
    };

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItems, gigTitle: gig.title, successData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create checkout');
      // Redirect to Stripe hosted checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="order-popup__backdrop" onClick={onClose}>
      <div className="order-popup" onClick={e => e.stopPropagation()}>

        <div className="order-popup__header">
          <h2>Complete your order</h2>
          <button className="order-popup__close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Service summary */}
        <div className="order-popup__service">
          <div className="order-popup__service-thumb" style={{ background: gig.imageColor + '22' }}>
            {gig.photos?.[0]
              ? <img src={gig.photos[0]} alt="" />
              : <span style={{ fontSize: 28 }}>⭐</span>}
          </div>
          <div className="order-popup__service-info">
            <p className="order-popup__service-title">{gig.title}</p>
            <span className="order-popup__service-pkg">{pkg.name} package</span>
          </div>
          <span className="order-popup__service-price">€{pkg.price}</span>
        </div>

        <div className="order-popup__divider" />

        {/* Extras */}
        <div className="order-popup__extras-header">
          <p>Upgrade your order with extras.</p>
        </div>

        <div className="order-popup__extras">
          {allExtras.map(extra => (
            <label key={extra.id} className={`order-extra ${selected.has(extra.id) ? 'order-extra--selected' : ''}`}>
              <input
                type="checkbox"
                checked={selected.has(extra.id)}
                onChange={() => toggle(extra.id)}
              />
              <div className="order-extra__body">
                <strong>{extra.title}</strong>
                {extra.desc && <span>{extra.desc}</span>}
              </div>
              <span className="order-extra__price">+€{extra.price.toFixed(2)}</span>
            </label>
          ))}
        </div>

        <div className="order-popup__divider" />

        <div className="order-popup__total">
          <span>Order total</span>
          <strong>€{total.toFixed(2)}</strong>
        </div>

        {error && <p className="order-popup__error">{error}</p>}

        <button
          className="btn btn-primary btn-lg order-popup__confirm"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Redirecting to payment…' : `Pay with Stripe  €${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
