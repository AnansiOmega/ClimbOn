const initialState = []

const loginReducer = (state=initialState, action) => {
    switch(action.type){
        case 'LOGIN_ERRORS':
            return action.payload
        case 'LOGOUT_USER':
            return []
        default:
            return state
        }
    }

export default loginReducer
