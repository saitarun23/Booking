import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo-link">
            <span className="navbar-logo">BookingHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-desktop-menu">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <div className="navbar-dropdown">
              <button className="navbar-dropdown-button">
                <span>Services</span>
                <svg className="navbar-dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="navbar-dropdown-menu">
                <Link to="/categories" className="navbar-dropdown-item">Categories</Link>
                <Link to="/venues" className="navbar-dropdown-item">Venues</Link>
              </div>
            </div>
            <Link to="/about" className="navbar-link">
              About
            </Link>
            <Link to="/contact" className="navbar-link">
              Contact
            </Link>
            <Link to="/cart" className="navbar-cart-link">
              Cart
              <span className="navbar-cart-badge">0</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="navbar-auth">
            <button className="navbar-signin-btn">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="navbar-mobile-btn"
          >
            <svg className="navbar-mobile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu active">
            <Link to="/" className="navbar-mobile-link">
              Home
            </Link>
            <Link to="/venues" className="navbar-mobile-link">
              Venues
            </Link>
            <Link to="/categories" className="navbar-mobile-link">
              Categories
            </Link>
            <Link to="/cart" className="navbar-mobile-link">
              Cart
            </Link>
            <div className="navbar-mobile-divider"></div>
            <button className="navbar-mobile-signin-btn">
              Sign In
            </button>
            <button className="navbar-mobile-signup-btn">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}