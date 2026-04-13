import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../App.jsx';
import IconUpload from '../components/IconUpload.jsx';
import IconPencil from '../components/IconPencil.jsx';
import IconCustomer from '../components/IconCustomer.jsx';
import IconFreelancer from '../components/IconFreelancer.jsx';
import IconBusiness from '../components/IconBusiness.jsx';
import IconSide from '../components/IconSide.jsx';
import IconPersonal from '../components/IconPersonal.jsx';
import IconTeam1 from '../components/IconTeam1.jsx';
import IconTeam2 from '../components/IconTeam2.jsx';
import IconTeam3 from '../components/IconTeam3.jsx';
import IconTeam4 from '../components/IconTeam4.jsx';
import IconProject from '../components/IconProject.jsx';
import IconSpecific from '../components/IconSpecific.jsx';
import IconBrowse from '../components/IconBrowse.jsx';
import './Onboarding.css';

const STEPS_CUSTOMER = ['username', 'role', 'purpose', 'teamsize', 'intent'];
const STEPS_FREELANCER = ['username', 'role', 'freelancer-start', 'freelancer-detail'];

export default function Onboarding() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addService = searchParams.get('add') === '1';

  // When adding another service, skip straight to the method-choice step
  const [step, setStep] = useState(addService ? 2 : 0);
  const [answers, setAnswers] = useState({
    username: user?.username || user?.name?.toLowerCase().replace(/\s/g, '_') || '',
    role: addService ? 'freelancer' : '',
    purpose: '',
    teamSize: '',
    intent: '',
    freelancerMethod: '',
    category: '',
    bio: '',
    skills: '',
    hourlyRate: '',
    title: '',
    cvFile: null,
    linkedinUrl: '',
    photos: [],
    extras: [{ title: '', price: '' }, { title: '', price: '' }],
  });
  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

  function handlePhotoUpload(files) {
    const remaining = 5 - answers.photos.length;
    const toProcess = [...files].slice(0, remaining);
    toProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setAnswers(a => ({ ...a, photos: [...a.photos, reader.result].slice(0, 5) }));
      };
      reader.readAsDataURL(file);
    });
  }

  function removePhoto(index) {
    setAnswers(a => ({ ...a, photos: a.photos.filter((_, i) => i !== index) }));
  }

  const steps = answers.role === 'freelancer' ? STEPS_FREELANCER : STEPS_CUSTOMER;
  const currentStep = steps[step];
  const isLast = step === steps.length - 1;
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function select(key, value) {
    setAnswers(a => ({ ...a, [key]: value }));
  }

  async function next() {
    if (isLast) {
      const updated = { ...user, username: answers.username, role: answers.role, onboarded: true };
      login(updated);

      // Submit freelancer gig to backend
      if (answers.role === 'freelancer' && answers.category) {
        setSubmitting(true);
        setSubmitError('');
        try {
          const res = await fetch('/api/freelancer/gig', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user.id,
              name: user.name,
              username: answers.username,
              category: answers.category,
              title: answers.title,
              bio: answers.bio || answers.linkedinUrl || 'Freelancer profile',
              skills: answers.skills,
              hourlyRate: answers.hourlyRate,
              method: answers.freelancerMethod,
              linkedinUrl: answers.linkedinUrl,
              photos: answers.photos,
              extras: answers.extras.filter(e => e.title.trim() && e.price),
            }),
          });
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            setSubmitError(err.message || `Server error (${res.status}). Please restart the backend and try again.`);
            setSubmitting(false);
            return;
          }
        } catch (e) {
          setSubmitError('Could not reach the server. Is the backend running?');
          setSubmitting(false);
          return;
        }
        setSubmitting(false);
      }

      navigate('/browse/' + (answers.category || ''));
    } else {
      setStep(s => s + 1);
    }
  }

  function back() {
    setStep(s => s - 1);
  }

  function canContinue() {
    if (currentStep === 'username') return answers.username.trim().length >= 3;
    if (currentStep === 'role') return !!answers.role;
    if (currentStep === 'purpose') return !!answers.purpose;
    if (currentStep === 'teamsize') return !!answers.teamSize;
    if (currentStep === 'intent') return !!answers.intent;
    if (currentStep === 'freelancer-start') return !!answers.freelancerMethod;
    if (currentStep === 'freelancer-detail') {
      if (!answers.category || answers.title.trim().length < 5) return false;
      if (answers.freelancerMethod === 'upload') return !!(answers.cvFile || answers.linkedinUrl.trim());
      if (answers.freelancerMethod === 'manual') return answers.bio.trim().length >= 10 && answers.skills.trim().length >= 2;
    }
    return false;
  }

  return (
    <div className="onboarding-page">
      <div className={`onboarding-card ${currentStep === 'freelancer-start' ? 'onboarding-card--hero' : ''}`}>
        <div className="onboarding-logo"><img src="/logo-new.jpeg" alt="Quicklancers" style={{ height: '36px', objectFit: 'contain', borderRadius: '8px' }} /></div>

        <div className="onboarding-progress">
          {steps.map((_, i) => (
            <div key={i} className={`progress-dot ${i <= step ? 'active' : ''}`} />
          ))}
        </div>

        {currentStep === 'username' && (
          <div className="onboarding-step">
            <h1>Choose your username</h1>
            <p>This is how others will see you on Quicklancers</p>
            <div className="form-group" style={{ marginTop: 24 }}>
              <label className="form-label">Username</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. john_doe"
                value={answers.username}
                onChange={e => select('username', e.target.value.replace(/\s/g, '_').toLowerCase())}
                autoFocus
              />
              {answers.username && answers.username.length < 3 && (
                <span className="field-hint">At least 3 characters</span>
              )}
            </div>
          </div>
        )}

        {currentStep === 'role' && (
          <div className="onboarding-step">
            <h1>What brings you to Quicklancers?</h1>
            <p>We'll personalise your experience based on your answer</p>
            <div className="option-list">
              <button
                className={`option-card ${answers.role === 'customer' ? 'selected' : ''}`}
                onClick={() => select('role', 'customer')}
              >
                <div className="option-icon"><IconCustomer size={52} /></div>
                <div className="option-text">
                  <strong>I'm a Customer</strong>
                  <span>I want to order freelance services</span>
                </div>
                <div className="option-check" />
              </button>
              <button
                className={`option-card ${answers.role === 'freelancer' ? 'selected' : ''}`}
                onClick={() => select('role', 'freelancer')}
              >
                <div className="option-icon"><IconFreelancer size={52} /></div>
                <div className="option-text">
                  <strong>I'm a Freelancer</strong>
                  <span>I want to offer my services</span>
                </div>
                <div className="option-check" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 'freelancer-start' && (
          <div className="onboarding-step">
            <div className="fl-hero">
              <h1>Grow your brand.<br />Work with clients worldwide.</h1>
              <p>Start by creating a profile that makes you stand out.</p>
            </div>
            <div className="fl-method-list">
              <button
                className={`fl-method-card ${answers.freelancerMethod === 'upload' ? 'selected' : ''}`}
                onClick={() => select('freelancerMethod', 'upload')}
              >
                <div className="fl-method-card__top">
                  <div className="fl-method-card__icon"><IconUpload size={36} /></div>
                  <div className="fl-method-card__text">
                    <strong>Upload your experience</strong>
                    <span className="fl-method-card__time">8 min</span>
                  </div>
                  <div className={`fl-method-card__chevron ${answers.freelancerMethod === 'upload' ? 'open' : ''}`}>›</div>
                </div>
                {answers.freelancerMethod === 'upload' && (
                  <div className="fl-method-card__body">
                    <p>Import your profile from LinkedIn in 3 easy steps:</p>
                    <ol className="fl-steps">
                      <li>Go to your profile on <strong>LinkedIn</strong></li>
                      <li>Click on <strong>Resources</strong></li>
                      <li>Click on <strong>Save to PDF</strong></li>
                    </ol>
                  </div>
                )}
              </button>
              <button
                className={`fl-method-card ${answers.freelancerMethod === 'manual' ? 'selected' : ''}`}
                onClick={() => select('freelancerMethod', 'manual')}
              >
                <div className="fl-method-card__top">
                  <div className="fl-method-card__icon"><IconPencil size={36} /></div>
                  <div className="fl-method-card__text">
                    <strong>Fill out profile manually</strong>
                    <span className="fl-method-card__time">15 min</span>
                  </div>
                  <div className={`fl-method-card__chevron ${answers.freelancerMethod === 'manual' ? 'open' : ''}`}>›</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {currentStep === 'freelancer-detail' && answers.freelancerMethod === 'upload' && (
          <div className="onboarding-step">
            <h1>Upload your experience</h1>
            <p>Import your LinkedIn PDF or upload your CV</p>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Service Heading</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. I will design a professional logo for your brand"
                value={answers.title}
                onChange={e => select('title', e.target.value)}
              />
              {answers.title && answers.title.trim().length < 5 && (
                <span className="field-hint">At least 5 characters</span>
              )}
            </div>
            <div className="fl-upload-steps">
              <p>Add experience from LinkedIn</p>
              <ol className="fl-steps">
                <li>Go to your profile on <strong>LinkedIn</strong></li>
                <li>Click on <strong>Resources</strong></li>
                <li>Click on <strong>Save to PDF</strong></li>
              </ol>
            </div>
            <button
              className="fl-upload-btn"
              onClick={() => fileInputRef.current.click()}
            >
              ⬆ &nbsp;Select file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={e => select('cvFile', e.target.files[0])}
            />
            {answers.cvFile && (
              <p className="fl-file-name">✓ {answers.cvFile.name}</p>
            )}
            <div className="fl-divider"><span>or</span></div>
            <div className="form-group">
              <label className="form-label">LinkedIn profile URL</label>
              <input
                type="url"
                className="input"
                placeholder="https://linkedin.com/in/yourname"
                value={answers.linkedinUrl}
                onChange={e => select('linkedinUrl', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginTop: 16 }}>
              <label className="form-label">Your Category</label>
              <select className="input" value={answers.category} onChange={e => select('category', e.target.value)}>
                <option value="">Select a category...</option>
                <option value="graphics-design">Graphics & Design</option>
                <option value="programming-tech">Programming & Tech</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="writing-translation">Writing & Translation</option>
                <option value="video-animation">Video & Animation</option>
                <option value="music-audio">Music & Audio</option>
                <option value="business">Business</option>
                <option value="ai-services">AI Services</option>
              </select>
            </div>
            <p className="fl-alt-link">No LinkedIn? Upload your CV instead.</p>
            <div className="form-group" style={{ marginTop: 16 }}>
              <label className="form-label">
                Reference Photos
                <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}> (optional, up to 5)</span>
              </label>
              <button
                type="button"
                className="fl-upload-btn"
                onClick={() => photoInputRef.current.click()}
                disabled={answers.photos.length >= 5}
              >
                + Add photos
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={e => { handlePhotoUpload(e.target.files); e.target.value = ''; }}
              />
              {answers.photos.length > 0 && (
                <div className="photo-previews">
                  {answers.photos.map((src, i) => (
                    <div key={i} className="photo-preview">
                      <img src={src} alt="" />
                      <button type="button" className="photo-preview__remove" onClick={() => removePhoto(i)}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="extras-section">
              <p className="extras-section__label">Custom Extras <span>(optional — buyers can add these to their order)</span></p>
              {answers.extras.map((extra, i) => (
                <div key={i} className="extras-row">
                  <input
                    type="text"
                    className="input"
                    placeholder={`Extra ${i + 1} title, e.g. Source files included`}
                    value={extra.title}
                    onChange={e => {
                      const updated = answers.extras.map((ex, idx) => idx === i ? { ...ex, title: e.target.value } : ex);
                      select('extras', updated);
                    }}
                  />
                  <div className="extras-row__price">
                    <span>$</span>
                    <input
                      type="number"
                      className="input"
                      placeholder="9.99"
                      min="0"
                      step="0.01"
                      value={extra.price}
                      onChange={e => {
                        const updated = answers.extras.map((ex, idx) => idx === i ? { ...ex, price: e.target.value } : ex);
                        select('extras', updated);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'freelancer-detail' && answers.freelancerMethod === 'manual' && (
          <div className="onboarding-step">
            <h1>Tell us about yourself</h1>
            <p>This will appear on your public freelancer profile</p>

            <div className="form-group" style={{ marginTop: 20 }}>
              <label className="form-label">Service Heading</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. I will design a professional logo for your brand"
                value={answers.title}
                onChange={e => select('title', e.target.value)}
              />
              {answers.title && answers.title.trim().length < 5 && (
                <span className="field-hint">At least 5 characters</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Your Category</label>
              <select className="input" value={answers.category} onChange={e => select('category', e.target.value)}>
                <option value="">Select a category...</option>
                <option value="graphics-design">Graphics & Design</option>
                <option value="programming-tech">Programming & Tech</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="writing-translation">Writing & Translation</option>
                <option value="video-animation">Video & Animation</option>
                <option value="music-audio">Music & Audio</option>
                <option value="business">Business</option>
                <option value="ai-services">AI Services</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                className="input"
                placeholder="Describe your experience and what you offer..."
                rows={4}
                value={answers.bio}
                onChange={e => select('bio', e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Skills <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(comma separated)</span></label>
              <input
                type="text"
                className="input"
                placeholder="e.g. React, Node.js, UI Design"
                value={answers.skills}
                onChange={e => select('skills', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Hourly rate (optional)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>$</span>
                <input
                  type="number"
                  className="input"
                  placeholder="50"
                  value={answers.hourlyRate}
                  onChange={e => select('hourlyRate', e.target.value)}
                  style={{ paddingLeft: 28 }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                Reference Photos
                <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}> (optional, up to 5)</span>
              </label>
              <button
                type="button"
                className="fl-upload-btn"
                onClick={() => photoInputRef.current.click()}
                disabled={answers.photos.length >= 5}
              >
                + Add photos
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={e => { handlePhotoUpload(e.target.files); e.target.value = ''; }}
              />
              {answers.photos.length > 0 && (
                <div className="photo-previews">
                  {answers.photos.map((src, i) => (
                    <div key={i} className="photo-preview">
                      <img src={src} alt="" />
                      <button type="button" className="photo-preview__remove" onClick={() => removePhoto(i)}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="extras-section">
              <p className="extras-section__label">Custom Extras <span>(optional — buyers can add these to their order)</span></p>
              {answers.extras.map((extra, i) => (
                <div key={i} className="extras-row">
                  <input
                    type="text"
                    className="input"
                    placeholder={`Extra ${i + 1} title, e.g. Source files included`}
                    value={extra.title}
                    onChange={e => {
                      const updated = answers.extras.map((ex, idx) => idx === i ? { ...ex, title: e.target.value } : ex);
                      select('extras', updated);
                    }}
                  />
                  <div className="extras-row__price">
                    <span>$</span>
                    <input
                      type="number"
                      className="input"
                      placeholder="9.99"
                      min="0"
                      step="0.01"
                      value={extra.price}
                      onChange={e => {
                        const updated = answers.extras.map((ex, idx) => idx === i ? { ...ex, price: e.target.value } : ex);
                        select('extras', updated);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'purpose' && (
          <div className="onboarding-step">
            <h1>What do you want to order services for?</h1>
            <p>There's something for everyone here</p>
            <div className="option-list">
              <button
                className={`option-card ${answers.purpose === 'business' ? 'selected' : ''}`}
                onClick={() => select('purpose', 'business')}
              >
                <div className="option-icon"><IconBusiness size={52} /></div>
                <div className="option-text">
                  <strong>Main job or Business</strong>
                  <span>A project for the company you work at, or your own business</span>
                </div>
                <div className="option-check" />
              </button>
              <button
                className={`option-card ${answers.purpose === 'side' ? 'selected' : ''}`}
                onClick={() => select('purpose', 'side')}
              >
                <div className="option-icon"><IconSide size={52} /></div>
                <div className="option-text">
                  <strong>Side project</strong>
                  <span>Everything you work on alongside your main job</span>
                </div>
                <div className="option-check" />
              </button>
              <button
                className={`option-card ${answers.purpose === 'personal' ? 'selected' : ''}`}
                onClick={() => select('purpose', 'personal')}
              >
                <div className="option-icon"><IconPersonal size={52} /></div>
                <div className="option-text">
                  <strong>Personal use</strong>
                  <span>Services for your own development or enjoyment</span>
                </div>
                <div className="option-check" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 'teamsize' && (
          <div className="onboarding-step">
            <h1>How many people work in your team?</h1>
            <div className="option-list">
              {[
                { value: '1', label: 'Just me', icon: <IconTeam1 size={52} /> },
                { value: '2-10', label: '2–10', icon: <IconTeam4 size={52} /> },
                { value: '11-50', label: '11–50', icon: <IconTeam2 size={52} /> },
                { value: '51-500', label: '51–500', icon: <IconTeam3 size={52} /> },
              ].map(opt => (
                <button
                  key={opt.value}
                  className={`option-card option-card--compact ${answers.teamSize === opt.value ? 'selected' : ''}`}
                  onClick={() => select('teamSize', opt.value)}
                >
                  <div className="option-icon">{opt.icon}</div>
                  <div className="option-text">
                    <strong>{opt.label}</strong>
                  </div>
                  <div className="option-check" />
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'intent' && (
          <div className="onboarding-step">
            <h1>Cool! What brings you here today?</h1>
            <p>We're here to help you make it happen</p>
            <div className="option-list">
              <button
                className={`option-card ${answers.intent === 'project' ? 'selected' : ''}`}
                onClick={() => select('intent', 'project')}
              >
                <div className="option-icon"><IconProject size={52} /></div>
                <div className="option-text">
                  <strong>I want to start a project</strong>
                  <span>I need multiple services to get it done</span>
                </div>
                <div className="option-check" />
              </button>
              <button
                className={`option-card ${answers.intent === 'specific' ? 'selected' : ''}`}
                onClick={() => select('intent', 'specific')}
              >
                <div className="option-icon"><IconSpecific size={52} /></div>
                <div className="option-text">
                  <strong>A specific service</strong>
                  <span>I want to get one specific task done</span>
                </div>
                <div className="option-check" />
              </button>
              <button
                className={`option-card ${answers.intent === 'browse' ? 'selected' : ''}`}
                onClick={() => select('intent', 'browse')}
              >
                <div className="option-icon"><IconBrowse size={52} /></div>
                <div className="option-text">
                  <strong>Just browsing</strong>
                  <span>I just want to look around and get inspired</span>
                </div>
                <div className="option-check" />
              </button>
            </div>
          </div>
        )}

        {submitError && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
            {submitError}
          </div>
        )}

        <div className="onboarding-actions">
          {step > 0 && !submitting && (
            <button className="btn btn-ghost" onClick={back}>← Back</button>
          )}
          <button
            className="btn btn-primary"
            onClick={next}
            disabled={!canContinue() || submitting}
            style={{ marginLeft: 'auto' }}
          >
            {submitting ? 'Saving…' : isLast ? 'Get started' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
