import React, { useEffect, useState } from "react";
import ExpenseList from "../components/mainBoards/ExpenseList";
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
  const { user, preferences } = useAuth();
  const board = useSelector((state) => state.board.selectedBoard); 
  const [isLoading, setIsLoading] = useState(true); 

  const { expenses, updateExpense, deleteExpense, reloadExpenses } = useExpenses({
    board: board
  });

  useEffect(() => {
    if (board && user) {
      reloadExpenses(); 
      setIsLoading(false);
    }
  }, [board, user]);

  if (!user || !board || isLoading) {
    return <div>Loading data...</div>;
  }

  const handleDeleteExpense = (expense) => {
    deleteExpense(expense);
  };

  const handleUpdateExpense = (expense) => {
    updateExpense(expense);
  };

  return (
    <ExpensePageContainer>
      <ExpenseList
        categories={preferences?.DefaultCategories || []} 
        expenses={expenses}
        onDelete={handleDeleteExpense}
        onUpdate={handleUpdateExpense}
      />
    </ExpensePageContainer>
  );
};

export default Expenses;
