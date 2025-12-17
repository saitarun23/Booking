import { useEffect, useState } from "react";
import { getVenues, getSpots, getSlots } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";

/* --------- UTIL FUNCTIONS --------- */
const formatTime = (date) =>
  date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const generateTimeSlots = (startDateTime, endDateTime, selectedDate) => {
  if (!startDateTime || !endDateTime) return [];

  const start = new Date(
    `${selectedDate}T${startDateTime.split("T")[1].slice(0, 5)}`
  );
  const end = new Date(
    `${selectedDate}T${endDateTime.split("T")[1].slice(0, 5)}`
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
  const [rawSlots, setRawSlots] = useState([]);
  const [uiSlots, setUiSlots] = useState([]);

  const [date, setDate] = useState(today);
  const [spotId, setSpotId] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState(1);
  const [selectedSpot, setSelectedSpot] = useState(null);

  /* -------- FETCH VENUE -------- */
  useEffect(() => {
    if (!id) return;
    getVenues(id).then((res) => setVenue(res.data?.[0]));
  }, [id]);

  /* -------- FETCH SPOTS -------- */
  useEffect(() => {
    if (!id) return;
    getSpots(id).then((res) => setSpots(res.data || []));
  }, [id]);

  /* -------- FETCH RAW SLOTS -------- */
  useEffect(() => {
    if (!spotId || !date) return;

    getSlots(spotId, date).then((res) => {
      const activeSlots = (res.data || []).filter(
        (s) => s.slotActive && s.slotStartDate === date
      );
      setRawSlots(activeSlots);
    });
  }, [spotId, date]);

  /* -------- GENERATE UI TIME SLOTS -------- */
  useEffect(() => {
    if (rawSlots.length === 0) {
      setUiSlots([]);
      return;
    }

    const baseSlot = rawSlots[0];
    const generated = generateTimeSlots(
      baseSlot.slotStartTime,
      baseSlot.slotEndTime,
      date
    );
    setUiSlots(generated);
  }, [rawSlots, date]);

  /* -------- PRICE CALCULATION -------- */
  const totalPrice =
    selectedSpot && duration
      ? selectedSpot.spotPricePerHour * duration
      : 0;

  /* -------- HANDLE ADD TO CART -------- */
  const handleAddToCart = () => {
    if (!selectedSpot || !selectedSlot || !date) {
      alert("Please select all required fields");
      return;
    }

    navigate("/cart", {
      state: {
        venue,
        spot: selectedSpot,
        date,
        slot: selectedSlot,
        duration,
        totalPrice,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
      {/* LEFT CARD */}
      <div className="w-[420px] bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-1">
          {venue?.venueName || "Booking"}
        </h2>
        <p className="text-gray-500 text-sm mb-4">{venue?.venueAddress}</p>

        {/* DATE */}
        <div className="mb-4">
          <label className="font-semibold block mb-1">Date</label>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setSelectedSlot(null);
            }}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* START TIME */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">Start Time</label>

          {uiSlots.length === 0 ? (
            <p className="text-gray-400">No slots available</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {uiSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  className={`border rounded-lg py-2 text-sm font-medium ${
                    selectedSlot === slot
                      ? "bg-green-600 text-white"
                      : "hover:border-green-600"
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
              className="w-10 h-10 rounded-full bg-gray-200"
            >
              −
            </button>

            <span className="font-semibold">{duration} Hr</span>

            <button
              onClick={() => setDuration(duration + 1)}
              className="w-10 h-10 rounded-full bg-green-600 text-white"
            >
              +
            </button>
          </div>
        </div>

        {/* PRICE DISPLAY */}
        {selectedSpot && (
          <div className="mb-6 text-lg font-semibold text-green-700">
            Total Price: ₹{totalPrice}
          </div>
        )}

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
              setSelectedSlot(null);
              setDuration(1);
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

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          disabled={!spotId || !selectedSlot}
          className={`w-full py-3 rounded font-semibold ${
            spotId && selectedSlot
              ? "bg-green-600 text-white cursor-pointer hover:bg-green-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Add To Cart
        </button>
      </div>

      {/* RIGHT CART */}
      <div className="flex-1 bg-white border rounded-xl flex items-center justify-center">
        <p className="text-gray-500 font-medium">Cart Is Empty</p>
      </div>
    </div>
  );
}
