import { useState, useEffect } from 'react';
import { fetchExpenses, deleteExpenseById, updateExpenseById } from '../utils/expenseService';

const useExpenses = (userId) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadExpenses = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const expenseData = await fetchExpenses(token, userId);
            setExpenses(expenseData);
        } catch (error) {
            setError(error);
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);  // Ensure loading is set to false
        }
    };

    const deleteExpense = async (expenseId) => {
        const token = localStorage.getItem('token');
        try {
            await deleteExpenseById(token, expenseId); 
            setExpenses((prevExpenses) => prevExpenses.filter(exp => exp.ExpenseId !== expenseId));
        } catch (error) {
            setError(error);
            console.error('Error deleting expense:', error);
        }
        loadExpenses();  // Reload expenses after deletion
    };

    const updateExpense = async (expense) => {
        const token = localStorage.getItem('token');

        try {
            await updateExpenseById(token, expense);  // Ensure this function correctly sends `expense` with an `id`
            setExpenses((prevExpenses) =>
                prevExpenses.map((exp) =>
                    exp.ExpenseId === expense.ExpenseId ? { ...exp, ...expense } : exp
                )
            );
        } catch (error) {
            setError(error);
            console.error('Error updating expense:', error);
        }

        loadExpenses();  // Reload expenses after update
    };

    useEffect(() => {
        if (userId) {
            loadExpenses();  // Only load expenses if userId is available
        }
    }, [userId]);  // Add userId to the dependency array to ensure the effect runs when it changes

    return { expenses, loading, error, reloadExpenses: loadExpenses, deleteExpense, updateExpense };
};

export default useExpenses;
