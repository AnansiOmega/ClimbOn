import {loginErrors} from './user'

export const fetchAuthUserSuccess = (payload) => {
    return {
        type: 'FETCH_AUTH_USER_SUCCESS',
        payload
    }
}

export const currentUser = (payload) => {
    return {
        type: 'CURRENT_USER',
        payload
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    }
}

//////////////////////////////////////////           THUNKS BEGIN        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const thunkFetchAuthorization = (username, password) => {
    return (dispatch) => {
    let reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }
    fetch('http://localhost:3000/auth', reqObj)
    .then(resp => resp.json())
    .then(user => {
        if(user.error){
             dispatch(loginErrors(user.error))
             return
            }
        localStorage.setItem('myToken', user.token)
        localStorage.setItem('userId', user.id)
        dispatch(fetchAuthUserSuccess(user))
    })
    }
}

export const thunkFetchAuthCurrentUser = (token) => {
    return (dispatch) => {
    const reqObj = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    fetch('http://localhost:3000/current_user', reqObj)
    .then(resp => resp.json())
    .then(user => dispatch(currentUser(user)))
    }

}