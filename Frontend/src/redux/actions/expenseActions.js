import { fetchExpensesForBoard, addExpense, deleteExpenseById, updateExpenseById } from '../../utils/expenseService';

// Action types
export const FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS';
export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS';
export const DELETE_EXPENSE_SUCCESS = 'DELETE_EXPENSE_SUCCESS';
export const UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

// Action creators
export const fetchExpensesSuccess = (expenses) => ({
    type: FETCH_EXPENSES_SUCCESS,
    payload: expenses,
});

export const addExpenseSuccess = (expense) => ({
    type: ADD_EXPENSE_SUCCESS,
    payload: expense,
});

export const deleteExpenseSuccess = (expenseId) => ({
    type: DELETE_EXPENSE_SUCCESS,
    payload: expenseId,
});

export const updateExpenseSuccess = (expense) => ({
    type: UPDATE_EXPENSE_SUCCESS,
    payload: expense,
});

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading,
});

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

// Thunks
export const fetchExpensesForBoardAction = (boardId) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(setLoading(true));
    try {
        const expenses = await fetchExpensesForBoard(token, boardId);
        dispatch(fetchExpensesSuccess(expenses));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

export const addExpenseAction = (expense) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(setLoading(true));
    try {
        const newExpense = await addExpense(token, expense);
        dispatch(addExpenseSuccess(newExpense));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteExpenseAction = (expenseId) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(setLoading(true));
    try {
        await deleteExpenseById(token, expenseId);
        dispatch(deleteExpenseSuccess(expenseId));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateExpenseAction = (expense) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(setLoading(true));
    try {
        const updatedExpense = await updateExpenseById(token, expense);
        dispatch(updateExpenseSuccess(updatedExpense));
    } catch (error) {
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};
