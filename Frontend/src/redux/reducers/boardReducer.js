
const initialState = {
    selectedBoard: JSON.parse(localStorage.getItem('selectedBoard')) || null, 
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


