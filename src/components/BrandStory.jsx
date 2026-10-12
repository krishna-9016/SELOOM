import React from 'react';

export default function BrandStory() {
  return (
    <>
      <section className="brand-story-section">
        <span className="mono-title" style={{ color: '#737373' }}>THE IDENTITY</span>
        <h2 className="brand-story-title">LESS NOISE. MORE IDENTITY.</h2>
        <p className="brand-story-p">
          SELOOM brings together contemporary silhouettes, everyday comfort,
          and a distinctive streetwear attitude. Every wash, cut, and seam is obsessively
          calibrated to deliver timeless oversized style without compromise.
        </p>
      </section>

      {/* Close-up denim button fly detail shot (as seen in Reference Screenshot page 3) */}
      <div className="detail-banner-wrap">
        <img
          src="/images/lifestyle/denim-detail.jpg"
          alt="SELOOM Raw Denim Craftsmanship"
          className="detail-banner-img"
          loading="lazy"
        />
      </div>
    </>
  );
}
