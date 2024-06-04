import React, { useState } from 'react';

const RestaurantSignup = () => {
    const initialFormData = {
        email: '',
        password: '',
        confirmPassword: '',
        restaurantName: '',
        address: '',
        contact: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useState(() => {
        setIsVisible(true);
    }, []);

    const validateEmail = (email) => {
        return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
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

        const result = await fetch('http://localhost:3000/api/restaurant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, restaurantName, address, contact })
        });
        
        const response = await result.json();
        if (response.error) {
            setErrorMessage(response.error);
        } else {
            setFormData(initialFormData);
            setErrorMessage('Signup successful!');
            alert("Restaurant Registered Successfully!")
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
