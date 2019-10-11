
const initState = {
    users: [],
    userIndexToEdit: null, 
    writeMode: null,
    userData: null, 
}

const editUserReducer = (state = initState, action) => {
    if(action.type === 'USER_INDEX'){
        return {
            ...state,
            userIndexToEdit: action.payload
        }
    }
    if(action.type === 'CLEAR_INDEX'){
        return {
            ...state,
            userIndexToEdit: action.payload
        }
    }

    if(action.type === 'CLEAR_MODE'){
        return {
            ...state,
            writeMode: action.payload
        }
    }

    if(action.type === 'EDIT_MODE'){
        return {
            ...state,
            writeMode: action.payload
        }
    }
    if(action.type === 'ADD_MODE'){
        return {
            ...state,
            writeMode: action.payload, 
        }
    }
   
    

    return state
}

export default editUserReducer