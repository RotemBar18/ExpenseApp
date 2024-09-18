export const getUserIdFromToken = (token) => {
    try {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
            return payload.userId; // Ensure the token contains a userId field
        }
    } catch (error) {
        console.log('ff')
        console.error("Error decoding token:", error); // Log any errors in decoding
    }
    return null;
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};