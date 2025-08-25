// services/boardService.js
import axiosInstance from './axiosInstance';
import { createDefaultPreferences } from './preferenceService';
import { addBoardCollaborator } from './boardMembersService';

// Get ALL boards (owned or member) for a user
export const fetchBoards = async (token, userId) => {
    const { data } = await axiosInstance.get(`/boards/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    // data is an array of boards with keys: ExpenseBoardId, Name, OwnerId, ...
    return data;
};

// Get a specific board
export const fetchBoardById = async (boardId, token) => {
    const { data } = await axiosInstance.get(`/boards/board/${boardId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data; // { ExpenseBoardId, Name, ... }
};

// Create a board, then add owner as collaborator and create default prefs
export const createBoard = async (token, boardName, OwnerId) => {
    const { data } = await axiosInstance.post(
        `/boards/`,
        { boardName, OwnerId },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );

    const newBoard = data.newBoard; // has ExpenseBoardId
    await addBoardCollaborator(token, OwnerId, newBoard.ExpenseBoardId);
    await createDefaultPreferences(newBoard.ExpenseBoardId);
    return newBoard;
};

// Update a board
export const updateBoardService = async (token, updatedData) => {
    const boardId = updatedData.ExpenseBoardId;
    const payload = {
        ...updatedData,
        ProfilePic: updatedData.ProfilePic ?? '' // default to empty string
    };

    const response = await axiosInstance.put(`/boards/board/${boardId}`, payload, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });

    if (response.status !== 200) throw new Error('Error updating board');
    return response.data; // { message, updatedBoard }
};

// Delete a board
export const deleteBoard = async (boardId, token) => {
    const response = await axiosInstance.delete(`/boards/board/${boardId}`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    if (response.status !== 200) throw new Error('Error deleting board');
    return response.data;
};
