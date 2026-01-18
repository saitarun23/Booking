// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiLogIn, FiUserPlus } from "react-icons/fi"; // ⬅️ icons here
import "../styles/navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo-link" onClick={closeMenu}>
            <span className="navbar-logo">BookingHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-desktop-menu">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            
            <Link to="/categories" className="navbar-link">
              Categories
            </Link>
            <Link to="/about" className="navbar-link">
              About
            </Link>
            <Link to="/contact" className="navbar-link">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Icons */}
          <div className="navbar-auth">
            <button
              className="navbar-signin-btn"
              aria-label="Sign In"
              title="Sign In"
            >
              <FiLogIn className="navbar-auth-icon" />
            </button>
            <button
              className="navbar-signup-btn"
              aria-label="Sign Up"
              title="Sign Up"
            >
              <FiUserPlus className="navbar-auth-icon" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="navbar-mobile-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="navbar-mobile-menu"
          >
            <svg
              className="navbar-mobile-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12" // X icon
                    : "M4 6h16M4 12h16M4 18h16" // Hamburger
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="navbar-mobile-menu"
          className={`navbar-mobile-menu ${isMenuOpen ? "active" : ""}`}
          aria-hidden={!isMenuOpen}
        >
          <Link to="/" className="navbar-mobile-link" onClick={closeMenu}>
            Home
          </Link>
          
          <Link
            to="/categories"
            className="navbar-mobile-link"
            onClick={closeMenu}
          >
            Categories
          </Link>
          <Link to="/about" className="navbar-mobile-link" onClick={closeMenu}>
            About
          </Link>
          <Link
            to="/contact"
            className="navbar-mobile-link"
            onClick={closeMenu}
          >
            Contact
          </Link>

          <div className="navbar-mobile-divider"></div>

          <button
            className="navbar-mobile-signin-btn"
            onClick={closeMenu}
            aria-label="Sign In"
            title="Sign In"
          >
            <FiLogIn className="navbar-auth-icon" />
          </button>
          <button
            className="navbar-mobile-signup-btn"
            onClick={closeMenu}
            aria-label="Sign Up"
            title="Sign Up"
          >
            <FiUserPlus className="navbar-auth-icon" />
          </button>
        </div>
      </div>
    </nav>
  );
}
