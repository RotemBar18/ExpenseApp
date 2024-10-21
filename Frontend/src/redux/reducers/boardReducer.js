// boardReducer.js

const initialState = {
    selectedBoard: JSON.parse(localStorage.getItem('selectedBoard')) || null, // Load from localStorage
};

export default function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SELECT_BOARD':
            return {
                ...state,
                selectedBoard: action.payload,
            };
        case 'CLEAR_BOARD':
            return {
                ...state,
                selectedBoard: null,
            };
        default:
            return state;
    }
}


