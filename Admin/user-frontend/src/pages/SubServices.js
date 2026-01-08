import { useEffect, useState } from "react";
import { getSubServices, getCategories } from "../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { getCategoryVideo } from "../utils/categoryVideos";
import "../styles/subservices.css";

export default function SubServices() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const nav = useNavigate();

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch subservices
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getSubServices(id)
      .then((res) => {
        setData(res.data || []);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load sub-services");
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch category name
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
        console.error("Category fetch error:", err);
      });
  }, [id]);

  const handleBack = () => nav("/");

  const videoSrc = getCategoryVideo(categoryName);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="subservices-loading">
        <p>Loading services...</p>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="subservices-error">
        <button onClick={handleBack}>Back</button>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="subservices-wrapper">
      {/* ================= HEADER ================= */}
      <div className="subservices-header">
        {videoSrc && (
          <video
            className="subservices-header-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        <div className="subservices-header-overlay" />

        <div className="subservices-header-content">
          {categoryName && (
            <span className="subservices-category-badge">
              {categoryName}
            </span>
          )}
          <h1 className="subservices-title">Discover Sub-Services</h1>
          <p className="subservices-subtitle">
            Explore premium services tailored to your needs
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="subservices-content-section">
        <button onClick={handleBack} className="subservices-back-btn">
          ← Back to Categories
        </button>

        {data.length === 0 ? (
          <div className="subservices-empty">
            <p>No sub-services available</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
