import React from "react";
import ExpenseList from "../components/ExpenseList";
import useExpenses from '../hooks/useExpenses';
import Navbar from "../components/Navbar";
import styled from "styled-components";
import useAuth from '../hooks/useAuth';  // Import the custom hook

const ExpensePageContainer = styled.div`
    width:100%;
    background-color:#0a0a0a;
    position:fixed;
    top:0;
    left:0;
    height:100%;
`;



const Expenses = () => {
  const { user, preferences, userId } = useAuth(); // Use the custom hook to get user and preferences
  const { expenses, deleteExpense, updateExpense } = useExpenses(userId);

  console.log('Redux user:', user);  
  console.log('Redux preferences:', preferences);  

 


    if (!user) {
        return <div>Loading user data...</div>;
    }
    console.log(user); 

    const handleDeleteExpense = (expenseId) => {
        deleteExpense(expenseId)
    };

    const handleUpdateExpense = (expense) => {
        updateExpense(expense);
    };

    return (
        <ExpensePageContainer>
            <Navbar  expenses={expenses} preferences={preferences} user={user}  />
            <ExpenseList
                categories={preferences.DefaultCategories}
                expenses={expenses}
                onDelete={handleDeleteExpense}
                onUpdate={handleUpdateExpense} />
        </ExpensePageContainer>

    );
};

export default Expenses;