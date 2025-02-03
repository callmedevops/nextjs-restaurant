import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState();
    const router = useRouter();

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        const resto_id = restaurantData._id;
        let response = await fetch("/api/restaurant/foods/" + resto_id);
        response = await response.json();
        if (response.success) {
            setFoodItems(response.result);
        } else {
            alert("Food item list not loading");
        }
    };

    const deleteFoodItem = async (id) => {
        let response = await fetch('/api/restaurant/foods/' + id, {
            method: 'delete'
        });
        response = await response.json();
        if (response.success) {
            loadFoodItems();
        } else {
            alert("Food item not deleted");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Food Items</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems && foodItems.map((item, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <img src={item.img_path} alt={item.name} className="img-fluid" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteFoodItem(item._id)}>Delete</button>
                                    <button className="btn btn-primary btn-sm" onClick={() => router.push('dashboard/' + item._id)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default FoodItemList;