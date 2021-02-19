
const loaderReducer = (state=false, action) => {
    switch(action.type){
        case 'FETCH_ROOT_USER_START':
            return true
        case 'FETCH_ROOT_USER_SUCCESS':
            return false
        default:
            return state
        }
    }

export default loaderReducer