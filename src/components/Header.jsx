import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, ShoppingBag, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES, ANNOUNCEMENTS } from '../data/products';

export default function Header() {
  const location = useLocation();
  const { totalItems, openCart } = useCart();
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubbrand, setActiveSubbrand] = useState('originals');

  // Accordion states for drawer
  const [originalsOpen, setOriginalsOpen] = useState(true);
  const [selectsOpen, setSelectsOpen] = useState(false);

  // Cycle announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex(prev => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevAnnouncement = () => {
    setAnnouncementIndex(prev => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNextAnnouncement = () => {
    setAnnouncementIndex(prev => (prev + 1) % ANNOUNCEMENTS.length);
  };

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const originalsItems = [
    { label: 'ALL PRODUCTS', path: '/collection/all-drops' },
    { label: 'NEW DROPS', path: '/collection/new-arrivals' },
    { label: 'DENIMS', path: '/collection/denims' },
    { label: 'BAGGY', path: '/collection/baggy' },
    { label: 'BOOTCUT', path: '/collection/bootcut' },
    { label: 'WIDE', path: '/collection/wide' },
    { label: 'STRAIGHT', path: '/collection/straight' },
    { label: 'TOPS', path: '/collection/tops' },
  ];

  const selectsItems = [
    { label: 'CARGOS', path: '/collection/cargos' },
    { label: 'ACCESSORIES', path: '/collection/accessories' },
    { label: 'JEAN CHAINS', path: '/collection/accessories' },
  ];

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="announcement-bar">
        <button 
          onClick={handlePrevAnnouncement} 
          className="announcement-arrow" 
          aria-label="Previous announcement"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="announcement-content">
          <span>{ANNOUNCEMENTS[announcementIndex]}</span>
        </div>
        <button 
          onClick={handleNextAnnouncement} 
          className="announcement-arrow" 
          aria-label="Next announcement"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* 2. SUB-BRAND PILLS (Matching reference header: SELOOM-ORIGINALS | SELOOM-SELECTS) */}
      <div className="subbrand-tabs">
        <button
          className={`subbrand-tab ${activeSubbrand === 'originals' ? 'active' : ''}`}
          onClick={() => setActiveSubbrand('originals')}
        >
          SELOOM-ORIGINALS
        </button>
        <button
          className={`subbrand-tab ${activeSubbrand === 'selects' ? 'active' : ''}`}
          onClick={() => setActiveSubbrand('selects')}
        >
          SELOOM-SELECTS
        </button>
      </div>

      {/* 3. MAIN HEADER ROW */}
      <header className="main-header">
        <div className="header-top-row">
          {/* Left: Hamburger button */}
          <div className="header-left">
            <button
              className="header-icon-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={22} strokeWidth={1.75} />
            </button>
          </div>

          {/* Center: SELOOM Logo */}
          <div className="header-center">
            <Link to="/" className="header-logo-link">
              <img
                src="/images/logo.png"
                alt="SELOOM"
                className="header-logo-img"
              />
            </Link>
          </div>

          {/* Right: Search, Account, Shopping Bag */}
          <div className="header-right">
            <button
              className="header-icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search catalog"
            >
              <Search size={19} strokeWidth={1.75} />
            </button>
            <Link to="/cart" className="header-icon-btn" aria-label="Account">
              <User size={19} strokeWidth={1.75} />
            </Link>
            <button
              className="header-icon-btn"
              onClick={openCart}
              aria-label="Shopping bag"
            >
              <ShoppingBag size={19} strokeWidth={1.75} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>
          </div>
        </div>

        {/* 4. CATEGORY NAVIGATION ROW */}
        <nav className="category-nav-bar" aria-label="Categories">
          <ul className="category-nav-list">
            <li>
              <Link
                to="/"
                className={`category-nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                HOME
              </Link>
            </li>
            {CATEGORIES.map(cat => {
              const isActive = location.pathname === cat.path;
              const isFlash = cat.id === 'flash';
              return (
                <li key={cat.id}>
                  <Link
                    to={cat.path}
                    className={`category-nav-link ${isActive ? 'active' : ''} ${isFlash ? 'flash-link' : ''}`}
                  >
                    {cat.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* 5. SEARCH MODAL OVERLAY */}
      {searchOpen && (
        <div className="cart-drawer-overlay open" onClick={() => setSearchOpen(false)}>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              zIndex: 150,
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Search size={20} color="#737373" />
              <input
                type="text"
                placeholder="SEARCH FOR JEANS, BAGGY, TEES, OVERSIZED..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X size={22} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. HAMBURGER SLIDE DRAWER (COVERS ONLY PART OF PAGE WITH DARK THEME & ANIMATION) */}
      <div
        className={`nav-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`side-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Navigation drawer"
      >
        {/* Top: Circular close button */}
        <div className="drawer-header-row">
          <button
            className="drawer-close-circle-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Menu items list */}
        <div className="drawer-body">
          <nav className="drawer-nav">
            {/* HOME */}
            <div className="drawer-nav-item">
              <Link to="/" className="drawer-main-link" onClick={() => setMobileMenuOpen(false)}>
                HOME
              </Link>
            </div>

            {/* SELOOM ORIGINALS ACCORDION */}
            <div className="drawer-nav-item">
              <button
                className="drawer-accordion-btn"
                onClick={() => setOriginalsOpen(!originalsOpen)}
              >
                <span>SELOOM ORIGINALS</span>
                <span className={`drawer-chevron ${originalsOpen ? 'rotate' : ''}`}>
                  <ChevronDown size={17} />
                </span>
              </button>
              
              <div className={`drawer-submenu ${originalsOpen ? 'open' : ''}`}>
                {originalsItems.map(item => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="drawer-sub-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* SELOOM SELECTS ACCORDION */}
            <div className="drawer-nav-item">
              <button
                className="drawer-accordion-btn"
                onClick={() => setSelectsOpen(!selectsOpen)}
              >
                <span>SELOOM SELECTS</span>
                <span className={`drawer-chevron ${selectsOpen ? 'rotate' : ''}`}>
                  <ChevronDown size={17} />
                </span>
              </button>

              <div className={`drawer-submenu ${selectsOpen ? 'open' : ''}`}>
                {selectsItems.map(item => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="drawer-sub-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* FLASH SALE */}
            <div className="drawer-nav-item">
              <Link
                to="/collection/flash-sale"
                className="drawer-main-link flash-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                FLASH SALE ⚡
              </Link>
            </div>

            {/* CONTACT */}
            <div className="drawer-nav-item">
              <Link
                to="/contact"
                className="drawer-main-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT
              </Link>
            </div>
          </nav>
        </div>

        {/* Bottom footer: Dotted separator + My Account */}
        <div className="drawer-bottom-row">
          <Link
            to="/cart"
            className="drawer-account-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User size={18} strokeWidth={1.75} />
            <span>My Account</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
