
import axios from "axios";
const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8081'
    : 'https://expenseapp-production.up.railway.app';

export const addBoardCollaborator = async (token, userId, boardId) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/boardmembers/`, { userId, boardId },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding board collaborator:', error);
        throw error;
    }
};
export const removeBoardCollaborator = async (token, userId, boardId) => {
    try {
        (token, userId, boardId); // Ensure logging the right values
        const response = await axios.delete(
            `${BASE_URL}/boardmembers/`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                params: { userId, boardId } // Pass as query params
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error removing board collaborator:', error);
        throw error;
    }
};

export const fetchCollaborators = async (token, boardId) => {
    try {
        const response = await axios.get(`${BASE_URL}/boardmembers/${boardId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; // Assume the response gives the list of collaborators
    } catch (error) {
        console.error('Error fetching collaborators:', error);
    }
};