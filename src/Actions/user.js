import axios from 'axios'
import { thunkFetchAuthorization } from './auth'

export const fetchRootUserSuccess = (payload) => {
    return {
        type: 'FETCH_ROOT_USER_SUCCESS',
        payload
    }
}

export const fetchRootUserStart = () => {
    return {
        type: 'FETCH_ROOT_USER_START'
    }
}

export const thunkCreateNewUser = (formData) => {
    return (dispatch) => {
      axios.post('http://localhost:3000/users', formData)
      .then( user => {
        dispatch(fetchRootUserSuccess(user.data))
        dispatch(thunkFetchAuthorization(user.data.username, user.data.password))
      })
    }
}

export const thunkFetchRootUser = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/users/${id}`)
            .then(resp => resp.json())
            .then(user => {
                dispatch(fetchRootUserSuccess(user))
    })
    }
}

