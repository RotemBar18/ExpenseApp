import axiosInstance from './axiosInstance';


export const fetchUser = async (userId, token) => {
    try {
      const response = await  axiosInstance.get(`/users/Id/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
  
      return response.data.user;   
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  export const updateUser = async (userId, updatedUserData, token) => {
    if(!updatedUserData.ProfilePic ){
      updatedUserData.ProfilePic = ''
  }
    try {
      const response =  await  axiosInstance.put(`/users/${userId}`,updatedUserData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        return response.data.user; 
      } else {
        console.error('Failed to update user:', response.data.message);
        return null;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  export const fetchUsers = async (token) => {
    try {
      const response = await  axiosInstance.get(`/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;   
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  