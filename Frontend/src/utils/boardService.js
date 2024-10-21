import axios from 'axios';
import { fetchBoardPreferences } from '../redux/actions/preferenceAction';
import { createDefaultPreferences } from './preferenceService';
import { addBoardCollaborator } from './boardMembersService'
const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8081'
    : 'https://expenseapp-production.up.railway.app';

export const fetchBoards = async (token, userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/boards/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data[0];
    } catch (error) {
        console.error('Error fetching boards:', error);
        throw error;
    }
};

export const fetchBoardById = async (boardId) => {
    try {
        const response = await axios.get(`${BASE_URL}/boards/${boardId}`);
        dispatch(fetchBoardPreferences(boardId, token));
        return response.data;
    } catch (error) {
        console.error('Error fetching board:', error);
        throw error;
    }
};


export const createBoard = async (token, boardName, OwnerId) => {
    try {
        const boardResponse = await axios.post(`${BASE_URL}/boards/`,
            { boardName, OwnerId },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        const newBoard = boardResponse.data.newBoard;

        await addBoardCollaborator(token, OwnerId, newBoard.ExpenseBoardId);

        await createDefaultPreferences(newBoard.ExpenseBoardId);

        return newBoard;
    } catch (error) {
        console.error('Error creating board, adding collaborator, or creating preferences:', error);
        throw error;
    }
};

export const updateBoard = async (boardId, updatedData, token) => {
    if(!updatedData.ProfilePic ){
        updatedData.ProfilePic = ''
    }

    try {
        const response = await axios.put(`${BASE_URL}/boards/${boardId}`, updatedData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.status === 200) {
            throw new Error('Error updating board');
        }
        return response.data; 
    } catch (error) {
        console.error('Error updating board:', error);
        throw error;
    }
};
