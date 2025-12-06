import { useState, useEffect } from "react";
import { getSlots } from "../api/userApi";

export default function BookingCard({ venue, spotId, onAddToCart }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState(1);
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!spotId) return;

    setLoading(true);
    setError(null);
    getSlots(spotId, date)
      .then((res) => {
        setSlots(res.data || []);
        setSelectedSlot(null); // Reset when date changes
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load slots");
        setSlots([]);
      })
      .finally(() => setLoading(false));
  }, [date, spotId]);

  useEffect(() => {
    if (!venue || !spotId) return;

    const spot = venue.spots?.find((s) => s.spotId === spotId);
    const capacity = spot?.spotCapacity || 4;
    const courtCount = Math.max(1, Math.min(6, Math.floor(capacity / 2)));
    const courtArray = Array.from(
      { length: courtCount },
      (_, i) => `Court ${i + 1}`
    );
    setCourts(courtArray);
    if (courtArray.length) setSelectedCourt(courtArray[0]);
  }, [venue, spotId]);

  function addToCart() {
    if (!selectedSlot) {
      setError("Please select a slot");
      return;
    }
    if (!selectedCourt) {
      setError("Please select a court");
      return;
    }

    const item = {
      slotId: selectedSlot.slotId,
      start: selectedSlot.slotStartTime,
      end: selectedSlot.slotEndTime,
      price: selectedSlot.slotPrice * duration,
      date,
      duration,
      court: selectedCourt,
      venueName: venue?.venueName,
      spotName: venue?.spots?.find((s) => s.spotId === spotId)?.spotName,
    };

    onAddToCart(item);
    setError(null);
  }

  // Get today's date as minimum selectable date
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="w-full bg-white shadow rounded-lg p-6 sticky top-24 max-h-[calc(100vh-100px)] overflow-y-auto">
      <h3 className="font-semibold text-lg mb-4">{venue?.venueName || "Venue"}</h3>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Slot Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Slot
        </label>
        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
          {loading && (
            <div className="text-sm text-gray-500 p-3 text-center">
              Loading slots...
            </div>
          )}
          {!loading && slots.length === 0 && (
            <div className="text-sm text-gray-500 p-3 text-center">
              No slots available for this date
            </div>
          )}
          {!loading &&
            slots.map((s) => (
              <div
                key={s.slotId}
                onClick={() => {
                  setSelectedSlot(s);
                  setError(null);
                }}
                className={`p-3 border rounded mb-2 cursor-pointer transition ${
                  selectedSlot?.slotId === s.slotId
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-400"
                } ${!s.slotActive ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">
                      {new Date(s.slotStartTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(s.slotEndTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      ₹{s.slotPrice} per hour
                    </div>
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      s.slotActive
                        ? "text-green-600 bg-green-100 px-2 py-1 rounded"
                        : "text-red-600 bg-red-100 px-2 py-1 rounded"
                    }`}
                  >
                    {s.slotActive ? "Available" : "Booked"}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Duration Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duration (hours)
        </label>
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded">
          <button
            onClick={() => setDuration((d) => Math.max(1, d - 1))}
            className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-200 transition"
          >
            −
          </button>
          <div className="text-center flex-1 font-medium">{duration} hr</div>
          <button
            onClick={() => setDuration((d) => d + 1)}
            className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-200 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Court Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Court
        </label>
        <select
          value={selectedCourt}
          onChange={(e) => setSelectedCourt(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">-- Select Court --</option>
          {courts.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Price Summary */}
      {selectedSlot && (
        <div className="mb-4 bg-blue-50 p-3 rounded text-sm">
          <div className="flex justify-between mb-2">
            <span>Price per hour:</span>
            <span className="font-medium">₹{selectedSlot.slotPrice}</span>
          </div>
          <div className="flex justify-between text-green-700 font-semibold">
            <span>Total:</span>
            <span>₹{(selectedSlot.slotPrice * duration).toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        disabled={!selectedSlot || !selectedCourt}
        className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add to Cart
      </button>
    </div>
  );
}
