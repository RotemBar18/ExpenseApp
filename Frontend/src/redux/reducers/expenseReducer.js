import {
    FETCH_EXPENSES_SUCCESS,
    ADD_EXPENSE_SUCCESS,
    CLEAR_EXPENSES,
    DELETE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_SUCCESS,
    SET_LOADING,
    SET_ERROR,
} from '../actions/expenseActions';

const initialState = {
    expenses: [],
    loading: false,
    error: null,
};

const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EXPENSES_SUCCESS:
            return {
                ...state,
                expenses: action.payload,
                error: null,
            };
        case ADD_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
                error: null,
            };
        case DELETE_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense.ExpenseId !== action.payload),
                error: null,
            };
        case CLEAR_EXPENSES:
            return {
                ...initialState,
            };
        case UPDATE_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: state.expenses.map((expense) =>
                    expense.ExpenseId === action.payload.ExpenseId ? action.payload : expense
                ),
                error: null,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default expenseReducer;
