import { useEffect, useState } from "react";
import { getSpots } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";

export default function Spots() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getSpots(id)
      .then((res) => {
        setData(res.data || []);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load spots");
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading spots...</p>
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Spots</h1>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No spots available for this venue</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.map((spot) => (
            <div
              key={spot.spotId}
              className="bg-white shadow hover:shadow-lg rounded-lg p-6 cursor-pointer hover:border-green-400 border-2 border-transparent transition"
              onClick={() => nav(`/spot/${spot.spotId}`)}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {spot.spotName}
              </h2>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Capacity:</span>
                  <span>{spot.spotCapacity} people</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Price:</span>
                  <span className="text-green-600 font-semibold">
                    ₹{spot.spotPricePerHour}/hour
                  </span>
                </p>
                {spot.spotDescription && (
                  <p className="text-sm mt-4">{spot.spotDescription}</p>
                )}
              </div>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                View Slots
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
