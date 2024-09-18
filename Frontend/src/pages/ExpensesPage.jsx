import React from "react";
import ExpenseList from "../components/ExpenseList";
import { useLocation } from "react-router-dom";
import useExpenses from '../hooks/useExpenses';
import Navbar from "../components/Navbar";
import styled from "styled-components";

const ExpensePageContainer = styled.div`
    width:100%;
    background-color:#0a0a0a;
    position:fixed;
    top:0;
    left:0;
    height:100%;
`;



const Expenses = () => {
    const location = useLocation();
    const preferences = location.state?.preferences || {};
    const user = location.state?.user || {};
    const { expenses, loading, error, reloadExpenses, deleteExpense, updateExpense } = useExpenses(user.Id);

    if (!user) {
        return <div>Loading user data...</div>;
    }
    console.log(user); // Now you have access to the user on this page

    const handleDeleteExpense = (expenseId) => {
        deleteExpense(expenseId)
    };

    const handleUpdateExpense = (expense) => {
        updateExpense(expense);
    };

    return (
        <ExpensePageContainer>
            <Navbar user={user} preferences={preferences} expenses={expenses} />
            <ExpenseList
                categories={preferences.DefaultCategories}
                expenses={expenses}
                onDelete={handleDeleteExpense}
                onUpdate={handleUpdateExpense} />
        </ExpensePageContainer>

    );
};

export default Expenses;