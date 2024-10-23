import { useState, useEffect } from 'react';
import {  fetchBoards } from '../utils/boardService';

const useBoards = (userId) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllBoards = async () => {
    setLoading(true);

    const token = localStorage.getItem('token');
    try {
      
      const data = await fetchBoards(token, userId);
      setBoards(data);
    } catch (err) {
      setError(err.message || 'Error fetching boards');
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (newBoard) => {
    try {
      const createdBoard = await boardService.createBoard(userId, newBoard);
      setBoards((prevBoards) => [...prevBoards, createdBoard]);
    } catch (err) {
      setError(err.message || 'Error creating board');
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      await boardService.deleteBoard(boardId);
      setBoards((prevBoards) => prevBoards.filter((board) => board.ExpenseBoardId !== boardId));
    } catch (err) {
      setError(err.message || 'Error deleting board');
    }
  };

  const updateBoard = async (boardId, updatedData) => {
    try {
      const updatedBoard = await updateBoardService(boardId, updatedData); 
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.ExpenseBoardId === boardId ? updatedBoard : board
        )
      );
    } catch (err) {
      setError(err.message || 'Error updating board');
    }
  };
  const reloadBoards = () => {
    fetchAllBoards();
  };

  useEffect(() => {
    if (userId) {
      fetchAllBoards();
    }
  }, [userId]);

  return {
    updateBoard,
    boards,
    loading,
    error,
    createBoard,
    deleteBoard,
    reloadBoards,
  };
};

export default useBoards;
