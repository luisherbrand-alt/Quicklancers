import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../App.jsx';
import { sendChatMessage } from '../store.js';
import './HelpCenter.css';

export default function ContactSeller() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [form, setForm] = useState({ message: '' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    fetch(`/api/gigs/${id}`)
      .then(r => r.json())
      .then(setGig);
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.message.trim() || !gig) return;
    if (!user) { navigate('/login'); return; }

    sendChatMessage(user, gig.seller, form.message.trim());

    setStatus('success');
    setForm({ message: '' });
    setTimeout(() => navigate('/inbox'), 1200);
  }

  return (
    <div className="help-page">
      <div className="help-hero">
        <div className="container">
          <h1 className="help-hero__title">Contact Seller</h1>
          <p className="help-hero__sub">
            {gig ? `Send a message to ${gig.seller.name} about "${gig.title}"` : 'Send a message to the seller.'}
          </p>
        </div>
      </div>

      <div className="container help-body">
        <div className="help-card">
          {gig && (
            <div className="contact-seller-info">
              <div className="avatar" style={{ width: 48, height: 48, background: gig.seller.avatarColor, fontSize: 18, flexShrink: 0 }}>
                {gig.seller.initials}
              </div>
              <div>
                <strong>{gig.seller.name}</strong>
                <span>@{gig.seller.username}</span>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="help-alert help-alert--success">
              ✓ Message sent! Redirecting to your inbox…
            </div>
          )}

          <form className="help-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Message</label>
              <textarea
                className="input"
                placeholder="Describe your requirements or questions in detail..."
                rows={6}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                style={{ resize: 'vertical' }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={status === 'success' || !form.message.trim()}
            >
              Send Message
            </button>
            <button
              type="button"
              className="btn btn-outline btn-lg"
              style={{ width: '100%' }}
              onClick={() => navigate(-1)}
            >
              ← Back to Gig
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
