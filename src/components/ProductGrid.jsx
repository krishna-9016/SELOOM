import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', width: '100%', color: '#737373' }}>
        <p className="mono-title">NO PRODUCTS FOUND</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Try adjusting your filters or category selection.</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
