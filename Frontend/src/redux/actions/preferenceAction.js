import { fetchPreferences, updatePreferences } from "../../utils/preferenceService";

export const fetchBoardPreferences = (boardId, token) => async (dispatch) => {
  dispatch({ type: 'LOADING_PREFERENCES' });

  try {
    const storedPreferences = localStorage.getItem(`boardPreferences_${boardId}`);
    
    if (storedPreferences) {
      const preferencesData = JSON.parse(storedPreferences);
      dispatch({ type: 'SET_PREFERENCES_DATA', payload: preferencesData });
    } else {
      const preferencesData = await fetchPreferences(boardId, token);

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