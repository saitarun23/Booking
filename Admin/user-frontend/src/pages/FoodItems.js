import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoodItems } from "../api/userApi";
import "../styles/fooditems.css";

export default function FoodItems() {
  const { id } = useParams(); // serviceId
  const nav = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getFoodItems(id)
      .then((res) => setItems(res.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="food-loading">Loading food items...</div>;
  }

  return (
    <div className="food-wrapper">
      <button onClick={() => nav(-1)} className="back-btn">
        ← Back
      </button>

      <h1 className="food-title">Take Away Menu</h1>

      {items.length === 0 ? (
        <p>No food items available</p>
      ) : (
        <div className="food-grid">
          {items.map((f) => (
            <div className="food-card" key={f.foodId}>
              {f.image && (
                <img
                  src={`data:image/jpeg;base64,${f.image}`}
                  alt={f.foodName}
                />
              )}

              <h3>{f.foodName}</h3>
              <p>{f.foodDescription}</p>

              <div className="food-price">
                ₹{f.foodPriceRegular}
              </div>

              <button
                    className="add-cart-btn"
                    onClick={() => nav(`/food-detail/${f.foodId}`, { state: { food: f } })}
                    >
                View Details
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
