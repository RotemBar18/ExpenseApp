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
        console.log('Loading preferences...');  // Log loading state
        return {
          ...state,
          loading: true,
        };
      case 'SET_PREFERENCES_DATA':
        console.log('Setting preferences data:', action.payload);  // Log the payload
        return {
          ...state,
          ExpensesThemeColor: action.payload.ExpensesThemeColor,
          DefaultCategories: action.payload.DefaultCategories,
          loading: false,
        };
      case 'SET_PREFERENCES_ERROR':
        console.log('Error in preferences reducer:', action.payload);  // Log the error
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        console.log('Default reducer case');  // Log when no action matches
        return state;
    }
  };
  
  
  export default preferencesReducer;