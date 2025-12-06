import { useEffect, useState } from "react";
import { getVenues, getSpots, getSlots } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function Venues() {
  const { id } = useParams();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [spots, setSpots] = useState([]);
  const [spotsLoading, setSpotsLoading] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const nav = useNavigate();

  // Fetch venues on mount
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getVenues(id)
      .then((res) => {
        setVenues(res.data || []);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load venues");
        setVenues([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch spots when venue is selected
  useEffect(() => {
    if (!selectedVenue) {
      setSpots([]);
      setSelectedSpot(null);
      setSlots([]);
      return;
    }

    setSpotsLoading(true);
    getSpots(selectedVenue)
      .then((res) => {
        setSpots(res.data || []);
        if (res.data && res.data.length > 0) {
          setSelectedSpot(res.data[0].spotId);
        }
      })
      .catch((err) => {
        console.error(err);
        setSpots([]);
      })
      .finally(() => setSpotsLoading(false));
  }, [selectedVenue]);

  // Fetch slots when spot or date changes
  useEffect(() => {
    if (!selectedSpot || !date) {
      setSlots([]);
      return;
    }

    setSlotsLoading(true);
    getSlots(selectedSpot, date)
      .then((res) => {
        setSlots(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        setSlots([]);
      })
      .finally(() => setSlotsLoading(false));
  }, [selectedSpot, date]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading venues...</p>
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

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Venues Grid - Left Side (Takes 2 columns) */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Venues</h1>

          {venues.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No venues available for this service</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {venues.map((venue) => (
                <div
                  key={venue.venueId}
                  onClick={() => setSelectedVenue(venue.venueId)}
                  className="cursor-pointer"
                >
                  <Card
                    item={{
                      image: venue.image,
                      name: venue.venueName,
                      description: venue.venueAddress,
                    }}
                  />
                  {selectedVenue === venue.venueId && (
                    <div className="mt-2 text-sm text-green-600 font-semibold">
                      ✓ Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Spots and Slots View - Right Side (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {!selectedVenue ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              <p>Select a venue to view spots and slots</p>
            </div>
          ) : (
            <>
              {/* Spots Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Available Spots
                </h2>

                {spotsLoading ? (
                  <div className="text-center py-6">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  </div>
                ) : spots.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No spots available</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {spots.map((spot) => (
                      <div
                        key={spot.spotId}
                        onClick={() => setSelectedSpot(spot.spotId)}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition ${
                          selectedSpot === spot.spotId
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-green-400"
                        }`}
                      >
                        <div className="font-medium text-sm text-gray-800">
                          {spot.spotName}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Capacity: {spot.spotCapacity}
                        </div>
                        <div className="text-xs text-green-600 font-semibold mt-1">
                          ₹{spot.spotPricePerHour}/hr
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Slots Section */}
              {selectedSpot && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Available Slots
                  </h2>

                  {/* Date Picker */}
                  <div className="mb-4">
                    <input
                      type="date"
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Slots List */}
                  {slotsLoading ? (
                    <div className="text-center py-6">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    </div>
                  ) : slots.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No slots available for this date
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {slots.map((slot) => (
                        <div
                          key={slot.slotId}
                          className={`p-3 border rounded-lg text-sm transition ${
                            slot.slotActive
                              ? "border-green-200 bg-green-50 cursor-pointer hover:border-green-400"
                              : "border-gray-200 bg-gray-50 opacity-60"
                          }`}
                          onClick={() => {
                            if (slot.slotActive) {
                              nav(`/book/${slot.slotId}`);
                            }
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="font-medium text-gray-800">
                              {new Date(slot.slotStartTime).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}{" "}
                              -{" "}
                              {new Date(slot.slotEndTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${
                                slot.slotActive
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {slot.slotActive ? "Available" : "Booked"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            ₹{slot.slotPrice}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
