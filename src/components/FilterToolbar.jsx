import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

export default function FilterToolbar({
  productCount,
  selectedCategory,
  onCategoryChange,
  selectedSize,
  onSizeChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
  availableCategories = [],
  availableSizes = []
}) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'price' | 'size' | 'category' | null

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedSize !== 'all' || priceRange !== 'all';

  const handleReset = () => {
    onCategoryChange('all');
    onSizeChange('all');
    onPriceRangeChange('all');
    setOpenDropdown(null);
  };

  return (
    <div className="filter-toolbar">
      {/* Left: Filter Buttons */}
      <div className="filter-left-group">
        {/* Price Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className={`filter-btn ${priceRange !== 'all' ? 'active' : ''}`}
            onClick={() => toggleDropdown('price')}
          >
            Price {priceRange !== 'all' && `(${priceRange})`} <ChevronDown size={14} />
          </button>

          {openDropdown === 'price' && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: 4,
              backgroundColor: '#fff',
              border: '1px solid #e5e5e5',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              padding: '0.75rem',
              zIndex: 50,
              minWidth: 180,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under Rs. 1,000', val: 'under-1000' },
                { label: 'Rs. 1,000 - 1,500', val: '1000-1500' },
                { label: 'Above Rs. 1,500', val: 'above-1500' }
              ].map(opt => (
                <button
                  key={opt.val}
                  style={{
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    padding: '6px 8px',
                    backgroundColor: priceRange === opt.val ? '#000' : 'transparent',
                    color: priceRange === opt.val ? '#fff' : '#111',
                    fontWeight: 600
                  }}
                  onClick={() => {
                    onPriceRangeChange(opt.val);
                    setOpenDropdown(null);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Size Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className={`filter-btn ${selectedSize !== 'all' ? 'active' : ''}`}
            onClick={() => toggleDropdown('size')}
          >
            Size {selectedSize !== 'all' && `(${selectedSize})`} <ChevronDown size={14} />
          </button>

          {openDropdown === 'size' && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: 4,
              backgroundColor: '#fff',
              border: '1px solid #e5e5e5',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              padding: '0.75rem',
              zIndex: 50,
              minWidth: 200,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.4rem'
            }}>
              <button
                style={{
                  gridColumn: 'span 3',
                  padding: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: selectedSize === 'all' ? '#000' : '#f5f5f5',
                  color: selectedSize === 'all' ? '#fff' : '#111'
                }}
                onClick={() => {
                  onSizeChange('all');
                  setOpenDropdown(null);
                }}
              >
                All Sizes
              </button>
              {availableSizes.map(size => (
                <button
                  key={size}
                  style={{
                    padding: '8px 4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    border: '1px solid #e5e5e5',
                    backgroundColor: selectedSize === size ? '#000' : '#fff',
                    color: selectedSize === size ? '#fff' : '#111'
                  }}
                  onClick={() => {
                    onSizeChange(size);
                    setOpenDropdown(null);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Dropdown */}
        {availableCategories.length > 0 && (
          <div style={{ position: 'relative' }}>
            <button
              className={`filter-btn ${selectedCategory !== 'all' ? 'active' : ''}`}
              onClick={() => toggleDropdown('category')}
            >
              Category {selectedCategory !== 'all' && `(${selectedCategory})`} <ChevronDown size={14} />
            </button>

            {openDropdown === 'category' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: 4,
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                padding: '0.75rem',
                zIndex: 50,
                minWidth: 180,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <button
                  style={{
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    padding: '6px 8px',
                    backgroundColor: selectedCategory === 'all' ? '#000' : 'transparent',
                    color: selectedCategory === 'all' ? '#fff' : '#111',
                    fontWeight: 600
                  }}
                  onClick={() => {
                    onCategoryChange('all');
                    setOpenDropdown(null);
                  }}
                >
                  All Categories
                </button>
                {availableCategories.map(cat => (
                  <button
                    key={cat}
                    style={{
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      padding: '6px 8px',
                      textTransform: 'uppercase',
                      backgroundColor: selectedCategory === cat ? '#000' : 'transparent',
                      color: selectedCategory === cat ? '#fff' : '#111',
                      fontWeight: 600
                    }}
                    onClick={() => {
                      onCategoryChange(cat);
                      setOpenDropdown(null);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            style={{
              fontSize: '0.72rem',
              color: '#e11d48',
              fontWeight: 600,
              letterSpacing: '0.06em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <X size={13} /> RESET
          </button>
        )}
      </div>

      {/* Right: Product count & Sort dropdown */}
      <div className="filter-right-group">
        <span className="product-count-label">{productCount} products</span>

        <div className="sort-select-wrap">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            className="sort-dropdown"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
