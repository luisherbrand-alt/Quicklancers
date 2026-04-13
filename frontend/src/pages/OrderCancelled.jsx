import { Link, useNavigate } from 'react-router-dom';

export default function OrderCancelled() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: '#fef2f2', border: '2px solid #dc2626',
          color: '#dc2626', fontSize: 32, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>✕</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Payment cancelled</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
          No charge was made. You can go back and try again whenever you're ready.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>← Go back</button>
          <Link to="/browse" className="btn btn-outline">Browse services</Link>
        </div>
      </div>
    </div>
  );
}
