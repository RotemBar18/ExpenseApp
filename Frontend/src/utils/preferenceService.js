import axios from 'axios';
import { alterCategoriesToArray } from './utilService'
import axiosInstance from './axiosInstance';

const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8081'
    : 'https://expenseapp-production.up.railway.app';

export const fetchPreferences = async (boardId, token) => {
    try {
        const response = await axiosInstance.get(`/preferences/${boardId}`, {
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


export const updatePreferences = async (boardId, token, preferences) => {
    try {
        const response = await axiosInstance.put(`/preferences/${boardId}`, preferences, {
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

export const createDefaultPreferences = async (boardId) => {
    const token = localStorage.getItem('token');
    const defaultPreferences = {
        ExpensesThemeColor: "Light",
        DefaultCategories: `["Manage Categories:   ","Food", "Health", "Entertainment", "Miscellaneous"]`
    };

    try {
        const response = await axiosInstance.post(`/preferences/${boardId}`, defaultPreferences, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating preferences:', error);
        throw error;
    }
};
