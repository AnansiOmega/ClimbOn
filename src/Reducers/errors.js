const initialState = []

const loginReducer = (state=initialState, action) => {
    switch(action.type){
        case 'LOGIN_ERRORS':
            return action.payload
        case 'CLEAR_LOGIN_ERRORS':
            return []
        case 'LOGOUT_USER':
            return []
        default:
            return state
        }
    }

export default loginReducer
