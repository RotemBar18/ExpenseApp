import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchExpensesForBoardAction,
    deleteExpenseAction,
    updateExpenseAction,
} from '../redux/actions/expenseActions';
import { sendRemoveExpenseMessage } from '../utils/websocketClient';
import useAuth from './useAuth';

const useExpenses = ({ board }) => {
    const boardId = board?.ExpenseBoardId
    const { user } = useAuth()
    const dispatch = useDispatch();
    const { expenses, loading, error } = useSelector((state) => state.expenses); // 'state.expenses' should exist


    useEffect(() => {
        if (boardId) {
            dispatch(fetchExpensesForBoardAction(boardId));
        }
    }, [dispatch, boardId]);

    const reloadExpenses = () => {
        if (boardId) {
            dispatch(fetchExpensesForBoardAction(boardId)); // Re-dispatch to reload expenses
        }
    };

    const deleteExpense = (expense) => {
        dispatch(deleteExpenseAction(expense.ExpenseId));
        sendRemoveExpenseMessage(user, expense, board);
    };

    const updateExpense = (expense) => {
        dispatch(updateExpenseAction(expense));
    };



    return {
        expenses,
        loading,
        error,
        reloadExpenses,
        deleteExpense,
        updateExpense,
    };
};

export default useExpenses;
