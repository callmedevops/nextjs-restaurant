'use client'
import React, { useState } from "react";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantLogin from "../_components/RestaurantLogin"; 
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";
import "./style.css";
const Restaurant = () => { 
    const [login, setLogin] = useState(true);

    return (
        <div className="login-signup-container">
            <RestaurantHeader />
            <h1>Suraj Restaurant Login/Signup Page</h1>   
            <button className="button-link" onClick={() => setLogin(!login)}>
                {login ? "Switch to Signup" : "Switch to Login"}
            </button>        
            {login ? <RestaurantLogin /> : <RestaurantSignup />}
            <Footer />        
        </div>
    );
}

export default Restaurant;
