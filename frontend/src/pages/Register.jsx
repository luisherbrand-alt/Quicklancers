import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); setLoading(false); return; }
      setDone(true);
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: '#f0fdf7', border: '2px solid #1dbf73',
            color: '#1dbf73', fontSize: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>✉</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Check your email</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            We sent a verification link to <strong>{form.email}</strong>.<br />
            Click the link in that email to activate your account.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            Already verified? <Link to="/login" className="form-link">Sign in</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">⚡ Quicklancer</Link>
          <h1>Create your account</h1>
          <p>Join thousands of businesses and freelancers</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="input"
              placeholder="Jane Smith"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Free Account'}
          </button>
        </form>

        <p className="auth-terms">
          By joining you agree to our{' '}
          <Link to="/terms" className="form-link">Terms of Service</Link> and{' '}
          <Link to="/privacy-policy" className="form-link">Privacy Policy</Link>.
        </p>

        <p className="auth-footer">
          Already have an account? <Link to="/login" className="form-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
