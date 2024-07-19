import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Modifiez cette URL selon votre configuration backend
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
