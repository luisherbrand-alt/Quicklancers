import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <p className="about-hero__label">About Us</p>
          <h1 className="about-hero__title">
            Connecting every business with the world's best digital freelancers
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section className="about-body container">
        <div className="about-block">
          <p className="about-intro">
            At Quicklancers, we connect every business with the world's best digital freelancers in the simplest way possible.
          </p>
        </div>

        <div className="about-block">
          <p>
            Quicklancers operates globally with freelancers and companies from an estimated <strong>160 countries</strong>. The company was founded in <strong>2026</strong> and is headquartered in <strong>Málaga</strong>.
          </p>
        </div>

        <div className="about-block">
          <p>
            Today, Quicklancers is a leading global digital freelance platform that gives you access to top-tier, specialized, and diverse experts through an AI-powered platform. You can find over <strong>700 skills</strong>, ranging from AI to programming, digital marketing to content creation, and video editing to architecture. We're proud to be the place where you get the best value for your budget — whether you're part of a startup or a Fortune 500 company, and whether you need help with a simple task or a complex project.
          </p>
        </div>

        <div className="about-block about-block--highlight">
          <p>
            Quicklancers helps companies leverage freelancing in a whole new way.
          </p>
          <div className="about-pillars">
            <div className="about-pillar">
              <span className="about-pillar__icon">🚀</span>
              <strong>Accelerate growth.</strong>
            </div>
            <div className="about-pillar">
              <span className="about-pillar__icon">⭐</span>
              <strong>Set new standards.</strong>
            </div>
            <div className="about-pillar">
              <span className="about-pillar__icon">💡</span>
              <strong>Pave the way for breakthroughs.</strong>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat__value">160+</span>
            <span className="about-stat__label">Countries</span>
          </div>
          <div className="about-stat">
            <span className="about-stat__value">700+</span>
            <span className="about-stat__label">Skills available</span>
          </div>
          <div className="about-stat">
            <span className="about-stat__value">2026</span>
            <span className="about-stat__label">Founded</span>
          </div>
          <div className="about-stat">
            <span className="about-stat__value">Málaga</span>
            <span className="about-stat__label">Headquartered</span>
          </div>
        </div>

        <div className="about-cta">
          <h2>Ready to get started?</h2>
          <p>Join thousands of businesses and freelancers on Quicklancers today.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">Join Free</Link>
            <Link to="/browse" className="btn btn-outline btn-lg">Browse Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
