import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodMenus, setFoodMenus] = useState([]);

  // States precisely mapped to backend Entity: FoodItem.java
  const [foodItemId, setFoodItemId] = useState("");
  const [foodItemName, setFoodItemName] = useState("");
  const [foodItemDescription, setFoodItemDescription] = useState("");
  const [available, setAvailable] = useState(true);
  const [foodMenuId, setFoodMenuId] = useState(""); 
  const [foodImage, setFoodImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  /* ================= LOAD DATA ================= */

  const loadData = async () => {
    try {
      const resItems = await axiosClient.get("/fooditem/findAll_fooditem");
      setFoodItems(resItems.data);

      // Assuming your FoodMenu controller has this endpoint
      const resMenus = await axiosClient.get("/foodmenu/findAll_foodmenu");
      setFoodMenus(resMenus.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= IMAGE LOGIC ================= */

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFoodImage(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  /* ================= FORM ACTIONS ================= */

  const clearForm = () => {
    setFoodItemId("");
    setFoodItemName("");
    setFoodItemDescription("");
    setAvailable(true);
    setFoodMenuId("");
    setFoodImage(null);
    setImagePreview(null);
    setIsEdit(false);
  };

  const addFoodItem = async () => {
    if (!foodItemName.trim() || !foodMenuId) {
      alert("Please enter a Name and select a Food Menu");
      return;
    }

    let imageBase64 = null;
    if (foodImage) imageBase64 = await convertToBase64(foodImage);

    const payload = {
      foodItemName,
      foodItemDescription,
      available,
      image: imageBase64,
      foodMenu: { foodMenuId: parseInt(foodMenuId) } // Matches @JoinColumn(name="foodmenu_id")
    };

    try {
      const res = await axiosClient.post("/fooditem/add_fooditem", payload);
      alert(res.data); // Shows "FoodItem Stored Successfully" from backend
      clearForm();
      loadData();
    } catch (err) {
      alert("Error adding food item");
    }
  };

  const updateFoodItem = async () => {
    let imageBase64 = foodImage?.existingImage || null;
    
    // If user uploaded a NEW file during edit
    if (foodImage instanceof File) {
      imageBase64 = await convertToBase64(foodImage);
    }

    const payload = {
      foodItemId, // Required for .findById() in backend update logic
      foodItemName,
      foodItemDescription,
      available,
      image: imageBase64,
      foodMenu: { foodMenuId: parseInt(foodMenuId) }
    };

    try {
      const res = await axiosClient.put("/fooditem/update_fooditem", payload);
      alert(res.data); // Shows "FoodItem Updated Successfully"
      clearForm();
      loadData();
    } catch (err) {
      alert("Error updating food item");
    }
  };

  const editFoodItem = (f) => {
    setIsEdit(true);
    setFoodItemId(f.foodItemId);
    setFoodItemName(f.foodItemName);
    setFoodItemDescription(f.foodItemDescription);
    setAvailable(f.available);
    setFoodMenuId(f.foodMenu?.foodMenuId || "");

    if (f.image) {
      setImagePreview(`data:image/jpeg;base64,${f.image}`);
      setFoodImage({ existingImage: f.image });
    } else {
      setImagePreview(null);
      setFoodImage(null);
    }
  };

  const deleteFoodItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await axiosClient.delete(`/fooditem/delete_fooditem/${id}`);
      alert(res.data);
      loadData();
    } catch (err) {
      alert("Error deleting item");
    }
  };

  /* ================= UI RENDER ================= */

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h2>Food Items Management</h2>

        <div className="card">
          <h3>{isEdit ? "Update Food Item" : "Add New Food Item"}</h3>
          
          <input 
            className="form-control"
            placeholder="Food Item Name" 
            value={foodItemName} 
            onChange={(e) => setFoodItemName(e.target.value)} 
          />
          
          <textarea 
            className="form-control"
            placeholder="Food Item Description" 
            value={foodItemDescription} 
            onChange={(e) => setFoodItemDescription(e.target.value)} 
          />
          
          <select 
            className="form-control"
            value={foodMenuId} 
            onChange={(e) => setFoodMenuId(e.target.value)}
          >
            <option value="">-- Select Food Menu --</option>
            {foodMenus.map((m) => (
              <option key={m.foodMenuId} value={m.foodMenuId}>
                {m.foodMenuName}
              </option>
            ))}
          </select>

          <div className="image-section">
            <label>Food Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ width: 100, marginTop: 10, borderRadius: 5 }} />
            )}
          </div>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={available} 
              onChange={(e) => setAvailable(e.target.checked)} 
            />
            &nbsp; Mark as Available
          </label>

          <div className="button-group">
            {isEdit ? (
              <>
                <button className="btn btn-primary" onClick={updateFoodItem}>Update</button>
                <button className="btn-danger" onClick={clearForm}>Cancel</button>
              </>
            ) : (
              <button className="btn btn-success" onClick={addFoodItem}>Save Food Item</button>
            )}
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Menu Category</th>
              <th>Available</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.length > 0 ? (
              foodItems.map((f) => (
                <tr key={f.foodItemId}>
                  <td>{f.foodItemId}</td>
                  <td><strong>{f.foodItemName}</strong></td>
                  <td>{f.foodItemDescription}</td>
                  <td>{f.foodMenu?.foodMenuName || "N/A"}</td>
                  <td>{f.available ? "✅ Yes" : "❌ No"}</td>
                   <td>
                    
                    {f.image ? (
                      <img src={`data:image/jpeg;base64,${f.image}`} alt="" style={{ width: 60, height: 40, objectFit: 'cover' }} />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => editFoodItem(f)}>Edit</button>
                    <button className="btn-delete" onClick={() => deleteFoodItem(f.foodItemId)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>No food items found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}