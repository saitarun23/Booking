import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/fooddetail.css";

export default function FoodDetail() {
  const { state } = useLocation();
  const nav = useNavigate();

  const food = state?.food;

  const [size, setSize] = useState("REGULAR");
  const [quantity, setQuantity] = useState(1);

  if (!food) {
    return <p>Food not found</p>;
  }

  const price =
    size === "REGULAR"
      ? food.foodPriceRegular
      : food.foodPriceLarge;

  const total = price * quantity;

  /* ---------------- ADD TO CART (SWIGGY LOGIC) ---------------- */
  const addToCart = () => {
    const newItem = {
      foodId: food.foodId,
      foodName: food.foodName,
      size,
      quantity,
      price,
      total,
      image: food.image,
    };

    // Get existing food cart
    const existingCart =
      JSON.parse(localStorage.getItem("foodCart")) || [];

    // Check if same food + same size exists
    const index = existingCart.findIndex(
      (item) =>
        item.foodId === food.foodId && item.size === size
    );

    if (index !== -1) {
      // Update quantity
      existingCart[index].quantity += quantity;
      existingCart[index].total =
        existingCart[index].quantity *
        existingCart[index].price;
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem(
      "foodCart",
      JSON.stringify(existingCart)
    );

    nav("/food-cart"); // redirect to food cart
  };

  return (
    <div className="food-detail-wrapper">
      <button onClick={() => nav(-1)} className="back-btn">
        ← Back
      </button>

      <div className="food-detail-card">
        {food.image && (
          <img
            src={`data:image/jpeg;base64,${food.image}`}
            alt={food.foodName}
          />
        )}

        <h1>{food.foodName}</h1>
        <p>{food.foodDescription}</p>

        {/* SIZE SELECTION */}
        <div className="size-box">
          <label>
            <input
              type="radio"
              checked={size === "REGULAR"}
              onChange={() => setSize("REGULAR")}
            />
            Regular ({food.foodQuantityRegular}) – ₹
            {food.foodPriceRegular}
          </label>

          <label>
            <input
              type="radio"
              checked={size === "LARGE"}
              onChange={() => setSize("LARGE")}
            />
            Large ({food.foodQuantityLarge}) – ₹
            {food.foodPriceLarge}
          </label>
        </div>

        {/* QUANTITY */}
        <div className="qty-box">
          <button
            onClick={() =>
              quantity > 1 && setQuantity(quantity - 1)
            }
          >
            −
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>
            +
          </button>
        </div>

        <h2>Total: ₹{total}</h2>

        <button className="add-cart-btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
