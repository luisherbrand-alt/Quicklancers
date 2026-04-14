import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Browse from './pages/Browse.jsx';
import GigDetail from './pages/GigDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Inbox from './pages/Inbox.jsx';
import Notifications from './pages/Notifications.jsx';
import About from './pages/About.jsx';
import HelpCenter from './pages/HelpCenter.jsx';
import ContactSeller from './pages/ContactSeller.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import OrderCancelled from './pages/OrderCancelled.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import SellerDashboard from './pages/SellerDashboard.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function getSavedAccounts() {
  try { return JSON.parse(localStorage.getItem('ql_saved_accounts') || '[]'); } catch { return []; }
}

function upsertSavedAccount(userData) {
  const accounts = getSavedAccounts();
  const idx = accounts.findIndex(a => a.id === userData.id);
  // Store full user object so we can log back in without a password
  const entry = { ...userData };
  if (idx >= 0) accounts[idx] = entry; else accounts.push(entry);
  localStorage.setItem('ql_saved_accounts', JSON.stringify(accounts));
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ql_user');
    return saved ? JSON.parse(saved) : null;
  });

  function login(userData) {
    setUser(userData);
    localStorage.setItem('ql_user', JSON.stringify(userData));
    upsertSavedAccount(userData);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('ql_user');
  }

  function switchAccount(accountData) {
    setUser(accountData);
    localStorage.setItem('ql_user', JSON.stringify(accountData));
    upsertSavedAccount(accountData);
  }

  function removeSavedAccount(id) {
    const updated = getSavedAccounts().filter(a => a.id !== id);
    localStorage.setItem('ql_saved_accounts', JSON.stringify(updated));
    if (user?.id === id) logout();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchAccount, removeSavedAccount, getSavedAccounts }}>
      <BrowserRouter>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/browse/:category" element={<Browse />} />
              <Route path="/gig/:id" element={<GigDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/contact-seller/:id" element={<ContactSeller />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/order-cancelled" element={<OrderCancelled />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
