import { useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { addOrderConversation } from '../store.js';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const completed = useRef(false);

  useEffect(() => {
    if (completed.current) return;
    completed.current = true;

    try {
      const raw = searchParams.get('data');
      if (!raw) return;
      const { buyerId, sellerId, gigTitle, packageName, price } = JSON.parse(decodeURIComponent(raw));

      // Reconstruct minimal user objects to create the conversation + notifications
      const buyer = { id: buyerId, name: 'You' };
      const seller = { id: sellerId, name: 'Seller', avatarColor: '#1dbf73', initials: 'SE' };

      const orderId = addOrderConversation(buyer, seller, gigTitle);

      // Email the seller
      fetch('/api/notify/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sellerUserId: sellerId, buyerName: 'A buyer', gigTitle, orderId, packageName, price }),
      }).catch(() => {});
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: '#f0fdf7', border: '2px solid #1dbf73',
          color: '#1dbf73', fontSize: 32, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>✓</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Payment successful!</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
          Your order has been placed and the seller has been notified. You can track your conversation in the Inbox.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/inbox" className="btn btn-primary">Go to Inbox</Link>
          <Link to="/browse" className="btn btn-outline">Browse more services</Link>
        </div>
      </div>
    </div>
  );
}
