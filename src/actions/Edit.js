export const getIndex = (index) => {
    return (dispatch) => {
        dispatch({
            type: 'USER_INDEX',
            payload: index
        })
    }
};

export const clearIndex = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_INDEX',
            payload: undefined
        })
    }
};

export const editMode = ()=> {
    return (dispatch) => {
        dispatch({
            type: 'EDIT_MODE',
            payload: 'edit_mode'
        })
    }
};

export const clearMode = ()=> {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_MODE',
            payload: null
        })
    }
};

export const addMode = ()=> {
    return (dispatch) => {
        dispatch({
            type: 'ADD_MODE',
            payload: 'add_mode'
        })
    }
};