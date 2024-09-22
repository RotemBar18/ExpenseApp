import { fetchPreferences } from "../../utils/preferenceService";
import { updatePreferences } from "../../utils/preferenceService"; // Import the service function

export const fetchUserPreferences = (userId, token) => async (dispatch) => {
    dispatch({ type: 'LOADING_PREFERENCES' });
    try {
      const preferencesData = await fetchPreferences(userId, token);
  
      if (Array.isArray(preferencesData.DefaultCategories)) {
        let cleanedCategories = preferencesData.DefaultCategories.map(categoryString => {
          let cleanedCategory = categoryString.replace(/^\[|\]$/g, '').replace(/['"]+/g, '');
          return cleanedCategory;
        });
        if (cleanedCategories.length  === 1 && cleanedCategories[0] === ''){
          cleanedCategories[0] = 'Manage Categories:   '
        }

        preferencesData.DefaultCategories = cleanedCategories;
      }
  
  
      dispatch({ type: 'SET_PREFERENCES_DATA', payload: preferencesData });
    } catch (error) {
      console.error('Error fetching preferences:', error);  // Log the error
      dispatch({ type: 'SET_PREFERENCES_ERROR', payload: error.message });
    }
  };


  

export const updateUserPreferences = (userId, token, updatedPreferences) => async (dispatch) => {
  dispatch({ type: 'LOADING_PREFERENCES' });

  try {
      // Log initial updatedPreferences to verify the incoming data structure
      console.log('Updating Preferences:', updatedPreferences);

      // Ensure DefaultCategories is an array; parse if necessary
      if (!Array.isArray(updatedPreferences.DefaultCategories)) {
          throw new Error('DefaultCategories must be an array during update.');
      }

      // Send update request, stringify DefaultCategories as required by the backend
      const response = await updatePreferences(userId, token, {
          ...updatedPreferences,
          DefaultCategories: JSON.stringify(updatedPreferences.DefaultCategories), // Convert to JSON string before sending
      });

      // Log response to ensure update was successful
      console.log('Response from updatePreferences:', response);
      response.preferences.DefaultCategories = JSON.parse(response.preferences.DefaultCategories);
      console.log('Response from updatePreferences:', response);

      if (response.success) {
          // Dispatch the updated preferences to the reducer
          dispatch({ type: 'SET_PREFERENCES_DATA', payload: response.preferences });
      } else {
          throw new Error('Failed to update preferences');
      }
  } catch (error) {
      console.error('Error updating preferences:', error);
      dispatch({ type: 'SET_PREFERENCES_ERROR', payload: error.message });
  }
};