import React, { useEffect, useState } from "react";
import ExpenseList from "../components/ExpenseList";
import useExpenses from '../hooks/useExpenses';
import styled from "styled-components";
import useAuth from '../hooks/useAuth';  
import { useSelector } from 'react-redux';

const ExpensePageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Expenses = () => {
  const { user, preferences, userId } = useAuth();
  const board = useSelector((state) => state.board.selectedBoard); // Get selected board from Redux
  const [isLoading, setIsLoading] = useState(true); // Manage loading state

  // Check if both user and board are available before fetching expenses
  const { expenses, updateExpense, deleteExpense, reloadExpenses } = useExpenses({
    boardId: board?.ExpenseBoardId, 
    userId
  });

  // Effect to handle reloading of expenses when the board or user changes
  useEffect(() => {
    if (board && user) {
      reloadExpenses(); // Only attempt to reload expenses once the board is loaded
      setIsLoading(false);
    }
  }, [board, user]);

  // If either user or board data is not ready, show loading message
  if (!user || !board || isLoading) {
    return <div>Loading data...</div>;
  }

  const handleDeleteExpense = (expenseId) => {
    deleteExpense(expenseId);
  };

  const handleUpdateExpense = (expense) => {
    updateExpense(expense);
  };

  return (
    <ExpensePageContainer>
      <ExpenseList
        categories={preferences?.DefaultCategories || []} // Ensure preferences are available
        expenses={expenses}
        onDelete={handleDeleteExpense}
        onUpdate={handleUpdateExpense}
      />
    </ExpensePageContainer>
  );
};

export default Expenses;
