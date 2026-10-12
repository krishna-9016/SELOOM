import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems
  } = useCart();

  const formatPrice = (amount) => {
    return `Rs. ${amount.toLocaleString('en-IN')}.00`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
      />

      {/* Slide-over panel */}
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label="Shopping Cart">
        {/* Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} />
            <h2 className="cart-header-title">BAG ({totalItems})</h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{ padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="free-shipping-bar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>FREE STANDARD SHIPPING APPLIED</span>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>100% FREE</span>
          </div>
          <div className="shipping-progress-bg">
            <div className="shipping-progress-fill" />
          </div>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            gap: '1rem'
          }}>
            <ShoppingBag size={48} strokeWidth={1.25} color="#a3a3a3" />
            <p className="mono-title" style={{ fontSize: '0.85rem' }}>YOUR BAG IS CURRENTLY EMPTY</p>
            <p style={{ fontSize: '0.8rem', color: '#737373', maxWidth: 240 }}>
              Explore our latest oversized denim and heavyweight tees.
            </p>
            <Link
              to="/collection/new-arrivals"
              onClick={closeCart}
              className="btn-dark"
              style={{ marginTop: '0.5rem' }}
            >
              SHOP NEW DROPS
            </Link>
          </div>
        ) : (
          <div className="cart-items-scroll">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-thumb"
                />
                <div className="cart-item-info">
                  <div>
                    <h3 className="cart-item-title">{item.product.name}</h3>
                    <div className="cart-item-size">SIZE: {item.size}</div>
                    <div className="cart-item-price">{formatPrice(item.product.price)}</div>
                  </div>

                  <div className="cart-qty-row">
                    <div className="qty-stepper">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal-row">
              <span>SUBTOTAL</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#737373', letterSpacing: '0.04em' }}>
              Taxes included. Shipping calculated at checkout.
            </p>
            <button
              className="btn-checkout"
              onClick={() => alert('SELOOM Prototype: Checkout simulation initialized! Subtotal: ' + formatPrice(subtotal))}
            >
              PROCEED TO CHECKOUT
            </button>
            <Link
              to="/cart"
              onClick={closeCart}
              style={{
                textAlign: 'center',
                fontSize: '0.72rem',
                fontWeight: 600,
                textDecoration: 'underline',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#737373'
              }}
            >
              VIEW FULL BAG ({totalItems})
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
