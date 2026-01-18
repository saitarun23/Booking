import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoodTypes, getFoodMenus, getFoodItems } from "../api/userApi";
import FoodItemCard from "../components/FoodItemCard";
import "../styles/food.css";

export default function FoodPage() {
  const { serviceId } = useParams();
  const nav = useNavigate();

  const [foodTypes, setFoodTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(null);

  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  const [items, setItems] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingMenus, setLoadingMenus] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0); // 💰 total price

  // Swiggy-style MENU overlay
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);
  const [expandedTypeId, setExpandedTypeId] = useState(null);

  const selectedType = useMemo(
    () => foodTypes.find((t) => t.foodTypeId === selectedTypeId),
    [foodTypes, selectedTypeId]
  );

  const selectedMenu = useMemo(
    () => menus.find((m) => m.foodMenuId === selectedMenuId),
    [menus, selectedMenuId]
  );

  /* --------- LOAD FOOD TYPES ---------- */
  useEffect(() => {
    setLoadingTypes(true);
    getFoodTypes(serviceId)
      .then((res) => {
        const list = res.data || [];
        setFoodTypes(list);
        if (list.length > 0) {
          setSelectedTypeId(list[0].foodTypeId);
          setExpandedTypeId(list[0].foodTypeId);
        }
      })
      .catch((err) => {
        console.error("Error loading food types:", err);
        setFoodTypes([]);
      })
      .finally(() => setLoadingTypes(false));
  }, [serviceId]);

  /* --------- LOAD MENUS WHEN TYPE CHANGES ---------- */
  useEffect(() => {
    if (!selectedTypeId) return;

    setLoadingMenus(true);
    setMenus([]);
    setSelectedMenuId(null);
    setItems([]);

    getFoodMenus(selectedTypeId)
      .then((res) => {
        const list = res.data || [];
        setMenus(list);
        if (list.length > 0) {
          setSelectedMenuId(list[0].foodMenuId);
        }
      })
      .catch((err) => {
        console.error("Error loading menus:", err);
        setMenus([]);
      })
      .finally(() => setLoadingMenus(false));
  }, [selectedTypeId]);

  /* --------- LOAD ITEMS WHEN MENU CHANGES ---------- */
  useEffect(() => {
    if (!selectedMenuId) return;

    setLoadingItems(true);
    setItems([]);

    getFoodItems(selectedMenuId)
      .then((res) => setItems(res.data || []))
      .catch((err) => {
        console.error("Error loading items:", err);
        setItems([]);
      })
      .finally(() => setLoadingItems(false));
  }, [selectedMenuId]);

  /* --------- CART: live sync from localStorage ---------- */
  useEffect(() => {
    const syncCartFromStorage = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("foodCart") || "[]");

        const count = stored.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        );
        const total = stored.reduce(
          (sum, item) =>
            sum +
            (item.total ||
              (item.price || 0) * (item.quantity || 0)),
          0
        );

        setCartCount(count);
        setCartTotal(total);
      } catch {
        setCartCount(0);
        setCartTotal(0);
      }
    };

    // initial read
    syncCartFromStorage();

    // from other tabs
    window.addEventListener("storage", syncCartFromStorage);
    // from FoodItemCard.updateVariant()
    window.addEventListener("foodCartUpdated", syncCartFromStorage);

    return () => {
      window.removeEventListener("storage", syncCartFromStorage);
      window.removeEventListener("foodCartUpdated", syncCartFromStorage);
    };
  }, []);

  /* --------- LOCK BODY SCROLL WHEN OVERLAY OPEN ---------- */
  useEffect(() => {
    if (showMenuOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenuOverlay]);

  /* --------- HANDLERS ---------- */

  const handleToggleType = (id) => {
    setSelectedTypeId(id);
    setExpandedTypeId((prev) => (prev === id ? null : id));
  };

  const handleSelectMenu = (id) => {
    setSelectedMenuId(id);
    setShowMenuOverlay(false);
  };

  /* --------- RENDER ---------- */

  return (
    <div className="food-page">
      {/* HEADER */}
      <header className="food-header">
        <button className="food-back-btn" onClick={() => nav(-1)}>
          ← Back
        </button>
        <div>
          <h1 className="food-title">Menu</h1>
          <p className="food-subtitle">Choose your favourites</p>
        </div>
      </header>

      {/* Line showing current selection */}
      <p className="food-current-filter">
        {selectedType ? selectedType.foodTypeName : "All"} ·{" "}
        {selectedMenu ? selectedMenu.foodMenuName : "All sections"}
      </p>

      {/* DISH LIST */}
      <main className="food-items-list">
        {loadingItems ? (
          <div className="food-loading">Loading dishes…</div>
        ) : items.length === 0 ? (
          <div className="food-empty-block">
            <p>No dishes available in this section.</p>
          </div>
        ) : (
          items.map((item) => (
            <FoodItemCard key={item.foodItemId} item={item} />
          ))
        )}
      </main>

      {/* VIEW CART BAR – Swiggy style */}
      {cartCount > 0 && (
        <div className="food-cart-bar" onClick={() => nav("/food/cart")}>
          <div className="food-cart-bar-left">
            <span className="food-cart-bar-main">
              ₹{Math.round(cartTotal)} • {cartCount} item
              {cartCount > 1 ? "s" : ""}
            </span>
            <span className="food-cart-bar-sub">View Cart</span>
          </div>
          <span className="food-cart-bar-arrow">›</span>
        </div>
      )}

      {/* FLOATING MENU BUTTON (only when overlay is closed) */}
      {!showMenuOverlay && (
        <button
          className="food-fab"
          type="button"
          onClick={() => setShowMenuOverlay(true)}
        >
          MENU
        </button>
      )}

      {/* CENTER OVERLAY WITH TYPES + COLLAPSIBLE SECTIONS */}
      {showMenuOverlay && (
        <div
          className="food-overlay-backdrop"
          onClick={() => setShowMenuOverlay(false)}
        >
          <div
            className="food-overlay-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="food-overlay-header">
              <span>Menu</span>
            </div>

            <div className="food-overlay-section">
              <p className="food-overlay-title">Food Types</p>

              {loadingTypes ? (
                <div className="food-overlay-subloading">
                  Loading food types…
                </div>
              ) : (
                foodTypes.map((t) => (
                  <div
                    key={t.foodTypeId}
                    className="food-overlay-type-block"
                  >
                    <button
                      className={
                        "food-overlay-row" +
                        (t.foodTypeId === selectedTypeId
                          ? " food-overlay-row-active"
                          : "")
                      }
                      onClick={() => handleToggleType(t.foodTypeId)}
                    >
                      <span>{t.foodTypeName}</span>

                      <span className="food-overlay-row-right">
                        {t.foodTypeId === selectedTypeId && (
                          <span className="food-overlay-dot">●</span>
                        )}
                        <span className="food-overlay-plus">
                          {expandedTypeId === t.foodTypeId ? "−" : "+"}
                        </span>
                      </span>
                    </button>

                    {expandedTypeId === t.foodTypeId && (
                      <div className="food-overlay-sublist">
                        {loadingMenus ? (
                          <div className="food-overlay-subloading">
                            Loading sections…
                          </div>
                        ) : menus.length === 0 ? (
                          <div className="food-overlay-subempty">
                            No sections for this type
                          </div>
                        ) : (
                          menus.map((m) => (
                            <button
                              key={m.foodMenuId}
                              className={
                                "food-overlay-subrow" +
                                (m.foodMenuId === selectedMenuId
                                  ? " food-overlay-subrow-active"
                                  : "")
                              }
                              onClick={() => handleSelectMenu(m.foodMenuId)}
                            >
                              <span>{m.foodMenuName}</span>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
