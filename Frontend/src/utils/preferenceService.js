import axios from 'axios';
import { alterCategoriesToArray } from './utilService'
const BASE_URL = 'https://expenseapp-production.up.railway.app';


export const fetchPreferences = async (userId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/preferences/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const newResponse = alterCategoriesToArray(response.data)

        return newResponse; 
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
            throw new Error('Failed to update preferences');  
        }
        return response.data
    } catch (error) {
        console.error('Error updating preferences:', error.message);
        throw new Error('Error updating preferences'); 
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

