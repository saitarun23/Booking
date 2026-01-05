import { useEffect, useState } from "react";
import { getSpots, getSlots } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiMapPin,
  FiCalendar,
  FiClock,
} from "react-icons/fi";

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

    slots.push({
      start: new Date(current),
      end: new Date(next),
    });

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

  /* -------- FETCH SPOTS -------- */
  useEffect(() => {
    if (!id) return;
    getSpots(id).then((res) => setSpots(res.data || []));
  }, [id]);

  /* -------- FETCH SLOTS -------- */
  useEffect(() => {
    if (!spotId || !date) return;

    getSlots(spotId, date).then((res) => {
      setSlotsFromBackend(res.data || []);
      setSelectedSlots([]);
    });
  }, [spotId, date]);

  /* -------- GENERATE UI SLOTS -------- */
  useEffect(() => {
    if (slotsFromBackend.length === 0) {
      setUiSlots([]);
      return;
    }

    const slot = slotsFromBackend[0];
    setUiSlots(
      generateTimeSlots(slot.slotStartTime, slot.slotEndTime, date)
    );
  }, [slotsFromBackend, date]);

  /* -------- SLOT TOGGLE LOGIC -------- */
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

  /* -------- PRICE -------- */
  const totalPrice =
    selectedSpot && selectedSlots.length
      ? selectedSpot.spotPricePerHour * selectedSlots.length
      : 0;

  /* -------- ADD TO CART -------- */
  const handleAddToCart = () => {
    if (!selectedSpot || selectedSlots.length === 0) {
      alert("Please select court and time slots");
      return;
    }

    // Sort slots to maintain chronological order in cart
    const sortedSlots = [...selectedSlots].sort(
      (a, b) => a.start - b.start
    );

    const startTime = sortedSlots[0].start;
    const endTime = sortedSlots[sortedSlots.length - 1].end;

    navigate("/cart", {
      state: {
        venue,
        spot: selectedSpot,
        date,
        startTime,
        endTime,
        selectedSlots: sortedSlots, // IMPORTANT: Passing the full array
        duration: selectedSlots.length,
        totalPrice,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-row-reverse gap-8">
      {/* LEFT CARD (Booking Options) */}
      <div className="w-[420px] bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-1">
          {venue?.venueName || "Select a court"}
        </h2>

        <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
          <FiMapPin size={14} />
          {venue?.venueAddress || "Select a court to see address"}
        </p>

        {/* COURT SELECT */}
        <div className="mb-6">
          <label className="font-semibold block mb-1">Court</label>
          <select
            value={spotId}
            onChange={(e) => {
              const spot = spots.find(
                (s) => s.spotId === Number(e.target.value)
              );
              setSpotId(e.target.value);
              setSelectedSpot(spot);
              setVenue(spot?.venue);
            }}
            className="w-full border p-3 rounded"
          >
            <option value="">-- Select Court --</option>
            {spots.map((spot) => (
              <option key={spot.spotId} value={spot.spotId}>
                {spot.spotName} – ₹{spot.spotPricePerHour}/hr
              </option>
            ))}
          </select>
        </div>

        {/* DATE SELECT */}
        <div className="mb-4">
          <label className="font-semibold block mb-1 flex items-center gap-2">
            <FiCalendar size={16} /> Date
          </label>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-3 rounded"
          />
        </div>
        
        {/* TIME SLOTS SELECTION */}
        <div className="mb-6">
          <label className="font-semibold block mb-2 flex items-center gap-2">
            <FiClock size={16} /> Select Time Slots
          </label>

          {uiSlots.length === 0 ? (
            <p className="text-gray-400">No slots available</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
              {uiSlots.map((slot, idx) => {
                const isSelected = selectedSlots.some(
                  (s) => s.start.getTime() === slot.start.getTime()
                );

                return (
                  <button
                    key={idx}
                    onClick={() => handleSlotClick(slot)}
                    className={`border rounded-lg py-2 text-sm font-medium transition ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:border-blue-600 text-gray-700"
                    }`}
                  >
                    {formatTime(slot.start)} – {formatTime(slot.end)}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* TOTAL PRICE SUMMARY */}
        {selectedSlots.length > 0 && (
          <div className="mb-6 text-lg font-semibold text-blue-700">
            Total Price: ₹{totalPrice}
          </div>
        )}

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          disabled={!spotId || selectedSlots.length === 0}
          className={`w-full py-3 rounded font-semibold flex items-center justify-center gap-2 ${
            spotId && selectedSlots.length
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FiShoppingCart size={18} /> Add To Cart
        </button>
      </div>

      {/* RIGHT PREVIEW (Placeholder) */}
      <div className="flex-1 bg-gray-50 border border-dashed rounded-xl flex items-center justify-center">
        <p className="text-gray-400 font-medium">Image Preview Area</p>
      </div>
    </div>
  );
}