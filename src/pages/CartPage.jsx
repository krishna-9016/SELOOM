import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  const formatPrice = (amount) => {
    return `Rs. ${amount.toLocaleString('en-IN')}.00`;
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem', minHeight: '75vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e5e5', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
        <h1 className="heading-lg" style={{ fontSize: '1.75rem', letterSpacing: '0.1em' }}>
          SHOPPING BAG ({totalItems})
        </h1>
        <Link to="/collection/all-drops" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          <ArrowLeft size={14} /> CONTINUE SHOPPING
        </Link>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <ShoppingBag size={52} strokeWidth={1.25} color="#a3a3a3" />
          <h2 className="mono-title" style={{ fontSize: '1rem' }}>YOUR BAG IS CURRENTLY EMPTY</h2>
          <p style={{ color: '#737373', fontSize: '0.85rem' }}>Browse our latest arrivals and explore modern streetwear essentials.</p>
          <Link to="/collection/new-arrivals" className="btn-dark" style={{ marginTop: '1rem' }}>
            EXPLORE NEW DROPS
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          {/* Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid #e5e5e5'
                }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: 100, height: 125, objectFit: 'cover', backgroundColor: '#f5f5f5' }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {item.product.name}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#737373', marginTop: 4, letterSpacing: '0.05em' }}>
                      SIZE: {item.size}
                    </p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: 6 }}>
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="qty-stepper">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ fontSize: '0.72rem', color: '#737373', textDecoration: 'underline' }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{
            backgroundColor: '#fafafa',
            padding: '2rem',
            border: '1px solid #e5e5e5',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <h2 className="mono-title" style={{ fontSize: '0.85rem', borderBottom: '1px solid #e5e5e5', paddingBottom: '0.75rem' }}>
              ORDER SUMMARY
            </h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span>Items Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1rem',
              fontWeight: 800,
              borderTop: '1px solid #e5e5e5',
              paddingTop: '1rem'
            }}>
              <span>ESTIMATED TOTAL</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button
              className="btn-checkout"
              onClick={() => alert(`SELOOM Prototype: Order checkout initialized for ${formatPrice(subtotal)}!`)}
            >
              PROCEED TO CHECKOUT
            </button>

            <p style={{ fontSize: '0.68rem', color: '#737373', textAlign: 'center', letterSpacing: '0.04em' }}>
              Taxes calculated at checkout. Free shipping across India.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
