import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  // form states
  const [categoryId, setId] = useState("");
  const [categoryName, setName] = useState("");
  const [categoryDescription, setDesc] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const load = async () => {
    try {
      // Workaround: Send empty data with GET request to satisfy backend's incorrect consumes requirement
      const res = await axiosClient({
        method: 'GET',
        url: '/category/findAll_category',
        data: {},
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCategories(res.data);
    } catch (error) {
      console.error("Error loading categories:", error);
      if (error.code === 'ERR_NETWORK') {
        alert("Cannot connect to server. Please make sure your backend is running on http://localhost:8181 and CORS is configured.");
      } else {
        alert("Error loading categories: " + (error.response?.data || error.message));
      }
    }
  };

  useEffect(() => {
    load();
  }, []);

  const clearForm = () => {
    setId("");
    setName("");
    setDesc("");
    setCategoryImage(null);
    setImagePreview(null);
    setIsEdit(false);
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setCategoryImage(file); // Set the new file, not an object with existingImage
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Convert image to base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Remove data:image/...;base64, prefix
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const addCategory = async () => {
    try {
      if (!categoryName.trim()) {
        alert("Please enter category name");
        return;
      }
      
      let imageBase64 = null;
      if (categoryImage) {
        imageBase64 = await convertImageToBase64(categoryImage);
      }
      
      const res = await axiosClient.post("/category/add_category", {
        categoryName,
        categoryDescription,
        image: imageBase64,
      });
      
      alert(res.data); // Will show "Category Stored Successfully" or error message
      clearForm();
      load();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category: " + (error.response?.data || error.message));
    }
  };

  const updateCategory = async () => {
    try {
      if (!categoryName.trim()) {
        alert("Please enter category name");
        return;
      }
      
      // Prepare the update payload
      const updatePayload = {
        categoryId: parseInt(categoryId),
        categoryName,
        categoryDescription,
      };
      
      // Handle image logic
      if (categoryImage) {
        if (categoryImage.existingImage) {
          // User is editing but hasn't selected a new image, keep existing
          updatePayload.image = categoryImage.existingImage;
        } else {
          // User selected a new image file
          const imageBase64 = await convertImageToBase64(categoryImage);
          updatePayload.image = imageBase64;
        }
      }
      // If categoryImage is null, don't include image in payload (let backend decide)
      
      const res = await axiosClient.put("/category/update_category", updatePayload);
      
      alert(res.data); // Will show "Category Information Updated Successfully" or error message
      clearForm();
      load();
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Error updating category: " + (error.response?.data || error.message));
    }
  };

  const editCategory = (cat) => {
    setIsEdit(true);
    setId(cat.categoryId);
    setName(cat.categoryName);
    setDesc(cat.categoryDescription);
    
    // Handle existing image
    if (cat.image) {
      setImagePreview(`data:image/jpeg;base64,${cat.image}`);
      // Keep the existing image data for updates
      setCategoryImage({ existingImage: cat.image });
    } else {
      setImagePreview(null);
      setCategoryImage(null);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await axiosClient.delete(`/category/delete_category/${id}`);
        alert(res.data); // Will show "Category Record Delete Successfully" or error message
        load();
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Error deleting category: " + (error.response?.data || error.message));
      }
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <h2>Category Management</h2>

        <div className="card">
          <h3>{isEdit ? "Edit Category" : "Add Category"}</h3>

          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setName(e.target.value)}
          /><br />

          <textarea
            placeholder="Description"
            value={categoryDescription}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea><br />

          <div className="image-upload-section">
            <label htmlFor="categoryImage">Category Image:</label>
            <input
              type="file"
              id="categoryImage"
              accept="image/*"
              onChange={handleImageChange}
            /><br />
            
            {imagePreview && (
              <div className="image-preview">
                <img 
                  src={imagePreview} 
                  alt="Category preview" 
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    marginTop: '10px'
                  }}
                />
              </div>
            )}
          </div><br />

          {isEdit ? (
            <>
              <button className="btn" onClick={updateCategory}>
                Update
              </button>
              &nbsp;
              <button className="btn-danger" onClick={clearForm}>Cancel</button>
            </>
          ) : (
            <button className="btn" onClick={addCategory}>Add</button>
          )}
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.categoryId}>
                <td>{cat.categoryId}</td>
                <td>{cat.categoryName}</td>
                <td>{cat.categoryDescription}</td>
                <td>
                  {cat.image ? (
                    <img 
                      src={`data:image/jpeg;base64,${cat.image}`}
                      alt={cat.categoryName}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }}
                    />
                  ) : (
                    <span style={{ color: '#999', fontStyle: 'italic' }}>No image</span>
                  )}
                </td>
                <td>
                  <button className="btn" onClick={() => editCategory(cat)}>Edit</button>
                  &nbsp;
                  <button className="btn-danger" onClick={() => deleteCategory(cat.categoryId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
