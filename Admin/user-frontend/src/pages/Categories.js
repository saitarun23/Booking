import { useEffect, useState } from "react";
import { getCategories } from "../api/userApi";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((res) => {
        setData(res.data || []);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Choose a Category
      </h1>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No categories available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((cat) => (
            <Card
              key={cat.categoryId}
              item={{
                image: cat.image,
                name: cat.categoryName,
                description: cat.categoryDescription,
              }}
              onClick={() => nav(`/category/${cat.categoryId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
