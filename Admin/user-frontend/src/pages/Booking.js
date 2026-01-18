import { useEffect, useState } from "react";
import { getSpots, getSlots, getSpotImages } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiCalendar,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import "../styles/booking.css";

/* --------- UTILS --------- */
const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const generateTimeSlots = (startTime, endTime, selectedDate) => {
  if (!startTime || !endTime) return [];

  const start = new Date(
    `${selectedDate}T${startTime.split("T")[1].slice(0, 5)}`
  );
  const end = new Date(
    `${selectedDate}T${endTime.split("T")[1].slice(0, 5)}`
  );

  const slots = [];
  let current = new Date(start);

  while (current < end) {
    const next = new Date(current.getTime() + 60 * 60 * 1000);
    if (next > end) break;

    slots.push({ start: new Date(current), end: new Date(next) });
    current = next;
  }

  return slots;
};

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [venue, setVenue] = useState(null);
  const [spots, setSpots] = useState([]);
  const [slotsFromBackend, setSlotsFromBackend] = useState([]);
  const [uiSlots, setUiSlots] = useState([]);

  const [date, setDate] = useState(today);
  const [spotId, setSpotId] = useState("");
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const [images, setImages] = useState([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  /* ---------- FETCH SPOTS (COURTS) ---------- */
  useEffect(() => {
    if (!id) return;

    getSpots(id).then((res) => {
      const list = res.data || [];
      setSpots(list);

      // Auto-select FIRST court when data arrives
      if (list.length > 0) {
        const first = list[0];
        setSpotId(first.spotId);
        setSelectedSpot(first);
        setVenue(first.venue);
      }
    });
  }, [id]);

  /* ---------- FETCH IMAGES FOR SELECTED COURT ---------- */
  useEffect(() => {
    if (!spotId) {
      setImages([]);
      return;
    }

    getSpotImages(spotId).then((res) => {
      setImages(res.data || []);
      setCurrentImgIndex(0);
    });
  }, [spotId]);

  /* ---------- FETCH SLOTS FOR SELECTED COURT + DATE ---------- */
  useEffect(() => {
    if (!spotId || !date) return;

    getSlots(spotId, date).then((res) => {
      setSlotsFromBackend(res.data || []);
      setSelectedSlots([]);
    });
  }, [spotId, date]);

  /* ---------- BUILD UI SLOTS FROM BACKEND WINDOW ---------- */
  useEffect(() => {
    if (slotsFromBackend.length === 0) {
      setUiSlots([]);
      return;
    }

    const slot = slotsFromBackend[0];
    setUiSlots(generateTimeSlots(slot.slotStartTime, slot.slotEndTime, date));
  }, [slotsFromBackend, date]);

  /* ---------- CAROUSEL ---------- */
  const nextImage = () => {
    setCurrentImgIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  /* ---------- SLOT SELECTION ---------- */
  const handleSlotClick = (slot) => {
    setSelectedSlots((prev) => {
      const exists = prev.some(
        (s) => s.start.getTime() === slot.start.getTime()
      );
      if (exists) {
        return prev.filter(
          (s) => s.start.getTime() !== slot.start.getTime()
        );
      }
      return [...prev, slot];
    });
  };

  /* ---------- PRICE ---------- */
  const totalPrice =
    selectedSpot && selectedSlots.length
      ? selectedSpot.spotPricePerHour * selectedSlots.length
      : 0;

  const handleAddToCart = () => {
    if (!selectedSpot || selectedSlots.length === 0) {
      alert("Please select at least one time slot");
      return;
    }

    const sorted = [...selectedSlots].sort((a, b) => a.start - b.start);

    navigate("/cart", {
      state: {
        venue,
        spot: selectedSpot,
        date,
        startTime: sorted[0].start,
        endTime: sorted[sorted.length - 1].end,
        selectedSlots: sorted,
        duration: sorted.length,
        totalPrice,
      },
    });
  };

  const now = new Date();
  const isToday = date === today;

  return (
    <div className="booking-wrapper">
      {/* RIGHT SIDE → Booking Panel */}
      <div className="booking-card">
        <h2 className="booking-title">
          {venue?.venueName || "Select Court"}
        </h2>

        {/* COURT SELECT */}
        <label className="booking-label">Court</label>
        <select
          className="booking-select"
          value={spotId}
          onChange={(e) => {
            const val = Number(e.target.value);
            const spot = spots.find((s) => s.spotId === val);
            setSpotId(val);
            setSelectedSpot(spot || null);
            setVenue(spot?.venue || null);
          }}
        >
          {spots.length === 0 && (
            <option value="">No courts available</option>
          )}
          {spots.length > 0 &&
            spots.map((spot) => (
              <option key={spot.spotId} value={spot.spotId}>
                {spot.spotName} – ₹{spot.spotPricePerHour}/hr
              </option>
            ))}
        </select>

        {/* DATE */}
        <label className="booking-label">
          <FiCalendar size={16} /> Date
        </label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="booking-date"
        />

        {/* TIME SLOTS */}
        <label className="booking-label">
          <FiClock size={16} /> Select Time Slots
        </label>

        <div className="slot-box">
          {uiSlots.length === 0 ? (
            <p className="no-slots">No slots available</p>
          ) : (
            uiSlots.map((slot, idx) => {
              const selected = selectedSlots.some(
                (s) => s.start.getTime() === slot.start.getTime()
              );

              // 🚫 Disable past slots only for today
              const isPastSlot =
                isToday && slot.end.getTime() <= now.getTime();

              return (
                <button
                  key={idx}
                  disabled={isPastSlot}
                  className={`slot-btn 
                    ${selected ? "slot-selected" : ""} 
                    ${isPastSlot ? "slot-disabled" : ""}
                  `}
                  onClick={() => {
                    if (!isPastSlot) handleSlotClick(slot);
                  }}
                >
                  {formatTime(slot.start)} – {formatTime(slot.end)}
                </button>
              );
            })
          )}
        </div>

        {/* PRICE */}
        {selectedSlots.length > 0 && (
          <div className="total-price">Total Price: ₹{totalPrice}</div>
        )}

        <button
          onClick={handleAddToCart}
          className={`add-cart-btn ${
            !spotId || selectedSlots.length === 0 ? "disabled" : ""
          }`}
        >
          <FiShoppingCart size={18} /> Add To Cart
        </button>
      </div>

      {/* LEFT SIDE → IMAGE GALLERY */}
      <div className="booking-gallery">
        {images.length > 0 ? (
          <>
            <img
              src={`data:image/jpeg;base64,${images[currentImgIndex].imageData}`}
              className="gallery-img"
              alt="court"
            />

            {images.length > 1 && (
              <>
                <button
                  className="gallery-arrow left"
                  onClick={prevImage}
                >
                  <FiChevronLeft size={24} />
                </button>

                <button
                  className="gallery-arrow right"
                  onClick={nextImage}
                >
                  <FiChevronRight size={24} />
                </button>

                <div className="gallery-dots">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`dot ${
                        idx === currentImgIndex ? "active" : ""
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="no-image-box">
            <FiCalendar size={40} className="no-img-icon" />
            <p>No images available</p>
          </div>
        )}
      </div>
    </div>
  );
}
