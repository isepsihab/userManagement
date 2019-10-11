export const showForm = () => {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_FORM',
            payload: true
        })
    }
};

export const hideForm = () => {
    return (dispatch) => {
        dispatch({
            type: 'HIDE_FORM', 
            payload: false
        })
    }
};