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

        console.log(response.data)
        const newResponse = alterCategoriesToArray(response.data)

        return newResponse;  // Return preferences data
    } catch (error) {
        throw new Error('Error fetching preferences');
    }
};


export const updatePreferences = async (userId, token, preferences) => {
    try {
        const response = await axios.put(`${BASE_URL}/preferences/${userId}`, preferences, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.status !== 200) {
            throw new Error('Failed to update preferences'); // Ensure error is thrown on failure
        }
        return response.data
    } catch (error) {
        console.error('Error updating preferences:', error.message);
        throw new Error('Error updating preferences'); // Throw an error to be caught in the action creator
    }
};

export const postDefaultPreferences = async (token, userId, preferences) => {
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

