import React, { useState, useEffect } from 'react';

const RestaurantSignup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="login-container">
            <h1>Restaurant Signup</h1>
            <form className="login-form">
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <input type="email" placeholder="Enter Email" className="input-field"/>
                </div>
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <input type="password" placeholder="Enter Password" className="input-field"/>
                </div>
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <input type="password" placeholder="Confirm Password" className="input-field"/>
                </div>
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <input type="text" placeholder="Enter Restaurant Name" className="input-field"/>
                </div>
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <input type="text" placeholder="Enter Full Address" className="input-field"/>
                </div>
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <input type="tel" placeholder="Enter Contact Number" className="input-field"/>
                </div>
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <button type="submit" className="login-button">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default RestaurantSignup;
