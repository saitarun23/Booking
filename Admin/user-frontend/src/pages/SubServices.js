import { useEffect, useState } from "react";
import { getSubServices } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function SubServices() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getSubServices(id)
      .then((res) => {
        setData(res.data || []);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load services");
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Services</h1>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No services available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((srv) => (
            <Card
              key={srv.serviceId}
              item={{
                image: srv.image,
                name: srv.serviceName,
                description: srv.serviceDescription,
              }}
              onClick={() => nav(`/service/${srv.serviceId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
