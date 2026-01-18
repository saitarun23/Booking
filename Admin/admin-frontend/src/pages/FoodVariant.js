import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function FoodVariant() {
  const [foodVariants, setFoodVariants] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  // ===== Entity mapped states =====
  const [foodVariantId, setFoodVariantId] = useState("");
  const [foodVariantSize, setFoodVariantSize] = useState("");
  const [foodVariantQuantity, setFoodVariantQuantity] = useState("");
  const [foodVariantPrice, setFoodVariantPrice] = useState("");

  // boneless is OPTIONAL: null = not specified, true/false = chosen
  const [boneless, setBoneless] = useState(null);

  const [foodItemId, setFoodItemId] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  /* ================= LOAD DATA ================= */

  const loadData = async () => {
    try {
      const resVariants = await axiosClient.get(
        "/foodvariant/findAll_foodvariant"
      );
      setFoodVariants(resVariants.data);

      const resFoodItems = await axiosClient.get(
        "/fooditem/findAll_fooditem"
      );
      setFoodItems(resFoodItems.data);
    } catch (err) {
      console.error("Error loading data", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= FORM ACTIONS ================= */

  const clearForm = () => {
    setFoodVariantId("");
    setFoodVariantSize("");
    setFoodVariantQuantity("");
    setFoodVariantPrice("");
    setBoneless(null); // reset to "not specified"
    setFoodItemId("");
    setIsEdit(false);
  };

  const addFoodVariant = async () => {
    // Food item is required (FK cannot be null)
    if (!foodItemId) {
      alert("Please select a food item");
      return;
    }

    // Make sure at least something is provided (size/qty/price/boneless)
    if (
      !foodVariantSize &&
      !foodVariantQuantity &&
      !foodVariantPrice &&
      boneless === null
    ) {
      alert("Please enter at least one field for the variant");
      return;
    }

    // Build payload ONLY with fields that have values
    const payload = {
      ...(foodVariantSize && { foodVariantSize }),
      ...(foodVariantQuantity && { foodVariantQuantity }),
      ...(foodVariantPrice && {
        foodVariantPrice: parseFloat(foodVariantPrice),
      }),
      ...(boneless !== null && { boneless }), // only send if chosen
      foodItem: { foodItemId: parseInt(foodItemId) }, // always send FK
    };

    try {
      const res = await axiosClient.post(
        "/foodvariant/add_foodvariant",
        payload
      );
      alert(res.data);
      clearForm();
      loadData();
    } catch (err) {
      console.error(err);
      alert("Error adding food variant");
    }
  };

  const updateFoodVariant = async () => {
    if (!foodVariantId) {
      alert("No Food Variant selected to update");
      return;
    }

    // FK cannot be null, backend always fv.setFoodItem(...)
    if (!foodItemId) {
      alert("Please select a food item");
      return;
    }

    const payload = {
      foodVariantId: parseInt(foodVariantId),

      // optional fields -> partial update
      ...(foodVariantSize && { foodVariantSize }),
      ...(foodVariantQuantity && { foodVariantQuantity }),
      ...(foodVariantPrice && {
        foodVariantPrice: parseFloat(foodVariantPrice),
      }),
      ...(boneless !== null && { boneless }),

      // FoodItem must always be sent for update
      foodItem: { foodItemId: parseInt(foodItemId) },
    };

    try {
      const res = await axiosClient.put(
        "/foodvariant/update_foodvariant",
        payload
      );
      alert(res.data);
      clearForm();
      loadData();
    } catch (err) {
      console.error(err);
      alert("Error updating food variant");
    }
  };

  const editFoodVariant = (v) => {
    setIsEdit(true);
    setFoodVariantId(v.foodVariantId);
    setFoodVariantSize(v.foodVariantSize || "");
    setFoodVariantQuantity(v.foodVariantQuantity || "");
    setFoodVariantPrice(
      v.foodVariantPrice !== undefined && v.foodVariantPrice !== null
        ? v.foodVariantPrice
        : ""
    );

    // if boneless is null/undefined in DB, keep it null (optional)
    if (v.boneless === true || v.boneless === false) {
      setBoneless(v.boneless);
    } else {
      setBoneless(null);
    }

    setFoodItemId(v.foodItem?.foodItemId?.toString() || "");
  };

  const deleteFoodVariant = async (id) => {
    if (!window.confirm("Are you sure you want to delete this variant?")) return;

    try {
      const res = await axiosClient.delete(
        `/foodvariant/delete_foodvariant/${id}`
      );
      alert(res.data);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Error deleting food variant");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h2>Food Variants Management</h2>

        <div className="card">
          <h3>{isEdit ? "Update Food Variant" : "Add Food Variant"}</h3>

          <input
            className="form-control"
            placeholder="Variant Size (e.g. Full / Half)"
            value={foodVariantSize}
            onChange={(e) => setFoodVariantSize(e.target.value)}
          />

          <input
            className="form-control"
            placeholder="Quantity (e.g. 500g)"
            value={foodVariantQuantity}
            onChange={(e) => setFoodVariantQuantity(e.target.value)}
          />

          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={foodVariantPrice}
            onChange={(e) => setFoodVariantPrice(e.target.value)}
          />

          <select
            className="form-control"
            value={foodItemId}
            onChange={(e) => setFoodItemId(e.target.value)}
          >
            <option value="">-- Select Food Item --</option>
            {foodItems.map((f) => (
              <option key={f.foodItemId} value={f.foodItemId}>
                {f.foodItemName}
              </option>
            ))}
          </select>

          {/* Boneless is now optional */}
          <select
            className="form-control"
            value={boneless === null ? "" : boneless ? "true" : "false"}
            onChange={(e) => {
              if (e.target.value === "") {
                setBoneless(null); // don't send boneless
              } else if (e.target.value === "true") {
                setBoneless(true);
              } else {
                setBoneless(false);
              }
            }}
          >
            <option value="">-- Boneless (Optional) --</option>
            <option value="true">Yes (Boneless)</option>
            <option value="false">No (With Bone)</option>
          </select>

          <div className="button-group">
            {isEdit ? (
              <>
                <button className="btn btn-primary" onClick={updateFoodVariant}>
                  Update
                </button>
                <button className="btn-danger" onClick={clearForm}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-success" onClick={addFoodVariant}>
                Save Variant
              </button>
            )}
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Food Item</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Boneless</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodVariants.length > 0 ? (
              foodVariants.map((v) => (
                <tr key={v.foodVariantId}>
                  <td>{v.foodVariantId}</td>
                  <td>{v.foodItem?.foodItemName}</td>
                  <td>{v.foodVariantSize}</td>
                  <td>{v.foodVariantQuantity}</td>
                  <td>₹ {v.foodVariantPrice}</td>
                  <td>
                    {v.boneless === true
                      ? "✅ Yes"
                      : v.boneless === false
                      ? "❌ No"
                      : "—"}
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => editFoodVariant(v)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteFoodVariant(v.foodVariantId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No food variants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
