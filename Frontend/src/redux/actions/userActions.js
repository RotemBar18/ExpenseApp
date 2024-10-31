import { fetchUser, updateUser } from "../../utils/userService";  

export const fetchUserData = (userId, token) => async (dispatch) => {
  dispatch({ type: 'LOADING' });

  try {
    const userData = await fetchUser(userId, token);
    dispatch({ type: 'SET_USER_DATA', payload: userData });
  } catch (error) {
    console.error("Error in fetchUserData:", error);
    dispatch({ type: 'SET_USER_ERROR', payload: error.message });
  }
};

export const updateUserProfile = (userId, token, updatedUserData) => async (dispatch) => {
  dispatch({ type: 'LOADING' });
  try {
    const updatedUser = await updateUser(userId, updatedUserData, token);
    if (updatedUser) {
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: updatedUser });
    } else {
      dispatch({ type: 'ERROR', payload: 'Failed to update user.' });
    }
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};


export const logoutUser = () => (dispatch) => {
  dispatch({ type: 'LOGOUT_USER' });
  localStorage.removeItem('token');
  localStorage.removeItem('selectedBoard');
  localStorage.removeItem('preferences');
  localStorage.removeItem('refreshToken');
};