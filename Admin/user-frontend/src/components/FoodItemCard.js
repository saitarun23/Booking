import { useEffect, useState } from "react";
import { getFoodVariants } from "../api/userApi";
import "../styles/fooditemcard.css";

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

export default function FoodItemCard({ item }) {
  const [variants, setVariants] = useState([]);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [variantQty, setVariantQty] = useState({}); // { [variantId]: qty }  (0 or 1 for modal)

  useEffect(() => {
    getFoodVariants(item.foodItemId)
      .then((res) => {
        const list = res.data || [];
        setVariants(list);

        // initialize quantities from cart
        const cart = loadCart();
        const map = {};
        list.forEach((v) => {
          const found = cart.find(
            (c) =>
              c.foodVariantId === v.foodVariantId &&
              c.foodItemId === item.foodItemId
          );
          if (found) map[v.foodVariantId] = found.quantity;
        });
        setVariantQty(map);
      })
      .catch((err) => console.error("Error loading variants:", err));
  }, [item.foodItemId]);

  // lock body scroll when modal open
  useEffect(() => {
    if (showVariantModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showVariantModal]);

  const imageSrc = item.image
    ? `data:image/jpeg;base64,${item.image}`
    : "/placeholder.png";

  const minPrice =
    variants.length > 0
      ? variants.reduce(
          (min, v) =>
            v.foodVariantPrice < min ? v.foodVariantPrice : min,
          variants[0].foodVariantPrice
        )
      : null;

  const updateVariant = (variant, newQty) => {
    const cart = loadCart();
    const idx = cart.findIndex(
      (c) =>
        c.foodVariantId === variant.foodVariantId &&
        c.foodItemId === item.foodItemId
    );

    if (newQty <= 0) {
      if (idx >= 0) cart.splice(idx, 1);
    } else {
      if (idx >= 0) {
        cart[idx].quantity = newQty;
        cart[idx].total = newQty * cart[idx].price;
      } else {
        cart.push({
          foodVariantId: variant.foodVariantId,
          foodItemId: item.foodItemId,
          foodName: item.foodItemName,
          foodItemName: item.foodItemName,
          size: variant.foodVariantSize,
          quantityLabel: variant.foodVariantQuantity,
          boneless: variant.boneless,
          price: variant.foodVariantPrice,
          quantity: newQty,
          total: newQty * variant.foodVariantPrice,
          image: item.image,
        });
      }
    }

    saveCart(cart);

    // 🔔 notify FoodPage that cart changed
    window.dispatchEvent(new Event("foodCartUpdated"));

    setVariantQty((prev) => {
      const copy = { ...prev };
      if (newQty <= 0) {
        delete copy[variant.foodVariantId];
      } else {
        copy[variant.foodVariantId] = newQty;
      }
      return copy;
    });
  };

  const handleMainAddClick = () => {
    if (variants.length === 1) {
      // single variant: normal +1 stepper
      const v = variants[0];
      const current = variantQty[v.foodVariantId] || 0;
      updateVariant(v, current + 1);
    } else if (variants.length > 1) {
      setShowVariantModal(true);
    }
  };

  const toggleVariantSelected = (variant) => {
    const current = variantQty[variant.foodVariantId] || 0;
    const newQty = current > 0 ? 0 : 1; // checkbox: 0 or 1
    updateVariant(variant, newQty);
  };

  const totalQtyAllVariants = Object.values(variantQty).reduce(
    (sum, q) => sum + q,
    0
  );

  const totalPriceAllVariants = variants.reduce((sum, v) => {
    const q = variantQty[v.foodVariantId] || 0;
    return sum + q * v.foodVariantPrice;
  }, 0);

  const closeModal = () => {
    setShowVariantModal(false);
  };

  return (
    <>
      <div className="food-card-row">
        {/* LEFT: INFO */}
        <div className="food-card-left">
          <h3 className="food-card-title">{item.foodItemName}</h3>

          {item.foodItemDescription && (
            <p className="food-card-desc">{item.foodItemDescription}</p>
          )}

          {variants.length === 0 ? (
            <p className="food-card-unavailable">Currently not available</p>
          ) : (
            <p className="food-card-meta">
              ₹{minPrice}{" "}
              {/* {variants.length > 1 ? "Customisable" : "1 option"} */}
            </p>
          )}
        </div>

        {/* RIGHT: IMAGE + FLOATING ADD / STEPPER SUMMARY */}
        <div className="food-card-right">
          <img src={imageSrc} alt={item.foodItemName} />

          {variants.length > 1 && (
            <div className="food-card-customisable-pill">Customisable</div>
          )}

          {variants.length > 0 && (
            <>
              {variants.length === 1 ? (
                <div className="floating-stepper-wrapper">
                  {(() => {
                    const v = variants[0];
                    const q = variantQty[v.foodVariantId] || 0;
                    if (q > 0) {
                      return (
                        <div className="qty-stepper small">
                          <button onClick={() => updateVariant(v, q - 1)}>
                            −
                          </button>
                          <span>{q}</span>
                          <button onClick={() => updateVariant(v, q + 1)}>
                            +
                          </button>
                        </div>
                      );
                    }
                    return (
                      <button
                        className="floating-add-btn"
                        onClick={handleMainAddClick}
                      >
                        Add
                      </button>
                    );
                  })()}
                </div>
              ) : (
                <button
                  className="floating-add-btn"
                  onClick={handleMainAddClick}
                >
                  {totalQtyAllVariants > 0 ? "Customize" : "Add"}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* VARIANT MODAL (Swiggy-style customise popup) */}
      {showVariantModal && variants.length > 1 && (
        <div className="variant-modal-backdrop" onClick={closeModal}>
          <div
            className="variant-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="variant-modal-header">
              <div>
                <h3 className="variant-modal-title">{item.foodItemName}</h3>
                {minPrice !== null && (
                  <p className="variant-modal-price">₹{minPrice}</p>
                )}
              </div>
              <button className="variant-modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            {/* BODY */}
            <div className="variant-modal-body">
              <p className="variant-modal-subtitle">
                Customise as per your taste
              </p>

              <div className="variant-modal-section">
                <div className="variant-modal-section-header">
                  <span>Choose your Sides</span>
                  {/* <span className="variant-modal-section-optional">
                    (optional)
                  </span> */}
                </div>

                <div className="variant-modal-list">
                  {variants.map((v) => {
                    const q = variantQty[v.foodVariantId] || 0;
                    const selected = q > 0;

                    return (
                      <div
                        key={v.foodVariantId}
                        className="variant-modal-row"
                      >
                        <div className="variant-modal-row-left">
                          <div className="variant-modal-row-text">
                            <span className="variant-modal-row-title">
                              {v.foodVariantSize}
                            </span>
                            <span className="variant-modal-row-sub">
                              {v.foodVariantQuantity}
                            </span>

                            {/* Show badge ONLY if true/false. If null/undefined, show nothing */}
                            {v.boneless === true && (
                              <span className="variant-badge boneless">
                                Boneless
                              </span>
                            )}
                            {v.boneless === false && (
                              <span className="variant-badge bone">
                                Bone
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="variant-modal-row-right variant-checkbox-wrapper"
                          onClick={() => toggleVariantSelected(v)}
                        >
                          <span className="variant-modal-row-price">
                            + ₹{v.foodVariantPrice}
                          </span>
                          <span
                            className={
                              "variant-checkbox" +
                              (selected ? " variant-checkbox-checked" : "")
                            }
                          >
                            {selected ? "✓" : ""}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="variant-modal-bottom">
              <div className="variant-modal-total">
                <span className="variant-modal-total-price">
                  ₹{totalPriceAllVariants || minPrice || 0}
                </span>
                {totalQtyAllVariants > 0 && (
                  <span className="variant-modal-total-count">
                    {totalQtyAllVariants} item
                    {totalQtyAllVariants > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <button className="variant-modal-cta" onClick={closeModal}>
                Add item to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
