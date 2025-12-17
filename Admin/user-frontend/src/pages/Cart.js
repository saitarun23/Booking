import { useLocation, useNavigate } from "react-router-dom";

const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const calculateEndTime = (startTime, duration) => {
  const end = new Date(startTime);
  end.setHours(end.getHours() + duration);
  return end;
};

export default function Cart() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Cart is empty</p>
      </div>
    );
  }

  const { venue, spot, date, slot, duration, totalPrice } = state;
  const endTime = calculateEndTime(slot.start, duration);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Booking Cart</h1>

      <div className="bg-white border rounded-xl p-6 flex justify-between gap-6">
        {/* LEFT */}
        <div className="flex-1 space-y-3">
          <h2 className="text-lg font-semibold">{venue?.venueName}</h2>
          <p className="text-sm text-gray-500">{venue?.venueAddress}</p>

          <div className="text-sm">
            <p><b>Court:</b> {spot?.spotName}</p>
            <p><b>Date:</b> {date}</p>
            <p>
              <b>Time:</b>{" "}
              {formatTime(slot.start)} – {formatTime(endTime)}
            </p>
            <p><b>Duration:</b> {duration} Hr</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-64 border-l pl-6 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-green-700">
              ₹{totalPrice}
            </p>
          </div>

          <button className="bg-green-600 text-white py-3 rounded-lg font-semibold">
            Proceed to Pay
          </button>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 text-green-600 font-medium"
      >
        ← Back
      </button>
    </div>
  );
}
