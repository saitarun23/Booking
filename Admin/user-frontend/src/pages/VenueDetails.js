import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import BookingCard from "../components/BookingCard";
import Cart from "../components/Cart";
import { getSpots } from "../api/userApi";
import axios from "axios";

export default function VenueDetails() {
  const { id } = useParams(); // venue id
  const [venue, setVenue] = useState(null);
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Venue ID is missing");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Fetch venue details
    axios
      .get(`http://localhost:8181/venue/find_venue_byid/${id}`)
      .then((res) => {
        setVenue(res.data);
      })
      .catch((err) => {
        console.error("Error fetching venue:", err);
        setError("Failed to load venue details");
      });

    // Fetch spots by venue id
    getSpots(id)
      .then((res) => {
        const spotsData = res.data || [];
        setSpots(spotsData);
        if (spotsData.length > 0) {
          setSelectedSpot(spotsData[0].spotId);
        }
      })
      .catch((err) => {
        console.error("Error fetching spots:", err);
        setError("Failed to load spots");
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddToCart(item) {
    setCart((c) => [...c, item]);
    // Show success message
    const notif = document.createElement("div");
    notif.className =
      "fixed top-20 right-4 bg-green-600 text-white px-4 py-3 rounded shadow";
    notif.textContent = "✓ Added to cart";
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
  }

  function handleRemove(idx) {
    setCart((c) => c.filter((_, i) => i !== idx));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading venue details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
          <h2 className="font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-6 rounded-lg">
          <h2 className="font-semibold mb-2">Venue Not Found</h2>
          <p>The venue you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Carousel */}
          <HeroCarousel
            images={
              venue?.image ? [venue.image] : venue?.images || []
            }
          />

          {/* Venue Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-3xl font-bold text-gray-800">
              {venue?.venueName || "Venue Name"}
            </h1>
            <p className="text-gray-600 mt-2">{venue?.venueAddress}</p>

            {venue?.venueDescription && (
              <p className="text-gray-600 mt-4 leading-relaxed">
                {venue.venueDescription}
              </p>
            )}

            {venue?.venueCity && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {venue.venueCity}
              </div>
            )}
          </div>

          {/* Available Spots */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Available Spots</h3>

            {spots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No spots available for this venue</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {spots.map((spot) => (
                  <div
                    key={spot.spotId}
                    onClick={() => setSelectedSpot(spot.spotId)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                      selectedSpot === spot.spotId
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-green-400"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {spot.spotName}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Capacity: {spot.spotCapacity} people
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                        ₹{spot.spotPricePerHour}/hr
                      </span>
                    </div>

                    {spot.spotDescription && (
                      <p className="text-sm text-gray-600">
                        {spot.spotDescription}
                      </p>
                    )}

                    {selectedSpot === spot.spotId && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <span className="text-sm font-medium text-green-700">
                          ✓ Selected
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviews or Additional Info Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">About This Venue</h3>
            <div className="space-y-3 text-gray-600">
              <p>
                {venue?.venueDescription ||
                  "Book your favorite sports venue with ease. Choose from multiple spots and time slots."}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 13a3 3 0 105 0 3 3 0 00-5 0zm0-2a1 1 0 112 0 1 1 0 01-2 0z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Easy Booking
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8.16 2.75a.75.75 0 00-1.32 0l-1.5 4a.75.75 0 00.58 1a26.27 26.27 0 004.08 0 .75.75 0 00.58-1l-1.5-4zM7.75 16.06a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.06-1.06l-1.5-1.5z" />
                  </svg>
                  Best Prices
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card + Cart */}
        <div className="space-y-6">
          {spots.length > 0 && (
            <BookingCard
              venue={{ ...venue, spots }}
              spotId={selectedSpot}
              onAddToCart={handleAddToCart}
            />
          )}
          <Cart items={cart} onRemove={handleRemove} />
        </div>
      </div>
    </div>
  );
}
