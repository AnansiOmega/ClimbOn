const initialState = {}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case 'FETCH_ROOT_USER_SUCCESS':
            return action.payload
        default:
            return state
        }
    }

export default userReducer