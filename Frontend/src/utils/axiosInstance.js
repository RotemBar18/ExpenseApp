import axios from 'axios';
import { logoutHandler } from '../hooks/useAutoLogout';
import store from '../redux/store';
import { refreshAccessToken } from '../utils/authService';

// Set the base URL based on environment
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add the response interceptor
axiosInstance.interceptors.response.use(
    (response) => response, // Return response if successful

    async (error) => {
        const originalRequest = error.config;

        // Check if the error is 401 (unauthorized) and avoid infinite retries
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Flag to prevent infinite loop

            console.log("401 Unauthorized error encountered. Attempting to refresh token...");

            try {
                // Request a new access token using the refresh token
                const newAccessToken = await refreshAccessToken(); // Function to call the refresh token endpoint
                console.log("New access token received:", newAccessToken);

                // If the token refresh was successful, retry the original request with the new access token
                if (newAccessToken) {
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    console.log("Retrying the original request with new access token...");
                    return axiosInstance(originalRequest); // Retry the request
                } else {
                    console.log("Failed to refresh token. Logging out...");
                    logoutHandler(); // If refresh fails, log the user out
                }
            } catch (refreshError) {
                console.error("Error refreshing access token:", refreshError);
                logoutHandler(); // Logout if refresh request also fails
                return Promise.reject(refreshError);
            }
        }

        console.error("Axios error encountered:", error);
        return Promise.reject(error); // Reject error if it's not 401
    }
);

export default axiosInstance;
