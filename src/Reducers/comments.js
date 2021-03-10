const initialState = []

const commentsReducer = (state=initialState, action) => {
    switch(action.type){
        case 'POST_COMMENTS_FETCH_SUCCESS':
            return action.payload
        case 'CREATE_NEW_COMMENT_SUCCESS':
            return [...state, action.payload]
        case 'LOGOUT_USER':
            return []
        default:
            return state
        }
    }

export default commentsReducer