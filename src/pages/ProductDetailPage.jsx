import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState('description'); // 'description' | 'details' | 'shipping'

  // Reset state on product change
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes[0] || 'M');
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id, product]);

  const formatPrice = (amount) => {
    return `Rs. ${amount.toLocaleString('en-IN')}.00`;
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
  };

  // Related products (same category or others, excluding current)
  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  const toggleAccordion = (name) => {
    setOpenSection(prev => (prev === name ? null : name));
  };

  return (
    <div>
      {/* Breadcrumb row */}
      <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #e5e5e5',
        fontSize: '0.6875rem',
        letterSpacing: '0.08em',
        color: '#737373',
        textTransform: 'uppercase'
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: '8px' }}>
          <Link to="/" style={{ color: '#111' }}>HOME</Link>
          <span>/</span>
          <Link to={`/collection/${product.category}`} style={{ color: '#111' }}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="pdp-container">
        {/* Gallery Column */}
        <div className="pdp-gallery">
          <div className="pdp-main-image-wrap">
            <img
              src={activeImage}
              alt={product.name}
              className="pdp-main-img"
            />
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="pdp-thumbs-row">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  className={`pdp-thumb-btn ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="pdp-thumb-img" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Column */}
        <div className="pdp-details">
          <div>
            <span className="mono-title" style={{ color: '#737373', fontSize: '0.7rem' }}>
              SELOOM ORIGINALS
            </span>
            <h1 className="pdp-title">{product.name}</h1>
          </div>

          <div className="pdp-price-row">
            {product.isSale && product.originalPrice && (
              <span className="price-original" style={{ fontSize: '1rem' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className={product.isSale ? 'price-discounted' : ''}>
              {formatPrice(product.price)}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#737373', fontWeight: 400 }}>
              (Taxes Included)
            </span>
          </div>

          {/* Color swatch info */}
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <strong>COLOR:</strong> <span style={{ color: '#737373' }}>{product.color}</span>
          </div>

          {/* Size Selector */}
          <div className="size-select-section">
            <div className="size-select-header">
              <span>SELECT SIZE:</span>
              <button
                type="button"
                style={{ textDecoration: 'underline', color: '#737373', fontSize: '0.7rem' }}
                onClick={() => alert('SELOOM SIZING GUIDE:\nOversized fit. True to size for intentional relaxed drape, or size down for closer fit.')}
              >
                SIZE GUIDE
              </button>
            </div>

            <div className="size-boxes-grid">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-pill-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              QUANTITY:
            </span>
            <div className="qty-stepper" style={{ height: 36 }}>
              <button
                className="qty-btn"
                style={{ width: 36 }}
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="qty-display" style={{ width: 36 }}>{quantity}</span>
              <button
                className="qty-btn"
                style={{ width: 36 }}
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="pdp-cta-group">
            <button className="btn-add-to-cart" onClick={handleAddToCart}>
              ADD TO BAG
            </button>
            <button className="btn-buy-now" onClick={handleBuyNow}>
              BUY IT NOW
            </button>
          </div>

          {/* Trust badges */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            padding: '1.25rem 0',
            borderTop: '1px solid #e5e5e5',
            borderBottom: '1px solid #e5e5e5',
            marginTop: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Truck size={18} strokeWidth={1.5} />
              <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Free Shipping
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <RefreshCw size={18} strokeWidth={1.5} />
              <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                7-Day Returns
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <ShieldCheck size={18} strokeWidth={1.5} />
              <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                100% Cotton
              </span>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="pdp-accordion">
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleAccordion('description')}>
                <span>PRODUCT DESCRIPTION</span>
                {openSection === 'description' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSection === 'description' && (
                <div className="accordion-content">
                  <p>{product.description}</p>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleAccordion('details')}>
                <span>DETAILS & CARE</span>
                {openSection === 'details' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSection === 'details' && (
                <div className="accordion-content">
                  <ul>
                    {product.details.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleAccordion('shipping')}>
                <span>SHIPPING & RETURNS</span>
                {openSection === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSection === 'shipping' && (
                <div className="accordion-content">
                  <p>All domestic orders are processed and dispatched within 24-48 business hours.</p>
                  <p style={{ marginTop: '0.5rem' }}>
                    Enjoy free shipping anywhere in India. Returns and exchanges are accepted within 7 days of delivery in unworn condition with tags attached.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      <section style={{ borderTop: '1px solid #e5e5e5', marginTop: '3rem' }}>
        <div className="section-header-bar">
          <h2 className="section-title">YOU MAY ALSO LIKE</h2>
          <Link to="/collection/all-drops" className="section-link">
            VIEW ALL
          </Link>
        </div>
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
