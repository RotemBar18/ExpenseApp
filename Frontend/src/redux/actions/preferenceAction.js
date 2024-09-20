import { fetchPreferences } from "../../utils/preferenceService";
export const fetchUserPreferences = (userId, token) => async (dispatch) => {
    dispatch({ type: 'LOADING_PREFERENCES' });
    try {
      const preferencesData = await fetchPreferences(userId, token);
      console.log('Raw fetched preferences:', preferencesData);  // Log raw preferences
  
      // Check if DefaultCategories is an array and contains stringified items
      if (Array.isArray(preferencesData.DefaultCategories)) {
        const cleanedCategories = preferencesData.DefaultCategories.map(categoryString => {
          // Remove any leading/trailing quotes or brackets
          let cleanedCategory = categoryString.replace(/^\[|\]$/g, '').replace(/['"]+/g, '');
          return cleanedCategory;
        });
  
        preferencesData.DefaultCategories = cleanedCategories;
      }
  
      console.log('Cleaned preferences:', preferencesData);  // Log cleaned preferences
  
      dispatch({ type: 'SET_PREFERENCES_DATA', payload: preferencesData });
    } catch (error) {
      console.error('Error fetching preferences:', error);  // Log the error
      dispatch({ type: 'SET_PREFERENCES_ERROR', payload: error.message });
    }
  };
  
  