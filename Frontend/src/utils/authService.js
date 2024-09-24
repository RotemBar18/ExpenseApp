import axios from 'axios';
import { postDefaultPreferences } from './preferenceService'
const BASE_URL = 'https://expenseapp-production.up.railway.app';

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


export const createDefaultPreferences = async (email) => {

    try {
        const response = await axios.get(`${BASE_URL}/users/${email}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            const userId = response.data.userId;
            const token = localStorage.getItem('token');
            const defaultPreferences = {
                ExpensesThemeColor: "#ffffff",
                DefaultCategories: '["Food", "Health", "Entertainment", "Miscellaneous"]'
            };
            postDefaultPreferences(token, userId, defaultPreferences);
            return response.data.userId;
        } else {
            alert(response.data.error);
        }
    } catch (error) {
        console.error("Error fetching user ID:", error);
        throw error;
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