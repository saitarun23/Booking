import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function SubServices() {
  const [subServices, setSubServices] = useState([]);
  const [categories, setCategories] = useState([]); // for dropdown // form states

  const [serviceId, setServiceId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [serviceImage, setServiceImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEdit, setIsEdit] = useState(false); // Load Sub-Services

  const loadSubServices = async () => {
    try {
      const res = await axiosClient.get("/subservice/findAll_subservice");
      setSubServices(res.data);
    } catch (error) {
      console.error("Error loading subservices:", error);
      alert("Error loading subservices");
    }
  }; // Load Categories (for dropdown)

  const loadCategories = async () => {
    try {
      const res = await axiosClient.get("/category/findAll_category");
      setCategories(res.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadSubServices();
  }, []);

  const clearForm = () => {
    setServiceId("");
    setServiceName("");
    setServiceDescription("");
    setCategoryId("");
    setServiceImage(null);
    setImagePreview(null);
    setIsEdit(false);
  }; // Handle image upload

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be < 5MB");
      return;
    }

    setServiceImage(file);

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
  }; // ADD SUB-SERVICE

  const addSubService = async () => {
    if (!serviceName.trim() || !categoryId) {
      alert("Please enter all required fields");
      return;
    }

    let imageBase64 = null;
    if (serviceImage) imageBase64 = await convertToBase64(serviceImage);

    try {
      const res = await axiosClient.post("/subservice/add_subservice", {
        serviceName,
        serviceDescription,
        image: imageBase64,
        category: { categoryId },
      });

      alert(res.data);
      clearForm();
      loadSubServices();
    } catch (error) {
      console.error("Error adding subservice:", error);
      alert("Error adding subservice");
    }
  }; // UPDATE SUB-SERVICE

  const updateSubService = async () => {
    if (!serviceName.trim() || !categoryId) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      serviceId,
      serviceName,
      serviceDescription,
      category: { categoryId },
    }; // Handle image logic

    if (serviceImage) {
      if (serviceImage.existingImage) {
        // User is editing but hasn't selected a new image, keep existing
        payload.image = serviceImage.existingImage;
      } else {
        // User selected a new image file
        const base64 = await convertToBase64(serviceImage);
        payload.image = base64;
      }
    } // If serviceImage is null, don't include image in payload
    try {
      const res = await axiosClient.put(
        "/subservice/update_subservice",
        payload
      );
      alert(res.data);
      clearForm();
      loadSubServices();
    } catch (error) {
      console.error("Error updating subservice:", error);
      alert("Error updating subservice");
    }
  }; // EDIT BUTTON

  const editSubService = (s) => {
    setIsEdit(true);
    setServiceId(s.serviceId);
    setServiceName(s.serviceName);
    setServiceDescription(s.serviceDescription);
    setCategoryId(s.category.categoryId);

    if (s.image) {
      setImagePreview(`data:image/jpeg;base64,${s.image}`); // Keep the existing image data for updates
      setServiceImage({ existingImage: s.image });
    } else {
      setImagePreview(null);
      setServiceImage(null);
    }
  }; // DELETE

  const deleteSubService = async (id) => {
    if (!window.confirm("Delete this Sub-Service?")) return;

    try {
      const res = await axiosClient.delete(
        `/subservice/delete_subservice/${id}`
      );
      alert(res.data);
      loadSubServices();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Error deleting subservice");
    }
  };

  return (
    <div className="app-container">
            <Sidebar />     {" "}
      <div className="main-content">
                <h2>Sub-Services Management</h2>       {" "}
        <div className="card">
                    <h3>{isEdit ? "Edit Sub-Service" : "Add Sub-Service"}</h3>
                   {" "}
          <input
            type="text"
            placeholder="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
          <br />         {" "}
          <textarea
            placeholder="Service Description"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
          ></textarea>
          <br />          {/* CATEGORY DROPDOWN */}         {" "}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
                        <option value="">Select Category</option>           {" "}
            {categories.map((c) => (
              <option key={c.categoryId} value={c.categoryId}>
                                {c.categoryName}             {" "}
              </option>
            ))}
                     {" "}
          </select>
          <br />          <label>Service Image:</label>
                   {" "}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <br />         {" "}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "150px",
                height: "150px",
                marginTop: "10px",
                objectFit: "cover",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          )}
                    <br />
          <br />         {" "}
          {isEdit ? (
            <>
                           {" "}
              <button className="btn" onClick={updateSubService}>
                Update
              </button>
                            &nbsp;              {" "}
              <button className="btn-danger" onClick={clearForm}>
                Cancel
              </button>
                         {" "}
            </>
          ) : (
            <button className="btn" onClick={addSubService}>
              Add
            </button>
          )}
                 {" "}
        </div>
                {/* TABLE */}       {" "}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Service</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {subServices.length > 0 ? (
              subServices.map((s) => (
                <tr key={s.serviceId}>
                  <td>{s.serviceId}</td>
                  <td>{s.serviceName}</td>
                  <td>{s.serviceDescription}</td>
                  <td>{s.category?.categoryName}</td>
                  <td>
                    {s.image ? (
                      <img
                        src={`data:image/jpeg;base64,${s.image}`}
                        alt={s.serviceName}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    ) : (
                      <span style={{ fontStyle: "italic", color: "#777" }}>
                        No image
                      </span>
                    )}
                  </td>
                  <td>
                    <button className="btn" onClick={() => editSubService(s)}>
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => deleteSubService(s.serviceId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Sub-Services Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
             {" "}
      </div>
         {" "}
    </div>
  );
}
