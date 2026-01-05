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
    selectedSlots: data.selectedSlots, // Saving the full array
    duration: data.duration,
    totalPrice: data.totalPrice,
  };

  try {
    localStorage.setItem("cartData", JSON.stringify(essentialData));
  } catch (error) {
    console.error("LocalStorage error:", error);
  }
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
      if (savedCart) {
        try {
          setCartData(JSON.parse(savedCart));
        } catch (error) {
          localStorage.removeItem("cartData");
        }
      }
    }
  }, [state]);

  const handleRemoveFromCart = () => {
    localStorage.removeItem("cartData");
    setCartData(null);
    navigate("/");
  };

  if (!cartData) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-gray-500 text-lg flex items-center gap-2">
          <FiShoppingCart size={24} /> Cart is empty
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
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
    selectedSlots,
    duration,
    totalPrice,
  } = cartData;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FiShoppingCart /> Your Cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: BOOKING DETAILS */}
        <div className="md:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">Booking Details</h2>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold text-blue-900">{venue?.venueName}</p>
            <p className="text-blue-700 text-sm mt-1 flex items-center gap-2">
              <FaMapMarkerAlt size={14} /> {venue?.venueAddress}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Court</span>
              <span className="text-gray-900 font-medium">{spot?.spotName}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700 flex items-center gap-2">
                <FaCalendar size={14} /> Date
              </span>
              <span className="text-gray-900 font-medium">
                {new Date(date).toLocaleDateString('en-IN', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>

            {/* UPDATED TIME SECTION: Displays individual slots as badges */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                <FaClock size={14} /> Selected Time Slots
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedSlots && selectedSlots.length > 0 ? (
                  selectedSlots.map((slot, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-bold border border-blue-200"
                    >
                      {formatTime(slot.start)} - {formatTime(slot.end)}
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400">No specific slots data found</span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">Total Duration</span>
              <span className="text-gray-900 font-medium">
                {duration} Hour{duration > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: PRICE SUMMARY */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 h-fit sticky top-6">
          <h3 className="text-lg font-bold mb-4 text-blue-900">Summary</h3>

          <div className="space-y-3 mb-4 pb-4 border-b border-blue-200 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Hourly Rate</span>
              <span className="font-medium">₹{spot?.spotPricePerHour}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Slots Selected</span>
              <span className="font-medium">{duration}</span>
            </div>
          </div>

          <div className="text-2xl font-extrabold text-blue-700 mb-6">
            Total: ₹{totalPrice}
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md transition">
              Confirm & Pay
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
            >
              <FiArrowLeft /> Edit Selections
            </button>

            <button
              onClick={handleRemoveFromCart}
              className="mt-2 w-full py-2 text-red-500 text-sm font-medium hover:underline flex items-center justify-center gap-1"
            >
              <FiTrash2 size={14} /> Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}