import { useEffect, useState } from "react";
import { getCategories } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import Newsletter from "../components/Newsletter";
import "../styles/categories.css";

// Category Card Component
function CategoryCard({ item, onClick }) {
  let imgSrc = item.image;

  // Base64 detection
  if (imgSrc && /^[A-Za-z0-9+/=]+$/.test(imgSrc) && imgSrc.length > 100) {
    imgSrc = `data:image/png;base64,${imgSrc}`;
  }

  return (
    <div
      className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform duration-300"
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden bg-gray-200">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const fallback = encodeURIComponent(item.name || "Category");
            e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' font-size='16' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3E${fallback}%3C/text%3E%3C/svg%3E`;
          }}
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>

        {item.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Categories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    getCategories()
      .then((res) => {
        setData(res.data || []);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load categories");
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="categories-loading">
        <div className="categories-loading-content">
          <div className="categories-loading-spinner"></div>
          <p className="categories-loading-text">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories-container categories-page">
        <div className="categories-error">
          <div className="categories-error-flex">
            <svg className="categories-error-icon" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h2 className="categories-error-title">Error Loading Categories</h2>
              <p className="categories-error-message">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroCarousel />

      <div className="categories-wrapper">
        <div className="categories-container categories-page">

          {/* Header Section */}
          <div className="categories-header">
            <div className="categories-header-content">
              <h1 className="categories-title">Explore Our Categories</h1>
              <p className="categories-subtitle">
                Discover a wide range of premium venues and services for your perfect event
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="categories-grid">
            {data.map((cat) => (
              <CategoryCard
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
        </div>
      </div>

      <Newsletter />
    </>
  );
}
