import { useState } from "react";

export default function Cart({ items, onRemove }) {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  function handleCheckout() {
    setIsCheckoutLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      alert("Proceeding to payment gateway...");
      setIsCheckoutLoading(false);
    }, 500);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-24 max-h-[calc(100vh-100px)] overflow-y-auto">
      <h4 className="font-semibold text-lg mb-4">Your Cart</h4>

      {items.length === 0 && (
        <div className="text-gray-500 py-8 text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10-9l2 9m-9 0h14m-5-9v2m-4-2v2"
            />
          </svg>
          Your cart is empty
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-3 border border-gray-200 rounded-lg hover:shadow transition"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium text-sm">{item.venueName}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {item.spotName && <span>{item.spotName} · </span>}
                  Court: {item.court}
                </div>
              </div>
              <button
                onClick={() => onRemove(idx)}
                className="text-red-500 hover:text-red-700 transition text-sm font-medium"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-gray-600 mb-2">
              {item.date} ·{" "}
              {typeof item.start === "string"
                ? new Date(item.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : item.start}
            </div>

            <div className="text-xs text-gray-600 mb-2">
              Duration: {item.duration} hour{item.duration > 1 ? "s" : ""}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-sm font-medium text-green-600">
                ₹{item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-600">
            <span>Tax (estimated)</span>
            <span>₹{(total * 0.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-4 text-green-700">
            <span>Total</span>
            <span>₹{(total * 1.05).toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isCheckoutLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCheckoutLoading ? "Processing..." : "Proceed to Pay"}
          </button>

          <button className="w-full mt-2 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
