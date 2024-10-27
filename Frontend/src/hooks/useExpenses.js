import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpensesForBoardAction, deleteExpenseAction, updateExpenseAction, addExpenseAction, } from '../redux/actions/expenseActions';
import { sendAddExpenseMessage, sendRemoveExpenseMessage, sendUpdateExpenseMessage } from '../utils/websocketClient';
import useAuth from './useAuth';
import { formatToLocalDate, formatToLocalDatePresent} from '../utils/utilService';
const useExpenses = ({ board }) => {
    const boardId = board?.ExpenseBoardId
    const { user } = useAuth()
    const dispatch = useDispatch();
    const { expenses, loading, error } = useSelector((state) => state.expenses); // 'state.expenses' should exist

    useEffect(() => {
        dispatch(fetchExpensesForBoardAction(boardId));
    }, [boardId, dispatch]);

    const reloadExpenses = (boardId) => {
        if (boardId) {
            dispatch(fetchExpensesForBoardAction(boardId)); // Re-dispatch to reload expenses
        }
    };

    const deleteExpense = (expense) => {
        dispatch(deleteExpenseAction(expense.ExpenseId));
        sendRemoveExpenseMessage(user, expense, board);
    };

    const addExpense = (expense) => {
        dispatch(addExpenseAction(expense));
        sendAddExpenseMessage(user, expense, board);
    };


    const updateExpense = (expense, initialData) => {
        dispatch(updateExpenseAction(expense));
        const changes = [];
    
        if (expense.Name !== initialData.Name) {
            changes.push(`Name changed from "${initialData.Name}" to "${expense.Name}"`);
        }
        if (expense.Amount !== initialData.Amount) {
            changes.push(`Amount changed from ${initialData.Amount} to ${parseFloat(expense.Amount).toFixed(2)}`);
        }
        if (expense.Category !== initialData.Category) {
            changes.push(`Category changed from "${initialData.Category}" to "${expense.Category}"`);
        }
        if (expense.Description !== initialData.Description) {
            changes.push(`Description updated`);
        }
        if (expense.Date !== formatToLocalDate(initialData.Date)) {
            changes.push(`Date changed from "${formatToLocalDatePresent(initialData.Date)}" to "${formatToLocalDatePresent(expense.Date)}"`);
        }
    
        if (changes.length > 0) {
            sendUpdateExpenseMessage(user, { ...expense, changes }, board);
        }
    };
    



    return {
        expenses,
        loading,
        error,
        addExpense,
        reloadExpenses,
        deleteExpense,
        updateExpense,
    };
};

export default useExpenses;
