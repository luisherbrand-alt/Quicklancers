import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const sellerExtras = (gig.extras || []).map((e, i) => ({
    id: `seller-${i}`,
    title: e.title,
    desc: '',
    price: parseFloat(e.price) || 0,
  }));

  const allExtras = [...FIXED_EXTRAS, ...sellerExtras];
  const [selected, setSelected] = useState(new Set());
  const [discountInput, setDiscountInput] = useState('');
  const [discount, setDiscount] = useState(null); // { code, percent, label }
  const [discountError, setDiscountError] = useState('');
  const [discountLoading, setDiscountLoading] = useState(false);

  function toggle(id) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const selectedExtras = allExtras.filter(e => selected.has(e.id));
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const subtotal = pkg.price + extrasTotal;
  const discountAmount = discount ? subtotal * (discount.percent / 100) : 0;
  const total = subtotal - discountAmount;

  async function applyDiscount() {
    if (!discountInput.trim()) return;
    setDiscountLoading(true);
    setDiscountError('');
    setDiscount(null);
    try {
      const res = await fetch('/api/validate-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountInput }),
      });
      const data = await res.json();
      if (!res.ok) { setDiscountError(data.message); }
      else { setDiscount(data); }
    } catch {
      setDiscountError('Could not apply code. Try again.');
    }
    setDiscountLoading(false);
  }

  function handleCheckout() {
    const successData = {
      buyerId: buyer.id,
      sellerId: gig.seller.id,
      gigTitle: gig.title,
      packageName: pkg.name,
      price: pkg.price,
    };
    onClose();
    navigate('/checkout', {
      state: {
        total,
        gigTitle: gig.title,
        packageName: pkg.name,
        successData,
      },
    });
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

        {/* Discount code */}
        <div className="order-popup__discount">
          {!discount ? (
            <>
              <div className="order-popup__discount-row">
                <input
                  type="text"
                  className="order-popup__discount-input"
                  placeholder="Discount code"
                  value={discountInput}
                  onChange={e => { setDiscountInput(e.target.value); setDiscountError(''); }}
                  onKeyDown={e => e.key === 'Enter' && applyDiscount()}
                />
                <button
                  className="order-popup__discount-btn"
                  onClick={applyDiscount}
                  disabled={discountLoading || !discountInput.trim()}
                >
                  {discountLoading ? '…' : 'Apply'}
                </button>
              </div>
              {discountError && <p className="order-popup__discount-error">{discountError}</p>}
            </>
          ) : (
            <div className="order-popup__discount-applied">
              <span>🎉 <strong>{discount.code}</strong> — {discount.label}</span>
              <button className="order-popup__discount-remove" onClick={() => { setDiscount(null); setDiscountInput(''); }}>
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="order-popup__divider" />

        <div className="order-popup__total">
          {discount && (
            <div className="order-popup__total-discount">
              <span>Discount ({discount.percent}%)</span>
              <span style={{ color: '#16a34a' }}>−€{discountAmount.toFixed(2)}</span>
            </div>
          )}
          <span>Order total</span>
          <strong>€{total.toFixed(2)}</strong>
        </div>

        <button
          className="btn btn-primary btn-lg order-popup__confirm"
          onClick={handleCheckout}
        >
          Pay with Stripe  €{total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
