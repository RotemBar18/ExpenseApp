import axios from 'axios';
import { alterCategoriesToArray } from './utilService'
const BASE_URL = 'http://localhost:8081';


export const fetchPreferences = async (userId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/preferences/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const newResponse = alterCategoriesToArray(response.data)
        return newResponse;  // Return preferences data
    } catch (error) {
        throw new Error('Error fetching preferences');
    }
};
export const updatePreferences = async (token, userId, preferences) => {
    try {
        const response = await axios.put(`${BASE_URL}/preferences/${userId}`, preferences, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating preferences:', error);
        throw error;
    }
};

export const postDefaultPreferences = async (token, userId, preferences) => {
    console.log(userId)
    try {
        const response = await axios.post(`${BASE_URL}/preferences/${userId}`, preferences, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating preferences:', error);
        throw error;
    }
};

