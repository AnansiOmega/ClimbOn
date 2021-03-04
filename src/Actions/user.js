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

export const fetchFriendRequestsSuccess = payload => {
    return { 
        type: 'FETCH_FRIEND_REQUESTS_SUCCESS',
        payload
    }
}

export const clearOtherUsers = () => {
    return { 
        type: 'CLEAR_OTHER_USERS'
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

export const thunkFetchFriendRequests = id => {
    return (dispatch) => {
        fetch(`http://localhost:3000/friend-requests/${id}`)
        .then( resp => resp.json())
        .then( users => dispatch(fetchFriendRequestsSuccess(users)))
    }
}

export const thunkFetchAcceptReq = (user_id) => {
    return (dispatch) => {
        const current_user_id = localStorage.getItem('userId')
        const reqObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id, current_user_id})
        }
        
        fetch('http://localhost:3000/accept-friend', reqObj)
        .then( resp => resp.json())
        .then( data => {
          return 'wired up boss'
        })
    }
}

export const thunkFetchRejectReq = (user_id) => {
    return (dispatch) => {
        const current_user_id = localStorage.getItem('userId')
        const reqObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id, current_user_id})
        }
        
        fetch('http://localhost:3000/reject-friend', reqObj)
        .then( resp => resp.json())
        .then( data => {
          return 'wired up boss'
        })
    }
}

