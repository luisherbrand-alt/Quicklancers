import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App.jsx';
import IconLightning from './IconLightning.jsx';
import './Navbar.css';

export default function Navbar() {
  const { user, login, logout, switchAccount, removeSavedAccount, getSavedAccounts } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50); }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
        setShowAccounts(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function openMenu() {
    setSavedAccounts(getSavedAccounts());
    setMenuOpen(m => !m);
    setShowAccounts(false);
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...user, avatar: reader.result };
      login(updated);
    };
    reader.readAsDataURL(file);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) navigate(`/browse?search=${encodeURIComponent(search.trim())}`);
  }

  function handleSwitch(account) {
    switchAccount(account);
    setMenuOpen(false);
    setShowAccounts(false);
    navigate('/');
  }

  function handleRemove(e, id) {
    e.stopPropagation();
    removeSavedAccount(id);
    setSavedAccounts(getSavedAccounts().filter(a => a.id !== id));
  }

  function handleAddAccount() {
    setMenuOpen(false);
    setShowAccounts(false);
    navigate('/login');
  }

  const otherAccounts = savedAccounts.filter(a => a.id !== user?.id);

  return (
    <header className={`navbar ${transparent ? 'navbar--transparent' : 'navbar--solid'}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src="/logo-new.jpeg" alt="Quicklancers" style={{ height: '52px', objectFit: 'contain', borderRadius: '12px' }} />
        </Link>

        {/* Search bar */}
        {(!isHome || scrolled) && (
          <form className="navbar__search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for any service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="navbar__search-input"
            />
            <button type="submit" className="navbar__search-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>
        )}

        {/* Desktop Nav */}
        <nav className="navbar__nav">
          <Link to="/browse" className="navbar__link">Browse</Link>
          {user ? (
            <div className="navbar__user" ref={dropdownRef}>
              <button className="navbar__avatar-btn" onClick={openMenu}>
                <div className="avatar" style={{ width: 34, height: 34, background: '#1dbf73', fontSize: 13, overflow: 'hidden', padding: 0 }}>
                  {user.avatar
                    ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : user.name.charAt(0).toUpperCase()}
                </div>
                <span className="navbar__username">{user.name.split(' ')[0]}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L1 3h10z"/></svg>
              </button>

              {menuOpen && (
                <div className="navbar__dropdown">
                  {!showAccounts ? (
                    <>
                      <div className="dropdown-header">
                        <div className="dropdown-avatar" onClick={() => fileInputRef.current.click()}>
                          <div className="avatar" style={{ width: 48, height: 48, background: '#1dbf73', fontSize: 18, overflow: 'hidden', padding: 0, cursor: 'pointer' }}>
                            {user.avatar
                              ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="dropdown-avatar__label">Change photo</span>
                          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                        </div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                      <div className="dropdown-divider" />
                      <Link to="/browse" className="dropdown-item" onClick={() => setMenuOpen(false)}>Browse Gigs</Link>
                      <Link to="/inbox" className="dropdown-item" onClick={() => setMenuOpen(false)}>Inbox</Link>
                      <Link to="/notifications" className="dropdown-item" onClick={() => setMenuOpen(false)}>Notifications</Link>
                      <Link to="/seller-dashboard" className="dropdown-item dropdown-item--payout" onClick={() => setMenuOpen(false)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
                        </svg>
                        Seller Dashboard
                      </Link>
                      <Link to="/onboarding?add=1" className="dropdown-item dropdown-item--add-service" onClick={() => setMenuOpen(false)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
                        </svg>
                        Add a Service
                      </Link>
                      <Link to="/onboarding" className="dropdown-item dropdown-item--freelancer" onClick={() => setMenuOpen(false)}>
                        <IconLightning size={14} /> Become a Quicklancer
                      </Link>
                      <div className="dropdown-divider" />
                      <button className="dropdown-item dropdown-item--danger" onClick={() => { logout(); setMenuOpen(false); }}>
                        Sign Out
                      </button>
                      <button className="dropdown-item dropdown-item--switch" onClick={() => setShowAccounts(true)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        Switch Account
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Accounts panel */}
                      <div className="accounts-panel__header">
                        <button className="accounts-panel__back" onClick={() => setShowAccounts(false)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <span>Switch Account</span>
                      </div>

                      <div className="accounts-list">
                        {/* Current account */}
                        <div className="account-item account-item--active">
                          <div className="avatar" style={{ width: 36, height: 36, background: '#1dbf73', fontSize: 13, overflow: 'hidden', padding: 0, flexShrink: 0 }}>
                            {user.avatar
                              ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="account-item__info">
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                          </div>
                          <svg className="account-item__check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>

                        {/* Other saved accounts */}
                        {otherAccounts.map(acc => (
                          <div key={acc.id} className="account-item" onClick={() => handleSwitch(acc)}>
                            <div className="avatar" style={{ width: 36, height: 36, background: '#6366f1', fontSize: 13, overflow: 'hidden', padding: 0, flexShrink: 0 }}>
                              {acc.avatar
                                ? <img src={acc.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                : acc.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="account-item__info">
                              <strong>{acc.name}</strong>
                              <span>{acc.email}</span>
                            </div>
                            <button
                              className="account-item__remove"
                              onClick={(e) => handleRemove(e, acc.id)}
                              title="Remove account"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            </button>
                          </div>
                        ))}

                        {otherAccounts.length === 0 && (
                          <p className="accounts-list__empty">No other saved accounts</p>
                        )}
                      </div>

                      <div className="dropdown-divider" />
                      <button className="dropdown-item accounts-panel__add" onClick={handleAddAccount}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
                        </svg>
                        Add Account
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Saved accounts quick-switch when logged out */}
              {getSavedAccounts().length > 0 && (
                <div className="navbar__user" ref={dropdownRef}>
                  <button className="navbar__avatar-btn" onClick={() => { setSavedAccounts(getSavedAccounts()); setMenuOpen(m => !m); }}>
                    <div className="avatar" style={{ width: 34, height: 34, background: '#6366f1', fontSize: 13 }}>
                      {getSavedAccounts()[0]?.name?.charAt(0).toUpperCase()}
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L1 3h10z"/></svg>
                  </button>
                  {menuOpen && (
                    <div className="navbar__dropdown">
                      <div className="accounts-panel__header" style={{ borderBottom: 'none', paddingBottom: 4 }}>
                        <span>Saved Accounts</span>
                      </div>
                      <div className="accounts-list">
                        {savedAccounts.map(acc => (
                          <div key={acc.id} className="account-item" onClick={() => { switchAccount(acc); setMenuOpen(false); navigate('/'); }}>
                            <div className="avatar" style={{ width: 36, height: 36, background: '#6366f1', fontSize: 13, overflow: 'hidden', padding: 0, flexShrink: 0 }}>
                              {acc.avatar
                                ? <img src={acc.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                : acc.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="account-item__info">
                              <strong>{acc.name}</strong>
                              <span>{acc.email}</span>
                            </div>
                            <button className="account-item__remove" onClick={(e) => handleRemove(e, acc.id)} title="Remove">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="dropdown-divider" />
                      <button className="dropdown-item accounts-panel__add" onClick={() => { setMenuOpen(false); navigate('/login'); }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
                        </svg>
                        Sign in with another account
                      </button>
                    </div>
                  )}
                </div>
              )}
              <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Join Free</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
