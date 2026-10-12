import React from 'react';
import { Link } from 'react-router-dom';

export default function CollectionBanner() {
  return (
    <section className="campaign-banner-section">
      <img
        src="/images/lifestyle/campaign-sofa.jpg"
        alt="SELOOM Originals Streetwear Manifesto"
        className="campaign-banner-img"
      />
      <div className="campaign-banner-overlay" />
      <div className="campaign-banner-content">
        <p className="campaign-banner-sub">DEFINED BY YOUR OWN STYLE</p>
        <p className="campaign-manifesto-text">
          SELOOM ORIGINALS IS WHERE THE SELOOM VISION BECOMES CLOTHING.
          EACH PIECE IS DESIGNED AND DEVELOPED BY OUR TEAM, INSPIRED BY MODERN STREETWEAR
          AND MADE TO BE WORN YOUR OWN WAY.
        </p>
        <Link to="/collection/all-drops" className="btn-primary">
          EXPLORE ALL DROPS
        </Link>
      </div>
    </section>
  );
}
