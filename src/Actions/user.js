import axios from 'axios'
import { thunkFetchAuthorization } from './auth'

export const fetchUserSuccess = payload => {
    return {
        type: 'FETCH_USER_SUCCESS',
        payload
    }
}

export const fetchUserStart = () => {
    return {
        type: 'FETCH_USER_START'
    }
}

export const loginErrors = payload => {
    return {
        type: 'LOGIN_ERRORS',
        payload
    }
}

export const fetchUserMatchesSuccess = payload => {
    return { 
        type: 'FETCH_USER_MATCHES_SUCCESS',
        payload
    }
}

export const fetchUserMatchesStart = payload => {
    return { 
        type: 'FETCH_USER_MATCHES_START',
        payload
    }
}

export const thunkCreateNewUser = formData => {
    return (dispatch) => {
      axios.post('http://localhost:3000/users', formData)
      .then( user => {
          if(user.data.errors){
              dispatch(loginErrors(user.data.errors))
              return
          }
        dispatch(fetchUserSuccess(user.data))
        dispatch(thunkFetchAuthorization(user.data.username, user.data.password))
      })
    }
}

export const thunkFetchUser = id => {
    return (dispatch) => {
        fetch(`http://localhost:3000/users/${id}`)
            .then(resp => resp.json())
            .then(user => {
                dispatch(fetchUserSuccess(user))
    })
    }
}

export const thunkFetchUserMatches = (reqObj) => {
    return (dispatch) => {
        dispatch(fetchUserMatchesStart())
        fetch('http://localhost:3000/find-climbers', reqObj)
        .then( resp => resp.json())
        .then( users => dispatch(fetchUserMatchesSuccess(users)))
    }
}
