import { fetchPreferences, updatePreferences } from "../../utils/preferenceService";

export const fetchBoardPreferences = (boardId, token) => async (dispatch) => {
  dispatch({ type: 'LOADING_PREFERENCES' });

  try {
    // Check if preferences are already in localStorage
    const storedPreferences = localStorage.getItem(`boardPreferences_${boardId}`);
    
    if (storedPreferences) {
      // Rehydrate from localStorage
      const preferencesData = JSON.parse(storedPreferences);
      dispatch({ type: 'SET_PREFERENCES_DATA', payload: preferencesData });
    } else {
      // Fetch from the API if not found in localStorage
      const preferencesData = await fetchPreferences(boardId, token);

      // Clean and format categories
      if (Array.isArray(preferencesData.DefaultCategories)) {
        let cleanedCategories = preferencesData.DefaultCategories.map(categoryString => {
          let cleanedCategory = categoryString.replace(/^\[|\]$/g, '').replace(/['"]+/g, '');
          return cleanedCategory;
        });
        if (cleanedCategories.length === 1 && cleanedCategories[0] === '') {
          cleanedCategories[0] = 'Manage Categories:   ';
        }

        preferencesData.DefaultCategories = cleanedCategories;
      }

      
      dispatch({ type: 'SET_PREFERENCES_DATA', payload: preferencesData });
    }
  } catch (error) {
    console.error('Error fetching preferences:', error);
    dispatch({ type: 'SET_PREFERENCES_ERROR', payload: error.message });
  }
};


export const clearPreferences = () => {
  return {
    type: 'CLEAR_PREFERENCES',
  };
};



export const updateBoardPreferences = (boardId, token, updatedPreferences) => async (dispatch) => {
  dispatch({ type: 'LOADING_PREFERENCES' });
  try {

    if (!Array.isArray(updatedPreferences.DefaultCategories)) {
      throw new Error('DefaultCategories must be an array during update.');
    }

    const response = await updatePreferences(boardId, token, {
      ...updatedPreferences,
      DefaultCategories: JSON.stringify(updatedPreferences.DefaultCategories),
    });

    response.preferences.DefaultCategories = JSON.parse(response.preferences.DefaultCategories);

    if (response.success) {
      dispatch({ type: 'SET_PREFERENCES_DATA', payload: response.preferences });
    } else {
      throw new Error('Failed to update preferences');
    }
  } catch (error) {
    console.error('Error updating preferences:', error);
    dispatch({ type: 'SET_PREFERENCES_ERROR', payload: error.message });
  }
};