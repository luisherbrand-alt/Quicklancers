import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../App.jsx';
import './SellerDashboard.css';

export default function SellerDashboard() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const justOnboarded = searchParams.get('onboarded') === '1';

  const [status, setStatus] = useState(null);   // null = loading
  const [loading, setLoading] = useState(true);
  const [onboarding, setOnboarding] = useState(false);
  const [error, setError] = useState('');

  // Fetch live payout status from Stripe via our backend.
  // Always fetched fresh — never cached — so it reflects the current state.
  useEffect(() => {
    if (!user) return;
    fetch(`/api/connect/status/${user.id}`)
      .then(r => r.json())
      .then(data => { setStatus(data); setLoading(false); })
      .catch(() => { setError('Could not load payout status.'); setLoading(false); });
  }, [user?.id]);

  // Start or continue Stripe Connect onboarding.
  // Creates a Connect account if one doesn't exist yet, then redirects to Stripe's hosted form.
  async function handleOnboard() {
    setOnboarding(true);
    setError('');
    try {
      const res = await fetch('/api/connect/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Onboarding failed');
      // Redirect to Stripe's hosted onboarding form.
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setOnboarding(false);
    }
  }

  if (!user) {
    return (
      <div className="sd-page">
        <div className="sd-card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
            You need to be logged in to access your seller dashboard.
          </p>
          <Link to="/login" className="btn btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sd-page">
      <div className="sd-hero">
        <div className="container">
          <h1 className="sd-hero__title">Seller Dashboard</h1>
          <p className="sd-hero__sub">Manage your payouts and Stripe Connect account</p>
        </div>
      </div>

      <div className="container sd-body">

        {/* Success banner after returning from Stripe onboarding */}
        {justOnboarded && (
          <div className="sd-banner sd-banner--success">
            ✓ You've completed the onboarding steps. Stripe may still need to verify your details — check your status below.
          </div>
        )}

        {/* How payouts work */}
        <div className="sd-card">
          <h2>How payouts work</h2>
          <p>
            When a buyer purchases your service, Quicklancers collects the payment via Stripe.
            After deducting a <strong>{10}% platform fee</strong>, the remaining amount is
            automatically transferred to your connected Stripe account. Stripe then pays out
            to your bank account on a rolling basis.
          </p>
          <div className="sd-steps">
            <div className="sd-step">
              <div className="sd-step__num">1</div>
              <div>
                <strong>Connect your account</strong>
                <span>Complete Stripe's onboarding to verify your identity and add a bank account.</span>
              </div>
            </div>
            <div className="sd-step">
              <div className="sd-step__num">2</div>
              <div>
                <strong>Receive orders</strong>
                <span>Buyers purchase your services through Quicklancers checkout.</span>
              </div>
            </div>
            <div className="sd-step">
              <div className="sd-step__num">3</div>
              <div>
                <strong>Get paid</strong>
                <span>90% of each order is automatically transferred to your bank account.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payout status */}
        <div className="sd-card">
          <h2>Payout status</h2>

          {loading && <div className="sd-status sd-status--loading">Loading status…</div>}

          {error && <div className="sd-status sd-status--error">{error}</div>}

          {!loading && !error && status && (
            <>
              {/* Not connected yet */}
              {!status.connected && (
                <div className="sd-status-block">
                  <div className="sd-status-icon sd-status-icon--warning">!</div>
                  <div>
                    <strong>Payouts not set up</strong>
                    <p>Connect a Stripe account to start receiving payments directly to your bank.</p>
                  </div>
                </div>
              )}

              {/* Connected but onboarding incomplete */}
              {status.connected && !status.onboardingComplete && (
                <div className="sd-status-block">
                  <div className="sd-status-icon sd-status-icon--warning">!</div>
                  <div>
                    <strong>Action required</strong>
                    <p>
                      Stripe needs more information before you can receive payouts.
                      Requirements status: <code>{status.requirementsStatus}</code>
                    </p>
                  </div>
                </div>
              )}

              {/* Connected, onboarding complete, but not yet active */}
              {status.connected && status.onboardingComplete && !status.readyToReceivePayments && (
                <div className="sd-status-block">
                  <div className="sd-status-icon sd-status-icon--pending">⏳</div>
                  <div>
                    <strong>Verification in progress</strong>
                    <p>Stripe is verifying your details. This usually takes 1–2 business days.</p>
                  </div>
                </div>
              )}

              {/* Fully active */}
              {status.connected && status.readyToReceivePayments && (
                <div className="sd-status-block">
                  <div className="sd-status-icon sd-status-icon--active">✓</div>
                  <div>
                    <strong>Payouts active</strong>
                    <p>Your Stripe account is verified. You'll automatically receive 90% of every order.</p>
                  </div>
                </div>
              )}

              {/* Account ID display */}
              {status.connected && (
                <div className="sd-account-id">
                  <span>Stripe Account ID</span>
                  <code>{status.accountId}</code>
                </div>
              )}
            </>
          )}

          {error && <p className="sd-error">{error}</p>}

          {/* CTA button */}
          {!loading && status && (
            <div style={{ marginTop: 20 }}>
              {!status.connected && (
                <button className="btn btn-primary btn-lg" onClick={handleOnboard} disabled={onboarding}>
                  {onboarding ? 'Redirecting to Stripe…' : 'Activate Payouts'}
                </button>
              )}
              {status.connected && !status.onboardingComplete && (
                <button className="btn btn-primary" onClick={handleOnboard} disabled={onboarding}>
                  {onboarding ? 'Redirecting…' : 'Complete Onboarding'}
                </button>
              )}
              {status.connected && status.onboardingComplete && !status.readyToReceivePayments && (
                <button className="btn btn-outline" onClick={handleOnboard} disabled={onboarding}>
                  {onboarding ? 'Redirecting…' : 'Check Onboarding'}
                </button>
              )}
              {status.connected && status.readyToReceivePayments && (
                <p className="sd-done-note">
                  Everything is set up. Payments from buyers are automatically transferred to your bank.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Fee breakdown */}
        <div className="sd-card sd-card--subtle">
          <h3>Fee breakdown</h3>
          <div className="sd-fee-table">
            <div className="sd-fee-row">
              <span>Buyer pays</span>
              <span>€100.00</span>
            </div>
            <div className="sd-fee-row sd-fee-row--deduct">
              <span>Quicklancers platform fee (10%)</span>
              <span>−€10.00</span>
            </div>
            <div className="sd-fee-row sd-fee-row--total">
              <span>You receive</span>
              <span>€90.00</span>
            </div>
          </div>
          <p className="sd-fee-note">
            Stripe's standard processing fees (typically ~1.4% + €0.25 for European cards) are
            deducted from your payout separately by Stripe.
          </p>
        </div>

      </div>
    </div>
  );
}
