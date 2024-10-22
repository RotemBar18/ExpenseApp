const initialState = {
  ExpensesThemeColor: 'Light', 
  DefaultCategories: ['Food', 'Health', 'Entertainment', 'Miscellaneous'], 
  loading: true,
  error: null,
};

const loadPreferencesFromLocalStorage = () => {
  const storedPreferences = localStorage.getItem('preferences');
  return storedPreferences ? JSON.parse(storedPreferences) : initialState;
};

const savePreferencesToLocalStorage = (preferences) => {
  localStorage.setItem('preferences', JSON.stringify(preferences));
};

const preferencesReducer = (state = loadPreferencesFromLocalStorage(), action) => {
  switch (action.type) {
    case 'LOADING_PREFERENCES':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'SET_PREFERENCES_DATA':
      const updatedState = { ...state, ...action.payload, loading: false };
      savePreferencesToLocalStorage(updatedState);
      return updatedState;

    case 'CLEAR_PREFERENCES':
      localStorage.removeItem('preferences');
      return {
        ...initialState,
      };

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
