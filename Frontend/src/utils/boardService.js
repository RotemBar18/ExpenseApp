import axios from 'axios';
import { fetchBoardPreferences } from '../redux/actions/preferenceAction';
import { createDefaultPreferences } from './preferenceService';
import { addBoardCollaborator } from './boardMembersService'
import axiosInstance from './axiosInstance';

export const fetchBoards = async (token, userId) => {
    try {
        const response = await axiosInstance.get(`/boards/${userId}`, {
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
        const response = await axiosInstance.get(`/boards/${boardId}`);
        dispatch(fetchBoardPreferences(boardId, token));
        return response.data;
    } catch (error) {
        console.error('Error fetching board:', error);
        throw error;
    }
};


export const createBoard = async (token, boardName, OwnerId) => {
    try {
        const boardResponse = await axiosInstance.post(`/boards/`,
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

export const updateBoardService = async (token,updatedData) => {
    if (!updatedData.ProfilePic) {
        updatedData.ProfilePic = ''
    }
    const boardId = updatedData.ExpenseBoardId
    try {
        const response = await axiosInstance.put(`/boards/${boardId}`, updatedData, {
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
export const deleteBoard = async (boardId, token) => {
    try {
        const response = await axiosInstance.delete(`/boards/${boardId}`, {
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
