import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

// Fetch user data by userId
export const fetchUser = async (userId, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/Id/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
  
      return response.data.user;  // Return the user data
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  export const updateUser = async (userId, updatedUserData, token) => {
    try {
      const response =  await axios.put(`${BASE_URL}/users/${userId}`,updatedUserData, // Correctly pass the updated data here
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        return response.data.user; // Return the updated user data
      } else {
        console.error('Failed to update user:', response.data.message);
        return null;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };