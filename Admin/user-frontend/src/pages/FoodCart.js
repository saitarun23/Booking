import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import "../styles/foodcart.css";

export default function FoodCart() {
  const nav = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("foodCart")) || [];
    setCart(stored);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("foodCart", JSON.stringify(updated));
  };

  const changeQty = (index, delta) => {
    const updated = [...cart];
    updated[index].quantity += delta;

    if (updated[index].quantity === 0) {
      updated.splice(index, 1);
    } else {
      updated[index].total =
        updated[index].quantity * updated[index].price;
    }

    updateCart(updated);
  };

  const totalAmount = cart.reduce((sum, i) => sum + i.total, 0);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your food cart is empty 🍽️</h2>
        <button onClick={() => nav("/")}>Browse Food</button>
      </div>
    );
  }

  return (
    <div className="food-cart-wrapper">
      <h1>Food Cart</h1>

      {cart.map((item, index) => (
        <div className="food-cart-item" key={index}>
          <img src={`data:image/jpeg;base64,${item.image}`} alt="" />

          <div className="food-cart-info">
            <h3>{item.foodName}</h3>
            <p>Size: {item.size}</p>
            <p>₹{item.price}</p>
          </div>

          <div className="food-cart-qty">
            <button onClick={() => changeQty(index, -1)}>
              <FiMinus />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => changeQty(index, 1)}>
              <FiPlus />
            </button>
          </div>

          <div className="food-cart-total">
            ₹{item.total}
          </div>
        </div>
      ))}

      <div className="food-cart-footer">
        <h2>Total: ₹{totalAmount}</h2>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}
