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
                loading: false,  // Stop loading once data is fetched
            };
        case 'UPDATE_USER_SUCCESS':  // Handle the user update success case
            const updatedState = { ...state, ...action.payload };
            return updatedState;

        case 'SET_USER_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
