import { useState } from "react";
import "../styles/newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-it-works-container">
          <div className="how-it-works-header">
            <h2 className="how-it-works-title">How It Works</h2>
            <p className="how-it-works-subtitle">Book your perfect venue in three simple steps</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon-wrapper">
                <svg className="step-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="step-card-title">Browse & Search</h3>
              <p className="step-card-description">Explore our wide range of categories and find the perfect venue or service that matches your needs and preferences</p>
              <div className="step-connector"></div>
            </div>

            <div className="step-card">
              <div className="step-icon-wrapper">
                <svg className="step-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="step-card-title">Select & Customize</h3>
              <p className="step-card-description">Choose your preferred date, time, and customize all the details to create the perfect booking for your event</p>
              <div className="step-connector"></div>
            </div>

            <div className="step-card">
              <div className="step-icon-wrapper">
                <svg className="step-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="step-card-title">Confirm & Enjoy</h3>
              <p className="step-card-description">Complete your booking instantly and get ready for an amazing experience with our premium services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-grid">
          {/* Left Content */}
          <div className="newsletter-content">
            <h2 className="newsletter-title">
              Stay Updated with <span className="newsletter-title-highlight">Latest Offers</span>
            </h2>
            <p className="newsletter-description">
              Subscribe to our newsletter and get exclusive access to premium venues, special discounts, and early booking opportunities.
            </p>
            <ul className="newsletter-benefits">
              <li className="newsletter-benefit-item">
                {/* <svg className="newsletter-benefit-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg> */}
                <span className="newsletter-benefit-text">Exclusive early access to bookings</span>
              </li>
              <li className="newsletter-benefit-item">
                {/* <svg className="newsletter-benefit-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg> */}
                <span className="newsletter-benefit-text">Special discounts & promotional offers</span>
              </li>
              <li className="newsletter-benefit-item">
                {/* <svg className="newsletter-benefit-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg> */}
                <span className="newsletter-benefit-text">Event tips & venue recommendations</span>
              </li>
            </ul>
          </div>

          {/* Right - Subscribe Form */}
          <div>
            <form onSubmit={handleSubscribe} className="newsletter-form-container">
              <h3 className="newsletter-form-title">
                Get Started Today
              </h3>
              <p className="newsletter-form-subtitle">
                Your trusted platform for booking premium venues and event services with ease.  
              </p>
              <div className="newsletter-form-group">
                {/* Email Input with Button */}
                <div className="newsletter-input-group">
                  <div className="newsletter-input-container">
                    <label htmlFor="email" className="newsletter-form-label">
                      Email Address
                    </label>
                    <div className="newsletter-form-input-wrapper">
                      <svg className="newsletter-form-input-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="newsletter-form-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Join Button */}
                  <button
                    type="submit"
                    className="newsletter-form-button newsletter-button-inline"
                  >
                    <span>Join Now</span>
                    <svg className="newsletter-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>

                {/* Success Message */}
                {subscribed && (
                  <div className="newsletter-success-message">
                    <p className="newsletter-success-text">
                      <svg className="newsletter-success-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Successfully subscribed!</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="newsletter-form-footer">
                <p className="newsletter-trust-text">Trusted by leading event organizers</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
