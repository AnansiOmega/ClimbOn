const initialState = []

const postReducer = (state=initialState, action) => {
    switch(action.type){
        case 'FETCH_USER_POSTS_SUCCESS':
            return action.payload.reverse()
        case 'CREATE_NEW_POST_SUCCESS':
            return [action.payload, ...state]
        case 'LOGOUT_USER':
            return []
        default:
            return state
        }
    }

export default postReducer