import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MockCheckout.css';

export default function MockCheckout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { total = 0, gigTitle = 'Service', packageName = 'Standard', successData = {} } = state || {};

  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paying, setPaying] = useState(false);

  function formatCard(val) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  function formatExpiry(val) {
    const v = val.replace(/\D/g, '').slice(0, 4);
    return v.length >= 3 ? v.slice(0, 2) + ' / ' + v.slice(2) : v;
  }

  function handlePay(e) {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      navigate('/order-success', { state: successData });
    }, 1800);
  }

  const isValid = card.replace(/\s/g, '').length === 16 && expiry.length >= 4 && cvc.length >= 3 && name.trim() && email.trim();

  return (
    <div className="mck-page">
      {/* Left panel — order summary */}
      <div className="mck-summary">
        <div className="mck-summary__inner">
          <div className="mck-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#635bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Quicklancers</span>
          </div>

          <div className="mck-summary__amount">
            <span>€{Number(total).toFixed(2)}</span>
          </div>

          <div className="mck-summary__label">{gigTitle}</div>

          <div className="mck-summary__divider" />

          <div className="mck-summary__line">
            <span>{packageName} package</span>
            <span>€{Number(total).toFixed(2)}</span>
          </div>
          <div className="mck-summary__line mck-summary__line--total">
            <span>Total due today</span>
            <strong>€{Number(total).toFixed(2)}</strong>
          </div>

          <div className="mck-summary__divider" />

          <div className="mck-summary__secure">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Secured by <strong>Stripe</strong>
          </div>
        </div>
      </div>

      {/* Right panel — payment form */}
      <div className="mck-form-wrap">
        <div className="mck-form-inner">
          <h2 className="mck-form__title">Pay with card</h2>

          <form onSubmit={handlePay} autoComplete="off">
            <div className="mck-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mck-input"
              />
            </div>

            <div className="mck-field">
              <label>Card information</label>
              <div className="mck-card-group">
                <div className="mck-card-number-wrap">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 1234 1234 1234"
                    value={card}
                    onChange={e => setCard(formatCard(e.target.value))}
                    className="mck-input mck-input--card"
                  />
                  <div className="mck-card-icons">
                    <svg width="34" height="22" viewBox="0 0 34 22" fill="none"><rect width="34" height="22" rx="4" fill="#1A1F71"/><rect x="2" y="7" width="30" height="3" fill="#F7B600"/><rect x="2" y="13" width="14" height="3" rx="1" fill="#fff" opacity=".4"/></svg>
                    <svg width="34" height="22" viewBox="0 0 34 22" fill="none"><rect width="34" height="22" rx="4" fill="#252525"/><circle cx="13" cy="11" r="7" fill="#EB001B"/><circle cx="21" cy="11" r="7" fill="#F79E1B"/><path d="M17 5.8a7 7 0 0 1 0 10.4A7 7 0 0 1 17 5.8z" fill="#FF5F00"/></svg>
                  </div>
                </div>
                <div className="mck-card-row2">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={expiry}
                    onChange={e => setExpiry(formatExpiry(e.target.value))}
                    className="mck-input mck-input--expiry"
                  />
                  <div className="mck-cvc-wrap">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="CVC"
                      value={cvc}
                      onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="mck-input mck-input--cvc"
                    />
                    <svg className="mck-cvc-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mck-field">
              <label>Name on card</label>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mck-input"
              />
            </div>

            <button
              type="submit"
              className="mck-pay-btn"
              disabled={!isValid || paying}
            >
              {paying ? (
                <span className="mck-pay-btn__loading">
                  <span className="mck-spinner" />
                  Processing…
                </span>
              ) : (
                `Pay €${Number(total).toFixed(2)}`
              )}
            </button>
          </form>

          <div className="mck-footer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Payments are processed securely by Stripe. Your card details are never stored.
          </div>
        </div>
      </div>
    </div>
  );
}
