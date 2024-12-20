const initialState = {
    Name: '',
    Email: '',
    ProfilePic: '',
    loading: true,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        case 'UPDATE_USER_SUCCESS':
            const updatedState = { ...state, ...action.payload };
            return updatedState;

        case 'SET_USER_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'LOGOUT_USER': // Reset state on logout
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
