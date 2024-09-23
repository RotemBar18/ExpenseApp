export const getUserIdFromToken = (token) => {
    try {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.userId;
        }
    } catch (error) {
        console.error("Error decoding token:", error); 
    }
    return null;
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};