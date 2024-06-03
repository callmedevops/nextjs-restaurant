import React, { useState, useEffect } from 'react';

const RestaurantLogin = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="login-container">
            <h3>Restaurant Login</h3>
            <form className="login-form">
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <input type="text" placeholder="Enter Email" className="input-field"/>
                </div>
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <input type="password" placeholder="Enter Password" className="input-field"/>
                </div>
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <button type="submit" className="login-button">Login</button>
                </div>
            </form>
        </div>
    );
}

export default RestaurantLogin;
