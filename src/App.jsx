import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import CollectionPage from './pages/CollectionPage';
import FlashSalePage from './pages/FlashSalePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

// Scroll to top component on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Global Notification Toast
function GlobalToast() {
  const { notification } = useCart();
  if (!notification) return null;

  return (
    <div className="toast-notice">
      {notification.message}
    </div>
  );
}

function MainApp() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/new-arrivals" element={<CollectionPage />} />
          <Route path="/collection/flash-sale" element={<FlashSalePage />} />
          <Route path="/collection/all-drops" element={<CollectionPage />} />
          <Route path="/collection/:categorySlug" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
      <CartDrawer />
      <GlobalToast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </BrowserRouter>
  );
}
