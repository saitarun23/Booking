import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import "../styles/foodcart.css";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("foodCart") || "[]");
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem("foodCart", JSON.stringify(cart));
};

export default function FoodCart() {
  const nav = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(loadCart());
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    saveCart(updated);
  };

  const changeQty = (index, delta) => {
    const updated = [...cart];
    const item = updated[index];
    const newQty = item.quantity + delta;

    if (newQty <= 0) {
      updated.splice(index, 1);
    } else {
      item.quantity = newQty;
      item.total = newQty * item.price;
    }
    updateCart(updated);
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const totalAmount = cart.reduce((sum, i) => sum + (i.total || 0), 0);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your food cart is empty 🍽️</h2>
        <button onClick={() => nav(-1)}>Browse Menu</button>
      </div>
    );
  }

  return (
    <div className="food-cart-page">
      <div className="food-cart-header">
        <h1>Food Cart</h1>
        <button className="food-cart-back" onClick={() => nav(-1)}>
          ← Continue ordering
        </button>
      </div>

      <div className="food-cart-wrapper">
        {cart.map((item, index) => {
          // map boneless boolean to a readable label
          let boneLabel = "";
          if (item.boneless === true) boneLabel = "Boneless";
          else if (item.boneless === false) boneLabel = "Bone";

          return (
            <div className="food-cart-item" key={`${item.foodVariantId}-${index}`}>
              {/* Image */}
              <div className="food-cart-thumb">
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.foodName}
                />
              </div>

              {/* Text info */}
              <div className="food-cart-info">
                <h3>{item.foodName}</h3>

                <div className="food-cart-meta">
                  {item.size && <span>{item.size}</span>}
                  {item.quantityLabel && <span>{item.quantityLabel}</span>}
                  {boneLabel && <span>{boneLabel}</span>}
                </div>

                <div className="food-cart-price-line">
                  <span className="food-cart-unit-price">
                    ₹{item.price} <span>/ item</span>
                  </span>
                </div>
              </div>

              {/* Qty + total + remove */}
              <div className="food-cart-actions">
                <div className="food-cart-qty">
                  <button type="button" onClick={() => changeQty(index, -1)}>
                    <FiMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => changeQty(index, 1)}>
                    <FiPlus />
                  </button>
                </div>

                <div className="food-cart-total">₹{item.total}</div>

                <button
                  type="button"
                  className="food-cart-remove"
                  onClick={() => removeItem(index)}
                  title="Remove item"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          );
        })}

        {/* Footer summary */}
        <div className="food-cart-footer">
          <div className="food-cart-summary">
            <span className="food-cart-summary-label">Total Amount</span>
            <span className="food-cart-summary-value">₹{totalAmount}</span>
          </div>

          <div className="food-cart-footer-buttons">
            <button className="checkout-btn">Proceed to Checkout</button>
            <button className="clear-cart-btn" onClick={clearCart}>
              <FiTrash2 /> Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
