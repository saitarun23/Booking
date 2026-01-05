import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function Slots() {
  const [slots, setSlots] = useState([]);
  const [spots, setSpots] = useState([]);

  // Form states
  const [slotId, setSlotId] = useState("");
  const [slotStartDate, setSlotStartDate] = useState("");
  const [slotEndDate, setSlotEndDate] = useState("");
  const [slotStartTime, setSlotStartTime] = useState("");
  const [slotEndTime, setSlotEndTime] = useState("");
  const [slotActive, setSlotActive] = useState(true);
  const [spotId, setSpotId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // ---------------- LOAD SPOTS ----------------
  const loadSpots = async () => {
    try {
      const res = await axiosClient.get("/spot/findAll_spot");
      setSpots(res.data);
    } catch (error) {
      console.error("Error loading spots", error);
    }
  };

  // ---------------- LOAD SLOTS ----------------
  const loadSlots = async () => {
    try {
      const res = await axiosClient.get("/slot/findAll_slot");
      setSlots(res.data);
    } catch (error) {
      console.error("Error loading slots", error);
    }
  };

  useEffect(() => {
    loadSpots();
    loadSlots();
  }, []);

  // ---------------- CLEAR FORM ----------------
  const clearForm = () => {
    setSlotId("");
    setSlotStartDate("");
    setSlotEndDate("");
    setSlotStartTime("");
    setSlotEndTime("");
    setSlotActive(true);
    setSpotId("");
    setIsEdit(false);
  };

  // ---------------- ADD SLOT ----------------
  const addSlot = async () => {
    if (!slotStartDate || !slotEndDate || !slotStartTime || !slotEndTime  || !spotId) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axiosClient.post("/slot/add_slot", {
        slotStartDate, // yyyy-MM-dd
        slotEndDate,   // yyyy-MM-dd
        slotStartTime: `${slotStartDate}T${slotStartTime}`, // yyyy-MM-ddTHH:mm
        slotEndTime: `${slotEndDate}T${slotEndTime}`,       // yyyy-MM-ddTHH:mm
        slotActive,
        spot: { spotId: Number(spotId) }
      });

      alert(res.data);
      clearForm();
      loadSlots();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Error adding slot");
    }
  };

  // ---------------- UPDATE SLOT ----------------
  const updateSlot = async () => {
    if (!slotStartDate || !slotEndDate || !slotStartTime || !slotEndTime  || !spotId) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axiosClient.put("/slot/update_slot", {
        slotId,
        slotStartDate,
        slotEndDate,
        slotStartTime: `${slotStartDate}T${slotStartTime}`,
        slotEndTime: `${slotEndDate}T${slotEndTime}`,
        slotActive,
        spot: { spotId: Number(spotId) }
      });

      alert(res.data);
      clearForm();
      loadSlots();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Error updating slot");
    }
  };

  // ---------------- EDIT SLOT ----------------
  const editSlot = (s) => {
    setIsEdit(true);
    setSlotId(s.slotId);
    setSlotStartDate(s.slotStartDate);
    setSlotEndDate(s.slotEndDate);
    // Extract only time from LocalDateTime string
    setSlotStartTime(s.slotStartTime?.split("T")[1] || "");
    setSlotEndTime(s.slotEndTime?.split("T")[1] || "");
    setSlotActive(s.slotActive);
    setSpotId(s.spot.spotId);
  };

  // ---------------- DELETE SLOT ----------------
  const deleteSlot = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await axiosClient.delete(`/slot/delete_slot/${id}`);
      alert(res.data);
      loadSlots();
    } catch (err) {
      alert("Error deleting slot");
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Slots Management</h1>

        <div className="card">
          <h3>{isEdit ? "Edit Slot" : "Add Slot"}</h3>

          <input type="date" value={slotStartDate} onChange={(e) => setSlotStartDate(e.target.value)} /> <br />
          <input type="date" value={slotEndDate} onChange={(e) => setSlotEndDate(e.target.value)} /> <br />
          <input type="time" value={slotStartTime} onChange={(e) => setSlotStartTime(e.target.value)} /> <br />
          <input type="time" value={slotEndTime} onChange={(e) => setSlotEndTime(e.target.value)} /> <br />

          <label>
            <input type="checkbox" checked={slotActive} onChange={(e) => setSlotActive(e.target.checked)} />
            Active
          </label>

          <br />

          {/* Spot Dropdown */}
          <select value={spotId} onChange={(e) => setSpotId(e.target.value)}>
            <option value="">Select Spot</option>
            {spots.map((spot) => (
              <option key={spot.spotId} value={spot.spotId}>
                {spot.spotName}
              </option>
            ))}
          </select>

          <br /><br />

          {isEdit ? (
            <>
              <button className="btn" onClick={updateSlot}>Update</button>
              &nbsp;
              <button className="btn-danger" onClick={clearForm}>Cancel</button>
            </>
          ) : (
            <button className="btn" onClick={addSlot}>Add</button>
          )}
        </div>

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Active</th>
              <th>Spot</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {slots.map((s) => (
              <tr key={s.slotId}>
                <td>{s.slotId}</td>
                <td>{s.slotStartDate}</td>
                <td>{s.slotEndDate}</td>
                <td>{s.slotStartTime?.split("T")[1]}</td>
                <td>{s.slotEndTime?.split("T")[1]}</td>
                <td>{s.slotActive ? "Yes" : "No"}</td>
                <td>{s.spot.spotName}</td>
                <td>
                  <button className="btn" onClick={() => editSlot(s)}>Edit</button>
                  &nbsp;
                  <button className="btn-danger" onClick={() => deleteSlot(s.slotId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
