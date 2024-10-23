import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchExpensesForBoardAction,
    deleteExpenseAction,
    updateExpenseAction,
} from '../redux/actions/expenseActions';

const useExpenses = ({ boardId }) => {
    const dispatch = useDispatch();
    const { expenses, loading, error } = useSelector((state) => state.expenses); // 'state.expenses' should exist


    useEffect(() => {
        if (boardId) {
            dispatch(fetchExpensesForBoardAction(boardId));
        }
    }, [dispatch, boardId]);

    const reloadExpenses = () => {
        console.log(boardId)

        if (boardId) {
            console.log('reload')
            dispatch(fetchExpensesForBoardAction(boardId)); // Re-dispatch to reload expenses
        }
    };

    const deleteExpense = (expenseId) => {
        dispatch(deleteExpenseAction(expenseId));
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
