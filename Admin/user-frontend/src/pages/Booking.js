import { useEffect, useState } from "react";
import { getSpots, getSlots } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiMapPin,
  FiCalendar,
  FiClock,
} from "react-icons/fi";

/* --------- UTILS --------- */
const formatTime = (date) =>
  date.toLocaleTimeString("en-IN", {
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
  const { id } = useParams(); // serviceId
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [venue, setVenue] = useState(null);
  const [spots, setSpots] = useState([]);
  const [slotsFromBackend, setSlotsFromBackend] = useState([]);
  const [uiSlots, setUiSlots] = useState([]);

  const [date, setDate] = useState(today);
  const [spotId, setSpotId] = useState("");
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState(1);

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
      setSelectedSlot(null);
      setDuration(1);
    });
  }, [spotId, date]);

  /* -------- GENERATE UI TIME SLOTS -------- */
  useEffect(() => {
    if (slotsFromBackend.length === 0) {
      setUiSlots([]);
      return;
    }

    const slot = slotsFromBackend[0]; // single slot range
    const generated = generateTimeSlots(
      slot.slotStartTime,
      slot.slotEndTime,
      date
    );

    setUiSlots(generated);
  }, [slotsFromBackend, date]);

  /* -------- PRICE -------- */
  const totalPrice =
    selectedSpot && duration
      ? selectedSpot.spotPricePerHour * duration
      : 0;

  /* -------- ADD TO CART -------- */
  const handleAddToCart = () => {
    if (!selectedSpot || !selectedSlot) {
      alert("Please select court and time");
      return;
    }

    const endTime = new Date(
      selectedSlot.start.getTime() + duration * 60 * 60 * 1000
    );

    navigate("/cart", {
      state: {
        venue,
        spot: selectedSpot,
        date,
        startTime: selectedSlot.start,
        endTime,
        duration,
        totalPrice,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
      {/* LEFT CARD */}
      <div className="w-[420px] bg-white border rounded-xl p-6">
        {/* VENUE INFO (FIXED) */}
        <h2 className="text-xl font-bold mb-1">
          {venue?.venueName || "Select a court"}
        </h2>

        <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
          <FiMapPin size={14} />
          {venue?.venueAddress || "Select a court to see address"}
        </p>

        {/* DATE */}
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

        {/* COURT */}
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
              setVenue(spot?.venue); // ✅ MAIN FIX
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

        {/* TIME */}
        <div className="mb-6">
          <label className="font-semibold block mb-2 flex items-center gap-2">
            <FiClock size={16} /> Start Time
          </label>

          {uiSlots.length === 0 ? (
            <p className="text-gray-400">No slots available</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {uiSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlot(slot)}
                  className={`border rounded-lg py-2 text-sm font-medium ${
                    selectedSlot === slot
                      ? "bg-blue-600 text-white"
                      : "hover:border-blue-600"
                  }`}
                >
                  {formatTime(slot.start)} – {formatTime(slot.end)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DURATION */}
        <div className="mb-4">
          <label className="font-semibold block mb-2">Duration</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDuration(Math.max(1, duration - 1))}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <FiMinus />
            </button>

            <span className="font-semibold">{duration} Hr</span>

            <button
              onClick={() => setDuration(duration + 1)}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        {/* PRICE */}
        {selectedSpot && (
          <div className="mb-6 text-lg font-semibold text-blue-700">
            Total Price: ₹{totalPrice}
          </div>
        )}

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          disabled={!spotId || !selectedSlot}
          className={`w-full py-3 rounded font-semibold flex items-center justify-center gap-2 ${
            spotId && selectedSlot
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FiShoppingCart size={18} /> Add To Cart
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex-1 bg-white border rounded-xl flex items-center justify-center">
        <p className="text-gray-500 font-medium">Cart Is Empty</p>
      </div>
    </div>
  );
}
