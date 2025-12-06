import { useState } from "react";
import { bookSlot } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";

export default function BookSlot() {
  const { slotId } = useParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleBook = () => {
    // Validation
    if (!email) {
      setError("Please enter an email address");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);

    bookSlot({ slotId, userEmail: email })
      .then(() => {
        // Show success message
        const notif = document.createElement("div");
        notif.className =
          "fixed top-20 right-4 bg-green-600 text-white px-4 py-3 rounded shadow";
        notif.textContent = "✓ Booking confirmed! Redirecting...";
        document.body.appendChild(notif);
        setTimeout(() => {
          notif.remove();
          nav("/mybookings");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "Failed to book slot. Please try again."
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Confirm Booking</h1>
        <p className="text-gray-600 mb-8">Slot #{slotId}</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            disabled={loading}
          />
        </div>

        <button
          onClick={handleBook}
          disabled={loading || !email}
          className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>

        <button
          onClick={() => nav(-1)}
          className="w-full border border-gray-300 text-gray-700 py-3 rounded font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
