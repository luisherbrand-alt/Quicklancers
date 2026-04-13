import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = {
  Categories: [
    { label: 'Graphics & Design', to: '/browse/graphics-design' },
    { label: 'Programming & Tech', to: '/browse/programming-tech' },
    { label: 'Digital Marketing', to: '/browse/digital-marketing' },
    { label: 'Writing & Translation', to: '/browse/writing-translation' },
    { label: 'Video & Animation', to: '/browse/video-animation' },
    { label: 'AI Services', to: '/browse/ai-services' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/' },
    { label: 'Press', to: '/' },
    { label: 'Blog', to: '/' },
    { label: 'Investor Relations', to: '/' },
  ],
  Support: [
    { label: 'Help Center', to: '/help' },
    { label: 'Safety & Trust', to: '/' },
    { label: 'Disputes', to: '/help' },
    { label: 'Contact Us', to: 'mailto:Luis.herbrand@gmail.com', external: true },
  ],
  Community: [
    { label: 'Forum', to: '/' },
    { label: 'Events', to: '/' },
    { label: 'Podcast', to: '/' },
    { label: 'Affiliates', to: '/' },
    { label: 'Invite a Friend', to: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span>⚡</span>
            <span>Quicklancer</span>
          </Link>
          <p className="footer__tagline">
            The marketplace for creative and professional services.
          </p>
          <div className="footer__social">
            <a href="/" className="social-link" aria-label="Twitter">𝕏</a>
            <a href="/" className="social-link" aria-label="LinkedIn">in</a>
            <a href="/" className="social-link" aria-label="Facebook">f</a>
            <a href="/" className="social-link" aria-label="Instagram">◎</a>
          </div>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} className="footer__col">
            <h4 className="footer__col-title">{section}</h4>
            <ul className="footer__links">
              {links.map(link => (
                <li key={link.label}>
                  {link.external
                    ? <a href={link.to} className="footer__link">{link.label}</a>
                    : <Link to={link.to} className="footer__link">{link.label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer__bottom container">
        <p className="footer__copy">© 2025 Quicklancer Inc. All rights reserved.</p>
        <div className="footer__legal">
          <Link to="/privacy-policy" className="footer__legal-link">Privacy Policy</Link>
          <Link to="/terms" className="footer__legal-link">Terms of Service</Link>
          <Link to="/" className="footer__legal-link">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
}
