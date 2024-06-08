import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const RestaurantLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            setError(true)
            return false
        } else {
            setError(false)
        }
        let response = await fetch("/api/restaurant", {
            method: 'POST',
            body: JSON.stringify({ email, password, login: true })
        });
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard");
        } else {
            alert("Login failed")
        }
    };

    return (
        <div className="login-container">
            <h3>Restaurant Login</h3>
            <form className="login-form">
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && !email && <span className="input-error" >Please enter valid email </span>}
                </div>
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && !password && <span className="input-error" >Please enter valid password </span>}
                </div>
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <button type="button" onClick={handleLogin} className="login-button">Login</button>
                </div>
            </form>
        </div>
    );
}

export default RestaurantLogin;
