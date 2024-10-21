// boardActions.js
export const selectBoard = (board) => (dispatch) => {
    localStorage.setItem('selectedBoard', JSON.stringify(board));  // Save to localStorage
    dispatch({
        type: 'SELECT_BOARD',
        payload: board,
    });
};
export const clearBoard = () => (dispatch) => {
    localStorage.removeItem('selectedBoard');  // Clears selectedBoard from localStorage
    dispatch({
        type: 'CLEAR_BOARD',

    })
};
