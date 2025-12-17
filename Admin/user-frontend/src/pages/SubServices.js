import { useEffect, useState } from "react";
import { getSubServices, getCategories } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import vid1 from "../assets/vid1.mp4";
import "../styles/subservices.css";

export default function SubServices() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const nav = useNavigate();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch subservices data
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
        setError("Failed to load sub-services");
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch category name for display
  useEffect(() => {
    if (!id) return;
    getCategories()
      .then((res) => {
        const categories = res.data || [];
        const currentCategory = categories.find(
          (cat) => cat.categoryId === parseInt(id)
        );
        if (currentCategory) {
          setCategoryName(currentCategory.categoryName);
        }
      })
      .catch((err) => {
        console.error("Error fetching category name:", err);
      });
  }, [id]);

  const handleBack = () => {
    nav("/");
  };

  if (loading) {
    return (
      <div className="subservices-wrapper">
        <div className="subservices-container">
          <div className="subservices-loading">
            <div className="subservices-loading-content">
              <div className="subservices-loading-spinner"></div>
              <p className="subservices-loading-text">Loading services...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subservices-wrapper">
        <div className="subservices-container">
          <button onClick={handleBack} className="subservices-back-btn">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Categories
          </button>
          <div className="subservices-error">
            <div className="subservices-error-flex">
              <svg className="subservices-error-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h2 className="subservices-error-title">Error Loading Services</h2>
                <p className="subservices-error-message">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subservices-wrapper">
      <div className="subservices-container">
        {/* Header Section - Full Width */}
        <div className="subservices-header">
          <video className="subservices-header-video" autoPlay muted loop>
            <source src={vid1} type="video/mp4" />
          </video>
          <div className="subservices-header-overlay" />
          <div className="subservices-header-content">
            {categoryName && (
              <span className="subservices-category-badge">{categoryName}</span>
            )}
            <h1 className="subservices-title">
              Discover Sub-Services
            </h1>
            <p className="subservices-subtitle">
              Explore our collection of premium sub-services tailored to meet your specific needs and preferences
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="subservices-content-section">
        <div className="subservices-content-inner">
          {/* Back Button */}
          <button onClick={handleBack} className="subservices-back-btn">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Categories
          </button>

          {/* Empty State */}
          {data.length === 0 ? (
            <div className="subservices-empty">
              <svg className="subservices-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="subservices-empty-title">No Sub-Services Available</p>
              <p className="subservices-empty-text">
                It looks like there are no sub-services in this category at the moment
              </p>
            </div>
          ) : (
            <>
              {/* Grid Layout */}
              <div className="subservices-grid">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
