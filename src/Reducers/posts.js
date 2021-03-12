const initialState = []

const postReducer = (state=initialState, action) => {
    switch(action.type){
        case 'FETCH_USER_POSTS_SUCCESS':
            return action.payload.sort((a, b) => a.id < b.id ? +1 : -1 )
        case 'CREATE_NEW_POST_SUCCESS':
            return [action.payload, ...state]
        case 'LOGOUT_USER':
            return []
        default:
            return state
        }
    }

export default postReducer