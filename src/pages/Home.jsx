import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import CollectionBanner from '../components/CollectionBanner';
import FeaturedCollections from '../components/FeaturedCollections';
import BrandStory from '../components/BrandStory';
import { PRODUCTS } from '../data/products';

export default function Home() {
  // New arrivals: top 8 items that are flagged isNew
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 8);

  // All drops: next 8 items
  const allDrops = PRODUCTS.slice(8, 16);

  return (
    <main>
      {/* 1. HERO CAMPAIGN BANNER */}
      <HeroBanner />

      {/* 2. NEW ARRIVALS GRID */}
      <section>
        <div className="section-header-bar">
          <h2 className="section-title">NEW ARRIVALS</h2>
          <Link to="/collection/new-arrivals" className="section-link">
            VIEW ALL <ArrowRight size={14} />
          </Link>
        </div>
        <ProductGrid products={newArrivals} />
      </section>

      {/* 3. MIDDLE LIFESTYLE CAMPAIGN BANNER */}
      <CollectionBanner />

      {/* 4. ALL DROPS GRID */}
      <section>
        <div className="section-header-bar">
          <h2 className="section-title">ALL DROPS</h2>
          <Link to="/collection/all-drops" className="section-link">
            EXPLORE <ArrowRight size={14} />
          </Link>
        </div>
        <ProductGrid products={allDrops} />
      </section>

      {/* 5. FEATURED COLLECTIONS TILES */}
      <FeaturedCollections />

      {/* 6. BRAND STORY & CRAFTSMANSHIP BANNER */}
      <BrandStory />
    </main>
  );
}
