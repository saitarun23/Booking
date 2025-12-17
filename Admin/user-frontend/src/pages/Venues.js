import { useEffect, useState } from "react";
import { getVenues } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import VenueLocation from "../components/VenueLocation";
import "../styles/venue.css";

export default function Venues() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getVenues(id)
      .then((res) => {
        const venues = res.data || [];
        // Since API returns list, take the first venue (or you can adjust based on your needs)
        if (venues.length > 0) {
          setVenue(venues[0]);
        } else {
          setVenue(null);
        }
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load venue details");
        setVenue(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleNextImage = () => {
    if (venue?.images && venue.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
    }
  };

  const handlePrevImage = () => {
    if (venue?.images && venue.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length);
    }
  };

  const getImageSrc = (image) => {
    if (!image) return null;
    if (/^[A-Za-z0-9+/=]+$/.test(image) && image.length > 100) {
      return `data:image/png;base64,${image}`;
    }
    return image;
  };

  if (loading) {
    return (
      <div className="venue-wrapper">
        <div className="venue-container">
          <div className="venue-loading">
            <div className="venue-loading-content">
              <div className="venue-loading-spinner"></div>
              <p className="venue-loading-text">Loading venue details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="venue-wrapper">
        <div className="venue-container">
          <button
            onClick={() => nav(-1)}
            className="venue-breadcrumb-link"
            style={{ marginBottom: "1rem", fontSize: "1rem", padding: "0.5rem" }}
          >
            ← Go Back
          </button>
          <div className="venue-error">
            <div className="venue-error-flex">
              <svg className="venue-error-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h2 className="venue-error-title">Error Loading Venue</h2>
                <p className="venue-error-message">{error || "Venue not found"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const venueImages = venue.images && Array.isArray(venue.images) ? venue.images : [venue.image];
  const currentImage = venueImages[currentImageIndex];
  const imageSrc = getImageSrc(currentImage);

  return (
    <div className="venue-wrapper">
      <div className="venue-container">
        {/* Breadcrumb */}
        <div className="venue-breadcrumb">
          <span
            className="venue-breadcrumb-link"
            onClick={() => nav("/category/1")}
          >
            Categories
          </span>
          <span className="venue-breadcrumb-separator">›</span>
          <span
            className="venue-breadcrumb-link"
            onClick={() => nav(-1)}
          >
            Services
          </span>
          <span className="venue-breadcrumb-separator">›</span>
          <span className="venue-breadcrumb-item">{venue.venueName}</span>
        </div>

        {/* Main Content */}
        <div className="venue-content">
          {/* Left Column - Gallery and Info */}
          <div>
            {/* Gallery */}
            <div className="venue-gallery">
              <div className="venue-main-image" style={{ position: "relative" }}>
                <img
                  src={imageSrc || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23ddd' width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23999'%3ENo Image Available%3C/text%3E%3C/svg%3E"}
                  alt={venue.venueName}
                />
                {venueImages.length > 1 && (
                  <>
                    <button className="carousel-nav-btn carousel-prev" onClick={handlePrevImage}>
                      ‹
                    </button>
                    <button className="carousel-nav-btn carousel-next" onClick={handleNextImage}>
                      ›
                    </button>
                  </>
                )}
              </div>
              {venueImages.length > 1 && (
                <div className="venue-carousel-controls">
                  {venueImages.map((_, index) => (
                    <div
                      key={index}
                      className={`carousel-dot ${index === currentImageIndex ? "active" : ""}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Header */}
            <div className="venue-header" style={{ marginTop: "2rem" }}>
              <div className="venue-title-group">
                <div>
                  <h1 className="venue-title">{venue.venueName}</h1>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="amenities-box">
              <h3>Amenities</h3>

              <div className="amenities-list">
                {venue.venueAmenities
                  ?.split(",")
                  .map((item, index) => (
                    <div className="amenity-item" key={index}>
                      <span className="check">✔</span>
                      <span>{item.trim()}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Sports Section */}
            {venue.sports && venue.sports.length > 0 && (
              <div className="venue-sports-section" style={{ marginTop: "2rem" }}>
                <h2 className="venue-sports-title">Sports Available</h2>
                <p className="venue-sports-subtitle">(Click on sports to view price chart)</p>
                <div className="venue-sports-grid">
                  {venue.sports.map((sport, idx) => (
                    <div
                      key={idx}
                      className="venue-sport-item"
                      onClick={() => nav(`/booking/${venue.venueId}`)}
                    >
                      <div className="venue-sport-icon">🎯</div>
                      <p className="venue-sport-name">{sport.sportName}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

        
            {/* About Venue */}
            {(venue.venueDescription || venue.description) && (
              <div className="venue-about-section">
                <h2 className="venue-about-title">About Venue</h2>
                <div className="venue-about-content">
                  {(venue.venueDescription || venue.description)
                    ?.split("\n")
                    .filter((para) => para.trim())
                    .map((para, idx) => (
                      <p key={idx}>{para.trim()}</p>
                    ))}
                  {venue.features && venue.features.length > 0 && (
                    <>
                      <ul className="venue-about-list">
                        {venue.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Rules Section */}
            {venue.rules && venue.rules.length > 0 && (
              <div className="venue-rules-section">
                <h2 className="venue-rules-title">General Rules</h2>
                <ul className="venue-rules-list">
                  {venue.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="venue-sidebar">
            {/* Book Now Button */}
            <button
              className="venue-book-btn venue-book-btn-gradient"
              onClick={() => nav(`/booking/${venue.venueId}`)}
            >
              Book Now
            </button>

            {/* Info Card */}
            <div className="venue-info-card">
              {venue.openingTime && venue.closingTime && (
                <div className="venue-info-item">
                  <div className="venue-info-label">Timing</div>
                  <div className="venue-info-value">
                    {venue.openingTime} - {venue.closingTime}
                  </div>
                </div>
              )}
              {venue.venueAddress && (
                <div className="venue-info-item">
                  <div className="venue-info-label">Location</div>
                  <div className="venue-info-value">{venue.venueAddress}</div>
                </div>
              )}
            </div>
           
            {/* Location Map Card */}
            {venue.latitude && venue.longitude && (
              <div className="venue-info-card" style={{ padding: 0, overflow: "hidden" }}>
                <VenueLocation venue={venue} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
