import axios from 'axios';

// Base configuration for API client
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api', // Default to local mock server
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or get from Zustand store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add clinicId to request if available
    const clinicId = localStorage.getItem('clinicId'); // Or get from Zustand store
    if (clinicId) {
      config.headers['X-Clinic-ID'] = clinicId;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling responses
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access - maybe redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;