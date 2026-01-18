import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { FaMapMarkerAlt, FaClock, FaCalendar } from "react-icons/fa";

import "../styles/cart.css";

/* -------- TIME FORMATTER -------- */
const formatTime = (time) =>
  new Date(time).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

/* -------- STORAGE UTILITY -------- */
const saveCartData = (data) => {
  const essentialData = {
    venue: {
      venueName: data.venue?.venueName,
      venueAddress: data.venue?.venueAddress,
    },
    spot: {
      spotName: data.spot?.spotName,
      spotPricePerHour: data.spot?.spotPricePerHour,
    },
    date: data.date,
    startTime: data.startTime,
    endTime: data.endTime,
    selectedSlots: data.selectedSlots,
    duration: data.duration,
    totalPrice: data.totalPrice,
  };

  localStorage.setItem("cartData", JSON.stringify(essentialData));
};

export default function Cart() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    if (state) {
      saveCartData(state);
      setCartData(state);
    } else {
      const savedCart = localStorage.getItem("cartData");
      if (savedCart) setCartData(JSON.parse(savedCart));
    }
  }, [state]);

  const handleRemoveFromCart = () => {
    localStorage.removeItem("cartData");
    setCartData(null);
    navigate("/");
  };

  if (!cartData) {
    return (
      <div className="cart-empty-wrapper">
        <p className="cart-empty-text">
          <FiShoppingCart size={24} /> Cart is empty
        </p>
        <button onClick={() => navigate("/")} className="cart-empty-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  const { venue, spot, date, selectedSlots, duration, totalPrice } = cartData;

  return (
    <div className="cart-wrapper">
      <h1 className="cart-title">
        <FiShoppingCart /> Your Cart
      </h1>

      <div className="cart-grid">
        {/* LEFT SECTION */}
        <div className="cart-left">
          <h2 className="cart-section-title">Booking Details</h2>

          <div className="venue-box">
            <p className="venue-name">{venue?.venueName}</p>
            <p className="venue-address">
              <FaMapMarkerAlt size={14} /> {venue?.venueAddress}
            </p>
          </div>

          <div className="cart-detail-list">
            <div className="cart-item">
              <span className="label">Court</span>
              <span className="value">{spot?.spotName}</span>
            </div>

            <div className="cart-item">
              <span className="label label-with-icon">
                <FaCalendar size={14} /> Date
              </span>
              <span className="value">
                {new Date(date).toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="cart-item cart-slots-box">
              <span className="label label-with-icon">
                <FaClock size={14} /> Selected Time Slots
              </span>

              <div className="slots-list">
                {selectedSlots.map((slot, idx) => (
                  <div className="slot-badge" key={idx}>
                    {formatTime(slot.start)} - {formatTime(slot.end)}
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-item">
              <span className="label">Total Duration</span>
              <span className="value">
                {duration} Hour{duration > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SUMMARY CARD */}
        <div className="cart-summary">
          <h3 className="summary-title">Summary</h3>

          <div className="summary-details">
            <div className="summary-row">
              <span>Hourly Rate</span>
              <span>₹{spot?.spotPricePerHour}</span>
            </div>

            <div className="summary-row">
              <span>Slots Selected</span>
              <span>{duration}</span>
            </div>
          </div>

          <div className="summary-total">Total: ₹{totalPrice}</div>

          <button className="btn-primary">Confirm & Pay</button>

          <button onClick={() => navigate(-1)} className="btn-outline">
            <FiArrowLeft /> Edit Selections
          </button>

          <button onClick={handleRemoveFromCart} className="btn-clear">
            <FiTrash2 size={16} /> <span>Clear Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
