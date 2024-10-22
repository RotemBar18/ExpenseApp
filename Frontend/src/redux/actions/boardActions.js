export const selectBoard = (board) => (dispatch) => {
    localStorage.setItem('selectedBoard', JSON.stringify(board));  
    dispatch({
        type: 'SELECT_BOARD',
        payload: board,
    });
};
export const clearBoard = () => (dispatch) => {
    localStorage.removeItem('selectedBoard');  
    dispatch({
        type: 'CLEAR_BOARD',

    })
};
