import { useState, useEffect } from 'react';
import { fetchExpenses,deleteExpenseById,updateExpenseById } from '../utils/expenseService';

const useExpenses = (userId) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadExpenses = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const expenseData = await fetchExpenses(token,userId);
            setExpenses(expenseData);
        } catch (error) {
            setError(error);
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
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
        loadExpenses()
    };

    const updateExpense = async (expense) => {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Log the token to ensure it's being retrieved
    
        try {
            await updateExpenseById(token, expense); // Ensure this function correctly sends `expense` with an `id` parameter
            setExpenses((prevExpenses) =>
                prevExpenses.map((exp) =>
                  exp.ExpenseId === expense.ExpenseId ? { ...exp, ...expense } : exp
                )
              );
            
        } catch (error) {
            setError(error);
            console.error('Error updating expense:', error);
        }
    
        loadExpenses();
        console.log('Expenses reloaded'); // Log that expenses have been reloaded
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    return { expenses, loading, error, reloadExpenses: loadExpenses ,deleteExpense,updateExpense};
};

export default useExpenses;
