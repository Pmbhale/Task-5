// src/apiClient.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' },
});

// yaha interceptors add kar sakta hai later for auth
export default api;