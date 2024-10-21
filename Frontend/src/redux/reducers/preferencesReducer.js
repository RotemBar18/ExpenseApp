const initialState = {
  ExpensesThemeColor: 'Light', // Default theme color
  DefaultCategories: ['Food', 'Health', 'Entertainment', 'Miscellaneous'], // Default categories
  loading: true,
  error: null,
};

// Helper function to load preferences from localStorage
const loadPreferencesFromLocalStorage = () => {
  const storedPreferences = localStorage.getItem('preferences');
  return storedPreferences ? JSON.parse(storedPreferences) : initialState;
};

// Helper function to store preferences in localStorage
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
      savePreferencesToLocalStorage(updatedState); // Save updated preferences to localStorage
      return updatedState;

    case 'CLEAR_PREFERENCES':
      localStorage.removeItem('preferences'); // Clear preferences from localStorage
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
