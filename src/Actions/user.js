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

export const updateUserSuccess = payload => {
    return { 
        type: 'UPDATE_USER_SUCCESS',
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

export const fetchUserMatchesStart = () => {
    return { 
        type: 'FETCH_USER_MATCHES_START',
    }
}

export const handleConversationFetch = () => {
    return { 
        type: 'HANDLE_CONVERSATION_FETCH'
    }
}

// id(pin):83
// notice_id(pin):175
// notice_type(pin):"newMessage"
// user_id(pin):196
// created_at(pin

export const handleConversationFetchSuccess = (id) => {
    return { 
        type: 'HANDLE_CONVERSATION_FETCH_SUCCESS',
        payload: {
            notice_id: id,
            notice_type: 'newMessage'
        }
    }
}

//////////////////////////////////      THUNKS BEGIN      //////////////////////////////////////////////////////////////////////////////////////////


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

export const thunkUpdateUser = (id, formData) => {
    return (dispatch) => {
      axios.patch(`http://localhost:3000/users/${id}`, formData)
      .then( user => {
          if(user.data.errors){
              dispatch(loginErrors(user.data.errors))
              return
          }
          dispatch(updateUserSuccess(user.data))
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

export const thunkFetchUserMatches = (climbing_preference, commitment, skill_level, gender, distance) => {
    return (dispatch) => {
        const id = localStorage.getItem('userId')
        const reqObj = {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({climbing_preference, commitment, skill_level, gender, distance, id})
        }
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

export const thunkSendFriendReq = (user_id) => {
    return (dispatch) => {
        const current_user_id = localStorage.getItem('userId')
        const reqObj = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({current_user_id, user_id})
        }
        fetch('http://localhost:3000/friendships', reqObj)
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
    }
}


export const thunkHandleStartConvo = (user_id) => {
    return (dispatch) => {
        dispatch(handleConversationFetch())
        const current_user_id = localStorage.getItem('userId')
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({current_user_id, user_id})
        }

        fetch('http://localhost:3000/conversations', reqObj)
        .then(() => dispatch(handleConversationFetchSuccess(user_id)))
    }
}


export const thunkSendMessage = (conversation_id, body) => {
    return (dispatch) => {
        const user_id = localStorage.getItem('userId')
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({conversation_id, user_id, body})
        }
        
        fetch('http://localhost:3000/messages', reqObj)
    }
}


export const thunkDeleteNotification = (user_id) => {
    return (dispatch) => {
        const current_user_id = localStorage.getItem('userId')// thunk this next time. 
        const reqObj = {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({user_id, current_user_id})
        }
  
        fetch('http://localhost:3000/message-notification', reqObj)
    }
}

