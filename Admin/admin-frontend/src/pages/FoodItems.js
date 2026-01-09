import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const [foodId, setFoodId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodQuantityRegular, setFoodQuantityRegular] = useState("");
  const [foodQuantityLarge, setFoodQuantityLarge] = useState("");
  const [foodPriceRegular, setFoodPriceRegular] = useState("");
  const [foodPriceLarge, setFoodPriceLarge] = useState("");
  const [available, setAvailable] = useState(true);
  const [serviceId, setServiceId] = useState("");

  /* IMAGE */
  const [foodImage, setFoodImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  /* ================= LOAD DATA ================= */

  const loadFoodItems = async () => {
    const res = await axiosClient.get("/fooditem/findAll_fooditem");
    setFoodItems(res.data);
  };

  const loadSubServices = async () => {
    const res = await axiosClient.get("/subservice/findAll_subservice");
    setSubServices(res.data);
  };

  useEffect(() => {
    loadFoodItems();
    loadSubServices();
  }, []);

  /* ================= IMAGE ================= */

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setFoodImage(file);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const convertToBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

  /* ================= CLEAR ================= */

  const clearForm = () => {
    setFoodId("");
    setFoodName("");
    setFoodDescription("");
    setFoodQuantityRegular("");
    setFoodQuantityLarge("");
    setFoodPriceRegular("");
    setFoodPriceLarge("");
    setAvailable(true);
    setServiceId("");
    setFoodImage(null);
    setImagePreview(null);
    setIsEdit(false);
  };

  /* ================= ADD ================= */

  const addFoodItem = async () => {
    if (
      !foodName.trim() ||
      !serviceId ||
      !foodQuantityRegular.trim() ||
      !foodQuantityLarge.trim() ||
      !foodPriceRegular ||
      !foodPriceLarge
    ) {
      alert("Please fill all required fields");
      return;
    }

    let imageBase64 = null;
    if (foodImage) imageBase64 = await convertToBase64(foodImage);

    await axiosClient.post("/fooditem/add_fooditem", {
      foodName,
      foodDescription,
      foodQuantityRegular,
      foodQuantityLarge,
      foodPriceRegular,
      foodPriceLarge,
      available,
      image: imageBase64,
      subService: { serviceId },
    });

    alert("Food item added");
    clearForm();
    loadFoodItems();
  };

  /* ================= UPDATE ================= */

  const updateFoodItem = async () => {
    const payload = {
      foodId,
      foodName,
      foodDescription,
      foodQuantityRegular,
      foodQuantityLarge,
      foodPriceRegular,
      foodPriceLarge,
      available,
      subService: { serviceId },
    };

    if (foodImage) {
      if (foodImage.existingImage) {
        payload.image = foodImage.existingImage;
      } else {
        payload.image = await convertToBase64(foodImage);
      }
    }

    await axiosClient.put("/fooditem/update_fooditem", payload);

    alert("Food item updated");
    clearForm();
    loadFoodItems();
  };

  /* ================= EDIT ================= */

  const editFoodItem = (f) => {
    setIsEdit(true);
    setFoodId(f.foodId);
    setFoodName(f.foodName);
    setFoodDescription(f.foodDescription);
    setFoodQuantityRegular(f.foodQuantityRegular);
    setFoodQuantityLarge(f.foodQuantityLarge);
    setFoodPriceRegular(f.foodPriceRegular);
    setFoodPriceLarge(f.foodPriceLarge);
    setAvailable(f.available);
    setServiceId(f.subService?.serviceId);

    if (f.image) {
      setImagePreview(`data:image/jpeg;base64,${f.image}`);
      setFoodImage({ existingImage: f.image });
    }
  };

  /* ================= DELETE ================= */

  const deleteFoodItem = async (id) => {
    if (!window.confirm("Delete this food item?")) return;
    await axiosClient.delete(`/fooditem/delete_fooditem/${id}`);
    loadFoodItems();
  };

  /* ================= UI ================= */

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <h2>Food Items Management</h2>

        <div className="card">
          <h3>{isEdit ? "Edit Food Item" : "Add Food Item"}</h3>

          <input
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />

          <textarea
            placeholder="Food Description"
            value={foodDescription}
            onChange={(e) => setFoodDescription(e.target.value)}
          />

          <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            <option value="">Select Sub-Service</option>
            {subServices.map((s) => (
              <option key={s.serviceId} value={s.serviceId}>
                {s.serviceName}
              </option>
            ))}
          </select>

          <input
            placeholder="Regular Quantity (eg: 250g / 1 plate)"
            value={foodQuantityRegular}
            onChange={(e) => setFoodQuantityRegular(e.target.value)}
          />

          <input
            placeholder="Large Quantity (eg: 500g / 2 plates)"
            value={foodQuantityLarge}
            onChange={(e) => setFoodQuantityLarge(e.target.value)}
          />

          <input
            type="number"
            placeholder="Regular Price"
            value={foodPriceRegular}
            onChange={(e) => setFoodPriceRegular(e.target.value)}
          />

          <input
            type="number"
            placeholder="Large Price"
            value={foodPriceLarge}
            onChange={(e) => setFoodPriceLarge(e.target.value)}
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: 120, marginTop: 10 }}
            />
          )}

          <label>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            &nbsp; Available
          </label>

          <br />

          {isEdit ? (
            <>
              <button className="btn" onClick={updateFoodItem}>Update</button>
              <button className="btn-danger" onClick={clearForm}>Cancel</button>
            </>
          ) : (
            <button className="btn" onClick={addFoodItem}>Add</button>
          )}
        </div>

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>Food</th>
              <th>Sub-Service</th>
              <th>Regular Qty</th>
              <th>Large Qty</th>
              <th>Regular Price</th>
              <th>Large Price</th>
              <th>Available</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {foodItems.length > 0 ? (
              foodItems.map((f) => (
                <tr key={f.foodId}>
                  <td>{f.foodName}</td>
                  <td>{f.subService?.serviceName}</td>
                  <td>{f.foodQuantityRegular}</td>
                  <td>{f.foodQuantityLarge}</td>
                  <td>₹{f.foodPriceRegular}</td>
                  <td>₹{f.foodPriceLarge}</td>
                  <td>{f.available ? "Yes" : "No"}</td>
                  <td>
                    {f.image && (
                      <img
                        src={`data:image/jpeg;base64,${f.image}`}
                        alt=""
                        style={{ width: 60 }}
                      />
                    )}
                  </td>
                  <td>
                    <button className="btn" onClick={() => editFoodItem(f)}>Edit</button>
                    <button className="btn-danger" onClick={() => deleteFoodItem(f.foodId)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No Food Items Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
