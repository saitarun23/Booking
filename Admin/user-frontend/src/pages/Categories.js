import { useEffect, useState } from "react";
import { getCategories } from "../api/userApi";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import Newsletter from "../components/Newsletter";
import "../styles/categories.css";

export default function Categories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredData = data.filter((cat) => {
    const matchesSearch = cat.categoryName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
              <h1 className="categories-title">
                Explore Our Categories
              </h1>
              <p className="categories-subtitle">
                Discover a wide range of premium venues and services for your perfect event
              </p>
            </div>

           
          </div>

          {/* Categories Grid */}
          {filteredData.length === 0 ? (
            <div className="categories-empty">
              <svg className="categories-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="categories-empty-title">No categories found</p>
              <p className="categories-empty-text">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="categories-grid">
              {filteredData.map((cat, idx) => (
                <Card
                  key={cat.categoryId}
                  item={{
                    image: cat.image,
                    name: cat.categoryName,
                    description: cat.categoryDescription,
                  }}
                  index={idx}
                  onClick={() => nav(`/category/${cat.categoryId}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Newsletter />
    </>
  );
}
