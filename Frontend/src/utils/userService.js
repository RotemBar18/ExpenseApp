const BASE_URL = 'http://localhost:8081';


export const updateUser = async (userId, updatedUserData) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        const data = await response.json();

        if (data.success) {
            return updatedUserData
        } else {
            console.error('Failed to update user:', data.message);
            return null;
        }
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;  // Re-throw the error to be handled by the caller
    }
};
