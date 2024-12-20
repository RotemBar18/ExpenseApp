import axios from 'axios';
import axiosInstance from './axiosInstance';

const BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8081' 
    : 'https://expenseapp-production.up.railway.app';

export const fetchExpenses = async (token,Id) => {
    try {
        const response = await axiosInstance.get(`/expenses/${Id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

export const addExpense = async (token, expense) => {
    try {
        const response = await axiosInstance.post(`/expenses`, expense, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};
export const deleteExpenseById = async (token, expenseId) => {
    try {
        const response = await axiosInstance.delete(`/expenses/${expenseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
};

export const updateExpenseById = async (token, expense) => {
    try {
        const response = await axiosInstance.put(`/expenses/${expense.ExpenseId}`, expense, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        (response.data)
        return response.data;
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};

export const totalMonthExpenses = (expenses) => {
  const today = new Date();
  const currentMonth = today.getMonth(); 
  const currentYear = today.getFullYear(); 

  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.Date);
    return (
      expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
    );
  });

  return monthlyExpenses; 
};

export const fetchExpensesForBoard = async (token, boardId) => {
    try {
        const response = await axiosInstance.get(`/expenses/${boardId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching board expenses:', error);
        throw error;
    }
};