export const selectBoard = (board) => (dispatch) => {
    return new Promise((resolve) => {
        localStorage.setItem('selectedBoard', JSON.stringify(board));
        dispatch({
            type: 'SELECT_BOARD',
            payload: board,
        });
        resolve(); // Resolve the promise after dispatching
    });
};

export const clearBoard = () => (dispatch) => {
    return new Promise((resolve) => {
        localStorage.removeItem('selectedBoard');
        dispatch({
            type: 'CLEAR_BOARD',
        });
        resolve(); // Resolve the promise after dispatching
    });
};
