
import axios from 'axios';

const usersFetch = axios.create({
    baseURL: 'https://reqres.in/api/'
});

export const usersAction = () => {
    return async (dispatch) => {

        const response_1 = await usersFetch.get('users?page=1')
        const response_2 = await usersFetch.get('users?page=2')
        const response_3 = await usersFetch.get('users?page=3')
        const response_4 = await usersFetch.get('users?page=4')
        const usersAll = [...response_1.data.data, ...response_2.data.data, ...response_3.data.data, ...response_4.data.data]

        dispatch({
            type: 'USERS_FETCH',
            payload: usersAll
        })
    }
};

export const newUsersEdit = (currentUsers, id, userIndexToEdit, newUser)=> {
    const userPath = `users${id}`
    const newData = [...currentUsers]
    newData[userIndexToEdit] = newUser
    return async (dispatch) => {
      
        const response = await usersFetch.put(userPath, newData)
        await dispatch({
            type: 'NEW_USERS_EDIT',
            payload: response.data
        })
    }
};

export const newUsersAdd = (currentUsers, newUser, hideForm)=> {
    const userPath = `users`
    const newData = [...currentUsers]
    return async (dispatch) => {
        await newData.push(newUser)
        const response = await usersFetch.post(userPath, newData)
        
        await dispatch({
            type: 'NEW_USERS_ADD',
            payload: response.data
        })
    }
};

export const deleteUser = (currentUsers, idxToDelete) => {
    let newData = [...currentUsers]
    newData.splice(idxToDelete, 1)
    return async (dispatch) => {
        const response = await usersFetch.delete('users/2')
        if(response.status === 204){
            dispatch({
                type: 'DELETE_USER',
                payload: newData
            })
        }
    }
};


