const initialState = []

const otherUserReducer = (state=initialState, action) => {
    switch(action.type){
        case'FETCH_USER_MATCHES_SUCCESS':
        case'FETCH_FRIEND_REQUESTS_SUCCESS':
            return action.payload
        case 'CLEAR_OTHER_USERS':
        case 'LOGOUT_USER':
            return []
        default:
            return state
        }
    }

export default otherUserReducer