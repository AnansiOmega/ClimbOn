
const loaderReducer = (state=false, action) => {
    switch(action.type){
        case 'FETCH_USER_START':
            return true
        case 'FETCH_USER_SUCCESS':
            return false
        case 'FETCH_USER_MATCHES_START':
            return true
        case 'FETCH_USER_MATCHES_SUCCESS':
            return false
        case 'HANDLE_CONVERSATION_FETCH':
            return true
        case 'HANDLE_CONVERSATION_FETCH_SUCCESS':
            return false
        default:
            return state
        }
    }

export default loaderReducer