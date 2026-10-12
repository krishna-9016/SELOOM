import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [imgSrc, setImgSrc] = useState(product.image);

  const formatPrice = (amount) => {
    return `Rs. ${amount.toLocaleString('en-IN')}.00`;
  };

  const handleImgError = () => {
    // Graceful fallback to dark denim if an image fails
    if (imgSrc !== '/images/jeans/dark-blue-baggy-jeans.jpg') {
      setImgSrc('/images/jeans/dark-blue-baggy-jeans.jpg');
    }
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        {/* Badges */}
        {product.isSale && (
          <span className="product-badge badge-sale">SALE</span>
        )}
        {!product.isSale && product.isNew && (
          <span className="product-badge badge-new">NEW</span>
        )}
        {product.isSoldOut && (
          <span className="sold-out-overlay">SOLD OUT</span>
        )}

        <img
          src={imgSrc}
          alt={product.name}
          className="product-card-img"
          onError={handleImgError}
        />
      </Link>

      <div className="product-card-info">
        <Link to={`/product/${product.id}`} className="product-card-title">
          {product.name}
        </Link>
        <div className="product-card-pricing">
          {product.isSale && product.originalPrice && (
            <span className="price-original">{formatPrice(product.originalPrice)}</span>
          )}
          <span className={product.isSale ? 'price-discounted' : ''}>
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
