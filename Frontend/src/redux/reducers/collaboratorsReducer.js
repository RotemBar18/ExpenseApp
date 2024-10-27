import {
    FETCH_COLLABORATORS_SUCCESS,
    SET_COLLABORATORS_LOADING,
    SET_COLLABORATORS_ERROR,
} from '../actions/collaboratorsAction';

const initialState = {
    collaboratorsByBoard: {}, // Store collaborators per board
    loading: false,
    error: null,
};

const collaboratorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COLLABORATORS_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_COLLABORATORS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case FETCH_COLLABORATORS_SUCCESS:
            const { boardId, collaborators } = action.payload;
            return {
                ...state,
                collaboratorsByBoard: {
                    ...state.collaboratorsByBoard,
                    [boardId]: collaborators,
                },
                error: null,
            };
        default:
            return state;
    }
};

export default collaboratorReducer;
