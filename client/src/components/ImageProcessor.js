import React, { useState } from 'react';
import { processImage } from '../services/api';

const ImageProcessor = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageUpload = async (event) => {
        try {
            setLoading(true);
            setError(null);
            const file = event.target.files[0];
            const response = await processImage(file);
            setResult(response.primary_keyword);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
            {loading && <p>Processing...</p>}
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            {result && <p>Result: {result}</p>}
        </div>
    );
};

export default ImageProcessor; 