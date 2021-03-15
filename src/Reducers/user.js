const initialState = {}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case 'FETCH_USER_SUCCESS':
            return action.payload
        case 'UPDATE_USER_SUCCESS':
            return action.payload
        case 'HANDLE_CONVERSATION_FETCH_SUCCESS':
            state.notifications.push(action.payload)
            return state
        case 'LOGOUT_USER':
            return {}
        default:
            return state
        }
    }

export default userReducer