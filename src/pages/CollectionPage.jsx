import React, { useState, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FilterToolbar from '../components/FilterToolbar';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';

export default function CollectionPage() {
  const { categorySlug } = useParams();
  const location = useLocation();

  const isNewArrivals = location.pathname.includes('new-arrivals') || categorySlug === 'new-arrivals';
  
  // Available filter options
  const allSizes = ['28', '30', '32', '34', '36', 'S', 'M', 'L', 'XL'];
  const allCategories = ['denims', 'baggy', 'bootcut', 'wide', 'straight', 'tops', 'cargos', 'accessories'];

  // State
  const [selectedCategory, setSelectedCategory] = useState(
    categorySlug && categorySlug !== 'all-drops' && categorySlug !== 'new-arrivals'
      ? categorySlug
      : 'all'
  );
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (isNewArrivals) {
      result = result.filter(p => p.isNew);
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => 
        p.category === selectedCategory || p.subCategory === selectedCategory
      );
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
  }, [isNewArrivals, selectedCategory, selectedSize, priceRange, sortBy]);

  const pageTitle = isNewArrivals
    ? 'NEW DROPS'
    : selectedCategory !== 'all'
    ? selectedCategory.toUpperCase()
    : 'ALL DROPS';

  return (
    <div style={{ minHeight: '80vh' }}>
      {/* Category banner / header */}
      <div style={{
        padding: '2.5rem 1.5rem 1.5rem',
        textAlign: 'center',
        borderBottom: '1px solid #e5e5e5',
        backgroundColor: '#fafafa'
      }}>
        <h1 className="heading-lg" style={{ fontSize: '1.75rem', letterSpacing: '0.12em' }}>
          {pageTitle}
        </h1>
        <p style={{ fontSize: '0.75rem', color: '#737373', marginTop: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Contemporary silhouettes & oversized cuts designed for effortless styling.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <FilterToolbar
        productCount={filteredProducts.length}
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

      {/* Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
