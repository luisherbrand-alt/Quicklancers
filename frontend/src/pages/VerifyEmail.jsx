import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App.jsx';
import './Auth.css';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const called = useRef(false);
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setErrorMsg('No verification token found. Please use the link from your email.');
      return;
    }

    fetch(`/api/auth/verify-email?token=${token}`)
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          setStatus('error');
          setErrorMsg(data.message || 'Verification failed.');
          return;
        }
        login(data.user);
        setStatus('success');
        setTimeout(() => navigate('/onboarding'), 2000);
      })
      .catch(() => {
        setStatus('error');
        setErrorMsg('Network error. Please try again.');
      });
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>

        {status === 'verifying' && (
          <>
            <div style={{ fontSize: 36, marginBottom: 16 }}>⏳</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Verifying your email…</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Just a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#f0fdf7', border: '2px solid #1dbf73',
              color: '#1dbf73', fontSize: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>✓</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Email verified!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
              Your account is now active. Taking you to setup…
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#fef2f2', border: '2px solid #dc2626',
              color: '#dc2626', fontSize: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>✕</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Verification failed</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              {errorMsg}
            </p>
            <Link to="/register" className="btn btn-primary">Create a new account</Link>
          </>
        )}

      </div>
    </div>
  );
}
