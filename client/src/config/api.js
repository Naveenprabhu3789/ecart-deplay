const API_CONFIG = {
    baseURL: process.env.REACT_APP_API_URL || 'https://your-api-gateway-url/prod',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
};

export default API_CONFIG; 