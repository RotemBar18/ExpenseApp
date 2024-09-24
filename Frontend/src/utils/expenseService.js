import axios from 'axios';
const BASE_URL = 'https://expenseapp-production.up.railway.app';


export const fetchExpenses = async (token,Id) => {
    try {
        const response = await axios.get(`${BASE_URL}/expenses/${Id}`, {
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
        const response = await axios.post(`${BASE_URL}/expenses`, expense, {
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
        const response = await axios.delete(`${BASE_URL}/expenses/${expenseId}`, {
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
        const response = await axios.put(`${BASE_URL}/expenses/${expense.ExpenseId}`, expense, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};

