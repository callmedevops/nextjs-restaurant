import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const RestaurantSignup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        restaurantName: '',
        address: '',
        contact: ''
    });
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
    }, []);
    const validateEmail = (email) => {
        return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignup = async (event) => {
        event.preventDefault();

        const { email, password, confirmPassword, restaurantName, address, contact } = formData;

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }
        const response = await fetch('/api/restaurant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, restaurantName, address, contact })
        });

        const result = await response.json();

        if (result.error) {
            setErrorMessage(result.error);
        } else {
            delete result.password;
            const dataToStore = {
                ...result,
                expiration: new Date().getTime() + 86400000
            };
            localStorage.setItem("restaurantUser", JSON.stringify(dataToStore));
            router.push('/restaurant/dashboard');
        }
    };
    return (
        <div className="login-container">
            <h1>Restaurant Signup</h1>
            <form className="login-form" onSubmit={handleSignup}>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {Object.entries(formData).map(([key, value]) => (
                    <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }} key={key}>
                        <input
                            type={key === 'password' || key === 'confirmPassword' ? 'password' : key === 'contact' ? 'tel' : 'text'}
                            placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
                            className="input-field"
                            value={value}
                            onChange={handleChange}
                            name={key}
                            autoComplete="off"
                        />
                    </div>
                ))}
                <div className="input-wrapper" style={{ display: isVisible ? 'block' : 'none' }}>
                    <button type="submit" className="login-button">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default RestaurantSignup;
