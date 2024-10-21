import { useState, useEffect } from 'react';
import { fetchExpensesForBoard, deleteExpenseById, updateExpenseById } from '../utils/expenseService';

const useExpenses = ({boardId,userId}) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadExpenses = async () => {
        if (!boardId) return; 

        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const expenseData = await fetchExpensesForBoard(token,boardId);
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
        loadExpenses(); 
    };

    const updateExpense = async (expense) => {
        const token = localStorage.getItem('token');

        try {
            await updateExpenseById(token, expense); 
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
    };

    useEffect(() => {
        if (userId) {
            loadExpenses();  
        }
    }, [userId]); 

    return { expenses, loading, error, reloadExpenses: loadExpenses, deleteExpense, updateExpense };
};

export default useExpenses;
