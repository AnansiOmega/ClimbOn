const initialState = []

const otherUserReducer = (state=initialState, action) => {
    switch(action.type){
        case'FETCH_USER_MATCHES_SUCCESS':
            return action.payload
        case 'LOGOUT_USER':
            return {}
        default:
            return state
        }
    }

export default otherUserReducer