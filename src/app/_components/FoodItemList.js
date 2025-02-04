"use client";

import { useEffect, useState } from "react";

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [updatedItem, setUpdatedItem] = useState({});

    useEffect(() => {
        fetchFoodItems();
    }, []);
    const fetchFoodItems = async () => {
        try {
            const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
            if (!restaurantData) return alert("Restaurant data not found");

            const response = await fetch(`/api/restaurant/foods/${restaurantData._id}`);
            const data = await response.json();
            if (data.success) {
                setFoodItems(data.result);
            } else {
                alert("Failed to load food items");
            }
        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    };
    const deleteFoodItem = async (id) => {
        try {
            const response = await fetch(`/api/restaurant/foods/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.success) {
                fetchFoodItems();
            } else {
                alert("Failed to delete food item");
            }
        } catch (error) {
            console.error("Error deleting food item:", error);
        }
    };
    const enableEdit = (item) => {
        setEditMode(item._id);
        setUpdatedItem({ ...item });
    };
    const handleChange = (e, field) => {
        setUpdatedItem({ ...updatedItem, [field]: e.target.value });
    };
    const updateFoodItem = async (id) => {
        try {
            const response = await fetch(`/api/restaurant/foods/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedItem),
            });
            const data = await response.json();
            if (data.success) {
                fetchFoodItems();
                setEditMode(null);
            } else {
                alert("Failed to update food item");
            }
        } catch (error) {
            console.error("Error updating food item:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Food Items</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems.length > 0 ? (
                        foodItems.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    {editMode === item._id ? (
                                        <input
                                            type="text"
                                            value={updatedItem.name}
                                            onChange={(e) => handleChange(e, "name")}
                                            className="form-control"
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </td>
                                <td>
                                    {editMode === item._id ? (
                                        <input
                                            type="number"
                                            value={updatedItem.price}
                                            onChange={(e) => handleChange(e, "price")}
                                            className="form-control"
                                        />
                                    ) : (
                                        item.price
                                    )}
                                </td>
                                <td>
                                    {editMode === item._id ? (
                                        <textarea
                                            value={updatedItem.description}
                                            onChange={(e) => handleChange(e, "description")}
                                            className="form-control"
                                        />
                                    ) : (
                                        item.description
                                    )}
                                </td>
                                <td>
                                    {editMode === item._id ? (
                                        <input
                                            type="text"
                                            value={updatedItem.img_path}
                                            onChange={(e) => handleChange(e, "img_path")}
                                            className="form-control"
                                        />
                                    ) : (
                                        <img
                                            src={item.img_path}
                                            alt={item.name}
                                            className="img-fluid"
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    {editMode === item._id ? (
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => updateFoodItem(item._id)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => enableEdit(item)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteFoodItem(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No food items available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FoodItemList;