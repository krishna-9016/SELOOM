import React, { useState, useMemo } from 'react';
import FilterToolbar from '../components/FilterToolbar';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';

export default function FlashSalePage() {
  // All items marked as sale or discounted
  const allSaleProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.isSale || p.originalPrice > p.price);
  }, []);

  // Pagination / Load more state
  const [visibleCount, setVisibleCount] = useState(8);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const allSizes = ['28', '30', '32', '34', '36', 'S', 'M', 'L', 'XL'];
  const allCategories = ['tops', 'denims', 'straight', 'wide'];

  const filtered = useMemo(() => {
    let result = [...allSaleProducts];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory || p.subCategory === selectedCategory);
    }

    if (selectedSize !== 'all') {
      result = result.filter(p => p.sizes.includes(selectedSize));
    }

    if (priceRange === 'under-1000') {
      result = result.filter(p => p.price < 1000);
    } else if (priceRange === '1000-1500') {
      result = result.filter(p => p.price >= 1000 && p.price <= 1500);
    } else if (priceRange === 'above-1500') {
      result = result.filter(p => p.price > 1500);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [allSaleProducts, selectedCategory, selectedSize, priceRange, sortBy]);

  const displayedProducts = filtered.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filtered.length));
  };

  return (
    <div style={{ minHeight: '80vh' }}>
      {/* Flash Sale Banner Header */}
      <div style={{
        padding: '3rem 1.5rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid #e5e5e5',
        backgroundColor: '#0a0a0a',
        color: '#ffffff'
      }}>
        <span style={{
          display: 'inline-block',
          backgroundColor: '#e11d48',
          color: '#fff',
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          padding: '4px 10px',
          borderRadius: 2,
          marginBottom: '0.75rem',
          textTransform: 'uppercase'
        }}>
          LIMITED PROTOTYPE DROP
        </span>
        <h1 className="heading-lg" style={{ fontSize: '2rem', letterSpacing: '0.1em' }}>
          FLASH SALE
        </h1>
        <p style={{ fontSize: '0.75rem', color: '#a3a3a3', marginTop: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Exclusive promotional discounts on oversized graphic tees, baggy denim, and essentials.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <FilterToolbar
        productCount={filtered.length}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
        availableCategories={allCategories}
        availableSizes={allSizes}
      />

      {/* Product Grid */}
      <ProductGrid products={displayedProducts} />

      {/* Progress Bar & Load More Section (matching reference screenshot page 2) */}
      {filtered.length > 0 && (
        <div className="load-more-section">
          <span className="load-more-progress-text">
            You've viewed {displayedProducts.length} of {filtered.length} results
          </span>

          {/* Progress bar */}
          <div style={{
            width: '180px',
            height: '2px',
            backgroundColor: '#e5e5e5',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(displayedProducts.length / filtered.length) * 100}%`,
              height: '100%',
              backgroundColor: '#000000',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {displayedProducts.length < filtered.length && (
            <button
              onClick={handleLoadMore}
              className="load-more-btn"
              aria-label="Load more products"
              title="Load more products"
            >
              <span style={{ fontSize: '1.2rem', letterSpacing: '2px', lineHeight: 1 }}>•••</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
