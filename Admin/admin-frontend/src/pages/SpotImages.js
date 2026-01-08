import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function SpotImages() {
  const [spots, setSpots] = useState([]);
  const [selectedSpotId, setSelectedSpotId] = useState("");
  const [imageList, setImageList] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Load the list of spots for the dropdown on page load
  useEffect(() => {
    const loadSpots = async () => {
      try {
        const res = await axiosClient.get("/spot/findAll_spot");
        setSpots(res.data);
      } catch (error) {
        console.error("Error loading spots:", error);
      }
    };
    loadSpots();
  }, []);

  // 2. Fetch images whenever the selectedSpotId changes
  const loadImagesBySpot = async (id) => {
    if (!id) {
      setImageList([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axiosClient.get(`/spot_image/find_by_spot/${id}`);
      setImageList(res.data); // This contains our array of {imageId, imageData, ...}
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSpotChange = (e) => {
    const id = e.target.value;
    setSelectedSpotId(id);
    loadImagesBySpot(id); // Trigger GET call immediately on selection
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // 3. POST Logic: Upload multiple images
  const uploadImages = async () => {
    if (!selectedSpotId) {
      alert("Please select a spot first!");
      return;
    }
    if (files.length === 0) {
      alert("Please select files to upload");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await axiosClient.post(`/spot_image/add/${selectedSpotId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data);
      setFiles([]); // Reset file input
      loadImagesBySpot(selectedSpotId); // REFRESH the gallery after success
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload images");
    }
  };

  // 4. DELETE Logic
  const deleteImage = async (imageId) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      await axiosClient.delete(`/spot_image/delete/${imageId}`);
      loadImagesBySpot(selectedSpotId); // REFRESH the gallery after delete
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="app-container" style={{ display: "flex" }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1, padding: "20px" }}>
        <h2>Spot Image Gallery Management</h2>

        {/* --- UPLOAD SECTION --- */}
        <div className="card" style={{ background: "#f4f4f4", padding: "20px", borderRadius: "8px" }}>
          <h3>Step 1: Select Spot & Upload</h3>
          <select value={selectedSpotId} onChange={handleSpotChange} style={{ padding: "8px", width: "250px" }}>
            <option value="">-- Select a Spot --</option>
            {spots.map((s) => (
              <option key={s.spotId} value={s.spotId}>
                {s.spotName} (ID: {s.spotId})
              </option>
            ))}
          </select>
          <br /><br />
          <input type="file" multiple onChange={handleFileChange} accept="image/*" />
          <button onClick={uploadImages} style={{ marginLeft: "10px", padding: "8px 15px", cursor: "pointer" }}>
            Upload Images
          </button>
        </div>

        <hr style={{ margin: "30px 0" }} />

        {/* --- VIEW SECTION --- */}
        <h3>Step 2: View / Manage Images</h3>
        {loading ? <p>Loading images...</p> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {imageList.length > 0 ? (
              imageList.map((img) => (
                <div key={img.imageId} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px", textAlign: "center" }}>
                  {/* CRITICAL: The src must be formatted like this for Base64 Strings */}
                  <img
                    src={`data:image/png;base64,${img.imageData}`} 
                    alt="Spot"
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Error+Loading"; }}
                  />
                  <p style={{ fontSize: "12px", color: "#666" }}>Image ID: {img.imageId}</p>
                  <button 
                    onClick={() => deleteImage(img.imageId)} 
                    style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "3px" }}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>{selectedSpotId ? "No images found for this spot." : "Please select a spot above to view images."}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}