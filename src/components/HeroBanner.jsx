import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <section className="hero-section">
      <img
        src="/images/hero/hero-main.jpg"
        alt="SELOOM Streetwear Campaign"
        className="hero-bg-img"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">OWN YOUR STYLE</h1>
        <p className="hero-subtitle">Everyday essentials. Unapologetic expression.</p>
        <Link to="/collection/new-arrivals" className="btn-primary">
          EXPLORE COLLECTION
        </Link>
      </div>
    </section>
  );
}
