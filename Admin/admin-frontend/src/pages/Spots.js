import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function Spots() {
  const [spots, setSpots] = useState([]);
  const [venues, setVenues] = useState([]);

  // Form states
  const [spotId, setSpotId] = useState("");
  const [spotName, setSpotName] = useState("");
  const [spotCapacity, setSpotCapacity] = useState("");
  const [spotPricePerHour, setSpotPricePerHour] = useState("");
  const [venueId, setVenueId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // Load Spots
  const loadSpots = async () => {
    try {
      const res = await axiosClient.get("/spot/findAll_spot");
      setSpots(res.data);
    } catch (error) {
      console.error("Error loading spots:", error);
      alert("Error loading spots");
    }
  };

  // Load Venues for dropdown
  const loadVenues = async () => {
    try {
      const res = await axiosClient.get("/venue/findAll_venue");
      setVenues(res.data);
    } catch (error) {
      console.error("Error loading venues:", error);
    }
  };

  useEffect(() => {
    loadVenues();
    loadSpots();
  }, []);

  const clearForm = () => {
    setSpotId("");
    setSpotName("");
    setSpotCapacity("");
    setSpotPricePerHour("");
    setVenueId("");
    setIsEdit(false);
  };

  // ADD SPOT
  const addSpot = async () => {
    if (!spotName.trim() || !spotCapacity || !spotPricePerHour || !venueId) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axiosClient.post("/spot/add_spot", {
        spotName,
        spotCapacity: parseInt(spotCapacity),
        spotPricePerHour: parseFloat(spotPricePerHour),
        venue: { venueId }
      });

      alert(res.data);
      clearForm();
      loadSpots();
    } catch (error) {
      console.error("Error adding spot:", error);
      alert("Error adding spot");
    }
  };

  // UPDATE SPOT
  const updateSpot = async () => {
    if (!spotName.trim() || !spotCapacity || !spotPricePerHour || !venueId) {
      alert("All fields are required");
      return;
    }

    const payload = {
      spotId,
      spotName,
      spotCapacity: parseInt(spotCapacity),
      spotPricePerHour: parseFloat(spotPricePerHour),
      venue: { venueId }
    };

    try {
      const res = await axiosClient.put("/spot/update_spot", payload);
      alert(res.data);
      clearForm();
      loadSpots();
    } catch (error) {
      console.error("Error updating spot:", error);
      alert("Error updating spot");
    }
  };

  // EDIT
  const editSpot = (s) => {
    setIsEdit(true);
    setSpotId(s.spotId);
    setSpotName(s.spotName);
    setSpotCapacity(s.spotCapacity);
    setSpotPricePerHour(s.spotPricePerHour);
    setVenueId(s.venue.venueId);
  };

  // DELETE
  const deleteSpot = async (id) => {
    if (!window.confirm("Delete this spot?")) return;

    try {
      const res = await axiosClient.delete(`/spot/delete_spot/${id}`);
      alert(res.data);
      loadSpots();
    } catch (error) {
      console.error("Error deleting spot:", error);
      alert("Error deleting spot");
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <h2>Spot Management</h2>

        <div className="card">
          <h3>{isEdit ? "Edit Spot" : "Add Spot"}</h3>

          <input
            type="text"
            placeholder="Spot Name"
            value={spotName}
            onChange={(e) => setSpotName(e.target.value)}
          /><br />

          <input
            type="number"
            placeholder="Capacity"
            value={spotCapacity}
            onChange={(e) => setSpotCapacity(e.target.value)}
          /><br />

          <input
            type="number"
            step="0.01"
            placeholder="Price Per Hour"
            value={spotPricePerHour}
            onChange={(e) => setSpotPricePerHour(e.target.value)}
          /><br />

          {/* VENUE DROPDOWN */}
          <select value={venueId} onChange={(e) => setVenueId(e.target.value)}>
            <option value="">Select Venue</option>
            {venues.map((v) => (
              <option key={v.venueId} value={v.venueId}>
                {v.venueName}
              </option>
            ))}
          </select><br />

          <br />

          {isEdit ? (
            <>
              <button className="btn" onClick={updateSpot}>Update</button>
              &nbsp;
              <button className="btn-danger" onClick={clearForm}>Cancel</button>
            </>
          ) : (
            <button className="btn" onClick={addSpot}>Add</button>
          )}
        </div>

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Spot</th>
              <th>Capacity</th>
              <th>Price Per Hour</th>
              <th>Venue</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {spots.map((s) => (
              <tr key={s.spotId}>
                <td>{s.spotId}</td>
                <td>{s.spotName}</td>
                <td>{s.spotCapacity}</td>
                <td>₹{s.spotPricePerHour}</td>
                <td>{s.venue?.venueName}</td>

                <td>
                  <button className="btn" onClick={() => editSpot(s)}>Edit</button>
                  &nbsp;
                  <button className="btn-danger" onClick={() => deleteSpot(s.spotId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
