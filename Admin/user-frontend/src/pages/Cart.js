import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { FaMapMarkerAlt, FaClock, FaCalendar } from "react-icons/fa";

/* -------- TIME FORMATTER -------- */
const formatTime = (time) =>
  new Date(time).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

export default function Cart() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    if (state) {
      // Save to localStorage
      localStorage.setItem("cartData", JSON.stringify(state));
      setCartData(state);
    } else {
      // Load from localStorage
      const savedCart = localStorage.getItem("cartData");
      if (savedCart) {
        setCartData(JSON.parse(savedCart));
      }
    }
  }, [state]);

  const handleRemoveFromCart = () => {
    localStorage.removeItem("cartData");
    setCartData(null);
    navigate("/");
  };

  // SAFETY CHECK
  if (!cartData) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-gray-500 text-lg flex items-center gap-2">
          <FiShoppingCart size={24} /> Cart is empty
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const {
    venue,
    spot,
    date,
    startTime,
    endTime,
    duration,
    totalPrice,
  } = cartData;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2"><FiShoppingCart /> Your Cart</h1>

      {/* CART ITEMS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* MAIN CART CARD */}
        <div className="md:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">Booking Details</h2>

          {/* VENUE CARD */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold text-blue-900">{venue?.venueName}</p>
            <p className="text-blue-700 text-sm mt-1 flex items-center gap-2"><FaMapMarkerAlt size={14} /> {venue?.venueAddress}</p>
          </div>

          {/* BOOKING DETAILS */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Court</span>
              <span className="text-gray-900 font-medium">{spot?.spotName}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700 flex items-center gap-2"><FaCalendar size={14} /> Date</span>
              <span className="text-gray-900 font-medium">{new Date(date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700 flex items-center gap-2"><FaClock size={14} /> Time</span>
              <span className="text-gray-900 font-medium">
                {formatTime(startTime)} – {formatTime(endTime)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Duration</span>
              <span className="text-gray-900 font-medium">{duration} Hour{duration > 1 ? 's' : ''}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Rate/Hour</span>
              <span className="text-gray-900 font-medium">₹{spot?.spotPricePerHour}</span>
            </div>
          </div>
        </div>

        {/* PRICE SUMMARY CARD */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 h-fit sticky top-6">
          <h3 className="text-lg font-bold mb-4 text-blue-900">Price Summary</h3>

          <div className="space-y-3 mb-4 pb-4 border-b border-blue-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Hourly Rate</span>
              <span className="font-medium">₹{spot?.spotPricePerHour}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">× {duration} Hour{duration > 1 ? 's' : ''}</span>
              <span className="font-medium">₹{spot?.spotPricePerHour * duration}</span>
            </div>
          </div>

          <div className="text-xl font-bold text-blue-700 mb-6">
            Total: ₹{totalPrice}
          </div>

          {/* ACTIONS */}
          <div className="space-y-3 flex flex-col">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
            >
              <FiArrowLeft /> Back to Booking
            </button>

            <button
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
            >
              ✓ Proceed to Payment
            </button>

            <button
              onClick={handleRemoveFromCart}
              className="px-6 py-3 rounded-lg border-2 border-red-600 text-red-600 font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
            >
              <FiTrash2 /> Remove from Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
