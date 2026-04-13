import { useState } from 'react';
import './HelpCenter.css';

export default function HelpCenter() {
  const [form, setForm] = useState({ email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="help-page">
      <div className="help-hero">
        <div className="container">
          <h1 className="help-hero__title">Help Center</h1>
          <p className="help-hero__sub">Have a question or issue? Send us a message and we'll get back to you as soon as possible.</p>
        </div>
      </div>

      <div className="container help-body">
        <div className="help-card">
          <h2>Contact Support</h2>
          <p className="help-card__sub">Fill out the form below and our team will respond to your email.</p>

          {status === 'success' && (
            <div className="help-alert help-alert--success">
              ✓ Your message has been sent! We'll get back to you shortly.
            </div>
          )}
          {status === 'error' && (
            <div className="help-alert help-alert--error">
              Something went wrong. Please try again or email us directly at <a href="mailto:Luis.herbrand@gmail.com">Luis.herbrand@gmail.com</a>.
            </div>
          )}

          <form className="help-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Email</label>
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
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="input"
                placeholder="What is your question about?"
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="input"
                placeholder="Describe your issue or question in detail..."
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
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="help-direct">
            <p>Or reach us directly at <a href="mailto:Luis.herbrand@gmail.com">Luis.herbrand@gmail.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
