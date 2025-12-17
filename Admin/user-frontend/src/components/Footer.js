import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: "About Us", link: "/about" },
      { name: "Our Team", link: "/team" },
      { name: "Careers", link: "/careers" },
      { name: "Events", link: "/events" },
    ],
    Categories: [
      { name: "Venue Booking", link: "/" },
      { name: "Event Planning", link: "/" },
      { name: "Catering", link: "/" },
      { name: "Sports", link: "/" },
    ],
    Support: [
      { name: "Help Center", link: "/help" },
      { name: "Contact Us", link: "/contact" },
      { name: "FAQs", link: "/faq" },
      { name: "Reach Us", link: "/" },
    ],
    
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 002.856-3.915c-1.03.6-2.14 1.015-3.285 1.23a5.12 5.12 0 00-8.88 4.67c-4.25-.74-8.02-2.25-10.56-5.3-1.42 2.4-.73 5.55 1.77 7.16-1-.06-1.95-.3-2.78-.74v.1a5.12 5.12 0 004.1 5.02c-.9.25-1.85.3-2.8.1.78 2.45 3.08 4.24 5.78 4.3-2.04 1.6-4.6 2.54-7.36 2.54-.48 0-.95-.03-1.41-.1 4.14 2.65 9.03 4.2 14.3 4.2 17.16 0 26.5-14.2 26.5-26.5 0-.4-.01-.8-.03-1.2 1.82-1.32 3.4-2.97 4.65-4.85z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <span className="footer-logo">
                BookingHub
              </span>
            </Link>
            <p className="footer-description">
              Your complete booking platform for parties, food, halls, sports, and art workshops.
            </p>
            {/* Social Links */}
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  title={social.name}
                  className="footer-social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer-section">
              <h3 className="footer-section-title">{category}</h3>
              <ul className="footer-section-list">
                {links.map((link) => (
                  <li key={link.name} className="footer-section-item">
                    <Link
                      to={link.link}
                      className="footer-link"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="footer-section-title">Contact</h3>
            <div className="footer-contact-column">
              <div className="footer-contact-item">
                <svg className="footer-contact-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <p className="footer-contact-title">Email Us</p>
                  <a href="mailto:support@bookinghub.com" className="footer-contact-value">
                    support@bookinghub.com
                  </a>
                </div>
              </div>

              <div className="footer-contact-item">
                <svg className="footer-contact-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.418 1.318 1.980 4.563 4.466 7.049 2.486 2.486 5.731 4.048 7.049 4.466l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <p className="footer-contact-title">Call Us</p>
                  <a href="tel:+1234567890" className="footer-contact-value">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="footer-contact-item">
                <svg className="footer-contact-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="footer-contact-title">Visit Us</p>
                  <p className="footer-contact-value">123 Event Street, City, Country</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} Urmistek. All rights reserved.
          </p>
          
          </div>
      </div>
    </footer>
  );
}
