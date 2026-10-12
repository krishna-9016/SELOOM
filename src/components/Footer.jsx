import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand info */}
          <div>
            <img
              src="/images/logo-white.png"
              alt="SELOOM"
              style={{ height: 22, width: 'auto', display: 'block' }}
            />
            <p className="footer-brand-p">
              SELOOM brings together contemporary oversized silhouettes, everyday
              comfort, and a distinctive streetwear attitude. Designed and developed
              in-house.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-col-list">
              <li><Link to="/collection/all-drops" className="footer-link">Search</Link></li>
              <li><Link to="/collection/all-drops" className="footer-link">Shop</Link></li>
              <li><Link to="/contact" className="footer-link">Contact us</Link></li>
              <li><Link to="/track-order" className="footer-link">Track your order</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="footer-col-title">POLICIES</h4>
            <ul className="footer-col-list">
              <li><Link to="/policies/terms" className="footer-link">Terms & Condition</Link></li>
              <li><Link to="/policies/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/policies/refund" className="footer-link">Refund Policy</Link></li>
              <li><Link to="/policies/shipping" className="footer-link">Shipping Policy</Link></li>
              <li><Link to="/policies/returns" className="footer-link">Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Channels / Social */}
          <div>
            <h4 className="footer-col-title">CHANNELS</h4>
            <div className="social-icons-row">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Pinterest"
              >
                <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>P</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="YouTube"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <div>© 2026, SELOOM. ALL RIGHTS RESERVED.</div>
          <div className="footer-legal-links">
            <Link to="/policies/privacy" className="footer-link">Privacy policy</Link>
            <Link to="/policies/terms" className="footer-link">Terms of service</Link>
            <Link to="/policies/shipping" className="footer-link">Shipping policy</Link>
            <Link to="/contact" className="footer-link">Contact information</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
