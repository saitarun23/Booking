import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [subServices, setSubServices] = useState([]);

  // form states
  const [venueId, setVenueId] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueDescription, setVenueDescription]=useState("");
  const [latitude, setLatitude]=useState("");
  const [longitude, setLongitude]=useState("");
  const [venueAmenities, setVenueAmenities]=useState("");
  const [serviceId, setServiceId] = useState(""); // dropdown
  const [venueImage, setVenueImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Load Venues
  const loadVenues = async () => {
    try {
      const res = await axiosClient.get("/venue/findAll_venue");
      setVenues(res.data);
    } catch (error) {
      console.error("Error loading venues:", error);
      alert("Error loading venues");
    }
  };

  // Load SubServices for dropdown
  const loadSubServices = async () => {
    try {
      const res = await axiosClient.get("/subservice/findAll_subservice");
      setSubServices(res.data);
    } catch (error) {
      console.error("Error loading subservices:", error);
    }
  };

  useEffect(() => {
    loadSubServices();
    loadVenues();
  }, []);

  const clearForm = () => {
    setVenueId("");
    setVenueName("");
    setVenueAddress("");
    setVenueDescription("");
    setLatitude("");
    setLongitude("");
    setVenueAmenities("");
    setServiceId("");
    setVenueImage(null);
    setImagePreview(null);
    setIsEdit(false);
  };

  // Image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Invalid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be <5MB");
      return;
    }

    setVenueImage(file);

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
  };

  // ADD VENUE
  const addVenue = async () => {
    if (!venueName.trim() || !serviceId) {
      alert("Please fill all required fields");
      return;
    }

    let image64 = null;
    if (venueImage) image64 = await convertToBase64(venueImage);

    try {
      const res = await axiosClient.post("/venue/add_venue", {
        venueName,
        venueAddress,
        venueDescription,
        latitude,
        longitude,
        venueAmenities,
        image: image64,
        subservice: { serviceId },
      });

      alert(res.data);
      clearForm();
      loadVenues();
    } catch (error) {
      console.error("Error adding venue:", error);
      alert("Error adding venue");
    }
  };

  // UPDATE VENUE
  const updateVenue = async () => {
    if (!venueName.trim() || !serviceId) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      venueId,
      venueName,
      venueAddress,
      venueDescription,
      latitude,
      longitude,
      venueAmenities,
      subservice: { serviceId },
    };

    if (venueImage) {
      if (venueImage.existingImage) {
        payload.image = venueImage.existingImage;
      } else {
        const base64 = await convertToBase64(venueImage);
        payload.image = base64;
      }
    }

    try {
      const res = await axiosClient.put("/venue/update_venue", payload);
      alert(res.data);
      clearForm();
      loadVenues();
    } catch (error) {
      console.error("Error updating venue:", error);
      alert("Error updating venue");
    }
  };

  // EDIT
  const editVenue = (v) => {
    setIsEdit(true);
    setVenueId(v.venueId);
    setVenueName(v.venueName);
    setVenueAddress(v.venueAddress);
    setVenueDescription(v.venueDescription);
    setLatitude(v.latitude);
    setLongitude(v.longitude);
    setVenueAmenities(v.venueAmenities);
    setServiceId(v.subservice.serviceId);

    if (v.image) {
      setImagePreview(`data:image/jpeg;base64,${v.image}`);
      setVenueImage({ existingImage: v.image });
    } else {
      setImagePreview(null);
      setVenueImage(null);
    }
  };

  // DELETE
  const deleteVenue = async (id) => {
    if (!window.confirm("Delete this venue?")) return;

    try {
      const res = await axiosClient.delete(`/venue/delete_venue/${id}`);
      alert(res.data);
      loadVenues();
    } catch (error) {
      console.error("Error deleting venue:", error);
      alert("Error deleting venue");
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <h2>Venue Management</h2>

        <div className="card">
          <h3>{isEdit ? "Edit Venue" : "Add Venue"}</h3>

          <input
            type="text"
            placeholder="Venue Name"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
          /><br />

          <textarea
            placeholder="Venue Address"
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
          ></textarea><br />

          <textarea
            placeholder="Venue Description"
            value={venueDescription}
            onChange={(e) => setVenueDescription(e.target.value)}
          ></textarea><br />

          <input
            type="number"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          /><br />

          <input
            type="number"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          /><br />

          <textarea
            placeholder="Venue Amenities"
            value={venueAmenities}
            onChange={(e) => setVenueAmenities(e.target.value)}
          ></textarea><br />

          {/* DROPDOWN FOR SUB-SERVICE */}
          <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            <option value="">Select Sub-Service</option>
            {subServices.map((s) => (
              <option key={s.serviceId} value={s.serviceId}>
                {s.serviceName}
              </option>
            ))}
          </select><br />

          <label>Venue Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} /><br />

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

          <br /><br />

          {isEdit ? (
            <>
              <button className="btn" onClick={updateVenue}>Update</button>
              &nbsp;
              <button className="btn-danger" onClick={clearForm}>Cancel</button>
            </>
          ) : (
            <button className="btn" onClick={addVenue}>Add</button>
          )}
        </div>

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Venue</th>
              <th>Address</th>
              <th>Description</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Amenities</th>
              <th>Sub-Service</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {venues.map((v) => (
              <tr key={v.venueId}>
                <td>{v.venueId}</td>
                <td>{v.venueName}</td>
                <td>{v.venueAddress}</td>
                <td>{v.venueDescription}</td>
                <td>{v.latitude}</td>
                <td>{v.longitude}</td>
                <td>{v.venueAmenities}</td>
                <td>{v.subservice?.serviceName}</td>

                <td>
                  {v.image ? (
                    <img
                      src={`data:image/jpeg;base64,${v.image}`}
                      alt={v.venueName}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                      }}
                    />
                  ) : (
                    <span style={{ fontStyle: "italic", color: "#777" }}>No image</span>
                  )}
                </td>

                <td>
                  <button className="btn" onClick={() => editVenue(v)}>Edit</button>
                  &nbsp;
                  <button className="btn-danger" onClick={() => deleteVenue(v.venueId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
