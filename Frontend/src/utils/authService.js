import axios from 'axios';
import axiosInstance from './axiosInstance';

const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8081'
    : 'https://expenseapp-production.up.railway.app';

export const signup = async (name, password, email) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, {
            Name: name,
            Email: email,
            Password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error during sign-up:", error);
        throw error;
    }

};

export const login = async (email, password) => {

    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            Email: email,
            Password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.success) {
            return response.data;
        } else {
            alert(response.data.message);
            return null
        }
    } catch (error) {
        console.error("Error in login request:", error);
        alert('Login failed. Please try again.');
        return null;
    }

};


export const fetchUser = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/Id/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return response.data.user
        } else {
            alert(response.data.error);
        }
    } catch (error) {
        console.error("Error fetching user ID:", error);
        throw error;
    }
};

export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken'); // Confirm retrieval
    console.log("Retrieved Refresh Token:", refreshToken);
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        console.log(`Attempting refresh at: ${BASE_URL}/refresh-token`);
        const response = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken });
        const newAccessToken = response.data.accessToken;
        console.log("New Access Token:", newAccessToken);
        localStorage.setItem('token', newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
}
