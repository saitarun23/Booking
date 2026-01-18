import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function FoodTypes() {
  const [foodTypes, setFoodTypes] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const [foodTypeId, setFoodTypeId] = useState("");
  const [foodTypeName, setFoodTypeName] = useState("");
  const [serviceId, setServiceId] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  /* ================= LOAD DATA ================= */

  const loadFoodTypes = async () => {
    const res = await axiosClient.get("/foodtype/findAll_foodtype");
    setFoodTypes(res.data);
  };

  const loadSubServices = async () => {
    const res = await axiosClient.get("/subservice/findAll_subservice");
    setSubServices(res.data);
  };

  useEffect(() => {
    loadFoodTypes();
    loadSubServices();
  }, []);

  /* ================= CLEAR ================= */

  const clearForm = () => {
    setFoodTypeId("");
    setFoodTypeName("");
    setServiceId("");
    setIsEdit(false);
  };

  /* ================= ADD ================= */

const addFoodType = async () => {
  if (!foodTypeName.trim() || !serviceId) {
    alert("Please fill all required fields");
    return;
  }

  try {
    await axiosClient.post("/foodtype/add_foodtype", {
      foodTypeName,
      subService: { serviceId: parseInt(serviceId) }, // Parse to Int
    });
    alert("Food Type added");
    clearForm();
    loadFoodTypes();
  } catch (err) {
    console.error(err);
    alert("Error saving data");
  }
};

  /* ================= UPDATE ================= */

  const updateFoodType = async () => {
    if (!foodTypeName.trim() || !serviceId) {
      alert("Please fill all required fields");
      return;
    }

    await axiosClient.put("/foodtype/update_foodtype", {
      foodTypeId,
      foodTypeName,
      subService: { serviceId },
    });

    alert("Food Type updated");
    clearForm();
    loadFoodTypes();
  };

  /* ================= EDIT ================= */

  const editFoodType = (f) => {
    setIsEdit(true);
    setFoodTypeId(f.foodTypeId);
    setFoodTypeName(f.foodTypeName);
    setServiceId(f.subService?.serviceId);
  };

  /* ================= DELETE ================= */

  const deleteFoodType = async (id) => {
    if (!window.confirm("Delete this food type?")) return;

    await axiosClient.delete(`/foodtype/delete_foodtype/${id}`);
    loadFoodTypes();
  };

  /* ================= UI ================= */

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <h2>Food Types Management</h2>

        <div className="card">
          <h3>{isEdit ? "Edit Food Type" : "Add Food Type"}</h3>

          <input
            placeholder="Food Type Name"
            value={foodTypeName}
            onChange={(e) => setFoodTypeName(e.target.value)}
          />

          <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            <option value="">Select Sub-Service</option>
            {subServices.map((s) => (
              <option key={s.serviceId} value={s.serviceId}>
                {s.serviceName}
              </option>
            ))}
          </select>

          <br />

          {isEdit ? (
            <>
              <button className="btn" onClick={updateFoodType}>Update</button>
              <button className="btn-danger" onClick={clearForm}>Cancel</button>
            </>
          ) : (
            <button className="btn" onClick={addFoodType}>Add</button>
          )}
        </div>

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Food Type Name</th>
              <th>Sub-Service</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {foodTypes.length > 0 ? (
              foodTypes.map((f) => (
                <tr key={f.foodTypeId}>
                  <td>{f.foodTypeId}</td>
                  <td>{f.foodTypeName}</td>
                  <td>{f.subService?.serviceName}</td>
                  <td>
                    <button className="btn" onClick={() => editFoodType(f)}>
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => deleteFoodType(f.foodTypeId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Food Types Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
