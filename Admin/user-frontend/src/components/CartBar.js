import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartBar() {
  const { cart, total } = useCart();
  const nav = useNavigate();

  if (cart.length === 0) return null;

  return (
    <div className="cart-bar">
      <span>{cart.length} items | ₹{total}</span>
      <button onClick={() => nav("/food/cart")}>View Cart</button>
    </div>
  );
}
