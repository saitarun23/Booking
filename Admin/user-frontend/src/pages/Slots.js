import { useState } from "react";
import { getSlots } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";

export default function Slots() {
  const { id } = useParams();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const nav = useNavigate();

  const load = () => {
    if (!date) {
      setError("Please select a date");
      return;
    }

    setLoading(true);
    setError(null);
    getSlots(id, date)
      .then((res) => {
        setSlots(res.data || []);
        setSearched(true);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load slots");
        setSlots([]);
        setSearched(true);
      })
      .finally(() => setLoading(false));
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Slots</h1>

      {/* Date Picker */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              min={today}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={load}
              disabled={loading}
              className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Searching..." : "Search Slots"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {/* Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {searched && slots.length === 0 && !error && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="mb-2">No slots available for the selected date</p>
            <p className="text-sm">Try selecting a different date</p>
          </div>
        )}

        {slots.map((slot) => (
          <div
            key={slot.slotId}
            className={`p-6 rounded-lg border-2 cursor-pointer transition ${
              slot.slotActive
                ? "border-green-200 hover:border-green-600 bg-white hover:shadow-lg"
                : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
            }`}
            onClick={() => {
              if (slot.slotActive) nav(`/book/${slot.slotId}`);
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  Slot #{slot.slotId}
                </h2>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  slot.slotActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {slot.slotActive ? "Available" : "Booked"}
              </span>
            </div>

            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span className="font-medium">Start Time:</span>
                <span>
                  {new Date(slot.slotStartTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">End Time:</span>
                <span>
                  {new Date(slot.slotEndTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="font-medium">Price:</span>
                <span className="text-green-600 font-semibold">
                  ₹{slot.slotPrice}
                </span>
              </div>
            </div>

            {slot.slotActive && (
              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                Book Slot
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
