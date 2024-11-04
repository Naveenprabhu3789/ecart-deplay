const API_CONFIG = {
    baseURL: process.env.REACT_APP_API_URL || 'https://ltkuo7zne9.execute-api.us-east-1.amazonaws.com/prod',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
};

export default API_CONFIG; 
