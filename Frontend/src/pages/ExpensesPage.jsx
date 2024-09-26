import React from "react";
import ExpenseList from "../components/ExpenseList";
import useExpenses from '../hooks/useExpenses';
import styled from "styled-components";
import useAuth from '../hooks/useAuth';  

const ExpensePageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  
`;



const Expenses = () => {
  const { user, preferences, userId } = useAuth(); 
  const { expenses, deleteExpense, updateExpense } = useExpenses(userId);


 


    if (!user) {
        return <div>Loading user data...</div>;
    }

    const handleDeleteExpense = (expenseId) => {
        deleteExpense(expenseId)
    };

    const handleUpdateExpense = (expense) => {
        updateExpense(expense);
    };

    return (
        <ExpensePageContainer>
            <ExpenseList
                categories={preferences.DefaultCategories}
                expenses={expenses}
                onDelete={handleDeleteExpense}
                onUpdate={handleUpdateExpense} />
        </ExpensePageContainer>

    );
};

export default Expenses;