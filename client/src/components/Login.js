import { useState } from 'react';
import { login } from '../services/authService';

const Login = () => {
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await login({
                email: email,
                password: password
            });
            // Handle successful login
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            {/* Your form fields */}
        </form>
    );
}; 