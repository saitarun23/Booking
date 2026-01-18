import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import axiosClient from "../api/axiosClient";

export default function FoodMenu() {
    const [foodMenu, setFoodMenu] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);

    const[ foodMenuId, setFoodMenuId ] = useState("");
    const[ foodMenuName, setFoodMenuName ] = useState("");
    const[ foodTypeId, setFoodTypeId ] = useState("");
    
    const [isEdit, setIsEdit] = useState(false);

    /* ================= LOAD DATA ================= */
    const loadFoodMenu = async () => {
        const res = await axiosClient.get("/foodmenu/findAll_foodmenu");
        setFoodMenu(res.data);
    };

    const loadFoodTypes = async () => {
        const res = await axiosClient.get("/foodtype/findAll_foodtype");
        setFoodTypes(res.data);
    };

    useEffect(() => {
        loadFoodMenu();
        loadFoodTypes();
    }, []);
    
    /* ================= CLEAR ================= */

    const clearForm = () => {
        setFoodMenuId("");
        setFoodMenuName("");
        setFoodTypeId("");
        setIsEdit(false);
    };

    /* ================= ADD ================= */

    const addFoodMenu = async () => {
        if (!foodMenuName.trim() || !foodTypeId) {
            alert("Please fill all required fields");
            return;
        }

        try {
            await axiosClient.post("/foodmenu/add_foodmenu", {
                foodMenuName,
                foodType: { foodTypeId: parseInt(foodTypeId) },
            });
            alert("Food Menu added");
            clearForm();
            loadFoodMenu();
        } catch (err) {
            console.error(err);
            alert("Error saving data");
        }
    };

    /* ================= UPDATE ================= */

    const updateFoodMenu = async () => {
        if (!foodMenuName.trim() || !foodTypeId) {
            alert("Please fill all required fields");
            return;
        }

    await axiosClient.put("/foodmenu/update_foodmenu", {
        foodMenuId,
        foodMenuName,
        foodType: { foodTypeId },
    });
    alert("Food Menu updated");
    clearForm();
    loadFoodMenu();
  };

    /* ================= EDIT ================= */
    const editFoodMenu = (fm) => {
        setIsEdit(true);
        setFoodMenuId(fm.foodMenuId);
        setFoodMenuName(fm.foodMenuName);
        setFoodTypeId(fm.foodType?.foodTypeId);
    };

    /* ================= DELETE ================= */

    const deleteFoodMenu = async (id) => {
        if (!window.confirm("Are you sure you want to delete this Food Menu?")) return;

        await axiosClient.delete(`/foodmenu/delete_foodmenu/${id}`);
        loadFoodMenu();
    };

    /* ================= UI ================= */
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <h2>Food Menu Management</h2>

                <div className="card">
                    <h3>{isEdit ? "Edit Food Menu" : "Add Food Menu"}</h3>

                    <input
                        placeholder="Food Menu Name"
                        value={foodMenuName}
                        onChange={(e) => setFoodMenuName(e.target.value)}
                    />

                    <select value={foodTypeId} onChange={(e) => setFoodTypeId(e.target.value)}>
                        <option value="">Select Food Type</option>
                        {foodTypes.map((ft) => (
                            <option key={ft.foodTypeId} value={ft.foodTypeId}>
                                {ft.foodTypeName}
                            </option>
                        ))}
                    </select>

                    <br/>

                    {isEdit ? (
                        <>
                            <button className="btn" onClick={updateFoodMenu}>Update</button>
                            <button className="btn-danger" onClick={clearForm}>Cancel</button>
                        </>
                    ) : (
                        <button className="btn" onClick={addFoodMenu}>Add</button>
                    )}
                </div>

                {/*TABLE*/}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Food Menu Name</th>
                            <th>Food Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {foodMenu.length > 0 ? (
                            foodMenu.map((fm) => (
                                <tr key={fm.foodMenuId}>
                                    <td>{fm.foodMenuId}</td>
                                    <td>{fm.foodMenuName}</td>
                                    <td>{fm.foodType?.foodTypeName}</td>
                                    <td>
                                        <button className="btn" onClick={() => editFoodMenu(fm)}>Edit</button>
                                        <button className="btn-danger" onClick={() => deleteFoodMenu(fm.foodMenuId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" style={{textAlign:"center"}}>No Food Menu found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}