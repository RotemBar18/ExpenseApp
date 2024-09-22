// preferencesReducer.js
const initialState = {
  ExpensesThemeColor: '',
  DefaultCategories: [],
  loading: true,
  error: null,
};

const preferencesReducer = (state = initialState, action) => {
  console.log('Action received in reducer:', action);  // Log every action

  switch (action.type) {
      case 'LOADING_PREFERENCES':
          return {
              ...state,
              loading: true,
          };
      case 'SET_PREFERENCES_DATA':
          const updatedState = { ...state, loading: false, ...action.payload };
          return updatedState;
      case 'SET_PREFERENCES_ERROR':
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export default preferencesReducer;
