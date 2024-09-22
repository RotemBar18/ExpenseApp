import { fetchUser, updateUser } from "../../utils/userService";  // Import the service functions

// Redux action to fetch user data
export const fetchUserData = (userId, token) => async (dispatch) => {
  dispatch({ type: 'LOADING' });

  try {
    const userData = await fetchUser(userId, token);  // Use the service function
    dispatch({ type: 'SET_USER_DATA', payload: userData });
  } catch (error) {
    console.error("Error in fetchUserData:", error);  // Debug log
    dispatch({ type: 'SET_USER_ERROR', payload: error.message });
  }
};

// Redux action to update user profile
export const updateUserProfile = (userId, token, updatedUserData) => async (dispatch) => {
  dispatch({ type: 'LOADING' });

  try {
    const updatedUser = await updateUser(userId, updatedUserData, token);  // Use the service function
    if (updatedUser) {
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: updatedUser });
    } else {
      dispatch({ type: 'ERROR', payload: 'Failed to update user.' });
    }
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};
