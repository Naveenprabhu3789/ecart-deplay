import { useState } from 'react';
import { register } from '../services/authService';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await register({
                username,
                email,
                password
            });
            // Handle successful registration
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">Processing...</div>}
            {/* Your form fields */}
        </form>
    );
}; 