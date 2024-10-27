import { fetchCollaborators } from '../../utils/boardMembersService';

// Action types
export const FETCH_COLLABORATORS_SUCCESS = 'FETCH_COLLABORATORS_SUCCESS';
export const SET_COLLABORATORS_LOADING = 'SET_COLLABORATORS_LOADING';
export const SET_COLLABORATORS_ERROR = 'SET_COLLABORATORS_ERROR';

// Action creators
export const fetchCollaboratorsSuccess = (boardId, collaborators) => ({
    type: FETCH_COLLABORATORS_SUCCESS,
    payload: { boardId, collaborators },
});

export const setCollaboratorsLoading = (loading) => ({
    type: SET_COLLABORATORS_LOADING,
    payload: loading,
});

export const setCollaboratorsError = (error) => ({
    type: SET_COLLABORATORS_ERROR,
    payload: error,
});

// Thunk to fetch collaborators for a specific board
export const fetchCollaboratorsForBoardAction = (boardId) => async (dispatch) => {
    dispatch(setCollaboratorsLoading(true));
    const token = localStorage.getItem('token');
    try {
        const collaborators = await fetchCollaborators(token, boardId);
        dispatch(fetchCollaboratorsSuccess(boardId, collaborators));
    } catch (error) {
        dispatch(setCollaboratorsError(error.message));
    } finally {
        dispatch(setCollaboratorsLoading(false));
    }
};
